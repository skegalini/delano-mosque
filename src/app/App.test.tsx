import { fireEvent, render, screen, within } from '@testing-library/react'
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

    const homeTitle = screen.getByRole('heading', {
      name: 'Abu Bakr Al-Siddiq Mosque',
    })

    expect(homeTitle).toBeInTheDocument()
    expect(
      Array.from(
        homeTitle.querySelectorAll<HTMLElement>('.home-hero__title-line'),
        (line) => line.textContent,
      ),
    ).toEqual(['Abu Bakr', 'Al-Siddiq Mosque'])
    expect(
      screen.getByText('A House of Worship, Learning, and Community.'),
    ).toHaveClass('home-hero__tagline', 'font-display')
    expect(document.querySelector('.home-hero__divider')).toBeInTheDocument()
    expect(
      screen
        .getAllByRole('link', { name: 'Prayer Times' })
        .some((link) => link.getAttribute('href') === '#prayer-times'),
    ).toBe(true)
    expect(
      screen.getByRole('img', { name: 'Abu Bakr Al-Siddiq Mosque' }),
    ).toHaveAttribute('src', '/assets/brand/abu-bakr-logo-dark-clean.png')
  })

  it.each([
    [
      '/',
      'Abu Bakr Al-Siddiq Mosque | Delano, California',
      'https://delanomosque.org/',
      'Official website of Abu Bakr Al-Siddiq Mosque in Delano, California.',
    ],
    [
      '/visit',
      'Visit Abu Bakr Al-Siddiq Mosque | Delano, California',
      'https://delanomosque.org/visit',
      'Plan your visit to Abu Bakr Al-Siddiq Mosque in Delano, California.',
    ],
    [
      '/programs',
      'Programs | Abu Bakr Al-Siddiq Mosque',
      'https://delanomosque.org/programs',
      'Explore Quran learning, weekend youth activities, and overnight youth programs',
    ],
    [
      '/about',
      'About Abu Bakr Al-Siddiq Mosque | Delano',
      'https://delanomosque.org/about',
      'Learn about the history of Abu Bakr Al-Siddiq Mosque',
    ],
  ])(
    'sets indexable production metadata for %s',
    (path, title, canonicalUrl, descriptionStart) => {
      renderRoute(path)

      expect(document.title).toBe(title)
      expect(
        document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]'),
      ).toHaveAttribute('href', canonicalUrl)
      expect(
        document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
          ?.content,
      ).toContain(descriptionStart)
      expect(
        document.head.querySelector<HTMLMetaElement>('meta[name="robots"]'),
      ).toHaveAttribute('content', 'index, follow')
      expect(
        document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]'),
      ).toHaveAttribute('content', canonicalUrl)
      expect(
        document.head.querySelector<HTMLMetaElement>(
          'meta[name="twitter:title"]',
        ),
      ).toHaveAttribute('content', title)
    },
  )

  it('publishes factual mosque structured data on indexable pages', () => {
    renderRoute('/')

    const structuredDataElement =
      document.head.querySelector<HTMLScriptElement>('#mosque-structured-data')
    const structuredData = JSON.parse(structuredDataElement?.text ?? '{}')

    expect(structuredData).toMatchObject({
      '@context': 'https://schema.org',
      '@type': ['Mosque', 'ReligiousOrganization'],
      '@id': 'https://delanomosque.org/#mosque',
      name: 'Abu Bakr Al-Siddiq Mosque',
      url: 'https://delanomosque.org/',
      logo: 'https://delanomosque.org/assets/brand/abu-bakr-logo-dark-clean.png',
      email: 'delanomosque@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1130 Kensington St',
        addressLocality: 'Delano',
        addressRegion: 'CA',
        postalCode: '93215',
        addressCountry: 'US',
      },
    })
  })

  it.each(['/history', '/admin'])(
    'renders the public not-found page for removed route %s',
    (path) => {
      renderRoute(path)

      expect(
        screen.getByRole('heading', { name: 'Page not found' }),
      ).toBeInTheDocument()
      expect(
        document.head.querySelector<HTMLMetaElement>('meta[name="robots"]'),
      ).toHaveAttribute('content', 'noindex, nofollow')
      expect(
        document.head.querySelector('link[rel="canonical"]'),
      ).not.toBeInTheDocument()
    },
  )

  it('keeps the internal display route out of the search index', () => {
    renderRoute('/display')

    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="robots"]'),
    ).toHaveAttribute('content', 'noindex, nofollow')
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).not.toBeInTheDocument()
  })

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

    expect(headerDonateButton).not.toHaveAttribute('data-gb-account')
    expect(headerDonateButton).not.toHaveAttribute('data-gb-campaign')
    expect(headerDonateButton?.querySelector('svg')).toBeInTheDocument()
    expect(
      screen.getByText(/© \d{4} Abu Bakr Al-Siddiq Mosque/),
    ).toBeInTheDocument()
  })

  it('opens the branded Givebutter donation dialog and restores focus', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const donateButton = screen.getByRole('button', { name: 'Donate' })
    await user.click(donateButton)

    const dialog = screen.getByRole('dialog', {
      name: 'Support Abu Bakr Al-Siddiq Mosque',
    })

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    expect(dialog.querySelector('givebutter-widget')).toHaveAttribute(
      'id',
      'j1XvJD',
    )
    expect(
      screen.getByText(/Allah compares those who spend in His cause/),
    ).toBeInTheDocument()

    fireEvent(dialog, new Event('cancel', { cancelable: true }))

    expect(dialog).not.toHaveAttribute('open')
    expect(document.body.style.overflow).toBe('')
    expect(donateButton).toHaveFocus()
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
        name: 'مسجد أبي بكر الصديق',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('بيت للعبادة والعلم والمجتمع.')).toHaveClass(
      'home-hero__tagline',
      'font-display',
    )
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
