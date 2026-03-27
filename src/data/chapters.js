/* ─────────────────────────────────────────────────────────────────
   18 Chapters — mapped to Bhagavad Gita's 18 Adhyayas
   Real content. Real numbers. Every word true.
   ───────────────────────────────────────────────────────────────── */

export const CHAPTERS = [
  {
    id: 1, num: '01',
    sanskrit: 'अर्जुनविषादयोग', name: 'Arjuna Vishada Yoga', theme: 'The Warrior Arrives',
    bgImage: '/images/ch-warrior-back.jpg',
    fallback: 'radial-gradient(ellipse at 50% 35%, #0a1828 0%, #030810 100%)',
    overlay: 'linear-gradient(to top, rgba(2,6,18,0.92) 0%, rgba(2,6,18,0.35) 55%, rgba(2,6,18,0.7) 100%)',
    accent: '#d4af37', type: 'hero', editorialWord: 'WARRIOR',
    artImage: '/images/ch01-art.webp', artScale: 55, artPos: 'left',
    shloka: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
    shlokaEn: 'Whenever there is a decline in righteousness — I arise.',
    shlokaRef: 'Bhagavad Gita 4.7',
  },
  {
    id: 2, num: '02',
    sanskrit: 'सांख्ययोग', name: 'Sankhya Yoga', theme: 'The Weapons',
    bgImage: '/images/ch-golden-arms.jpg',
    fallback: 'radial-gradient(ellipse at 50% 25%, #3a2000 0%, #180d00 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(10,5,0,0.3) 50%, rgba(0,0,0,0.85) 100%)',
    accent: '#ff9040', type: 'weapons', editorialWord: 'WEAPONS',
    artImage: '/images/ch02-art.webp', artScale: 46, artPos: 'center',
    shloka: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः',
    shlokaEn: 'The soul is never cloven by any weapon, nor burnt by fire.',
    shlokaRef: 'Bhagavad Gita 2.23',
  },
  {
    id: 3, num: '03',
    sanskrit: 'कर्मयोग', name: 'Karma Yoga', theme: 'The Journey',
    bgImage: '/images/ch-chariot-point.jpg',
    fallback: 'radial-gradient(ellipse at 40% 40%, #1a1200 0%, #050300 100%)',
    overlay: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(10,8,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
    accent: '#ff8c00', type: 'timeline', editorialWord: 'JOURNEY',
    artImage: '/images/ch03-art.webp', artScale: 54, artPos: 'right',
    shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    shlokaEn: 'You have a right to perform your duties, but never to the fruits thereof.',
    shlokaRef: 'Bhagavad Gita 2.47',
  },
  {
    id: 4, num: '04',
    sanskrit: 'ज्ञानयोग', name: 'Jnana Yoga', theme: 'The Education',
    bgImage: '/images/ch-cosmos.jpg',
    fallback: 'radial-gradient(ellipse at 50% 50%, #0a0520 0%, #020210 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(5,2,20,0.2) 50%, rgba(0,0,0,0.8) 100%)',
    accent: '#1a9b8a', type: 'education', editorialWord: 'KNOWLEDGE',
    artImage: '/images/ch04-art.webp', artScale: 50, artPos: 'right',
    shloka: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते',
    shlokaEn: 'In this world there is nothing so sublime and pure as transcendental knowledge.',
    shlokaRef: 'Bhagavad Gita 4.38',
  },
  {
    id: 5, num: '05',
    sanskrit: 'कर्मसंन्यासयोग', name: 'Karma Sanyasa Yoga', theme: 'The Mentorship',
    bgImage: '/images/ch-moonlit.jpg',
    fallback: 'radial-gradient(ellipse at 50% 30%, #0d1a0d 0%, #030808 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,5,5,0.3) 55%, rgba(0,0,0,0.85) 100%)',
    accent: '#22c5ae', type: 'mentorship', editorialWord: 'MENTOR',
    artImage: '/images/ch05-art.webp', artScale: 55, artPos: 'left',
    shloka: 'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः',
    shlokaEn: 'One who performs duty surrendering results to the Supreme is untouched — as the lotus by water.',
    shlokaRef: 'Bhagavad Gita 5.10',
  },
  {
    id: 6, num: '06',
    sanskrit: 'ध्यानयोग', name: 'Dhyana Yoga', theme: 'Discipline · God First',
    bgImage: '/images/ch-wheel.jpg',
    fallback: 'radial-gradient(ellipse at 60% 40%, #2a1000 0%, #0a0500 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(15,5,0,0.25) 55%, rgba(0,0,0,0.7) 100%)',
    accent: '#d4af37', type: 'discipline', editorialWord: 'DISCIPLINE',
    artImage: '/images/ch06-art.webp', artScale: 46, artPos: 'right',
    shloka: 'यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता',
    shlokaEn: 'As a lamp in a windless place does not waver — so steadies the meditating mind.',
    shlokaRef: 'Bhagavad Gita 6.19',
  },
  {
    id: 7, num: '07',
    sanskrit: 'ज्ञानविज्ञानयोग', name: 'Jnana Vijnana Yoga', theme: 'GeniOS',
    bgImage: '/images/ch-chariot-race.jpg',
    fallback: 'radial-gradient(ellipse at 50% 30%, #1a0e00 0%, #070300 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(10,6,0,0.25) 50%, rgba(0,0,0,0.85) 100%)',
    accent: '#f0d060', type: 'genios', editorialWord: 'GENIUS',
    artImage: '/images/ch07-art.webp', artScale: 44, artPos: 'center',
    shloka: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः',
    shlokaEn: 'I am the Self, O Arjuna, seated in the hearts of all living beings.',
    shlokaRef: 'Bhagavad Gita 10.20',
  },
  {
    id: 8, num: '08',
    sanskrit: 'अक्षरब्रह्मयोग', name: 'Akshara Brahma Yoga', theme: 'Core Values',
    bgImage: '/images/ch-gita-classic.jpg',
    fallback: 'radial-gradient(ellipse at 50% 40%, #1a0a00 0%, #060300 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(10,6,0,0.2) 60%, rgba(0,0,0,0.65) 100%)',
    accent: '#ff9040', type: 'corevalues', editorialWord: 'VALUES',
    artImage: '/images/ch08-art.webp', artScale: 56, artPos: 'right',
    shloka: 'मामनुस्मर युध्य च',
    shlokaEn: 'Remember Me at all times, and fight.',
    shlokaRef: 'Bhagavad Gita 8.7',
  },
  {
    id: 9, num: '09',
    sanskrit: 'राजविद्यायोग', name: 'Raja Vidya Yoga', theme: 'The Projects',
    bgImage: '/images/ch-chakra.jpg',
    fallback: 'radial-gradient(ellipse at 60% 40%, #250a00 0%, #0a0200 100%)',
    overlay: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(20,5,0,0.2) 55%, rgba(0,0,0,0.85) 100%)',
    accent: '#ffa940', type: 'allprojects', editorialWord: 'BUILDER',
    artImage: '/images/ch09-art.webp', artScale: 52, artPos: 'right',
    shloka: 'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्',
    shlokaEn: 'For those who worship Me with devotion — I carry what they lack and preserve what they have.',
    shlokaRef: 'Bhagavad Gita 9.22',
  },
  {
    id: 10, num: '10',
    sanskrit: 'विभूतियोग', name: 'Vibhuti Yoga', theme: 'The Achievements',
    bgImage: '/images/ch-aftermath.jpg',
    fallback: 'radial-gradient(ellipse at 50% 50%, #150a00 0%, #050300 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(5,3,0,0.3) 50%, rgba(0,0,0,0.88) 100%)',
    accent: '#d4af37', type: 'achievements', editorialWord: 'GLORY',
    artImage: '/images/ch10-art.webp', artScale: 54, artPos: 'right',
    shloka: 'यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा | तत्तदेवावगच्छ त्वं मम तेजोऽंशसम्भवम्',
    shlokaEn: 'Know that all opulent, beautiful, and glorious creations spring from but a spark of My splendor.',
    shlokaRef: 'Bhagavad Gita 10.41',
  },
  {
    id: 11, num: '11',
    sanskrit: 'विश्वरूपदर्शनयोग', name: 'Vishwarupa Yoga', theme: 'The Vision',
    bgImage: '/images/ch-vishwaroop-fire.jpg',
    fallback: 'radial-gradient(ellipse at 50% 30%, #2a1000 0%, #0a0200 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(20,5,0,0.2) 60%, rgba(0,0,0,0.6) 100%)',
    accent: '#d4af37', type: 'vision', editorialWord: 'VISION',
    artImage: '/images/ch11-art.webp', artScale: 65, artPos: 'center',
    shloka: 'दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता | यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः',
    shlokaEn: 'If a thousand suns rose simultaneously in the sky, they might resemble the effulgence of that Supreme Being.',
    shlokaRef: 'Bhagavad Gita 11.12',
  },
  {
    id: 12, num: '12',
    sanskrit: 'भक्तियोग', name: 'Bhakti Yoga', theme: 'What Motivates',
    bgImage: '/images/ch-devotion.jpg',
    fallback: 'radial-gradient(ellipse at 50% 20%, #150520 0%, #050208 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(10,2,15,0.2) 50%, rgba(0,0,0,0.9) 100%)',
    accent: '#c97090', type: 'passion', editorialWord: 'DEVOTION',
    artImage: '/images/ch12-art.webp', artScale: 50, artPos: 'left',
    shloka: 'मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते | ते मे युक्ततमा मताः',
    shlokaEn: 'Those who fix their minds on Me, always devoted, are considered by Me most perfect.',
    shlokaRef: 'Bhagavad Gita 12.2',
  },
  {
    id: 13, num: '13',
    sanskrit: 'क्षेत्रज्ञयोग', name: 'Kshetra Yoga', theme: 'The Body of Work',
    bgImage: '/images/ch-vishwaroop-manga.jpg',
    fallback: 'radial-gradient(ellipse at 50% 30%, #051525 0%, #020810 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(2,8,15,0.25) 50%, rgba(0,0,0,0.88) 100%)',
    accent: '#4a7fd4', type: 'bodyofwork', editorialWord: 'LEGACY',
    artImage: '/images/ch13-art.webp', artScale: 55, artPos: 'left',
    shloka: 'क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत',
    shlokaEn: 'Know Me as the Knower in all the fields of activity, O son of Bharata.',
    shlokaRef: 'Bhagavad Gita 13.3',
  },
  {
    id: 14, num: '14',
    sanskrit: 'गुणत्रयविभागयोग', name: 'Gunatraya Yoga', theme: 'The Personality',
    bgImage: '/images/ch-divine-storm.jpg',
    fallback: 'radial-gradient(ellipse at 50% 30%, #101010 0%, #040404 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.88) 100%)',
    accent: '#a0a0c0', type: 'personality', editorialWord: 'NATURE',
    artImage: '/images/ch14-art.webp', artScale: 56, artPos: 'center',
    shloka: 'मां च योऽव्यभिचारेण भक्तियोगेन सेवते | स गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते',
    shlokaEn: 'One who serves Me with unfailing devotion transcends the modes of nature and reaches Brahman.',
    shlokaRef: 'Bhagavad Gita 14.26',
  },
  {
    id: 15, num: '15',
    sanskrit: 'पुरुषोत्तमयोग', name: 'Purushottama Yoga', theme: 'The Leadership',
    bgImage: '/images/ch-warrior-back.jpg',
    fallback: 'radial-gradient(ellipse at 50% 40%, #0a0e1a 0%, #030508 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(5,8,20,0.3) 50%, rgba(0,0,0,0.9) 100%)',
    accent: '#d4af37', type: 'leadership', editorialWord: 'LEADER',
    artImage: '/images/ch15-art.webp', artScale: 46, artPos: 'right',
    shloka: 'अतोऽस्मि लोके वेदे च प्रथितः पुरुषोत्तमः',
    shlokaEn: 'I am celebrated both in the world and in the Vedas as that Supreme Person — Purushottama.',
    shlokaRef: 'Bhagavad Gita 15.18',
  },
  {
    id: 16, num: '16',
    sanskrit: 'दैवासुरसम्पद्विभागयोग', name: 'Daivasura Yoga', theme: 'The Principles',
    bgImage: '/images/ch-golden-arms.jpg',
    fallback: 'radial-gradient(ellipse at 50% 25%, #200e00 0%, #080400 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(10,5,0,0.3) 55%, rgba(0,0,0,0.9) 100%)',
    accent: '#ff8c00', type: 'principles', editorialWord: 'DHARMA',
    artImage: '/images/ch16-art.webp', artScale: 50, artPos: 'left',
    shloka: 'अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः',
    shlokaEn: 'Fearlessness, purity of heart, steadfastness in knowledge — these are divine qualities.',
    shlokaRef: 'Bhagavad Gita 16.1',
  },
  {
    id: 17, num: '17',
    sanskrit: 'श्रद्धात्रयविभागयोग', name: 'Shraddha Yoga', theme: 'Faith of Others',
    bgImage: '/images/ch-gita-classic.jpg',
    fallback: 'radial-gradient(ellipse at 50% 40%, #180a00 0%, #060300 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(10,5,0,0.25) 65%, rgba(0,0,0,0.7) 100%)',
    accent: '#f0d060', type: 'testimonials', editorialWord: 'FAITH',
    artImage: '/images/ch17-art.webp', artScale: 44, artPos: 'right',
    shloka: 'श्रद्धावाँल्लभते ज्ञानं',
    shlokaEn: 'One who has faith attains knowledge.',
    shlokaRef: 'Bhagavad Gita 4.39',
  },
  {
    id: 18, num: '18',
    sanskrit: 'मोक्षसंन्यासयोग', name: 'Moksha Sanyasa Yoga', theme: 'Liberation — Begin',
    bgImage: '/images/ch-chariot-point.jpg',
    fallback: 'radial-gradient(ellipse at 50% 35%, #0d0a00 0%, #030200 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(8,6,0,0.3) 60%, rgba(0,0,0,0.75) 100%)',
    accent: '#d4af37', type: 'contact', editorialWord: 'MOKSHA',
    artImage: '/images/ch18-art.webp', artScale: 50, artPos: 'center',
    shloka: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज | अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः',
    shlokaEn: 'Abandon all varieties of religion and surrender unto Me alone. I shall deliver you from all fears.',
    shlokaRef: 'Bhagavad Gita 18.66',
  },
]

