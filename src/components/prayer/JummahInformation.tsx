import { useTranslation } from 'react-i18next'

import { mosqueData } from '../../data/mosque'
import { formatClockTime } from '../../utils/clock'

const jummahDayLabels = {
  friday: 'pages.home.jummah.days.friday',
} as const

export function JummahInformation() {
  const { i18n, t } = useTranslation()
  const locale = i18n.resolvedLanguage ?? 'en'
  const { jummah } = mosqueData

  return (
    <section className="max-w-3xl border-t border-black/10 pt-6">
      <h2 className="text-xl font-semibold text-[var(--color-masjid-green-deep)]">
        {t('pages.home.jummah.title')}
      </h2>
      <p className="mt-2 text-[var(--color-text-muted)]">
        {t(jummahDayLabels[jummah.day])}
      </p>
      <p className="mt-1 text-lg font-semibold tabular-nums">
        {formatClockTime(jummah.time, locale)}
      </p>
    </section>
  )
}
