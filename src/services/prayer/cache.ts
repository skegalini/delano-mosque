import type { MonthlyPrayerCalendar } from '../../domain/prayer'
import {
  prayerCalculationConfig,
  type PrayerCalculationConfig,
} from '../../config/prayer'

const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000

type CachedCalendarEntry = {
  cachedAt: number
  calendar: MonthlyPrayerCalendar
}

export type CachedPrayerCalendar = CachedCalendarEntry & {
  isFresh: boolean
}

export type PrayerCalendarCache = {
  read: (year: number, month: number) => CachedPrayerCalendar | null
  write: (calendar: MonthlyPrayerCalendar) => void
}

export function buildPrayerCalendarCacheKey(
  year: number,
  month: number,
  config: PrayerCalculationConfig = prayerCalculationConfig,
): string {
  const monthKey = `${year}-${String(month).padStart(2, '0')}`
  const locationKey = [
    `lat-${config.location.latitude}`,
    `lon-${config.location.longitude}`,
    `tz-${encodeURIComponent(config.location.timezone)}`,
  ].join(':')
  const methodKey = `method-${config.calculationMethod.id}-${config.calculationMethod.cacheName}`
  const schoolKey = `school-${config.asrSchool.id}-${config.asrSchool.cacheName}`

  return `delano-mosque:prayer-calendar:v2:${monthKey}:${locationKey}:${methodKey}:${schoolKey}`
}

export function createPrayerCalendarCache(
  storage: Pick<Storage, 'getItem' | 'setItem'> | null,
  now: () => number = Date.now,
  config: PrayerCalculationConfig = prayerCalculationConfig,
): PrayerCalendarCache {
  return {
    read(year, month) {
      if (!storage) {
        return null
      }

      try {
        const serialized = storage.getItem(
          buildPrayerCalendarCacheKey(year, month, config),
        )

        if (!serialized) {
          return null
        }

        const value: unknown = JSON.parse(serialized)

        if (
          !isCachedCalendarEntry(value, year, month, config.location.timezone)
        ) {
          return null
        }

        return {
          ...value,
          isFresh: now() - value.cachedAt <= CACHE_MAX_AGE_MS,
        }
      } catch {
        return null
      }
    },

    write(calendar) {
      if (!storage) {
        return
      }

      try {
        const entry: CachedCalendarEntry = {
          cachedAt: now(),
          calendar,
        }

        storage.setItem(
          buildPrayerCalendarCacheKey(calendar.year, calendar.month, config),
          JSON.stringify(entry),
        )
      } catch {
        // Storage can be unavailable or full. Prayer data can still be shown.
      }
    },
  }
}

export function createBrowserPrayerCalendarCache(): PrayerCalendarCache {
  try {
    const storage = typeof window === 'undefined' ? null : window.localStorage
    return createPrayerCalendarCache(storage)
  } catch {
    return createPrayerCalendarCache(null)
  }
}

function isCachedCalendarEntry(
  value: unknown,
  year: number,
  month: number,
  timezone: string,
): value is CachedCalendarEntry {
  if (!isRecord(value) || typeof value.cachedAt !== 'number') {
    return false
  }

  const calendar = value.calendar

  return (
    isRecord(calendar) &&
    calendar.year === year &&
    calendar.month === month &&
    calendar.timezone === timezone &&
    Array.isArray(calendar.days) &&
    calendar.days.every(isDailyPrayerTimes)
  )
}

function isDailyPrayerTimes(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.date === 'string' &&
    typeof value.timezone === 'string' &&
    typeof value.fajr === 'string' &&
    typeof value.sunrise === 'string' &&
    typeof value.dhuhr === 'string' &&
    typeof value.asr === 'string' &&
    typeof value.maghrib === 'string' &&
    typeof value.isha === 'string'
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
