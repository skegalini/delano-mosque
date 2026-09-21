import { useEffect, useState } from 'react'

import { prayerCalculationConfig } from '../config/prayer'
import type { LoadedPrayerTimes } from '../services/prayer/loadPrayerTimes'
import { loadDailyPrayerTimes } from '../services/prayer/loadPrayerTimes'
import { getDateKeyInTimeZone } from '../utils/timezone'

type PrayerTimesState =
  | { status: 'loading' }
  | { status: 'success'; result: LoadedPrayerTimes }
  | { status: 'error' }

type DatedPrayerTimesState = {
  dateKey: string
  value: PrayerTimesState
}

type UsePrayerTimesOptions = {
  instant?: Date
  loader?: typeof loadDailyPrayerTimes
}

export function usePrayerTimes(
  options: UsePrayerTimesOptions = {},
): PrayerTimesState {
  const requestedInstant = options.instant ?? new Date()
  const requestedDateKey = getDateKeyInTimeZone(
    requestedInstant,
    prayerCalculationConfig.location.timezone,
  )
  const loader = options.loader ?? loadDailyPrayerTimes
  const [datedState, setDatedState] = useState<DatedPrayerTimesState | null>(
    null,
  )

  useEffect(() => {
    let active = true

    void loader(requestedInstant)
      .then((result) => {
        if (active) {
          setDatedState({
            dateKey: requestedDateKey,
            value: { status: 'success', result },
          })
        }
      })
      .catch(() => {
        if (active) {
          setDatedState({
            dateKey: requestedDateKey,
            value: { status: 'error' },
          })
        }
      })

    return () => {
      active = false
    }
    // The instant changes once per minute; its local date is the intentional
    // reload boundary for the daily schedule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader, requestedDateKey])

  return datedState?.dateKey === requestedDateKey
    ? datedState.value
    : { status: 'loading' }
}
