import { useEffect, useRef, useState } from 'react'

/* ─── A single butterfly SVG ─────────────────────────────────────────── */
function Butterfly({ style, color = 'rgba(212,175,55,0.7)', size = 1, f1 = '0.8s', f2 = '0.65s' }) {
  const w = 28 * size
  const h = 20 * size
  return (
    <svg width={w} height={h} viewBox="0 0 28 20" style={style}>
      {/* Left wings */}
      <ellipse cx="8"  cy="8"  rx="7"  ry="5.5" fill={color} style={{ animation: `wingFlap ${f1} ease-in-out infinite`, transformOrigin: '14px 10px' }} />
      <ellipse cx="8"  cy="13" rx="5"  ry="3.5" fill={color} opacity="0.7" style={{ animation: `wingFlap ${f2} ease-in-out infinite`, transformOrigin: '14px 10px' }} />
      {/* Right wings */}
      <ellipse cx="20" cy="8"  rx="7"  ry="5.5" fill={color} style={{ animation: `wingFlap ${f1} ease-in-out infinite alternate`, transformOrigin: '14px 10px' }} />
      <ellipse cx="20" cy="13" rx="5"  ry="3.5" fill={color} opacity="0.7" style={{ animation: `wingFlap ${f2} ease-in-out infinite alternate`, transformOrigin: '14px 10px' }} />
      {/* Body */}
      <ellipse cx="14" cy="10" rx="1.4" ry="5.5" fill="rgba(255,240,180,0.9)" />
    </svg>
  )
}

/* ─── Butterfly field canvas (particle-built) ────────────────────────── */
function ButterflyField({ active }) {
  /* 80 butterflies at different positions, sizes, paths */
  const BUTTERFLIES = Array.from({ length: 80 }, (_, i) => {
    const angle   = (i / 80) * Math.PI * 2
    const spread  = 0.3 + (i % 5) * 0.14
    const dist    = 18 + (i % 12) * 7
    return {
      bflyX: `${Math.cos(angle) * dist * spread}vw`,
      bflyY: `${Math.sin(angle) * dist * 0.6}vh`,
      bflyS: 0.5 + (i % 4) * 0.3,
      bflyR: `${(i % 2 === 0 ? '' : '-')}${(i % 8) * 8}deg`,
      bflyOp: 0.25 + (i % 5) * 0.12,
      delay:  `${(i * 0.08) % 4}s`,
      dur:    `${3 + (i % 4)}s`,
      f1: `${0.60 + (i % 5) * 0.08}s`,
      f2: `${0.50 + (i % 4) * 0.07}s`,
      color: i % 8 === 0 ? 'rgba(255,240,180,0.8)'
           : i % 5 === 0 ? 'rgba(200,148,30,0.65)'
           : 'rgba(212,175,55,0.7)',
    }
  })

  if (!active) return null

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 4, overflow: 'hidden',
    }}>
      {BUTTERFLIES.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          '--bfly-x': b.bflyX,
          '--bfly-y': b.bflyY,
          '--bfly-s': b.bflyS,
          '--bfly-r': b.bflyR,
          '--bfly-op': b.bflyOp,
          animation: `butterflyFly ${b.dur} ${b.delay} ease-out both`,
          filter: `drop-shadow(0 0 4px ${b.color})`,
        }}>
          <Butterfly color={b.color} size={b.bflyS} f1={b.f1} f2={b.f2} />
        </div>
      ))}
    </div>
  )
}

/* ─── Human silhouette SVG ───────────────────────────────────────────── */
function HumanSilhouette({ visible }) {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 5, pointerEvents: 'none',
      opacity: visible ? 0.12 : 0,
      transition: 'opacity 2s ease 1.5s',
    }}>
      <svg width="120" height="280" viewBox="0 0 120 280">
        {/* Head */}
        <circle cx="60" cy="32" r="22" fill="rgba(212,175,55,0.9)" />
        {/* Body */}
        <ellipse cx="60" cy="110" rx="28" ry="46" fill="rgba(212,175,55,0.9)" />
        {/* Left arm */}
        <ellipse cx="26" cy="110" rx="12" ry="36" fill="rgba(212,175,55,0.9)" transform="rotate(-12 26 110)" />
        {/* Right arm */}
        <ellipse cx="94" cy="110" rx="12" ry="36" fill="rgba(212,175,55,0.9)" transform="rotate(12 94 110)" />
        {/* Left leg */}
        <ellipse cx="44" cy="215" rx="14" ry="46" fill="rgba(212,175,55,0.9)" />
        {/* Right leg */}
        <ellipse cx="76" cy="215" rx="14" ry="46" fill="rgba(212,175,55,0.9)" />
      </svg>
    </div>
  )
}

