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

export function getDateKeyInTimeZone(date: Date, timezone: string): string {
  assertValidDate(date)

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = getPart(parts, 'year')
  const month = getPart(parts, 'month')
  const day = getPart(parts, 'day')

  return `${year}-${month}-${day}`
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
