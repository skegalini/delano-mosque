import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { DonationDialogProvider } from '../donation/DonationDialogProvider'
import { PublicFooter } from './PublicFooter'
import { PublicHeader } from './PublicHeader'

export function PublicLayout() {
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
    <DonationDialogProvider>
      <div className="site-shell">
        <PublicHeader />

        <main className={mainClassName}>
          <Outlet />
        </main>

        <PublicFooter />
      </div>
    </DonationDialogProvider>
  )
}
