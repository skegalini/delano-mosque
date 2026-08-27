import type { LocalizedContent } from './localization'
import type { PrayerSchedule } from './prayer'

export type MosqueIdentity = {
  canonicalName: LocalizedContent
  address: string
  timezone: string
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

export type MosqueData = {
  identity: MosqueIdentity
  visitorFacilities: VisitorFacilities
  publicContact: PublicContact
  currentPrayerSchedule: PrayerSchedule | null
}
