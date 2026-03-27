import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import BigBangPreloader  from './components/BigBangPreloader'
import GlobalBackground  from './components/GlobalBackground'
import HeroSection       from './components/HeroSection'
import ChapterSection    from './components/ChapterSection'
import ButterflyClosing  from './components/ButterflyClosing'
import BookSpine         from './components/BookSpine'
import ChapterNav        from './components/ChapterNav'
import ScrollProgress    from './components/ScrollProgress'
import CustomCursor      from './components/CustomCursor'
import GrainOverlay      from './components/GrainOverlay'
import AmbientAudio      from './components/AmbientAudio'
import { CHAPTERS }      from './data/chapters'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady]   = useState(false)
  const lenisRef = useRef(null)

  /* ── Wire Lenis + ScrollTrigger once preloader exits ── */
  useEffect(() => {
    if (!ready) return

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    /* Feed lenis time into gsap's ticker */
    const lenisRaf = time => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    /* Keep ScrollTrigger in sync */
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenisRaf)
      ScrollTrigger.killAll()
    }
  }, [ready])

  return (
    <>
      {/* Always-present UI chrome */}
      <ScrollProgress />
      <GrainOverlay />
      <CustomCursor />

      {/* Big Bang → reveals world */}
      {!ready && (
        <BigBangPreloader onDone={() => setReady(true)} />
      )}

      {/* Main experience — mounts the instant preloader fires onDone */}
      {ready && (
        <>
          {/* Persistent living background (Chakra, lotus, particles, geometry) */}
          <GlobalBackground />

          {/* Scroll narrative */}
          <main>
            <HeroSection />
            {CHAPTERS.map(ch => (
              <ChapterSection key={ch.id} chapter={ch} />
            ))}
            <ButterflyClosing />
          </main>

          {/* Book spine — fixed left edge, tracks current chapter */}
          <BookSpine chapters={CHAPTERS} />

          {/* Chapter navigation — fixed footer, jump to any chapter */}
          <ChapterNav chapters={CHAPTERS} />

          {/* Ambient OM audio toggle */}
          <AmbientAudio />
        </>
      )}
    </>
  )
}
