import { useTranslation } from 'react-i18next'

import { mosqueData } from '../../data/mosque'

export function VisitorInformation() {
  const { t } = useTranslation()
  const { identity, publicContact, visitorFacilities } = mosqueData

  return (
    <section className="max-w-3xl border-t border-black/10 pt-6">
      <h2 className="text-xl font-semibold text-[var(--color-masjid-green-deep)]">
        {t('visitorInformation.title')}
      </h2>
      <dl className="mt-4 space-y-4">
        <div>
          <dt className="font-medium">{t('visitorInformation.address')}</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">
            {identity.address}
          </dd>
        </div>

        {visitorFacilities.separateWomensEntrance === true && (
          <div>
            <dt className="font-medium">
              {t('visitorInformation.womensEntrance')}
            </dt>
            <dd className="mt-1 text-[var(--color-text-muted)]">
              {t('visitorInformation.womensEntranceAvailable')}
            </dd>
          </div>
        )}

        {visitorFacilities.wuduAvailable === true && (
          <div>
            <dt className="font-medium">{t('visitorInformation.wudu')}</dt>
            <dd className="mt-1 text-[var(--color-text-muted)]">
              {t('visitorInformation.wuduAvailable')}
            </dd>
          </div>
        )}

        {publicContact.email && (
          <div>
            <dt className="font-medium">{t('visitorInformation.contact')}</dt>
            <dd className="mt-1">
              <a
                className="text-[var(--color-masjid-green-deep)] underline underline-offset-4"
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
