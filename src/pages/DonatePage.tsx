import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function DonatePage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.donate.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
