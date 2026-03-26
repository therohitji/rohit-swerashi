import { ABOUT } from '../data/chapters'

export default function AboutSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 grid lg:grid-cols-2 gap-16 items-center min-h-screen">
      {/* Left */}
      <div>
        <span className="font-heading text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: accent, opacity: 0.7 }}>
          The Warrior Behind the Code
        </span>
        <h2 className="font-cinzel text-4xl md:text-5xl text-cream leading-tight mb-8">
          Who&nbsp;
          <span style={{ color: accent }}>Am</span>
          &nbsp;I?
        </h2>
        <p className="font-body text-cream/65 leading-relaxed mb-6">{ABOUT.bio1}</p>
        <p className="font-body text-cream/65 leading-relaxed mb-8">{ABOUT.bio2}</p>

        {/* Quote */}
        <blockquote className="border-l-2 pl-5 py-1 mb-8" style={{ borderColor: `${accent}80` }}>
          <p className="font-cinzel text-base mb-1" style={{ color: accent }}>{ABOUT.quote}</p>
          <cite className="font-body text-xs text-cream/40 not-italic">{ABOUT.quoteTranslation}</cite>
        </blockquote>

        <a
          href="/resume.pdf"
          className="inline-block font-heading text-sm tracking-wider px-6 py-3 border transition-all duration-300 rounded-sm hover:opacity-80"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          Download Resume ↓
        </a>
      </div>

      {/* Right — profile frame */}
      <div className="flex justify-center">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 rounded-full border animate-spin-slow" style={{ borderColor: `${accent}20` }} />
          <div className="absolute inset-4 rounded-full border animate-spin-slow-r" style={{ borderColor: `${accent}15` }} />
          <div className="absolute inset-8 rounded-full border-2 overflow-hidden bg-navy-light/60 flex items-center justify-center" style={{ borderColor: `${accent}40` }}>
            {/* ← Replace with: <img src="/images/your-photo.jpg" alt="Rohit" className="w-full h-full object-cover" /> */}
            <div className="flex flex-col items-center gap-2" style={{ color: `${accent}40` }}>
              <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
              <span className="font-heading text-xs tracking-wider">Your Photo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
