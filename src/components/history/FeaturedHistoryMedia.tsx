import { useRef, useState } from 'react'

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
  const compactTrackRef = useRef<HTMLDivElement>(null)
  const [compactIndex, setCompactIndex] = useState(0)

  const selectCompactPhoto = (index: number) => {
    const track = compactTrackRef.current

    if (!track || index < 0 || index >= photos.length) {
      return
    }

    setCompactIndex(index)
    track.scrollTo({
      left: index * track.clientWidth,
      behavior:
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
    })
  }

  const syncCompactIndex = () => {
    const track = compactTrackRef.current

    if (!track || track.clientWidth === 0 || photos.length === 0) {
      return
    }

    const nextIndex = Math.min(
      photos.length - 1,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
    )

    setCompactIndex(nextIndex)
  }

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

        <div
          className="featured-history-media__compact-track"
          dir="ltr"
          ref={compactTrackRef}
          onScroll={syncCompactIndex}
        >
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <HistoryImage
                key={photo.src}
                className={`featured-history-media__compact-slide featured-history-media__compact-slide--${photo.orientation}`}
                src={photo.src}
                alt={photo.alt}
                objectPosition={photo.objectPosition}
                emptyLabel={emptyLabel}
              />
            ))
          ) : (
            <HistoryImage
              className="featured-history-media__compact-slide"
              emptyLabel={emptyLabel}
            />
          )}
        </div>

        {photos.length > 1 ? (
          <div
            className="featured-history-media__indicators"
            aria-label={sectionLabel}
            role="group"
          >
            {photos.map((photo, index) => (
              <button
                aria-current={index === compactIndex ? 'true' : undefined}
                aria-label={photo.alt}
                className={index === compactIndex ? 'is-active' : undefined}
                key={photo.src}
                onClick={() => selectCompactPhoto(index)}
                type="button"
              />
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
