import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { AboutPage } from './AboutPage'
import { DonatePage } from './DonatePage'
import { HomePage } from './HomePage'

function renderPage(page: ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>)
}

describe('confirmed mosque content', () => {
  it('renders the mosque-controlled Jummah time on Home', () => {
    renderPage(<HomePage />)

    expect(
      screen.getByRole('heading', { name: 'Jummah Prayer' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Friday')).toBeInTheDocument()
    expect(screen.getByText('1:00 PM')).toBeInTheDocument()
  })

  it('renders the approved public email as a mail link on Home', () => {
    renderPage(<HomePage />)

    expect(
      screen.getByRole('link', { name: 'delanomosque@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:delanomosque@gmail.com')
  })

  it('uses shared confirmed mosque information on About', () => {
    renderPage(<AboutPage />)

    expect(
      screen.getByRole('heading', {
        name: 'About Abu Bakr Al-Siddiq Mosque',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('1130 Kensington St, Delano, CA 93215'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('A separate entrance is available for women.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Wudu facilities are available.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'delanomosque@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:delanomosque@gmail.com')
  })

  it('renders the safe pending Givebutter setup state without a donation form', () => {
    const { container } = renderPage(<DonatePage />)

    expect(
      screen.getByRole('heading', {
        name: 'Support Abu Bakr Al-Siddiq Mosque',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Online giving through Givebutter is being prepared.'),
    ).toBeInTheDocument()
    expect(container.querySelector('form')).not.toBeInTheDocument()
    expect(container.querySelector('input')).not.toBeInTheDocument()
    expect(container.querySelector('script')).not.toBeInTheDocument()
  })
})
