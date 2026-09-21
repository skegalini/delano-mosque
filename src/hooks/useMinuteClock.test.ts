import { act, renderHook } from '@testing-library/react'

import { useMinuteClock } from './useMinuteClock'

describe('useMinuteClock', () => {
  it('updates at each wall-clock minute boundary', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-27T19:00:30.000Z'))

    const { result } = renderHook(() => useMinuteClock())
    expect(result.current).toEqual(new Date('2026-08-27T19:00:30.000Z'))

    act(() => {
      vi.advanceTimersByTime(29_999)
    })
    expect(result.current).toEqual(new Date('2026-08-27T19:00:30.000Z'))

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toEqual(new Date('2026-08-27T19:01:00.000Z'))

    act(() => {
      vi.advanceTimersByTime(60_000)
    })
    expect(result.current).toEqual(new Date('2026-08-27T19:02:00.000Z'))
  })
})
