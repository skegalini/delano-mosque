import { useTranslation } from 'react-i18next'

export function AdminPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-[var(--color-warm-background)] px-4 py-12 text-[var(--color-text)] sm:px-6">
      <section className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-[var(--color-surface)] p-6">
        <h1 className="text-3xl font-semibold text-[var(--color-masjid-green-deep)]">
          {t('pages.admin.title')}
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          {t('pages.admin.body')}
        </p>
      </section>
    </main>
  )
}
