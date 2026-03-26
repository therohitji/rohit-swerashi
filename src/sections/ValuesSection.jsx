import { PRINCIPLES } from '../data/chapters'

export default function ValuesSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Gunatraya Yoga · Chapter XIV
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        The Three <span style={{ color: accent }}>Modes</span>
      </h2>
      <div className="h-px w-16 mb-12" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="grid sm:grid-cols-2 gap-5">
        {PRINCIPLES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-6 border rounded-sm"
            style={{ borderColor: `${accent}22`, background: 'rgba(5,11,26,0.4)', backdropFilter: 'blur(10px)' }}
          >
            <span className="text-2xl mb-4 block">{icon}</span>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-3" style={{ color: accent }}>{title}</h3>
            <p className="font-body text-sm text-cream/55 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
