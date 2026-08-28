import { prayerCalculationConfig } from '../config/prayer'
import type { MosqueData } from '../domain/mosque'

export const mosqueData = {
  identity: {
    canonicalName: {
      en: 'Abu Bakr Al-Siddiq Mosque',
      ar: 'مسجد أبي بكر الصديق',
    },
    address: '1130 Kensington St, Delano, CA 93215',
    plannedDomain: 'delanomosque.org',
  },
  timezone: prayerCalculationConfig.location.timezone,
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
    email: 'delanomosque@gmail.com',
  },
  jummah: {
    day: 'friday',
    time: '13:00',
    notes: null,
  },
  currentPrayerSchedule: null,
} satisfies MosqueData
