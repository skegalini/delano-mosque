import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function HistoryPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.history.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
