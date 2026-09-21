import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import type { HistoricalArchivePhoto } from '../../data/historyArchive'

type CommunityPhotoCarouselProps = {
  photos: readonly HistoricalArchivePhoto[]
  label: string
  previousLabel: string
  nextLabel: string
  credit?: ReactNode
  getPhotoAlt: (position: number, total: number) => string
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia(reducedMotionQuery).matches
  )
}

export function CommunityPhotoCarousel({
  photos,
  label,
  previousLabel,
  nextLabel,
  credit,
  getPhotoAlt,
}: CommunityPhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const scrollFrameRef = useRef<number | null>(null)
  const pendingIndexRef = useRef<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastIndex = Math.max(0, photos.length - 1)
  const activePhoto = photos[currentIndex]
  // Drives the stage's aspect-ratio so the frame hugs the active photograph.
  const stageStyle = activePhoto
    ? ({
        '--carousel-active-ratio': `${activePhoto.width} / ${activePhoto.height}`,
        '--carousel-active-ratio-number':
          activePhoto.width / activePhoto.height,
      } as CSSProperties)
    : undefined

  const syncIndexToScroll = useCallback(() => {
    const track = trackRef.current
    const slides = slideRefs.current

    if (!track || photos.length === 0) {
      return
    }

    const pendingIndex = pendingIndexRef.current
    if (pendingIndex !== null) {
      const pendingSlide = slides[pendingIndex]
      const reachedTarget =
        pendingSlide &&
        Math.abs(track.scrollLeft - pendingSlide.offsetLeft) <= 2
      const reachedEnd =
        pendingIndex === lastIndex &&
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 2

      if (!reachedTarget && !reachedEnd) {
        return
      }

      pendingIndexRef.current = null
      setCurrentIndex(pendingIndex)
      return
    }

    if (track.scrollLeft <= 2) {
      setCurrentIndex(0)
      return
    }

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      setCurrentIndex(lastIndex)
      return
    }

    const closestIndex = slides.reduce((closest, slide, index) => {
      if (!slide) {
        return closest
      }

      const closestSlide = slides[closest]
      return !closestSlide ||
        Math.abs(slide.offsetLeft - track.scrollLeft) <
          Math.abs(closestSlide.offsetLeft - track.scrollLeft)
        ? index
        : closest
    }, 0)

    setCurrentIndex(closestIndex)
  }, [lastIndex, photos.length])

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    },
    [],
  )

  const scrollToIndex = (targetIndex: number) => {
    const track = trackRef.current
    const slide = slideRefs.current[targetIndex]

    if (!track || !slide || targetIndex < 0 || targetIndex > lastIndex) {
      return
    }

    pendingIndexRef.current = targetIndex
    setCurrentIndex(targetIndex)

    if (typeof track.scrollTo === 'function') {
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    } else {
      track.scrollLeft = slide.offsetLeft
      pendingIndexRef.current = null
    }
  }

  const handleScroll = () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current)
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null
      syncIndexToScroll()
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(Math.max(0, currentIndex - 1))
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(Math.min(lastIndex, currentIndex + 1))
    }
  }

  const releaseProgrammaticScroll = () => {
    pendingIndexRef.current = null
  }

  return (
    <div
      className="community-photo-carousel"
      role="group"
      aria-label={label}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="community-photo-carousel__shell" dir="ltr">
        <button
          className="community-photo-carousel__control community-photo-carousel__control--previous"
          type="button"
          aria-label={previousLabel}
          disabled={currentIndex === 0 || photos.length === 0}
          onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
        >
          <IconChevronLeft aria-hidden="true" stroke={1.7} />
        </button>

        <div
          className="community-photo-carousel__track"
          ref={trackRef}
          style={stageStyle}
          onPointerDown={releaseProgrammaticScroll}
          onScroll={handleScroll}
          onTouchStart={releaseProgrammaticScroll}
          onWheel={releaseProgrammaticScroll}
        >
          {photos.map((photo, index) => (
            <figure
              className="community-photo-carousel__slide"
              key={photo.id}
              ref={(element) => {
                slideRefs.current[index] = element
              }}
            >
              <img
                className="community-photo-carousel__photo"
                src={photo.src}
                alt={getPhotoAlt(index + 1, photos.length)}
                width={photo.width}
                height={photo.height}
                loading={
                  /* One photograph shows at a time, so keep the active
                     slide and its neighbours ready to avoid a blank stage. */
                  Math.abs(index - currentIndex) <= 1 ? 'eager' : 'lazy'
                }
                fetchPriority={index === currentIndex ? 'high' : 'auto'}
                decoding="async"
                draggable="false"
              />
            </figure>
          ))}
        </div>

        <button
          className="community-photo-carousel__control community-photo-carousel__control--next"
          type="button"
          aria-label={nextLabel}
          disabled={currentIndex === lastIndex || photos.length === 0}
          onClick={() => scrollToIndex(Math.min(lastIndex, currentIndex + 1))}
        >
          <IconChevronRight aria-hidden="true" stroke={1.7} />
        </button>
      </div>

      <p className="community-photo-carousel__position" aria-live="polite">
        {photos.length === 0 ? 0 : currentIndex + 1} / {photos.length}
      </p>

      {credit ? (
        <p className="community-photo-carousel__credit" style={stageStyle}>
          {credit}
        </p>
      ) : null}
    </div>
  )
}
