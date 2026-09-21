import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'

import { App } from './app/App'
import './i18n/config'
import './styles/globals.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element was not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
