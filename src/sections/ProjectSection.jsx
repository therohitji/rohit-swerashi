import { ExternalLink, Github } from 'lucide-react'
import { PROJECTS } from '../data/chapters'

const ORDINALS = ['First', 'Second', 'Third', 'Fourth']

export default function ProjectSection({ accent, projectIndex, chNum }) {
  const project = PROJECTS[projectIndex] ?? PROJECTS[0]

  return (
    <div className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-end">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Victory {chNum} · The {ORDINALS[projectIndex]} Battle
      </span>

      <h2 className="font-cinzel text-5xl md:text-7xl text-cream mb-2 leading-tight">
        {project.title}
      </h2>
      <p className="font-heading text-sm tracking-widest mb-8" style={{ color: accent, opacity: 0.8 }}>
        {project.subtitle}
      </p>

      <div className="h-px w-24 mb-8" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <p className="font-body text-cream/60 leading-relaxed max-w-xl mb-8 text-base md:text-lg">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-heading text-xs tracking-wider px-3 py-1.5 rounded-sm border"
            style={{ borderColor: `${accent}33`, color: accent, background: `${accent}0d` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-heading text-sm tracking-wider transition-all duration-300"
          style={{ color: accent }}
        >
          <ExternalLink size={15} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-heading text-sm tracking-wider text-cream/50 hover:text-cream transition-colors"
        >
          <Github size={15} />
          View Source
        </a>
      </div>
    </div>
  )
}
