import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.about.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
