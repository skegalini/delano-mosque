import { mosqueData } from './mosque'

describe('initial mosque data', () => {
  it('contains the confirmed mosque identity', () => {
    expect(mosqueData.identity).toEqual({
      canonicalName: {
        en: 'Abu Bakr Al-Siddiq Mosque',
        ar: 'مسجد أبي بكر الصديق',
      },
      address: '1130 Kensington St, Delano, CA 93215',
      plannedDomain: 'delanomosque.org',
    })
  })

  it('records confirmed visitor facilities', () => {
    expect(mosqueData.visitorFacilities.separateWomensEntrance).toBe(true)
    expect(mosqueData.visitorFacilities.wuduAvailable).toBe(true)
  })

  it('leaves unconfirmed information null', () => {
    expect(mosqueData.publicContact).toEqual({ phone: null, email: null })
    expect(mosqueData.visitorFacilities.parkingGuidance).toBeNull()
    expect(mosqueData.visitorFacilities.accessibilityInformation).toBeNull()
    expect(mosqueData.currentPrayerSchedule).toBeNull()
  })
})
