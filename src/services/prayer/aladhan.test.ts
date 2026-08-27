import { describe, expect, it, vi } from 'vitest'

import {
  buildAlAdhanCalendarUrl,
  fetchAlAdhanCalendar,
  normalizeAlAdhanCalendar,
  parseAlAdhanTime,
} from './aladhan'

const responsePayload = (asr: unknown = '17:01 (PDT)') => ({
  code: 200,
  status: 'OK',
  data: [
    {
      timings: {
        Fajr: '04:51 (PDT)',
        Sunrise: '06:18 (PDT)',
        Dhuhr: '12:59 (PDT)',
        Asr: asr,
        Maghrib: '19:39 (PDT)',
        Isha: '21:06 (PDT)',
        Imsak: '04:41 (PDT)',
        Sunset: '19:39 (PDT)',
        Midnight: '00:59 (PDT)',
      },
      date: {
        gregorian: {
          date: '27-08-2026',
        },
      },
    },
  ],
})

describe('AlAdhan integration', () => {
  it('extracts and normalizes valid decorated timing strings', () => {
    expect(parseAlAdhanTime('05:12 (PDT)')).toBe('05:12')
    expect(parseAlAdhanTime('5:12 PST')).toBe('05:12')
  })

  it('rejects malformed timing data', () => {
    expect(parseAlAdhanTime('25:12 (PDT)')).toBeNull()
    expect(parseAlAdhanTime('05:72 (PDT)')).toBeNull()
    expect(parseAlAdhanTime('not a time')).toBeNull()
    expect(parseAlAdhanTime(null)).toBeNull()
  })

  it('normalizes only the calculated timings used by the application', () => {
    expect(normalizeAlAdhanCalendar(responsePayload(), 2026, 8)).toEqual({
      year: 2026,
      month: 8,
      timezone: 'America/Los_Angeles',
      days: [
        {
          date: '2026-08-27',
          timezone: 'America/Los_Angeles',
          fajr: '04:51',
          sunrise: '06:18',
          dhuhr: '12:59',
          asr: '17:01',
          maghrib: '19:39',
          isha: '21:06',
        },
      ],
    })
  })

  it('fails normalization when a required timing is malformed', () => {
    expect(() =>
      normalizeAlAdhanCalendar(responsePayload('invalid'), 2026, 8),
    ).toThrow('Invalid prayer timing data')
  })

  it('fetches a Gregorian month with the verified coordinates and calculation configuration', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => responsePayload(),
    })

    await expect(fetchAlAdhanCalendar(2026, 8, fetcher)).resolves.toMatchObject(
      {
        year: 2026,
        month: 8,
      },
    )

    const requestUrl = fetcher.mock.calls[0][0] as URL
    expect(requestUrl.origin + requestUrl.pathname).toBe(
      'https://api.aladhan.com/v1/calendar/2026/8',
    )
    expect(requestUrl.searchParams.get('latitude')).toBe('35.772517')
    expect(requestUrl.searchParams.get('longitude')).toBe('-119.243572')
    expect(requestUrl.searchParams.get('timezonestring')).toBe(
      'America/Los_Angeles',
    )
    expect(requestUrl.searchParams.get('method')).toBe('2')
    expect(requestUrl.searchParams.get('school')).toBe('0')
    expect(requestUrl.searchParams.has('address')).toBe(false)
  })

  it('constructs the expected provider URL without an API key', () => {
    const url = buildAlAdhanCalendarUrl(2026, 8)

    expect(url.searchParams.has('apikey')).toBe(false)
    expect(url.protocol).toBe('https:')
  })

  it('fails without exposing a provider response when the request is unsuccessful', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false })

    await expect(fetchAlAdhanCalendar(2026, 8, fetcher)).rejects.toThrow(
      'Prayer provider request failed',
    )
  })
})
