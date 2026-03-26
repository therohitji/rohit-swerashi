import { ExternalLink, Github } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ← Update these with your actual projects/achievements
const projects = [
  {
    title: 'Project Alpha',             // ← Update
    subtitle: 'Victory I',
    description:
      'A brief, powerful description of this project — what it does, what problem it solves, and why it matters. Like a battle won, describe the impact.',   // ← Update
    tags: ['React', 'Node.js', 'MongoDB'],   // ← Update
    liveUrl: '#',                            // ← Update
    githubUrl: '#',                          // ← Update
    featured: true,
  },
  {
    title: 'Project Beta',              // ← Update
    subtitle: 'Victory II',
    description:
      'Another powerful project. Describe the challenge you conquered and the weapons (technologies) you used to achieve it.',  // ← Update
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],  // ← Update
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'Project Gamma',             // ← Update
    subtitle: 'Victory III',
    description:
      'Every great warrior has battles that defined them. This is yours — describe what you built and the impact it had.',  // ← Update
    tags: ['Python', 'FastAPI', 'AWS'],  // ← Update
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'Project Delta',             // ← Update
    subtitle: 'Victory IV',
    description:
      'Detail the scope and impact of this project. Quantify where possible — users reached, performance gains, revenue generated.',  // ← Update
    tags: ['React Native', 'Firebase'],  // ← Update
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'Project Epsilon',           // ← Update
    subtitle: 'Victory V',
    description:
      'A concise description. Focus on the outcome — what changed because you built this.',  // ← Update
    tags: ['Vue.js', 'Express', 'Redis'],  // ← Update
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'Project Zeta',              // ← Update
    subtitle: 'Victory VI',
    description:
      'Your latest conquest. Show that you are always pushing forward on the battlefield.',  // ← Update
    tags: ['Docker', 'Kubernetes', 'Go'],  // ← Update
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
]

const ProjectCard = ({ title, subtitle, description, tags, liveUrl, githubUrl, featured, index }) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${featured ? 'md:col-span-1' : ''}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="h-full flex flex-col p-6 border border-gold/15 bg-navy/60 hover:border-gold/40 hover:bg-navy-light/70 transition-all duration-300 rounded-sm group relative overflow-hidden">
        {/* Featured glow */}
        {featured && (
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(212,175,55,0.08), transparent 70%)' }}
          />
        )}

        {/* Card top */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-heading text-xs tracking-widest text-saffron uppercase opacity-70">
              {subtitle}
            </span>
            <h3 className="font-heading text-lg text-cream mt-1 group-hover:text-gold transition-colors duration-300">
              {title}
            </h3>
          </div>
          {featured && (
            <span className="font-heading text-xs tracking-wider px-2.5 py-1 border border-gold/30 text-gold/70 rounded-sm">
              Featured
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-gold/20 to-transparent mb-4" />

        {/* Description */}
        <p className="font-body text-sm text-cream-dark leading-relaxed flex-grow">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-heading text-xs tracking-wider px-2.5 py-1 bg-peacock/10 border border-peacock/20 text-peacock-light rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gold/10">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-heading text-xs tracking-wider text-gold hover:text-gold-light transition-colors"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-heading text-xs tracking-wider text-cream-dark hover:text-cream transition-colors"
          >
            <Github size={13} />
            Source
          </a>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section id="projects" className="relative py-24 bg-navy-mid overflow-hidden">
      {/* Large Sanskrit numeral decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <span className="absolute top-8 left-0 font-cinzel text-[10rem] font-black text-gold opacity-[0.025] leading-none">
          विजय
        </span>
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
            Battles Won
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl text-cream text-center">
            Victories
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mt-2" />
          <p className="font-body text-cream-dark text-center max-w-md mt-2 text-sm leading-relaxed">
            Each project is a battle fought with purpose and won with craft. Here are
            the conquests that define my journey.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div className="flex justify-center mt-12">
          <a
            href="https://github.com/therohitji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-heading text-sm tracking-wider text-cream-dark hover:text-gold transition-colors duration-300 border-b border-gold/0 hover:border-gold/40 pb-0.5"
          >
            <Github size={16} />
            See all on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
