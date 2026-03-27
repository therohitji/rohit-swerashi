import {
  ABOUT, SKILLS_WEAPONS, TIMELINE, EDUCATION, MENTORSHIP, DISCIPLINE,
  GENIOS, CORE_VALUES, ALL_PROJECTS, ACHIEVEMENTS, VISION, PASSION_STORIES,
  BODY_OF_WORK, PERSONALITY, LEADERSHIP, PRINCIPLES, TESTIMONIALS, CONTACT_LINKS,
} from '../data/chapters'

/* ── Parchment ink palette ─────────────────────────────────────────── */
const INK = '#2a1a08'
const MID = 'rgba(42,26,8,0.52)'
const DIM = 'rgba(42,26,8,0.28)'

/* ── Micro components ─────────────────────────────────────────────── */

function Label({ children, accent }) {
  return (
    <div style={{
      fontFamily: 'Cinzel, serif',
      fontSize: 'clamp(0.5rem, 0.82vw, 0.62rem)',
      letterSpacing: '0.32em',
      color: accent,
      textTransform: 'uppercase',
      opacity: 0.8,
      marginBottom: '0.38rem',
    }}>{children}</div>
  )
}

function P({ children, style }) {
  return (
    <p style={{
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontSize: 'clamp(0.68rem, 1.05vw, 0.82rem)',
      lineHeight: 1.82,
      color: INK,
      margin: '0 0 0.4rem',
      ...style,
    }}>{children}</p>
  )
}

function BQ({ children, accent }) {
  return (
    <div style={{
      borderLeft: `1.5px solid ${accent}55`,
      paddingLeft: '0.7rem',
      margin: '0.45rem 0',
    }}>
      <P style={{ fontStyle: 'italic', color: MID, marginBottom: 0 }}>{children}</P>
    </div>
  )
}

function Line({ accent }) {
  return <div style={{ height: '0.5px', background: `${accent}28`, margin: '0.55rem 0' }} />
}

function Chip({ value, label, accent }) {
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
      padding: '0.28rem 0.5rem',
      border: `0.5px solid ${accent}40`,
      marginRight: '0.38rem', marginBottom: '0.38rem', minWidth: 44,
    }}>
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: 'clamp(0.7rem, 1.1vw, 0.84rem)',
        color: accent, fontWeight: 700, lineHeight: 1.2,
      }}>{value}</span>
      {label && (
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(0.44rem, 0.68vw, 0.54rem)',
          color: DIM, letterSpacing: '0.07em',
          textTransform: 'uppercase', lineHeight: 1.4, textAlign: 'center',
        }}>{label}</span>
      )}
    </div>
  )
}

function Tag({ children, accent }) {
  return (
    <span style={{
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)',
      color: INK,
      padding: '0.15rem 0.38rem',
      border: `0.5px solid ${accent}30`,
      display: 'inline-block',
    }}>{children}</span>
  )
}

function Page({ children }) {
  return (
    <div style={{ width: '100%', padding: '0.5rem 1.5rem 0.8rem' }}>
      {children}
    </div>
  )
}

/* ── Chapter 01 — The Warrior Arrives ─────────────────────────────── */
function HeroPage({ accent }) {
  const para = ABOUT.bio.split('\n\n')
  return (
    <Page>
      <Label accent={accent}>The Story</Label>
      <BQ accent={accent}>{ABOUT.tagline}</BQ>
      <Line accent={accent} />
      <P>{para[0]}</P>
      <P>{para[1]}</P>
      <P style={{ color: MID, fontStyle: 'italic' }}>
        Every rejection, every failed launch, every hard pivot shaped the belief: real innovation happens when you build for those who are overlooked.
      </P>
      <Line accent={accent} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ABOUT.stats.map((s, i) => <Chip key={i} value={s.value} label={s.label} accent={accent} />)}
      </div>
    </Page>
  )
}