/* ─── Chapter I — About / Origin ────────────────────────────────── */
export const ABOUT = {
  tagline: '"The Failed to GeniOS Entrepreneur."',
  bio: `From Varanasi, UP — no connections, no capital —
to IIM Bangalore, Harvard HPAIR, Stanford ASES, Shark Tank India.

6 years. 5 startups. 3 failures. 1 mission.

I do not come from privilege.
Only persistence.

Every rejection, every failed launch, every hard pivot —
shaped my belief that real innovation happens
when you build for those who are overlooked.

I am not chasing hype.
I am solving real problems for people who deserve better.`,
  quote: 'कर्म करो, फल की चिंता मत करो',
  quoteTranslation: 'Do your duty. Do not worry about the fruits.',
  stats: [
    { value: '6+', label: 'Years Building' },
    { value: '5', label: 'Startups Founded' },
    { value: '3', label: 'Failures, All Teachers' },
    { value: '1', label: 'Mission' },
  ],
}

/* ─── Chapter II — Weapons / Skills ─────────────────────────────── */
export const SKILLS_WEAPONS = [
  { name: 'Mentorship & Community', level: 95, detail: '10,000+ mentored. Top 1% on Topmate.' },
  { name: 'Entrepreneurship & Execution', level: 93, detail: 'Age 19: First startup. Age 20: ₹35L revenue. Zero funding.' },
  { name: 'Context Engineering / Agentic AI', level: 90, detail: 'Building GeniOS — Context Brain for AI Agents.' },
  { name: 'Product Strategy & GTM', level: 92, detail: 'Idea to GTM to pivot — done it 4 times across 4 domains.' },
  { name: 'Pitching & Communication', level: 98, detail: 'Shark Tank India — twice. 30+ keynotes across India.' },
  { name: 'AI Systems & LLMOps', level: 94, detail: 'LangGraph, Gemini, multi-agent orchestration.' },
]

