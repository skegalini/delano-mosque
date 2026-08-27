import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function PrayerTimesPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.prayerTimes.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
