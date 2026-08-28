import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

import i18n from '../i18n/config'

beforeEach(() => {
  window.localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn().mockRejectedValue(new TypeError('Network is disabled in tests')),
  )
})

afterEach(async () => {
  cleanup()
  await i18n.changeLanguage('en')
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