/* ─── Chapter III — Timeline ─────────────────────────────────────── */
export const TIMELINE = [
  {
    year: '2018', age: 'AGE 19',
    title: 'SCHOLARSHIP STARTUP',
    desc: 'First idea. First failure. "Have confidence in yourself. Never give up." Varanasi → The spark ignites.',
    status: 'first',
  },
  {
    year: '2019', age: '',
    title: 'LOGISTICS STARTUP',
    desc: 'Hyper-local delivery model. Failed at prototype stage. "Execution matters more than the idea."',
    status: 'failed',
  },
  {
    year: '2020', age: 'TRANSFORMATION',
    title: 'CAREER BREAK · COVID',
    desc: '90 kg → 65 kg. Read hundreds of books. Tried 5 things. Failed at all. "Successfully failed — with learning."',
    status: 'pivot',
  },
  {
    year: '2021', age: 'AGE 20',
    title: 'HOMIANS — BORN',
    desc: 'Zero capital. Started from a PG room problem. Food was bad. So decided to fix it.',
    status: 'born',
  },
  {
    year: '2022', age: '',
    title: 'HOMIANS — ₹35 LAKHS',
    desc: '100+ jobs created. 50+ house moms earning ₹15,000/month. Shark Tank India S2 — Finalist. Horses Stable S5 — National TV.',
    status: 'victory',
  },
  {
    year: '2022–2025', age: '',
    title: 'THE MORONSS',
    desc: 'AI Mentor platform. 10,000+ students mentored. 100,000+ reached. Shark Tank India S4 — Finalist. IIM Bangalore WSP5 — Selected twice. Harvard HPAIR — Delegate (3 times).',
    status: 'victory',
  },
  {
    year: '2025', age: 'PRESENT',
    title: 'GENIOS',
    desc: 'Context Brain for AI Agents. Team of 3. Microsoft for Startups ✓  NVIDIA Inception ✓  Top 60 Startups Delhi NCR ✓  Stanford ASES Delegate ✓',
    status: 'now',
  },
]

