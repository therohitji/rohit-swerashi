export default function PrinciplesSection({ accent }) {
  const codes = [
    'Ship working software over perfect software.',
    'Read the code before changing it.',
    'Name things what they are.',
    'Leave the codebase better than you found it.',
    'Own your bugs. Own your wins.',
    'When in doubt, simplify.',
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Daivasura Yoga · Chapter XVI
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        The Code of <span style={{ color: accent }}>Honor</span>
      </h2>
      <div className="h-px w-16 mb-10" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="flex flex-col gap-4 max-w-xl">
        {codes.map((code, i) => (
          <div key={i} className="flex items-start gap-5">
            <span className="font-cinzel text-xs mt-1 flex-shrink-0" style={{ color: accent, opacity: 0.4 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-body text-cream/60 leading-relaxed">{code}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
