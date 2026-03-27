import { useState, useEffect } from 'react'

export default function ChapterNav({ chapters }) {
  const [open,       setOpen]       = useState(false)
  const [activeId,   setActiveId]   = useState(0)
  const [hoveredId,  setHoveredId]  = useState(null)
  const [barHovered, setBarHovered] = useState(false)

  /* ── Track active chapter via scroll position ────────────────────── */
  useEffect(() => {
    const items = [
      { id: 0, el: document.getElementById('book-hero') },
      ...chapters.map(ch => ({ id: ch.id, el: document.getElementById(`chapter-${ch.id}`) })),
    ].filter(s => s.el !== null)

    const update = () => {
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

  /* ── Close panel on Escape ────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return
    const handler = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const active     = chapters.find(c => c.id === activeId)
  const accentColor = active?.accent ?? '#d4af37'

  return (
    <nav
      aria-label="Chapter navigation"
      className="chapter-nav-root"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 36,   /* clear the BookSpine — overridden to 0 on mobile via CSS */
        right: 0,
        zIndex: 500,
        fontFamily: "'Cinzel', serif",
      }}
    >
      {/* ── Backdrop — click outside to close ────────────────────────── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
          }}
        />
      )}

      {/* ── Chapter grid panel ─────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(3, 7, 18, 0.97)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(212,175,55,0.16)',
        overflow: 'hidden',
        maxHeight: open ? '320px' : '0px',
        transition: 'max-height 0.42s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{
          padding: '20px 28px 8px',
        }}>
          {/* Cover / back-to-top link */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(212,175,55,0.08)',
          }}>
            <a
              href="#book-hero"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '8px',
                letterSpacing: '0.45em',
                color: activeId === 0 ? '#d4af37' : 'rgba(212,175,55,0.35)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                paddingLeft: '10px',
                borderLeft: `2px solid ${activeId === 0 ? '#d4af37' : 'rgba(212,175,55,0.15)'}`,
              }}
            >
              ॥ Cover
            </a>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '10px',
              color: 'rgba(212,175,55,0.22)',
              letterSpacing: '0.08em',
            }}>
              The Bhagavad Gita of One Life
            </span>
          </div>

          {/* 6-column × 3-row chapter grid — responsive via .chapter-nav-grid */}
          <div className="chapter-nav-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '4px 6px',
            paddingBottom: '18px',
          }}>
            {chapters.map(ch => {
              const isActive  = activeId  === ch.id
              const isHovered = hoveredId === ch.id
              const lit = isActive || isHovered
              return (
                <a
                  key={ch.id}
                  href={`#chapter-${ch.id}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredId(ch.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: 'block',
                    padding: '9px 12px 9px 11px',
                    borderLeft: `2px solid ${lit ? ch.accent : `${ch.accent}28`}`,
                    background: isActive
                      ? `${ch.accent}10`
                      : isHovered
                      ? `${ch.accent}08`
                      : 'transparent',
                    textDecoration: 'none',
                    borderRadius: '0 3px 3px 0',
                    transition: 'background 0.2s, border-color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    color: lit ? ch.accent : 'rgba(212,175,55,0.35)',
                    fontFamily: "'Cinzel', serif",
                    marginBottom: '3px',
                    transition: 'color 0.2s',
                  }}>
                    {ch.num}
                  </div>
                  <div style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.04em',
                    color: lit ? 'rgba(240,230,208,0.92)' : 'rgba(240,230,208,0.45)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    lineHeight: 1.25,
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {ch.theme}
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Toggle bar — always visible ───────────────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)}
        onMouseEnter={() => setBarHovered(true)}
        onMouseLeave={() => setBarHovered(false)}
        style={{
          height: '52px',
          background: barHovered
            ? 'rgba(10, 18, 40, 0.98)'
            : 'rgba(3, 7, 18, 0.96)',
          backdropFilter: 'blur(20px)',
          borderTop: `1.5px solid ${
            open || barHovered
              ? 'rgba(212,175,55,0.50)'
              : 'rgba(212,175,55,0.14)'
          }`,
          boxShadow: barHovered || open
            ? '0 -6px 28px rgba(212,175,55,0.07)'
            : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          cursor: 'pointer',
          transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* Left — reading position */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          minWidth: 0,
          flex: '0 0 auto',
          maxWidth: '30%',
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: accentColor,
            opacity: barHovered ? 1 : 0.6,
            flexShrink: 0,
            transition: 'background 0.4s, opacity 0.22s',
          }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '7.5px',
            letterSpacing: '0.22em',
            color: barHovered ? `${accentColor}cc` : `${accentColor}60`,
            textTransform: 'uppercase',
            transition: 'color 0.22s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {active ? `${active.num} · ${active.theme}` : 'Cover'}
          </span>
        </div>

        {/* Centre — 18 chapter dots + label */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          pointerEvents: 'none',
        }}>
          {/* 18 accent-coloured dots — one per chapter; hidden on very small screens */}
          <div className="chapter-nav-dots" style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            {chapters.map(ch => (
              <div
                key={ch.id}
                style={{
                  width: activeId === ch.id ? 8 : 5,
                  height: activeId === ch.id ? 8 : 5,
                  borderRadius: '50%',
                  background: ch.accent,
                  opacity: activeId === ch.id ? 1 : barHovered ? 0.55 : 0.28,
                  transition: 'width 0.3s, height 0.3s, opacity 0.22s',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Label */}
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '7px',
            letterSpacing: '0.5em',
            color: barHovered
              ? 'rgba(212,175,55,0.75)'
              : 'rgba(212,175,55,0.30)',
            textTransform: 'uppercase',
            transition: 'color 0.22s',
            whiteSpace: 'nowrap',
          }}>
            {open ? '✕  CLOSE' : 'CLICK TO NAVIGATE'}
          </span>
        </div>

        {/* Right — bouncing arrow */}
        <div style={{
          fontSize: '13px',
          color: barHovered
            ? 'rgba(212,175,55,0.85)'
            : 'rgba(212,175,55,0.35)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.22s',
          animation: open ? 'none' : 'navArrowNudge 2s ease-in-out infinite',
          flexShrink: 0,
        }}>
          ↑
        </div>
      </div>
    </nav>
  )
}
