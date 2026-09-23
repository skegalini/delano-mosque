import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import i18n from '../i18n/config'
import { routes } from './router'

const renderRoute = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

const chooseLanguage = async (
  user: ReturnType<typeof userEvent.setup>,
  controlName: string,
  languageName: string,
) => {
  await user.click(screen.getByRole('button', { name: controlName }))
  await user.click(screen.getByRole('option', { name: languageName }))
}

describe('application foundation', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders the home route', () => {
    renderRoute('/')

    expect(
      screen.getByRole('heading', {
        name: 'A House of Worship, Learning, and Community.',
      }),
    ).toBeInTheDocument()
    expect(
      screen
        .getAllByRole('link', { name: 'Prayer Times' })
        .some((link) => link.getAttribute('href') === '#prayer-times'),
    ).toBe(true)
    expect(
      screen.getByRole('img', { name: 'Abu Bakr Al-Siddiq Mosque' }),
    ).toHaveAttribute('src', '/assets/brand/abu-bakr-logo-dark-clean.png')
  })

  it.each(['/history', '/admin'])(
    'renders the public not-found page for removed route %s',
    (path) => {
      renderRoute(path)

      expect(
        screen.getByRole('heading', { name: 'Page not found' }),
      ).toBeInTheDocument()
    },
  )

  it('renders the approved About history in the selected language', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute('/about')

    expect(
      screen.getByRole('heading', {
        name: 'About Abu Bakr Al-Siddiq Mosque',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Our History')).toBeInTheDocument()
    expect(
      screen.getAllByRole('heading', { name: 'Rooted in Delano' }),
    ).toHaveLength(1)
    expect(
      container.querySelector(
        '.history-chapter--opening .history-chapter__body',
      ),
    ).toHaveTextContent(/^Abu Bakr Al-Siddiq Mosque/)
    expect(
      screen.getByText(/including the home of Mohammed and Irma Abdullah/),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Nora Abdullah/)).not.toBeInTheDocument()
    expect(
      screen.getByText(/The mosque was named in honor of Abu Bakr al-Siddiq/),
    ).toHaveTextContent('Prophet Muhammad ﷺ')
    expect(
      screen.getByRole('complementary', { name: 'Featured photos' }),
    ).toBeInTheDocument()
    expect(
      Array.from(
        container.querySelectorAll<HTMLImageElement>(
          '.featured-history-media__desktop img',
        ),
        (image) => image.getAttribute('src'),
      ),
    ).toEqual([
      '/assets/history/archive/img584.jpg',
      '/assets/history/archive/img586.jpg',
      '/assets/history/archive/img553.jpg',
      '/assets/history/archive/img557.jpg',
    ])
    expect(
      screen.getByRole('heading', { name: 'Delano · 2012' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('2012 community photo album'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Photos from 2012, courtesy of Jonathan Friedlander.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'A Story Preserved on Film' }),
    ).toBeInTheDocument()
    expect(
      screen.getByTitle(
        'Documentary about Delano’s Yemeni Muslim community by Erik Friedl',
      ),
    ).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/yC9CVepWQUY',
    )
    expect(
      screen.getByRole('link', { name: /Watch on YouTube/ }),
    ).toHaveAttribute('href', 'https://youtu.be/yC9CVepWQUY')

    await chooseLanguage(user, 'Language', 'Español')
    expect(screen.getByText('Nuestra Historia')).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', { name: 'Fotografías destacadas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/la de Mohammed e Irma Abdullah/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Fotografías de 2012, por cortesía de Jonathan Friedlander.',
      ),
    ).toBeInTheDocument()

    await chooseLanguage(user, 'Idioma', 'العربية')
    expect(screen.getByText('تاريخنا')).toBeInTheDocument()
    expect(
      screen.getByText(/وسُمّي المسجد باسم أبي بكر الصديق/),
    ).toHaveTextContent('رضي الله عنه')
    expect(screen.getByText(/منزل محمد وإيرما عبد الله/)).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', { name: 'صور مختارة' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('صور من عام 2012، مقدمة بإذن من جوناثان فريدلاندر.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'إريك فريدل' }).closest('p'),
    ).toHaveTextContent('الفيلم الوثائقي مقدم بإذن من إريك فريدل (2012).')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
  })

  it('orders primary navigation by visitor relevance', () => {
    renderRoute('/')

    const primaryNavigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
    })
    const links = within(primaryNavigation).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'Home',
      'Visit',
      'Programs',
      'About',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/visit',
      '/programs',
      '/about',
    ])
    const headerDonateButton = screen.getByRole('button', { name: 'Donate' })

    expect(headerDonateButton).toHaveAttribute(
      'data-gb-account',
      'pmetkEb39XTuRaXB',
    )
    expect(headerDonateButton).toHaveAttribute('data-gb-campaign', 'HUXSOZ')
    expect(headerDonateButton?.querySelector('svg')).toBeInTheDocument()
    expect(
      screen.getByText(/© \d{4} Abu Bakr Al-Siddiq Mosque/),
    ).toBeInTheDocument()
  })

  it('renders visitor information on the Visit route', () => {
    renderRoute('/visit')

    expect(screen.getByRole('main')).toHaveClass('site-main--visit')
    expect(
      screen.getByRole('heading', { name: 'Plan Your Visit' }),
    ).toBeInTheDocument()
    expect(screen.getByText('1130 Kensington St')).toBeInTheDocument()
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

    await chooseLanguage(user, 'Language', 'العربية')

    expect(document.documentElement).toHaveAttribute('lang', 'ar')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(
      screen.getByRole('heading', {
        name: 'بيت للعبادة والعلم والمجتمع.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'ديلانو، كاليفورنيا' }),
    ).toBeInTheDocument()
  })

  it('keeps the display surface separate from the public layout', () => {
    renderRoute('/display')

    expect(
      screen.getByRole('heading', { name: 'Mosque Display' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })

  it('exposes an accessible mobile navigation control', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const primaryNavigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
    })
    const languageControl = screen.getByRole('button', { name: 'Language' })
    const donateButton = screen.getByRole('button', { name: 'Donate' })
    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    })

    expect(primaryNavigation).not.toContainElement(languageControl)
    expect(primaryNavigation).not.toContainElement(donateButton)
    expect(languageControl).toHaveTextContent('English')
    expect(document.querySelectorAll('#language-selector')).toHaveLength(1)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Close navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('always uses the green mosque theme regardless of system preference', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    renderRoute('/')

    // No toggle, and nothing reacts to the light system preference above.
    expect(
      screen.queryByRole('button', { name: /switch to (light|dark) mode/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Abu Bakr Al-Siddiq Mosque' }),
    ).toHaveAttribute('src', '/assets/brand/abu-bakr-logo-dark-clean.png')
  })

  it('renders the not-found page for a missing route', () => {
    renderRoute('/missing-page')

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()
  })
})
