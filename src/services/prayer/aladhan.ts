import type {
  DailyPrayerTimes,
  MonthlyPrayerCalendar,
} from '../../domain/prayer'
import {
  prayerCalculationConfig,
  type PrayerCalculationConfig,
} from '../../config/prayer'

const ALADHAN_CALENDAR_ENDPOINT = 'https://api.aladhan.com/v1/calendar'

type AlAdhanCalendarEntry = {
  timings: Record<string, unknown>
  date: {
    gregorian: {
      date: string
    }
  }
}

export function buildAlAdhanCalendarUrl(
  year: number,
  month: number,
  config: PrayerCalculationConfig = prayerCalculationConfig,
): URL {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    throw new RangeError('Invalid Gregorian calendar month')
  }

  const url = new URL(`${ALADHAN_CALENDAR_ENDPOINT}/${year}/${month}`)
  url.searchParams.set('latitude', String(config.location.latitude))
  url.searchParams.set('longitude', String(config.location.longitude))
  url.searchParams.set('method', String(config.calculationMethod.id))
  url.searchParams.set('school', String(config.asrSchool.id))
  url.searchParams.set('timezonestring', config.location.timezone)

  return url
}

export async function fetchAlAdhanCalendar(
  year: number,
  month: number,
  fetcher: typeof fetch = fetch,
  config: PrayerCalculationConfig = prayerCalculationConfig,
): Promise<MonthlyPrayerCalendar> {
  const response = await fetcher(buildAlAdhanCalendarUrl(year, month, config), {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Prayer provider request failed')
  }

  const payload: unknown = await response.json()
  return normalizeAlAdhanCalendar(payload, year, month, config)
}

export function normalizeAlAdhanCalendar(
  payload: unknown,
  year: number,
  month: number,
  config: PrayerCalculationConfig = prayerCalculationConfig,
): MonthlyPrayerCalendar {
  if (
    !isRecord(payload) ||
    payload.code !== 200 ||
    !Array.isArray(payload.data)
  ) {
    throw new Error('Invalid prayer provider response')
  }

  const days = payload.data.map((entry) =>
    normalizeCalendarEntry(entry, config.location.timezone),
  )

  if (days.length === 0) {
    throw new Error('Prayer provider returned an empty calendar')
  }

  return {
    year,
    month,
    timezone: config.location.timezone,
    days,
  }
}

export function parseAlAdhanTime(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const match = /^\s*([01]?\d|2[0-3]):([0-5]\d)(?:\s|$)/.exec(value)

  if (!match) {
    return null
  }

  return `${match[1].padStart(2, '0')}:${match[2]}`
}

function normalizeCalendarEntry(
  value: unknown,
  timezone: string,
): DailyPrayerTimes {
  if (!isAlAdhanCalendarEntry(value)) {
    throw new Error('Invalid prayer calendar entry')
  }

  return {
    date: parseGregorianDate(value.date.gregorian.date),
    timezone,
    fajr: requireAlAdhanTime(value.timings.Fajr),
    sunrise: requireAlAdhanTime(value.timings.Sunrise),
    dhuhr: requireAlAdhanTime(value.timings.Dhuhr),
    asr: requireAlAdhanTime(value.timings.Asr),
    maghrib: requireAlAdhanTime(value.timings.Maghrib),
    isha: requireAlAdhanTime(value.timings.Isha),
  }
}

function requireAlAdhanTime(value: unknown): string {
  const time = parseAlAdhanTime(value)

  if (!time) {
    throw new Error('Invalid prayer timing data')
  }

  return time
}

function parseGregorianDate(value: string): string {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)

  if (!match) {
    throw new Error('Invalid Gregorian date from prayer provider')
  }

  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}

function isAlAdhanCalendarEntry(value: unknown): value is AlAdhanCalendarEntry {
  if (!isRecord(value) || !isRecord(value.timings) || !isRecord(value.date)) {
    return false
  }

  const gregorian = value.date.gregorian
  return isRecord(gregorian) && typeof gregorian.date === 'string'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
