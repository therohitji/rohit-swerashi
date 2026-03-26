import { SKILLS_TECH } from '../data/chapters'

export default function SkillsGridSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        The Arsenal · Chapter V
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        My <span style={{ color: accent }}>Weapons</span>
      </h2>
      <div className="h-px w-16 mb-10" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
        {SKILLS_TECH.map(({ name, level }) => (
          <div key={name}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-heading text-sm tracking-wider text-cream/75">{name}</span>
              <span className="font-cinzel text-xs" style={{ color: accent, opacity: 0.7 }}>{level}%</span>
            </div>
            <div className="h-px w-full bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${level}%`,
                  background: `linear-gradient(90deg, ${accent}80, ${accent})`,
                  boxShadow: `0 0 8px ${accent}66`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
