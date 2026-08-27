import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const quickDestinations = [
  { to: '/history', label: 'navigation.history' },
  { to: '/programs', label: 'navigation.programs' },
  { to: '/donate', label: 'navigation.donate' },
  { to: '/about', label: 'pages.home.quickDestinations.aboutVisit' },
] as const

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-10">
      <section className="max-w-3xl" aria-labelledby="home-title">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-carpet-red)]">
          {t('siteName')}
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-masjid-green-deep)] sm:text-4xl"
          id="home-title"
        >
          {t('pages.home.title')}
        </h1>
        <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
          {t('pages.home.body')}
        </p>
      </section>

      <HomeSection title={t('pages.home.prayerTimes.title')}>
        {t('pages.home.prayerTimes.placeholder')}
      </HomeSection>

      <HomeSection title={t('pages.home.jummah.title')}>
        {t('pages.home.jummah.placeholder')}
      </HomeSection>

      <section aria-labelledby="quick-destinations-title">
        <h2
          className="text-xl font-semibold text-[var(--color-masjid-green-deep)]"
          id="quick-destinations-title"
        >
          {t('pages.home.quickDestinations.title')}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickDestinations.map(({ label, to }) => (
            <li key={to}>
              <Link
                className="block rounded border border-black/10 bg-[var(--color-surface)] px-4 py-3 font-medium text-[var(--color-masjid-green-deep)] hover:border-[var(--color-masjid-green)]"
                to={to}
              >
                {t(label)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HomeSection title={t('pages.home.upcoming.title')}>
        {t('pages.home.upcoming.placeholder')}
      </HomeSection>

      <HomeSection title={t('pages.home.announcements.title')}>
        {t('pages.home.announcements.placeholder')}
      </HomeSection>

      <HomeSection title={t('pages.home.location.title')}>
        {t('pages.home.location.placeholder')}
      </HomeSection>
    </div>
  )
}

type HomeSectionProps = {
  children: string
  title: string
}

function HomeSection({ children, title }: HomeSectionProps) {
  return (
    <section className="max-w-3xl border-t border-black/10 pt-6">
      <h2 className="text-xl font-semibold text-[var(--color-masjid-green-deep)]">
        {title}
      </h2>
      <p className="mt-2 text-[var(--color-text-muted)]">{children}</p>
    </section>
  )
}
