import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterContent from './ChapterContent'

gsap.registerPlugin(ScrollTrigger)

/* ── Corner ornament ── */
function Corner({ accent, flip }) {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28"
      style={{
        position: 'absolute', opacity: 0.45,
        transform: flip,
        ...(flip?.includes('scaleX') && !flip?.includes('scaleY') ? { right: 10, top: 10 } :
            flip?.includes('scaleY') && !flip?.includes('scaleX') ? { left: 10, bottom: 10 } :
            flip?.includes('scale(-1)')                           ? { right: 10, bottom: 10 } :
                                                                     { left: 10, top: 10 }),
      }}
    >
      <path d="M2 2 L14 2 L14 3.5 L3.5 3.5 L3.5 14 L2 14 Z" fill={accent} />
      <circle cx="5" cy="5" r="1.5" fill={accent} opacity="0.7" />
      <circle cx="2" cy="2" r="1" fill={accent} />
    </svg>
  )
}

/* ── Glow rings around the divine image ── */
function GlowRings({ accent }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Ambient glow sphere */}
      <div style={{
        position: 'absolute', inset: '-12%',
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center,
          ${accent}1e 0%, ${accent}0a 52%, transparent 72%)`,
        filter: 'blur(65px)',
        animation: 'symPulse 7s ease-in-out infinite',
      }} />
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: '8%',
        borderRadius: '50%',
        border: `1px solid ${accent}1a`,
        boxShadow: `0 0 90px ${accent}14, inset 0 0 70px ${accent}0a`,
        animation: 'symPulse 10s ease-in-out infinite 2.5s',
      }} />
      {/* Inner ring */}
      <div style={{
        position: 'absolute', inset: '22%',
        borderRadius: '50%',
        border: `0.5px solid ${accent}10`,
        animation: 'symPulse 8s ease-in-out infinite 1.2s',
      }} />
    </div>
  )
}

/* ── Parchment grain — pure CSS SVG noise ── */
const PARCHMENT_GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='pnoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23pnoise)'/%3E%3C/svg%3E")`

/* ── LEFT PAGE — manuscript / parchment content side ── */
function LeftPage({ chapter, isBack }) {
  return (
    <div
      id={isBack ? undefined : `chapter-${chapter.num}`}
      style={{
        width: '100%', height: '100%',
        /* Warm parchment — subtle aged gradient */
        background: 'linear-gradient(160deg, #f8f0dc 0%, #f5edd6 40%, #f2e8ce 100%)',
        borderRight: '1px solid rgba(180,140,60,0.22)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parchment grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: PARCHMENT_GRAIN,
        backgroundSize: '180px 180px',
        opacity: 0.06,
        mixBlendMode: 'multiply',
      }} />

      {/* Warm aged vignette — edges darken slightly */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(120,80,20,0.12) 100%)',
      }} />

      {/* Accent radial warm wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 22% 38%,
          ${chapter.accent}14 0%, transparent 55%)`,
      }} />

      {/* Corner ornaments — accent colour shows beautifully on parchment */}
      <Corner accent={chapter.accent} />
      <Corner accent={chapter.accent} flip="scaleX(-1)" />
      <Corner accent={chapter.accent} flip="scaleY(-1)" />
      <Corner accent={chapter.accent} flip="scale(-1)" />

      {/* Spine shadow — warm brown instead of black */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: 50,
        background: 'linear-gradient(to left, rgba(100,60,20,0.18), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Chapter label — top */}
      <div style={{
        position: 'absolute', top: '1.4rem', left: '1.6rem', right: '1.6rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 5,
      }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.45em',
          color: chapter.accent,
          opacity: 0.75,
          textTransform: 'uppercase',
        }}>
          Adhyaya {chapter.num}
        </span>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'rgba(26,16,8,0.3)',
          textTransform: 'uppercase',
        }}>
          {chapter.name}
        </span>
      </div>

      {/* Horizontal rule — ink line under header */}
      <div style={{
        position: 'absolute', top: '3.2rem', left: '1.6rem', right: '1.6rem',
        height: '0.5px', background: `${chapter.accent}30`, zIndex: 5,
      }} />

      {/* Chapter number watermark — dark ink, very faint */}
      <div style={{
        position: 'absolute',
        top: '-0.08em', left: '-0.04em',
        fontFamily: 'Cinzel, serif', fontWeight: 900,
        fontSize: 'clamp(6rem, 18vw, 13rem)',
        color: 'rgba(26,16,8,0.04)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {chapter.num}
      </div>

      {/* Content area — scrollable within parchment page */}
      <div
        className="parchment-page"
        style={{
          position: 'absolute',
          inset: 0,
          paddingTop: '3.8rem',
          paddingBottom: '3.2rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          color: '#1A1008',
        }}
      >
        <ChapterContent data={chapter} />
      </div>

      {/* Sanskrit footer — manuscript closing */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', left: '1.6rem', right: '1.6rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        zIndex: 5,
      }}>
        <span style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '0.62rem',
          color: `${chapter.accent}70`,
          letterSpacing: '0.08em',
          fontStyle: 'italic',
        }}>
          {chapter.sanskrit}
        </span>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.55rem',
          color: 'rgba(26,16,8,0.2)',
          letterSpacing: '0.3em',
        }}>
          {parseInt(chapter.num, 10)}
        </span>
      </div>
    </div>
  )
}

