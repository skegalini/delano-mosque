import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.home.title')}>{t('pages.home.body')}</PageShell>
  )
}
