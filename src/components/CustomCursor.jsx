import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ── Sudarshana Chakra — 16 flame-blades, counter-spinning inner lotus ── */

export default function CustomCursor() {
  const wrapRef  = useRef(null)
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const outerTw  = useRef(null)
  const innerTw  = useRef(null)

  useEffect(() => {
    /* Transform origins anchored to SVG centre (0,0) */
    gsap.set(outerRef.current, { transformOrigin: '0px 0px' })
    gsap.set(innerRef.current, { transformOrigin: '0px 0px' })

    /* Perpetual spin */
    outerTw.current = gsap.to(outerRef.current, {
      rotation: 360, duration: 1.4, ease: 'none', repeat: -1,
    })
    innerTw.current = gsap.to(innerRef.current, {
      rotation: -360, duration: 2.4, ease: 'none', repeat: -1,
    })

    /* Mouse tracking — slight lag gives organic flight feel */
    const onMove = (e) => {
      gsap.to(wrapRef.current, {
        x: e.clientX, y: e.clientY, duration: 0.28, ease: 'expo.out',
      })
    }

    /* Hover: links → spin faster + grow */
    const onEnterLink = () => {
      gsap.to(wrapRef.current, { scale: 1.65, duration: 0.25, ease: 'back.out(2)' })
      outerTw.current.timeScale(3)
      innerTw.current.timeScale(3)
    }
    const onLeaveLink = () => {
      gsap.to(wrapRef.current, { scale: 1, duration: 0.3 })
      outerTw.current.timeScale(1)
      innerTw.current.timeScale(1)
    }

    /* Hover: images → go full Vishwarupa mode */
    const onEnterImg = () => {
      gsap.to(wrapRef.current, { scale: 2.6, duration: 0.35, ease: 'back.out(1.5)' })
      outerTw.current.timeScale(6)
      innerTw.current.timeScale(6)
    }
    const onLeaveImg = () => {
      gsap.to(wrapRef.current, { scale: 1, duration: 0.4 })
      outerTw.current.timeScale(1)
      innerTw.current.timeScale(1)
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
      outerTw.current?.kill()
      innerTw.current?.kill()
    }
  }, [])

  /* ── Geometry ──────────────────────────────────────────── */

  /* 16 outer flame-blades */
  const blades = Array.from({ length: 16 }, (_, i) => (
    <path
      key={i}
      d="M 0,-34 C 3.8,-25 3.2,-22 2,-19 L 0,-17.5 L -2,-19 C -3.2,-22 -3.8,-25 0,-34 Z"
      fill="#d4af37"
      transform={`rotate(${i * 22.5})`}
    />
  ))

  /* 8 inner counter-spinning lotus petals */
  const petals = Array.from({ length: 8 }, (_, i) => (
    <path
      key={i}
      d="M 0,-13 C 1.8,-9 1.6,-7.5 1,-6 L 0,-5 L -1,-6 C -1.6,-7.5 -1.8,-9 0,-13 Z"
      fill="#f5e07a"
      transform={`rotate(${i * 45})`}
    />
  ))

  /* 8 thin spokes at 45° offset to petals */
  const spokes = Array.from({ length: 8 }, (_, i) => (
    <line
      key={i}
      x1="0" y1="-7" x2="0" y2="-15"
      stroke="rgba(212,175,55,0.35)"
      strokeWidth="0.7"
      transform={`rotate(${i * 45 + 22.5})`}
    />
  ))

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{ zIndex: 9999, marginLeft: -22, marginTop: -22, willChange: 'transform' }}
    >
      <svg
        width="44" height="44"
        viewBox="-37 -37 74 74"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: 'visible',
          filter: [
            'drop-shadow(0 0 3px rgba(255,200,60,1))',
            'drop-shadow(0 0 8px rgba(212,175,55,0.85))',
            'drop-shadow(0 0 18px rgba(200,140,20,0.5))',
          ].join(' '),
        }}
      >
        {/* ── Outer: 16 blades + dual ring ── */}
        <g ref={outerRef}>
          {blades}
          <circle r="17" fill="none" stroke="#d4af37" strokeWidth="1.4" />
          <circle r="18.5" fill="none" stroke="rgba(212,175,55,0.22)" strokeWidth="0.6" />
        </g>

        {/* ── Inner: 8 lotus petals + spokes ── */}
        <g ref={innerRef}>
          {spokes}
          {petals}
          <circle r="5" fill="rgba(212,175,55,0.18)" stroke="#d4af37" strokeWidth="0.9" />
        </g>

        {/* ── Static hub ── */}
        <circle r="2.4" fill="#f5e090" />
        <circle r="0.9" fill="rgba(255,255,220,0.95)" />
      </svg>
    </div>
  )
}
