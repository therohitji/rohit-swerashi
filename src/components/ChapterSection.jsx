import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ABOUT, SKILLS_WEAPONS, TIMELINE, EDUCATION, MENTORSHIP,
  DISCIPLINE, GENIOS, CORE_VALUES, ALL_PROJECTS, ACHIEVEMENTS,
  VISION, PASSION_STORIES, BODY_OF_WORK, PERSONALITY, LEADERSHIP,
  PRINCIPLES, TESTIMONIALS, CONTACT_LINKS,
} from '../data/chapters'

gsap.registerPlugin(ScrollTrigger)

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII']

/* Convert 6-digit hex (#d4af37) + alpha → rgba(r,g,b,a) string */
const hexToRgba = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

/* ─────────────────────────────────────────────────────────────────────
   Design tokens
   ───────────────────────────────────────────────────────────────────── */
const F = {
  cinzel:  "'Cinzel', serif",
  cinzelD: "'Cinzel Decorative', serif",
  corm:    "'Cormorant Garamond', serif",
  josefin: "'Josefin Sans', sans-serif",   /* inner box headings — art-deco, matches Cinzel */
  jost:    "'Jost', sans-serif",            /* inner box body — confident, premium */
}

/* ─────────────────────────────────────────────────────────────────────
   Glass primitives
   ───────────────────────────────────────────────────────────────────── */
function Glass({ children, style = {}, depth = 'primary', tint = null, className = '' }) {
  const depths = {
    primary: {
      background: tint
        ? `linear-gradient(135deg, ${hexToRgba(tint, 0.07)} 0%, rgba(255,255,255,0.07) 100%)`
        : 'rgba(255,255,255,0.11)',
      backdropFilter:       'blur(28px) saturate(130%)',
      WebkitBackdropFilter: 'blur(28px) saturate(130%)',
      border:               tint ? `1px solid ${hexToRgba(tint, 0.18)}` : '1px solid rgba(255,255,255,0.13)',
      borderRadius:         '20px',
      boxShadow:            '0 28px 60px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)',
    },
    secondary: {
      background:           'rgba(255,255,255,0.07)',
      backdropFilter:       'blur(18px) saturate(120%)',
      WebkitBackdropFilter: 'blur(18px) saturate(120%)',
      border:               '1px solid rgba(255,255,255,0.10)',
      borderRadius:         '14px',
      boxShadow:            '0 14px 34px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
    },
    card: {
      background:           'rgba(255,255,255,0.03)',
      backdropFilter:       'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border:               '1px solid rgba(255,255,255,0.07)',
      borderRadius:         '12px',
      boxShadow:            '0 8px 22px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)',
    },
    accent: {
      background:           'rgba(212,175,55,0.07)',
      backdropFilter:       'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border:               '1px solid rgba(212,175,55,0.16)',
      borderRadius:         '12px',
      boxShadow:            '0 8px 26px rgba(0,0,0,0.38), inset 0 1px 0 rgba(212,175,55,0.12)',
    },
  }
  return <div className={`glass-box${className ? ' ' + className : ''}`} style={{ ...depths[depth], ...style }}>{children}</div>
}

/* ─────────────────────────────────────────────────────────────────────
   Shared typography helpers
   ───────────────────────────────────────────────────────────────────── */
