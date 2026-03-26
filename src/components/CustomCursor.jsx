import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const wrapRef = useRef(null)
  const chakRef = useRef(null)
  const spinTw  = useRef(null)

  useEffect(() => {
    gsap.set(chakRef.current, { transformOrigin: '0px 0px' })

    spinTw.current = gsap.to(chakRef.current, {
      rotation: 360, duration: 1.4, ease: 'none', repeat: -1,
    })

    const onMove = (e) => {
      gsap.to(wrapRef.current, {
        x: e.clientX, y: e.clientY, duration: 0.28, ease: 'expo.out',
      })
    }

    const onEnterLink = () => {
      gsap.to(wrapRef.current, { scale: 1.65, duration: 0.25, ease: 'back.out(2)' })
      spinTw.current.timeScale(3)
    }
    const onLeaveLink = () => {
      gsap.to(wrapRef.current, { scale: 1, duration: 0.3 })
      spinTw.current.timeScale(1)
    }

    const onEnterImg = () => {
      gsap.to(wrapRef.current, { scale: 2.6, duration: 0.35, ease: 'back.out(1.5)' })
      spinTw.current.timeScale(6)
    }
    const onLeaveImg = () => {
      gsap.to(wrapRef.current, { scale: 1, duration: 0.4 })
      spinTw.current.timeScale(1)
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

  /* 16 flame-blades — single unified disc */
  const blades = Array.from({ length: 16 }, (_, i) => (
    <path
      key={i}
      d="M 0,-34 C 3.8,-25 3.2,-22 2,-19 L 0,-17.5 L -2,-19 C -3.2,-22 -3.8,-25 0,-34 Z"
      fill="#d4af37"
      transform={`rotate(${i * 22.5})`}
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
        {/* Single spinning disc */}
        <g ref={chakRef}>
          {blades}
          <circle r="17" fill="none" stroke="#d4af37" strokeWidth="1.4" />
          <circle r="18.5" fill="none" stroke="rgba(212,175,55,0.22)" strokeWidth="0.6" />
        </g>

        {/* Static centre */}
        <circle r="2.8" fill="#f5e090" />
        <circle r="1" fill="rgba(255,255,220,0.95)" />
      </svg>
    </div>
  )
}