/* ── Chapter 02 — The Weapons ─────────────────────────────────────── */
function WeaponsPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Six Weapons</Label>
      <Line accent={accent} />
      {SKILLS_WEAPONS.map((s, i) => (
        <div key={i} style={{ marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.14rem' }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.54rem, 0.86vw, 0.66rem)',
              color: INK, letterSpacing: '0.06em',
            }}>{s.name}</span>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.48rem, 0.74vw, 0.58rem)',
              color: accent, opacity: 0.75,
            }}>{s.level}</span>
          </div>
          <div style={{ height: '1px', background: `${accent}18`, position: 'relative', marginBottom: '0.18rem' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${s.level}%`, background: `${accent}65`,
            }} />
          </div>
          <P style={{ fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)', color: MID, marginBottom: 0 }}>{s.detail}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 03 — The Journey ─────────────────────────────────────── */
function TimelinePage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Timeline</Label>
      <Line accent={accent} />
      {TIMELINE.map((t, i) => (
        <div key={i} style={{
          display: 'flex', gap: '0.65rem',
          marginBottom: '0.52rem',
          paddingLeft: '0.55rem',
          borderLeft: `1px solid ${accent}${t.status === 'victory' || t.status === 'now' ? '55' : '28'}`,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', marginBottom: '0.08rem' }}>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.5rem, 0.78vw, 0.6rem)',
                color: accent, opacity: 0.78,
                minWidth: 50,
              }}>{t.year}</span>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)',
                color: INK, letterSpacing: '0.06em',
              }}>{t.title}</span>
            </div>
            <P style={{ fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)', marginBottom: 0 }}>
              {t.desc.split('"')[0].split('. ').slice(0, 2).join('. ')}.
            </P>
          </div>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 04 — The Education ───────────────────────────────────── */
function EducationPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Formal Path</Label>
      {EDUCATION.formal.map((e, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <P style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.56rem, 0.88vw, 0.68rem)', marginBottom: '0.08rem' }}>{e.name}</P>
          <P style={{ fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)', color: MID, marginBottom: '0.1rem' }}>{e.location}</P>
          <BQ accent={accent}>{e.note.replace(/"/g, '')}</BQ>
        </div>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>The Real School</Label>
      <P style={{ fontStyle: 'italic', color: MID, marginBottom: '0.4rem' }}>{EDUCATION.motto}</P>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {EDUCATION.realSchool.map((s, i) => <Tag key={i} accent={accent}>{s}</Tag>)}
      </div>
    </Page>
  )
}

/* ── Chapter 05 — The Mentorship ─────────────────────────────────── */
function MentorshipPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Seva</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {MENTORSHIP.stats.map((s, i) => <Chip key={i} value={s.value} label={s.label} accent={accent} />)}
      </div>
      <Line accent={accent} />
      <Label accent={accent}>Mentee Destinations</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
        {MENTORSHIP.menteeDestinations.map((d, i) => (
          <span key={i} style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(0.58rem, 0.9vw, 0.7rem)',
            color: accent, opacity: 0.85,
            padding: '0.14rem 0.38rem',
            border: `0.5px solid ${accent}35`,
          }}>{d}</span>
        ))}
      </div>
      <Line accent={accent} />
      <Label accent={accent}>Communities</Label>
      {MENTORSHIP.communities.map((c, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.28rem' }}>
          <P style={{ marginBottom: 0 }}>{c.name}</P>
          <P style={{ marginBottom: 0, color: accent, opacity: 0.75, fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)' }}>{c.members}</P>
        </div>
      ))}
      <Line accent={accent} />
      <BQ accent={accent}>{MENTORSHIP.quote}</BQ>
    </Page>
  )
}

/* ── Chapter 06 — Discipline ─────────────────────────────────────── */
function DisciplinePage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Practice</Label>
      <BQ accent={accent}>{DISCIPLINE.transformation}</BQ>
      <Line accent={accent} />
      {DISCIPLINE.principles.map((p, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.5rem, 0.76vw, 0.6rem)',
              color: accent, opacity: 0.72,
              minWidth: 76, lineHeight: 1.8, flexShrink: 0,
            }}>{p.time}</span>
            <P style={{ marginBottom: 0 }}>{p.label}</P>
          </div>
        </div>
      ))}
      <Line accent={accent} />
      <BQ accent={accent}>{DISCIPLINE.quote.replace(/"/g, '')}</BQ>
    </Page>
  )
}

/* ── Chapter 07 — GeniOS ─────────────────────────────────────────── */
function GeniosPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>GeniOS</Label>
      <BQ accent={accent}>{GENIOS.tagline}</BQ>
      <P style={{ fontStyle: 'italic', color: MID }}>{GENIOS.problem}</P>
      <P style={{ color: INK }}>{GENIOS.solution}</P>
      <Line accent={accent} />
      <Label accent={accent}>Products</Label>
      {GENIOS.products.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.28rem', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)',
            color: INK, minWidth: 86, flexShrink: 0,
          }}>{p.name}</span>
          <P style={{ marginBottom: 0, color: MID, fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)' }}>— {p.desc}</P>
        </div>
      ))}
      <Line accent={accent} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem' }}>
        {GENIOS.badges.map((b, i) => <Tag key={i} accent={accent}>{b}</Tag>)}
      </div>
    </Page>
  )
}

/* ── Chapter 08 — Core Values ────────────────────────────────────── */
function CoreValuesPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Dharma</Label>
      <Line accent={accent} />
      {CORE_VALUES.map((v, i) => (
        <div key={i} style={{ marginBottom: '0.48rem' }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.52rem, 0.82vw, 0.63rem)',
            color: accent, letterSpacing: '0.1em', marginBottom: '0.1rem',
          }}>{v.icon} {v.title}</div>
          <P style={{ marginBottom: 0, paddingLeft: '0.75rem' }}>{v.desc}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 09 — All Projects ───────────────────────────────────── */
function AllProjectsPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Six Creations</Label>
      <Line accent={accent} />
      {ALL_PROJECTS.map((p, i) => (
        <div key={i} style={{
          marginBottom: '0.52rem',
          paddingBottom: '0.52rem',
          borderBottom: i < ALL_PROJECTS.length - 1 ? `0.5px solid ${accent}20` : 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.08rem' }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.56rem, 0.88vw, 0.68rem)',
              color: p.accent || accent, letterSpacing: '0.06em',
            }}>{p.num} — {p.title}</span>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.44rem, 0.68vw, 0.54rem)',
              color: accent, opacity: 0.6, letterSpacing: '0.1em',
            }}>{p.status}</span>
          </div>
          <P style={{ marginBottom: '0.12rem', color: MID, fontSize: 'clamp(0.54rem, 0.84vw, 0.64rem)' }}>{p.subtitle}</P>
          <P style={{ marginBottom: 0, fontSize: 'clamp(0.5rem, 0.78vw, 0.6rem)', color: DIM }}>{p.stats}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 10 — Achievements ───────────────────────────────────── */
function AchievementsPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Global Stages</Label>
      {ACHIEVEMENTS.global.map((a, i) => (
        <div key={i} style={{ marginBottom: '0.38rem' }}>
          <P style={{ marginBottom: 0 }}>{a.title}</P>
          <P style={{ marginBottom: 0, color: MID, fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)' }}>{a.detail}</P>
        </div>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>National Recognition</Label>
      {ACHIEVEMENTS.national.slice(0, 5).map((a, i) => (
        <P key={i} style={{ marginBottom: '0.28rem' }}>
          {a.title}{a.detail ? ` — ${a.detail}` : ''}
        </P>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>Fellowships</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem' }}>
        {ACHIEVEMENTS.fellowships.map((f, i) => (
          <Tag key={i} accent={accent}>{f.title}{f.detail ? ` · ${f.detail}` : ''}</Tag>
        ))}
      </div>
    </Page>
  )
}

/* ── Chapter 11 — The Vision ─────────────────────────────────────── */
function VisionPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Vishwarupa</Label>
      <BQ accent={accent}>{VISION.headline}</BQ>
      <Line accent={accent} />
      {VISION.text.split('\n\n').map((para, i) => <P key={i}>{para}</P>)}
      <Line accent={accent} />
      <P style={{ fontStyle: 'italic', color: MID }}>{VISION.indiaAngle}</P>
      <Line accent={accent} />
      <P style={{ fontStyle: 'italic', color: MID }}>{VISION.impact}</P>
      <Line accent={accent} />
      <BQ accent={accent}>{VISION.shloka}</BQ>
    </Page>
  )
}

/* ── Chapter 12 — Why He Builds ──────────────────────────────────── */
function PassionPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Why He Builds</Label>
      <Line accent={accent} />
      {PASSION_STORIES.map((s, i) => (
        <div key={i} style={{ marginBottom: '0.65rem' }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.54rem, 0.85vw, 0.65rem)',
            color: accent, marginBottom: '0.18rem', letterSpacing: '0.1em',
          }}>{s.headline}</div>
          <P style={{ marginBottom: 0 }}>{s.story}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 13 — Body of Work ───────────────────────────────────── */
function BodyOfWorkPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Companies Founded</Label>
      {BODY_OF_WORK.companies.map((c, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.38rem' }}>
          <div>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.56rem, 0.88vw, 0.68rem)',
              color: c.active ? accent : INK,
              opacity: c.failed ? 0.5 : 1,
            }}>{c.name}</span>
            <span style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)',
              color: MID, marginLeft: '0.4rem',
            }}>{c.desc}</span>
          </div>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(0.48rem, 0.74vw, 0.58rem)', color: DIM }}>{c.period}</span>
        </div>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>Roles</Label>
      {BODY_OF_WORK.roles.slice(0, 5).map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.28rem' }}>
          <P style={{ marginBottom: 0, minWidth: 80, color: accent, opacity: 0.8 }}>{r.title}</P>
          <P style={{ marginBottom: 0, color: MID }}>— {r.org}</P>
        </div>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>Domains</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28rem' }}>
        {BODY_OF_WORK.fields.map((f, i) => <Tag key={i} accent={accent}>{f}</Tag>)}
      </div>
      <Line accent={accent} />
      <BQ accent={accent}>{BODY_OF_WORK.quote.replace(/"/g, '')}</BQ>
    </Page>
  )
}

/* ── Chapter 14 — Personality ────────────────────────────────────── */
function PersonalityPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Nature</Label>
      <Line accent={accent} />
      {PERSONALITY.whatHeKnows.map((t, i) => (
        <div key={i} style={{ marginBottom: '0.42rem' }}>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.54rem, 0.84vw, 0.65rem)',
            color: accent, letterSpacing: '0.12em',
          }}>{t.trait}</span>
          <P style={{ marginBottom: 0, paddingLeft: '0.6rem' }}>— {t.desc}</P>
        </div>
      ))}
      <Line accent={accent} />
      <Label accent={accent}>What Others Say</Label>
      {PERSONALITY.whatOthersSay.slice(0, 3).map((q, i) => <BQ key={i} accent={accent}>{q}</BQ>)}
      <Line accent={accent} />
      <P style={{ fontStyle: 'italic', color: MID }}>
        {PERSONALITY.paradox.self}<br />
        {PERSONALITY.paradox.other}<br />
        <strong style={{ fontStyle: 'normal', color: INK }}>{PERSONALITY.paradox.resolution}</strong>
      </P>
    </Page>
  )
}

/* ── Chapter 15 — Leadership ─────────────────────────────────────── */
function LeadershipPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Led</Label>
      {LEADERSHIP.led.map((l, i) => (
        <div key={i} style={{ marginBottom: '0.38rem' }}>
          <P style={{ marginBottom: 0, fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.54rem, 0.84vw, 0.65rem)', color: accent }}>{l.what}</P>
          <P style={{ marginBottom: 0, color: MID, paddingLeft: '0.55rem', fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)' }}>{l.detail}</P>
        </div>
      ))}
      <Line accent={accent} />
      <P style={{ fontStyle: 'italic', color: MID }}>{LEADERSHIP.lesson}</P>
      <Line accent={accent} />
      <div style={{ padding: '0.55rem 0.75rem', border: `0.5px solid ${accent}28`, background: `${accent}07` }}>
        <P style={{ fontStyle: 'italic', color: MID, marginBottom: '0.25rem', fontSize: 'clamp(0.58rem, 0.9vw, 0.7rem)' }}>
          {LEADERSHIP.testimonial.text}
        </P>
        <P style={{ marginBottom: 0, color: accent, opacity: 0.72, fontSize: 'clamp(0.5rem, 0.78vw, 0.6rem)' }}>
          — {LEADERSHIP.testimonial.name}, {LEADERSHIP.testimonial.role}
        </P>
      </div>
    </Page>
  )
}

/* ── Chapter 16 — Principles ─────────────────────────────────────── */
function PrinciplesPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>The Code</Label>
      <Line accent={accent} />
      {PRINCIPLES.map((p, i) => (
        <div key={i} style={{ marginBottom: '0.52rem' }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.52rem, 0.82vw, 0.63rem)',
            color: accent, letterSpacing: '0.1em', marginBottom: '0.1rem',
          }}>{p.icon} {p.title}</div>
          <P style={{ marginBottom: 0, paddingLeft: '0.75rem' }}>{p.desc}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 17 — Testimonials ───────────────────────────────────── */
function TestimonialsPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Voices of Faith</Label>
      <Line accent={accent} />
      {TESTIMONIALS.map((t, i) => (
        <div key={i} style={{
          marginBottom: '0.58rem',
          paddingBottom: '0.58rem',
          borderBottom: i < TESTIMONIALS.length - 1 ? '0.5px solid rgba(42,26,8,0.1)' : 'none',
        }}>
          <P style={{ fontStyle: 'italic', color: MID, marginBottom: '0.2rem', fontSize: 'clamp(0.6rem, 0.94vw, 0.72rem)' }}>
            {t.text}
          </P>
          <P style={{ marginBottom: 0, color: accent, opacity: 0.75, fontSize: 'clamp(0.5rem, 0.78vw, 0.6rem)' }}>— {t.name}</P>
          <P style={{ marginBottom: 0, color: DIM, fontSize: 'clamp(0.48rem, 0.72vw, 0.56rem)' }}>{t.role}</P>
        </div>
      ))}
    </Page>
  )
}

/* ── Chapter 18 — Moksha · Contact ──────────────────────────────── */
function ContactPage({ accent }) {
  return (
    <Page>
      <Label accent={accent}>Begin Together</Label>
      <BQ accent={accent}>
        This is not the end of the book. It is the beginning of your chapter in it.
      </BQ>
      <Line accent={accent} />
      {CONTACT_LINKS.map((c, i) => (
        <a
          key={i}
          href={c.href}
          target={c.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.42rem 0.6rem',
            marginBottom: '0.32rem',
            border: `0.5px solid ${accent}30`,
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${accent}12` }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.54rem, 0.84vw, 0.65rem)',
            color: accent, letterSpacing: '0.22em',
          }}>{c.label}</span>
          <span style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(0.56rem, 0.88vw, 0.68rem)',
            color: INK, fontStyle: 'italic',
          }}>{c.value}</span>
        </a>
      ))}
      <Line accent={accent} />
      <div style={{ textAlign: 'center', marginTop: '0.45rem' }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.58rem, 0.9vw, 0.7rem)',
          letterSpacing: '0.28em', color: accent, opacity: 0.55,
        }}>∞ thegenios.com ∞</span>
      </div>
    </Page>
  )
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function ChapterContent({ data }) {
  const { type, accent } = data

  switch (type) {
    case 'hero':         return <HeroPage         accent={accent} />
    case 'weapons':      return <WeaponsPage       accent={accent} />
    case 'timeline':     return <TimelinePage      accent={accent} />
    case 'education':    return <EducationPage     accent={accent} />
    case 'mentorship':   return <MentorshipPage    accent={accent} />
    case 'discipline':   return <DisciplinePage    accent={accent} />
    case 'genios':       return <GeniosPage        accent={accent} />
    case 'corevalues':   return <CoreValuesPage    accent={accent} />
    case 'allprojects':  return <AllProjectsPage   accent={accent} />
    case 'achievements': return <AchievementsPage  accent={accent} />
    case 'vision':       return <VisionPage        accent={accent} />
    case 'passion':      return <PassionPage       accent={accent} />
    case 'bodyofwork':   return <BodyOfWorkPage    accent={accent} />
    case 'personality':  return <PersonalityPage   accent={accent} />
    case 'leadership':   return <LeadershipPage    accent={accent} />
    case 'principles':   return <PrinciplesPage    accent={accent} />
    case 'testimonials': return <TestimonialsPage  accent={accent} />
    case 'contact':      return <ContactPage       accent={accent} />
    default:             return null
  }
}
