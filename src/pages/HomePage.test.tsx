import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { HomePage } from './HomePage'

const providerResponse = {
  code: 200,
  status: 'OK',
  data: [
    {
      timings: {
        Fajr: '04:51 (PDT)',
        Sunrise: '06:18 (PDT)',
        Dhuhr: '12:59 (PDT)',
        Asr: '17:01 (PDT)',
        Maghrib: '19:39 (PDT)',
        Isha: '21:06 (PDT)',
      },
      date: { gregorian: { date: '27-08-2026' } },
    },
  ],
}

describe('Home prayer times', () => {
  it('renders calculated prayer times from the provider', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-27T19:00:00Z'))
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => providerResponse,
      }),
    )

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', {
        name: 'View Abu Bakr Al-Siddiq Mosque in Google Maps',
      }),
    ).toHaveAttribute(
      'href',
      'https://www.google.com/maps/search/?api=1&query=Abu+Bakr+Al-Siddiq+Mosque+1130+Kensington+St%2C+Delano%2C+CA+93215',
    )
    expect(
      screen.getByRole('link', {
        name: 'View Abu Bakr Al-Siddiq Mosque in Google Maps',
      }),
    ).toHaveAttribute('target', '_blank')

    // The hero carries only the Prayer Times call to action; donating lives
    // in the header.
    expect(
      screen.queryByRole('button', { name: 'Donate' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /prayer times/i })).toHaveAttribute(
      'href',
      '#prayer-times',
    )

    expect(
      screen.getByText('Loading calculated prayer times…'),
    ).toBeInTheDocument()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0)
    })

    expect(screen.getByText('4:51 AM')).toBeInTheDocument()
    expect(screen.getByText('6:18 AM')).toBeInTheDocument()
    expect(screen.getByText('12:59 PM')).toBeInTheDocument()
    expect(screen.getByText('7:39 PM')).toBeInTheDocument()
    expect(screen.getByText('Thursday, August 27')).toBeInTheDocument()
  })

  it("shows the Jumu'ah time in the hero, under the primary actions", async () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    const note = container.querySelector<HTMLElement>('.jummah-note')
    expect(note).toBeInTheDocument()
    expect(note).toHaveTextContent("Jumu'ah Prayer")
    expect(note).toHaveTextContent('Fridays at 1:00 PM')

    // It belongs to the hero, after the two primary buttons.
    const actions = container.querySelector<HTMLElement>('.home-hero__actions')
    expect(
      container.querySelector<HTMLElement>('.home-hero__content'),
    ).toContainElement(note)
    expect(
      actions!.compareDocumentPosition(note!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()

    // Stated once, and no longer inside the prayer-times section.
    expect(container.querySelectorAll('.jummah-note')).toHaveLength(1)
    expect(
      container.querySelector('.prayer-times .jummah-note'),
    ).not.toBeInTheDocument()

    // It must not depend on the prayer-time request resolving.
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })

  it('shows a visitor-safe unavailable state when no prayer data can load', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Prayer times are temporarily unavailable.',
    )
  })
})
