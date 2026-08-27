import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function ProgramsPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.programs.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
