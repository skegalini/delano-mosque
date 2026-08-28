export function isValidTimeZone(timezone: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format()
    return true
  } catch (error) {
    if (error instanceof RangeError) {
      return false
    }

    throw error
  }
}

export type DatePartsInTimeZone = {
  year: number
  month: number
  day: number
  dateKey: string
}

export function getDatePartsInTimeZone(
  date: Date,
  timezone: string,
): DatePartsInTimeZone {
  assertValidDate(date)

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = Number(getPart(parts, 'year'))
  const month = Number(getPart(parts, 'month'))
  const day = Number(getPart(parts, 'day'))

  return {
    year,
    month,
    day,
    dateKey: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  }
}

export function getDateKeyInTimeZone(date: Date, timezone: string): string {
  return getDatePartsInTimeZone(date, timezone).dateKey
}

export function formatInTimeZone(
  date: Date,
  timezone: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  assertValidDate(date)

  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: timezone,
  }).format(date)
}

function assertValidDate(date: Date): void {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid date')
  }
}

function getPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string {
  const value = parts.find((part) => part.type === type)?.value

  if (!value) {
    throw new Error(`Missing ${type} while formatting date`)
  }

  return value
}
