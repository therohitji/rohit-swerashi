import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CHAPTERS } from './data/chapters'
import ChapterSection from './components/ChapterSection'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import SideNav from './components/SideNav'
import GrainOverlay from './components/GrainOverlay'
import FloatingSymbols from './components/FloatingSymbols'

/* Section content components */
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import PhilosophySection from './sections/PhilosophySection'
import SkillsOverviewSection from './sections/SkillsOverviewSection'
import SkillsGridSection from './sections/SkillsGridSection'
import ApproachSection from './sections/ApproachSection'
import ProjectSection from './sections/ProjectSection'
import ImpactSection from './sections/ImpactSection'
import PassionSection from './sections/PassionSection'
import JourneySection from './sections/JourneySection'
import ValuesSection from './sections/ValuesSection'
import ExperienceSection from './sections/ExperienceSection'
import PrinciplesSection from './sections/PrinciplesSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

/* Map chapter type → content component */
function ChapterContent({ data }) {
  const { type, accent, projectIndex, num } = data
  switch (type) {
    case 'hero':           return <HeroSection accent={accent} />
    case 'about':          return <AboutSection accent={accent} />
    case 'philosophy':     return <PhilosophySection accent={accent} />
    case 'skills-overview':return <SkillsOverviewSection accent={accent} />
    case 'skills-grid':    return <SkillsGridSection accent={accent} />
    case 'approach':       return <ApproachSection accent={accent} />
    case 'project':        return <ProjectSection accent={accent} projectIndex={projectIndex} chNum={num} />
    case 'impact':         return <ImpactSection accent={accent} />
    case 'passion':        return <PassionSection accent={accent} />
    case 'journey':        return <JourneySection accent={accent} />
    case 'values':         return <ValuesSection accent={accent} />
    case 'experience':     return <ExperienceSection accent={accent} />
    case 'principles':     return <PrinciplesSection accent={accent} />
    case 'testimonials':   return <TestimonialsSection accent={accent} />
    case 'contact':        return <ContactSection accent={accent} />
    default:               return null
  }
}

export default function App() {
  const [ready, setReady] = useState(false)

  /* ── Lenis smooth scroll ──────────────────────────────────── */
  useEffect(() => {
    if (!ready) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [ready])

  /* ── Chapter transition flash ─────────────────────────────── */
  useEffect(() => {
    if (!ready) return

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(`chapter-${ch.num}`)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 5%',
        onEnter: () => {
          gsap.fromTo(
            '.transition-flash',
            { opacity: 0.25 },
            { opacity: 0, duration: 0.6, ease: 'power2.out' }
          )
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [ready])

  return (
    <>
      {/* Flash overlay for transitions */}
      <div
        className="transition-flash fixed inset-0 pointer-events-none"
        style={{ background: '#d4af37', opacity: 0, zIndex: 9980 }}
      />

      {!ready && <Preloader onDone={() => setReady(true)} />}

      {ready && (
        <>
          <GrainOverlay />
          <FloatingSymbols />
          <CustomCursor />
          <SideNav />

          <main>
            {CHAPTERS.map((ch) => (
              <ChapterSection key={ch.id} data={ch}>
                <ChapterContent data={ch} />
              </ChapterSection>
            ))}
          </main>
        </>
      )}
    </>
  )
}
