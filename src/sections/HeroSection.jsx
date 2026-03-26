import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Github, Linkedin, ArrowDown } from 'lucide-react'

export default function HeroSection({ accent }) {
  const el = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 })
      tl.from('.hero-line', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.1 })
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from('.hero-socials', { opacity: 0, duration: 0.5 }, '-=0.3')
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={el} className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 flex flex-col justify-end min-h-screen">
      {/* Pre-label */}
      <div className="flex items-center gap-4 mb-6 overflow-hidden">
        <span className="h-px w-10" style={{ background: accent, opacity: 0.5 }} />
        <span className="font-heading text-xs tracking-[0.4em] uppercase" style={{ color: accent }}>
          Bhagavad Gita — Chapter I
        </span>
      </div>

      {/* Name — split lines for per-line reveal */}
      <div className="overflow-hidden mb-1">
        <h1 className="hero-line font-cinzel text-6xl md:text-8xl xl:text-[9rem] text-cream leading-[0.9] font-black">
          Rohit
        </h1>
      </div>
      <div className="overflow-hidden mb-8">
        <h1
          className="hero-line font-cinzel text-6xl md:text-8xl xl:text-[9rem] leading-[0.9] font-black"
          style={{ color: accent }}
        >
          Swerashi
        </h1>
      </div>

      {/* Title */}
      <p className="hero-sub font-heading text-sm md:text-base tracking-[0.35em] uppercase mb-4" style={{ color: accent, opacity: 0.8 }}>
        Full Stack Developer &nbsp;·&nbsp; Architect &nbsp;·&nbsp; Problem Solver {/* ← Update */}
      </p>

      {/* Tagline */}
      <p className="hero-desc font-body text-base md:text-lg text-cream/60 leading-relaxed max-w-lg mb-10">
        Like Arjuna on the battlefield of Kurukshetra — I face every challenge
        with focus, precision, and an unwavering will to&nbsp;
        <span style={{ color: accent }}>win</span>.
        {/* ← Update this */}
      </p>

      {/* CTAs */}
      <div className="hero-ctas flex flex-wrap gap-4 mb-10">
        <a
          href="#chapter-07"
          className="font-heading text-sm tracking-wider px-8 py-3.5 font-semibold transition-all duration-300 rounded-sm"
          style={{ background: accent, color: '#050b1a', boxShadow: `0 0 30px ${accent}44` }}
        >
          View Victories
        </a>
        <a
          href="#chapter-18"
          className="font-heading text-sm tracking-wider px-8 py-3.5 border text-cream/80 hover:text-cream transition-all duration-300 rounded-sm"
          style={{ borderColor: `${accent}44` }}
        >
          Begin Together
        </a>
      </div>

      {/* Socials */}
      <div className="hero-socials flex items-center gap-6">
        <span className="h-px w-6 bg-cream/20" />
        {[
          { icon: Github, href: 'https://github.com/therohitji', label: 'GitHub' },
          { icon: Linkedin, href: '#', label: 'LinkedIn' },
        ].map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            aria-label={label} className="text-cream/40 hover:text-gold transition-colors duration-300"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      {/* Scroll down */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-30">
        <span className="font-heading text-[9px] tracking-[0.4em] text-cream uppercase">Scroll</span>
        <ArrowDown size={14} className="text-gold" />
      </div>
    </div>
  )
}