/* ─── Text content ───────────────────────────────────────────────────── */
function ClosingText({ visible }) {
  return (
    <div style={{
      position: 'relative', zIndex: 8,
      textAlign: 'center', padding: '36px 32px',
      maxWidth: '680px', margin: '0 auto',
      background: 'rgba(5,11,26,0.72)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      borderRadius: '20px',
      border: '1px solid rgba(212,175,55,0.12)',
    }}>
      {/* Sanskrit */}
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
        letterSpacing: '0.35em',
        color: 'rgba(212,175,55,0.70)',
        marginBottom: '12px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
      }}>
        सर्वं खल्विदं ब्रह्म
      </div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
        lineHeight: 1.75,
        color: 'rgba(240,230,208,0.78)',
        marginBottom: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
      }}>
        Everything is connected. Everything flows from one source.<br />
        Every thought you carry changes everything.
      </div>

      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
        letterSpacing: '0.08em',
        color: 'rgba(240,230,208,0.95)',
        marginBottom: '10px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
      }}>
        You Are the Center.
      </div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
        color: 'rgba(240,230,208,0.62)',
        marginBottom: '28px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.55s',
      }}>
        You are the butterfly whose wings are changing India.
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
        fontWeight: 700,
        letterSpacing: '0.34em',
        background: 'linear-gradient(90deg, #8a6010 0%, #c8941e 15%, #f0c040 35%, #f5e090 50%, #f0c040 65%, #c8941e 85%, #8a6010 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: visible ? 'shimmerMove 3.2s linear infinite' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.7s',
        marginBottom: '6px',
      }}>
        ROHIT SWERASHI
      </div>

      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(8px, 0.9vw, 10px)',
        letterSpacing: '0.50em',
        color: 'rgba(212,175,55,0.50)',
        marginBottom: '28px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 0.85s',
      }}>
        THE STORY OF BECOMING · 2025
      </div>

      {/* Connect buttons */}
      <div style={{
        display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 1.0s',
      }}>
        {[
          { label: 'Email', href: 'mailto:rohitswerashi@thegenios.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/rohitswerashi' },
          { label: 'Twitter', href: 'https://twitter.com/RohitSwerashi' },
          { label: 'Topmate', href: 'https://topmate.io/rohitswerashi' },
          { label: 'TheGenios', href: 'https://thegenios.com' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(9px, 0.85vw, 11px)',
              letterSpacing: '0.18em',
              color: 'rgba(5,11,26,0.95)',
              textDecoration: 'none',
              padding: '10px 18px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.85) 0%, rgba(180,140,25,0.82) 100%)',
              border: '1px solid rgba(212,175,55,0.60)',
              borderRadius: '8px',
              boxShadow: '0 3px 12px rgba(212,175,55,0.25)',
              fontWeight: 700,
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #f0c040 0%, #d4af37 100%)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.85) 0%, rgba(180,140,25,0.82) 100%)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(212,175,55,0.25)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ButterflyClosing ──────────────────────────────────────────── */
export default function ButterflyClosing() {
  const sectionRef  = useRef(null)
  const [active, setActive]   = useState(false)
  const [textOn, setTextOn]   = useState(false)
  const [silhouette, setSil]  = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          setTimeout(() => setSil(true), 600)
          setTimeout(() => setTextOn(true), 200)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(16,10,2,1) 0%, rgba(5,11,26,1) 100%)',
        padding: 'clamp(60px, 10vh, 120px) clamp(16px, 4vw, 40px)',
      }}
    >
      {/* Final section background image */}
      <img src="/images/final-art.webp" alt="" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '115%', top: '-7.5%',
        objectFit: 'cover', objectPosition: 'center center',
        opacity: 0.12, pointerEvents: 'none', zIndex: 0,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskComposite: 'destination-in',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskComposite: 'intersect',
      }} />

      {/* Warm background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', height: '50%',
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Butterfly field */}
      <ButterflyField active={active} />

      {/* Human silhouette (becomes visible after butterflies) */}
      <HumanSilhouette visible={silhouette} />

      {/* Text */}
      <ClosingText visible={textOn} />

      {/* ── Back cover: hardcover frame ── */}
      <div style={{
        position: 'absolute', inset: '18px',
        border: '1px solid rgba(212,175,55,0.10)',
        pointerEvents: 'none', zIndex: 8,
      }} />
      <div style={{
        position: 'absolute', inset: '28px',
        border: '1px solid rgba(212,175,55,0.05)',
        pointerEvents: 'none', zIndex: 8,
      }} />


      {/* Page edge shadows */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.32) 0%, transparent 3%), linear-gradient(to left, rgba(0,0,0,0.32) 0%, transparent 3%)',
        pointerEvents: 'none', zIndex: 10,
      }} />

      {/* Very bottom: final OM */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
        letterSpacing: '0.45em',
        color: 'rgba(212,175,55,0.18)',
        opacity: textOn ? 1 : 0,
        transition: 'opacity 1.2s ease 1.2s',
        zIndex: 11,
      }}>
        ॥ हरि ॐ तत् सत् ॥
      </div>
    </section>
  )
}
