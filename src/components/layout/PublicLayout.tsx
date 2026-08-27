import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'

import type { SupportedLanguage } from '../../i18n/config'

const navigation = [
  { to: '/', label: 'navigation.home' },
  { to: '/history', label: 'navigation.history' },
  { to: '/programs', label: 'navigation.programs' },
  { to: '/donate', label: 'navigation.donate' },
  { to: '/about', label: 'navigation.about' },
] as const

export function PublicLayout() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-warm-background)] text-[var(--color-text)]">
      <header className="border-b border-black/10 bg-[var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-semibold text-[var(--color-masjid-green-deep)]">
              {t('siteName')}
            </p>
            <label
              className="flex items-center gap-2 text-sm"
              htmlFor="language"
            >
              <span>{t('language.label')}</span>
              <select
                className="rounded border border-black/20 bg-white px-2 py-1"
                id="language"
                onChange={(event) =>
                  changeLanguage(event.target.value as SupportedLanguage)
                }
                value={i18n.resolvedLanguage ?? 'en'}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="ar">العربية</option>
              </select>
            </label>
          </div>
          <nav aria-label={t('navigation.label')}>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {navigation.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'font-semibold text-[var(--color-masjid-green-deep)] underline decoration-2 underline-offset-4'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }
                    end={to === '/'}
                    to={to}
                  >
                    {t(label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-black/10 bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 text-sm text-[var(--color-text-muted)] sm:px-6">
          {t('footer.status')}
        </div>
      </footer>
    </div>
  )
}
