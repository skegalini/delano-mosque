import { useEffect, useState } from 'react'

import type { LoadedPrayerTimes } from '../services/prayer/loadPrayerTimes'
import { loadDailyPrayerTimes } from '../services/prayer/loadPrayerTimes'

type PrayerTimesState =
  | { status: 'loading' }
  | { status: 'success'; result: LoadedPrayerTimes }
  | { status: 'error' }

type UsePrayerTimesOptions = {
  instant?: Date
  loader?: typeof loadDailyPrayerTimes
}

export function usePrayerTimes(
  options: UsePrayerTimesOptions = {},
): PrayerTimesState {
  const [instant] = useState(() => options.instant ?? new Date())
  const loader = options.loader ?? loadDailyPrayerTimes
  const [state, setState] = useState<PrayerTimesState>({ status: 'loading' })

  useEffect(() => {
    let active = true

    void loader(instant)
      .then((result) => {
        if (active) {
          setState({ status: 'success', result })
        }
      })
      .catch(() => {
        if (active) {
          setState({ status: 'error' })
        }
      })

    return () => {
      active = false
    }
  }, [instant, loader])

  return state
}
