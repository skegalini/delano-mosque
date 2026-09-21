import { useTranslation } from 'react-i18next'
import {
  IconSunHighFilled,
  IconSunLowFilled,
  IconSunriseFilled,
  IconSunsetFilled,
} from '@tabler/icons-react'
import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from 'react'

import type { DailyPrayerTimes } from '../../domain/prayer'
import { useMinuteClock } from '../../hooks/useMinuteClock'
import { usePrayerTimes } from '../../hooks/usePrayerTimes'
import { formatClockTime } from '../../utils/clock'
import {
  getActivePrayerKey,
  getDayProgress,
  prayerMarkerProgress,
  type ActivePrayerKey,
} from './prayerProgress'

type DisplayedTimeKey = keyof Pick<
  DailyPrayerTimes,
  'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
>

type PrayerIcon = ComponentType<SVGProps<SVGSVGElement>>

const DAY_CURVE_PATH =
  'M40 126 C155 126 205 75 280 52 C360 27 421 21 500 20 C613 22 664 53 725 73 C814 102 853 126 960 130'

const displayedTimes = [
  {
    key: 'fajr',
    label: 'pages.home.prayerTimes.labels.fajr',
    Icon: MaterialWbTwilight2Filled,
  },
  {
    key: 'sunrise',
    label: 'pages.home.prayerTimes.labels.sunrise',
    Icon: IconSunriseFilled,
  },
  {
    key: 'dhuhr',
    label: 'pages.home.prayerTimes.labels.dhuhr',
    Icon: IconSunHighFilled,
  },
  {
    key: 'asr',
    label: 'pages.home.prayerTimes.labels.asr',
    Icon: IconSunLowFilled,
  },
  {
    key: 'maghrib',
    label: 'pages.home.prayerTimes.labels.maghrib',
    Icon: IconSunsetFilled,
  },
  {
    key: 'isha',
    label: 'pages.home.prayerTimes.labels.isha',
    Icon: MaterialMoonStarsFilled,
  },
] as const satisfies readonly {
  key: DisplayedTimeKey
  label: string
  Icon: PrayerIcon
}[]

