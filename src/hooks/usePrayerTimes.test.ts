import { renderHook, waitFor } from '@testing-library/react'

import type { LoadedPrayerTimes } from '../services/prayer/loadPrayerTimes'
import { loadDailyPrayerTimes } from '../services/prayer/loadPrayerTimes'
import { usePrayerTimes } from './usePrayerTimes'

const loadedTimes: LoadedPrayerTimes = {
  source: 'network',
  times: {
    date: '2026-08-27',
    timezone: 'America/Los_Angeles',
    fajr: '04:51',
    sunrise: '06:18',
    dhuhr: '12:59',
    asr: '17:01',
    maghrib: '19:39',
    isha: '21:06',
  },
}

describe('usePrayerTimes', () => {
  it('reloads only when the mosque-local date changes', async () => {
    const loader = vi
      .fn<typeof loadDailyPrayerTimes>()
      .mockResolvedValue(loadedTimes)
    const beforeMidnight = new Date('2026-08-28T06:59:00Z')
    const { rerender } = renderHook(
      ({ instant }) => usePrayerTimes({ instant, loader }),
      { initialProps: { instant: beforeMidnight } },
    )

    await waitFor(() => expect(loader).toHaveBeenCalledTimes(1))

    rerender({ instant: new Date('2026-08-28T06:59:30Z') })
    expect(loader).toHaveBeenCalledTimes(1)

    const afterMidnight = new Date('2026-08-28T07:00:00Z')
    rerender({ instant: afterMidnight })

    await waitFor(() => expect(loader).toHaveBeenCalledTimes(2))
    expect(loader).toHaveBeenLastCalledWith(afterMidnight)
  })
})