/* body → Jost 400 ~15px  (inner box descriptions — confident, premium) */
const body   = (extra = {}) => ({ fontFamily: F.jost, fontWeight: 400, fontSize: 'clamp(0.86rem, 1.05vw, 0.94rem)', lineHeight: 1.82, color: 'rgba(240,230,208,0.80)', letterSpacing: '0.02em', ...extra })
/* semi → Josefin Sans 600 ~18px (inner box headings — art-deco, pairs with Cinzel) */
const semi   = (extra = {}) => ({ fontFamily: F.josefin, fontWeight: 600, fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.35, color: 'rgba(240,230,208,0.95)', letterSpacing: '0.03em', ...extra })
/* muted → italic Cormorant for poetic whispers (soul lines) */
const muted  = (extra = {}) => ({ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(0.94rem, 1.22vw, 1.04rem)', lineHeight: 1.85, color: 'rgba(240,230,208,0.50)', ...extra })
const label  = (color = 'rgba(212,175,55,0.50)') => ({ fontFamily: F.cinzel, fontSize: '11px', letterSpacing: '0.42em', textTransform: 'uppercase', color })
const cinzelD = (extra = {}) => ({ fontFamily: F.cinzelD, ...extra })

function SectionLabel({ text, accent }) {
  return <div style={{ ...label(accent ?? 'rgba(212,175,55,0.50)'), marginBottom: '14px' }}>{text}</div>
}

function NarrativeBridge({ text }) {
  return (
    <div className="narrative-bridge" style={{ marginTop: '28px', textAlign: 'right', fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(0.82rem, 1.05vw, 0.92rem)', lineHeight: 1.7, color: 'rgba(212,175,55,0.48)', letterSpacing: '0.04em' }}>
      {text}
    </div>
  )
}

function Tag({ label: lbl, accent = 'rgba(212,175,55,0.6)', i = 0 }) {
  return (
    <span style={{ fontFamily: F.cinzel, fontSize: '10px', letterSpacing: '0.22em', padding: '5px 14px', border: `1px solid ${accent}cc`, color: accent, opacity: 1, animation: `tagBounce 0.5s ease ${i * 0.06}s both`, display: 'inline-block', background: `${accent}28` }}>
      {lbl}
    </span>
  )
}


/* ─────────────────────────────────────────────────────────────────────
   Chapter Header  (sits above the glass card — floats over bg)
   ───────────────────────────────────────────────────────────────────── */
function ChapterHeader({ chapter }) {
  return (
    <div style={{
      marginBottom: '0', paddingBottom: '28px',
      paddingTop: '8px', paddingLeft: '4px',
      background: 'linear-gradient(160deg, rgba(5,11,26,0.55) 0%, rgba(5,11,26,0.20) 60%, transparent 100%)',
      borderRadius: '8px 8px 0 0',
    }}>
      <div style={{ ...label('rgba(212,175,55,0.60)'), marginBottom: '10px' }}>
        {ROMAN[chapter.id - 1]} · {chapter.sanskrit} · {String(chapter.id).padStart(2,'0')} / XVIII
      </div>
      <h2 className="chapter-title gold-shimmer" style={{ marginBottom: '8px' }}>{chapter.name}</h2>
      <div className="chapter-subtitle">{chapter.theme}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Shloka Card
   ───────────────────────────────────────────────────────────────────── */
function ShlokaCard({ chapter }) {
  return (
    <div className="shloka-card" style={{ marginTop: '36px' }}>
    <Glass depth="card" style={{ padding: '22px 26px', borderLeft: `2px solid ${chapter.accent}70` }}>
      <div style={{ fontFamily: F.cinzel, fontSize: 'clamp(1rem, 1.35vw, 1.18rem)', color: chapter.accent, lineHeight: 1.8, marginBottom: '10px', fontWeight: 500 }}>
        {chapter.shloka}
      </div>
      <div style={{ ...muted(), fontSize: 'clamp(1rem, 1.3vw, 1.12rem)', opacity: 0.85 }}>
        "{chapter.shlokaEn}"
      </div>
      <div style={{ marginTop: '10px', ...label('rgba(212,175,55,0.55)'), fontSize: '11px' }}>— {chapter.shlokaRef}</div>
    </Glass>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════════
   CHAPTER CONTENT FUNCTIONS
   Each chapter has a primary glass card with 2-column internal layout
   where content benefits from horizontal distribution.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── I · Who Is Rohit ────────────────────────────────────────────── */
function ContentHero({ chapter }) {
  return (
    <div>
      <blockquote style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(0.95rem, 4.5vw, 1.5625rem)', lineHeight: 1.55, color: 'var(--cream)', marginBottom: '24px', borderLeft: '2px solid rgba(212,175,55,0.32)', paddingLeft: '18px' }}>
        "The war was never outside.<br />It was always within me."
      </blockquote>

      <blockquote style={{ fontFamily: F.corm, fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(0.95rem, 1.35vw, 1.15rem)', lineHeight: 1.65, color: 'var(--cream)', marginBottom: '8px', borderLeft: '2px solid rgba(212,175,55,0.32)', paddingLeft: '18px' }}>
        From <span style={{ color: 'var(--gold)' }}>Varanasi, UP</span> — no connections, no capital — to IIM Bangalore, Harvard HPAIR, Stanford ASES, and Shark Tank India.
      </blockquote>
      <p style={{ ...muted(), marginBottom: '28px', paddingLeft: '20px' }}>
        Not built on privilege. Built on persistence. Every failure a teacher. Every pivot a prayer.
      </p>

      {/* 2×2 stats grid */}
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {ABOUT.stats.map((s, i) => (
          <Glass key={i} depth="accent" style={{ padding: '14px 10px', textAlign: 'center' }}>
            <div className="stat-num" style={{ ...cinzelD({ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 900, color: 'var(--gold)', marginBottom: '5px' }) }}>{s.value}</div>
            <div className="stat-lbl" style={{ fontFamily: F.corm, fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.70)' }}>{s.label}</div>
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="The tools were never given. They were forged." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── II · The Weapons ────────────────────────────────────────────── */
function ContentWeapons({ chapter }) {
  const barsRef = useRef([])
  useEffect(() => {
    barsRef.current.forEach((el, i) => {
      if (!el) return
      ScrollTrigger.create({ trigger: el, start: 'top 87%', once: true, onEnter: () => setTimeout(() => el.classList.add('animate'), i * 130) })
    })
  }, [])

  return (
    <div>
      <p style={{ ...muted(), fontSize: 'clamp(1rem, 1.4vw, 1.12rem)', marginBottom: '28px' }}>
        Not skills. Weapons — forged in real battle across four startups and seven years.
      </p>

      {/* 2-column skill bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '24px 36px' }}>
        {SKILLS_WEAPONS.map((skill, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
              <span style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.05rem', color: 'rgba(240,230,208,0.92)', letterSpacing: '0.02em' }}>{skill.name}</span>
              <span style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '0.95rem', color: `${chapter.accent}` }}>{skill.level}%</span>
            </div>
            <div className="skill-bar-track">
              <div ref={el => barsRef.current[i] = el} className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
            </div>
            <div style={{ ...muted(), fontSize: '0.78rem', marginTop: '4px' }}>{skill.detail}</div>
          </div>
        ))}
      </div>

      <NarrativeBridge text="Six weapons. Seven years. One timeline." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── III · The Journey ───────────────────────────────────────────── */
function ContentTimeline({ chapter }) {
  const refs = useRef([])
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: 0, x: -16 })
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.55, delay: i * 0.08, ease: 'power2.out' }) })
    })
  }, [])

  const dotColor = s => ({ now: '#d4af37', victory: '#22c5ae', failed: 'rgba(200,80,80,0.55)', pivot: '#a0a0c0' }[s] ?? '#d4af37')

  return (
    <div>
      {/* 2-column timeline: year+tag LEFT, title+desc RIGHT */}
      <div className="timeline-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {TIMELINE.map((item, i) => (
          <div key={i} ref={el => refs.current[i] = el}>
            <Glass depth="card" className="timeline-card" style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '96px 1fr', gap: '0 20px', alignItems: 'start' }}>
              {/* Left: year + badge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '2px' }}>
                <span style={{ fontFamily: F.cinzel, fontSize: '10px', letterSpacing: '0.2em', color: chapter.accent }}>{item.year}</span>
                {item.age && (
                  <span style={{ fontFamily: F.cinzel, fontSize: '7px', letterSpacing: '0.22em', padding: '2px 8px', border: `1px solid ${dotColor(item.status)}44`, color: dotColor(item.status), background: `${dotColor(item.status)}10`, display: 'inline-block' }}>
                    {item.age}
                  </span>
                )}
              </div>
              {/* Right: title + desc */}
              <div>
                <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '4px', lineHeight: 1.3, letterSpacing: '0.02em' }}>{item.title}</div>
                <p style={{ ...muted(), margin: 0 }}>{item.desc}</p>
              </div>
            </Glass>
          </div>
        ))}
      </div>

      <NarrativeBridge text="The classroom was never my real school." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── IV · The Education ──────────────────────────────────────────── */
function ContentEducation({ chapter }) {
  return (
    <div>
      <p style={{ ...muted(), fontSize: 'clamp(1rem, 1.4vw, 1.12rem)', marginBottom: '26px' }}>{EDUCATION.motto}</p>

      {/* 3 formal cards side by side */}
      <div style={{ marginBottom: '26px' }}>
        <SectionLabel text="Formal" accent={`${chapter.accent}55`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '10px' }}>
          {EDUCATION.formal.map((edu, i) => (
            <Glass key={i} depth="card" style={{ padding: '16px 14px' }}>
              <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '4px', lineHeight: 1.3 }}>{edu.name}</div>
              <div style={{ ...label(`${chapter.accent}45`), fontSize: '10px', marginBottom: '8px' }}>{edu.location}</div>
              <div style={{ ...muted(), fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.65 }}>{edu.note}</div>
            </Glass>
          ))}
        </div>
      </div>

      {/* Real school tags */}
      <div>
        <SectionLabel text="The Real School" accent={`${chapter.accent}dd`} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
          {EDUCATION.realSchool.map((item, i) => <Tag key={i} label={item} accent={chapter.accent} i={i} />)}
        </div>
      </div>

      <NarrativeBridge text="Knowledge found a cause." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── V · The Mentorship ──────────────────────────────────────────── */
function ContentMentorship({ chapter }) {
  const [on, setOn] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    ScrollTrigger.create({ trigger: ref.current, start: 'top 74%', once: true, onEnter: () => setOn(true) })
  }, [])

  return (
    <div ref={ref}>
      {/* 3 hero stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '12px', marginBottom: '26px' }}>
        {MENTORSHIP.stats.slice(0, 3).map((s, i) => (
          <Glass key={i} depth="accent" className="mentorship-stat" style={{ padding: '18px 12px', textAlign: 'center', opacity: on ? 1 : 0, animation: on ? `statGlow 0.9s ease ${i * 0.14}s both` : 'none' }}>
            <div className="mstat-val" style={{ fontFamily: F.corm, fontWeight: 700, fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: chapter.accent, marginBottom: '6px' }}>{s.value}</div>
            <div style={{ ...label('rgba(240,230,208,0.85)'), fontSize: '10px', letterSpacing: '0.25em' }}>{s.label}</div>
          </Glass>
        ))}
      </div>

      {/* 2-col: destinations | quote */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '18px' }}>
        <div>
          <SectionLabel text="Mentees Now At" accent={`${chapter.accent}dd`} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {MENTORSHIP.menteeDestinations.map((d, i) => <Tag key={i} label={d} accent={chapter.accent} i={i} />)}
          </div>
        </div>
        <Glass depth="card" style={{ padding: '16px 18px' }}>
          <p style={{ ...muted(), fontSize: 'clamp(0.85rem, 1.12vw, 0.96rem)', margin: 0 }}>{MENTORSHIP.quote}</p>
        </Glass>
      </div>

      <NarrativeBridge text="The work continued at 5 AM." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── VI · Discipline ─────────────────────────────────────────────── */
function ContentDiscipline({ chapter }) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ ...cinzelD({ fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)', color: chapter.accent, marginBottom: '4px' }) }}>2020. The year the world stopped.</div>
        <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'rgba(240,230,208,0.58)' }}>I used it to transform.</div>
      </div>

      {/* Big transformation stat */}
      <Glass depth="accent" className="discipline-stat" style={{ padding: '22px 24px', textAlign: 'center', marginBottom: '24px' }}>
        <div className="discipline-num" style={{ fontFamily: F.corm, fontWeight: 700, fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)', color: 'var(--cream)', marginBottom: '6px' }}>90 kg → 65 kg</div>
        <div style={{ ...muted(), fontWeight: 700, fontSize: '0.9rem' }}>Not with a gym. At home. Every day. No one asked. No one watched.</div>
      </Glass>

      {/* 2×2 principles grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {DISCIPLINE.principles.map((p, i) => (
          <Glass key={i} depth="card" style={{ padding: '16px 16px' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '7px', letterSpacing: '0.02em' }}>{p.time}</div>
            <div style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(0.85rem, 1.1vw, 0.96rem)' }}>{p.label}</div>
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="From this foundation — GeniOS." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── VII · GeniOS ────────────────────────────────────────────────── */
function ContentGenios({ chapter }) {
  return (
    <div>
      <div style={{ ...cinzelD({ fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)', color: chapter.accent, marginBottom: '22px', letterSpacing: '0.04em' }) }}>
        {GENIOS.tagline}
      </div>

      {/* Problem + Solution side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '14px', marginBottom: '24px' }}>
        <Glass depth="card" style={{ padding: '18px 16px' }}>
          <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '10px', letterSpacing: '0.02em' }}>The Problem</div>
          <p style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(0.88rem, 1.18vw, 1rem)', margin: 0 }}>{GENIOS.problem}</p>
        </Glass>
        <Glass depth="accent" style={{ padding: '18px 16px' }}>
          <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '10px', letterSpacing: '0.02em' }}>The Solution</div>
          <p style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(0.88rem, 1.18vw, 1rem)', margin: 0 }}>{GENIOS.solution}</p>
        </Glass>
      </div>

      {/* Products in 2 columns */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '10px', letterSpacing: '0.02em' }}>What We've Built</div>
        <p style={{ ...muted(), fontSize: '0.92rem', marginBottom: '14px', marginTop: '-4px' }}>
          Before pivoting to GeniOS Context Brain — we built these as GeniOS AI Employees.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
          {GENIOS.products.map((p, i) => (
            <Glass key={i} depth="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1rem', color: chapter.accent, marginBottom: '5px', letterSpacing: '0.02em' }}>{p.name}</div>
              <div style={{ ...muted(), fontWeight: 700, fontSize: '0.84rem' }}>{p.desc}</div>
            </Glass>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '12px' }}>
        {GENIOS.badges.map((b, i) => <Tag key={i} label={b} accent={chapter.accent} i={i} />)}
      </div>
      <div style={{ ...muted(), fontSize: '0.78rem' }}>Validated by: {GENIOS.validatedBy}</div>

      <NarrativeBridge text="The values behind the product." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── VIII · Core Values ──────────────────────────────────────────── */
function ContentCoreValues({ chapter }) {
  const [on, setOn] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    ScrollTrigger.create({ trigger: ref.current, start: 'top 72%', once: true, onEnter: () => setOn(true) })
  }, [])

  const values = CORE_VALUES.slice(0, 6)

  return (
    <div ref={ref}>
      <p style={{ ...muted(), fontSize: 'clamp(1rem, 1.38vw, 1.1rem)', marginBottom: '26px' }}>
        These do not change. Not for investors. Not for trends. Not for anyone.
      </p>

      {/* 2-column values grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {values.map((v, i) => (
          <Glass key={i} depth="card" style={{ padding: '16px 16px', opacity: on ? 1 : 0, animation: on ? `valueBurn 0.8s ease ${i * 0.14}s both` : 'none' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '6px', letterSpacing: '0.02em' }}>{v.title}</div>
            <div style={{ ...muted(), fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.7 }}>{v.desc}</div>
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="Values became products." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── IX · The Projects ───────────────────────────────────────────── */
function ContentAllProjects({ chapter }) {
  const projects = ALL_PROJECTS

  return (
    <div>
      <p style={{ ...muted(), marginBottom: '22px' }}>Every product is a prayer. Every metric, proof.</p>

      {/* 2×2 project grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {projects.map((p, i) => (
          <Glass key={i} depth="secondary" style={{ padding: '18px 16px', animation: `settleIn 0.7s ease ${i * 0.1}s both`, display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: `2px solid ${p.accent}35` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: F.cinzel, fontSize: '8px', letterSpacing: '0.35em', color: `${p.accent}70` }}>{p.num}</span>
              <span style={{ fontFamily: F.cinzel, fontSize: '7px', letterSpacing: '0.25em', padding: '2px 8px', border: `1px solid ${p.accent}45`, color: p.accent, background: `${p.accent}12` }}>{p.status}</span>
            </div>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.15rem', color: 'rgba(240,230,208,0.96)', lineHeight: 1.3, marginBottom: '1px', letterSpacing: '0.02em' }}>{p.title}</div>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '0.88rem', color: `${p.accent}`, letterSpacing: '0.02em', marginBottom: '4px' }}>{p.subtitle}</div>
            <div style={{ ...muted(), fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.65 }}>{p.quote}</div>
            <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontWeight: 700, fontSize: '0.78rem', color: p.accent, marginTop: 'auto', paddingTop: '6px', borderTop: `1px solid ${p.accent}40` }}>{p.stats}</div>
            {p.link && (
              <a
                href={p.link.startsWith('http') ? p.link : `https://${p.link}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  marginTop: '10px', padding: '6px 14px',
                  background: `${p.accent}18`,
                  border: `1px solid ${p.accent}55`,
                  borderRadius: '20px',
                  textDecoration: 'none',
                  fontFamily: F.josefin, fontWeight: 700,
                  fontSize: '0.72rem', letterSpacing: '0.06em',
                  color: p.accent,
                  transition: 'all 0.22s ease',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${p.accent}30`; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = `${p.accent}18`; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {p.link === 'Book a Session' || p.link === 'Use It Free' ? p.link : 'View'}
              </a>
            )}
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="The products earned recognition." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── X · Achievements ────────────────────────────────────────────── */
function ContentAchievements({ chapter }) {
  return (
    <div>
      <p style={{ ...muted(), marginBottom: '24px' }}>Every achievement is His grace through my effort.</p>

      {/* 2×2 achievement group cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {[
          { label: 'Global',      color: '#d4af37', items: ACHIEVEMENTS.global },
          { label: 'National',    color: '#ff9040', items: ACHIEVEMENTS.national.slice(0, 4) },
          { label: 'Fellowships', color: '#22c5ae', items: ACHIEVEMENTS.fellowships.slice(0, 5) },
          { label: 'Early Wins',  color: '#c97088', items: ACHIEVEMENTS.early },
        ].map(({ label, color, items }) => (
          <Glass key={label} depth="card" style={{ padding: '16px 16px' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color, marginBottom: '12px', letterSpacing: '0.02em' }}>{label}</div>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '9px' }}>
                <span style={{ color, fontSize: '7px', paddingTop: '5px', flexShrink: 0 }}>◆</span>
                <div>
                  <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '0.95rem', color: 'rgba(240,230,208,0.95)', lineHeight: 1.35 }}>{item.title}</div>
                  {item.detail && <div style={{ ...muted(), fontWeight: 700, fontSize: '0.78rem' }}>{item.detail}</div>}
                </div>
              </div>
            ))}
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="The recognition points to something larger." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XI · The Vision  (center) ───────────────────────────────────── */
function ContentVision({ chapter }) {
  return (
    <div>
      <div style={{ ...cinzelD({ fontSize: 'clamp(1.2rem, 1.9vw, 1.65rem)', color: 'var(--cream)', marginBottom: '24px', lineHeight: 1.3 }) }}>
        {VISION.headline}
      </div>

      {/* 2-col: vision text | india angle */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '18px', marginBottom: '20px', alignItems: 'start' }}>
        <p style={{ ...muted(), fontWeight: 700, whiteSpace: 'pre-line', margin: 0 }}>{VISION.text}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Glass depth="accent" style={{ padding: '18px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: chapter.accent, letterSpacing: '0.02em' }}>The India Angle</div>
            <p style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(0.9rem, 1.22vw, 1.04rem)', margin: 0 }}>{VISION.indiaAngle}</p>
          </Glass>
          <Glass depth="accent" style={{ padding: '18px 18px' }}>
            <p style={{ fontFamily: F.corm, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(0.9rem, 1.22vw, 1.04rem)', lineHeight: 1.85, color: chapter.accent, margin: 0 }}>{VISION.impact}</p>
          </Glass>
        </div>
      </div>

      <NarrativeBridge text="This is why every chapter before this matters." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XII · Why He Builds ─────────────────────────────────────────── */
function ContentPassion({ chapter }) {
  return (
    <div>
      <Glass depth="accent" style={{ padding: '24px 26px', marginBottom: '26px', textAlign: 'center' }}>
        <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(1.15rem, 1.8vw, 1.6rem)', lineHeight: 1.55, color: 'var(--cream)', marginBottom: '8px' }}>
          "People ask me: why don't you quit when it gets hard?"
        </div>
        <div style={{ ...muted(), fontSize: '0.9rem' }}>Here is the answer.</div>
      </Glass>

      {/* 3 stories — left+right alternating */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {PASSION_STORIES.map((s, i) => (
          <Glass key={i} depth="card" style={{ padding: '16px 18px', display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 14px', alignItems: 'start' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: chapter.accent, paddingTop: '2px', lineHeight: 1 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: chapter.accent, marginBottom: '6px', letterSpacing: '0.02em' }}>{s.headline}</div>
              <p style={{ ...muted(), fontWeight: 700, margin: 0 }}>{s.story}</p>
            </div>
          </Glass>
        ))}
      </div>

      <div style={{ marginTop: '22px', textAlign: 'center', ...muted() }}>
        "God gave me these dreams for a reason. I am simply fulfilling my duty."
      </div>

      <NarrativeBridge text="The devotion shows in everything built." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XIII · Body of Work ─────────────────────────────────────────── */
function ContentBodyOfWork({ chapter }) {
  const g = BODY_OF_WORK.genios
  return (
    <div>
      <p style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', marginBottom: '22px' }}>
        {BODY_OF_WORK.quote}
      </p>

      {/* GeniOS featured card */}
      <Glass depth="accent" style={{ padding: '24px 22px', marginBottom: '16px' }}>
        <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.5rem', color: 'rgba(240,230,208,0.98)', marginBottom: '3px', letterSpacing: '0.02em' }}>GeniOS</div>
        <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontWeight: 700, fontSize: '0.96rem', color: '#96b4ff', marginBottom: '16px' }}>{g.role}</div>
        <p style={{ fontFamily: F.corm, fontWeight: 400, fontStyle: 'italic', fontSize: '1rem', color: 'rgba(240,230,208,0.88)', lineHeight: 1.8, marginBottom: '18px' }}>{g.desc}</p>

        <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '8px' }}>What the field demands right now:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {g.skills.map((s, i) => <Tag key={i} label={s} accent='#96b4ff' i={i} />)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          <Glass depth="card" style={{ padding: '11px 14px' }}>
            <div style={{ fontFamily: F.corm, fontSize: '0.94rem', color: 'rgba(240,230,208,0.85)', lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: chapter.accent }}>The Team — </span>{g.team}
            </div>
          </Glass>
          <Glass depth="card" style={{ padding: '11px 14px' }}>
            <div style={{ fontFamily: F.corm, fontSize: '0.94rem', color: 'rgba(240,230,208,0.85)', lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: chapter.accent }}>Backed by — </span>{g.backed.join(' · ')}
            </div>
          </Glass>
          <Glass depth="card" style={{ padding: '11px 14px' }}>
            <div style={{ fontFamily: F.corm, fontSize: '0.94rem', color: 'rgba(240,230,208,0.85)', lineHeight: 1.7 }}>
              <span style={{ fontWeight: 700, color: chapter.accent }}>Advised by — </span>{g.advisors}
            </div>
          </Glass>
        </div>

        <p style={{ fontFamily: F.corm, fontStyle: 'italic', fontWeight: 700, fontSize: '1.02rem', color: chapter.accent, marginBottom: '18px', lineHeight: 1.7 }}>{g.closing}</p>

        <a
          href="https://thegenios.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            textDecoration: 'none',
            padding: '15px 28px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.72) 0%, rgba(180,148,30,0.68) 60%, rgba(140,110,20,0.65) 100%)',
            border: '1px solid rgba(212,175,55,0.40)',
            borderRadius: '10px',
            boxShadow: '0 4px 18px rgba(212,175,55,0.22), 0 2px 8px rgba(0,0,0,0.40)',
            transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.35), 0 4px 12px rgba(0,0,0,0.50)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(212,175,55,0.22), 0 2px 8px rgba(0,0,0,0.40)' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: F.cinzel, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.08em', color: 'rgba(240,230,208,0.97)', lineHeight: 1.3 }}>
              Building Agents? Build with GeniOS →
            </div>
            <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: '0.74rem', color: 'rgba(240,230,208,0.55)', marginTop: '3px', letterSpacing: '0.04em' }}>
              Click Here · thegenios.com
            </div>
          </div>
        </a>
      </Glass>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
        {BODY_OF_WORK.fields.map((f, i) => <Tag key={i} label={f} accent='#96b4ff' i={i} />)}
      </div>

      <NarrativeBridge text="The work reveals the person." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XIV · Personality  (center) ─────────────────────────────────── */
function ContentPersonality({ chapter }) {
  const [on, setOn] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    ScrollTrigger.create({ trigger: ref.current, start: 'top 72%', once: true, onEnter: () => setOn(true) })
  }, [])

  return (
    <div ref={ref}>
      <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)', color: 'var(--cream)', marginBottom: '26px', textAlign: 'center', lineHeight: 1.45 }}>
        Rajasic by fire. Sattvic by purpose.<br />
        <span style={{ opacity: 0.6, fontSize: '0.8em' }}>Built to win. Grounded in God.</span>
      </div>

      {/* Single column — two sections stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: What others say */}
        <div>
          <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '12px', letterSpacing: '0.02em' }}>What Those Who've Worked With Me Say</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PERSONALITY.whatOthersSay.map((s, i) => (
              <Glass key={i} depth="card" style={{ padding: '12px 16px', opacity: on ? 1 : 0, animation: on ? `settleIn 0.7s ease ${i * 0.1}s both` : 'none' }}>
                <div style={{ ...muted(), fontWeight: 700, fontSize: '0.96rem', lineHeight: 1.7 }}>{s}</div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Section 2: What he knows */}
        <div>
          <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '12px', letterSpacing: '0.02em' }}>What I Know About Myself</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {PERSONALITY.whatHeKnows.map((item, i) => (
              <Glass key={i} depth="card" style={{ padding: '12px 16px' }}>
                <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.05rem', color: chapter.accent, marginBottom: '3px' }}>{item.trait}</div>
                <div style={{ ...muted(), fontWeight: 700, fontSize: '0.88rem' }}>{item.desc}</div>
              </Glass>
            ))}
          </div>
          <Glass depth="accent" style={{ padding: '14px 16px' }}>
            <div style={{ ...muted(), fontWeight: 700, lineHeight: 1.75, fontSize: '0.92rem' }}>
              {PERSONALITY.paradox.self}<br />
              {PERSONALITY.paradox.other}<br />
              <span style={{ color: chapter.accent }}>{PERSONALITY.paradox.resolution}</span>
            </div>
          </Glass>
        </div>
      </div>

      <NarrativeBridge text="The person shapes the team." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XV · Leadership ─────────────────────────────────────────────── */
function ContentLeadership({ chapter }) {
  return (
    <div>
      <blockquote style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.7vw, 1.45rem)', lineHeight: 1.5, color: 'var(--cream)', borderLeft: '2px solid rgba(212,175,55,0.28)', paddingLeft: '18px', marginBottom: '26px' }}>
        {LEADERSHIP.quote}
      </blockquote>

      {/* Led list LEFT | Lesson+testimonial RIGHT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px' }}>
        <div>
          <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '10px', letterSpacing: '0.02em' }}>What I've Led</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {LEADERSHIP.led.map((item, i) => (
              <Glass key={i} depth="card" style={{ padding: '12px 16px' }}>
                <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.05rem', color: chapter.accent, marginBottom: '3px', lineHeight: 1.3 }}>{item.what}</div>
                <div style={{ ...muted(), fontWeight: 700, fontSize: '0.84rem' }}>{item.detail}</div>
              </Glass>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Glass depth="card" style={{ padding: '16px 16px' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,230,208,0.95)', marginBottom: '10px', letterSpacing: '0.02em' }}>The Real Lesson</div>
            <p style={{ ...muted(), fontWeight: 700, margin: 0, fontSize: 'clamp(0.88rem, 1.12vw, 0.98rem)' }}>{LEADERSHIP.lesson}</p>
          </Glass>
          <Glass depth="accent" style={{ padding: '16px 16px' }}>
            <div style={{ ...muted(), fontWeight: 700, fontSize: 'clamp(0.88rem, 1.08vw, 0.96rem)', marginBottom: '10px' }}>{LEADERSHIP.testimonial.text}</div>
            <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: '0.82rem', color: `${chapter.accent}cc` }}>— {LEADERSHIP.testimonial.name}, {LEADERSHIP.testimonial.role}</div>
          </Glass>
        </div>
      </div>

      <NarrativeBridge text="Principles outlasted every setback." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XVI · Principles ────────────────────────────────────────────── */
function ContentPrinciples({ chapter }) {
  const [on, setOn] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    ScrollTrigger.create({ trigger: ref.current, start: 'top 70%', once: true, onEnter: () => setOn(true) })
  }, [])

  const principles = PRINCIPLES.slice(0, 4)

  return (
    <div ref={ref}>
      <div style={{ ...cinzelD({ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', color: 'var(--cream)', marginBottom: '26px', lineHeight: 1.2 }), opacity: on ? 1 : 0, animation: on ? 'crashIn 1s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none' }}>
        "Fail faster.<br />Stay delusional.<br />Never leave Zidd."
      </div>

      {/* 2×2 principles grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {principles.map((p, i) => (
          <Glass key={i} depth="secondary" style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.5rem', color: chapter.accent, lineHeight: 1 }}>{p.icon}</div>
            <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '1.05rem', color: chapter.accent, lineHeight: 1.25, letterSpacing: '0.02em' }}>{p.title}</div>
            <div style={{ ...muted(), fontWeight: 700 }}>{p.desc}</div>
          </Glass>
        ))}
      </div>

      <NarrativeBridge text="Others confirmed what the work proved." />
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── XVII · Faith of Others ──────────────────────────────────────── */
function ContentTestimonials({ chapter }) {
  const testimonials = TESTIMONIALS.slice(0, 6)

  return (
    <div>
      {/* 2×2 testimonial grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px' }}>
        {testimonials.map((t, i) => (
          <Glass key={i} depth="secondary" style={{ padding: '18px 18px', animation: `settleIn 0.8s ease ${i * 0.14}s both`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(0.88rem, 1.18vw, 1rem)', lineHeight: 1.85, color: 'rgba(240,230,208,0.80)', marginBottom: '14px', flex: 1 }}>
              "{t.text}"
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.cinzel, fontSize: '10px', color: 'var(--gold)', flexShrink: 0 }}>
                {t.initial}
              </div>
              <div>
                <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: '0.95rem', color: chapter.accent, lineHeight: 1.2 }}>{t.name}</div>
                <div style={{ ...muted(), fontWeight: 700, fontSize: '0.78rem', marginTop: '2px' }}>{t.role}</div>
              </div>
            </div>
          </Glass>
        ))}
      </div>
      <ShlokaCard chapter={chapter} />
    </div>
  )
}

/* ── Contact icons (inline SVG — no dependency) ──────────────────── */
const CICON = {
  EMAIL: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  LINKEDIN: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  TWITTER: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  TOPMATE: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5"/>
      <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5"/>
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2.5"/>
      <line x1="8" y1="18" x2="8" y2="18" strokeWidth="2.5"/>
    </svg>
  ),
  TEAM: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

/* Platform accent colors */
const CACC = {
  EMAIL:    '#d4af37',
  LINKEDIN: '#0e76a8',
  TWITTER:  '#c8d8e0',
  TOPMATE:  '#9f7aea',
  TEAM:     '#22c5ae',
}

/* ── XVIII · Liberation · Contact ────────────────────────────────── */
function ContentContact({ chapter }) {
  return (
    <div>
      <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.6vw, 1.38rem)', lineHeight: 1.65, color: 'rgba(240,230,208,0.78)', marginBottom: '10px' }}>
        "The journey is not over. It never is."
      </div>
      <p style={{ ...body(), fontSize: 'clamp(0.95rem, 1.3vw, 1.08rem)', color: 'rgba(240,230,208,0.55)', marginBottom: '28px' }}>
        If you want to build something meaningful — if you believe AI should serve humanity, not replace it — we should talk.
      </p>

      {/* PRIMARY CTA — Topmate */}
      <a
        href="https://topmate.io/rohitswerashi"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          textDecoration: 'none', marginBottom: '18px',
          padding: '15px 28px',
          background: 'linear-gradient(135deg, #d4af37 0%, #b8951e 100%)',
          border: '1.5px solid rgba(212,175,55,0.60)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(212,175,55,0.30), 0 8px 24px rgba(0,0,0,0.35)',
          transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
          animation: 'rippleOut 0.7s ease 0s both',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #f0c040 0%, #d4af37 100%)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.45), 0 14px 32px rgba(0,0,0,0.40)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8951e 100%)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.30), 0 8px 24px rgba(0,0,0,0.35)' }}
      >
        <span style={{ color: 'rgba(5,11,26,0.90)', display: 'flex' }}>{CICON.EMAIL}</span>
        <span style={{ fontFamily: F.corm, fontWeight: 700, fontSize: 'clamp(1rem, 1.4vw, 1.12rem)', letterSpacing: '0.04em', color: 'rgba(5,11,26,0.95)' }}>
          rohitswerashi@thegenios.com
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '1rem', color: 'rgba(5,11,26,0.70)' }}>→</span>
      </a>

      {/* SECONDARY LINKS — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '10px', marginBottom: '24px' }}>
        {CONTACT_LINKS.slice(1).map((link, i) => {
          const acc = CACC[link.label] ?? '#d4af37'
          const icon = CICON[link.label]
          return (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                textDecoration: 'none', padding: '13px 15px',
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${acc}30`,
                borderRadius: '12px',
                boxShadow: `0 6px 20px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06)`,
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                animation: `rippleOut 0.7s ease ${(i + 1) * 0.1}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${acc}80`; e.currentTarget.style.background = `${acc}12`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.50), 0 0 18px ${acc}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${acc}30`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              {/* Icon box */}
              <div style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '8px', background: `${acc}16`, border: `1px solid ${acc}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: acc }}>
                {icon}
              </div>
              {/* Text */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: F.corm, fontWeight: 700, fontSize: 'clamp(0.9rem, 1.15vw, 1.02rem)', color: 'rgba(240,230,208,0.92)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                  {link.label === 'TWITTER' ? 'X (Twitter)' : link.label.charAt(0) + link.label.slice(1).toLowerCase()}
                </div>
                <div style={{ fontFamily: F.corm, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(0.76rem, 0.98vw, 0.86rem)', color: 'rgba(240,230,208,0.46)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {link.value}
                </div>
              </div>
              {/* Arrow */}
              <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: `${acc}60`, flexShrink: 0 }}>→</div>
            </a>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ ...muted(), letterSpacing: '0.14em' }}>
          "Always open for a conversation over a good chai."
        </div>
        <div style={{ fontFamily: F.cinzel, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(212,175,55,0.22)' }}>
          ॥ हरि ॐ तत् सत् ॥
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Content Router
   ───────────────────────────────────────────────────────────────────── */
function ChapterContent({ chapter }) {
  switch (chapter.type) {
    case 'hero':         return <ContentHero         chapter={chapter} />
    case 'weapons':      return <ContentWeapons      chapter={chapter} />
    case 'timeline':     return <ContentTimeline     chapter={chapter} />
    case 'education':    return <ContentEducation    chapter={chapter} />
    case 'mentorship':   return <ContentMentorship   chapter={chapter} />
    case 'discipline':   return <ContentDiscipline   chapter={chapter} />
    case 'genios':       return <ContentGenios       chapter={chapter} />
    case 'corevalues':   return <ContentCoreValues   chapter={chapter} />
    case 'allprojects':  return <ContentAllProjects  chapter={chapter} />
    case 'achievements': return <ContentAchievements chapter={chapter} />
    case 'vision':       return <ContentVision       chapter={chapter} />
    case 'passion':      return <ContentPassion      chapter={chapter} />
    case 'bodyofwork':   return <ContentBodyOfWork   chapter={chapter} />
    case 'personality':  return <ContentPersonality  chapter={chapter} />
    case 'leadership':   return <ContentLeadership   chapter={chapter} />
    case 'principles':   return <ContentPrinciples   chapter={chapter} />
    case 'testimonials': return <ContentTestimonials chapter={chapter} />
    case 'contact':      return <ContentContact      chapter={chapter} />
    default:             return <ContentHero         chapter={chapter} />
  }
}

/* ─────────────────────────────────────────────────────────────────────
   Chapter Bridge
   ───────────────────────────────────────────────────────────────────── */
const BRIDGES = [
  'अन्तः अस्ति प्रारम्भः', 'योगः कर्मसु कौशलम्', 'सत्यमेव जयते',
  'सर्वं खल्विदं ब्रह्म', 'तत् त्वम् असि', 'अहं ब्रह्मास्मि',
  'चरैवेति चरैवेति', 'नमस्ते सदा वत्सले मातृभूमे',
]

export function BridgeShloka({ chapter }) {
  const ref   = useRef(null)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const trig = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 82%',
      once: true,
      onEnter: () => setFired(true),
    })
    return () => trig.kill()
  }, [])

  /* 8 burst dots — compass + diagonal */
  const BURST = [
    { x:  0, y: -34 }, { x: 24, y: -24 }, { x: 34, y:  0 }, { x: 24, y: 24 },
    { x:  0, y:  34 }, { x:-24, y:  24 }, { x:-34, y:  0 }, { x:-24, y:-24 },
  ]

  return (
    <div ref={ref} className="bridge-shloka" style={{ position: 'relative', padding: '56px 20px' }}>

      {/* ── Burst particles — fire once on scroll entry ── */}
      {fired && BURST.map(({ x, y }, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          marginTop: -1.5, marginLeft: -1.5,
          width: 3, height: 3,
          borderRadius: '50%',
          background: chapter.accent,
          '--bx': `${x}px`,
          '--by': `${y}px`,
          animation: `burstFly 1.5s ${i * 0.055}s ease-out both`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Top: draw-in lines + OM ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '18px', marginBottom: '20px',
      }}>
        <div style={{
          height: '0.5px',
          width: fired ? '115px' : '0px',
          background: `linear-gradient(to left, ${chapter.accent}65, transparent)`,
          transition: 'width 1.15s cubic-bezier(0.22,1,0.36,1) 0.25s',
          flexShrink: 0,
        }} />

        <div style={{
          fontFamily: F.cinzel,
          fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
          color: chapter.accent,
          opacity: fired ? 0.52 : 0,
          transition: 'opacity 0.9s ease 0.95s',
          animation: fired ? 'omBreathe 4.5s ease-in-out 1.9s infinite' : 'none',
          lineHeight: 1,
          textShadow: fired ? `0 0 28px ${hexToRgba(chapter.accent, 0.5)}` : 'none',
        }}>ॐ</div>

        <div style={{
          height: '0.5px',
          width: fired ? '115px' : '0px',
          background: `linear-gradient(to right, ${chapter.accent}65, transparent)`,
          transition: 'width 1.15s cubic-bezier(0.22,1,0.36,1) 0.25s',
          flexShrink: 0,
        }} />
      </div>

      {/* ── Sanskrit bridge text ── */}
      <div style={{
        fontFamily: F.cinzel,
        fontSize: 'clamp(0.72rem, 0.98vw, 0.88rem)',
        letterSpacing: '0.34em',
        color: hexToRgba(chapter.accent, 0.42),
        textAlign: 'center',
        opacity: fired ? 1 : 0,
        transition: 'opacity 0.9s ease 1.35s',
        textShadow: fired ? `0 0 16px ${hexToRgba(chapter.accent, 0.20)}` : 'none',
      }}>
        {BRIDGES[(chapter.id - 1) % BRIDGES.length]}
      </div>

      {/* ── Bottom accent dots ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '10px', marginTop: '20px',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === 1 ? 4 : 3, height: i === 1 ? 4 : 3,
            borderRadius: '50%',
            background: chapter.accent,
            opacity: fired ? (i === 1 ? 0.48 : 0.22) : 0,
            transition: `opacity 0.5s ease ${0.85 + i * 0.14}s`,
            animation: fired && i === 1 ? 'diamondPulse 3.5s ease-in-out 1.6s infinite' : 'none',
          }} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Floating Sacred Symbols — continuous ambient per section
   ───────────────────────────────────────────────────────────────────── */
const SACRED_SYMS = ['ॐ', '◆', '✦', '∞', '◈', '△', '◇', '✧']

function FloatingSacred({ chapter }) {
  const id = chapter.id
  const items = Array.from({ length: 4 }, (_, i) => ({
    sym:   SACRED_SYMS[(id + i * 3) % SACRED_SYMS.length],
    left:  `${(id * 13 + i * 17) % 78 + 7}%`,
    top:   `${(id * 19 + i * 23) % 66 + 8}%`,
    size:  `${9 + (i % 3) * 5}px`,
    op:    0.042 + (i % 3) * 0.016,
    sdY:   `-${22 + i * 10}px`,
    sdR:   `${(id + i) % 2 === 0 ? '' : '-'}${i * 9 + 4}deg`,
    dur:   `${6.5 + i * 1.5}s`,
    delay: `${i * 1.1}s`,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 3 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: it.left, top: it.top,
          fontFamily: F.cinzel,
          fontSize: it.size,
          color: chapter.accent,
          '--sd-op': it.op,
          '--sd-y': it.sdY,
          '--sd-r': it.sdR,
          animation: `sacredDrift ${it.dur} ${it.delay} ease-in-out infinite`,
          userSelect: 'none',
        }}>{it.sym}</div>
      ))}
    </div>
  )
}


/* ─────────────────────────────────────────────────────────────────────
   Mobile Sacred Folio Opener  (visible only on mobile ≤ 768px)
   Full-screen chapter cover card: art + Roman numeral + editorial word + shloka
   ───────────────────────────────────────────────────────────────────── */
function MobileOpener({ chapter }) {
  return (
    <div className="mobile-opener">
      {/* Full-bleed chapter art */}
      <img
        src={chapter.artImage}
        alt=""
        loading="lazy"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 15%',
          zIndex: 0,
        }}
      />

      {/* Gradient: transparent top → full dark bottom */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(3,8,16,0.08) 30%, rgba(3,8,16,0.68) 52%, rgba(3,8,16,0.96) 72%, rgba(3,8,16,1) 100%)',
      }} />

      {/* Accent line at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px', background: chapter.accent,
        zIndex: 5, opacity: 0.9,
        boxShadow: `0 0 14px ${hexToRgba(chapter.accent, 0.7)}`,
      }} />

      {/* Roman numeral watermark — centred, enormous, very faint */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -52%)',
        fontFamily: F.cinzelD, fontWeight: 700,
        fontSize: 'clamp(7rem, 40vw, 15rem)',
        color: hexToRgba(chapter.accent, 0.055),
        letterSpacing: '0.02em', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', zIndex: 2,
      }}>
        {ROMAN[chapter.id - 1]}
      </div>

      {/* Chapter label — top centre */}
      <div style={{
        position: 'absolute', top: 24, left: 0, right: 0,
        textAlign: 'center', zIndex: 5,
        fontFamily: F.cinzel, fontSize: '7px',
        letterSpacing: '0.5em', textTransform: 'uppercase',
        color: hexToRgba(chapter.accent, 0.7),
      }}>
        {chapter.num} · {chapter.sanskrit}
      </div>

      {/* Bottom cluster — editorial word, name, shloka, scroll cue */}
      <div className="mob-cluster" style={{
        position: 'relative', zIndex: 5,
        padding: '0 24px 52px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', gap: '12px',
      }}>
        {/* Editorial word — gold shimmer */}
        <div className="mob-word" style={{
          fontFamily: F.cinzel, fontWeight: 900,
          fontSize: 'clamp(3rem, 15vw, 5rem)',
          letterSpacing: '0.06em', lineHeight: 0.92,
          background: `linear-gradient(90deg, ${chapter.accent} 0%, #f5e090 50%, ${chapter.accent} 100%)`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmerMove 3s linear infinite',
        }}>
          {chapter.editorialWord}
        </div>

        {/* Chapter name */}
        <div className="mob-chname" style={{
          fontFamily: F.corm, fontStyle: 'italic',
          fontSize: 'clamp(1rem, 4vw, 1.35rem)',
          color: 'rgba(240,230,208,0.72)',
          letterSpacing: '0.07em',
        }}>
          {chapter.name}
        </div>

        {/* Gold rule */}
        <div style={{ width: '36px', height: '1px', background: chapter.accent, opacity: 0.55 }} />

        {/* Shloka English */}
        <div style={{
          fontFamily: F.corm, fontStyle: 'italic',
          fontSize: 'clamp(0.82rem, 3.5vw, 1rem)',
          color: 'rgba(240,230,208,0.52)',
          lineHeight: 1.65, letterSpacing: '0.03em',
          maxWidth: '88%',
        }}>
          "{chapter.shlokaEn}"
        </div>

        {/* Shloka reference */}
        <div style={{
          fontFamily: F.cinzel, fontSize: '7px',
          letterSpacing: '0.38em', textTransform: 'uppercase',
          color: hexToRgba(chapter.accent, 0.48),
        }}>
          {chapter.shlokaRef}
        </div>

        {/* Scroll cue */}
        <div style={{
          marginTop: '6px',
          fontFamily: F.cinzel, fontSize: '7px',
          letterSpacing: '0.48em', textTransform: 'uppercase',
          color: hexToRgba(chapter.accent, 0.38),
          animation: 'scrollBounce 2.2s ease-in-out infinite',
        }}>
          ↓ &nbsp; READ &nbsp; ↓
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Share Chapter  — copy link to clipboard
   ───────────────────────────────────────────────────────────────────── */
function ShareChapter({ chapter }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const url = `${window.location.origin}${window.location.pathname}#chapter-${chapter.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }).catch(() => {})
  }

  return (
    <button
      onClick={copy}
      style={{
        marginTop: '28px',
        fontFamily: F.cinzel,
        fontSize: '8px',
        letterSpacing: '0.42em',
        textTransform: 'uppercase',
        color: copied ? chapter.accent : 'rgba(212,175,55,0.28)',
        background: 'none',
        border: 'none',
        padding: '6px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'color 0.35s ease',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: '6px', opacity: 0.8 }}>{copied ? '✓' : '◆'}</span>
      {copied ? 'LINK COPIED' : 'SHARE THIS CHAPTER'}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Editorial Chapter Layout  (Chapter 1 pilot)
   Magazine-spread: full-bleed image, giant word behind it, content column
   ───────────────────────────────────────────────────────────────────── */
function EditorialChapter({ chapter }) {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const contentRef = useRef(null)
  const barRef     = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  /* artPos === 'left'  → focal point on image LEFT → push content RIGHT
     artPos === 'right' or 'center' → focal point right/center → content stays LEFT */
  const contentRight = chapter.artPos === 'left'

  useEffect(() => {
    const el      = sectionRef.current
    const img     = imgRef.current
    const content = contentRef.current
    const bar     = barRef.current
    if (!el || !img || !content) return

    /* Parallax */
    const p = gsap.to(img, {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    })
    /* Content slide-in */
    const e = gsap.fromTo(content,
      { opacity: 0, x: contentRight ? 28 : -28 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 72%', once: true } }
    )
    /* Entry sweep bar — sweeps from the image-side edge across on scroll enter */
    let barTrig
    if (bar) {
      gsap.set(bar, {
        scaleX: 0, opacity: 0,
        transformOrigin: contentRight ? 'right center' : 'left center',
      })
      barTrig = ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => {
          gsap.timeline()
            .to(bar, { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power3.inOut' })
            .to(bar, { opacity: 0.15,          duration: 2.0, ease: 'power2.out' })
        },
      })
    }

    return () => { p.scrollTrigger?.kill(); e.scrollTrigger?.kill(); barTrig?.kill() }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id={`chapter-${chapter.id}`}
        className="chapter-section"
        style={{ background: chapter.fallback, padding: 0 }}
      >
        {/* ── Mobile Sacred Folio Opener — hidden on desktop via CSS ── */}
        <MobileOpener chapter={chapter} />

        {/* ── Entry sweep bar — thin gold line that draws across on scroll enter ── */}
        <div ref={barRef} style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(to right, transparent 0%, ${hexToRgba(chapter.accent, 0.85)} 20%, ${chapter.accent} 50%, ${hexToRgba(chapter.accent, 0.85)} 80%, transparent 100%)`,
          zIndex: 26, pointerEvents: 'none', opacity: 0,
          boxShadow: `0 0 12px ${hexToRgba(chapter.accent, 0.6)}, 0 0 30px ${hexToRgba(chapter.accent, 0.25)}`,
        }} />

        {/* ── Floating sacred symbols — continuous ambient ── */}
        <FloatingSacred chapter={chapter} />

        {/* ── Vertical editorial word — same style as the old horizontal,
             just rotated. z:1 behind the image for the peek-through effect.
             Positioned at the image-side edge, centred vertically. ── */}
        <div aria-hidden="true" className="editorial-word" style={{
          position: 'absolute',
          top: '50%',
          ...(contentRight ? { left: '2%' } : { right: '2%' }),
          transform: 'translateY(-50%)',
          zIndex: 1, pointerEvents: 'none', userSelect: 'none',
          fontFamily: F.cinzel, fontWeight: 900,
          fontSize: 'clamp(5rem, 14vw, 19rem)',
          letterSpacing: '0.05em', lineHeight: 0.9,
          color: hexToRgba(chapter.accent, 0.60),
          writingMode: 'vertical-rl',
          whiteSpace: 'nowrap',
        }}>
          {chapter.editorialWord}
        </div>

        {/* ── Full-bleed parallax image — z:2, partially covers the large word ── */}
        {/* Skeleton shimmer shown while image loads */}
        {!imgLoaded && (
          <div className="art-skeleton" style={{
            position: 'absolute', top: '-7.5%', left: 0,
            width: '100%', height: '115%',
            zIndex: 2,
            background: `linear-gradient(110deg, ${chapter.fallback} 30%, rgba(255,255,255,0.04) 50%, ${chapter.fallback} 70%)`,
            backgroundSize: '200% 100%',
            animation: 'imgSkeleton 1.8s ease-in-out infinite',
          }} />
        )}
        <img
          ref={imgRef}
          src={chapter.artImage} alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className="editorial-art"
          style={{
            position: 'absolute', top: '-7.5%', left: 0,
            width: '100%', height: '115%',
            objectFit: 'cover', objectPosition: 'center 28%',
            opacity: imgLoaded ? 0.90 : 0,
            transition: 'opacity 0.9s ease',
            zIndex: 2,
          }}
        />

        {/* ── C: Dark curtain — eased gradient, image bleeds more into content zone ── */}
        <div className="editorial-curtain" style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: contentRight
            ? 'linear-gradient(to left,  rgba(3,8,16,0.95) 0%, rgba(3,8,16,0.88) 22%, rgba(3,8,16,0.55) 42%, rgba(3,8,16,0.14) 62%, rgba(3,8,16,0.02) 76%, transparent 88%)'
            : 'linear-gradient(to right, rgba(3,8,16,0.95) 0%, rgba(3,8,16,0.88) 22%, rgba(3,8,16,0.55) 42%, rgba(3,8,16,0.14) 62%, rgba(3,8,16,0.02) 76%, transparent 88%)',
        }} />

        {/* ── A: Top & bottom fades — lighter top veil so image top breathes ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(3,8,16,0.32) 0%, transparent 22%, transparent 78%, rgba(3,8,16,0.88) 100%)',
        }} />

        {/* ── Accent atmosphere glow — image side (opposite to content) ── */}
        <div className="editorial-glow" style={{
          position: 'absolute', top: '50%',
          ...(contentRight ? { left: '8%' } : { right: '8%' }),
          transform: 'translateY(-50%)',
          width: '48%', height: '65%',
          background: `radial-gradient(ellipse at center, ${hexToRgba(chapter.accent, 0.18)} 0%, transparent 68%)`,
          zIndex: 3, pointerEvents: 'none',
        }} />

        {/* ── Editorial content column ── */}
        <div
          ref={contentRef}
          className="editorial-content"
          style={{
            position: 'relative', zIndex: 5,
            maxWidth: '560px',
            ...(contentRight
              ? { marginLeft: 'auto', marginRight: 'clamp(24px, 7vw, 110px)' }
              : { marginLeft: 'clamp(24px, 7vw, 110px)' }),
            paddingTop:    'clamp(160px, 26vh, 260px)',
            paddingBottom: 'clamp(60px, 7vw, 100px)',
          }}
        >
          {/* Chapter label */}
          <div className="ch-label" style={{ ...label('rgba(212,175,55,0.65)'), marginBottom: '16px' }}>
            {ROMAN[chapter.id - 1]} · {chapter.sanskrit} · {String(chapter.id).padStart(2,'0')} / XVIII
          </div>

          {/* Chapter name */}
          <h2 className="chapter-title gold-shimmer" style={{ marginBottom: '8px', lineHeight: 1.1 }}>
            {chapter.name}
          </h2>

          {/* Theme */}
          <div className="ch-theme" style={{
            fontFamily: F.josefin, fontWeight: 600,
            fontSize: 'clamp(0.80rem, 1.15vw, 1rem)',
            color: chapter.accent, letterSpacing: '0.20em',
            textTransform: 'uppercase', marginBottom: '26px',
          }}>
            — {chapter.theme}
          </div>

          {/* Gold rule */}
          <div className="ch-rule" style={{ width: '42px', height: '1px', background: chapter.accent, opacity: 0.55, marginBottom: '26px' }} />

          {/* Chapter content — routed by type, no outer glass wrapper */}
          <ChapterContent chapter={chapter} />

          {/* Share chapter link */}
          <ShareChapter chapter={chapter} />
        </div>

        {/* ── Book skin: page edge shadows (simulates paper depth) ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 3.2%), linear-gradient(to left, rgba(0,0,0,0.30) 0%, transparent 3.2%)',
          pointerEvents: 'none', zIndex: 20,
        }} />

        {/* ── Book skin: subtle parchment texture ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.9 0 0 0 0 0.78 0 0 0 0 0.55 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.025,
          mixBlendMode: 'overlay',
          pointerEvents: 'none', zIndex: 21,
        }} />

        {/* ── Book skin: page number ── */}
        <div className="page-number" style={{
          position: 'absolute', bottom: 32, right: 44,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(0.58rem, 0.82vw, 0.7rem)',
          letterSpacing: '0.22em',
          color: hexToRgba(chapter.accent, 0.38),
          zIndex: 22, pointerEvents: 'none', userSelect: 'none',
        }}>
          — {chapter.num} —
        </div>
      </section>

      <BridgeShloka chapter={chapter} />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Main ChapterSection
   ───────────────────────────────────────────────────────────────────── */
export default function ChapterSection({ chapter }) {
  /* All chapters use the editorial layout */
  return <EditorialChapter chapter={chapter} />
}
