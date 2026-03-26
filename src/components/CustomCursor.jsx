import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'expo.out' })
    }

    const onEnterLink = () => {
      gsap.to(ring.current, { scale: 2.2, borderColor: 'rgba(212,175,55,0.8)', duration: 0.3 })
      gsap.to(dot.current, { scale: 0.3, duration: 0.3 })
    }
    const onLeaveLink = () => {
      gsap.to(ring.current, { scale: 1, borderColor: 'rgba(212,175,55,0.4)', duration: 0.3 })
      gsap.to(dot.current, { scale: 1, duration: 0.3 })
    }

    const onEnterImg = () => {
      gsap.to(ring.current, { scale: 4, borderColor: 'rgba(212,175,55,0.6)', duration: 0.4 })
      gsap.to(dot.current, { scale: 0, duration: 0.3 })
      gsap.to(label.current, { opacity: 1, scale: 1, duration: 0.3 })
    }
    const onLeaveImg = () => {
      gsap.to(ring.current, { scale: 1, duration: 0.4 })
      gsap.to(dot.current, { scale: 1, duration: 0.3 })
      gsap.to(label.current, { opacity: 0, scale: 0.5, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button, [role="button"]')
    const imgs = document.querySelectorAll('img, [data-cursor="view"]')

    links.forEach((el) => { el.addEventListener('mouseenter', onEnterLink); el.addEventListener('mouseleave', onLeaveLink) })
    imgs.forEach((el) => { el.addEventListener('mouseenter', onEnterImg); el.addEventListener('mouseleave', onLeaveImg) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach((el) => { el.removeEventListener('mouseenter', onEnterLink); el.removeEventListener('mouseleave', onLeaveLink) })
      imgs.forEach((el) => { el.removeEventListener('mouseenter', onEnterImg); el.removeEventListener('mouseleave', onLeaveImg) })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: '50%', background: '#d4af37', mixBlendMode: 'difference' }}
      />
      {/* Ring */}
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ width: 32, height: 32, marginLeft: -16, marginTop: -16, borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span
          ref={label}
          className="font-heading text-[8px] tracking-widest text-gold uppercase"
          style={{ opacity: 0, transform: 'scale(0.5)' }}
        >
          View
        </span>
      </div>
    </>
  )
}
