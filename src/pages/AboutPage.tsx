import { useTranslation } from 'react-i18next'

import { VisitorInformation } from '../components/mosque/VisitorInformation'
import { mosqueData } from '../data/mosque'
import { resolveLocalizedContent } from '../domain/localization'

export function AboutPage() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-masjid-green-deep)] sm:text-4xl">
        {t('pages.about.heading', { mosqueName })}
      </h1>
      <VisitorInformation />
    </div>
  )
}
