import {
  normalizeSupportedLanguage,
  resolvePreferredLanguage,
} from './localization'

describe('resolvePreferredLanguage', () => {
  it('picks the first supported language in the preference list', () => {
    expect(resolvePreferredLanguage(['ar-SA', 'en-US'])).toBe('ar')
    expect(resolvePreferredLanguage(['es-MX', 'ar'])).toBe('es')
    expect(resolvePreferredLanguage(['en-GB', 'es'])).toBe('en')
  })

  it('skips unsupported languages before an supported one', () => {
    expect(resolvePreferredLanguage(['fr-FR', 'de', 'es-ES'])).toBe('es')
    expect(resolvePreferredLanguage(['zh-Hans-CN', 'ar-EG'])).toBe('ar')
  })

  it('normalizes regional variants down to the language subtag', () => {
    const arabic = ['ar-SA', 'ar-YE', 'ar-EG', 'AR-ma']
    const spanish = ['es-MX', 'es-US', 'es-ES', 'ES-419']
    const english = ['en-US', 'en-GB', 'EN-au']

    arabic.forEach((tag) => expect(normalizeSupportedLanguage(tag)).toBe('ar'))
    spanish.forEach((tag) => expect(normalizeSupportedLanguage(tag)).toBe('es'))
    english.forEach((tag) => expect(normalizeSupportedLanguage(tag)).toBe('en'))
  })

  it('returns null when nothing in the list is supported', () => {
    expect(resolvePreferredLanguage(['fr-FR', 'de-DE', 'ja'])).toBeNull()
    expect(resolvePreferredLanguage([])).toBeNull()
  })
})