export function PrayerTimes() {
  const { i18n, t } = useTranslation()
  const instant = useMinuteClock()
  const state = usePrayerTimes({ instant })
  const locale = i18n.resolvedLanguage ?? 'en'

  return (
    <section className="prayer-times" id="prayer-times">
      <p className="section-eyebrow">{t('pages.home.prayerTimes.eyebrow')}</p>
      <h2 className="prayer-times__title font-heading">
        {t('pages.home.prayerTimes.title')}
      </h2>

      {state.status === 'loading' && (
        <p className="prayer-times__status" aria-live="polite" role="status">
          {t('pages.home.prayerTimes.loading')}
        </p>
      )}

      {state.status === 'error' && (
        <p className="prayer-times__status" role="alert">
          {t('pages.home.prayerTimes.unavailable')}
        </p>
      )}

      {state.status === 'success' && (
        <div className="prayer-times__content">
          <p className="prayer-times__date">
            <CalendarToday aria-hidden="true" />
            <span dir="auto">
              {formatPrayerDate(state.result.times.date, locale)}
            </span>
          </p>
          <PrayerDayPath
            activePrayerKey={getActivePrayerKey(state.result.times, instant)}
            progress={getDayProgress(state.result.times, instant)}
          />
          <dl className="prayer-times__grid">
            {displayedTimes.map(({ key, label, Icon }) => {
              const isActive =
                getActivePrayerKey(state.result.times, instant) === key

              return (
                <div
                  aria-current={isActive ? 'time' : undefined}
                  className={`prayer-times__item${isActive ? ' prayer-times__item--active' : ''}`}
                  key={key}
                >
                  <dt>
                    <span className="prayer-times__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span>{t(label)}</span>
                  </dt>
                  <dd>
                    <span className="prayer-times__time">
                      {formatClockTime(state.result.times[key], locale)}
                    </span>
                  </dd>
                </div>
              )
            })}
          </dl>
          {state.result.source === 'stale-cache' && (
            <p className="prayer-times__notice">
              {t('pages.home.prayerTimes.cachedNotice')}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

function PrayerDayPath({
  activePrayerKey,
  progress,
}: {
  activePrayerKey: ActivePrayerKey | null
  progress: number
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathGeometry, setPathGeometry] = useState<{
    renderedTotalLength: number
    renderedHighlightLength: number
    markerPositions: Record<DisplayedTimeKey, { x: number; y: number }>
  } | null>(null)

  useLayoutEffect(() => {
    const path = pathRef.current

    if (!path || typeof path.getTotalLength !== 'function') return

    const updateGeometry = () => {
      const totalLength = path.getTotalLength()
      const currentDistance = totalLength * progress
      const markerPositions = Object.fromEntries(
        displayedTimes.map(({ key }) => {
          const point = path.getPointAtLength(
            totalLength * prayerMarkerProgress[key],
          )

          return [key, { x: point.x, y: point.y }]
        }),
      ) as Record<DisplayedTimeKey, { x: number; y: number }>
      const { renderedHighlightLength, renderedTotalLength } =
        measureRenderedPath(path, totalLength, currentDistance)

      setPathGeometry({
        renderedTotalLength,
        renderedHighlightLength,
        markerPositions,
      })
    }

    updateGeometry()

    if (typeof ResizeObserver !== 'function') return

    const resizeObserver = new ResizeObserver(updateGeometry)
    resizeObserver.observe(path.ownerSVGElement ?? path)

    return () => resizeObserver.disconnect()
  }, [progress])

  return (
    <div className="prayer-day-path" aria-hidden="true">
      <svg viewBox="0 0 1000 150" preserveAspectRatio="none">
        <path
          ref={pathRef}
          className="prayer-day-path__line"
          d={DAY_CURVE_PATH}
        />
        <path
          className="prayer-day-path__progress"
          d={DAY_CURVE_PATH}
          strokeDasharray={
            pathGeometry
              ? `${pathGeometry.renderedHighlightLength}px ${pathGeometry.renderedTotalLength}px`
              : '0 1'
          }
        />
      </svg>
      {displayedTimes.map(({ key, Icon }) => {
        const position = pathGeometry?.markerPositions[key]

        if (!position) return null

        return (
          <span
            className={`prayer-day-path__marker${key === activePrayerKey ? ' prayer-day-path__marker--active' : ''}`}
            key={key}
            style={{ left: `${position.x / 10}%`, top: `${position.y / 1.5}%` }}
          >
            <Icon />
          </span>
        )
      })}
    </div>
  )
}

function measureRenderedPath(
  path: SVGPathElement,
  totalLength: number,
  currentDistance: number,
) {
  const screenMatrix = path.getScreenCTM()

  if (!screenMatrix) {
    return {
      renderedHighlightLength: currentDistance,
      renderedTotalLength: totalLength,
    }
  }

  const sampleCount = 2_000
  const distances = Array.from(
    { length: sampleCount + 1 },
    (_, index) => (totalLength * index) / sampleCount,
  )
  distances.push(currentDistance)
  distances.sort((first, second) => first - second)

  let renderedLength = 0
  let renderedHighlightLength = 0
  let previousPoint: DOMPoint | null = null

  distances.forEach((distance) => {
    const pathPoint = path.getPointAtLength(distance)
    const screenPoint = new DOMPoint(pathPoint.x, pathPoint.y).matrixTransform(
      screenMatrix,
    )

    if (previousPoint) {
      renderedLength += Math.hypot(
        screenPoint.x - previousPoint.x,
        screenPoint.y - previousPoint.y,
      )
    }

    if (distance === currentDistance) {
      renderedHighlightLength = renderedLength
    }

    previousPoint = screenPoint
  })

  return {
    renderedHighlightLength,
    renderedTotalLength: renderedLength,
  }
}

function MaterialWbTwilight2Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M80-160v-80h800v80H80Zm120-160q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Z" />
    </svg>
  )
}

function MaterialMoonStarsFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Z" />
    </svg>
  )
}

function CalendarToday(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
    </svg>
  )
}

function formatPrayerDate(dateKey: string, locale: string): string {
  const date = new Date(`${dateKey}T12:00:00Z`)

  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
