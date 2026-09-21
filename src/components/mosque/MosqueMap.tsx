import { IconMapPin } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { mosqueData } from '../../data/mosque'

type MosqueMapProps = {
  mosqueName: string
}

export function MosqueMap({ mosqueName }: MosqueMapProps) {
  const { t } = useTranslation()
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY?.trim()
  const locationQuery = `${mosqueName}, ${mosqueData.identity.address}`
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(locationQuery)}`
    : null

  return (
    <section className="about-map" aria-labelledby="about-map-title">
      <h2 className="sr-only" id="about-map-title">
        {t('visitorInformation.mapHeading')}
      </h2>
      <div className="about-map__frame">
        {embedUrl ? (
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            title={t('visitorInformation.mapTitle')}
          />
        ) : (
          <div className="about-map__fallback">
            <span className="about-map__fallback-icon" aria-hidden="true">
              <IconMapPin />
            </span>
            <p>{t('visitorInformation.mapUnavailable')}</p>
            <strong>{mosqueName}</strong>
            <span>{mosqueData.identity.address}</span>
          </div>
        )}
      </div>
    </section>
  )
}
