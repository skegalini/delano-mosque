import { useTranslation } from 'react-i18next'

import { PageShell } from '../components/layout/PageShell'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <PageShell title={t('pages.contact.title')}>
      {t('pages.placeholder')}
    </PageShell>
  )
}
