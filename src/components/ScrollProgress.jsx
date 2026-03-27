import { useEffect, useState } from 'react'
import { CHAPTERS } from '../data/chapters'

export default function ScrollProgress() {
  const [pct,    setPct]    = useState(0)
  const [accent, setAccent] = useState('#d4af37')

  useEffect(() => {
    const items = [
      { accent: '#d4af37', getEl: () => document.getElementById('book-hero') },
      ...CHAPTERS.map(ch => ({ accent: ch.accent, getEl: () => document.getElementById(`chapter-${ch.id}`) })),
    ]

    const update = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)

      const mid = window.innerHeight * 0.5
      let found = '#d4af37'
      for (const item of items) {
        const el = item.getEl()
        if (el && el.getBoundingClientRect().top <= mid) found = item.accent
      }
      setAccent(found)
    }

    let rafId = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => { update(); rafId = null })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '2px',
      zIndex: 600,
      background: 'rgba(212,175,55,0.06)',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: `linear-gradient(to right, ${accent}88, ${accent} 40%, ${accent})`,
        boxShadow: `0 0 10px ${accent}aa, 0 0 4px ${accent}77`,
        transition: 'width 0.12s linear, background 0.9s ease, box-shadow 0.9s ease',
      }} />
    </div>
  )
}
