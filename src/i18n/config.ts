import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  normalizeSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from '../domain/localization'
import ar from './locales/ar.json'
import en from './locales/en.json'
import es from './locales/es.json'

export { supportedLanguages, type SupportedLanguage }

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
