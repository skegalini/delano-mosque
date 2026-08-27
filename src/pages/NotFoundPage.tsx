import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.notFound.title')}>
      {t('pages.notFound.body')}
    </PageShell>
  )
}
