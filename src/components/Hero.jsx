import { useMemo } from 'react'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'
import KrishnaIllustration from '../illustrations/KrishnaIllustration'

const STARS = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.6,
  delay: `${(Math.random() * 4).toFixed(2)}s`,
}))

const MandalaRing = ({ r, strokeWidth = 0.5, opacity = 0.15, dashes = '' }) => (
  <circle
    cx="50%" cy="50%" r={r}
    fill="none"
    stroke="#d4af37"
    strokeWidth={strokeWidth}
    strokeOpacity={opacity}
    strokeDasharray={dashes}
  />
)

const StarField = () =>
  STARS.map((s) => (
    <div
      key={s.id}
      className="absolute rounded-full bg-cream animate-twinkle"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        animationDelay: s.delay,
      }}
    />
  ))

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 70% 20%, #0d2050 0%, #050b1a 65%)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <StarField />
      </div>

      {/* Decorative mandala rings (desktop only) */}
      <div className="absolute right-0 top-0 w-[55%] h-full hidden lg:flex items-center justify-center pointer-events-none">
        <svg className="absolute w-[620px] h-[620px] animate-spin-slow opacity-30" viewBox="0 0 200 200">
          <MandalaRing r="90" strokeWidth="0.6" opacity={1} dashes="4 6" />
          <MandalaRing r="80" strokeWidth="0.4" opacity={0.7} dashes="2 8" />
          <MandalaRing r="68" strokeWidth="0.3" opacity={0.5} />
        </svg>
        <svg className="absolute w-[480px] h-[480px] animate-spin-slow-r opacity-20" viewBox="0 0 200 200">
          <MandalaRing r="90" strokeWidth="0.5" opacity={1} dashes="6 4" />
          <MandalaRing r="78" strokeWidth="0.3" opacity={0.7} dashes="3 7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">

          {/* LEFT — text content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Pre-title */}
            <div className="flex items-center gap-3 animate-rise">
              <span className="h-px w-10 bg-gold opacity-60" />
              <span className="font-heading text-xs tracking-[0.3em] text-gold uppercase opacity-80">
                The Warrior Codes
              </span>
            </div>

            {/* Name */}
            <h1 className="font-cinzel text-5xl md:text-6xl xl:text-7xl leading-tight animate-rise-1 opacity-0">
              <span
                style={{
                  background: 'linear-gradient(90deg, #d4af37, #f0d060, #d4af37, #b8940a, #d4af37)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Rohit
              </span>
              <br />
              <span className="text-cream">Swerashi</span>
            </h1>

            {/* Title */}
            <p className="font-heading text-base md:text-lg tracking-widest text-saffron animate-rise-2 opacity-0 uppercase">
              {/* ← Update this */}
              Full Stack Developer &nbsp;|&nbsp; Problem Solver
            </p>

            {/* Tagline */}
            <p className="font-body text-cream-dark text-base md:text-lg leading-relaxed max-w-md animate-rise-3 opacity-0">
              {/* ← Update this */}
              Like Arjuna on the battlefield of Kurukshetra, I face every
              challenge with focus, craft, and an unwavering will to{' '}
              <span className="text-gold">win</span>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-2 animate-rise-3 opacity-0">
              <a
                href="#projects"
                className="font-heading text-sm tracking-wider px-7 py-3 bg-gold text-navy font-semibold hover:bg-gold-light transition-all duration-300 rounded-sm shadow-lg shadow-gold/20"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="font-heading text-sm tracking-wider px-7 py-3 border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-300 rounded-sm"
              >
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 mt-2 animate-rise-3 opacity-0">
              <span className="h-px w-6 bg-cream-dark opacity-30" />
              {[
                { icon: Github, href: 'https://github.com/therohitji', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-cream-dark hover:text-gold transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Krishna illustration */}
          <div className="flex justify-center items-end order-1 lg:order-2 relative">
            {/* Glow behind Krishna */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-72 h-72 rounded-full animate-pulse-gold"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                }}
              />
            </div>

            <div className="w-72 md:w-80 lg:w-96 xl:w-[420px] animate-float relative z-10">
              <KrishnaIllustration />
            </div>

            {/* Floating lotus decorations */}
            <div className="absolute top-16 left-4 animate-float-slow opacity-40">
              <svg viewBox="0 0 40 40" width="36" height="36">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
                  const r = (a * Math.PI) / 180
                  return (
                    <ellipse
                      key={i}
                      cx={20 + 12 * Math.cos(r)}
                      cy={20 + 12 * Math.sin(r)}
                      rx="5" ry="10"
                      fill="#c97090"
                      transform={`rotate(${a},${20 + 12 * Math.cos(r)},${20 + 12 * Math.sin(r)})`}
                      opacity="0.7"
                    />
                  )
                })}
                <circle cx="20" cy="20" r="5" fill="#ffcc44" opacity="0.8" />
              </svg>
            </div>

            <div className="absolute bottom-24 right-4 animate-float opacity-30" style={{ animationDelay: '3s' }}>
              <svg viewBox="0 0 40 40" width="28" height="28">
                {[0, 60, 120, 180, 240, 300].map((a, i) => {
                  const r = (a * Math.PI) / 180
                  return (
                    <ellipse
                      key={i}
                      cx={20 + 10 * Math.cos(r)}
                      cy={20 + 10 * Math.sin(r)}
                      rx="4" ry="9"
                      fill="#c97090"
                      transform={`rotate(${a},${20 + 10 * Math.cos(r)},${20 + 10 * Math.sin(r)})`}
                      opacity="0.6"
                    />
                  )
                })}
                <circle cx="20" cy="20" r="4" fill="#ffcc44" opacity="0.7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-50">
        <span className="font-heading text-xs tracking-widest text-cream-dark">Scroll</span>
        <ArrowDown size={16} className="text-gold" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
