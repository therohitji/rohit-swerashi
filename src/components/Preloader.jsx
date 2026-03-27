import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   OM PARTICLE PRELOADER — Full Cinematic Sequence

   Phase 0 (1.2 s) : Single gold particle breathes at centre
   Phase 1 (0.9 s) : 2 000 particles ERUPT outward from centre
   Phase 2 (1.7 s) : Particles slow at edges → pulled to OM positions
   Phase 3 (4.0 s) : OM breathes ±4 % · Sanskrit materialises
   Phase 4 (0.5 s) : Canvas fades · crack line shoots up
   Phase 5 (React) : Glass shards fly away → Battlefield revealed → onDone
───────────────────────────────────────────────────────────── */

const MAX_P  = 2000
const SANSKRIT = '॥ अथ श्रीमद्भगवद्गीतासुपनिषत्सु ॥'

/* ── 20 clip-path shards that tile the viewport ── */
const SHARDS = [
  { c:'polygon(0% 0%,26% 0%,22% 20%,0% 18%)',          v:[-180,-200,-38,0.00] },
  { c:'polygon(26% 0%,52% 0%,48% 19%,22% 20%)',         v:[ -20,-240, 20,0.07] },
  { c:'polygon(52% 0%,78% 0%,80% 20%,48% 19%)',         v:[  30,-230,-18,0.04] },
  { c:'polygon(78% 0%,100% 0%,100% 17%,80% 20%)',       v:[ 190,-200, 40,0.01] },
  { c:'polygon(0% 18%,22% 20%,18% 38%,0% 36%)',         v:[-210, -90,-30,0.14] },
  { c:'polygon(22% 20%,48% 19%,44% 38%,18% 38%)',       v:[ -70,-150, 27,0.20] },
  { c:'polygon(48% 19%,80% 20%,76% 37%,44% 38%)',       v:[  50,-170,-22,0.17] },
  { c:'polygon(80% 20%,100% 17%,100% 36%,76% 37%)',     v:[ 215, -90, 38,0.11] },
  { c:'polygon(0% 36%,18% 38%,16% 58%,0% 56%)',         v:[-225,  15,-42,0.25] },
  { c:'polygon(18% 38%,44% 38%,40% 59%,16% 58%)',       v:[ -95, -50, 32,0.30] },
  { c:'polygon(44% 38%,76% 37%,72% 58%,40% 59%)',       v:[  30, -70,-26,0.27] },
  { c:'polygon(76% 37%,100% 36%,100% 58%,72% 58%)',     v:[ 220,   8, 40,0.22] },
  { c:'polygon(0% 56%,16% 58%,14% 76%,0% 74%)',         v:[-220, 100,-36,0.35] },
  { c:'polygon(16% 58%,40% 59%,38% 77%,14% 76%)',       v:[-105,  65, 25,0.40] },
  { c:'polygon(40% 59%,72% 58%,68% 76%,38% 77%)',       v:[  20,  85,-24,0.37] },
  { c:'polygon(72% 58%,100% 58%,100% 74%,68% 76%)',     v:[ 225,  85, 38,0.32] },
  { c:'polygon(0% 74%,14% 76%,10% 100%,0% 100%)',       v:[-195, 200,-40,0.44] },
  { c:'polygon(14% 76%,38% 77%,34% 100%,10% 100%)',     v:[ -90, 200, 18,0.48] },
  { c:'polygon(38% 77%,68% 76%,64% 100%,34% 100%)',     v:[  10, 245,-14,0.46] },
  { c:'polygon(68% 76%,100% 74%,100% 100%,64% 100%)',   v:[ 195, 200, 38,0.41] },
]

