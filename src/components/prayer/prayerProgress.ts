import type { DailyPrayerTimes } from '../../domain/prayer'

export type ActivePrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

type PrayerClock = Pick<
  DailyPrayerTimes,
  'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'timezone'
>

export const prayerMarkerProgress = {
  fajr: 0,
  sunrise: 0.19806,
  dhuhr: 0.50051,
  asr: 0.72812,
  maghrib: 0.90478,
  isha: 1,
} as const

export function getActivePrayerKey(
  times: PrayerClock,
  instant: Date,
): ActivePrayerKey | null {
  const now = getMinutesInTimeZone(instant, times.timezone)
  const fajr = parseMinutes(times.fajr)
  const sunrise = parseMinutes(times.sunrise)
  const dhuhr = parseMinutes(times.dhuhr)
  const asr = parseMinutes(times.asr)
  const maghrib = parseMinutes(times.maghrib)
  const isha = parseMinutes(times.isha)

  if (now < fajr || now >= isha) return 'isha'
  if (now < sunrise) return 'fajr'
  if (now < dhuhr) return null
  if (now < asr) return 'dhuhr'
  if (now < maghrib) return 'asr'
  return 'maghrib'
}

export function getDayProgress(times: PrayerClock, instant: Date): number {
  const now = getMinutesInTimeZone(instant, times.timezone)
  const markerKeys = [
    'fajr',
    'sunrise',
    'dhuhr',
    'asr',
    'maghrib',
    'isha',
  ] as const
  const firstKey = markerKeys[0]
  const lastKey = markerKeys[markerKeys.length - 1]

  if (now <= parseMinutes(times[firstKey]))
    return prayerMarkerProgress[firstKey]
  if (now >= parseMinutes(times[lastKey])) return prayerMarkerProgress[lastKey]

  for (let index = 0; index < markerKeys.length - 1; index += 1) {
    const startKey = markerKeys[index]
    const endKey = markerKeys[index + 1]
    const startTime = parseMinutes(times[startKey])
    const endTime = parseMinutes(times[endKey])

    if (now <= endTime) {
      const segmentProgress = (now - startTime) / (endTime - startTime)
      const startProgress = prayerMarkerProgress[startKey]
      const endProgress = prayerMarkerProgress[endKey]

      return startProgress + segmentProgress * (endProgress - startProgress)
    }
  }

  return prayerMarkerProgress[lastKey]
}

function parseMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function getMinutesInTimeZone(instant: Date, timezone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant)
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
  const minute = Number(parts.find((part) => part.type === 'minute')?.value)

  return hour * 60 + minute
}
