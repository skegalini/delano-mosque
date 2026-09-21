import { useTranslation } from 'react-i18next'

import { VisitorInformation } from '../components/mosque/VisitorInformation'
import { MosqueMap } from '../components/mosque/MosqueMap'
import { mosqueData } from '../data/mosque'
import { resolveLocalizedContent } from '../domain/localization'

export function VisitPage() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')

  return (
    <div className="about-page visit-page">
      <h1 className="about-page__title visit-page__title font-heading">
        {t('pages.visit.heading')}
      </h1>
      <div className="about-page__layout visit-page__layout">
        <VisitorInformation />
        <MosqueMap mosqueName={mosqueName} />
      </div>
    </div>
  )
}
