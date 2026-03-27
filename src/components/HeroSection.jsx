import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Dawn horizon glow behind the hero image ────────────────────────── */
function DawnGlow() {
  return (
    <div style={{
      position: 'absolute', bottom: '10%', left: '50%',
      transform: 'translateX(-50%)',
      width: '80%', height: '28%',
      background: 'radial-gradient(ellipse at 50% 100%, rgba(200,148,30,0.32) 0%, rgba(212,120,20,0.14) 40%, transparent 70%)',
      pointerEvents: 'none', zIndex: 3,
      animation: 'horizonGlow 8s ease-in-out infinite',
    }} />
  )
}

/* ── Floating gold dust particles over the hero image ───────────────── */
function HeroDust() {
  const DUST = Array.from({ length: 35 }, (_, i) => ({
    left:  `${(i * 11.3 + 7) % 90 + 5}%`,
    top:   `${(i * 13.7 + 12) % 75 + 12}%`,
    delay: `${(i * 0.45) % 6}s`,
    size:  0.8 + (i % 4) * 0.4,
    opacity: 0.08 + (i % 5) * 0.03,
    dur:   `${5 + (i % 5) * 2}s`,
  }))

  return (
    <>
      {DUST.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: d.left, top: d.top,
          width: `${d.size}px`, height: `${d.size}px`,
          borderRadius: '50%',
          background: 'rgba(212,175,55,1)',
          opacity: 0,
          pointerEvents: 'none', zIndex: 4,
          '--max-op': d.opacity,
          '--sway': `${(i%2===0?'':'-')}${12+i%8*3}px`,
          animation: `particleDrift ${d.dur} ${d.delay} ease-in-out infinite`,
        }} />
      ))}
    </>
  )
}

/* ── Large background Sudarshana Chakra for hero ────────────────────── */
function HeroChakra() {
  const blades = Array.from({ length: 16 }, (_, i) => (
    <path
      key={i}
      d="M 0,-280 C 32,-210 26,-185 16,-158 L 0,-146 L -16,-158 C -26,-185 -32,-210 0,-280 Z"
      fill="rgba(212,175,55,0.5)"
      transform={`rotate(${i * 22.5})`}
    />
  ))
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '65vw', height: '65vw',
      maxWidth: '800px', maxHeight: '800px',
      zIndex: 3, pointerEvents: 'none',
      opacity: 0.04,
      animation: 'chakraSpin 60s linear infinite',
    }}>
      <svg viewBox="-300 -300 600 600" width="100%" height="100%">
        {blades}
        <circle r="140" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="3" />
        <circle r="158" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1.2" />
      </svg>
    </div>
  )
}

