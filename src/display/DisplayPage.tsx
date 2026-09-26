import { useTranslation } from 'react-i18next'

import { SiteMetadata } from '../components/seo/SiteMetadata'

export function DisplayPage() {
  const { t } = useTranslation()

  return (
    <>
      <SiteMetadata />
      <main className="grid min-h-screen place-items-center bg-[var(--color-masjid-green-deep)] p-8 text-center text-white">
        <div>
          <h1 className="text-4xl font-semibold">{t('pages.display.title')}</h1>
          <p className="mt-4 text-white/80">{t('pages.display.body')}</p>
        </div>
      </main>
    </>
  )
}
