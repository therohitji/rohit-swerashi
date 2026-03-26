export default function SkillsOverviewSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 flex flex-col justify-center items-center text-center min-h-screen">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-6 block" style={{ color: accent, opacity: 0.7 }}>
        Jnana Yoga · Chapter IV
      </span>

      <h2 className="font-cinzel text-5xl md:text-7xl text-cream leading-tight mb-4">
        The Universe
      </h2>
      <h2 className="font-cinzel text-5xl md:text-7xl leading-tight mb-10" style={{ color: accent }}>
        In My Hands
      </h2>

      <div className="h-px w-24 mb-10 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <p className="font-body text-cream/55 max-w-lg leading-relaxed text-base md:text-lg mb-14">
        Just as Krishna held the cosmos in his palm and Arjuna saw infinity —
        I hold every layer of the stack, from pixel to packet, in full command.
      </p>

      {/* Concentric rings visual */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {[1, 0.75, 0.5, 0.3].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              borderColor: `${accent}${Math.round(scale * 60).toString(16).padStart(2,'0')}`,
              animation: `spin ${20 + i * 8}s linear ${i % 2 === 0 ? '' : 'reverse'} infinite`,
            }}
          />
        ))}
        <span className="font-cinzel text-xs text-center leading-tight" style={{ color: accent }}>
          Full<br />Stack
        </span>
      </div>
    </div>
  )
}
