import { useTranslation } from 'react-i18next'

import { DonationSection } from '../components/donation/DonationSection'
import { mosqueData } from '../data/mosque'
import { resolveLocalizedContent } from '../domain/localization'

export function DonatePage() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-masjid-green-deep)] sm:text-4xl">
        {t('pages.donate.heading', { mosqueName })}
      </h1>
      <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
        {t('pages.donate.introduction')}
      </p>
      <DonationSection />
    </div>
  )
}
