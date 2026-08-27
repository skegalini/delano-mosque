import type { MosqueData } from '../domain/mosque'

export const mosqueData = {
  identity: {
    canonicalName: {
      en: 'Abu Bakr Al-Siddiq Mosque',
      ar: 'مسجد أبي بكر الصديق',
    },
    address: '1130 Kensington St, Delano, CA 93215',
    timezone: 'America/Los_Angeles',
    plannedDomain: 'delanomosque.org',
  },
  visitorFacilities: {
    separateWomensEntrance: true,
    wuduAvailable: true,
    womensEntranceDirections: null,
    wuduLocations: null,
    parkingGuidance: null,
    accessibilityInformation: null,
    accessHours: null,
  },
  publicContact: {
    phone: null,
    email: null,
  },
  currentPrayerSchedule: null,
} satisfies MosqueData
