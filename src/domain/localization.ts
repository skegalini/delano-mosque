export const supportedLanguages = ['en', 'es', 'ar'] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export type LocalizedContent = Partial<Record<SupportedLanguage, string>>

export function normalizeSupportedLanguage(
  language: string,
): SupportedLanguage | null {
  const normalizedLanguage = language.toLowerCase().split('-')[0]

  return supportedLanguages.includes(normalizedLanguage as SupportedLanguage)
    ? (normalizedLanguage as SupportedLanguage)
    : null
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
