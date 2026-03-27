import { useEffect, useRef } from 'react'

/* ══════════════════════════════════════════════════════════════════════
   PARTICLE TYPES  (realistic Big Bang physics)
   ══════════════════════════════════════════════════════════════════════ */
const N         = 3200

const T_PHOTON  = 0  // white / blue-white — ultra-fast long streaks (light)
const T_PLASMA  = 1  // gold / orange      — medium speed, glowing dots
const T_NEUTRON = 2  // silver / grey      — slow, heavy dots
const T_QUARK   = 3  // RGB primaries      — tiny, fast, flicker

const TYPE_COLORS = [
  [[245,250,255],[255,255,255],[200,225,255],[230,240,255]],     // photon
  [[212,175,55],[238,148,22],[255,198,60],[200,140,30]],         // plasma
  [[178,178,196],[152,152,172],[198,198,218],[165,165,185]],     // neutron
  [[255,50,60],[50,210,60],[58,78,255],[255,58,190]],            // quark
]

// Friction per type (photons barely slow, neutrons decelerate fast)
const TYPE_FRICTION = [0.990, 0.979, 0.974, 0.985]
// Base speed range [min, max] per type
const TYPE_SPEED = [[14, 28], [4, 11], [1.5, 5.5], [9, 18]]
// Base size per type
const TYPE_SIZE  = [[0.25, 0.7], [0.9, 2.8], [1.6, 3.4], [0.22, 0.55]]

/* ══════════════════════════════════════════════════════════════════════
   COSMIC CHART  (universe creation after the bang)
   ══════════════════════════════════════════════════════════════════════ */

// Deterministic star field (computed once at module load)
const STARS = Array.from({ length: 320 }, (_, i) => ({
  xf: ((i * 137.508 + 23.7) % 97.3) / 97.3,
  yf: ((i * 91.317  + 17.1) % 89.1) / 89.1,
  r:  0.32 + (i % 9) * 0.18,
  a:  0.10 + (i % 7) * 0.13,
  tw: (i * 0.618033) % (Math.PI * 2),
  ts: 0.25 + (i % 5) * 0.30,
  big: i % 22 === 0,  // 1-in-22 is a "bright star" with halo
}))

// 3 nebula blobs (colours and relative positions)
const NEBULAE = [
  { xf: 0.22, yf: 0.30, r: 0.18, c: [80,40,140] },
  { xf: 0.75, yf: 0.62, r: 0.14, c: [20,60,130] },
  { xf: 0.50, yf: 0.75, r: 0.12, c: [140,60,20] },
]

// Orbital system definitions (drawn at scale)
const ORBS = [
  { a: 56,  b: 21,  pA: 0.52,  lc: [208,202,188], pc: [210,205,195], pr: 2.6 },
  { a: 104, b: 40,  pA: 2.09,  lc: [212,175,55],  pc: [255,218,96],  pr: 4.5 },
  { a: 156, b: 59,  pA: 3.67,  lc: [120,165,215], pc: [90,142,255],  pr: 5.4 },
  { a: 210, b: 80,  pA: 5.24,  lc: [190,110,80],  pc: [252,108,78],  pr: 4.0 },
  { a: 268, b: 102, pA: 1.05,  lc: [212,175,55],  pc: [255,192,72],  pr: 7.2 },
]

