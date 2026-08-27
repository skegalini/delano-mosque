export type DailyPrayerTimes = {
  date: string
  timezone: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export type MonthlyPrayerCalendar = {
  year: number
  month: number
  timezone: string
  days: readonly DailyPrayerTimes[]
}
