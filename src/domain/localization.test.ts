import {
  normalizeSupportedLanguage,
  resolveLocalizedContent,
} from './localization'

describe('localized content', () => {
  const content = {
    en: 'English content',
    ar: 'محتوى عربي',
  }

  it('returns content in the requested supported language', () => {
    expect(resolveLocalizedContent(content, 'ar')).toBe('محتوى عربي')
  })

  it('normalizes regional language identifiers', () => {
    expect(normalizeSupportedLanguage('es-MX')).toBe('es')
  })

  it('falls back to English when the requested content is absent', () => {
    expect(resolveLocalizedContent(content, 'es')).toBe('English content')
  })

  it('returns null when neither requested nor fallback content exists', () => {
    expect(resolveLocalizedContent({ ar: 'محتوى عربي' }, 'es')).toBeNull()
  })
})
