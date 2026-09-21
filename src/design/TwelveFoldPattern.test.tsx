import { render } from '@testing-library/react'

import { GeometricCrop, TWELVE_FOLD_TILE_PATH } from './TwelveFoldPattern'

describe('twelve-fold geometric pattern', () => {
  it('reuses one precomputed path across scale and crop variants', () => {
    const { container } = render(
      <>
        <GeometricCrop height={24} offsetY={-44} tileSize={70} />
        <GeometricCrop height={28} offsetY={-36} rails tileSize={110} />
      </>,
    )

    const paths = [...container.querySelectorAll('path')]
    const patterns = [...container.querySelectorAll('pattern')]

    expect(paths).toHaveLength(2)
    expect(
      paths.every((path) => path.getAttribute('d') === TWELVE_FOLD_TILE_PATH),
    ).toBe(true)
    expect(patterns[0]).toHaveAttribute(
      'patternTransform',
      'translate(0 -44) scale(0.7)',
    )
    expect(patterns[1]).toHaveAttribute(
      'patternTransform',
      'translate(0 -36) scale(1.1)',
    )
    expect(container.querySelector('[data-tile-size="110"]')).toHaveClass(
      'twelve-fold-crop--rails',
    )
  })
})
