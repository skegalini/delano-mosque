import { useTranslation } from 'react-i18next'

import { JummahCongregationIcon } from '../icons/JummahCongregationIcon'
import { mosqueData } from '../../data/mosque'
import { formatClockTime } from '../../utils/clock'

const jummahDayLabels = {
  friday: 'pages.home.jummah.days.fridays',
} as const

export function JummahInformation() {
  const { i18n, t } = useTranslation()
  const locale = i18n.resolvedLanguage ?? 'en'
  const { jummah } = mosqueData

  return (
    <p className="jummah-note">
      <JummahCongregationIcon
        aria-hidden="true"
        className="jummah-note__icon"
      />
      <span className="jummah-note__label">{t('pages.home.jummah.title')}</span>
      <span aria-hidden="true" className="jummah-note__separator">
        ·
      </span>
      <span className="jummah-note__schedule" dir="auto">
        {t('pages.home.jummah.schedule', {
          day: t(jummahDayLabels[jummah.day]),
          time: formatClockTime(jummah.time, locale),
        })}
      </span>
    </p>
  )
}