/* ─── Chapter IV — Education ────────────────────────────────────── */
export const EDUCATION = {
  formal: [
    {
      name: "St. Joseph's School",
      location: 'Varanasi, UP',
      note: '"Principal Sir taught me discipline. That lesson outlasted every textbook."',
    },
    {
      name: 'B.Tech Computer Science — NIET Noida',
      location: 'Greater Noida',
      note: 'CGPA: 8.1 | Top 10% of batch. Got invited 3x as Keynote Speaker.',
    },
    {
      name: 'IIM Bangalore — Startup Program (WSP5)',
      location: 'Bengaluru',
      note: 'Selected TWICE. "Grades don\'t matter. Mission does."',
    },
  ],
  realSchool: [
    'YC Startup School',
    '100x.vc Gurukul — Cohort 04',
    'Google for Startups School India',
    'McKinsey Forward Learner',
    'Aspire Institute',
    'Wadhwani Foundation (3×)',
    'Harvard HPAIR (3×)',
    'Stanford ASES Delegate',
  ],
  motto: 'My real education was never in a classroom.',
}

/* ─── Chapter V — Mentorship ─────────────────────────────────────── */
export const MENTORSHIP = {
  stats: [
    { value: '10,000+', label: 'Students Mentored' },
    { value: '100,000+', label: 'Reached Through Communities' },
    { value: '50+', label: 'Sessions on Topmate' },
    { value: 'Top 1%', label: 'Mentor — Topmate Platform' },
    { value: '30+', label: 'Keynote Sessions Across India' },
  ],
  menteeDestinations: ['BlackRock', 'AMD', 'Cvent', 'PayPal', 'Google', 'EY'],
  communities: [
    { name: 'Analysing Patterns', members: '2,500+' },
    { name: 'Hustlers Fellowship', members: 'Youth Accelerator' },
    { name: 'Commudle AI Community', members: '1,000+' },
    { name: 'NIET Mentorship', members: '500+ BTech & MBA' },
  ],
  quote: '"Hamare Life Me Ek Phase Aisa Aata Hai When One Decision Completely Changes Your Life. Kya Pata — vo phase yhi wala hai."',
}

