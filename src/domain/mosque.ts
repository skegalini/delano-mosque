import type { LocalizedContent } from './localization'
import type { DailyPrayerTimes } from './prayer'

export type MosqueIdentity = {
  canonicalName: LocalizedContent
  address: string
  plannedDomain: string
}

export type VisitorFacilities = {
  separateWomensEntrance: boolean | null
  wuduAvailable: boolean | null
  womensEntranceDirections: LocalizedContent | null
  wuduLocations: LocalizedContent | null
  parkingGuidance: LocalizedContent | null
  accessibilityInformation: LocalizedContent | null
  accessHours: LocalizedContent | null
}

export type PublicContact = {
  phone: string | null
  email: string | null
}

export type JummahSchedule = {
  day: 'friday'
  time: string
  notes: LocalizedContent | null
}

export type MosqueData = {
  identity: MosqueIdentity
  timezone: string
  visitorFacilities: VisitorFacilities
  publicContact: PublicContact
  jummah: JummahSchedule
  currentPrayerSchedule: DailyPrayerTimes | null
}
