import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import {
  supportedLanguageAbbreviations,
  supportedLanguageNames,
  supportedLanguages,
} from '../../domain/localization'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { changeSiteLanguage, type SupportedLanguage } from '../../i18n/config'
import { VolunteerActivismIcon } from '../icons/VolunteerActivismIcon'
import { GeometricBorder } from './GeometricBorder'

const navigation = [
  { to: '/', label: 'navigation.home', end: true },
  { to: '/visit', label: 'navigation.visit', end: false },
  { to: '/programs', label: 'navigation.programs', end: false },
  { to: '/about', label: 'navigation.about', end: false },
] as const

// Phones only get the compact labels; tablets and desktops have room for the
// full names, including inside the collapsed menu panel.
const roomForFullLanguageNamesQuery = 'not all and (max-width: 34rem)'

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const showsFullLanguageNames = useMediaQuery(roomForFullLanguageNamesQuery)

  const changeLanguage = (language: SupportedLanguage) => {
    void changeSiteLanguage(language)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link aria-label={t('siteName')} className="site-brand" to="/">
          <img
            alt={t('siteName')}
            className="site-brand__official-logo"
            decoding="async"
            height="1254"
            src="/assets/brand/abu-bakr-logo-dark-clean.png"
            width="1254"
          />
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')
          }
          className="menu-toggle"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span aria-hidden="true" className="menu-toggle__lines">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div
          className={`site-header__navigation${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <nav aria-label={t('navigation.label')}>
            <ul className="site-nav">
              {navigation.map(({ end, label, to }) => (
                <li key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      `site-nav__link${isActive ? ' is-active' : ''}`
                    }
                    end={end}
                    onClick={() => setIsMenuOpen(false)}
                    to={to}
                  >
                    {t(label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <label className="language-control" htmlFor="language">
              <span className="sr-only">{t('language.label')}</span>
              <select
                aria-label={t('language.label')}
                id="language"
                onChange={(event) =>
                  changeLanguage(event.target.value as SupportedLanguage)
                }
                value={i18n.resolvedLanguage ?? 'en'}
              >
                {supportedLanguages.map((language) => (
                  <option key={language} value={language}>
                    {showsFullLanguageNames
                      ? supportedLanguageNames[language]
                      : supportedLanguageAbbreviations[language]}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="button button--donate site-header__donate"
              data-gb-account="pmetkEb39XTuRaXB"
              data-gb-campaign="HUXSOZ"
              type="button"
            >
              <VolunteerActivismIcon aria-hidden="true" />
              {t('navigation.donate')}
            </button>
          </div>
        </div>
      </div>
      <GeometricBorder variant="nav" />
    </header>
  )
}
