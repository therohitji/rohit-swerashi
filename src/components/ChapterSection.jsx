import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ChapterSection({ data, children }) {
  const el = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Background parallax — image moves at 0.6× scroll speed */
      gsap.to('.ch-bg-inner', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: el.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      /* Chapter number watermark slides in */
      gsap.from('.ch-watermark', {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el.current, start: 'top 85%' },
      })

      /* Sanskrit — blur to sharp */
      gsap.from('.ch-sanskrit', {
        filter: 'blur(16px)',
        opacity: 0,
        y: 16,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el.current, start: 'top 80%' },
      })

      /* Theme / name — slide up */
      gsap.from('.ch-theme', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.15,
        scrollTrigger: { trigger: el.current, start: 'top 78%' },
      })

      /* Divider line expands */
      gsap.from('.ch-divider', {
        scaleX: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.25,
        transformOrigin: 'left center',
        scrollTrigger: { trigger: el.current, start: 'top 75%' },
      })

      /* Content block rises */
      gsap.from('.ch-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3,
        scrollTrigger: { trigger: el.current, start: 'top 70%' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={el}
      id={`chapter-${data.num}`}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
      data-chapter={data.num}
    >
      {/* ── BACKGROUND ──────────────────────────────────────── */}
      <div className="ch-bg absolute inset-0 overflow-hidden">
        <div className="ch-bg-inner absolute inset-0 scale-[1.18]">
          <div className="absolute inset-0" style={{ background: data.fallback }} />
          <img
            src={data.bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            data-cursor="view"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: data.overlay }} />
      </div>

      {/* ── CHAPTER HEADER ──────────────────────────────────── */}
      {/* Huge faint watermark number */}
      <div
        className="ch-watermark absolute select-none pointer-events-none"
        style={{ top: '-0.15em', left: '-0.05em', zIndex: 2 }}
      >
        <span
          className="font-cinzel font-black leading-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 18rem)',
            color: `${data.accent}0d`,
            letterSpacing: '-0.04em',
          }}
        >
          {data.num}
        </span>
      </div>

      {/* Chapter meta — top right */}
      <div className="absolute top-8 right-8 text-right z-20">
        <p
          className="ch-sanskrit font-heading text-xs md:text-sm tracking-widest mb-0.5"
          style={{ color: data.accent, opacity: 0.65 }}
        >
          {data.sanskrit}
        </p>
        <p className="ch-theme font-cinzel text-sm md:text-base text-cream/50 tracking-[0.25em] uppercase">
          {data.theme}
        </p>
      </div>

      {/* Chapter number — small, top left */}
      <div className="absolute top-8 left-8 z-20">
        <span
          className="font-cinzel text-xs tracking-[0.4em] uppercase"
          style={{ color: data.accent, opacity: 0.5 }}
        >
          Ch. {data.num} / 18
        </span>
        <div
          className="ch-divider mt-1.5 h-px w-12"
          style={{ background: `linear-gradient(90deg, ${data.accent}, transparent)` }}
        />
      </div>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div className="ch-content relative z-10 min-h-screen flex items-center">
        {children}
      </div>
    </section>
  )
}
