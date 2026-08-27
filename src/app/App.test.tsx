import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { routes } from './router'

const renderRoute = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

describe('application foundation', () => {
  it('renders the home route', () => {
    renderRoute('/')

    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument()
  })

  it('renders the history route', () => {
    renderRoute('/history')

    expect(screen.getByRole('heading', { name: 'History' })).toBeInTheDocument()
  })

  it('renders the programs route', () => {
    renderRoute('/programs')

    expect(
      screen.getByRole('heading', { name: 'Programs' }),
    ).toBeInTheDocument()
  })

  it('changes the document language and direction for Arabic', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.selectOptions(screen.getByLabelText('Language'), 'ar')

    expect(document.documentElement).toHaveAttribute('lang', 'ar')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(screen.getByRole('heading', { name: 'مرحبًا' })).toBeInTheDocument()
  })

  it('renders the not-found page for a missing route', () => {
    renderRoute('/missing-page')

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})
