import {
  IconDroplet,
  IconGenderFemale,
  IconMail,
  IconMapPin,
  IconRoute,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import { mosqueData } from '../../data/mosque'

export function VisitorInformation() {
  const { t } = useTranslation()
  const { identity, publicContact, visitorFacilities } = mosqueData
  const [street, ...localityParts] = identity.address.split(', ')
  const locality = localityParts.join(', ')
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(identity.address)}`

  return (
    <section className="visitor-panel" aria-labelledby="visitor-panel-title">
      <h2 className="visitor-panel__title" id="visitor-panel-title">
        {t('visitorInformation.title')}
      </h2>
      <dl className="visitor-panel__list">
        <div className="visitor-panel__row visitor-panel__row--address">
          <dt>
            <span className="visitor-panel__icon" aria-hidden="true">
              <IconMapPin />
            </span>
            <span>{t('visitorInformation.address')}</span>
          </dt>
          <dd>
            <address>
              <span>{street}</span>
              <span>{locality}</span>
            </address>
            <a
              className="button button--primary visitor-panel__directions"
              href={directionsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconRoute aria-hidden="true" />
              {t('visitorInformation.getDirections')}
            </a>
          </dd>
        </div>

        {visitorFacilities.separateWomensEntrance === true && (
          <div className="visitor-panel__row">
            <dt>
              <span className="visitor-panel__icon" aria-hidden="true">
                <IconGenderFemale />
              </span>
              <span>{t('visitorInformation.womensEntrance')}</span>
            </dt>
            <dd>{t('visitorInformation.womensEntranceAvailable')}</dd>
          </div>
        )}

        {visitorFacilities.wuduAvailable === true && (
          <div className="visitor-panel__row">
            <dt>
              <span className="visitor-panel__icon" aria-hidden="true">
                <IconDroplet />
              </span>
              <span>{t('visitorInformation.wudu')}</span>
            </dt>
            <dd>{t('visitorInformation.wuduAvailable')}</dd>
          </div>
        )}

        {publicContact.email && (
          <div className="visitor-panel__row">
            <dt>
              <span className="visitor-panel__icon" aria-hidden="true">
                <IconMail />
              </span>
              <span>{t('visitorInformation.contact')}</span>
            </dt>
            <dd>
              <a
                className="visitor-panel__email"
                href={`mailto:${publicContact.email}`}
              >
                {publicContact.email}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}
