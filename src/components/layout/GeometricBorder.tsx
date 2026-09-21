import { useId } from 'react'

type GeometricBorderProps = {
  variant: 'nav' | 'section'
}

const borderGeometry = {
  nav: {
    height: 11,
    patternWidth: 64,
    frameInset: 0.65,
    fieldInset: 1.75,
  },
  section: {
    height: 24,
    patternWidth: 112,
    frameInset: 0.75,
    fieldInset: 3.25,
  },
} as const

function buildArchPaths(
  width: number,
  topY: number,
  centerY: number,
  bottomY: number,
) {
  const cellWidth = width / 4
  const upperArches: string[] = []
  const lowerArches: string[] = []
  const upperPetalRibs: string[] = []
  const lowerPetalRibs: string[] = []

  for (let index = 0; index < 4; index += 1) {
    const leftX = index * cellWidth
    const middleX = leftX + cellWidth / 2
    const rightX = leftX + cellWidth
    const leftRibX = leftX + cellWidth * 0.28
    const rightRibX = leftX + cellWidth * 0.72

    upperArches.push(
      `M${leftX} ${bottomY} Q${middleX} ${topY} ${rightX} ${bottomY}`,
    )
    lowerArches.push(
      `M${leftX} ${topY} Q${middleX} ${bottomY} ${rightX} ${topY}`,
    )
    upperPetalRibs.push(
      `M${leftX} ${bottomY} Q${leftRibX} ${centerY} ${middleX} ${topY}`,
      `M${middleX} ${topY} Q${rightRibX} ${centerY} ${rightX} ${bottomY}`,
    )
    lowerPetalRibs.push(
      `M${leftX} ${topY} Q${leftRibX} ${centerY} ${middleX} ${bottomY}`,
      `M${middleX} ${bottomY} Q${rightRibX} ${centerY} ${rightX} ${topY}`,
    )
  }

  const latticePoints = Array.from({ length: 9 }, (_, index) => {
    const x = index * (cellWidth / 2)
    const y =
      index % 4 === 0
        ? centerY
        : index % 2 === 0
          ? centerY
          : index % 4 === 1
            ? topY
            : bottomY
    return `${x} ${y}`
  })

  return {
    lowerArches: lowerArches.join(' '),
    lowerPetalRibs: lowerPetalRibs.join(' '),
    upperArches: upperArches.join(' '),
    upperPetalRibs: upperPetalRibs.join(' '),
    crossingLattice: `M${latticePoints.join(' L')}`,
  }
}

export function GeometricBorder({ variant }: GeometricBorderProps) {
  const geometry = borderGeometry[variant]
  const patternId = `geometric-border-${variant}-${useId().replaceAll(':', '')}`
  const { fieldInset, frameInset, height, patternWidth } = geometry
  const centerY = height / 2
  const topY = fieldInset
  const bottomY = height - fieldInset
  const paths = buildArchPaths(patternWidth, topY, centerY, bottomY)

  return (
    <div
      aria-hidden="true"
      className={`geometric-border geometric-border--${variant}`}
    >
      <svg focusable="false" height={height} role="presentation" width="100%">
        <defs>
          <pattern
            height={height}
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={patternWidth}
          >
            <path
              className="geometric-border__frame"
              d={`M0 ${frameInset}H${patternWidth} M0 ${height - frameInset}H${patternWidth}`}
            />
            {variant === 'section' && (
              <path
                className="geometric-border__frame geometric-border__frame--inner"
                d={`M0 ${frameInset + 1.45}H${patternWidth} M0 ${height - frameInset - 1.45}H${patternWidth}`}
              />
            )}

            <path
              className="geometric-border__arches geometric-border__arches--gold"
              d={paths.upperArches}
            />
            <path
              className="geometric-border__arches geometric-border__arches--cream"
              d={paths.lowerArches}
            />
            <path
              className="geometric-border__petal-ribs geometric-border__petal-ribs--upper"
              d={paths.upperPetalRibs}
            />
            <path
              className="geometric-border__petal-ribs geometric-border__petal-ribs--lower"
              d={paths.lowerPetalRibs}
            />
            <path
              className="geometric-border__crossing-lattice"
              d={paths.crossingLattice}
            />
          </pattern>
        </defs>

        <rect fill={`url(#${patternId})`} height="100%" width="100%" />
      </svg>
    </div>
  )
}
