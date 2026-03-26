import { useScrollReveal } from '../hooks/useScrollReveal'

// ← Update these with your actual skills
const skills = [
  {
    category: 'Frontend',
    icon: '⚡',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: '🛡',
    items: ['Node.js', 'Express', 'Python / FastAPI', 'REST & GraphQL'],
  },
  {
    category: 'Database',
    icon: '💠',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL / NoSQL'],
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁',
    items: ['Docker', 'AWS / GCP', 'CI/CD Pipelines', 'Linux'],
  },
  {
    category: 'Tools & Craft',
    icon: '🔱',
    items: ['Git & GitHub', 'Figma / Design', 'Agile / Scrum', 'System Design'],
  },
  {
    category: 'Other Astras',
    icon: '✦',
    items: [
      'Skill Seven',   // ← Update
      'Skill Eight',   // ← Update
      'Skill Nine',    // ← Update
      'Skill Ten',     // ← Update
    ],
  },
]

const SkillCard = ({ category, icon, items, index }) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="h-full p-6 border border-gold/15 bg-navy/60 hover:border-gold/40 hover:bg-navy-light/80 transition-all duration-300 rounded-sm group">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-heading text-sm tracking-widest text-gold uppercase">{category}</h3>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-gold/30 to-transparent mb-5" />

        {/* Skills list */}
        <ul className="flex flex-col gap-2.5">
          {items.map((skill) => (
            <li key={skill} className="flex items-center gap-2.5 font-body text-sm text-cream-dark group-hover:text-cream transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron/60 flex-shrink-0" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="skills" className="relative py-24 bg-navy overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.04] w-[600px] h-[600px] animate-spin-slow"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 22.5 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={100 + 65 * Math.cos(a)} y1={100 + 65 * Math.sin(a)}
                x2={100 + 90 * Math.cos(a)} y2={100 + 90 * Math.sin(a)}
                stroke="#d4af37" strokeWidth="0.8"
              />
            )
          })}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center gap-3 mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-heading text-xs tracking-[0.35em] text-gold uppercase opacity-70">
            Arsenal of the Warrior
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-cream text-center">My Astras</h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mt-2" />
          <p className="font-body text-cream-dark text-center max-w-md mt-2 text-sm leading-relaxed">
            Every master warrior carries their astras. These are the tools and technologies
            I wield on the battlefield of code.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
