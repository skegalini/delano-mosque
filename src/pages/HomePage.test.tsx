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
      screen.getByText('Loading calculated prayer times…'),
    ).toBeInTheDocument()
    await act(async () => {
      await vi.runAllTimersAsync()
    })

    expect(screen.getByText('4:51 AM')).toBeInTheDocument()
    expect(screen.getByText('6:18 AM')).toBeInTheDocument()
    expect(screen.getByText('12:59 PM')).toBeInTheDocument()
    expect(screen.getByText('7:39 PM')).toBeInTheDocument()
    expect(screen.getByText('Thursday, August 27')).toBeInTheDocument()
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
