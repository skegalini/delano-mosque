import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  normalizeSupportedLanguage,
  resolvePreferredLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from '../domain/localization'
import ar from './locales/ar.json'
import en from './locales/en.json'
import es from './locales/es.json'

export { supportedLanguages, type SupportedLanguage }

export const siteLanguageStorageKey = 'delano-mosque:language'

/** A language the visitor picked here before. Explicit choices always win. */
function readStoredLanguage(): SupportedLanguage | null {
  try {
    const storedLanguage = window.localStorage.getItem(siteLanguageStorageKey)

    return storedLanguage ? normalizeSupportedLanguage(storedLanguage) : null
  } catch {
    return null
  }
}

/** The visitor's ordered browser/device preferences, most preferred first. */
function readBrowserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') {
    return []
  }

  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages
  }

  return navigator.language ? [navigator.language] : []
}

/**
 * Resolved once, synchronously, before the first render, so the site never
 * paints English and then swaps to the visitor's language.
 */
function resolveInitialLanguage(): SupportedLanguage {
  return (
    readStoredLanguage() ??
    resolvePreferredLanguage(readBrowserLanguages()) ??
    'en'
  )
}

/**
 * Switch language on the visitor's behalf and remember it. Only an explicit
 * choice is stored, so an undecided visitor keeps following their browser.
 */
export function changeSiteLanguage(language: SupportedLanguage) {
  try {
    window.localStorage.setItem(siteLanguageStorageKey, language)
  } catch {
    // The choice still applies for this session when storage is unavailable.
  }

  return i18n.changeLanguage(language)
}

const updateDocumentLanguage = (language: string) => {
  const currentLanguage = normalizeSupportedLanguage(language) ?? 'en'

  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ar: { translation: ar },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', updateDocumentLanguage)
updateDocumentLanguage(i18n.resolvedLanguage ?? 'en')

export default i18n