/* ─── Chapter VI — Discipline ────────────────────────────────────── */
export const DISCIPLINE = {
  transformation: '90 kg → 65 kg. Not with a gym. At home. Every day.',
  principles: [
    { time: '5 AM', label: 'God First. Then the work. Discipline with responsibility is the only path to success.' },
    { time: 'The Year 2020', label: 'Read hundreds of books not because anyone asked — but because I was preparing.' },
    { time: '3 Ventures Failed', label: 'Started them all the same year. Failed at all 3. Kept going.' },
    { time: 'The Foundation', label: 'When others celebrated, I was building. When investors rejected, I was rebuilding.' },
  ],
  quote: '"Discipline is not a habit. It is a prayer."',
}

/* ─── Chapter VII — GeniOS ───────────────────────────────────────── */
export const GENIOS = {
  tagline: 'Context Brain for AI Agents.',
  problem: 'AI Agents are powerful but blind. They lack organizational context — who reports to whom, what was decided last Tuesday, what the company actually cares about.',
  solution: 'GeniOS builds a living Context Graph that gives AI agents the brain they need to act safely without babysitting.',
  products: [
    { name: 'Mr. Elite', desc: 'Multi-Agent Orchestration Engine' },
    { name: 'Email Agent', desc: 'Summarize, draft, prioritize — LangGraph + Gemini' },
    { name: 'Calendar Agent', desc: 'Schedule, detect conflicts, auto-resolve' },
    { name: 'Smart ATS Builder', desc: '1,500+ users — IITs & NITs' },
    { name: 'Data 2 JSON Converter', desc: 'For RAG pipelines' },
    { name: 'AI Mentor Platform', desc: '100+ early users' },
  ],
  badges: [
    'Microsoft for Startups ✓',
    'NVIDIA Inception ✓',
    'IIITD Innovation & Incubation ✓',
    'Composio (YC) — Startup Partner ✓',
    'Top 60 Startups — Delhi NCR ✓',
    'Stanford ASES Delegate ✓',
  ],
  validatedBy: 'Senior AI Engineers at IBM, Adobe & Google.',
  vision: '"Building Something AI Agents Need, More Than Want." — Inspired by Y Combinator',
}

/* ─── Chapter VIII — Core Values ─────────────────────────────────── */
export const CORE_VALUES = [
  { icon: '◆', title: 'Hustle', desc: 'From a PG room in Noida to ₹35L revenue — without a single rupee of external capital. The 5 AM discipline was never for Instagram. It was survival that became identity.' },
  { icon: '◆', title: 'Respect', desc: 'I mentored on Topmate for free before I was Top 1%. Because the student who can\'t afford a session deserves the same answer as the one who can.' },
  { icon: '◆', title: 'Kindness', desc: '50 house moms were invisible. I built Homians so they could earn ₹15,000 a month with dignity. Kindness is just attention paid to the right people.' },
  { icon: '◆', title: 'Mindset', desc: '5 startups. 3 shut down. Each one became the syllabus for the next. Shark Tank rejected Homians — I came back with The Moronss. Rejected again — I built GeniOS. The scoreboard only counts if you stop playing.' },
  { icon: '◆', title: 'Transform', desc: '90 kg to 65 kg during COVID. Zero savings to ₹35L bootstrapped. Boy from Varanasi to Stanford delegate. Every transformation started with one decision made when no one was watching.' },
  { icon: '◆', title: 'Responsibility', desc: '10,000+ students mentored. 100+ jobs created. I am from Varanasi — I know exactly what it means to have no network, no mentor, no map. That\'s why I became all three for others.' },
]

