import type { MonthlyPrayerCalendar } from '../../domain/prayer'
import { createPrayerCalendarCache } from './cache'
import { loadDailyPrayerTimes } from './loadPrayerTimes'

const calendar: MonthlyPrayerCalendar = {
  year: 2026,
  month: 8,
  timezone: 'America/Los_Angeles',
  days: [
    {
      date: '2026-08-27',
      timezone: 'America/Los_Angeles',
      fajr: '04:51',
      sunrise: '06:18',
      dhuhr: '12:59',
      asr: '17:01',
      maghrib: '19:39',
      isha: '21:06',
    },
  ],
}

const instant = new Date('2026-08-27T19:00:00Z')

function createMemoryStorage() {
  const values = new Map<string, string>()

  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  }
}

describe('daily prayer loading', () => {
  it('uses a fresh cached month without a network request', async () => {
    const cache = createPrayerCalendarCache(createMemoryStorage())
    const fetchCalendar = vi.fn()
    cache.write(calendar)

    await expect(
      loadDailyPrayerTimes(instant, { cache, fetchCalendar }),
    ).resolves.toMatchObject({
      source: 'cache',
      times: { date: '2026-08-27' },
    })
    expect(fetchCalendar).not.toHaveBeenCalled()
  })

  it('fetches and caches a month when no fresh cache exists', async () => {
    const cache = createPrayerCalendarCache(createMemoryStorage())
    const fetchCalendar = vi.fn().mockResolvedValue(calendar)

    await expect(
      loadDailyPrayerTimes(instant, { cache, fetchCalendar }),
    ).resolves.toMatchObject({ source: 'network' })
    expect(fetchCalendar).toHaveBeenCalledWith(2026, 8)
    expect(cache.read(2026, 8)?.calendar).toEqual(calendar)
  })

  it('uses stale cached data when the network fails', async () => {
    let currentTime = 1_000_000
    const cache = createPrayerCalendarCache(
      createMemoryStorage(),
      () => currentTime,
    )
    const fetchCalendar = vi.fn().mockRejectedValue(new TypeError('offline'))
    cache.write(calendar)
    currentTime += 25 * 60 * 60 * 1000

    await expect(
      loadDailyPrayerTimes(instant, { cache, fetchCalendar }),
    ).resolves.toMatchObject({
      source: 'stale-cache',
      times: { date: '2026-08-27' },
    })
  })

  it('fails safely when both network and cached data are unavailable', async () => {
    const cache = createPrayerCalendarCache(createMemoryStorage())
    const fetchCalendar = vi.fn().mockRejectedValue(new TypeError('offline'))

    await expect(
      loadDailyPrayerTimes(instant, { cache, fetchCalendar }),
    ).rejects.toThrow('offline')
  })
})
