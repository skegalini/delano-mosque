import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { VisitPage } from './VisitPage'

function renderPage(page: ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>)
}

describe('confirmed mosque content', () => {
  it('keeps visitor and contact information together on Visit', () => {
    const { container } = renderPage(<VisitPage />)

    expect(
      screen.getByRole('heading', {
        name: 'Plan Your Visit',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('1130 Kensington St')).toBeInTheDocument()
    expect(screen.getByText('Delano, CA 93215')).toBeInTheDocument()
    expect(
      screen.getByText('A separate entrance is available for women.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Wudu facilities are available.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'delanomosque@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:delanomosque@gmail.com')
    expect(
      screen.getByRole('link', { name: 'Get Directions' }),
    ).toHaveAttribute(
      'href',
      'https://www.google.com/maps/dir/?api=1&destination=1130%20Kensington%20St%2C%20Delano%2C%20CA%2093215',
    )
    expect(
      screen.getByRole('link', { name: 'Get Directions' }),
    ).toHaveAttribute('target', '_blank')
    expect(
      container.querySelector('.tabler-icon-gender-female'),
    ).toBeInTheDocument()
    const mapFrame = container.querySelector('iframe')

    if (mapFrame) {
      expect(mapFrame).toHaveAttribute(
        'title',
        'Map showing Abu Bakr Al-Siddiq Mosque in Delano, California',
      )
    } else {
      expect(
        screen.getByText(
          'Map preview is available when the Google Maps key is configured.',
        ),
      ).toBeInTheDocument()
    }
  })
})