/* ─── Chapter IX — All Projects ──────────────────────────────────── */
export const ALL_PROJECTS = [
  {
    num: '01',
    title: 'GeniOS',
    subtitle: 'Context Brain for AI Agents',
    quote: '"Building Something AI Agents Need More Than Want."',
    stats: 'Team of 3  ·  Microsoft  ·  NVIDIA  ·  IIITD',
    status: 'BUILDING',
    accent: '#f0d060',
    link: 'thegenios.com',
  },
  {
    num: '02',
    title: 'Homians',
    subtitle: 'Home Food Startup',
    quote: '"Started from a PG room. A bad meal became a business."',
    stats: '₹35L Revenue  ·  100+ Jobs  ·  50+ House Moms  ·  Zero Funding',
    status: 'COMPLETED',
    accent: '#ff9040',
    link: null,
  },
  {
    num: '03',
    title: 'The Moronss',
    subtitle: 'AI Mentor for Students',
    quote: '"Built for the youth no one was building for."',
    stats: '10,000+ Mentored  ·  100,000+ Reached  ·  Shark Tank S4 Finalist',
    status: 'LEGACY LIVES',
    accent: '#22c5ae',
    link: null,
  },
  {
    num: '04',
    title: 'Smart ATS Builder',
    subtitle: 'Fill-in-the-Blanks Resume',
    quote: '"Turned a multi-hour task into 5 minutes."',
    stats: '1,500+ Users  ·  IITs & NITs  ·  Acknowledged by IBM Research Engineer',
    status: 'LIVE',
    accent: '#22c5ae',
    link: null,
  },
  {
    num: '05',
    title: 'Mr. Elite',
    subtitle: 'Multi-Agentic Orchestrator',
    quote: '"Before agents can act — someone has to teach them how to think in order."',
    stats: 'LangGraph  ·  Gemini  ·  Supabase  ·  Inside GeniOS',
    status: 'BUILT',
    accent: '#d4af37',
    link: null,
  },
  {
    num: '06',
    title: 'AI Agents',
    subtitle: 'Email & Calendar Intelligence',
    quote: '"Two agents. One brain. Zero context lost."',
    stats: 'Email Agent  ·  Calendar Agent  ·  LangGraph  ·  Gemini',
    status: 'BUILT',
    accent: '#c97090',
    link: null,
  },
  {
    num: '07',
    title: 'Smart Home',
    subtitle: 'Family Knowledge Hub',
    quote: '"A home that remembers — so the people in it never have to repeat themselves."',
    stats: 'Family Context  ·  AI Memory  ·  Built for Bharat',
    status: 'CONCEPT',
    accent: '#7090d4',
    link: null,
  },
  {
    num: '08',
    title: 'Self Introspection',
    subtitle: '50 Questions. One Mirror.',
    quote: '"I built this for myself first. Then realized every founder needs it."',
    stats: '50 Life-Changing Questions  ·  Find Your True Worth  ·  Built in Silence',
    status: 'LIVE',
    accent: '#a070c0',
    link: null,
  },
]

/* ─── Chapter X — Achievements ───────────────────────────────────── */
export const ACHIEVEMENTS = {
  global: [
    { title: 'Stanford ASES Delegate', detail: 'Mar 2026' },
    { title: 'Harvard HPAIR Delegate', detail: '3 times — 2025, 2025 Tokyo, 2026  ·  Chosen from 10,000+ across 100+ countries' },
    { title: 'Aspire Institute', detail: '' },
  ],
  national: [
    { title: 'Shark Tank India — Finalist', detail: 'Season 2 & Season 4' },
    { title: 'Horses Stable Season 5', detail: 'National TV — Suniel Shetty' },
    { title: 'Top 60 Startups — Delhi NCR', detail: 'Delhi Government' },
    { title: 'Top Startup Exhibitor', detail: 'IIT Roorkee E-Summit 2025' },
    { title: 'Top 10 Startup', detail: 'The Catalyst Lab' },
    { title: 'Top Startup — UP', detail: 'Presented to UP Governor' },
    { title: 'Top Startup — IITD-SIDBI Exhibition', detail: '' },
  ],
  fellowships: [
    { title: 'NVIDIA Inception', detail: 'GeniOS' },
    { title: 'Microsoft for Startups Founders Hub', detail: '' },
    { title: 'McKinsey Forward Learner', detail: '' },
    { title: 'IIM Bangalore WSP5', detail: 'Selected Twice' },
    { title: 'Wadhwani Foundation', detail: 'Selected 3 Times — GeniOS, The Moronss, Homians' },
    { title: 'Dhandho Fellowship', detail: '' },
    { title: 'Composio YC — Startup Partner', detail: '' },
    { title: 'Savvy Entrepreneurial Fellowship', detail: '' },
    { title: '100x.vc Gurukul Cohort 04', detail: '' },
    { title: 'Google for Startups School India', detail: '' },
  ],
  early: [
    { title: 'College Startup Grant — Homians', detail: 'NIET 2021' },
    { title: 'Pitch Cafe 3.0 Winner', detail: '2nd Prize — IIIT Delhi' },
    { title: 'JEE Mains Cleared', detail: 'Without coaching' },
    { title: 'CGPA 8.1', detail: 'Top 10% of batch' },
  ],
}

/* ─── Chapter XI — Vision ─────────────────────────────────────────── */
export const VISION = {
  headline: 'This is not a startup. This is an era.',
  text: `Every person. Every company. Every robot. Every AGI.
All of them will have agents.
And every agent — no matter how powerful — is just a library without a brain that knows who it serves, what it values, and what it must never do.

That brain is Context. That company is GeniOS.

We are not chasing a trend. We are building the foundation layer of the intelligent world — the Organizational Context Graph — a market worth trillions, and we are running faster than anyone to own it.

From India. For the world. Before anyone else gets there.`,
  indiaAngle: 'India did not invent the internet. We built its software. India did not invent the cloud. We ran it. India will not invent AI. We will become its brain.',
  impact: 'AGI is coming. Robots are coming. Physical AI is coming. Every single one of them will need to know who they serve and why. We are building that layer — from a country the world underestimated — faster than anyone thought possible. The ripple has already started.',
  shloka: 'सर्वं खल्विदं ब्रह्म — Everything is connected. Every student I mentor — every product I build — every failure I survive — is one thread in one fabric.',
}

