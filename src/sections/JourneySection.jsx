import { EXPERIENCE } from '../data/chapters'

export default function JourneySection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Kshetra Yoga · Chapter XIII
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        The <span style={{ color: accent }}>Journey</span>
      </h2>
      <div className="h-px w-16 mb-12" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="relative pl-8 border-l" style={{ borderColor: `${accent}30` }}>
        {EXPERIENCE.map(({ year, role, company, desc }, i) => (
          <div key={i} className="relative mb-12 last:mb-0">
            {/* Dot */}
            <div
              className="absolute -left-[2.35rem] w-3 h-3 rounded-full border-2 top-1"
              style={{ background: '#050b1a', borderColor: accent }}
            />
            <span className="font-cinzel text-xs mb-2 block" style={{ color: accent, opacity: 0.6 }}>{year}</span>
            <h3 className="font-heading text-base tracking-wider text-cream mb-0.5">{role}</h3>
            <p className="font-heading text-xs tracking-widest text-cream/40 mb-3 uppercase">{company}</p>
            <p className="font-body text-sm text-cream/55 leading-relaxed max-w-lg">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
