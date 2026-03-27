import { useEffect, useState } from 'react'

export default function BookSpine({ chapters }) {
  const [activeId, setActiveId] = useState(0)

  useEffect(() => {
    // Build ordered list: hero (id=0) + 18 chapters
    const items = [
      { id: 0, el: document.getElementById('book-hero') },
      ...chapters.map(ch => ({ id: ch.id, el: document.getElementById(`chapter-${ch.id}`) })),
    ].filter(s => s.el !== null)

    const update = () => {
      // The active section is the last one whose top edge is above 50% of the viewport
      const mid = window.innerHeight * 0.5
      let found = 0
      for (const item of items) {
        if (item.el.getBoundingClientRect().top <= mid) found = item.id
      }
      setActiveId(found)
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
  }, [chapters])

  const active = chapters.find(c => c.id === activeId)
  const accent = active?.accent ?? '#d4af37'

  return (
    <div className="book-spine" style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: 36,
      zIndex: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, rgba(2,4,12,0.94) 0%, rgba(2,4,12,0.62) 100%)',
      borderRight: '1px solid rgba(212,175,55,0.07)',
      pointerEvents: 'none',
    }}>

      {/* Top label — book title vertical */}
      <div style={{
        position: 'absolute', top: 22,
        fontFamily: "'Cinzel', serif",
        fontSize: '7px',
        letterSpacing: '0.24em',
        color: 'rgba(212,175,55,0.20)',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        textTransform: 'uppercase',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        Rohit Swerashi
      </div>

      {/* Spine line — full height connector */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '14%', bottom: '14%',
        width: '0.5px',
        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.07) 15%, rgba(212,175,55,0.07) 85%, transparent)',
        transform: 'translateX(-50%)',
      }} />

      {/* Chapter marks */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
      }}>
        {chapters.map(ch => {
          const isActive = activeId === ch.id
          const isPast   = ch.id < activeId
          return (
            <a
              key={ch.id}
              href={`#chapter-${ch.id}`}
              title={`${ch.num} · ${ch.name}`}
              style={{
                display: 'block',
                width:  isActive ? 16 : isPast ? 5 : 4,
                height: isActive ? 3  : 2,
                borderRadius: 2,
                background: isActive
                  ? ch.accent
                  : isPast
                  ? `${ch.accent}38`
                  : 'rgba(212,175,55,0.16)',
                transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                textDecoration: 'none',
                outline: 'none',
                pointerEvents: 'all',
                flexShrink: 0,
              }}
            />
          )
        })}
      </div>

      {/* Active chapter info — vertical at bottom */}
      {active && (
        <div style={{
          position: 'absolute', bottom: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}>
          {/* Accent dot */}
          <div style={{
            width: 3, height: 3,
            borderRadius: '50%',
            background: accent,
            opacity: 0.7,
            transition: 'background 0.5s',
          }} />
          {/* Chapter label — vertical */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '7px',
            letterSpacing: '0.14em',
            color: `${accent}55`,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.5s',
          }}>
            {active.num} · {active.theme}
          </div>
        </div>
      )}
    </div>
  )
}
