import { memo } from 'react'

/* ── Static data — defined outside component, never recreated ─────────── */

const ACCENTS = [
  '#d4af37', '#ff9040', '#ff8c00', '#1a9b8a', '#22c5ae', '#d4af37',
  '#f0d060', '#ff9040', '#ffa940', '#d4af37', '#d4af37', '#c97090',
  '#4a7fd4', '#a0a0c0', '#d4af37', '#ff8c00', '#f0d060', '#d4af37',
]

// 30 deterministic stars (halved from 60 for perf)
const STARS = Array.from({ length: 30 }, (_, i) => ({
  x: Math.round((i * 97.3 + 53)  % 1000),
  y: Math.round((i * 61.7 + 139) % 1000),
  r: 0.9 + (i % 3) * 0.5,
  op: 0.25 + (i % 4) * 0.07,
}))

// 18 orbital tracks — radius 90→430px, duration 40→193s
const ORBITALS = ACCENTS.map((accent, i) => {
  const dur    = 40 + i * 9
  const startA = i * 20   // degrees offset so planets begin spread around their ring
  const delay  = -(startA / 360 * dur)  // negative = already in-progress at load
  return {
    radius:  90 + i * 20,
    accent,
    dur,
    delay,
    planetR: Math.max(2.2, 5.2 - i * 0.18),
    // alternating: 2-of-3 clockwise, 1-of-3 counter so they look varied
    dir: i % 3 === 0 ? 'reverse' : 'normal',
  }
})

// Sri Yantra — 9 equilateral triangles: 5 Shakti (down) + 4 Shiva (up)
const SRI_TRIS = [
  { type: 'down', R: 230 }, { type: 'up', R: 212 },
  { type: 'down', R: 192 }, { type: 'up', R: 170 },
  { type: 'down', R: 147 }, { type: 'up', R: 124 },
  { type: 'down', R: 101 }, { type: 'up', R:  76 },
  { type: 'down', R:  50 },
]

function triPath(type, R) {
  const bx = +(R * 0.866).toFixed(1)
  const by = +(R * 0.5).toFixed(1)
  return type === 'up'
    ? `M0,${-R}L${bx},${by}L${-bx},${by}Z`
    : `M0,${R}L${bx},${-by}L${-bx},${-by}Z`
}

// 8 Vishwarupa arms — pre-computed endpoints
const ARMS = Array.from({ length: 8 }, (_, i) => {
  const rad = (i * 45 * Math.PI) / 180
  const c = Math.cos(rad), s = Math.sin(rad)
  return {
    id: `ck-a${i}`,
    x1: +(500 + c * 68).toFixed(1), y1: +(500 + s * 68).toFixed(1),
    x2: +(500 + c * 448).toFixed(1), y2: +(500 + s * 448).toFixed(1),
    // 4 particle positions along the arm
    pts: [0.28, 0.50, 0.68, 0.84].map(t => ({
      cx: +(500 + c * (68 + (448 - 68) * t)).toFixed(1),
      cy: +(500 + s * (68 + (448 - 68) * t)).toFixed(1),
      r:  +(1.9 - t * 1.4).toFixed(2),
    })),
  }
})

/* ── Shared CSS for GPU-accelerated SVG group rotation ───────────────── */
// transformOrigin '0px 0px' = rotate around the local origin,
// which for groups inside translate(500,500) is the SVG centre.
const orbitStyle = (dur, delay, dir) => ({
  transformOrigin: '0px 0px',
  willChange: 'transform',
  animation: `cosmicOrbit ${dur}s linear ${delay}s infinite`,
  animationDirection: dir,
})

const chakraStyle = {
  transformOrigin: '0px 0px',
  willChange: 'transform',
  animation: 'cosmicOrbit 20s linear infinite',
}

// Bindu circles are in root SVG space at cx=500, cy=500
const bindStyle = (anim, delay = '0s') => ({
  transformOrigin: '500px 500px',
  willChange: 'transform, opacity',
  animation: `${anim} 3.8s ease-out ${delay} infinite`,
})

