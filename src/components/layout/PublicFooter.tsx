import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { mosqueData } from '../../data/mosque'
import { resolveLocalizedContent } from '../../domain/localization'
import { GeometricBorder } from './GeometricBorder'

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  mosqueData.identity.address,
)}`

export function PublicFooter() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <GeometricBorder variant="nav" />
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link
            aria-label={mosqueName}
            className="site-footer__logo-link"
            to="/"
          >
            <img
              alt=""
              aria-hidden="true"
              className="site-footer__logo"
              decoding="async"
              height="1254"
              src="/assets/brand/abu-bakr-logo-dark-clean.png"
              width="1254"
            />
          </Link>
          <div className="site-footer__identity">
            <strong className="site-footer__name font-heading">
              {mosqueName}
            </strong>
            <a
              className="site-footer__location"
              href={directionsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('footer.location')}
            </a>
          </div>
        </div>

        <p className="site-footer__copyright">
          {t('footer.copyright', { year: currentYear, mosqueName })}
        </p>
      </div>
    </footer>
  )
}