/* Draw the full cosmic-chart layer (called each frame during UNIVERSE phase) */
function drawCosmicChart(ctx, W, H, elapsed, totalMs) {
  const prog = Math.min(elapsed / totalMs, 1)
  const cx   = W / 2
  const cy   = H * 0.43
  const sc   = Math.min(W, H) * 0.48 / 268   // scale so largest orbit fits

  // Fade envelope: fast in, gentle out near end
  const fadeIn  = Math.min(1, prog * 7)
  const fadeOut = prog > 0.80 ? Math.max(0, 1 - (prog - 0.80) / 0.20) : 1
  const env     = fadeIn * fadeOut
  if (env <= 0.01) return

  const t = elapsed / 1000

  /* ── Nebulae (faint colour clouds) ─────────────────────────────── */
  NEBULAE.forEach(n => {
    const nr  = n.r * Math.min(W, H) * env * 0.45
    const g   = ctx.createRadialGradient(n.xf * W, n.yf * H, 0, n.xf * W, n.yf * H, nr)
    g.addColorStop(0, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.09 * env})`)
    g.addColorStop(1, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(n.xf * W, n.yf * H, nr, 0, Math.PI * 2)
    ctx.fill()
  })

  /* ── Star field ─────────────────────────────────────────────────── */
  STARS.forEach(s => {
    const x  = s.xf * W
    const y  = s.yf * H
    const tw = Math.sin(t * s.ts + s.tw) * 0.4 + 0.6
    const a  = s.a * tw * env
    if (a < 0.012) return
    if (s.big) {
      const gr = ctx.createRadialGradient(x, y, 0, x, y, s.r * 6)
      gr.addColorStop(0, `rgba(255,255,255,${a * 0.55})`)
      gr.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gr
      ctx.beginPath()
      ctx.arc(x, y, s.r * 6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.beginPath()
    ctx.arc(x, y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${Math.min(1, a * 2.2)})`
    ctx.fill()
  })

  /* ── Horizontal measurement lines (styled like a dashed axis) ────── */
  const axAlpha = Math.min(1, (prog - 0.04) * 8) * env * 0.16
  if (axAlpha > 0.005) {
    ctx.save()
    ctx.strokeStyle = `rgba(212,175,55,${axAlpha})`
    ctx.lineWidth = 0.55
    ctx.setLineDash([5, 13])
    ;[-270,-170,-90,0,90,170,270].forEach(yo => {
      const hw = Math.max(0, (195 - Math.abs(yo) * 0.28) * sc)
      ctx.beginPath()
      ctx.moveTo(cx - hw, cy + yo * sc)
      ctx.lineTo(cx + hw, cy + yo * sc)
      ctx.stroke()
    })
    ctx.setLineDash([])
    ctx.restore()
  }

  /* ── Central sun ─────────────────────────────────────────────────── */
  const sunProg = Math.min(1, prog * 9) * env
  if (sunProg > 0.01) {
    const sr = 42 * sc
    const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sr)
    sg.addColorStop(0,   `rgba(255,248,180,${sunProg})`)
    sg.addColorStop(0.28,`rgba(212,175,55,${sunProg * 0.62})`)
    sg.addColorStop(0.65,`rgba(200,120,20,${sunProg * 0.24})`)
    sg.addColorStop(1,   'rgba(200,100,10,0)')
    ctx.fillStyle = sg
    ctx.beginPath()
    ctx.arc(cx, cy, sr, 0, Math.PI * 2)
    ctx.fill()
    // Hard core
    ctx.beginPath()
    ctx.arc(cx, cy, 4.5 * sc, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,210,${sunProg})`
    ctx.fill()
  }

  /* ── Orbital ellipses + planets ─────────────────────────────────── */
  ORBS.forEach((orb, oi) => {
    const oStart = 0.06 + oi * 0.125
    const oProg  = Math.max(0, Math.min(1, (prog - oStart) / 0.44))
    if (oProg <= 0) return

    const oAlpha  = oProg * env
    const [lr,lg,lb] = orb.lc
    const a = orb.a * sc
    const b = orb.b * sc

    // Orbit ellipse drawn as progressive arc
    ctx.save()
    ctx.translate(cx, cy)
    ctx.beginPath()
    ctx.ellipse(0, 0, a, b, 0.14, -Math.PI / 2, -Math.PI / 2 + oProg * Math.PI * 2)
    ctx.strokeStyle = `rgba(${lr},${lg},${lb},${0.30 * oAlpha})`
    ctx.lineWidth = 0.65
    ctx.stroke()
    ctx.restore()

    // Planet appears when orbit is ≥72% drawn
    if (oProg >= 0.72) {
      const pProg = Math.min(1, (oProg - 0.72) / 0.28)
      const pA    = oAlpha * pProg
      const px    = cx + Math.cos(orb.pA) * a
      const py    = cy + Math.sin(orb.pA) * b
      const [pr,pg,pb] = orb.pc

      // Halo glow
      const hg = ctx.createRadialGradient(px, py, 0, px, py, orb.pr * sc * 4.5)
      hg.addColorStop(0, `rgba(${pr},${pg},${pb},${pA * 0.88})`)
      hg.addColorStop(1, `rgba(${pr},${pg},${pb},0)`)
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(px, py, orb.pr * sc * 4.5, 0, Math.PI * 2)
      ctx.fill()

      // Planet core
      ctx.beginPath()
      ctx.arc(px, py, orb.pr * sc, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${pr},${pg},${pb},${pA})`
      ctx.fill()

      // Orbit ring around planet
      ctx.beginPath()
      ctx.arc(px, py, orb.pr * sc * 2.0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${pr},${pg},${pb},${pA * 0.35})`
      ctx.lineWidth = 0.35
      ctx.stroke()

      // Hub spoke to center
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(px, py)
      ctx.strokeStyle = `rgba(${lr},${lg},${lb},${0.07 * pA})`
      ctx.lineWidth = 0.28
      ctx.stroke()
    }
  })

  /* ── Inter-planet connection web ─────────────────────────────────── */
  if (prog > 0.58) {
    const webA = Math.min(1, (prog - 0.58) / 0.22) * env * 0.065
    if (webA > 0.003) {
      const pts = ORBS
        .filter((_, i) => prog >= 0.06 + i * 0.125 + 0.72 * 0.44)
        .map(o => ({
          x: cx + Math.cos(o.pA) * o.a * sc,
          y: cy + Math.sin(o.pA) * o.b * sc,
        }))
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(212,175,55,${webA})`
          ctx.lineWidth = 0.22
          ctx.stroke()
        }
      }
    }
  }
}


