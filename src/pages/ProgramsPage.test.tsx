import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import i18n from '../i18n/config'
import { ProgramsPage } from './ProgramsPage'

function renderProgramsPage() {
  return render(
    <MemoryRouter>
      <ProgramsPage />
    </MemoryRouter>,
  )
}

describe('Programs page', () => {
  it('shows concise selectors and exposes one complete program at a time', async () => {
    const user = userEvent.setup()
    renderProgramsPage()

    const quranButton = screen.getByRole('button', {
      name: /The Holy Quran Program/,
    })
    const weekendButton = screen.getByRole('button', {
      name: /The Weekend Youth Program/,
    })
    const mabeetButton = screen.getByRole('button', {
      name: /Youth Overnight Retreat \(Mabeet Program\)/,
    })

    expect(quranButton).toHaveAttribute('aria-expanded', 'false')
    expect(quranButton).toHaveAttribute('aria-controls', 'program-quran-detail')
    expect(weekendButton).toHaveAttribute('aria-expanded', 'false')
    expect(mabeetButton).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('region', { name: 'The Holy Quran Program' }),
    ).not.toBeInTheDocument()

    await user.click(quranButton)

    const quranDetails = screen.getByRole('region', {
      name: 'The Holy Quran Program',
    })
    expect(quranButton).toHaveAttribute('aria-expanded', 'true')
    expect(quranDetails).toHaveAttribute('aria-hidden', 'false')
    expect(quranDetails).not.toHaveAttribute('inert')
    expect(quranDetails).toHaveTextContent('Why Join Us?')
    expect(quranDetails).toHaveTextContent('Parent Involvement')
    expect(quranDetails).toHaveTextContent('Review & Retention')
    expect(quranDetails).toHaveTextContent(
      'Tailored learning tracks for children, youth, and adults.',
    )

    await user.click(weekendButton)

    const weekendDetails = screen.getByRole('region', {
      name: 'The Weekend Youth Program',
    })
    expect(quranButton).toHaveAttribute('aria-expanded', 'false')
    expect(weekendButton).toHaveAttribute('aria-expanded', 'true')
    expect(quranDetails).toHaveAttribute('aria-hidden', 'true')
    expect(quranDetails).toHaveAttribute('inert')
    expect(weekendDetails).toHaveTextContent('Positive Companionship')
    expect(weekendDetails).toHaveTextContent('Trivia & Rewards')
    expect(weekendDetails).toHaveTextContent(
      'Kids & Youth (Age-appropriate programming for each group).',
    )

    await user.click(mabeetButton)

    const mabeetDetails = screen.getByRole('region', {
      name: 'Youth Overnight Retreat (Mabeet Program)',
    })
    expect(weekendButton).toHaveAttribute('aria-expanded', 'false')
    expect(mabeetButton).toHaveAttribute('aria-expanded', 'true')
    expect(mabeetDetails).toHaveTextContent('Righteous Brotherhood')
    expect(mabeetDetails).toHaveTextContent('Blessed Conclusion')
    expect(mabeetDetails).toHaveTextContent(
      'Supervised by experienced mentors throughout the entire night',
    )

    await user.click(mabeetButton)
    expect(mabeetButton).toHaveAttribute('aria-expanded', 'false')
    expect(mabeetDetails).toHaveAttribute('aria-hidden', 'true')
    expect(mabeetDetails).toHaveAttribute('inert')
  })

  it('renders the localized substantive copy in Spanish and Arabic', async () => {
    const user = userEvent.setup()
    renderProgramsPage()

    await act(() => i18n.changeLanguage('es'))
    const spanishWeekendButton = await screen.findByRole('button', {
      name: /Programa Juvenil de Fin de Semana/,
    })
    await user.click(spanishWeekendButton)

    const spanishWeekendDetails = screen.getByRole('region', {
      name: 'Programa Juvenil de Fin de Semana',
    })
    expect(spanishWeekendDetails).toHaveTextContent(
      'Actividades del fin de semana',
    )
    expect(
      within(spanishWeekendDetails).getByText('Dirigido a:').closest('p'),
    ).toHaveTextContent('Niños y jóvenes')

    await act(() => i18n.changeLanguage('ar'))

    const arabicWeekendDetails = await screen.findByRole('region', {
      name: 'برنامج الويكند',
    })
    expect(arabicWeekendDetails).toHaveTextContent(
      'جدول أنشطة الويكند (السبت والأحد)',
    )
    expect(
      within(arabicWeekendDetails).getByText('الفئة المستهدفة:').closest('p'),
    ).toHaveTextContent('الأطفال والشباب')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
  })
})
