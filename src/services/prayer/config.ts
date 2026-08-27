export type AlAdhanConfig = {
  endpoint: string
  location: {
    latitude: number
    longitude: number
    timezone: string
  }
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
  endpoint: 'https://api.aladhan.com/v1/calendar',
  location: {
    latitude: 35.772517,
    longitude: -119.243572,
    timezone: 'America/Los_Angeles',
  },
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
