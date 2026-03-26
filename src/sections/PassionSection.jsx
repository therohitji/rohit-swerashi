export default function PassionSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center items-center text-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-8 block" style={{ color: accent, opacity: 0.7 }}>
        Bhakti Yoga · Chapter XII
      </span>

      <p className="font-cinzel text-2xl md:text-3xl text-cream/30 leading-relaxed mb-4">
        "I do not fear the complexity.
      </p>
      <p className="font-cinzel text-2xl md:text-3xl leading-relaxed mb-4" style={{ color: accent }}>
        I fear building something
      </p>
      <p className="font-cinzel text-2xl md:text-3xl text-cream/30 leading-relaxed mb-12">
        that doesn't matter."
      </p>

      <div className="h-px w-16 mb-12 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

      <p className="font-body text-cream/55 leading-relaxed max-w-lg text-base md:text-lg mb-6">
        {/* ← Update */}
        I build because I believe software can change lives. Not in the abstract — concretely.
        One user, one decision, one interaction at a time.
      </p>
      <p className="font-body text-cream/55 leading-relaxed max-w-lg text-base md:text-lg">
        {/* ← Update */}
        That belief is my Bhakti. My devotion to craft is what separates good work from great work.
      </p>
    </div>
  )
}
