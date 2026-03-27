import { useEffect, useRef, memo } from 'react'
import CosmicKshetra from './CosmicKshetra'

/* ── Lotus Petals — 8 drifting upward forever ───────────────────────── */
const PETAL_DATA = [
  { x: '8%',  delay: '0s',   dur: '22s', drift: '-18px', spin: '45deg'  },
  { x: '22%', delay: '3.2s', dur: '28s', drift: '24px',  spin: '-30deg' },
  { x: '38%', delay: '7.1s', dur: '19s', drift: '-12px', spin: '60deg'  },
  { x: '55%', delay: '1.8s', dur: '25s', drift: '30px',  spin: '-45deg' },
  { x: '68%', delay: '5.4s', dur: '21s', drift: '-20px', spin: '35deg'  },
  { x: '78%', delay: '9.6s', dur: '30s', drift: '16px',  spin: '-55deg' },
  { x: '14%', delay: '12s',  dur: '24s', drift: '-28px', spin: '50deg'  },
  { x: '90%', delay: '4.8s', dur: '27s', drift: '22px',  spin: '-40deg' },
]

const LotusPetals = memo(() => (
  <>
    {PETAL_DATA.map((p, i) => (
      <div key={i} style={{
        position: 'fixed',
        left: p.x,
        bottom: '-40px',
        zIndex: 3, pointerEvents: 'none',
        '--drift': p.drift,
        '--spin':  p.spin,
        animation: `petalFloat ${p.dur} ${p.delay} ease-in-out infinite`,
      }}>
        {/* Lotus petal SVG */}
        <svg width="18" height="24" viewBox="0 0 18 24">
          <ellipse cx="9" cy="14" rx="7" ry="12"
            fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="0.8"
          />
          <ellipse cx="9" cy="14" rx="4" ry="8"
            fill="rgba(212,175,55,0.12)"
          />
          <line x1="9" y1="2" x2="9" y2="24"
            stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"
          />
        </svg>
      </div>
    ))}
  </>
))

/* ── Gold particle stream — 60 particles drifting upward ───────────── */
const PARTICLE_DATA = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 7.3 + 11) % 100}%`,
  bottom: `${(i * 17.1 + 5) % 30}%`,
  delay: `${(i * 0.31) % 8}s`,
  dur: `${8 + (i * 0.41) % 7}s`,
  size: 0.8 + (i % 5) * 0.35,
  maxOp: 0.12 + (i % 4) * 0.06,
  sway: `${(i % 2 === 0 ? '' : '-')}${8 + (i % 7) * 4}px`,
}))

const GoldParticles = memo(() => (
  <>
    {PARTICLE_DATA.map((p, i) => (
      <div key={i} style={{
        position: 'fixed',
        left: p.left, bottom: p.bottom,
        width: `${p.size}px`, height: `${p.size}px`,
        borderRadius: '50%',
        background: 'rgba(212,175,55,1)',
        zIndex: 3, pointerEvents: 'none',
        '--max-op': p.maxOp,
        '--sway':   p.sway,
        animation: `particleDrift ${p.dur} ${p.delay} ease-in-out infinite`,
      }} />
    ))}
  </>
))

/* ── Sacred Geometry — Sri Yantra–inspired lines, 2% opacity ─────────── */
const SacredGeometry = memo(() => {
  const corners = ['top:8%; left:6%', 'top:12%; right:5%', 'bottom:15%; left:8%', 'bottom:10%; right:7%']

  return (
    <>
      {corners.map((pos, i) => {
        const [v1, h1] = pos.split('; ')
        const vKey = v1.split(':')[0]
        const vVal = v1.split(':')[1]
        const hKey = h1.split(':')[0]
        const hVal = h1.split(':')[1]
        return (
          <div key={i} style={{
            position: 'fixed',
            [vKey]: vVal, [hKey]: hVal,
            zIndex: 2, pointerEvents: 'none',
            opacity: 0,
            animation: `geoAppear ${12 + i * 3}s ${i * 4}s ease-in-out infinite`,
          }}>
            <svg width="80" height="80" viewBox="-40 -40 80 80">
              {/* Upward triangle */}
              <polygon points="0,-35 30,18 -30,18"
                fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6"
                strokeDasharray="200" strokeDashoffset="200"
              />
              {/* Downward triangle */}
              <polygon points="0,35 30,-18 -30,-18"
                fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6"
                strokeDasharray="200" strokeDashoffset="200"
              />
              {/* Center circle */}
              <circle r="12"
                fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"
              />
              {/* Outer circle */}
              <circle r="36"
                fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.4"
              />
            </svg>
          </div>
        )
      })}
    </>
  )
})

/* ── Constellation Lines — background star connections ──────────────── */
const Constellation = memo(() => {
  // Static star positions for a constellation feel across the viewport
  const stars = [
    [12, 8], [28, 15], [45, 6], [62, 12], [78, 9], [91, 16],
    [8, 35], [22, 42], [38, 38], [55, 45], [70, 40], [85, 36],
    [15, 65], [32, 72], [50, 68], [66, 75], [82, 70],
  ]
  const lines = [
    [0,1],[1,2],[2,3],[3,4],[4,5],
    [6,7],[7,8],[8,9],[9,10],[10,11],
    [12,13],[13,14],[14,15],[15,16],
    [1,7],[3,9],[5,11],[7,13],[10,15],
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
      opacity: 0.04,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map(([a, b], i) => (
          <line key={i}
            x1={stars[a][0]} y1={stars[a][1]}
            x2={stars[b][0]} y2={stars[b][1]}
            stroke="rgba(212,175,55,0.8)" strokeWidth="0.08"
          />
        ))}
        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.22"
            fill="rgba(212,175,55,0.9)"
          />
        ))}
      </svg>
    </div>
  )
})

/* ── Main Export ─────────────────────────────────────────────────────── */
export default memo(function GlobalBackground() {
  return (
    <>
      <Constellation />
      <CosmicKshetra opacity={0.055} size="88vmin" maxSize="880px" position="fixed" zIndex={2} />
      <LotusPetals />
      <GoldParticles />
      <SacredGeometry />
    </>
  )
})
