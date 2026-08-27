import { useTranslation } from 'react-i18next'

import type { DailyPrayerTimes } from '../../domain/prayer'
import { usePrayerTimes } from '../../hooks/usePrayerTimes'

const displayedTimes = [
  { key: 'fajr', label: 'pages.home.prayerTimes.labels.fajr' },
  { key: 'sunrise', label: 'pages.home.prayerTimes.labels.sunrise' },
  { key: 'dhuhr', label: 'pages.home.prayerTimes.labels.dhuhr' },
  { key: 'asr', label: 'pages.home.prayerTimes.labels.asr' },
  { key: 'maghrib', label: 'pages.home.prayerTimes.labels.maghrib' },
  { key: 'isha', label: 'pages.home.prayerTimes.labels.isha' },
] as const satisfies readonly {
  key: keyof Pick<
    DailyPrayerTimes,
    'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
  >
  label: string
}[]

export function PrayerTimes() {
  const { i18n, t } = useTranslation()
  const state = usePrayerTimes()
  const locale = i18n.resolvedLanguage ?? 'en'

  return (
    <section className="max-w-3xl border-t border-black/10 pt-6">
      <h2 className="text-xl font-semibold text-[var(--color-masjid-green-deep)]">
        {t('pages.home.prayerTimes.title')}
      </h2>

      {state.status === 'loading' && (
        <p
          className="mt-2 text-[var(--color-text-muted)]"
          aria-live="polite"
          role="status"
        >
          {t('pages.home.prayerTimes.loading')}
        </p>
      )}

      {state.status === 'error' && (
        <p className="mt-2 text-[var(--color-text-muted)]" role="alert">
          {t('pages.home.prayerTimes.unavailable')}
        </p>
      )}

      {state.status === 'success' && (
        <div className="mt-3">
          <p className="text-sm text-[var(--color-text-muted)]">
            {formatPrayerDate(state.result.times.date, locale)}
          </p>
          <dl className="mt-4 grid max-w-md grid-cols-[1fr_auto] gap-x-8 gap-y-3">
            {displayedTimes.map(({ key, label }) => (
              <div className="contents" key={key}>
                <dt>{t(label)}</dt>
                <dd className="font-medium tabular-nums">
                  {formatPrayerTime(state.result.times[key], locale)}
                </dd>
              </div>
            ))}
          </dl>
          {state.result.source === 'stale-cache' && (
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              {t('pages.home.prayerTimes.cachedNotice')}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

function formatPrayerDate(dateKey: string, locale: string): string {
  const date = new Date(`${dateKey}T12:00:00Z`)

  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function formatPrayerTime(time: string, locale: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date(Date.UTC(2000, 0, 1, hour, minute))

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date)
}
