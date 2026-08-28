import { useTranslation } from 'react-i18next'

import { donationConfiguration } from '../../data/donation'

export function DonationSection() {
  const { t } = useTranslation()

  if (donationConfiguration.status !== 'pending-setup') {
    return null
  }

  return (
    <section className="mt-8 border-t border-black/10 pt-6">
      <h2 className="text-xl font-semibold text-[var(--color-masjid-green-deep)]">
        {t('pages.donate.online.title')}
      </h2>
      <p className="mt-3 text-[var(--color-text-muted)]">
        {t('pages.donate.online.pending')}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        {t('pages.donate.online.pendingDetail')}
      </p>
    </section>
  )
}
