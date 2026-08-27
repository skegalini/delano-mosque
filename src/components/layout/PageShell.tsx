import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  title: string
}

export function PageShell({ children, title }: PageShellProps) {
  return (
    <section className="max-w-3xl" aria-labelledby="page-title">
      <h1
        className="text-3xl font-semibold tracking-tight text-[var(--color-masjid-green-deep)] sm:text-4xl"
        id="page-title"
      >
        {title}
      </h1>
      <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
        {children}
      </p>
    </section>
  )
}
