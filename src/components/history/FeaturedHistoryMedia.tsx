import { HistoryImage } from './HistoryImage'

export type FeaturedHistoryPhoto = {
  src: string
  alt: string
  orientation: 'landscape' | 'portrait'
  objectPosition?: string
}

type FeaturedHistoryMediaProps = {
  photos?: readonly FeaturedHistoryPhoto[]
  emptyLabel: string
  sectionLabel: string
}

const minimumDesktopSlots = 4
const maximumDesktopSlots = 4

export function FeaturedHistoryMedia({
  photos = [],
  emptyLabel,
  sectionLabel,
}: FeaturedHistoryMediaProps) {
  const slotCount = Math.min(
    maximumDesktopSlots,
    Math.max(minimumDesktopSlots, photos.length),
  )
  const slots = Array.from({ length: slotCount }, (_, index) => photos[index])
  const featuredPhoto = photos[0]
  const indicatorCount = photos.length || minimumDesktopSlots

  return (
    <aside className="featured-history-media" aria-label={sectionLabel}>
      <div className="featured-history-media__desktop">
        <div className="featured-history-media__row featured-history-media__row--lead">
          {slots.slice(0, 2).map((photo, index) => (
            <HistoryImage
              key={photo?.src ?? `reserved-${index}`}
              className={`featured-history-media__item featured-history-media__item--${index + 1} ${
                photo
                  ? `featured-history-media__item--${photo.orientation}`
                  : ''
              }`}
              src={photo?.src}
              alt={photo?.alt}
              objectPosition={photo?.objectPosition}
              emptyLabel={emptyLabel}
            />
          ))}
        </div>

        <div className="featured-history-media__row featured-history-media__row--support">
          {slots.slice(2, 4).map((photo, index) => (
            <HistoryImage
              key={photo?.src ?? `reserved-${index + 2}`}
              className={`featured-history-media__item featured-history-media__item--${index + 3} ${
                photo
                  ? `featured-history-media__item--${photo.orientation}`
                  : ''
              }`}
              src={photo?.src}
              alt={photo?.alt}
              objectPosition={photo?.objectPosition}
              emptyLabel={emptyLabel}
            />
          ))}
        </div>
      </div>

      <div className="featured-history-media__compact">
        <p className="featured-history-media__label">{sectionLabel}</p>
        <HistoryImage
          className={`featured-history-media__viewport ${
            featuredPhoto
              ? `featured-history-media__viewport--${featuredPhoto.orientation}`
              : ''
          }`}
          src={featuredPhoto?.src}
          alt={featuredPhoto?.alt}
          objectPosition={featuredPhoto?.objectPosition}
          emptyLabel={emptyLabel}
        />
        <div className="featured-history-media__indicators" aria-hidden="true">
          {Array.from({ length: indicatorCount }, (_, index) => (
            <span
              className={index === 0 ? 'is-active' : undefined}
              key={`indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
