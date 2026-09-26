import type { LocalizedContent } from '../domain/localization'

export type ProgramIcon = 'quran' | 'community' | 'moon'

export type ProgramContentItem = {
  title: LocalizedContent
  body: LocalizedContent
}

export type ProgramSection = {
  heading: LocalizedContent
  ordered: boolean
  items: readonly ProgramContentItem[]
}

export type MosqueProgram = {
  id: 'quran' | 'weekend-youth' | 'mabeet'
  sourceDocument: string
  icon: ProgramIcon
  name: LocalizedContent
  tagline: LocalizedContent
  introduction: LocalizedContent
  mosqueLocation: LocalizedContent
  summaryMeta: LocalizedContent
  sections: readonly ProgramSection[]
  audience: {
    label: LocalizedContent
    body: LocalizedContent
  }
}

/**
 * Substantive program copy belongs here rather than in page JSX or the
 * interface-label catalog. English retains the complete source meaning after
 * editorial refinement, Arabic reproduces the supplied source, and Spanish is
 * a natural, faithful translation of the same material.
 */
const text = (en: string, es: string, ar: string): LocalizedContent => ({
  en,
  es,
  ar,
})

export const programs = [
  {
    id: 'quran',
    sourceDocument: 'Quran_Program_Website_Copy.docx',
    icon: 'quran',
    name: text(
      'The Holy Quran Program',
      'Programa del Sagrado Corán',
      'برنامج القرآن الكريم',
    ),
    tagline: text(
      '“A Lifelong Journey of Recitation, Memorization, and Reflection”',
      '«Un camino de recitación, memorización y reflexión para toda la vida»',
      '«رحلة مع كتاب الله… تلاوةً، وحفظًا، وتدبرًا»',
    ),
    introduction: text(
      'We help children, youth, and adults build a strong, meaningful connection with the Holy Quran in an inspiring community environment.',
      'Ayudamos a niños, jóvenes y adultos a desarrollar una relación sólida y significativa con el Sagrado Corán en un entorno comunitario inspirador.',
      'نساعد أطفالكم والشباب والكبار على بناء علاقة راسخة ومستدامة مع القرآن الكريم من خلال بيئة إيمانية ومناهج تعليمية مخصصة.',
    ),
    mosqueLocation: text(
      'Abu Bakr Al-Siddiq Mosque – Delano',
      'Mezquita Abu Bakr Al-Siddiq – Delano',
      'مسجد أبو بكر الصديق – ديلانو',
    ),
    summaryMeta: text(
      'Children, youth, and adults',
      'Niños, jóvenes y adultos',
      'للأطفال والشباب والكبار',
    ),
    sections: [
      {
        heading: text(
          'Why Join Us?',
          '¿Por qué participar?',
          'مميزات البرنامج',
        ),
        ordered: false,
        items: [
          {
            title: text(
              'Strong Foundations',
              'Fundamentos sólidos',
              'تأسيس متين',
            ),
            body: text(
              'Build a strong foundation in correct Arabic pronunciation and articulation from day one.',
              'Aprende desde el primer día la pronunciación y la articulación correctas del árabe.',
              'تعليم القراءة الصحيحة ومخارج الحروف من البداية.',
            ),
          },
          {
            title: text('Practical Tajweed', 'Taywid práctico', 'تجويد ميسر'),
            body: text(
              'Step-by-step instruction in Tajweed rules, with guidance toward beautiful recitation.',
              'Aprende paso a paso las reglas del taywid y a recitar con belleza.',
              'أحكام التجويد وتطبيقاتها بصورة تدريجية وسلسة.',
            ),
          },
          {
            title: text(
              'Personalized Plans',
              'Planes personalizados',
              'خطط مخصصة',
            ),
            body: text(
              "Personalized memorization and review goals matched to each student's pace.",
              'Metas personalizadas de memorización y repaso, ajustadas al ritmo de cada estudiante.',
              'مسارات حفظ ومراجعة تناسب قدرات وعمر كل طالب.',
            ),
          },
          {
            title: text(
              'Character & Meaning',
              'Carácter y significado',
              'تربية وأثر',
            ),
            body: text(
              'Connect Quranic verses to deeper understanding and everyday practice.',
              'Comprende los versículos del Corán y llévalos a la práctica cotidiana.',
              'ربط الحفظ بفهم المعاني والتخلق بأخلاق القرآن.',
            ),
          },
          {
            title: text(
              'Parent Involvement',
              'Participación de los padres',
              'شراكة أسرية',
            ),
            body: text(
              'Regular progress tracking and open communication with families.',
              'Seguimiento continuo del progreso y comunicación abierta con las familias.',
              'متابعة مستمرة وتواصل فعال مع الوالدين لضمان النجاح.',
            ),
          },
        ],
      },
      {
        heading: text(
          'Program Levels',
          'Niveles del programa',
          'مستويات الدراسة',
        ),
        ordered: true,
        items: [
          {
            title: text(
              'Foundational Reading',
              'Lectura inicial',
              'تأسيس القراءة',
            ),
            body: text(
              'Learn Arabic letters and essential reading skills.',
              'Aprende las letras árabes y desarrolla las habilidades esenciales de lectura.',
              'تعلم الحروف والقراءة الأساسية.',
            ),
          },
          {
            title: text(
              'Quranic Reading',
              'Lectura coránica',
              'القراءة القرآنية',
            ),
            body: text(
              'Build toward fluent and accurate Quran recitation.',
              'Avanza hacia una recitación fluida y correcta del Corán.',
              'الانتقال لقراءة السور بتلاوة صحيحة.',
            ),
          },
          {
            title: text(
              'Tajweed & Mastery',
              'Taywid y perfeccionamiento',
              'التجويد والإتقان',
            ),
            body: text(
              'Improve vocal delivery and apply Tajweed rules with confidence and ease.',
              'Perfecciona la voz y aplica las reglas del taywid con soltura y confianza.',
              'تحسين الصوت وتطبيق أحكام التجويد.',
            ),
          },
          {
            title: text(
              'Step-by-Step Hifz',
              'Hifz paso a paso',
              'الحفظ التدريجي',
            ),
            body: text(
              'Memorize new verses with a structured, manageable plan.',
              'Memoriza nuevos versículos con un plan estructurado y fácil de seguir.',
              'حفظ جديد بخطة مرنة تضمن الإتقان.',
            ),
          },
          {
            title: text(
              'Review & Retention',
              'Repaso y consolidación',
              'المراجعة والتثبيت',
            ),
            body: text(
              'Strengthen previously memorized passages and preserve their quality.',
              'Afianza lo memorizado y conserva una recitación de calidad.',
              'للحفاظ والمحافظة على المكتسبات.',
            ),
          },
        ],
      },
    ],
    audience: {
      label: text('Open to All', 'Abierto a todos', 'البرنامج متاح للجميع'),
      body: text(
        'Tailored learning tracks for children, youth, and adults.',
        'Programas adaptados para niños, jóvenes y adultos.',
        'أطفال، شباب، ومسارات خاصة للكبار.',
      ),
    },
  },
  {
    id: 'weekend-youth',
    sourceDocument: 'Weekend_Program_Sat_Sun.docx',
    icon: 'community',
    name: text(
      'The Weekend Youth Program',
      'Programa Juvenil de Fin de Semana',
      'برنامج الويكند',
    ),
    tagline: text(
      '“An Inspiring Weekend of Fun, Growth, and Connection”',
      '«Un fin de semana inspirador de diversión, crecimiento y convivencia»',
      '«عطلة أسبوع ملهمة.. تجمع بين الترفيه والتربية والإبداع»',
    ),
    introduction: text(
      'This dynamic weekend program helps children and youth use their free time meaningfully by bringing together personal growth, sports, creativity, and Islamic values in a safe and welcoming environment.',
      'Una experiencia dinámica de fin de semana para que niños y jóvenes aprovechen su tiempo libre de forma positiva, combinando crecimiento personal, deportes, creatividad y valores islámicos en un ambiente seguro y acogedor.',
      'نقدم لأبنائنا في نهاية كل أسبوع بيئة آمنة وممتعة تهدف إلى استثمار أوقات فراغهم في أنشطة تجمع بين الفائدة العلمية، وبناء المهارات، والأنشطة الترفيهية والتفاعلية.',
    ),
    mosqueLocation: text(
      'Abu Bakr Al-Siddiq Mosque – Delano',
      'Mezquita Abu Bakr Al-Siddiq – Delano',
      'مسجد أبو بكر الصديق – ديلانو',
    ),
    summaryMeta: text(
      'Saturday & Sunday · Kids & Youth',
      'Sábado y domingo · Niños y jóvenes',
      'السبت والأحد · الأطفال والشباب',
    ),
    sections: [
      {
        heading: text(
          'Program Highlights',
          'Lo que ofrece el programa',
          'مميزات وأهداف البرنامج',
        ),
        ordered: false,
        items: [
          {
            title: text(
              'Productive Weekends',
              'Fines de semana productivos',
              'استثمار أوقات الفراغ',
            ),
            body: text(
              'Young people take part in meaningful, constructive activities every weekend.',
              'Cada fin de semana, los jóvenes participan en actividades valiosas y constructivas.',
              'توجيه طاقات الأبناء في نهاية الأسبوع نحو أنشطة بناءة ومفيدة.',
            ),
          },
          {
            title: text(
              'Skill Building',
              'Desarrollo de habilidades',
              'تنمية المهارات',
            ),
            body: text(
              'Interactive workshops in leadership, public speaking, arts, and technology.',
              'Talleres interactivos de liderazgo, expresión oral, arte y tecnología.',
              'ورش عمل في الحاسب، الخط العربي، الإلقاء، والمهارات الحياتية.',
            ),
          },
          {
            title: text(
              'Sports & Fitness',
              'Deportes y actividad física',
              'الرياضة والترفيه',
            ),
            body: text(
              'Team sports, athletic challenges, and group recreational games.',
              'Deportes en equipo, desafíos físicos y juegos recreativos en grupo.',
              'مسابقات حركية، دوريات رياضية، وألعاب ذكاء جماعية.',
            ),
          },
          {
            title: text(
              'Faith & Character',
              'Fe y buen carácter',
              'القيم والأخلاق',
            ),
            body: text(
              'Brief, meaningful reminders about Islamic manners and good character.',
              'Recordatorios breves y significativos sobre los modales islámicos y el buen carácter.',
              'قصص تربوية قصيرة، وتطبيق عملي للآداب الإسلامية اليومية.',
            ),
          },
          {
            title: text(
              'Positive Companionship',
              'Buenas amistades',
              'تعزيز الرفقة الصالحة',
            ),
            body: text(
              'Caring mentors help young people build lifelong friendships.',
              'Los jóvenes crean amistades duraderas con el acompañamiento de mentores atentos y comprometidos.',
              'بناء صداقات إيجابية متينة تحت إشراف نخبة من المربين.',
            ),
          },
        ],
      },
      {
        heading: text(
          'Weekend Schedule (Saturday & Sunday)',
          'Actividades del fin de semana (sábado y domingo)',
          'جدول أنشطة الويكند (السبت والأحد)',
        ),
        ordered: true,
        items: [
          {
            title: text(
              'Spiritual Warm-up',
              'Preparación espiritual',
              'الفقرة الإيمانية والتوجيهية',
            ),
            body: text(
              'A short motivational talk on character and putting good manners into daily practice.',
              'Una charla breve y motivadora sobre el buen carácter y cómo practicar buenos modales cada día.',
              'كلمة قصيرة وتطبيق لآداب وأخلاق المسلم.',
            ),
          },
          {
            title: text(
              'Interactive Workshops',
              'Talleres interactivos',
              'الورش المهارية',
            ),
            body: text(
              'Creative sessions focused on life skills and innovation.',
              'Sesiones creativas sobre habilidades para la vida y la innovación.',
              'أنشطة تفاعلية لتطوير التفكير والابتكار.',
            ),
          },
          {
            title: text('Sports League', 'Liga deportiva', 'الدوري الرياضي'),
            body: text(
              'Friendly tournaments, including soccer, fitness challenges, and team sports.',
              'Torneos amistosos de fútbol, retos físicos y deportes en equipo.',
              'ألعاب تنافسية ممتعة (كرة قدم، ألعاب قوى، تحديات حركية).',
            ),
          },
          {
            title: text(
              'Trivia & Rewards',
              'Concursos y premios',
              'المسابقات الثقافية',
            ),
            body: text(
              'Engaging quizzes and competitions, with prizes for participants.',
              'Juegos de preguntas, competencias y premios para los participantes.',
              'أسئلة ذكاء، جوائز، وتكريم للمتميزين.',
            ),
          },
        ],
      },
    ],
    audience: {
      label: text('Target Audience', 'Dirigido a', 'الفئة المستهدفة'),
      body: text(
        'Kids & Youth (Age-appropriate programming for each group).',
        'Niños y jóvenes (programas adecuados para las distintas edades).',
        'الأطفال والشباب (برامج مخصصة لكل فئة عمرية).',
      ),
    },
  },
  {
    id: 'mabeet',
    sourceDocument: 'Youth_Overnight_Retreat_Mabeet.docx',
    icon: 'moon',
    name: text(
      'Youth Overnight Retreat (Mabeet Program)',
      'Retiro Nocturno para Jóvenes (Programa Mabeet)',
      'برنامج المبيت التربوي',
    ),
    tagline: text(
      '“A Faith-Filled Night of Worship, Brotherhood, and Leadership”',
      '«Una noche de fe, adoración, hermandad y liderazgo»',
      '«ليلة إيمانية.. تجمع بين العبادة، والأخوة، وبناء الشخصية»',
    ),
    introduction: text(
      'This unique spiritual retreat gives youth an inspiring night at the mosque, where they build lifelong habits of faith, develop noble character, and form strong bonds of brotherhood in a safe, engaging environment.',
      'Este retiro espiritual único ofrece a nuestros jóvenes una noche inspiradora en la mezquita, donde cultivan hábitos de fe para toda la vida, desarrollan un carácter noble y forman lazos sólidos de hermandad en un ambiente seguro y motivador.',
      'رحلة تربوية فريدة تمنح شبابنا فرصة قضاء ليلة ملهمة في رحاب المسجد؛ لبناء عادات إيمانية راسخة، وتعميق قيم الصحبة الصالحة في بيئة آمنة ومحفزة.',
    ),
    mosqueLocation: text(
      'Abu Bakr Al-Siddiq Mosque – Delano',
      'Mezquita Abu Bakr Al-Siddiq – Delano',
      'مسجد أبو بكر الصديق – ديلانو',
    ),
    summaryMeta: text(
      'Youth & Teens · Fully supervised through the night',
      'Jóvenes y adolescentes · Con supervisión durante toda la noche',
      'الناشئة والشباب · إشراف مباشر طوال فترة المبيت',
    ),
    sections: [
      {
        heading: text(
          'Program Highlights',
          'Lo que ofrece el programa',
          'أهداف ومميزات البرنامج',
        ),
        ordered: false,
        items: [
          {
            title: text(
              'Spiritual Growth',
              'Crecimiento espiritual',
              'إحياء السنّة والعبادة',
            ),
            body: text(
              'Youth develop a practice of night prayer (Tahajjud), congregational Fajr, and daily Adhkar.',
              'Los jóvenes cultivan el hábito de la oración nocturna (tahayyud), el Fajr en congregación y los adhkar diarios.',
              'الاعتياد على قيام الليل، وصلاة الفجر في جماعة، والمحافظة على أذكار الصباح والمساء.',
            ),
          },
          {
            title: text(
              'Righteous Brotherhood',
              'Hermandad en la fe',
              'التربية بالصحبة الصالحة',
            ),
            body: text(
              "The program strengthens Islamic bonds and deepens young people's connection to the mosque.",
              'El programa fortalece los lazos islámicos y el vínculo de los jóvenes con la mezquita.',
              'ترسيخ الأخوة الإيمانية وتوطيد ارتباط الشباب بالمسجد كبيئة جامعة ومحتضنة.',
            ),
          },
          {
            title: text(
              'Character & Leadership Workshops',
              'Talleres de carácter y liderazgo',
              'ورش وتطوير مهارات',
            ),
            body: text(
              'Interactive discussions address the challenges youth face and support character building.',
              'Conversaciones interactivas sobre los desafíos que enfrentan los jóvenes y la formación del carácter.',
              'جلسات حوارية تفاعلية لتنمية المهارات القيادية والأخلاق الإسلامية الفاضلة.',
            ),
          },
          {
            title: text(
              'Engaging Team Activities',
              'Actividades de equipo',
              'أنشطة هادفة وتحديات',
            ),
            body: text(
              'Fun team-building games, Islamic trivia, and motivating challenges.',
              'Juegos divertidos para fortalecer el trabajo en equipo, preguntas de cultura islámica y retos motivadores.',
              'مسابقات ثقافية، ألعاب جماعية، وأنشطة تفاعلية تملأ الوقت بالمتعة والفائدة.',
            ),
          },
        ],
      },
      {
        heading: text(
          'Retreat Itinerary',
          'Itinerario del retiro',
          'محطات من رحلة المبيت',
        ),
        ordered: true,
        items: [
          {
            title: text(
              'Welcome & Orientation',
              'Bienvenida y orientación',
              'الاستقبال والانطلاق',
            ),
            body: text(
              'Isha prayer, icebreakers, and team formation.',
              'Oración del Isha, dinámicas para conocerse y formación de equipos.',
              'صلاة العشاء، فقرة تعارف، وتوزيع المشاركين إلى مجموعات عمل.',
            ),
          },
          {
            title: text(
              'Inspiring Youth Talk',
              'Charla inspiradora para jóvenes',
              'الجلسة التربوية',
            ),
            body: text(
              'An open, interactive conversation about faith, goals, and daily life.',
              'Conversación abierta e interactiva sobre la fe, las metas y la vida cotidiana.',
              'حوار إيماني مفتوح يناقش تطلعات الشباب وتحدياتهم بأسلوب شائق.',
            ),
          },
          {
            title: text(
              'Night Activities & Snacks',
              'Actividades nocturnas y refrigerios',
              'الأنشطة والترفيه',
            ),
            body: text(
              'Trivia challenges, group bonding games, and refreshments.',
              'Retos de preguntas, juegos para fortalecer la convivencia del grupo y refrigerios.',
              'مسابقات ذكاء، وجبة خفيفة، وألعاب جماعية لتعزيز روح الفريق.',
            ),
          },
          {
            title: text(
              'Tahajjud & Reflection',
              'Tahayyud y reflexión',
              'السحر والتهجد',
            ),
            body: text(
              'Peaceful night prayer and personal supplication before dawn.',
              'Oración nocturna en un ambiente de serenidad y súplica personal antes del amanecer.',
              'لحظات خاشعة لقيام الليل والدعاء والمناجاة في هدوء الليل.',
            ),
          },
          {
            title: text('Blessed Conclusion', 'Cierre bendecido', 'ختام مبارك'),
            body: text(
              'Fajr prayer, morning Adhkar, community breakfast, and dismissal.',
              'Oración del Fajr, adhkar de la mañana, desayuno comunitario y despedida.',
              'صلاة الفجر، أذكار الصباح، وجبة إفطار جماعية، والانصراف بروح ملهمة.',
            ),
          },
        ],
      },
    ],
    audience: {
      label: text('Target Audience', 'Dirigido a', 'الفئة المستهدفة'),
      body: text(
        'Youth & Teens (Supervised by experienced mentors throughout the entire night).',
        'Jóvenes y adolescentes (con supervisión continua de mentores experimentados durante toda la noche).',
        'الناشئة والشباب (تحت إشراف تربوي متكامل ومباشر طوال فترة المبيت).',
      ),
    },
  },
] as const satisfies readonly MosqueProgram[]