/* ── RIGHT PAGE — divine visual side ── */
function RightPage({ chapter }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: chapter.fallback,
    }}>
      {/* Section background image (the atmospheric bg) */}
      <img
        src={chapter.bgImage}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          opacity: 0.55,
        }}
        onError={(e) => { e.currentTarget.style.opacity = '0' }}
      />

      {/* Chapter overlay */}
      <div style={{ position: 'absolute', inset: 0, background: chapter.overlay }} />

      {/* Glow rings centred */}
      <GlowRings accent={chapter.accent} />

      {/* Divine art image — full page, no screen blend */}
      {chapter.artImage && (
        <img
          src={chapter.artImage}
          alt=""
          style={{
            position: 'absolute',
            // Respect artPos: center = centred, left = left side, right (default) = right side
            ...(chapter.artPos === 'center'
              ? { left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '85%' }
              : chapter.artPos === 'left'
              ? { left: '-4%', top: '50%', transform: 'translateY(-50%)', width: '75%', height: '88%' }
              : { right: '-4%', top: '50%', transform: 'translateY(-50%)', width: '75%', height: '88%' }),
            objectFit: 'contain',
            objectPosition: 'center',
            // No screen blend — image is shown directly
            filter: `brightness(0.95) contrast(1.05)
              drop-shadow(0 0 50px ${chapter.accent}44)
              drop-shadow(0 25px 70px rgba(0,0,0,0.6))`,
            maskImage: 'radial-gradient(ellipse 80% 88% at 50% 50%, black 30%, rgba(0,0,0,0.6) 60%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 88% at 50% 50%, black 30%, rgba(0,0,0,0.6) 60%, transparent 82%)',
            animation: 'symFloat 14s ease-in-out infinite',
            animationDelay: '-4s',
          }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}

      {/* Page border */}
      <div style={{
        position: 'absolute', inset: '8px',
        border: `1px solid ${chapter.accent}1a`,
        borderRadius: 1,
        pointerEvents: 'none',
      }} />

      {/* Chapter theme — top centre */}
      <div style={{
        position: 'absolute', top: '1.4rem', left: 0, right: 0,
        textAlign: 'center', zIndex: 5,
      }}>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          color: chapter.accent,
          opacity: 0.55,
          textTransform: 'uppercase',
        }}>
          {chapter.theme}
        </p>
      </div>

      {/* Shloka — frosted glass at bottom */}
      {chapter.shloka && (
        <div style={{
          position: 'absolute', bottom: '2rem',
          left: '50%', transform: 'translateX(-50%)',
          width: '82%', maxWidth: 340,
          textAlign: 'center',
          padding: '0.85rem 1.2rem',
          background: 'rgba(5,8,18,0.7)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${chapter.accent}1e`,
          borderRadius: 3,
          zIndex: 5,
        }}>
          <p style={{
            fontFamily: 'serif',
            fontSize: 'clamp(0.58rem, 1.1vw, 0.75rem)',
            color: `${chapter.accent}cc`,
            letterSpacing: '0.05em',
            lineHeight: 1.85,
            fontStyle: 'italic',
            marginBottom: '0.35rem',
          }}>
            {chapter.shloka}
          </p>
          <p style={{
            fontSize: 'clamp(0.46rem, 0.8vw, 0.58rem)',
            color: 'rgba(240,230,208,0.38)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1.5,
          }}>
            {chapter.shlokaEn}
          </p>
          <p style={{
            fontSize: '0.45rem',
            color: `${chapter.accent}55`,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '0.3rem',
          }}>
            — {chapter.shlokaRef}
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Sri Yantra — 9 interlocking triangles, draws itself via dashoffset ── */
function SriYantra({ accent }) {
  /* Each path gets a CSS animation class; total ~800ms draw-in */
  const stroke = accent || '#d4af37'
  const paths = [
    /* Outer 4 upward Shiva triangles */
    'M 100 18  L 172 142 L 28 142 Z',
    'M 100 32  L 162 138 L 38 138 Z',
    'M 86  22  L 178 155 L 22 155 Z',
    'M 114 22  L 178 128 L 22 128 Z',
    /* 5 downward Shakti triangles */
    'M 100 182 L 172 58  L 28  58  Z',
    'M 100 168 L 162 62  L 38  62  Z',
    'M 86  178 L 178 45  L 22  45  Z',
    'M 114 178 L 178 72  L 22  72  Z',
    'M 100 158 L 155 75  L 45  75  Z',
  ]
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '72%', height: '72%',
        opacity: 0.18,
      }}
    >
      <style>{`
        @keyframes drawYantra {
          from { stroke-dashoffset: 600; opacity: 0; }
          10%  { opacity: 1; }
          to   { stroke-dashoffset: 0; }
        }
        .yantra-path {
          fill: none;
          stroke: ${stroke};
          stroke-width: 0.8;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawYantra 0.8s ease-out forwards;
        }
      `}</style>
      {/* Outer circles */}
      <circle cx="100" cy="100" r="82" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="76" fill="none" stroke={stroke} strokeWidth="0.3" opacity="0.2" />
      {/* Triangles — staggered draw */}
      {paths.map((d, i) => (
        <path
          key={i}
          className="yantra-path"
          d={d}
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
      {/* Bindu — central point */}
      <circle cx="100" cy="100" r="3" fill={stroke} opacity="0.5" />
      <circle cx="100" cy="100" r="6" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

/* ── Back face of the turning page — shows next chapter's left content ── */
function TurningPageBack({ chapter }) {
  if (!chapter) {
    // Last page back — closing cover
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #0a0800 0%, #060500 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
          color: '#d4af37',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          opacity: 0.6,
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          ॥ हरि ॐ तत् सत् ॥
        </div>
        <div style={{
          width: 40, height: 1,
          background: 'rgba(212,175,55,0.3)',
          marginBottom: '1rem',
        }} />
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.55rem',
          color: 'rgba(240,230,208,0.25)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          Iti Shrimad Bhagavad Gita
        </p>
      </div>
    )
  }
  return <LeftPage chapter={chapter} isBack />
}

/* ── Single book spread — left page + right page (turns) ── */
function BookSpread({ chapter, nextChapter, index, total }) {
  const spreadRef = useRef(null)
  const rightRef  = useRef(null)

  useEffect(() => {
    const spread = spreadRef.current
    const right  = rightRef.current
    if (!spread || !right) return

    // Set 3D perspective on the parent
    gsap.set(spread, { perspective: 1400 })
    gsap.set(right, { transformOrigin: 'left center', rotateY: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spread,
        start:   'top top',
        end:     '+=180%',
        pin:     true,
        scrub:   1.6,            // weighted/physical feel
        anticipatePin: 1,
      },
    })

    // Pre-lift → full turn → landing
    tl.to(right, {
      rotateY:  -5,
      z:         14,
      duration:  0.08,
      ease:      'power2.out',
    })
    .to(right, {
      rotateY:   -180,
      z:         0,
      duration:  0.92,
      ease:      'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    })
    .to(right, {
      rotateY:   -178,           // 2° landing bounce
      duration:  0.08,
      ease:      'power2.inOut',
    })
    .to(right, {
      rotateY:   -180,
      duration:  0.04,
    })

    return () => ScrollTrigger.getAll()
      .filter(t => t.trigger === spread)
      .forEach(t => t.kill())
  }, [])

  return (
    <div
      ref={spreadRef}
      data-spread={index}
      style={{
        width: '100vw', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 110%, rgba(212,175,55,0.06) 0%, #03060e 55%)',
      }}
    >
      {/* Ambient table light */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 85%, rgba(212,175,55,0.04) 0%, transparent 50%)',
      }} />

      {/* The book */}
      <div style={{
        width: '90vw', height: '88vh',
        maxWidth: 1380,
        display: 'flex',
        boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 8px 30px rgba(0,0,0,0.8), 0 0 80px rgba(212,175,55,0.04)',
        position: 'relative',
      }}>
        {/* ── LEFT PAGE — static content ── */}
        <div style={{ width: '50%', height: '100%', flexShrink: 0, overflow: 'hidden' }}>
          <LeftPage chapter={chapter} />
        </div>

        {/* ── SPINE — center line ── */}
        <div style={{
          position: 'absolute',
          left: '50%', top: 0, bottom: 0,
          width: 2,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.15) 20%, rgba(212,175,55,0.20) 50%, rgba(212,175,55,0.15) 80%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }} />

        {/* ── PAGE STACK — remaining pages indicator ── */}
        <div style={{
          position: 'absolute',
          right: 0, top: '8%', bottom: '8%',
          width: `${Math.max(2, Math.round((total - index - 1) / total * 18))}px`,
          background: 'linear-gradient(to right, rgba(212,175,55,0.08), rgba(212,175,55,0.18))',
          zIndex: 9,
          borderRadius: '0 1px 1px 0',
        }} />

        {/* ── RIGHT PAGE — turns on scroll ── */}
        <div
          ref={rightRef}
          style={{
            width: '50%', height: '100%',
            flexShrink: 0,
            transformStyle: 'preserve-3d',
            position: 'relative',
            zIndex: 6,
          }}
        >
          {/* Front face — visual image side */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            overflow: 'hidden',
          }}>
            <RightPage chapter={chapter} />
          </div>

          {/* Back face — Sri Yantra reveals itself, then next chapter appears */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            overflow: 'hidden',
          }}>
            <TurningPageBack chapter={nextChapter} />
            {/* Sri Yantra draws itself on the back face during the turn */}
            <SriYantra accent={chapter.accent} />
          </div>

          {/* Page edge highlight — curl shadow */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: 6,
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.08))',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
        </div>
      </div>

      {/* Chapter progress dots */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 6, zIndex: 20,
      }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            width:  i === index ? 20 : 5,
            height: 3,
            borderRadius: 2,
            background: i === index
              ? chapter.accent
              : i < index
              ? `${chapter.accent}55`
              : 'rgba(255,255,255,0.12)',
            transition: 'all 0.4s',
          }} />
        ))}
      </div>
    </div>
  )
}

