const steps = [
  { n: '01', title: 'Understand the Battlefield', body: 'Before writing a single line, I study the problem space deeply. The warrior who knows the terrain wins before the battle starts.' },
  { n: '02', title: 'Design with Intention', body: 'Architecture is strategy. Every decision is deliberate — chosen because it serves the mission, not because it is familiar.' },
  { n: '03', title: 'Build with Craft', body: 'Code is written once and read many times. I write for the next engineer who reads it, not just for the machine that runs it.' },
  { n: '04', title: 'Ship and Iterate', body: 'Perfection is the enemy of done. Ship, learn, improve. The best warriors know when to strike and when to refine their form.' },
]

export default function ApproachSection({ accent }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Dhyana Yoga · Chapter VI
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        How I <span style={{ color: accent }}>Fight</span>
      </h2>
      <div className="h-px w-16 mb-12" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map(({ n, title, body }) => (
          <div
            key={n}
            className="p-6 border rounded-sm transition-all duration-300 hover:border-opacity-60"
            style={{
              borderColor: `${accent}22`,
              background: 'rgba(5,11,26,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="font-cinzel text-3xl font-black block mb-3" style={{ color: `${accent}25` }}>{n}</span>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-3" style={{ color: accent }}>{title}</h3>
            <p className="font-body text-sm text-cream/55 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
