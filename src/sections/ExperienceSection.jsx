import { SKILLS_OTHER } from '../data/chapters'

export default function ExperienceSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Purushottama Yoga · Chapter XV
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        The Supreme <span style={{ color: accent }}>Work</span>
      </h2>
      <div className="h-px w-16 mb-10" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <p className="font-body text-cream/55 leading-relaxed max-w-xl mb-12 text-base">
        {/* ← Update */}
        Beyond individual skills lies the Purushottama — the supreme state where all knowledge
        integrates into elegant, purposeful creation.
      </p>

      <div className="flex flex-wrap gap-4">
        {SKILLS_OTHER.map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-5 py-3 border rounded-sm"
            style={{ borderColor: `${accent}30`, background: `${accent}08` }}
          >
            <span className="text-lg">{icon}</span>
            <span className="font-heading text-xs tracking-widest uppercase" style={{ color: accent }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
