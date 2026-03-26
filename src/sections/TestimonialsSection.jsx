import { TESTIMONIALS } from '../data/chapters'

export default function TestimonialsSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Shraddha Yoga · Chapter XVII
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        Faith of <span style={{ color: accent }}>Others</span>
      </h2>
      <div className="h-px w-16 mb-12" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ name, role, text }) => (
          <div
            key={name}
            className="p-6 border rounded-sm flex flex-col gap-4"
            style={{ borderColor: `${accent}22`, background: 'rgba(5,11,26,0.5)', backdropFilter: 'blur(10px)' }}
          >
            <span className="text-3xl" style={{ color: accent, opacity: 0.3 }}>"</span>
            <p className="font-body text-sm text-cream/60 leading-relaxed flex-grow">{text}</p>
            <div className="pt-3 border-t" style={{ borderColor: `${accent}20` }}>
              <p className="font-heading text-xs tracking-wider text-cream/70">{name}</p>
              <p className="font-heading text-xs tracking-wider" style={{ color: accent, opacity: 0.6 }}>{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
