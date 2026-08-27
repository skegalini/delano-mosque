import type { LocalizedContent } from './localization'

export const prayerNames = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const

export type PrayerName = (typeof prayerNames)[number]

export type DailyPrayer = {
  prayer: PrayerName
  calculatedAdhanTime: string | null
  mosqueIqamahTime: string | null
}

export type PrayerSchedule = {
  localDate: string
  timezone: string
  prayers: readonly DailyPrayer[]
  sunriseTime: string | null
  jummahTimes: readonly string[] | null
  specialSchedule: LocalizedContent | null
}
