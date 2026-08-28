import { prayerCalculationConfig } from '../../config/prayer'
import { buildPrayerCalendarCacheKey } from './cache'

describe('prayer calendar cache identity', () => {
  it('changes when the calculation coordinates change', () => {
    const originalKey = buildPrayerCalendarCacheKey(2026, 8)
    const relocatedKey = buildPrayerCalendarCacheKey(2026, 8, {
      ...prayerCalculationConfig,
      location: {
        ...prayerCalculationConfig.location,
        latitude: prayerCalculationConfig.location.latitude + 0.001,
      },
    })

    expect(relocatedKey).not.toBe(originalKey)
    expect(originalKey).toContain('lat-35.772517')
    expect(originalKey).toContain('lon--119.243572')
    expect(originalKey).toContain('method-2-isna')
    expect(originalKey).toContain('school-0-standard')
  })
})
