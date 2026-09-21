import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, vi } from 'vitest'

import { communityAlbumPhotos } from '../../data/historyArchive'
import { CommunityPhotoCarousel } from './CommunityPhotoCarousel'

const scrollTo = vi.fn()

const renderCarousel = () =>
  render(
    <CommunityPhotoCarousel
      photos={communityAlbumPhotos}
      label="2012 community photo album"
      previousLabel="Previous photograph"
      nextLabel="Next photograph"
      getPhotoAlt={(position, total) =>
        `Community photograph ${position} of ${total}, Delano, 2012`
      }
    />,
  )

describe('CommunityPhotoCarousel', () => {
  beforeEach(() => {
    scrollTo.mockReset()
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
  })

  afterEach(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  })

  it('renders every album photograph once in archive order', () => {
    const { container } = renderCarousel()
    const images = Array.from(
      container.querySelectorAll<HTMLImageElement>(
        '.community-photo-carousel__photo',
      ),
    )

    expect(images).toHaveLength(12)
    expect(images.map((image) => image.getAttribute('src'))).toEqual(
      communityAlbumPhotos.map((photo) => photo.src),
    )
  })

  it('reserves intrinsic dimensions so lazy slides do not collapse before load', () => {
    const { container } = renderCarousel()
    const images = Array.from(
      container.querySelectorAll<HTMLImageElement>(
        '.community-photo-carousel__photo',
      ),
    )

    images.forEach((image, index) => {
      const photo = communityAlbumPhotos[index]

      expect(image.getAttribute('width')).toBe(String(photo.width))
      expect(image.getAttribute('height')).toBe(String(photo.height))
    })

    // Both portrait plates must stay taller than they are wide.
    const portraits = images.filter(
      (image) =>
        Number(image.getAttribute('height')) >
        Number(image.getAttribute('width')),
    )
    expect(portraits).toHaveLength(2)
  })

  it('moves by photograph with chevrons and keyboard controls', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const carousel = screen.getByRole('group', {
      name: '2012 community photo album',
    })
    const previous = screen.getByRole('button', {
      name: 'Previous photograph',
    })
    const next = screen.getByRole('button', { name: 'Next photograph' })

    expect(previous).toBeDisabled()
    expect(next).toBeEnabled()
    expect(screen.getByText('1 / 12')).toBeInTheDocument()

    await user.click(next)
    expect(screen.getByText('2 / 12')).toBeInTheDocument()
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })

    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    expect(screen.getByText('3 / 12')).toBeInTheDocument()

    await user.click(previous)
    expect(screen.getByText('2 / 12')).toBeInTheDocument()
  })

  it('uses immediate scrolling for reduced motion and stops at the end', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    )

    renderCarousel()
    const next = screen.getByRole('button', { name: 'Next photograph' })

    for (let index = 1; index < communityAlbumPhotos.length; index += 1) {
      fireEvent.click(next)
    }

    expect(screen.getByText('12 / 12')).toBeInTheDocument()
    expect(next).toBeDisabled()
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'auto' })
  })
})
