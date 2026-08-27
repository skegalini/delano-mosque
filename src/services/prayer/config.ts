import { mosqueData } from '../../data/mosque'

export type AlAdhanConfig = {
  endpoint: string
  address: string
  timezone: string
  calculationMethod: {
    id: number
    cacheName: string
  }
  asrSchool: {
    id: number
    cacheName: string
  }
}

export const alAdhanConfig: AlAdhanConfig = {
  endpoint: 'https://api.aladhan.com/v1/calendarByAddress',
  address: mosqueData.identity.address,
  timezone: mosqueData.identity.timezone,
  calculationMethod: {
    id: 2,
    cacheName: 'isna',
  },
  // AlAdhan school 0 is its standard/Shafi Asr calculation. This is a
  // configurable development default, not a mosque-confirmed convention.
  asrSchool: {
    id: 0,
    cacheName: 'standard',
  },
}
