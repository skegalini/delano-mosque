import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ar from './locales/ar.json'
import en from './locales/en.json'
import es from './locales/es.json'

export const supportedLanguages = ['en', 'es', 'ar'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

const isSupportedLanguage = (language: string): language is SupportedLanguage =>
  supportedLanguages.includes(language as SupportedLanguage)

const updateDocumentLanguage = (language: string) => {
  const normalizedLanguage = language.split('-')[0]
  const currentLanguage = isSupportedLanguage(normalizedLanguage)
    ? normalizedLanguage
    : 'en'

  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    ar: { translation: ar },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', updateDocumentLanguage)
updateDocumentLanguage(i18n.resolvedLanguage ?? 'en')

export default i18n
