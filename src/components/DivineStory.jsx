import { useRef, useEffect, useState, useMemo } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Each panel maps to one of the 4 Krishna images.
   Drop your images into /public/images/ with these filenames.
   The gradient is shown as a fallback when the image hasn't loaded yet.
───────────────────────────────────────────────────────────────────────────── */
const panels = [
  {
    image: '/images/krishna-flute.jpg',
    fallback: 'radial-gradient(ellipse at 50% 20%, #0d3a6e 0%, #061a3a 48%, #010810 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,5,25,0.55) 0%, rgba(0,4,20,0.2) 55%, rgba(0,2,18,0.75) 100%)',
    chapter: '01',
    pretitle: 'The Beginning',
    title: ['Where It All', 'Begins'],
    body: 'In the stillness before the storm, a warrior finds his note. Every journey starts with a single breath of purpose.',
    accentColor: '#7ab8ff',
    align: 'center',
  },
  {
    image: '/images/krishna-chakra.jpg',
    fallback: 'radial-gradient(ellipse at 62% 42%, #c85a10 0%, #501800 52%, #200500 100%)',
    overlay: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(20,8,0,0.15) 52%, rgba(0,0,0,0.8) 100%)',
    chapter: '02',
    pretitle: 'The Arsenal',
    title: ['Wielding the', 'Sudarshana'],
    body: 'Every tool mastered. Every technology deployed with unflinching precision. Like the Chakra — it never misses the mark.',
    accentColor: '#ff9040',
    align: 'left',
  },
  {
    image: '/images/krishna-vishwaroop.jpg',
    fallback: 'linear-gradient(180deg, #050a30 0%, #100a50 32%, #300800 70%, #100200 100%)',
    overlay: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(5,0,20,0.3) 52%, rgba(0,0,0,0.6) 100%)',
    chapter: '03',
    pretitle: 'The Vision',
    title: ['Seeing the', 'Bigger Picture'],
    body: 'Not just lines of code — systems that breathe, scale, and endure. The Vishwaroop of what engineering truly means.',
    accentColor: '#d4af37',
    align: 'right',
  },
  {
    image: '/images/krishna-gita.jpg',
    fallback: 'radial-gradient(ellipse at 50% 32%, #4a3a10 0%, #1a1400 52%, #050500 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(10,8,0,0.12) 50%, rgba(0,0,0,0.75) 100%)',
    chapter: '04',
    pretitle: 'The Mission',
    title: ["Let's Build", 'Together'],
    body: 'Like Krishna to Arjuna on the battlefield of Kurukshetra — I show up ready to guide, to build, and to deliver victory.',
    accentColor: '#f0d060',
    align: 'center',
    cta: true,
  },
]

/* Floating gold dust particles */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  delay: +(Math.random() * 6).toFixed(2),
  dur: +(Math.random() * 5 + 5).toFixed(2),
}))