/* ─── Chapter XII — Why He Builds (Passion) ───────────────────────── */
export const PASSION_STORIES = [
  {
    icon: '1',
    headline: 'The Boy from Varanasi',
    story: 'I came from a place that doesn\'t produce NVIDIA-backed founders. Every time I want to stop — I remember that boy. He didn\'t have permission to dream this big. I am building it anyway. For him.',
  },
  {
    icon: '2',
    headline: 'The Rejected Pitch',
    story: 'Shark Tank said no. Twice. Each rejection didn\'t break me — it showed me exactly what I was missing and sent me back sharper. Failure is not the opposite of motivation. It is the source of it.',
  },
  {
    icon: '3',
    headline: 'The India That Is Watching',
    story: 'A trillion-dollar market is being written right now. If not us — someone else claims it. If not India — another country becomes the brain of the intelligent world. That is not a business reason. That is a responsibility I cannot put down.',
  },
]

/* ─── Chapter XIII — Body of Work ─────────────────────────────────── */
export const BODY_OF_WORK = {
  quote: '"The field is not what I have built. It is what I am standing in — right now, today, with everything I have."',
  genios: {
    role: 'Founder & CEO · 2025 — Present',
    desc: 'Building the Context Brain for AI Agents. Every day is architecture — product decisions, engineering calls, investor conversations, and late nights asking if the vision is sharp enough to survive contact with the real world.',
    skills: ['AI Engineering', 'Product Management', 'Agentic Systems', 'Organizational Context Design', 'Multi-Agent Orchestration', 'GTM Strategy', 'Team Leadership'],
    team: '3 talented individuals. And Claude Code — the silent co-builder that never sleeps.',
    backed: ['IIITD Innovation & Incubation', 'NSRCEL IIMB', 'NVIDIA Inception', 'Microsoft for Startups'],
    advisors: 'Senior Engineers from Google · IBM · Adobe',
    closing: '"I am not looking back at what I built. I am too busy building what has never existed before."',
  },
  companies: [
    { name: 'GeniOS', period: '2025–Present', desc: 'Context Brain for AI Agents', active: true },
    { name: 'The Moronss', period: '2022–2025', desc: 'AI Mentor Platform', active: false },
    { name: 'Homians', period: '2021–2022', desc: 'Home Food Tech', active: false },
    { name: 'Leasing Startup', period: '2020', desc: 'Peer to Peer Rental', active: false, failed: true },
    { name: 'Logistics Startup', period: '2019', desc: 'Hyper-local Delivery', active: false, failed: true },
    { name: 'Scholarship Startup', period: '2018', desc: 'EdTech Gamification', active: false, failed: true },
  ],
  roles: [
    { title: 'CEO', org: 'GeniOS' },
    { title: 'Founder', org: 'The Moronss' },
    { title: 'Founder', org: 'Homians' },
    { title: 'President', org: 'E-Cell NIET' },
    { title: 'Youth Mentor, Top 1%', org: 'Topmate' },
    { title: 'Keynote Speaker', org: '30+ sessions across India' },
    { title: 'Peer Advisor', org: 'IIITD & NIET TBI' },
  ],
  fields: ['Agentic AI', 'Orchestration', 'Context Graph', 'RAG', 'AI Infrastructure', 'LLM', 'Prompt Engineering'],
}

/* ─── Chapter XIV — Personality ──────────────────────────────────── */
export const PERSONALITY = {
  whatOthersSay: [
    '"Executes before most people finish planning."',
    '"Shows up for people who have nothing to offer him in return."',
    '"The only founder I know who reads the room and the roadmap simultaneously."',
    '"Turns rejection into research, every single time."',
  ],
  whatHeKnows: [
    { trait: 'Obsessive', desc: 'Because half-built things keep me up at night.' },
    { trait: 'Contrarian', desc: 'Because the obvious answer is usually someone else\'s answer.' },
    { trait: 'Ziddi', desc: 'Not stubborn for ego. Stubborn because the mission outlives the mood.' },
    { trait: 'Restless', desc: 'Varanasi gave me roots. The world gave me fire. Neither lets me sit still.' },
    { trait: 'God-First', desc: 'Every decision — before the pitch deck, before the investor call — starts here.' },
    { trait: 'Unfinished', desc: 'The most honest thing I know about myself. Still becoming. Always.' },
  ],
  paradox: {
    self: 'I call myself "The Failed Entrepreneur."',
    other: 'My closest collaborator calls me "The one who has already won at the bigger game of life."',
    resolution: 'Both are true.',
  },
  quote: '"Either learn or get left behind. I chose to learn — every time."',
}

/* ─── Chapter XV — Leadership ────────────────────────────────────── */
export const LEADERSHIP = {
  led: [
    { what: '20+ Speaker Sessions', detail: 'Took the stage — Keynotes, Workshops, Seminars. Not as a guest. As the voice people came to hear.' },
    { what: 'E-Cell President', detail: 'Built from scratch. Led 10+ large events, training program to MBA students.' },
    { what: 'Hustlers Fellowship', detail: '3,000+ AI Community Members.' },
    { what: 'The Founder Elites', detail: '50+ Top 1% — AI builders, startup founders, and executives. The Network.' },
  ],
  lesson: 'After 3 failed startups — each one I had to close myself. Look people in the eye. Tell them it\'s over. Mean it. Then wake up the next day and build again. That is leadership.',
  testimonial: {
    text: '"He\'s not just managing. He\'s constantly elevating his team — sharing articles, recommending resources, offering encouragement when momentum dips. He creates an environment where growth is inevitable."',
    name: 'Shasshank Rana',
    role: 'AI Researcher, Jivi.ai',
  },
  quote: '"Leadership is not the loudest voice in the room. It is the person still walking when everyone else has stopped."',
}

