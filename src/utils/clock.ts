export function formatClockTime(time: string, locale: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const date = new Date(Date.UTC(2000, 0, 1, hour, minute))

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date)
}