/* ── helpers ─────────────────────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const easeOut = (t) => 1 - (1 - t) * (1 - t)

export default function DivineStory() {
  const wrapperRef = useRef(null)
  const [progress, setProgress] = useState(0)   // 0 → panels.length-1

  useEffect(() => {
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!wrapperRef.current) return
        const rect = wrapperRef.current.getBoundingClientRect()
        const scrollable = wrapperRef.current.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const pct = clamp(scrolled / scrollable, 0, 1)
        setProgress(pct * (panels.length - 1))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const activeIndex = Math.round(progress)

  /* Per-panel derived styles — computed inline so no transition lag */
  const imgStyle = (i) => {
    const dist = Math.abs(progress - i)
    const opacity = clamp(1 - dist * 1.5, 0, 1)
    const scale = 1 + 0.06 * clamp(1 - dist * 2, 0, 1)
    const ty = (progress - i) * 55
    return {
      opacity,
      transform: `scale(${scale}) translateY(${ty}px)`,
      willChange: 'transform, opacity',
    }
  }

  const textStyle = (i) => {
    const dist = progress - i   // negative = ahead, positive = past
    const opacity = clamp(1 - Math.abs(dist) * 2.8, 0, 1)
    const ty = dist * 90
    const blurPx = clamp(Math.abs(dist) * 6, 0, 12)
    return {
      opacity,
      transform: `translateY(${ty}px)`,
      filter: `blur(${blurPx}px)`,
      pointerEvents: Math.abs(dist) < 0.35 ? 'auto' : 'none',
      willChange: 'transform, opacity, filter',
    }
  }

  return (
    /* Outer wrapper — scrollable height that drives the sticky section */
    <div
      ref={wrapperRef}
      style={{ height: `${panels.length * 120 + 20}vh` }}
      className="relative"
    >
      {/* ── STICKY VIEWPORT ───────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#010810]">

        {/* ── IMAGE LAYERS ───────────────────────────────────────────────── */}
        {panels.map((panel, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={imgStyle(i)}
          >
            {/* Gradient fallback — always visible, covered by img when loaded */}
            <div
              className="absolute inset-0"
              style={{ background: panel.fallback }}
            />
            {/* Actual image */}
            <img
              src={panel.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 25%' }}
              onError={(e) => { e.currentTarget.style.opacity = '0' }}
            />
            {/* Atmospheric overlay */}
            <div className="absolute inset-0" style={{ background: panel.overlay }} />
          </div>
        ))}

        {/* ── PERSISTENT EFFECTS ─────────────────────────────────────────── */}

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Top + bottom letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

        {/* Gold dust particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold/50 animate-float"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* ── TEXT LAYERS ────────────────────────────────────────────────── */}
        {panels.map((panel, i) => (
          <div
            key={i}
            className={`absolute inset-0 z-20 flex items-center ${
              panel.align === 'left'
                ? 'justify-start pl-8 md:pl-20 lg:pl-32'
                : panel.align === 'right'
                ? 'justify-end pr-8 md:pr-20 lg:pr-32'
                : 'justify-center px-6'
            }`}
            style={textStyle(i)}
          >
            <div
              className={`max-w-lg ${panel.align === 'center' ? 'text-center' : 'text-left'}`}
            >
              {/* Frosted glass card */}
              <div
                className="relative p-7 md:p-9 rounded-sm border"
                style={{
                  background: 'rgba(2, 6, 22, 0.55)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  borderColor: `${panel.accentColor}33`,
                  boxShadow: `0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.2)`,
                }}
              >
                {/* Chapter tag */}
                <div
                  className={`flex items-center gap-2 mb-4 ${panel.align === 'center' ? 'justify-center' : 'justify-start'}`}
                >
                  <span
                    className="font-heading text-xs tracking-[0.4em] uppercase"
                    style={{ color: panel.accentColor, opacity: 0.75 }}
                  >
                    Chapter {panel.chapter}
                  </span>
                  <span
                    className="h-px flex-1 max-w-[40px]"
                    style={{ background: panel.accentColor, opacity: 0.4 }}
                  />
                  <span
                    className="font-heading text-xs tracking-[0.3em] uppercase"
                    style={{ color: panel.accentColor, opacity: 0.5 }}
                  >
                    {panel.pretitle}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-cinzel text-3xl md:text-5xl text-cream leading-tight mb-1">
                  {panel.title[0]}
                </h2>
                <h2
                  className="font-cinzel text-3xl md:text-5xl leading-tight mb-5"
                  style={{ color: panel.accentColor }}
                >
                  {panel.title[1]}
                </h2>

                {/* Divider */}
                <div
                  className={`h-px w-14 mb-5 ${panel.align === 'center' ? 'mx-auto' : ''}`}
                  style={{ background: `linear-gradient(90deg, ${panel.accentColor}, transparent)` }}
                />

                {/* Body */}
                <p className="font-body text-sm md:text-base text-cream/75 leading-relaxed">
                  {panel.body}
                </p>

                {/* CTA on last panel */}
                {panel.cta && (
                  <div className={`mt-6 flex gap-3 ${panel.align === 'center' ? 'justify-center' : ''}`}>
                    <a
                      href="#projects"
                      className="font-heading text-xs tracking-wider px-5 py-2.5 bg-gold text-navy font-semibold hover:bg-gold-light transition-all duration-300 rounded-sm"
                    >
                      See My Work
                    </a>
                    <a
                      href="#contact"
                      className="font-heading text-xs tracking-wider px-5 py-2.5 border text-cream hover:bg-white/10 transition-all duration-300 rounded-sm"
                      style={{ borderColor: `${panel.accentColor}55` }}
                    >
                      Contact Me
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── CHAPTER COUNTER (top-right) ─────────────────────────────────── */}
        <div className="absolute top-24 right-6 z-30 flex flex-col items-end gap-1.5">
          <span
            className="font-cinzel text-4xl font-bold leading-none"
            style={{ color: panels[activeIndex]?.accentColor ?? '#d4af37', opacity: 0.35 }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="font-heading text-[10px] tracking-[0.35em] text-cream/30 uppercase">
            of {panels.length}
          </span>
        </div>

        {/* ── PROGRESS DOTS (bottom-center) ───────────────────────────────── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {panels.map((p, i) => {
            const active = activeIndex === i
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: active ? '28px' : '6px',
                  height: '6px',
                  background: active ? p.accentColor : 'rgba(255,255,255,0.2)',
                  boxShadow: active ? `0 0 8px ${p.accentColor}99` : 'none',
                }}
              />
            )
          })}
        </div>

        {/* ── SCROLL HINT (first panel only) ──────────────────────────────── */}
        <div
          className="absolute bottom-8 right-8 z-30 flex items-center gap-2 transition-all duration-500"
          style={{ opacity: progress < 0.15 ? 0.45 : 0 }}
        >
          <span className="font-heading text-[10px] tracking-[0.35em] text-cream/50 uppercase">
            Scroll
          </span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="animate-float">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <ellipse cx="7" cy="6" rx="2" ry="3" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
