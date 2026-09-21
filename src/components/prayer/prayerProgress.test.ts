import type { DailyPrayerTimes } from '../../domain/prayer'
import {
  getActivePrayerKey,
  getDayProgress,
  prayerMarkerProgress,
} from './prayerProgress'

const times: DailyPrayerTimes = {
  date: '2026-08-27',
  timezone: 'America/Los_Angeles',
  fajr: '04:51',
  sunrise: '06:18',
  dhuhr: '12:59',
  asr: '17:01',
  maghrib: '19:39',
  isha: '21:06',
}

describe('prayer progress', () => {
  it.each([
    ['before Fajr', '2026-08-27T10:00:00Z', 'isha'],
    ['during Fajr', '2026-08-27T12:00:00Z', 'fajr'],
    ['after Sunrise', '2026-08-27T14:00:00Z', null],
    ['during Dhuhr', '2026-08-27T21:00:00Z', 'dhuhr'],
    ['during Asr', '2026-08-28T01:00:00Z', 'asr'],
    ['during Maghrib', '2026-08-28T03:00:00Z', 'maghrib'],
    ['after Isha', '2026-08-28T05:00:00Z', 'isha'],
  ])(
    'identifies %s without treating Sunrise as a prayer',
    (_, instant, expected) => {
      expect(getActivePrayerKey(times, new Date(instant))).toBe(expected)
    },
  )

  it('clamps the visual day progress to the Fajr-to-Isha range', () => {
    expect(getDayProgress(times, new Date('2026-08-27T10:00:00Z'))).toBe(0)
    expect(getDayProgress(times, new Date('2026-08-28T05:00:00Z'))).toBe(1)
  })

  it.each([
    ['Fajr', '2026-08-27T11:51:00Z', prayerMarkerProgress.fajr],
    ['Sunrise', '2026-08-27T13:18:00Z', prayerMarkerProgress.sunrise],
    ['Dhuhr', '2026-08-27T19:59:00Z', prayerMarkerProgress.dhuhr],
    ['Asr', '2026-08-28T00:01:00Z', prayerMarkerProgress.asr],
    ['Maghrib', '2026-08-28T02:39:00Z', prayerMarkerProgress.maghrib],
    ['Isha', '2026-08-28T04:06:00Z', prayerMarkerProgress.isha],
  ])('aligns the highlight with the %s marker', (_, instant, expected) => {
    expect(getDayProgress(times, new Date(instant))).toBeCloseTo(expected)
  })

  it('interpolates within the current marker segment', () => {
    const expectedMidpoint =
      (prayerMarkerProgress.dhuhr + prayerMarkerProgress.asr) / 2

    expect(getDayProgress(times, new Date('2026-08-27T22:00:00Z'))).toBeCloseTo(
      expectedMidpoint,
    )
  })
})
