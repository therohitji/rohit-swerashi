import { useState, useRef, useEffect } from 'react'

/* ─── OM drone via Web Audio API — no audio file needed ───────────────
   Fundamental: 136.1 Hz (sacred "cosmic A" / OM frequency)
   + harmonics at 2×, 3×, and a sub-bass at 0.5× for depth.
────────────────────────────────────────────────────────────────────── */
export default function AmbientAudio() {
  const [active, setActive] = useState(false)
  const audioRef = useRef(null)

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        const { ctx, nodes } = audioRef.current
        nodes.forEach(({ osc }) => { try { osc.stop() } catch {} })
        try { ctx.close() } catch {}
      }
    }
  }, [])

  const toggle = () => {
    if (!active) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()

      const makeTone = (freq, vol, type = 'sine') => {
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 2.5)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        return { osc, gain }
      }

      const nodes = [
        makeTone(136.1, 0.10),   /* fundamental */
        makeTone(272.2, 0.05),   /* 2nd harmonic */
        makeTone(408.3, 0.025),  /* 3rd harmonic */
        makeTone(68.05, 0.07),   /* sub-bass */
      ]

      audioRef.current = { ctx, nodes }
      setActive(true)
    } else {
      const { ctx, nodes } = audioRef.current
      const t = ctx.currentTime
      nodes.forEach(({ gain, osc }) => {
        gain.gain.linearRampToValueAtTime(0, t + 1.8)
        osc.stop(t + 1.8)
      })
      setTimeout(() => { try { ctx.close() } catch {} }, 2000)
      audioRef.current = null
      setActive(false)
    }
  }

  return (
    <button
      onClick={toggle}
      title={active ? 'Silence the OM' : 'Invoke the OM'}
      style={{
        position: 'fixed',
        bottom: '72px',
        right: '20px',
        zIndex: 510,
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: `1px solid rgba(212,175,55,${active ? '0.48' : '0.16'})`,
        background: active ? 'rgba(212,175,55,0.07)' : 'rgba(3,8,16,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cinzel', serif",
        fontSize: '14px',
        color: active ? 'rgba(212,175,55,0.88)' : 'rgba(212,175,55,0.28)',
        transition: 'color 0.4s ease, border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
        animation: active ? 'omPulse 2.4s ease-in-out infinite' : 'none',
        lineHeight: 1,
        paddingBottom: '1px',
      }}
    >
      ॐ
    </button>
  )
}