/* ── Component ───────────────────────────────────────────────────────── */
export const CosmicKshetra = memo(function CosmicKshetra({
  opacity  = 0.06,
  size     = '88vmin',
  maxSize  = '880px',
  position = 'fixed',
  zIndex   = 2,
}) {
  return (
    <div style={{
      position,
      top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: size, height: size,
      maxWidth: maxSize, maxHeight: maxSize,
      pointerEvents: 'none',
      zIndex,
      opacity,
    }}>
      <svg viewBox="0 0 1000 1000" width="100%" height="100%">

        {/* Gradient defs — arm fade-out */}
        <defs>
          {ARMS.map(a => (
            <linearGradient key={a.id} id={a.id}
              x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="rgba(212,175,55,0.85)" />
              <stop offset="52%"  stopColor="rgba(212,175,55,0.18)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0)"    />
            </linearGradient>
          ))}
        </defs>

        {/* ── L1: Stars ──────────────────────────────────────────────── */}
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op} />
        ))}

        {/* ── L2: Sri Yantra (static geometry — no animation cost) ──── */}
        <g transform="translate(500,500)" opacity="0.8">
          <circle r="268" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="1.4" />
          <circle r="254" fill="none" stroke="rgba(212,175,55,0.28)" strokeWidth="0.7" />
          <circle r="241" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.5" />

          {/* 16-petal lotus */}
          {Array.from({ length: 16 }, (_, i) => {
            const a  = (i / 16) * Math.PI * 2
            const cx = +(Math.cos(a) * 247).toFixed(1)
            const cy = +(Math.sin(a) * 247).toFixed(1)
            return <ellipse key={i} cx={cx} cy={cy} rx="10" ry="19"
              transform={`rotate(${i * 22.5 + 90},${cx},${cy})`}
              fill="none" stroke="rgba(212,175,55,0.38)" strokeWidth="0.6" />
          })}

          {/* 8-petal inner lotus */}
          {Array.from({ length: 8 }, (_, i) => {
            const a  = (i / 8) * Math.PI * 2
            const cx = +(Math.cos(a) * 200).toFixed(1)
            const cy = +(Math.sin(a) * 200).toFixed(1)
            return <ellipse key={i} cx={cx} cy={cy} rx="13" ry="23"
              transform={`rotate(${i * 45 + 90},${cx},${cy})`}
              fill="none" stroke="rgba(212,175,55,0.32)" strokeWidth="0.6" />
          })}

          {/* 9 interlocking triangles */}
          {SRI_TRIS.map((tri, i) => (
            <path key={i} d={triPath(tri.type, tri.R)}
              fill="none"
              stroke={`rgba(212,175,55,${(0.52 - i * 0.025).toFixed(3)})`}
              strokeWidth={Math.max(0.45, 1.9 - i * 0.11).toFixed(2)}
            />
          ))}

          <circle r="44" fill="none" stroke="rgba(212,175,55,0.65)" strokeWidth="1.5" />
          <circle r="27" fill="rgba(212,175,55,0.06)" />
        </g>

        {/* ── L3: Orbital rings (static) ─────────────────────────────── */}
        {ORBITALS.map((o, i) => (
          <circle key={i} cx="500" cy="500" r={o.radius}
            fill="none" stroke={o.accent}
            strokeWidth={i < 3 ? 0.55 : 0.3}
            opacity="0.22"
          />
        ))}

        {/* ── L4: Orbiting planets — CSS animation, GPU compositor ───── */}
        {ORBITALS.map((o, i) => (
          <g key={i} transform="translate(500,500)">
            {/* CSS-animated group: rotates planet around SVG centre */}
            <g style={orbitStyle(o.dur, o.delay, o.dir)}>
              <circle cx={o.radius} cy="0" r={o.planetR}
                fill={o.accent} opacity="0.85"
              />
            </g>
          </g>
        ))}

        {/* ── L5: Vishwarupa arms (static lines + dots) ──────────────── */}
        {ARMS.map(a => (
          <g key={a.id}>
            <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke={`url(#${a.id})`} strokeWidth="0.8" opacity="0.65"
            />
            {a.pts.map((p, pi) => (
              <circle key={pi} cx={p.cx} cy={p.cy} r={p.r}
                fill="rgba(212,175,55,0.45)"
              />
            ))}
          </g>
        ))}

        {/* ── L6: Sudarshana Chakra — CSS animation ──────────────────── */}
        <g transform="translate(500,500)">
          <g style={chakraStyle}>
            {Array.from({ length: 16 }, (_, i) => (
              <path key={i}
                d="M 0,-64 C 8,-48 7,-42 4,-36 L 0,-33 L -4,-36 C -7,-42 -8,-48 0,-64 Z"
                fill="rgba(212,175,55,0.88)"
                transform={`rotate(${i * 22.5})`}
              />
            ))}
            <circle r="30" fill="none" stroke="rgba(212,175,55,0.95)" strokeWidth="2.2" />
            <circle r="22" fill="rgba(212,175,55,0.14)" />
          </g>
        </g>

        {/* ── L7: Bindu — CSS scale (GPU), no geometry reflow ────────── */}
        {/* Outer slow ripple */}
        <circle cx="500" cy="500" r="18"
          fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.8"
          style={bindStyle('cosmicRippleSlow', '-1.2s')}
        />
        {/* Inner ripple */}
        <circle cx="500" cy="500" r="13"
          fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="1.2"
          style={bindStyle('cosmicRipple')}
        />
        {/* Core */}
        <circle cx="500" cy="500" r="5"
          fill="rgba(212,175,55,1)" opacity="0.95"
          style={bindStyle('cosmicBreathe')}
        />

      </svg>
    </div>
  )
})

export default CosmicKshetra
