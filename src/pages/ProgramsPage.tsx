import {
  IconChevronDown,
  IconMail,
  IconMoonStars,
  IconUsersGroup,
  type Icon,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  programs,
  type MosqueProgram,
  type ProgramIcon,
} from '../data/programs'
import { IslamicGeometricPattern } from '../design/TwelveFoldPattern'
import { resolveLocalizedContent } from '../domain/localization'

const programIcons: Record<Exclude<ProgramIcon, 'quran'>, Icon> = {
  community: IconUsersGroup,
  moon: IconMoonStars,
}

const programContactEmail = 'delanomosque@gmail.com'

function ProgramDetails({
  contactLabel,
  expanded,
  language,
  program,
}: {
  contactLabel: string
  expanded: boolean
  language: string
  program: MosqueProgram
}) {
  const localize = (content: Parameters<typeof resolveLocalizedContent>[0]) =>
    resolveLocalizedContent(content, language) ?? ''
  const headingId = `program-${program.id}-detail-heading`

  return (
    <section
      className="program-detail-shell"
      id={`program-${program.id}-detail`}
      aria-labelledby={headingId}
      aria-hidden={!expanded}
      inert={!expanded}
    >
      <div className="program-detail-shell__clip">
        <div className="program-detail">
          <div className="program-detail__content">
            <header className="program-detail__header">
              <p className="program-detail__mosque">
                {localize(program.mosqueLocation)}
              </p>
              <h2 className="program-detail__title font-heading" id={headingId}>
                {localize(program.name)}
              </h2>
              <p className="program-detail__tagline">
                {localize(program.tagline)}
              </p>
              <p className="program-detail__introduction">
                {localize(program.introduction)}
              </p>
            </header>

            <div className="program-detail__sections">
              {program.sections.map((section) => {
                const List = section.ordered ? 'ol' : 'ul'

                return (
                  <section
                    className="program-detail__section"
                    key={localize(section.heading)}
                  >
                    <h3 className="program-detail__section-title font-heading">
                      {localize(section.heading)}
                    </h3>
                    <List className="program-detail__list">
                      {section.items.map((item) => (
                        <li key={localize(item.title)}>
                          <strong>{localize(item.title)}:</strong>{' '}
                          {localize(item.body)}
                        </li>
                      ))}
                    </List>
                  </section>
                )
              })}
            </div>

            <p className="program-detail__audience">
              <strong>{localize(program.audience.label)}:</strong>{' '}
              {localize(program.audience.body)}
            </p>
            <p className="program-detail__contact">
              <IconMail aria-hidden="true" stroke={1.6} />
              <span>
                {contactLabel}{' '}
                <a href={`mailto:${programContactEmail}`}>
                  <bdi>{programContactEmail}</bdi>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProgramsPage() {
  const { i18n, t } = useTranslation()
  const [expandedProgramId, setExpandedProgramId] = useState<
    MosqueProgram['id'] | null
  >(null)
  const language = i18n.resolvedLanguage ?? 'en'
  const localize = (content: Parameters<typeof resolveLocalizedContent>[0]) =>
    resolveLocalizedContent(content, language) ?? ''

  return (
    <article className="programs-page">
      <header className="programs-page__intro">
        <p className="programs-page__eyebrow">{t('pages.programs.eyebrow')}</p>
        <h1 className="programs-page__title font-heading">
          {t('pages.programs.title')}
        </h1>
        <p className="programs-page__description">
          {t('pages.programs.introduction')}
        </p>
      </header>

      <section
        className="programs-selector"
        aria-label={t('pages.programs.selectionLabel')}
      >
        {programs.map((program) => {
          const isExpanded = expandedProgramId === program.id
          const ProgramIcon =
            program.icon === 'quran' ? null : programIcons[program.icon]
          const detailId = `program-${program.id}-detail`

          return (
            <div className="programs-selector__item" key={program.id}>
              <button
                className="program-card"
                type="button"
                aria-controls={detailId}
                aria-expanded={isExpanded}
                data-program={program.id}
                onClick={() =>
                  setExpandedProgramId(isExpanded ? null : program.id)
                }
              >
                <span
                  className="program-card__geometric-frame"
                  aria-hidden="true"
                >
                  <IslamicGeometricPattern
                    offsetX={7}
                    offsetY={-6}
                    tileSize={44}
                  />
                </span>
                <span className="program-card__icon" aria-hidden="true">
                  {program.icon === 'quran' ? (
                    <span className="program-card__quran-icon" />
                  ) : (
                    ProgramIcon && <ProgramIcon stroke={1.45} />
                  )}
                </span>
                <span className="program-card__title font-heading">
                  {localize(program.name)}
                </span>
                <span className="program-card__tagline">
                  {localize(program.tagline)}
                </span>
                <span className="program-card__meta">
                  {localize(program.summaryMeta)}
                </span>
                <span className="program-card__action">
                  <span>
                    {t(
                      isExpanded
                        ? 'pages.programs.hideDetails'
                        : 'pages.programs.viewDetails',
                    )}
                  </span>
                  <IconChevronDown
                    className="program-card__chevron"
                    aria-hidden="true"
                    stroke={1.7}
                  />
                </span>
              </button>

              <ProgramDetails
                contactLabel={t('pages.programs.contactLabel')}
                expanded={isExpanded}
                language={language}
                program={program}
              />
            </div>
          )
        })}
      </section>
    </article>
  )
}
