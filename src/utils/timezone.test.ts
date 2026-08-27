import {
  formatInTimeZone,
  getDateKeyInTimeZone,
  getDatePartsInTimeZone,
  isValidTimeZone,
} from './timezone'

describe('timezone utilities', () => {
  const timezone = 'America/Los_Angeles'

  it('recognizes valid and invalid timezone identifiers', () => {
    expect(isValidTimeZone(timezone)).toBe(true)
    expect(isValidTimeZone('Not/A_Timezone')).toBe(false)
  })

  it('returns the mosque-local date across a UTC date boundary', () => {
    const instant = new Date('2026-08-27T06:30:00Z')

    expect(getDateKeyInTimeZone(instant, timezone)).toBe('2026-08-26')
    expect(getDatePartsInTimeZone(instant, timezone)).toEqual({
      year: 2026,
      month: 8,
      day: 26,
      dateKey: '2026-08-26',
    })
  })

  it('formats an instant in the requested timezone', () => {
    const instant = new Date('2026-08-27T19:00:00Z')

    expect(
      formatInTimeZone(instant, timezone, 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    ).toBe('12:00 PM')
  })
})
