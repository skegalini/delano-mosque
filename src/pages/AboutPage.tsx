import { Trans, useTranslation } from 'react-i18next'

import {
  FeaturedHistoryMedia,
  type FeaturedHistoryPhoto,
} from '../components/history/FeaturedHistoryMedia'
import { CommunityPhotoCarousel } from '../components/history/CommunityPhotoCarousel'
import {
  communityAlbumPhotos,
  featuredHistoryPhotos as featuredArchivePhotos,
} from '../data/historyArchive'
import { mosqueData } from '../data/mosque'
import { resolveLocalizedContent } from '../domain/localization'

type HistoryChapterProps = {
  heading?: string
  body: string
  emphasized?: boolean
  opening?: boolean
}

function HistoryChapter({
  heading,
  body,
  emphasized = false,
  opening = false,
}: HistoryChapterProps) {
  const className = [
    'history-chapter',
    emphasized ? 'history-chapter--emphasized' : '',
    opening ? 'history-chapter--opening' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!heading) {
    return (
      <div className={className}>
        <p className="history-chapter__body">{body}</p>
      </div>
    )
  }

  return (
    <section className={className}>
      <h3 className="history-chapter__title font-heading">{heading}</h3>
      <p className="history-chapter__body">{body}</p>
    </section>
  )
}

export function AboutPage() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')
  const featuredPhotoPresentation: ReadonlyArray<
    Pick<FeaturedHistoryPhoto, 'objectPosition' | 'orientation'>
  > = [
    {
      orientation: 'landscape',
      objectPosition: 'center 48%',
    },
    {
      orientation: 'portrait',
      objectPosition: 'center 44%',
    },
    {
      orientation: 'landscape',
      objectPosition: '48% 44%',
    },
    {
      orientation: 'landscape',
      objectPosition: '62% 48%',
    },
  ]
  const featuredHistoryPhotos: readonly FeaturedHistoryPhoto[] =
    featuredArchivePhotos.map((photo, index) => ({
      ...photo,
      ...featuredPhotoPresentation[index],
      alt: t(
        `pages.about.history.featuredPhotoAlts.${photo.id.replace('.jpg', '')}`,
      ),
    }))

  return (
    <article className="history-page">
      <header className="history-page__intro">
        <h1 className="history-page__title font-heading">
          {t('pages.about.heading', { mosqueName })}
        </h1>
        <span className="history-page__title-rule" aria-hidden="true" />
      </header>

      <section
        className="history-page__story"
        aria-labelledby="history-section-title"
      >
        <header className="history-page__section-heading">
          <p className="history-page__eyebrow">
            {t('pages.about.history.title')}
          </p>
          <h2
            className="history-page__story-title font-heading"
            id="history-section-title"
          >
            {t('pages.about.history.heading')}
          </h2>
        </header>

        <div className="history-page__spread">
          <div className="history-page__chapters">
            <HistoryChapter
              body={t('pages.about.history.sections.rooted.body')}
              opening
            />
            <HistoryChapter
              heading={t('pages.about.history.sections.homes.heading')}
              body={t('pages.about.history.sections.homes.body')}
            />
            <HistoryChapter
              heading={t('pages.about.history.sections.namesake.heading')}
              body={t('pages.about.history.sections.namesake.body')}
              emphasized
            />
            <HistoryChapter
              heading={t('pages.about.history.sections.worship.heading')}
              body={t('pages.about.history.sections.worship.body')}
            />
          </div>

          <FeaturedHistoryMedia
            photos={featuredHistoryPhotos}
            sectionLabel={t('pages.about.history.featuredPhotos')}
            emptyLabel={t('pages.about.history.featuredPhotoPlaceholder')}
          />
        </div>
      </section>

      <section
        className="history-page__album"
        aria-labelledby="community-album-title"
      >
        <header className="history-page__album-heading">
          <p className="history-page__eyebrow">
            {t('pages.about.album.eyebrow')}
          </p>
          <h2
            className="history-page__album-title font-heading"
            id="community-album-title"
          >
            {t('pages.about.album.subheading')}
          </h2>
          <p className="history-page__album-description">
            {t('pages.about.album.description')}
          </p>
        </header>

        <div className="history-page__album-stage">
          <CommunityPhotoCarousel
            photos={communityAlbumPhotos}
            label={t('pages.about.album.label')}
            previousLabel={t('pages.about.album.previousPhoto')}
            nextLabel={t('pages.about.album.nextPhoto')}
            credit={t('pages.about.album.photoCredit')}
            getPhotoAlt={(position, total) =>
              t('pages.about.album.photoAlt', { position, total })
            }
          />
        </div>
      </section>

      <section
        className="history-page__documentary"
        aria-labelledby="documentary-section-title"
      >
        <header className="history-page__documentary-heading">
          <p className="history-page__eyebrow">
            {t('pages.about.documentary.eyebrow')}
          </p>
          <h2
            className="history-page__documentary-title font-heading"
            id="documentary-section-title"
          >
            {t('pages.about.documentary.heading')}
          </h2>
          <p className="history-page__documentary-description">
            {t('pages.about.documentary.description')}
          </p>
        </header>

        <div className="history-page__video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/yC9CVepWQUY"
            title={t('pages.about.documentary.videoTitle')}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="history-page__documentary-meta">
          <p className="history-page__documentary-credit">
            <Trans
              i18nKey="pages.about.documentary.credit"
              components={{
                erik: (
                  <a
                    className="history-page__documentary-credit-link"
                    href="https://erikfriedl.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            />
          </p>
          <a
            className="history-page__youtube-link"
            href="https://youtu.be/yC9CVepWQUY"
            target="_blank"
            rel="noreferrer"
          >
            {t('pages.about.documentary.watchOnYoutube')}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </article>
  )
}
