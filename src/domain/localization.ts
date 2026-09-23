export const supportedLanguages = ['en', 'es', 'ar'] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export type LocalizedContent = Partial<Record<SupportedLanguage, string>>

/**
 * Endonyms — each language written in itself, the usual convention for a
 * language picker so a reader can find their own language whatever the
 * current locale. Identical in every locale, so these are data, not copy.
 */
export const supportedLanguageNames = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
} as const satisfies Record<SupportedLanguage, string>

export function normalizeSupportedLanguage(
  language: string,
): SupportedLanguage | null {
  const normalizedLanguage = language.toLowerCase().split('-')[0]

  return supportedLanguages.includes(normalizedLanguage as SupportedLanguage)
    ? (normalizedLanguage as SupportedLanguage)
    : null
}

/**
 * First supported language in an ordered preference list, e.g. the value of
 * `navigator.languages`. Regional variants are matched on their language
 * subtag, so `ar-SA`, `es-MX` and `en-GB` resolve to `ar`, `es` and `en`.
 */
export function resolvePreferredLanguage(
  preferences: readonly string[],
): SupportedLanguage | null {
  for (const preference of preferences) {
    const language = normalizeSupportedLanguage(preference)

    if (language) {
      return language
    }
  }

  return null
}

export function resolveLocalizedContent(
  content: LocalizedContent,
  requestedLanguage: string,
  fallbackLanguage: SupportedLanguage = 'en',
): string | null {
  const language = normalizeSupportedLanguage(requestedLanguage)

  if (language && content[language]) {
    return content[language]
  }

  return content[fallbackLanguage] || null
}
