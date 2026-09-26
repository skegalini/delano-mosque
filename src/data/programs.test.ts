import { programs } from './programs'

describe('program source content', () => {
  it('keeps every source-document section and item in all three languages', () => {
    expect(
      programs.map((program) => ({
        id: program.id,
        sectionItemCounts: program.sections.map(
          (section) => section.items.length,
        ),
      })),
    ).toEqual([
      { id: 'quran', sectionItemCounts: [5, 5] },
      { id: 'weekend-youth', sectionItemCounts: [5, 4] },
      { id: 'mabeet', sectionItemCounts: [4, 5] },
    ])

    for (const program of programs) {
      for (const language of ['en', 'es', 'ar'] as const) {
        expect(program.name[language]).toBeTruthy()
        expect(program.tagline[language]).toBeTruthy()
        expect(program.introduction[language]).toBeTruthy()
        expect(program.mosqueLocation[language]).toBeTruthy()
        expect(program.summaryMeta[language]).toBeTruthy()
        expect(program.audience.label[language]).toBeTruthy()
        expect(program.audience.body[language]).toBeTruthy()

        for (const section of program.sections) {
          expect(section.heading[language]).toBeTruthy()

          for (const item of section.items) {
            expect(item.title[language]).toBeTruthy()
            expect(item.body[language]).toBeTruthy()
          }
        }
      }
    }
  })

  it('retains representative source meaning and authoritative Arabic wording', () => {
    expect(programs.map((program) => program.mosqueLocation.en)).toEqual([
      'Abu Bakr Al-Siddiq Mosque – Delano',
      'Abu Bakr Al-Siddiq Mosque – Delano',
      'Abu Bakr Al-Siddiq Mosque – Delano',
    ])
    expect(programs[0].tagline.en).toBe(
      '“A Lifelong Journey of Recitation, Memorization, and Reflection”',
    )
    expect(programs[0].sections[1].items[4].body.ar).toBe(
      'للحفاظ والمحافظة على المكتسبات.',
    )
    expect(programs[1].sections[1].heading.en).toBe(
      'Weekend Schedule (Saturday & Sunday)',
    )
    expect(programs[1].sections[0].items[1].body.ar).toBe(
      'ورش عمل في الحاسب، الخط العربي، الإلقاء، والمهارات الحياتية.',
    )
    expect(programs[2].sections[1].items[4].body.en).toBe(
      'Fajr prayer, morning Adhkar, community breakfast, and dismissal.',
    )
    expect(programs[2].audience.body.ar).toBe(
      'الناشئة والشباب (تحت إشراف تربوي متكامل ومباشر طوال فترة المبيت).',
    )
  })
})
