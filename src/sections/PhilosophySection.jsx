export default function PhilosophySection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 flex flex-col justify-center min-h-screen">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-6 block" style={{ color: accent, opacity: 0.7 }}>
        My Dharma
      </span>

      <h2 className="font-cinzel text-4xl md:text-6xl text-cream leading-tight mb-8 max-w-2xl">
        Action.
        <br />
        <span style={{ color: accent }}>Without Attachment.</span>
        <br />
        To Outcome.
      </h2>

      <div className="h-px w-24 mb-10" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <p className="font-body text-cream/60 leading-relaxed max-w-xl mb-6 text-base md:text-lg">
        {/* ← Update this with your work philosophy */}
        I do not chase titles or accolades. I chase craft. Every project I take on
        becomes my entire world until it is done — and done right.
      </p>
      <p className="font-body text-cream/60 leading-relaxed max-w-xl text-base md:text-lg">
        {/* ← Update */}
        This is Karma Yoga applied to engineering: show up fully, build with intention,
        and trust the process. The results follow naturally.
      </p>
    </div>
  )
}
