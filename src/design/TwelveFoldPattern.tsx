import { useId, type CSSProperties } from 'react'

/**
 * Precomputed from two interleaved square lattices of regular {12/5}
 * dodecagrams. Neighboring stars overlap beyond the 100 × 100 tile bounds,
 * so clipping and repetition reveal their chord intersections seamlessly.
 */
export const TWELVE_FOLD_TILE_PATH =
  'M0 -62 L31 53.694 L-53.694 -31 L62 0 L-53.694 31 L31 -53.694 L0 62 L-31 -53.694 L53.694 31 L-62 0 L53.694 -31 L-31 53.694 Z M0 38 L31 153.694 L-53.694 69 L62 100 L-53.694 131 L31 46.306 L0 162 L-31 46.306 L53.694 131 L-62 100 L53.694 69 L-31 153.694 Z M100 -62 L131 53.694 L46.306 -31 L162 0 L46.306 31 L131 -53.694 L100 62 L69 -53.694 L153.694 31 L38 0 L153.694 -31 L69 53.694 Z M100 38 L131 153.694 L46.306 69 L162 100 L46.306 131 L131 46.306 L100 162 L69 46.306 L153.694 131 L38 100 L153.694 69 L69 153.694 Z M-50 -112 L-19 3.694 L-103.694 -81 L12 -50 L-103.694 -19 L-19 -103.694 L-50 12 L-81 -103.694 L3.694 -19 L-112 -50 L3.694 -81 L-81 3.694 Z M-50 -12 L-19 103.694 L-103.694 19 L12 50 L-103.694 81 L-19 -3.694 L-50 112 L-81 -3.694 L3.694 81 L-112 50 L3.694 19 L-81 103.694 Z M-50 88 L-19 203.694 L-103.694 119 L12 150 L-103.694 181 L-19 96.306 L-50 212 L-81 96.306 L3.694 181 L-112 150 L3.694 119 L-81 203.694 Z M50 -112 L81 3.694 L-3.694 -81 L112 -50 L-3.694 -19 L81 -103.694 L50 12 L19 -103.694 L103.694 -19 L-12 -50 L103.694 -81 L19 3.694 Z M50 -12 L81 103.694 L-3.694 19 L112 50 L-3.694 81 L81 -3.694 L50 112 L19 -3.694 L103.694 81 L-12 50 L103.694 19 L19 103.694 Z M50 88 L81 203.694 L-3.694 119 L112 150 L-3.694 181 L81 96.306 L50 212 L19 96.306 L103.694 181 L-12 150 L103.694 119 L19 203.694 Z M150 -112 L181 3.694 L96.306 -81 L212 -50 L96.306 -19 L181 -103.694 L150 12 L119 -103.694 L203.694 -19 L88 -50 L203.694 -81 L119 3.694 Z M150 -12 L181 103.694 L96.306 19 L212 50 L96.306 81 L181 -3.694 L150 112 L119 -3.694 L203.694 81 L88 50 L203.694 19 L119 103.694 Z M150 88 L181 203.694 L96.306 119 L212 150 L96.306 181 L181 96.306 L150 212 L119 96.306 L203.694 181 L88 150 L203.694 119 L119 203.694 Z'

type IslamicGeometricPatternProps = {
  offsetX?: number
  offsetY?: number
  tileSize: number
}

type GeometricCropProps = IslamicGeometricPatternProps & {
  height: number
  rails?: boolean
}

export function IslamicGeometricPattern({
  offsetX = 0,
  offsetY = 0,
  tileSize,
}: IslamicGeometricPatternProps) {
  const patternId = `twelve-fold-${useId().replaceAll(':', '')}`
  const scale = tileSize / 100

  return (
    <svg
      aria-hidden="true"
      className="twelve-fold-pattern"
      focusable="false"
      role="presentation"
    >
      <defs>
        <pattern
          height="100"
          id={patternId}
          patternTransform={`translate(${offsetX} ${offsetY}) scale(${scale})`}
          patternUnits="userSpaceOnUse"
          width="100"
        >
          <path d={TWELVE_FOLD_TILE_PATH} />
        </pattern>
      </defs>
      <rect fill={`url(#${patternId})`} height="100%" width="100%" />
    </svg>
  )
}

export function GeometricCrop({
  height,
  offsetX = 0,
  offsetY = 0,
  rails = false,
  tileSize,
}: GeometricCropProps) {
  return (
    <div
      className={`twelve-fold-crop${rails ? ' twelve-fold-crop--rails' : ''}`}
      data-crop-height={height}
      data-offset-y={offsetY}
      data-tile-size={tileSize}
      style={{ '--crop-height': `${height}px` } as CSSProperties}
    >
      <IslamicGeometricPattern
        offsetX={offsetX}
        offsetY={offsetY}
        tileSize={tileSize}
      />
    </div>
  )
}
