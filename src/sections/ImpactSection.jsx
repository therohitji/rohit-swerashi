import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../data/chapters'

gsap.registerPlugin(ScrollTrigger)

export default function ImpactSection({ accent }) {
  const el = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const target = el.current.querySelectorAll('.stat-val')[i]
        if (!target) return
        gsap.from({ val: 0 }, {
          val: parseInt(stat.value) || 0,
          duration: 2,
          ease: 'power2.out',
          delay: i * 0.15,
          onUpdate() { if (target) target.textContent = Math.round(this.targets()[0].val) },
          scrollTrigger: { trigger: el.current, start: 'top 70%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={el} className="w-full max-w-6xl mx-auto px-8 md:px-16 py-32 min-h-screen flex flex-col justify-center">
      <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: accent, opacity: 0.7 }}>
        Vishwarupa Yoga · Chapter XI
      </span>
      <h2 className="font-cinzel text-4xl md:text-5xl text-cream mb-3">
        The Full <span style={{ color: accent }}>Scale</span>
      </h2>
      <div className="h-px w-16 mb-14" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, suffix, label }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="font-cinzel text-5xl md:text-6xl font-black leading-none" style={{ color: accent }}>
              <span className="stat-val">{value}</span>
              <span className="text-3xl">{suffix}</span>
            </div>
            <div className="h-px w-8" style={{ background: `${accent}40` }} />
            <span className="font-heading text-xs tracking-widest text-cream/50 uppercase">{label}</span>
          </div>
        ))}
      </div>

      <p className="font-body text-cream/50 leading-relaxed max-w-lg mt-14 text-sm md:text-base">
        {/* ← Update with your real impact statement */}
        Like the Vishwarupa — the true scale only reveals itself when you look closer.
        Every number above represents real people, real problems, real solutions.
      </p>
    </div>
  )
}
