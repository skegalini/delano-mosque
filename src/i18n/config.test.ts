import { afterEach, beforeEach, vi } from 'vitest'

const storageKey = 'delano-mosque:language'

/**
 * Initialization resolves the language once at module load, so each case needs
 * a fresh module registry with the browser preferences already in place.
 */
async function loadI18n(options: {
  languages?: readonly string[]
  language?: string
  stored?: string
}) {
  if (options.stored) {
    window.localStorage.setItem(storageKey, options.stored)
  }

  vi.stubGlobal('navigator', {
    languages: options.languages,
    language: options.language,
  })

  vi.resetModules()
  return import('./config')
}

describe('site language initialization', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('uses Arabic with RTL for an Arabic browser preference', async () => {
    const { default: i18n } = await loadI18n({ languages: ['ar-SA', 'en-US'] })

    expect(i18n.resolvedLanguage).toBe('ar')
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('uses Spanish with LTR for a Spanish browser preference', async () => {
    const { default: i18n } = await loadI18n({ languages: ['es-MX', 'en-US'] })

    expect(i18n.resolvedLanguage).toBe('es')
    expect(document.documentElement.lang).toBe('es')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('falls back to English when no preference is supported', async () => {
    const { default: i18n } = await loadI18n({ languages: ['fr-FR', 'de-DE'] })

    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('reads navigator.language when navigator.languages is empty', async () => {
    const { default: i18n } = await loadI18n({
      languages: [],
      language: 'ar-EG',
    })

    expect(i18n.resolvedLanguage).toBe('ar')
  })

  it('respects a saved choice over the browser preference', async () => {
    const { default: i18n } = await loadI18n({
      languages: ['ar-SA'],
      stored: 'en',
    })

    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('respects a saved Spanish choice on an Arabic device', async () => {
    const { default: i18n } = await loadI18n({
      languages: ['ar-SA', 'ar'],
      stored: 'es',
    })

    expect(i18n.resolvedLanguage).toBe('es')
  })

  it('persists an explicit switch and applies it on the next visit', async () => {
    const first = await loadI18n({ languages: ['ar-SA'] })
    expect(first.default.resolvedLanguage).toBe('ar')

    await first.changeSiteLanguage('en')

    expect(window.localStorage.getItem(storageKey)).toBe('en')
    expect(document.documentElement.dir).toBe('ltr')

    // Same device preferences on the next visit; the choice still wins.
    vi.stubGlobal('navigator', { languages: ['ar-SA'] })
    vi.resetModules()
    const second = await import('./config')

    expect(second.default.resolvedLanguage).toBe('en')
  })

  it('does not store anything for a visitor who never chose', async () => {
    await loadI18n({ languages: ['es-MX'] })

    expect(window.localStorage.getItem(storageKey)).toBeNull()
  })
})
