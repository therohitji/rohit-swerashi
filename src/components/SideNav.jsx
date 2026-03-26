import { useEffect, useState } from 'react'
import { CHAPTERS } from '../data/chapters'

export default function SideNav() {
  const [active, setActive] = useState(1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1200)

    const observers = CHAPTERS.map((ch) => {
      const el = document.getElementById(`chapter-${ch.num}`)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(ch.id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })

    return () => {
      clearTimeout(timeout)
      observers.forEach((o) => o?.disconnect())
    }
  }, [])

  if (!visible) return null

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 items-center">
      {/* Chapter label */}
      <span className="font-heading text-[9px] tracking-[0.3em] text-gold/40 uppercase mb-2 rotate-90 origin-center translate-y-1">
        {String(active).padStart(2, '0')}
      </span>

      {CHAPTERS.map((ch) => {
        const isActive = active === ch.id
        return (
          <a
            key={ch.id}
            href={`#chapter-${ch.num}`}
            title={`${ch.num} · ${ch.theme}`}
            className="block transition-all duration-400 group relative"
            style={{
              width: isActive ? '24px' : '4px',
              height: isActive ? '4px' : '4px',
              borderRadius: '2px',
              background: isActive ? '#d4af37' : 'rgba(212,175,55,0.22)',
              boxShadow: isActive ? '0 0 8px rgba(212,175,55,0.6)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {/* Tooltip */}
            <span className="absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap font-heading text-[9px] tracking-wider text-gold/0 group-hover:text-gold/70 transition-colors duration-200 pointer-events-none">
              {ch.theme}
            </span>
          </a>
        )
      })}

      <span className="font-heading text-[9px] tracking-[0.3em] text-gold/30 uppercase mt-2">
        18
      </span>
    </nav>
  )
}
