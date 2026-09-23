import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import {
  supportedLanguageNames,
  supportedLanguages,
} from '../../domain/localization'
import { changeSiteLanguage, type SupportedLanguage } from '../../i18n/config'
import { VolunteerActivismIcon } from '../icons/VolunteerActivismIcon'
import { GeometricBorder } from './GeometricBorder'

const navigation = [
  { to: '/', label: 'navigation.home', end: true },
  { to: '/visit', label: 'navigation.visit', end: false },
  { to: '/programs', label: 'navigation.programs', end: false },
  { to: '/about', label: 'navigation.about', end: false },
] as const

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageControlRef = useRef<HTMLDivElement>(null)
  const languageButtonRef = useRef<HTMLButtonElement>(null)
  const { i18n, t } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? 'en') as SupportedLanguage

  useEffect(() => {
    const closeLanguageMenu = (event: PointerEvent) => {
      if (!languageControlRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeLanguageMenu)
    return () => document.removeEventListener('pointerdown', closeLanguageMenu)
  }, [])

  const changeLanguage = (language: SupportedLanguage) => {
    void changeSiteLanguage(language)
    setIsLanguageMenuOpen(false)
    languageButtonRef.current?.focus()
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

        <div className="site-header__right">
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
          </div>

          <div className="site-header__actions">
            <div className="language-control" ref={languageControlRef}>
              <button
                aria-label={t('language.label')}
                aria-controls="language-options"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="listbox"
                className="language-control__trigger"
                id="language-selector"
                onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setIsLanguageMenuOpen(false)
                  }
                }}
                ref={languageButtonRef}
                type="button"
              >
                <span>{supportedLanguageNames[currentLanguage]}</span>
                <span
                  aria-hidden="true"
                  className="language-control__chevron"
                />
              </button>

              {isLanguageMenuOpen ? (
                <ul
                  aria-label={t('language.label')}
                  className="language-control__options"
                  id="language-options"
                  role="listbox"
                >
                  {supportedLanguages.map((language) => (
                    <li key={language} role="presentation">
                      <button
                        aria-selected={language === currentLanguage}
                        className="language-control__option"
                        lang={language}
                        onClick={() => changeLanguage(language)}
                        role="option"
                        type="button"
                      >
                        {supportedLanguageNames[language]}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

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
        </div>
      </div>
      <GeometricBorder variant="nav" />
    </header>
  )
}