/* ── Sample pixel positions of the ॐ glyph ── */
function getOmPositions(W, H) {
  const size = Math.min(W, H) * 0.60
  const off  = document.createElement('canvas')
  off.width  = off.height = Math.ceil(size * 1.4)
  const ctx  = off.getContext('2d')
  ctx.clearRect(0, 0, off.width, off.height)
  ctx.fillStyle    = '#fff'
  ctx.font         = `${size}px 'Noto Serif','Segoe UI Symbol',serif`
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ॐ', off.width / 2, off.height / 2)
  const data = ctx.getImageData(0, 0, off.width, off.height).data
  const pts  = []
  for (let y = 0; y < off.height; y += 3)
    for (let x = 0; x < off.width; x += 3)
      if (data[(y * off.width + x) * 4 + 3] > 110) pts.push({ x, y })
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pts[i], pts[j]] = [pts[j], pts[i]]
  }
  const sample = pts.slice(0, MAX_P)
  const ox = (W - off.width)  / 2
  const oy = (H - off.height) / 2
  return sample.map(p => ({ x: p.x + ox, y: p.y + oy }))
}

/* ── Sanskrit text — letters materialise one by one ── */
function SanskritText() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c >= SANSKRIT.length) { clearInterval(iv); return c }
        return c + 1
      })
    }, 62)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{
      position: 'absolute',
      bottom: '27%', left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Cinzel, serif',
      fontSize: 'clamp(0.52rem, 1.1vw, 0.76rem)',
      color: 'rgba(212,175,55,0.70)',
      letterSpacing: '0.18em',
      whiteSpace: 'nowrap',
      zIndex: 6, pointerEvents: 'none',
    }}>
      {SANSKRIT.split('').map((ch, i) => (
        <span key={i} style={{
          opacity: i < count ? 1 : 0,
          transition: 'opacity 0.22s ease',
          display: 'inline-block',
        }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </div>
  )
}

/* ── Gold crack line shoots up from OM centre ── */
function CrackLine() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '50%', left: 'calc(50% - 1px)',
      width: 2, height: 0,
      background: 'linear-gradient(to bottom, rgba(212,175,55,0.15), rgba(212,175,55,0.95))',
      transformOrigin: 'bottom center',
      animation: 'crackShoot 0.28s ease-out forwards',
      zIndex: 8, pointerEvents: 'none',
    }} />
  )
}