/* ── Name treatment ─────────────────────────────────────────────────── */
function HeroName({ visible }) {
  if (!visible) return null

  const dirs = {
    R: 'translateX(-130px) translateY(-90px)',
    O: 'translateX(110px) translateY(-110px)',
    H: 'translateX(-70px) translateY(110px)',
    I: 'translateX(90px) translateY(90px)',
    T: 'translateX(-110px) translateY(-50px)',
    ' ': null,
    S: 'translateX(-60px) translateY(100px)',
    W: 'translateX(90px) translateY(-80px)',
    E: 'translateX(-100px) translateY(-100px)',
    A: 'translateX(80px) translateY(110px)',
    R2: 'translateX(-90px) translateY(-70px)',
    A2: 'translateX(100px) translateY(80px)',
    S2: 'translateX(-75px) translateY(100px)',
    H2: 'translateX(85px) translateY(-90px)',
    I2: 'translateX(-80px) translateY(-80px)',
  }

  const line1 = ['R','O','H','I','T']
  const line2 = ['S','W','E','R','A','S','H','I']

  const letterStyle = (from, idx) => ({
    display: 'inline-block',
    opacity: 1,
    transform: 'translateX(0) translateY(0)',
    filter: 'blur(0)',
    animation: `letterArrive 0.9s cubic-bezier(0.22,1,0.36,1) ${0.1 + idx * 0.09}s both`,
    '--from-transform': from,
  })

  return (
    <div style={{ textAlign: 'center', zIndex: 6, position: 'relative' }}>
      {/* Pre-title */}
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(9px, 1.1vw, 13px)',
        letterSpacing: '0.6em',
        color: 'rgba(212,175,55,0.45)',
        marginBottom: '24px',
        animation: 'riseUp 1s ease 0.3s both',
      }}>
        ॥ श्रीमद्भगवद्गीता ॥
      </div>

      {/* ROHIT */}
      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
        fontWeight: 700,
        letterSpacing: '0.42em',
        lineHeight: 1,
        background: 'linear-gradient(90deg, #8a6010 0%, #c8941e 15%, #f0c040 35%, #f5e090 50%, #f0c040 65%, #c8941e 85%, #8a6010 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmerMove 3.2s linear infinite',
      }}>
        {line1.map((l, i) => (
          <span key={i} style={letterStyle(dirs[l], i)}>{l}</span>
        ))}
      </div>

      {/* SWERASHI */}
      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
        fontWeight: 700,
        letterSpacing: '0.42em',
        lineHeight: 1.1,
        background: 'linear-gradient(90deg, #8a6010 0%, #c8941e 15%, #f0c040 35%, #f5e090 50%, #f0c040 65%, #c8941e 85%, #8a6010 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmerMove 3.2s linear 0.5s infinite',
      }}>
        {line2.map((l, i) => (
          <span key={i} style={letterStyle(dirs[i === 4 ? 'A2' : i === 5 ? 'S2' : i === 6 ? 'H2' : i === 7 ? 'I2' : l], 5 + i)}>{l}</span>
        ))}
      </div>

      {/* Subtitle */}
      <div style={{
        marginTop: '22px',
        fontFamily: "'Cinzel Decorative', serif",
        fontWeight: 700,
        fontSize: 'clamp(0.7rem, 1.1vw, 0.95rem)',
        color: 'rgba(240,230,208,0.65)',
        letterSpacing: '0.22em',
        animation: 'riseUp 1.2s ease 1.2s both',
      }}>
        I Build
        &nbsp;<span style={{ color: 'rgba(212,175,55,0.9)', fontSize: '0.7em', animation: 'diamondPulse 3s ease-in-out infinite', textShadow: '0 0 8px rgba(212,175,55,0.9), 0 0 18px rgba(212,175,55,0.6), 0 0 32px rgba(212,175,55,0.3)' }}>✦</span>&nbsp;
        I Serve
        &nbsp;<span style={{ color: 'rgba(212,175,55,0.9)', fontSize: '0.7em', animation: 'diamondPulse 3s ease-in-out 1s infinite', textShadow: '0 0 8px rgba(212,175,55,0.9), 0 0 18px rgba(212,175,55,0.6), 0 0 32px rgba(212,175,55,0.3)' }}>✦</span>&nbsp;
        I Believe
      </div>

      {/* The story line */}
      <div style={{
        marginTop: '32px',
        maxWidth: '520px',
        margin: '32px auto 0',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
        lineHeight: 1.9,
        color: 'rgba(240,230,208,0.5)',
        letterSpacing: '0.04em',
        animation: 'riseUp 1.2s ease 1.6s both',
      }}>
        This is not a portfolio.<br />
        This is the Bhagavad Gita of one man's life.<br />
        <span style={{ color: 'rgba(212,175,55,0.5)', fontStyle: 'italic' }}>
          18 chapters. Every battle fought. Every lesson learned. Still fighting.
        </span>
      </div>

      {/* Scroll hint */}
      <div style={{
        marginTop: '52px',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(8px, 0.95vw, 11px)',
        letterSpacing: '0.55em',
        color: 'rgba(212,175,55,0.38)',
        animation: 'scrollBounce 2.2s ease-in-out 2.2s infinite, riseUp 1s ease 2.2s both',
      }}>
        ↓ &nbsp;&nbsp; SCROLL TO BEGIN &nbsp;&nbsp; ↓
      </div>
    </div>
  )
}

