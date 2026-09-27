import { useTranslation } from 'react-i18next'
import type { MouseEvent, SVGProps } from 'react'

import { GeometricBorder } from '../components/layout/GeometricBorder'
import { JummahInformation } from '../components/prayer/JummahInformation'
import { PrayerTimes } from '../components/prayer/PrayerTimes'
import { mosqueData } from '../data/mosque'
import { resolveLocalizedContent } from '../domain/localization'

const mosqueMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${mosqueData.identity.canonicalName.en} ${mosqueData.identity.address}`,
).replaceAll('%20', '+')}`

const prayerTimesTargetId = 'prayer-times'

/**
 * Scroll explicitly rather than relying on fragment navigation: the browser
 * skips the jump when the URL already points at this fragment, so a second
 * click from the top of the page would otherwise do nothing.
 */
function scrollToPrayerTimes(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(prayerTimesTargetId)

  if (!target) {
    return
  }

  event.preventDefault()
  target.scrollIntoView({
    behavior:
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    block: 'start',
  })
  window.history.replaceState(null, '', `#${prayerTimesTargetId}`)
}

export function HomePage() {
  const { i18n, t } = useTranslation()
  const mosqueName =
    resolveLocalizedContent(
      mosqueData.identity.canonicalName,
      i18n.resolvedLanguage ?? 'en',
    ) ?? t('siteName')
  const mosqueTitleLines =
    mosqueName === mosqueData.identity.canonicalName.en
      ? ['Abu Bakr', 'Al-Siddiq Mosque']
      : [mosqueName]

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <h1
            aria-label={mosqueName}
            className="home-hero__title font-display"
            id="home-title"
          >
            {mosqueTitleLines.map((line) => (
              <span
                aria-hidden="true"
                className="home-hero__title-line"
                data-text={line}
                key={line}
              >
                {line}
              </span>
            ))}
          </h1>
          <span aria-hidden="true" className="home-hero__divider">
            <span className="home-hero__divider-rule home-hero__divider-rule--start" />
            <span className="home-hero__divider-diamond" />
            <span className="home-hero__divider-rosette">
              <svg viewBox="0 0 100 100">
                <g strokeLinejoin="miter">
                  <path d="M50 5 61.7 13.1 75.5 12.2 80.4 25.2 92.7 32.6 89.5 46.1 95 59.4 84.5 69.1 82.1 83.3 68.1 85.9 58.4 96.2 45.2 90.7 31.5 93.7 24.3 81.5 10.2 77.3 11.3 63.5 3 52 10.9 40.4 8 26.6 20.3 19.5 25.1 6.3 38.9 9.2Z" />
                  {Array.from({ length: 12 }, (_, index) => (
                    <path
                      d="M50 8 58.5 27 54.2 41.5 50 49 45.8 41.5 41.5 27Z"
                      key={index}
                      transform={`rotate(${index * 30} 50 50)`}
                    />
                  ))}
                  {Array.from({ length: 12 }, (_, index) => (
                    <path
                      d="M50 18 61.5 33.5 57 50 50 42 43 50 38.5 33.5Z"
                      key={`inner-${index}`}
                      transform={`rotate(${index * 30 + 15} 50 50)`}
                    />
                  ))}
                  <path d="M50 37 54 44.1 61.9 42.1 58.8 49.6 65.5 54.3 57.5 55.6 57 63.7 50 59.5 43 63.7 42.5 55.6 34.5 54.3 41.2 49.6 38.1 42.1 46 44.1Z" />
                </g>
              </svg>
            </span>
            <span className="home-hero__divider-diamond" />
            <span className="home-hero__divider-rule home-hero__divider-rule--end" />
          </span>
          <p className="home-hero__tagline font-display">
            {t('pages.home.hero.title')}
          </p>
          <a
            aria-label={t('pages.home.hero.mapsLabel')}
            className="home-hero__identity"
            href={mosqueMapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="home-hero__location">
              <MaterialLocationOnFilled aria-hidden="true" />
              {t('pages.home.hero.location')}
            </span>
          </a>
          <div className="home-hero__actions">
            <a
              className="button button--primary"
              href="#prayer-times"
              onClick={scrollToPrayerTimes}
            >
              <MaterialPrayerTimes aria-hidden="true" />
              {t('navigation.prayer')}
            </a>
            {/* Duplicate of the button above, so it is hidden from assistive
                tech and the tab order while staying clickable by pointer. */}
            <a
              aria-hidden="true"
              className="home-hero__scroll-cue"
              href="#prayer-times"
              onClick={scrollToPrayerTimes}
              tabIndex={-1}
            >
              <ChevronsDown />
            </a>
          </div>
          <JummahInformation />
        </div>
      </section>

      <GeometricBorder variant="section" />

      <div className="prayer-section-wrap">
        <PrayerTimes />
      </div>
    </>
  )
}

function MaterialPrayerTimes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm41-472 59-43 58 43-23-68 59-43h-72l-22-69-22 69h-73l59 43-23 68Zm-41 220q83 0 141.5-58T680-480q0-8-.5-16t-2.5-16q-11 47-49 77.5T539-404q-60 0-101-41t-41-101q0-46 26-82.5t68-51.5h-11q-84 0-142 58.5T280-480q0 84 58 142t142 58Z" />
    </svg>
  )
}

function MaterialLocationOnFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
    </svg>
  )
}

function ChevronsDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="chevrons-down"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path className="chevrons-down__lead" d="m6 9 6 6 6-6" />
      <path className="chevrons-down__trail" d="m6 4 6 6 6-6" />
    </svg>
  )
}
