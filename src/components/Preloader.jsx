import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }) {
  const el = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    // Fake progress
    const interval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 14
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (pct < 100) return
    // Animate out
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone })
      tl.to('.pre-line', { scaleX: 1, duration: 0.6, ease: 'expo.inOut' })
        .to('.pre-shloka', { opacity: 0, y: -20, duration: 0.4 }, '-=0.1')
        .to('.pre-counter', { opacity: 0, duration: 0.3 }, '<')
        .to('.pre-panel', { yPercent: -100, duration: 0.8, ease: 'expo.inOut', stagger: 0.06 })
    }, el)
    return () => ctx.revert()
  }, [pct, onDone])

  const display = Math.min(Math.floor(pct), 100)

  return (
    <div ref={el} className="fixed inset-0 z-[9999] flex pointer-events-none">
      {/* Three panels stagger out */}
      {['#050b1a', '#060d20', '#04091a'].map((bg, i) => (
        <div
          key={i}
          className="pre-panel flex-1 h-full"
          style={{ background: bg }}
        />
      ))}

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none">
        {/* Gold horizontal line (expands) */}
        <div className="w-48 h-px bg-gold/20 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-100"
            style={{ width: `${display}%` }}
          />
        </div>

        {/* Shloka */}
        <div className="pre-shloka text-center">
          <p className="font-cinzel text-xl md:text-2xl text-gold tracking-widest mb-2">
            यतो धर्मस्ततो जयः
          </p>
          <p className="font-heading text-xs tracking-[0.4em] text-cream/40 uppercase">
            Where there is dharma, there is victory
          </p>
        </div>

        {/* Counter */}
        <div className="pre-counter font-cinzel text-7xl text-gold/20 font-black tabular-nums">
          {String(display).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}