/* ── Main Hero Section ───────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)

  useEffect(() => {
    const el  = sectionRef.current
    const img = imgRef.current
    if (!el || !img) return

    /* Parallax — hero image scrolls at 0.45x speed (pulls back as you scroll) */
    const tl = gsap.to(img, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="book-hero"
      style={{
        position: 'relative',
        width: '100%', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Hero background image */}
      <img
        ref={imgRef}
        src="/images/hero-art.webp"
        alt=""
        decoding="async"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '115%',
          objectFit: 'cover', objectPosition: 'center center',
          top: '-7.5%',
          pointerEvents: 'none',
          animation: 'heroArtReveal 2.8s ease 0.5s both',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%), linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskComposite: 'destination-in',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%), linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          maskComposite: 'intersect',
          zIndex: 1,
        }}
      />

      {/* Dawn horizon glow */}
      <DawnGlow />

      {/* Hero chakra overlay */}
      <HeroChakra />

      {/* Floating dust */}
      <HeroDust />

      {/* ── Hardcover frame — double-border book cover feel ── */}
      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: '18px',
        border: '1px solid rgba(212,175,55,0.14)',
        pointerEvents: 'none', zIndex: 7,
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '28px',
        border: '1px solid rgba(212,175,55,0.07)',
        pointerEvents: 'none', zIndex: 7,
      }} />
      {/* Corner ornaments — TL */}
      <svg width="28" height="28" style={{ position: 'absolute', top: 22, left: 22, zIndex: 8, opacity: 0.45, pointerEvents: 'none' }} viewBox="0 0 28 28">
        <path d="M2 2 L16 2 L16 3.5 L3.5 3.5 L3.5 16 L2 16 Z" fill="rgba(212,175,55,0.8)" />
        <circle cx="2" cy="2" r="1.2" fill="rgba(212,175,55,0.9)" />
      </svg>
      {/* Corner ornaments — TR */}
      <svg width="28" height="28" style={{ position: 'absolute', top: 22, right: 22, zIndex: 8, opacity: 0.45, pointerEvents: 'none', transform: 'scaleX(-1)' }} viewBox="0 0 28 28">
        <path d="M2 2 L16 2 L16 3.5 L3.5 3.5 L3.5 16 L2 16 Z" fill="rgba(212,175,55,0.8)" />
        <circle cx="2" cy="2" r="1.2" fill="rgba(212,175,55,0.9)" />
      </svg>
      {/* Corner ornaments — BL */}
      <svg width="28" height="28" style={{ position: 'absolute', bottom: 22, left: 22, zIndex: 8, opacity: 0.45, pointerEvents: 'none', transform: 'scaleY(-1)' }} viewBox="0 0 28 28">
        <path d="M2 2 L16 2 L16 3.5 L3.5 3.5 L3.5 16 L2 16 Z" fill="rgba(212,175,55,0.8)" />
        <circle cx="2" cy="2" r="1.2" fill="rgba(212,175,55,0.9)" />
      </svg>
      {/* Corner ornaments — BR */}
      <svg width="28" height="28" style={{ position: 'absolute', bottom: 22, right: 22, zIndex: 8, opacity: 0.45, pointerEvents: 'none', transform: 'scale(-1)' }} viewBox="0 0 28 28">
        <path d="M2 2 L16 2 L16 3.5 L3.5 3.5 L3.5 16 L2 16 Z" fill="rgba(212,175,55,0.8)" />
        <circle cx="2" cy="2" r="1.2" fill="rgba(212,175,55,0.9)" />
      </svg>
      {/* Top centre — book series label */}
      <div style={{
        position: 'absolute', top: 38, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(7px, 0.82vw, 9px)',
        letterSpacing: '0.55em',
        color: 'rgba(212,175,55,0.72)',
        zIndex: 8, pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        THE BHAGAVAD GITA OF ONE LIFE
      </div>
      {/* Page edge shadows */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.32) 0%, transparent 3%), linear-gradient(to left, rgba(0,0,0,0.32) 0%, transparent 3%)',
        pointerEvents: 'none', zIndex: 9,
      }} />

      {/* Name and content */}
      <div className="hero-content" style={{
        position: 'relative', zIndex: 6,
        padding: '80px 40px',
        maxWidth: '900px', width: '100%',
        textAlign: 'center',
      }}>
        <HeroName visible={true} />
      </div>
    </section>
  )
}
