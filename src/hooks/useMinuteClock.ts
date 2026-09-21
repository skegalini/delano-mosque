import { useEffect, useState } from 'react'

const minuteInMilliseconds = 60_000

export function useMinuteClock(): Date {
  const [instant, setInstant] = useState(() => new Date())

  useEffect(() => {
    let timeoutId: number | undefined

    const scheduleNextMinute = () => {
      const delay = minuteInMilliseconds - (Date.now() % minuteInMilliseconds)

      timeoutId = window.setTimeout(() => {
        setInstant(new Date())
        scheduleNextMinute()
      }, delay)
    }

    scheduleNextMinute()

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return instant
}
