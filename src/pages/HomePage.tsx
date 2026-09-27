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
                <path d="M49.48 0.05 L38.53 6.41 L23.93 6.52 L17.05 18.51 L6.31 24.77 L6.31 38.74 L0.05 49.48 L0.05 50.21 L6.31 61.05 L6.31 75.96 L17.36 82.33 L19.03 84.93 L24.04 93.69 L38.53 93.69 L49.37 99.95 L50.10 99.95 L60.95 93.69 L75.23 93.69 L81.18 83.37 L81.80 82.74 L93.59 75.96 L93.59 61.05 L99.95 50.10 L99.95 49.58 L93.59 38.63 L93.59 24.77 L82.12 18.09 L81.18 16.74 L75.23 6.41 L60.95 6.41 L50.42 0.26 Z M49.69 87.43 L53.34 93.69 L57.72 93.80 L57.30 94.21 L49.90 98.49 L49.06 98.18 L41.76 93.90 L41.87 93.69 L45.93 93.69 L48.85 88.58 Z M35.71 92.13 L35.30 92.34 L24.87 92.23 L21.22 86.08 L20.28 84.20 L20.49 84.10 L25.39 86.91 L30.60 83.89 L30.81 84.10 L30.81 89.21 Z M63.76 92.13 L68.77 89.10 L68.87 83.68 L69.29 83.79 L74.50 86.91 L75.65 86.39 L78.57 84.62 L78.78 84.72 L74.40 92.23 Z M43.43 76.59 L48.64 85.45 L48.75 86.08 L45.10 92.23 L38.84 92.23 L32.27 88.37 L32.27 82.95 L43.12 76.59 Z M56.05 76.28 L67.31 82.74 L67.31 88.27 L66.68 88.79 L60.74 92.23 L54.17 92.23 L50.52 85.97 L50.73 85.35 Z M68.87 68.87 L81.28 68.98 L84.10 73.77 L84.52 74.92 L80.45 81.91 L75.13 85.04 L74.50 85.25 L68.77 81.80 Z M18.20 68.87 L30.19 68.77 L30.81 69.08 L30.81 81.91 L30.60 82.22 L25.18 85.25 L19.03 81.70 L18.40 81.18 L14.75 74.82 L16.84 70.96 Z M49.69 65.12 L55.21 74.61 L54.90 75.44 L49.69 84.31 L44.26 75.13 L44.26 74.30 Z M92.02 63.87 L92.13 75.13 L83.26 80.34 L83.16 80.03 L85.45 76.17 L86.18 74.61 L82.95 68.98 L83.16 68.77 L89.10 68.77 Z M7.87 63.87 L10.79 68.77 L15.59 68.77 L16.32 68.98 L13.09 74.61 L15.90 79.51 L15.80 79.82 L7.77 75.13 Z M57.19 62.30 L66.48 67.62 L67.31 68.87 L67.21 80.87 L66.37 80.55 L57.09 75.13 Z M42.70 62.10 L42.81 74.09 L42.49 74.61 L42.60 75.23 L32.38 81.18 L32.17 80.87 L32.17 69.08 L32.90 68.56 L33.73 67.21 Z M46.66 59.91 L48.44 62.83 L48.75 63.76 L44.58 71.06 L44.37 71.17 L44.26 61.26 L46.04 60.11 Z M52.71 59.80 L53.34 60.01 L55.63 61.47 L55.53 72.11 L54.80 71.17 L50.52 63.66 Z M49.90 58.03 L51.46 59.07 L49.69 62.10 L47.91 59.07 Z M62.20 57.30 L73.98 57.19 L74.50 57.51 L75.03 58.13 L80.24 67.31 L68.87 67.41 L67.62 66.68 Z M57.09 57.30 L60.43 57.19 L64.81 64.81 L64.60 64.91 L57.30 60.74 L57.09 60.53 Z M54.28 57.19 L55.63 57.30 L55.53 59.59 L53.55 58.55 L53.55 58.24 Z M45.10 57.19 L45.83 58.55 L45.52 58.86 L44.37 59.38 L44.26 57.30 Z M42.81 57.30 L42.70 60.43 L35.51 64.60 L35.19 64.49 L39.47 57.19 Z M37.70 57.30 L32.69 66.06 L30.71 67.41 L19.13 67.31 L19.45 66.48 L24.77 57.40 L25.50 57.51 L25.91 57.19 Z M59.49 55.42 L59.38 55.74 L57.19 55.74 L57.09 54.90 L58.65 54.07 Z M40.41 55.42 L41.24 54.07 L42.81 54.90 L42.70 55.74 L40.51 55.74 Z M85.87 51.25 L92.13 54.90 L92.13 60.74 L88.16 67.41 L82.01 67.41 L75.96 56.88 L85.35 51.36 Z M59.91 53.34 L63.14 51.36 L63.66 51.25 L71.06 55.63 L61.37 55.74 Z M39.99 53.34 L38.53 55.74 L28.83 55.63 L36.24 51.25 L37.17 51.56 Z M14.03 51.25 L14.55 51.36 L23.41 56.57 L23.41 56.88 L17.26 67.41 L11.73 67.41 L10.79 66.06 L7.77 60.74 L7.77 54.90 Z M57.92 49.69 L58.76 48.44 L61.57 50.00 L61.89 50.42 L59.18 51.98 L57.92 50.00 Z M41.97 49.69 L41.97 50.00 L40.72 51.98 L37.90 50.31 L41.14 48.44 Z M65.02 50.31 L74.50 44.79 L75.34 45.10 L84.20 50.31 L83.06 51.15 L75.03 55.74 L74.19 55.74 Z M15.69 50.31 L25.18 44.79 L25.60 44.89 L34.88 50.31 L25.70 55.74 L24.87 55.74 L20.70 53.23 L16.84 51.15 Z M59.49 47.18 L60.22 45.72 L61.16 44.37 L72.00 44.47 L71.79 44.79 L63.56 49.48 Z M57.09 45.72 L57.19 44.37 L59.28 44.47 L58.24 46.35 L57.72 46.25 Z M40.62 44.47 L42.70 44.37 L42.81 45.72 L42.18 46.25 L41.66 46.35 Z M27.89 44.47 L38.74 44.37 L39.68 45.72 L40.41 47.18 L36.34 49.48 L29.35 45.52 Z M47.18 42.39 L49.69 43.74 L52.09 42.39 L52.29 42.49 L53.44 44.37 L55.42 44.37 L55.63 44.58 L55.63 46.56 L57.40 47.71 L56.26 50.00 L57.51 51.98 L57.82 52.82 L55.63 54.17 L55.53 55.74 L53.44 55.74 L52.19 57.72 L49.69 56.36 L47.18 57.82 L46.04 55.84 L44.37 55.74 L44.16 53.96 L42.08 52.71 L43.64 50.00 L42.49 47.71 L44.26 46.56 L44.26 44.58 L44.47 44.37 L45.93 44.37 Z M93.69 41.87 L93.90 41.97 L98.38 49.79 L93.80 57.82 L93.59 57.72 L93.59 54.07 L87.33 50.42 L87.54 50.10 L93.59 46.66 Z M6.10 41.87 L6.31 41.97 L6.31 46.66 L12.57 50.31 L12.15 50.73 L6.31 54.07 L6.20 57.82 L5.68 57.19 L1.51 49.90 Z M44.37 40.72 L45.83 41.55 L45.10 42.91 L44.26 42.81 Z M55.53 40.51 L55.63 42.81 L54.28 42.91 L53.55 41.66 Z M49.69 38.01 L51.46 41.03 L49.90 42.08 L47.91 41.03 Z M35.61 35.82 L35.82 35.71 L42.70 39.68 L42.81 42.81 L39.68 42.91 Z M64.39 35.30 L64.39 35.82 L60.32 42.81 L57.19 42.91 L57.09 39.57 Z M82.43 32.27 L88.16 32.27 L92.13 38.95 L92.13 45.83 L85.77 49.48 L75.76 43.74 L75.76 43.43 L82.12 32.48 Z M80.45 32.48 L74.40 42.91 L61.99 42.81 L67.10 33.84 L68.77 32.69 L68.77 32.38 Z M18.82 32.48 L19.03 32.27 L30.60 32.27 L30.92 32.90 L32.90 34.05 L37.90 42.81 L24.87 42.91 Z M16.94 32.27 L18.20 34.15 L23.72 43.95 L14.13 49.48 L7.77 45.83 L7.77 38.95 L11.73 32.27 Z M44.37 28.94 L44.58 29.04 L48.75 36.34 L48.75 36.76 L46.56 40.30 L44.26 38.84 Z M55.53 28.00 L55.63 38.63 L53.55 39.99 L52.71 40.30 L50.52 36.44 L54.48 29.46 Z M15.28 21.22 L15.38 21.43 L13.09 25.39 L16.21 30.71 L15.90 30.92 L10.79 30.92 L7.87 35.82 L7.77 25.60 Z M83.79 20.70 L92.13 25.60 L92.02 35.82 L89.10 30.92 L83.37 30.92 L83.16 30.71 L86.18 25.50 L85.97 24.87 L83.79 21.22 Z M67.21 19.76 L67.31 30.81 L65.95 32.79 L57.19 37.80 L57.09 25.60 Z M32.38 19.55 L41.87 24.97 L42.70 25.81 L42.70 38.01 L33.94 33.00 L32.79 31.02 L32.17 30.71 L32.17 19.86 Z M49.69 15.80 L55.21 25.29 L49.69 34.98 L44.26 25.81 L44.26 24.97 Z M68.77 18.82 L73.67 15.90 L74.71 15.48 L80.76 18.93 L81.28 19.55 L84.52 25.29 L84.31 25.91 L81.60 30.60 L81.28 30.92 L68.98 30.92 L68.77 30.71 Z M30.81 18.72 L30.81 30.71 L30.60 30.92 L18.09 30.92 L17.78 30.71 L14.75 25.29 L18.20 19.45 L25.18 15.48 L26.23 15.90 L30.19 18.20 Z M63.76 7.98 L74.40 7.87 L79.30 16.21 L78.99 16.32 L75.55 14.23 L74.50 13.82 L68.87 17.05 L68.77 11.00 Z M19.66 16.74 L24.87 7.87 L35.71 7.98 L30.81 10.90 L30.81 16.63 L30.60 16.84 L25.39 13.82 L24.77 14.03 L19.97 16.84 Z M60.32 7.77 L66.16 11.00 L67.31 11.84 L67.31 17.99 L56.57 24.24 L56.26 24.24 L50.94 15.17 L50.52 14.13 L54.17 7.87 Z M38.84 7.87 L45.10 7.87 L48.75 14.03 L48.64 14.65 L43.12 24.04 L32.69 18.09 L32.17 17.57 L32.27 11.73 Z M49.90 1.62 L57.30 5.89 L57.72 6.31 L53.34 6.41 L49.90 12.46 L49.58 12.67 L45.93 6.41 L41.87 6.41 L41.76 6.20 L49.06 1.93 Z" fill="currentColor" fillRule="evenodd" stroke="none" />
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