/* ══════════════════════════════════════════════════════════════════════
   MAIN PRELOADER
   ══════════════════════════════════════════════════════════════════════ */
export default function BigBangPreloader({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    /* ── Typed particle arrays ── */
    const px  = new Float32Array(N)  // position x
    const py  = new Float32Array(N)  // position y
    const vx  = new Float32Array(N)  // velocity x
    const vy  = new Float32Array(N)  // velocity y
    const sz  = new Float32Array(N)  // base radius
    const al  = new Float32Array(N)  // alpha
    const ci  = new Uint8Array(N)    // color index within type palette
    const pt  = new Uint8Array(N)    // particle type (T_PHOTON etc.)
    /* ── Initialise particles ── */
    const init = () => {
      for (let i = 0; i < N; i++) {
        px[i] = W / 2; py[i] = H / 2

        // Assign type by probability (deterministic)
        const r = (i * 2.618) % 100 / 100
        pt[i] = r < 0.40 ? T_PHOTON
               : r < 0.75 ? T_PLASMA
               : r < 0.90 ? T_NEUTRON
               :            T_QUARK

        const [sMin, sMax] = TYPE_SPEED[pt[i]]
        const spd   = sMin + ((i * 1.618) % 1) * (sMax - sMin)
        const angle = (i / N) * Math.PI * 2 + ((i * 0.381) % 1) * 0.8
        vx[i] = Math.cos(angle) * spd
        vy[i] = Math.sin(angle) * spd

        const [rMin, rMax] = TYPE_SIZE[pt[i]]
        sz[i] = rMin + ((i * 3.14) % 1) * (rMax - rMin)
        al[i] = 0.45 + ((i * 1.732) % 1) * 0.55
        ci[i] = i % TYPE_COLORS[pt[i]].length
      }
    }

    /* ═══════════════════════════════════════════════════════════════
       PHASE MACHINE
       SINGULARITY → BANG → UNIVERSE → DONE
       ═══════════════════════════════════════════════════════════════ */
    const PH = { SINGULARITY: 0, BANG: 1, UNIVERSE: 2, DONE: 3 }
    let phase   = PH.SINGULARITY
    let elapsed = 0
    let prevT   = 0
    let rafId   = 0

    /* ── SINGULARITY: quantum vacuum breathing dot ── */
    const singularityTick = t => {
      if (prevT === 0) prevT = t
      elapsed += t - prevT; prevT = t

      ctx.fillStyle = 'rgba(0,0,4,0.22)'
      ctx.fillRect(0, 0, W, H)

      // Quantum vacuum fluctuations (tiny random dots appear/disappear)
      if (elapsed > 200) {
        for (let i = 0; i < 8; i++) {
          const flx = W / 2 + (Math.sin(elapsed * 0.003 + i * 1.8) * 60)
          const fly = H / 2 + (Math.cos(elapsed * 0.004 + i * 2.1) * 60)
          const fa  = Math.max(0, Math.sin(elapsed * 0.015 + i * 0.9)) * 0.35
          ctx.beginPath()
          ctx.arc(flx, fly, 0.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212,175,55,${fa})`
          ctx.fill()
        }
      }

      // Breathing core
      const breathe = 2.2 + Math.sin(elapsed / 240) * 1.8
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, breathe * 5)
      g.addColorStop(0, 'rgba(255,248,200,1)')
      g.addColorStop(0.35, 'rgba(212,175,55,0.8)')
      g.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.beginPath()
      ctx.arc(W / 2, H / 2, breathe, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()

      if (elapsed < 1500) rafId = requestAnimationFrame(singularityTick)
      else { phase = PH.BANG; elapsed = 0; prevT = 0; rafId = requestAnimationFrame(bangTick) }
    }

    /* ── BANG: realistic physics explosion ── */
    let bangRingR = 0

    const bangTick = t => {
      if (prevT === 0) prevT = t
      const dt = Math.min(t - prevT, 30); prevT = t; elapsed += dt

      // Trail (slightly faster fade during bang for drama)
      ctx.fillStyle = 'rgba(0,0,4,0.12)'
      ctx.fillRect(0, 0, W, H)

      // Energy flash at bang start (radial white burst)
      const flashA = Math.max(0, 1 - elapsed / 420)
      if (flashA > 0) {
        const fg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.6)
        fg.addColorStop(0,   `rgba(255,255,255,${flashA * 0.95})`)
        fg.addColorStop(0.15,`rgba(255,240,180,${flashA * 0.55})`)
        fg.addColorStop(0.4, `rgba(212,175,55,${flashA * 0.15})`)
        fg.addColorStop(1,   'rgba(212,175,55,0)')
        ctx.fillStyle = fg
        ctx.fillRect(0, 0, W, H)
      }

      // Expanding energy ring (shockwave)
      if (elapsed < 900) {
        bangRingR = (elapsed / 900) * Math.max(W, H) * 0.85
        const ringA = Math.max(0, 1 - elapsed / 700) * 0.7
        ctx.beginPath()
        ctx.arc(W / 2, H / 2, bangRingR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${ringA})`
        ctx.lineWidth = 3 - (elapsed / 900) * 2.5
        ctx.stroke()
        // Second inner ring (slightly delayed)
        if (elapsed > 120) {
          const r2 = ((elapsed - 120) / 900) * Math.max(W, H) * 0.7
          const a2 = Math.max(0, 1 - (elapsed - 120) / 600) * 0.4
          ctx.beginPath()
          ctx.arc(W / 2, H / 2, r2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(212,175,55,${a2})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      // Particles
      for (let i = 0; i < N; i++) {
        const type = pt[i]
        vx[i] *= TYPE_FRICTION[type]
        vy[i] *= TYPE_FRICTION[type]
        px[i] += vx[i] * (dt / 14)
        py[i] += vy[i] * (dt / 14)

        const speed = Math.hypot(vx[i], vy[i])
        const [r, g, b] = TYPE_COLORS[type][ci[i]]
        const age = Math.min(1, elapsed / 250)
        ctx.globalAlpha = al[i] * age

        if (type === T_PHOTON && speed > 1.2) {
          // Photon: long streak — length proportional to speed
          const len = speed * 5.5
          const nx  = vx[i] / speed
          const ny  = vy[i] / speed
          const lg2 = ctx.createLinearGradient(
            px[i] - nx * len, py[i] - ny * len,
            px[i], py[i]
          )
          lg2.addColorStop(0, `rgba(${r},${g},${b},0)`)
          lg2.addColorStop(1, `rgba(${r},${g},${b},${al[i]})`)
          ctx.beginPath()
          ctx.moveTo(px[i] - nx * len, py[i] - ny * len)
          ctx.lineTo(px[i], py[i])
          ctx.strokeStyle = lg2
          ctx.lineWidth = sz[i] * 0.55
          ctx.stroke()

        } else if (type === T_QUARK) {
          // Quark: tiny flicker with RGB colour
          const flicker = Math.sin(elapsed * 0.06 + i * 1.4) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(px[i], py[i], sz[i] * flicker, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${al[i] * (0.5 + flicker * 0.5)})`
          ctx.fill()

        } else if (type === T_PLASMA) {
          // Plasma: glowing dot with tiny halo
          const hg = ctx.createRadialGradient(px[i], py[i], 0, px[i], py[i], sz[i] * 3)
          hg.addColorStop(0, `rgba(${r},${g},${b},${al[i] * 0.6})`)
          hg.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.fillStyle = hg
          ctx.beginPath()
          ctx.arc(px[i], py[i], sz[i] * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(px[i], py[i], sz[i] * 0.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${al[i]})`
          ctx.fill()

        } else {
          // Neutron: solid heavy dot
          ctx.beginPath()
          ctx.arc(px[i], py[i], sz[i] * 0.75, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${al[i]})`
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      if (elapsed < 2200) rafId = requestAnimationFrame(bangTick)
      else { phase = PH.UNIVERSE; elapsed = 0; prevT = 0; rafId = requestAnimationFrame(universeTick) }
    }

    /* ── UNIVERSE: cosmic chart reveals ── */
    const UNIV_DUR = 3400

    const universeTick = t => {
      if (prevT === 0) prevT = t
      const dt = Math.min(t - prevT, 30); prevT = t; elapsed += dt

      // Faster trail fade so scattered bang particles dissolve
      ctx.fillStyle = 'rgba(0,0,4,0.28)'
      ctx.fillRect(0, 0, W, H)

      // Drift remaining particles (they fade as background matter)
      const drift_a = Math.max(0, 1 - elapsed / 1800) * 0.18
      if (drift_a > 0) {
        for (let i = 0; i < N; i++) {
          vx[i] *= 0.97; vy[i] *= 0.97
          px[i] += vx[i] * (dt / 16); py[i] += vy[i] * (dt / 16)
          const [r, g, b] = TYPE_COLORS[pt[i]][ci[i]]
          ctx.beginPath()
          ctx.arc(px[i], py[i], sz[i] * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${al[i] * drift_a})`
          ctx.fill()
        }
      }

      // Draw the cosmic chart
      drawCosmicChart(ctx, W, H, elapsed, UNIV_DUR)

      if (elapsed < UNIV_DUR) rafId = requestAnimationFrame(universeTick)
      else { phase = PH.DONE; onDone() }
    }

    /* ── Kick off ── */
    ctx.fillStyle = '#000004'
    ctx.fillRect(0, 0, W, H)

    init()
    rafId = requestAnimationFrame(singularityTick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [onDone])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000004', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />
    </div>
  )
}
