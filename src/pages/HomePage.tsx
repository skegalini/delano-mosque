import { useTranslation } from 'react-i18next'
import type { MouseEvent, SVGProps } from 'react'

import { GeometricBorder } from '../components/layout/GeometricBorder'
import { JummahInformation } from '../components/prayer/JummahInformation'
import { PrayerTimes } from '../components/prayer/PrayerTimes'
import { mosqueData } from '../data/mosque'

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
  const { t } = useTranslation()

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <h1 className="home-hero__title font-display" id="home-title">
            {t('pages.home.hero.title')}
          </h1>
          <a
            aria-label={t('pages.home.hero.mapsLabel')}
            className="home-hero__identity"
            href={mosqueMapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t('siteName')}</span>
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