/* ── BOOK COVER — opening page ── */
function BookCover() {
  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 110%, rgba(212,175,55,0.08) 0%, #03060e 55%)',
    }}>
      <div style={{
        width: '90vw', height: '88vh', maxWidth: 1380,
        background: 'linear-gradient(140deg, #07090e 0%, #0a0c14 100%)',
        border: '1px solid rgba(212,175,55,0.18)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Double border */}
        <div style={{
          position: 'absolute', inset: 10,
          border: '1px solid rgba(212,175,55,0.10)',
          pointerEvents: 'none',
        }} />

        {/* Spinning Sudarshana Chakra */}
        <div style={{ marginBottom: '2.5rem', animation: 'symSpin 8s linear infinite' }}>
          <svg width="72" height="72" viewBox="-40 -40 80 80">
            {Array.from({ length: 16 }, (_, i) => (
              <path key={i}
                d="M 0,-32 C 3.5,-23 3,-20 1.8,-17 L 0,-15.5 L -1.8,-17 C -3,-20 -3.5,-23 0,-32 Z"
                fill="#d4af37" transform={`rotate(${i * 22.5})`} />
            ))}
            <circle r="15" fill="none" stroke="#d4af37" strokeWidth="1.2" />
            <circle r="16.5" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
            <circle r="2.5" fill="#f5e090" />
          </svg>
        </div>

        <p style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
          letterSpacing: '0.5em',
          color: 'rgba(212,175,55,0.5)',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
        }}>
          श्रीमद्भगवद्गीता
        </p>

        <h1 style={{
          fontFamily: 'Cinzel Decorative, Cinzel, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: '#d4af37',
          textAlign: 'center',
          lineHeight: 1.15,
          letterSpacing: '0.08em',
          textShadow: '0 0 40px rgba(212,175,55,0.25), 0 2px 4px rgba(0,0,0,0.8)',
          marginBottom: '1rem',
        }}>
          ROHIT<br />SWERASHI
        </h1>

        <div style={{
          width: 60, height: 1,
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          margin: '1rem auto',
        }} />

        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
          letterSpacing: '0.4em',
          color: 'rgba(240,230,208,0.3)',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          Portfolio · XVIII Adhyayas
        </p>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center',
          animation: 'symFloat 3s ease-in-out infinite',
        }}>
          <div style={{
            width: 1, height: 32,
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)',
            margin: '0 auto 0.5rem',
          }} />
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.5rem',
            letterSpacing: '0.35em',
            color: 'rgba(212,175,55,0.35)',
            textTransform: 'uppercase',
          }}>
            Scroll to Open
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── BOOK ENGINE — the complete 18-chapter book ── */
export default function BookEngine({ chapters }) {
  return (
    <div>
      <BookCover />
      {chapters.map((ch, i) => (
        <BookSpread
          key={ch.id}
          chapter={ch}
          nextChapter={chapters[i + 1] || null}
          index={i}
          total={chapters.length}
        />
      ))}
    </div>
  )
}
