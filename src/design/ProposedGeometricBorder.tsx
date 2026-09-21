import { useId } from 'react'

type ProposedGeometricBorderProps = {
  scale?: number
  variant: 'nav' | 'section'
}

const borderGeometry = {
  nav: {
    height: 13,
    patternWidth: 80,
    frameInset: 0.7,
    fieldInset: 2,
  },
  section: {
    height: 30,
    patternWidth: 128,
    frameInset: 0.8,
    fieldInset: 4,
  },
} as const

function point(value: number, scale: number) {
  return Number((value * scale).toFixed(3))
}

function makePointedPetal(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  spread: number,
) {
  const deltaX = endX - startX
  const deltaY = endY - startY
  const length = Math.hypot(deltaX, deltaY)
  const perpendicularX = (-deltaY / length) * spread
  const perpendicularY = (deltaX / length) * spread
  const firstX = startX + deltaX * 0.3
  const firstY = startY + deltaY * 0.3
  const secondX = startX + deltaX * 0.72
  const secondY = startY + deltaY * 0.72

  return [
    `M${startX} ${startY}`,
    `C${firstX + perpendicularX} ${firstY + perpendicularY} ${secondX + perpendicularX} ${secondY + perpendicularY} ${endX} ${endY}`,
    `C${secondX - perpendicularX} ${secondY - perpendicularY} ${firstX - perpendicularX} ${firstY - perpendicularY} ${startX} ${startY}`,
  ].join(' ')
}

function makePetalLattice(width: number, height: number, fieldInset: number) {
  const centerY = height / 2
  const topY = fieldInset
  const bottomY = height - fieldInset
  const cellWidth = width / 2
  const majorSpread = height * 0.075
  const narrowSpread = height * 0.052
  const railSpread = height * 0.043
  const upperLobes: string[] = []
  const lowerLobes: string[] = []
  const innerLobes: string[] = []
  const kiteBranches: string[] = []

  for (let index = 0; index < 2; index += 1) {
    const leftX = index * cellWidth
    const rightX = leftX + cellWidth
    const upperLeftX = leftX + cellWidth * 0.32
    const upperRightX = leftX + cellWidth * 0.68
    const lowerLeftX = leftX + cellWidth * 0.32
    const lowerRightX = leftX + cellWidth * 0.68

    upperLobes.push(
      makePointedPetal(
        leftX,
        centerY,
        leftX + cellWidth * 0.16,
        topY,
        railSpread,
      ),
      makePointedPetal(leftX, centerY, upperLeftX, topY, majorSpread),
      makePointedPetal(leftX, centerY, upperRightX, topY, majorSpread),
      makePointedPetal(rightX, centerY, upperLeftX, topY, majorSpread),
      makePointedPetal(rightX, centerY, upperRightX, topY, majorSpread),
      makePointedPetal(
        rightX,
        centerY,
        leftX + cellWidth * 0.84,
        topY,
        railSpread,
      ),
    )
    lowerLobes.push(
      makePointedPetal(
        leftX,
        centerY,
        leftX + cellWidth * 0.16,
        bottomY,
        railSpread,
      ),
      makePointedPetal(leftX, centerY, lowerLeftX, bottomY, majorSpread),
      makePointedPetal(leftX, centerY, lowerRightX, bottomY, majorSpread),
      makePointedPetal(rightX, centerY, lowerLeftX, bottomY, majorSpread),
      makePointedPetal(rightX, centerY, lowerRightX, bottomY, majorSpread),
      makePointedPetal(
        rightX,
        centerY,
        leftX + cellWidth * 0.84,
        bottomY,
        railSpread,
      ),
    )
    innerLobes.push(
      makePointedPetal(leftX, centerY, rightX, centerY, narrowSpread),
      makePointedPetal(upperLeftX, topY, lowerRightX, bottomY, narrowSpread),
      makePointedPetal(upperRightX, topY, lowerLeftX, bottomY, narrowSpread),
    )
    kiteBranches.push(
      `M${leftX} ${centerY} L${upperLeftX} ${topY} L${rightX} ${centerY} L${lowerLeftX} ${bottomY} Z`,
      `M${leftX} ${centerY} L${upperRightX} ${topY} L${rightX} ${centerY} L${lowerRightX} ${bottomY} Z`,
      `M${upperLeftX} ${topY} Q${leftX + cellWidth / 2} ${topY + height * 0.08} ${upperRightX} ${topY}`,
      `M${lowerLeftX} ${bottomY} Q${leftX + cellWidth / 2} ${bottomY - height * 0.08} ${lowerRightX} ${bottomY}`,
    )
  }

  return {
    bottomY,
    centerY,
    innerLobes: innerLobes.join(' '),
    kiteBranches: kiteBranches.join(' '),
    lowerLobes: lowerLobes.join(' '),
    topY,
    upperLobes: upperLobes.join(' '),
  }
}

function makeJunctions(width: number, centerY: number, scale: number) {
  const halfWidth = width / 2
  const horizontalRadius = point(3, scale)
  const verticalRadius = point(3.4, scale)
  const innerRatio = 0.42

  return [0, halfWidth, width]
    .map((centerX) => {
      const points = Array.from({ length: 16 }, (_, index) => {
        const angle = -Math.PI / 2 + index * (Math.PI / 8)
        const ratio = index % 2 === 0 ? 1 : innerRatio
        const x = centerX + Math.cos(angle) * horizontalRadius * ratio
        const y = centerY + Math.sin(angle) * verticalRadius * ratio
        return `${point(x, 1)} ${point(y, 1)}`
      })
      return `M${points.join(' L')} Z`
    })
    .join(' ')
}

export function ProposedGeometricBorder({
  scale = 1,
  variant,
}: ProposedGeometricBorderProps) {
  const base = borderGeometry[variant]
  const height = point(base.height, scale)
  const patternWidth = point(base.patternWidth, scale)
  const frameInset = point(base.frameInset, scale)
  const fieldInset = point(base.fieldInset, scale)
  const patternId = `proposed-border-${variant}-${useId().replaceAll(':', '')}`
  const lattice = makePetalLattice(patternWidth, height, fieldInset)
  const junctions = makeJunctions(patternWidth, lattice.centerY, scale)

  return (
    <div
      aria-hidden="true"
      className={`proposed-geometric-border proposed-geometric-border--${variant}`}
      data-scale={scale}
      style={{ height }}
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
              className="proposed-geometric-border__rails"
              d={`M0 ${frameInset}H${patternWidth} M0 ${height - frameInset}H${patternWidth}`}
            />
            <path
              className="proposed-geometric-border__major-lobes"
              d={`${lattice.upperLobes} ${lattice.lowerLobes}`}
            />
            <path
              className="proposed-geometric-border__inner-lobes"
              d={lattice.innerLobes}
            />
            <path
              className="proposed-geometric-border__kite-branches"
              d={lattice.kiteBranches}
            />
            <path
              className="proposed-geometric-border__junctions"
              d={junctions}
            />
          </pattern>
        </defs>

        <rect fill={`url(#${patternId})`} height="100%" width="100%" />
      </svg>
    </div>
  )
}
