import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { value: '0+', label: 'Years Experience' },    // ← Update
  { value: '0+', label: 'Projects Built' },       // ← Update
  { value: '0+', label: 'Happy Clients' },        // ← Update
  { value: '0+', label: 'Technologies' },         // ← Update
]

const About = () => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="relative py-24 bg-navy-mid overflow-hidden">
      {/* Background verse decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-cinzel text-[12rem] font-black leading-none opacity-[0.03] text-gold whitespace-nowrap"
        >
          धर्म
        </span>
      </div>

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <span className="font-heading text-xs tracking-[0.35em] text-gold uppercase opacity-70">
            The Warrior's Story
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-cream text-center">About Me</h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mt-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Profile image placeholder */}
          <div className="flex justify-center relative">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-gold/15 animate-spin-slow-r" />
              {/* Outer glow */}
              <div
                className="absolute inset-8 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
              />
              {/* Profile frame */}
              <div className="absolute inset-8 rounded-full border-2 border-gold/40 overflow-hidden bg-navy-light flex items-center justify-center">
                {/* ← Replace with your actual image: <img src="/your-photo.jpg" alt="Rohit Swerashi" className="w-full h-full object-cover" /> */}
                <div className="flex flex-col items-center gap-2 text-gold/40">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                  <span className="font-heading text-xs tracking-wider">Your Photo</span>
                </div>
              </div>

              {/* Corner lotus ornaments */}
              {[
                { top: '6%', right: '6%', rot: 45 },
                { bottom: '6%', left: '6%', rot: 225 },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 text-gold opacity-60"
                  style={{ ...pos, transform: `rotate(${pos.rot}deg)` }}
                >
                  ✦
                </div>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold opacity-50" />
              <span className="font-heading text-xs tracking-[0.3em] text-saffron uppercase">
                Who I Am
              </span>
            </div>

            <p className="font-body text-cream-dark leading-relaxed">
              {/* ← Update this bio */}
              Just as Arjuna mastered every weapon before the great battle, I have
              honed my craft across the full stack — from pixel-perfect interfaces
              to robust, scalable backends.
            </p>

            <p className="font-body text-cream-dark leading-relaxed">
              {/* ← Update this bio */}
              I believe in writing code that not only works, but endures — clean,
              purposeful, and battle-tested. Every project I take on is a
              kurukshetra where excellence is the only acceptable outcome.
            </p>

            {/* Gita quote */}
            <blockquote className="border-l-2 border-gold/50 pl-5 py-1 mt-2">
              <p className="font-heading text-sm text-gold-light italic leading-relaxed">
                "कर्म करो, फल की चिंता मत करो"
              </p>
              <cite className="font-body text-xs text-cream-muted mt-1 block not-italic">
                — Bhagavad Gita 2.47
              </cite>
            </blockquote>

            {/* CTA */}
            <a
              href="/resume.pdf"
              className="self-start font-heading text-sm tracking-wider px-6 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-all duration-300 rounded-sm mt-2"
            >
              Download Resume ↓
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 p-6 border border-gold/15 rounded-sm bg-navy/60 hover:border-gold/35 transition-colors duration-300"
            >
              <span className="font-cinzel text-3xl text-gold font-bold">{value}</span>
              <span className="font-heading text-xs tracking-wider text-cream-dark uppercase opacity-70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
