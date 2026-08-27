import type { DailyPrayerTimes } from '../../domain/prayer'
import { getDatePartsInTimeZone } from '../../utils/timezone'
import { fetchAlAdhanCalendar } from './aladhan'
import {
  createBrowserPrayerCalendarCache,
  type PrayerCalendarCache,
} from './cache'
import { alAdhanConfig } from './config'

export type PrayerTimesSource = 'network' | 'cache' | 'stale-cache'

export type LoadedPrayerTimes = {
  times: DailyPrayerTimes
  source: PrayerTimesSource
}

type LoadPrayerTimesDependencies = {
  cache?: PrayerCalendarCache
  fetchCalendar?: typeof fetchAlAdhanCalendar
}

export async function loadDailyPrayerTimes(
  instant: Date,
  dependencies: LoadPrayerTimesDependencies = {},
): Promise<LoadedPrayerTimes> {
  const cache = dependencies.cache ?? createBrowserPrayerCalendarCache()
  const fetchCalendar = dependencies.fetchCalendar ?? fetchAlAdhanCalendar
  const { year, month, dateKey } = getDatePartsInTimeZone(
    instant,
    alAdhanConfig.timezone,
  )
  const cached = cache.read(year, month)
  const cachedTimes = cached?.calendar.days.find((day) => day.date === dateKey)

  if (cached?.isFresh && cachedTimes) {
    return { times: cachedTimes, source: 'cache' }
  }

  try {
    const calendar = await fetchCalendar(year, month)
    const times = calendar.days.find((day) => day.date === dateKey)

    if (!times) {
      throw new Error('Prayer calendar does not contain the requested date')
    }

    cache.write(calendar)
    return { times, source: 'network' }
  } catch (error) {
    if (cachedTimes) {
      return { times: cachedTimes, source: 'stale-cache' }
    }

    throw error
  }
}
