import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function CommunityPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.community.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
