import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'

import { PublicHeader } from './PublicHeader'

export function PublicLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isVisit = location.pathname === '/visit'
  const isAbout = location.pathname === '/about'
  const mainClassName = isHome
    ? 'site-main site-main--home'
    : isVisit
      ? 'site-main site-main--visit'
      : isAbout
        ? 'site-main site-main--about'
        : 'site-main'

  useEffect(() => {
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [location.key])

  return (
    <div className="site-shell">
      <PublicHeader />

      <main className={mainClassName}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">{t('footer.status')}</div>
      </footer>
    </div>
  )
}
