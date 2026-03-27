import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useState } from 'react'
import { CHAPTERS } from '../data/chapters'

/* ── Gold dust particle trail ──────────────────────────────────────────────
   Canvas sits fixed behind the chakra (z-index 9998).
   Each mousemove spawns N particles (more when moving fast).
   RAF loop ticks each particle's age; opacity = 1 - age/LIFE.
   Velocity is carried forward to give the trail a curved, flowing feel.
───────────────────────────────────────────────────────────────────────── */
const LIFE    = 800   // ms until full fade
const GOLD    = [212, 175, 55]

function useDustTrail() {
  const canvasRef = useRef(null)
  const pRef      = useRef([])   // active particles
  const lastPos   = useRef({ x: 0, y: 0 })
  const velRef    = useRef({ x: 0, y: 0 })
  const rafRef    = useRef(null)
  const lastTime  = useRef(performance.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // smooth velocity
      velRef.current = {
        x: velRef.current.x * 0.5 + dx * 0.5,
        y: velRef.current.y * 0.5 + dy * 0.5,
      }

      lastPos.current = { x: e.clientX, y: e.clientY }

      // spawn 1–6 particles depending on speed
      const count = Math.min(6, Math.max(1, Math.floor(speed * 0.18)))
      for (let i = 0; i < count; i++) {
        const frac = i / Math.max(count - 1, 1)
        pRef.current.push({
          x:    e.clientX - dx * (1 - frac) + (Math.random() - 0.5) * 4,
          y:    e.clientY - dy * (1 - frac) + (Math.random() - 0.5) * 4,
          vx:   velRef.current.x * (0.06 + Math.random() * 0.08),
          vy:   velRef.current.y * (0.06 + Math.random() * 0.08),
          r:    0.8 + Math.random() * 1.4,         // 0.8–2.2 px radius
          born: performance.now(),
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    // RAF render loop
    const ctx = canvas.getContext('2d')
    const tick = () => {
      const now   = performance.now()
      const dt    = now - lastTime.current
      lastTime.current = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pRef.current = pRef.current.filter(p => {
        const age = now - p.born
        if (age >= LIFE) return false

        const progress = age / LIFE
        const alpha    = (1 - progress) * 0.80   // max 80% opacity

        // gentle drift — velocity decays with age
        p.x += p.vx * (1 - progress * 0.8) * dt * 0.06
        p.y += p.vy * (1 - progress * 0.8) * dt * 0.06

        // inner bright core + outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2)
        grad.addColorStop(0,   `rgba(255, 240, 120, ${alpha})`)
        grad.addColorStop(0.4, `rgba(${GOLD.join(',')}, ${alpha * 0.7})`)
        grad.addColorStop(1,   `rgba(${GOLD.join(',')}, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        return true
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return canvasRef
}

export default function CustomCursor() {
  const wrapRef        = useRef(null)
  const svgRef         = useRef(null)
  const spinTw         = useRef(null)
  const dustCanvas     = useDustTrail()
  const [accent, setAccent] = useState('#d4af37')
  const zoneScale      = useRef(1)      // base scale from hover zone
  const zoneSpeedRef   = useRef(1)      // base spin speed from hover zone
  const isOnInteractive = useRef(false) // true while over a link/img

  useEffect(() => {
    // Fix: transformOrigin '50% 50%' is always relative to the element's own
    // bounding box — never drifts as the cursor moves (unlike svgOrigin which
    // computes an absolute viewport point at init time).
    gsap.set(svgRef.current, { transformOrigin: '50% 50%' })
    spinTw.current = gsap.to(svgRef.current, {
      rotation: '+=360', duration: 1.4, ease: 'none', repeat: -1,
    })

    let currentZone = 'default'

    const applyZone = (zone) => {
      if (zone === currentZone) return
      currentZone = zone
      const s = zone === 'art' ? 1.9 : zone === 'content' ? 0.68 : 1
      const t = zone === 'art' ? 2.2 : zone === 'content' ? 0.70 : 1
      zoneScale.current    = s
      zoneSpeedRef.current = t
      if (!isOnInteractive.current) {
        gsap.to(svgRef.current, { scale: s, duration: 0.55, ease: 'expo.out' })
        spinTw.current.timeScale(t)
      }
    }

    const onMove = (e) => {
      gsap.to(wrapRef.current, {
        x: e.clientX, y: e.clientY, duration: 0.28, ease: 'expo.out',
      })
      // Detect which zone the cursor is in
      const t = e.target
      if (t.closest('.ch-art, .mobile-opener'))    applyZone('art')
      else if (t.closest('.editorial-content'))     applyZone('content')
      else                                          applyZone('default')
    }

    const onEnterLink = () => {
      isOnInteractive.current = true
      gsap.to(svgRef.current, { scale: 1.65, duration: 0.25, ease: 'back.out(2)' })
      spinTw.current.timeScale(3)
    }
    const onLeaveLink = () => {
      isOnInteractive.current = false
      gsap.to(svgRef.current, { scale: zoneScale.current, duration: 0.3 })
      spinTw.current.timeScale(zoneSpeedRef.current)
    }

    const onEnterImg = () => {
      isOnInteractive.current = true
      gsap.to(svgRef.current, { scale: 2.6, duration: 0.35, ease: 'back.out(1.5)' })
      spinTw.current.timeScale(6)
    }
    const onLeaveImg = () => {
      isOnInteractive.current = false
      gsap.to(svgRef.current, { scale: zoneScale.current, duration: 0.4 })
      spinTw.current.timeScale(zoneSpeedRef.current)
    }

    window.addEventListener('mousemove', onMove)
    const links = document.querySelectorAll('a, button, [role="button"]')
    const imgs  = document.querySelectorAll('img, [data-cursor="view"]')
    links.forEach(el => { el.addEventListener('mouseenter', onEnterLink); el.addEventListener('mouseleave', onLeaveLink) })
    imgs.forEach(el  => { el.addEventListener('mouseenter', onEnterImg);  el.addEventListener('mouseleave', onLeaveImg)  })

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach(el => { el.removeEventListener('mouseenter', onEnterLink); el.removeEventListener('mouseleave', onLeaveLink) })
      imgs.forEach(el  => { el.removeEventListener('mouseenter', onEnterImg);  el.removeEventListener('mouseleave', onLeaveImg)  })
      spinTw.current?.kill()
    }
  }, [])

  useEffect(() => {
    const items = [
      { accent: '#d4af37', getEl: () => document.getElementById('book-hero') },
      ...CHAPTERS.map(ch => ({ accent: ch.accent, getEl: () => document.getElementById(`chapter-${ch.id}`) })),
    ]
    const update = () => {
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

  /* 16 flame-blades — single unified disc */
  const blades = Array.from({ length: 16 }, (_, i) => (
    <path
      key={i}
      d="M 0,-34 C 3.8,-25 3.2,-22 2,-19 L 0,-17.5 L -2,-19 C -3.2,-22 -3.8,-25 0,-34 Z"
      fill={accent}
      transform={`rotate(${i * 22.5})`}
    />
  ))

  return (
    <>
      {/* Gold dust trail — behind chakra */}
      <canvas
        ref={dustCanvas}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Sudarshana Chakra */}
      <div
        ref={wrapRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 9999, marginLeft: -22, marginTop: -22, willChange: 'transform' }}
      >
        <svg
          ref={svgRef}
          width="44" height="44"
          viewBox="-37 -37 74 74"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: 'visible',
            transition: 'filter 0.8s ease',
            filter: [
              `drop-shadow(0 0 3px ${accent})`,
              `drop-shadow(0 0 8px ${accent}dd)`,
              `drop-shadow(0 0 18px ${accent}88)`,
            ].join(' '),
          }}
        >
          {blades}
          <circle r="17"   fill="none" stroke={accent}                   strokeWidth="1.4" />
          <circle r="18.5" fill="none" stroke={`${accent}38`}            strokeWidth="0.6" />
          <circle r="2.8"  fill="#f5e090" />
          <circle r="1"    fill="rgba(255,255,220,0.95)" />
        </svg>
      </div>
    </>
  )
}