/* ── Glass shards — black divs with clip-paths that fly away ── */
function GlassShards({ fly }) {
  return (
    <>
      {SHARDS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          background: '#000004',
          clipPath: s.c,
          transform: fly
            ? `translate(${s.v[0]}px,${s.v[1]}px) rotate(${s.v[2]}deg) scale(0.28)`
            : 'none',
          opacity: fly ? 0 : 1,
          transition: fly
            ? `transform ${0.62 + s.v[3] * 0.38}s cubic-bezier(0.55,0,1,0.45) ${s.v[3] * 0.55}s,
               opacity 0.32s ease ${0.22 + s.v[3] * 0.45}s`
            : 'none',
          zIndex: 7, pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN PRELOADER
───────────────────────────────────────────────────────────── */
export default function Preloader({ onDone }) {
  const canvasRef    = useRef(null)
  const doneRef      = useRef(false)
  const [showText,   setShowText]   = useState(false)
  const [cracking,   setCracking]   = useState(false)
  const [shattering, setShattering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W   = canvas.width  = window.innerWidth
    const H   = canvas.height = window.innerHeight

    let animId, phase = 0, elapsed = 0, lastFrame = performance.now()
    let canvasAlpha = 1

    const D = { pulse:1200, explode:900, converge:1700, breathe:4000, fade:500 }

    const targets = getOmPositions(W, H)
    const N = targets.length

    const px  = new Float32Array(N)  // current x
    const py  = new Float32Array(N)  // current y
    const ix  = new Float32Array(N)  // explosion intermediate x
    const iy  = new Float32Array(N)  // explosion intermediate y
    const tx  = new Float32Array(N)  // OM target x
    const ty  = new Float32Array(N)  // OM target y
    const del = new Float32Array(N)  // convergence stagger

    for (let i = 0; i < N; i++) {
      tx[i] = targets[i].x
      ty[i] = targets[i].y
      px[i] = W / 2
      py[i] = H / 2
      /* Explosion direction: biased toward OM target with ±80° spread */
      const base  = Math.atan2(ty[i] - H/2, tx[i] - W/2)
      const spread = (Math.random() - 0.5) * Math.PI * 0.9
      const angle  = base + spread
      const dist   = (0.46 + Math.random() * 0.32) * Math.max(W, H)
      ix[i] = W/2 + Math.cos(angle) * dist
      iy[i] = H/2 + Math.sin(angle) * dist
      del[i] = Math.random() * 0.38
    }

    const easeOut   = t => 1 - Math.pow(1 - t, 3)
    const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2

    function draw(now) {
      animId = requestAnimationFrame(draw)
      const dt = Math.min(now - lastFrame, 50)
      lastFrame = now
      elapsed  += dt

      ctx.globalAlpha = canvasAlpha
      ctx.fillStyle   = '#000004'
      ctx.fillRect(0, 0, W, H)

      /* ─ Phase 0: Breathing single particle ─ */
      if (phase === 0) {
        const t    = Math.min(elapsed / D.pulse, 1)
        const beat = Math.sin(t * Math.PI * 4) * 0.5 + 0.5
        const r    = 1.5 + beat * 7
        const a    = 0.35 + beat * 0.65

        const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, r * 5)
        gr.addColorStop(0, `rgba(212,175,55,${a * 0.28})`)
        gr.addColorStop(1, 'rgba(212,175,55,0)')
        ctx.beginPath(); ctx.arc(W/2, H/2, r*5, 0, Math.PI*2)
        ctx.fillStyle = gr; ctx.fill()

        ctx.beginPath(); ctx.arc(W/2, H/2, r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(212,175,55,${a})`; ctx.fill()

        if (t >= 1) { phase = 1; elapsed = 0 }
        return
      }

      /* ─ Phase 1: Explosion outward from centre ─ */
      if (phase === 1) {
        const t = Math.min(elapsed / D.explode, 1)
        const e = easeOut(t)
        for (let i = 0; i < N; i++) {
          px[i] = W/2 + (ix[i] - W/2) * e
          py[i] = H/2 + (iy[i] - H/2) * e
          const alpha = 0.45 + e * 0.45
          const size  = 1.1 + e * 0.7
          ctx.beginPath(); ctx.arc(px[i], py[i], size, 0, Math.PI*2)
          ctx.fillStyle = `rgba(212,175,55,${alpha})`; ctx.fill()
        }
        if (t >= 1) { phase = 2; elapsed = 0 }
        return
      }

      /* ─ Phase 2: Convergence — edge → OM target ─ */
      if (phase === 2) {
        const t = Math.min(elapsed / D.converge, 1)
        const maxDist = Math.min(W, H) * 0.28

        for (let i = 0; i < N; i++) {
          const lT = Math.max(0, Math.min((t - del[i]) / (1 - del[i] * 0.5), 1))
          const e  = easeInOut(lT)
          px[i]   = ix[i] + (tx[i] - ix[i]) * e
          py[i]   = iy[i] + (ty[i] - iy[i]) * e

          /* Inner glow: particles near OM centre glow brighter */
          const d     = Math.sqrt(Math.pow(tx[i]-W/2,2)+Math.pow(ty[i]-H/2,2))
          const inner = 1 - Math.min(d / maxDist, 1)
          const alpha = 0.5 + lT*0.4 + inner*0.1
          const size  = 1.2 + lT*0.4 + inner*0.5

          ctx.beginPath(); ctx.arc(px[i], py[i], size, 0, Math.PI*2)
          ctx.fillStyle = `rgba(212,175,55,${alpha})`; ctx.fill()
        }

        /* Build-up ambient glow as OM assembles */
        if (t > 0.65) {
          const ga = (t - 0.65) / 0.35 * 0.18
          const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.28)
          gr.addColorStop(0, `rgba(212,175,55,${ga})`)
          gr.addColorStop(1, 'rgba(212,175,55,0)')
          ctx.beginPath(); ctx.arc(W/2, H/2, Math.min(W,H)*0.28, 0, Math.PI*2)
          ctx.fillStyle = gr; ctx.fill()
        }

        if (t >= 1) {
          phase = 3; elapsed = 0
          setShowText(true)
        }
        return
      }

      /* ─ Phase 3: OM breathes — ±4% scale, inner glow varies ─ */
      if (phase === 3) {
        const t       = Math.min(elapsed / D.breathe, 1)
        const breathe = 1 + Math.sin(t * Math.PI * 5.5) * 0.04
        const glowA   = 0.13 + Math.sin(t * Math.PI * 5.5) * 0.055

        const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.34)
        gr.addColorStop(0, `rgba(212,175,55,${glowA})`)
        gr.addColorStop(0.45, `rgba(212,175,55,${glowA*0.32})`)
        gr.addColorStop(1, 'rgba(212,175,55,0)')
        ctx.beginPath(); ctx.arc(W/2, H/2, Math.min(W,H)*0.34, 0, Math.PI*2)
        ctx.fillStyle = gr; ctx.fill()

        const maxDist = Math.min(W, H) * 0.28
        for (let i = 0; i < N; i++) {
          const bx    = W/2 + (tx[i]-W/2) * breathe
          const by    = H/2 + (ty[i]-H/2) * breathe
          const d     = Math.sqrt(Math.pow(tx[i]-W/2,2)+Math.pow(ty[i]-H/2,2))
          const inner = 1 - Math.min(d / maxDist, 1)
          const alpha = 0.72 + inner*0.22 + Math.sin(t*Math.PI*5.5)*0.06
          const size  = 1.35 + inner*0.55

          ctx.beginPath(); ctx.arc(bx, by, size, 0, Math.PI*2)
          ctx.fillStyle = `rgba(212,175,55,${alpha})`; ctx.fill()
        }

        /* Inner light source — brighter core */
        const inner = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.12)
        inner.addColorStop(0, `rgba(255,240,160,${0.06 + glowA*0.4})`)
        inner.addColorStop(1, 'rgba(255,240,160,0)')
        ctx.beginPath(); ctx.arc(W/2, H/2, Math.min(W,H)*0.12, 0, Math.PI*2)
        ctx.fillStyle = inner; ctx.fill()

        if (t >= 1) {
          phase = 4; elapsed = 0
          /* Gold flash + crack + shards */
          ctx.globalAlpha = canvasAlpha
          ctx.fillStyle   = 'rgba(212,175,55,0.55)'
          ctx.fillRect(0, 0, W, H)
          setCracking(true)
          setTimeout(() => setShattering(true), 260)
        }
        return
      }

      /* ─ Phase 4: Canvas fades as shards fly away ─ */
      if (phase === 4) {
        const t = Math.min(elapsed / D.fade, 1)
        canvasAlpha = Math.max(0, 1 - t * 2.2)
        ctx.globalAlpha = canvasAlpha

        /* Draw frozen OM */
        const gr = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.34)
        gr.addColorStop(0, 'rgba(212,175,55,0.12)')
        gr.addColorStop(1, 'rgba(212,175,55,0)')
        ctx.beginPath(); ctx.arc(W/2, H/2, Math.min(W,H)*0.34, 0, Math.PI*2)
        ctx.fillStyle = gr; ctx.fill()
        for (let i = 0; i < N; i++) {
          ctx.beginPath(); ctx.arc(tx[i], ty[i], 1.35, 0, Math.PI*2)
          ctx.fillStyle = 'rgba(212,175,55,0.82)'; ctx.fill()
        }

        if (t >= 1 && !doneRef.current) {
          doneRef.current = true
          cancelAnimationFrame(animId)
          onDone()
        }
      }
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [onDone])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000004' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />
      {showText  && <SanskritText />}
      {cracking  && <CrackLine />}
      {cracking  && <GlassShards fly={shattering} />}
    </div>
  )
}