/* ─── Chapter XVI — Principles ───────────────────────────────────── */
export const PRINCIPLES = [
  {
    icon: '1',
    title: 'FAIL FASTER',
    desc: 'The entrepreneur who fails in 3 months learns what the cautious one learns in 3 years. I have shut down 3 startups. Each one compressed a decade of wisdom into a season. Failure is not the opposite of success. It is the price of admission.',
  },
  {
    icon: '2',
    title: 'EXECUTE FASTER',
    desc: 'Ideas are free. Execution is everything. I have seen smarter people lose to faster people more times than I can count. The world does not reward the best plan. It rewards the first proof.',
  },
  {
    icon: '3',
    title: 'BE DELUSIONAL',
    desc: 'Every sane person told me to get a job. Every rational person said the market was too hard. Every logical person said I was too early. They were right. And I built anyway. Delusion is just vision that hasn\'t been validated yet.',
  },
  {
    icon: '4',
    title: 'NEVER LEAVE ZIDD',
    desc: 'Not stubbornness. Not ego. Zidd is what remains when every reason to continue has been taken from you — and you continue anyway. It is the only unfair advantage that cannot be copied, funded, or faked.',
  },
]

/* ─── Chapter XVII — Testimonials ────────────────────────────────── */
export const TESTIMONIALS = [
  {
    text: 'Rohit is one of the most talented and inspiring leaders I\'ve come across. When he first shared GeniOS with me, I immediately knew he was onto something groundbreaking. He is unstoppable.',
    name: 'Aakriti Aggarwal',
    role: 'AI Research Engineer @ IBM  ·  Microsoft MVP (AI)',
    initial: 'A',
  },
  {
    text: 'From bootstrapping HOMIANS to shaping the future of AI — he has consistently shown the ability to build from scratch, pivot with clarity, and lead with empathy. Rohit is the person to know.',
    name: 'Pratiksha Aggarwal',
    role: 'Software Engineer @ Google',
    initial: 'P',
  },
  {
    text: 'His clarity of thought and dedication stood out every single time. Exceptional vision. Strong execution. Never-give-up attitude — in that order.',
    name: 'Arka Mazumder',
    role: 'SWE-III @ Google',
    initial: 'A',
  },
  {
    text: 'Rohit doesn\'t pursue ideas impulsively — he evaluates strategically, validates assumptions, and builds with long-term scalability in mind. That discipline is rare at any age.',
    name: 'Anshika',
    role: 'Software Engineer @ PayPal',
    initial: 'A',
  },
  {
    text: 'A tech geek who always thinks ahead in time. His vision always leads to solutions that make users come back. One of the most passionate people I have ever met.',
    name: 'Pranjal Mishra',
    role: 'SWE Intern @ BlackRock  ·  NIT Jamshedpur',
    initial: 'P',
  },
  {
    text: 'Identifies real market opportunities. Builds scalable solutions. Aligns long-term vision with measurable outcomes. A founder who understands growth, positioning, and value creation simultaneously.',
    name: 'Jatin Chaudhary',
    role: 'Software Engineer @ Extramarks',
    initial: 'J',
  },
]

/* ─── Chapter XVIII — Contact ─────────────────────────────────────── */
export const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'rohitswerashi@thegenios.com', href: 'mailto:rohitswerashi@thegenios.com' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/rohitswerashi', href: 'https://linkedin.com/in/rohitswerashi' },
  { label: 'TWITTER', value: '@RohitSwerashi', href: 'https://twitter.com/RohitSwerashi' },
  { label: 'TOPMATE', value: 'Book a Session', href: 'https://topmate.io/rohitswerashi' },
  { label: 'TEAM', value: 'hello@thegenios.com', href: 'mailto:hello@thegenios.com' },
]

/* ─── Legacy exports (kept for backward compat) ──────────────────── */
export const STATS = [
  { value: '6+', suffix: '', label: 'Years Building' },
  { value: '5', suffix: '', label: 'Startups Founded' },
  { value: '10K', suffix: '+', label: 'Students Mentored' },
  { value: '30+', suffix: '', label: 'Keynote Sessions' },
]

export const EXPERIENCE = TIMELINE

export const PROJECTS = ALL_PROJECTS

export const SKILLS_TECH = SKILLS_WEAPONS

export const SKILLS_OTHER = [
  { icon: '⚡', label: 'Agentic AI' },
  { icon: '🛡', label: 'Product' },
  { icon: '☁', label: 'LLMOps' },
  { icon: '🔱', label: 'Context Eng.' },
  { icon: '💠', label: 'Mentorship' },
  { icon: '✦', label: 'Leadership' },
]
