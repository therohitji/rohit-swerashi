import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { CHAPTERS } from '../data/chapters'

/* ─────────────────────────────────────────────────────────────
   KURUKSHETRA BATTLEFIELD
   A living battlefield at dawn. Cursor-driven navigation.
───────────────────────────────────────────────────────────── */

const GOLD   = '#d4af37'
const ZONES  = {
  left:    { label: 'MY BATTLES',             sub: 'The Journey',             section: 'journey' },
  right:   { label: 'MY WEAPONS',             sub: 'Skills & Arsenal',         section: 'weapons' },
  up:      { label: 'MY VISION',              sub: 'GeniOS · India 2047',      section: 'vision'  },
  chariot: { label: 'MY STORY',               sub: 'Who Is Rohit Swerashi',    section: 'story'   },
  krishna: { label: 'MY DHARMA',              sub: 'God First · Nation First', section: 'dharma'  },
  horizon: { label: 'BEGIN THE CONVERSATION', sub: "Let's Create Together",    section: 'contact' },
}
const WEAPONS = [
  { id:'bow',    name:'Gandiva',     label:'Entrepreneurship', desc:'5 years. 10 ventures. Still standing.'  },
  { id:'conch',  name:'Panchajanya', label:'Communication',    desc:'Clarity is the highest form of courage.' },
  { id:'chakra', name:'Sudarshana',  label:'AI & Technology',  desc:'Intelligence is the sharpest weapon.'   },
  { id:'sword',  name:'Khadga',      label:'Leadership',        desc:'Lead from the front. Always.'           },
  { id:'mace',   name:'Kaumodaki',   label:'Resilience',        desc:"What doesn't break you, arms you."     },
]

function detectZone(x, y) {
  const px = (x / window.innerWidth)  * 100
  const py = (y / window.innerHeight) * 100
  if (py < 30 && px > 22 && px < 78)                  return 'up'
  if (px > 43 && px < 57 && py > 40 && py < 74)       return 'chariot'
  if (px > 53 && px < 70 && py > 26 && py < 58)       return 'krishna'
  if (py > 61 && py < 75 && px > 22 && px < 78)       return 'horizon'
  if (px < 27)                                         return 'left'
  if (px > 73)                                         return 'right'
  return null
}

/* ═══════════════════════════════════════════════════════════
   SKY — canvas renders 1400 stars + Milky Way once
═══════════════════════════════════════════════════════════ */

function SkyCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const W = canvas.width  = window.innerWidth
    const H = canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    /* 1 400 background stars */
    for (let i = 0; i < 1400; i++) {
      const x = ((i * 73.1 + 11) % 100) / 100 * W
      const y = ((i * 41.7 +  5) % 52)  / 100 * H
      const r = 0.3 + (i % 7) * 0.23
      const a = 0.14 + ((i * 37) % 70) / 100
      const col = i % 15 === 0 ? [255,248,220]
                : i % 7  === 0 ? [200,230,255]
                :               [240,228,190]
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`
      ctx.fill()
    }

    /* Milky Way — diagonal smear of 800 micro-particles, upper right */
    for (let i = 0; i < 800; i++) {
      const x = W * (0.42 + (i % 70) * 0.0074 + Math.sin(i * 0.28) * 0.024)
      const y = H * (0.016 + (i % 70) * 0.0054 + Math.cos(i * 0.19) * 0.018)
      const r = 0.28 + (i % 3) * 0.14
      const a = 0.03 + (i % 8) * 0.014
      ctx.beginPath()
      ctx.arc(Math.min(x, W - 1), Math.min(y, H * 0.45), r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(240,235,220,${a})`
      ctx.fill()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}

/* 50 bright DOM stars with CSS twinkling */
const BRIGHT_STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x:  ((i * 173.1 + 7)  % 100),
  y:  ((i *  97.3 + 3)  % 48),
  r:  i % 6 === 0 ? 2.4 : i % 3 === 0 ? 1.8 : 1.3,
  delay: ((i * 0.41) % 4.2).toFixed(2),
  dur:   (2.2 + (i * 0.19) % 1.8).toFixed(1),
}))

function TwinklingStars() {
  return (
    <>
      {BRIGHT_STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.r * 2, height: s.r * 2,
          borderRadius: '50%',
          background: s.r > 2 ? 'rgba(255,248,210,0.95)' : 'rgba(240,228,195,0.8)',
          boxShadow: s.r > 2 ? `0 0 ${s.r * 4}px rgba(255,248,210,0.55)` : 'none',
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}

/* Dawn bleeding — brightens/dims at horizon like sun deciding to rise */
function DawnBreath() {
  return (
    <div style={{
      position: 'absolute', bottom: '30%', left: 0, right: 0,
      height: '22%',
      background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(100,45,8,0.55) 0%, rgba(80,30,4,0.28) 50%, transparent 80%)',
      animation: 'horizonGlow 8s ease-in-out infinite',
      pointerEvents: 'none',
    }} />
  )
}

/* ═══════════════════════════════════════════════════════════
   FOG — 3 layers (layer 2 goes opposite direction) + wisps
═══════════════════════════════════════════════════════════ */

function FogLayers() {
  return (
    <>
      {/* Layer 1: ground fog, right → left, 40s */}
      <div style={{
        position: 'absolute', left:'-12%', right:'-12%',
        bottom:'22%', height:'20%',
        background: 'radial-gradient(ellipse 60% 55% at 50% 60%, rgba(218,192,148,0.48) 0%, rgba(205,175,115,0.24) 44%, transparent 80%)',
        opacity: 0.20,
        animation: 'fogDrift1 40s ease-in-out infinite alternate',
        filter: 'blur(6px)', pointerEvents:'none',
      }} />
      {/* Layer 2: mid fog, LEFT → RIGHT (opposite), 28s */}
      <div style={{
        position: 'absolute', left:'-12%', right:'-12%',
        bottom:'25%', height:'13%',
        background: 'radial-gradient(ellipse 55% 50% at 50% 55%, rgba(210,185,140,0.35) 0%, rgba(200,170,110,0.18) 40%, transparent 78%)',
        opacity: 0.14,
        animation: 'fogDrift2 28s ease-in-out infinite alternate',
        filter: 'blur(12px)', pointerEvents:'none',
      }} />
      {/* Layer 3: thin wisps, fast, 22s */}
      <div style={{
        position: 'absolute', left:'-12%', right:'-12%',
        bottom:'28%', height:'9%',
        background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(215,190,145,0.22) 0%, transparent 75%)',
        opacity: 0.10,
        animation: 'fogDrift1 22s ease-in-out 8s infinite alternate',
        pointerEvents:'none',
      }} />
    </>
  )
}

function FogWisps() {
  const [wisps, setWisps] = useState([{ id: 0, x: 30 }, { id: 1, x: 60 }])
  useEffect(() => {
    const iv = setInterval(() => {
      const id = performance.now() + Math.random()
      setWisps(w => [...w, { id, x: 8 + Math.random() * 80 }])
      setTimeout(() => setWisps(w => w.filter(p => p.id !== id)), 16000)
    }, 3200)
    return () => clearInterval(iv)
  }, [])
  return (
    <>
      {wisps.map(w => (
        <div key={w.id} style={{
          position: 'absolute',
          left: `${w.x}%`, bottom: '29%',
          width: '13%', height: '4%',
          background: 'radial-gradient(ellipse at center, rgba(222,200,162,0.14) 0%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'wispDrift 15s ease-in-out forwards',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   ARMIES — 4 depth layers per side
═══════════════════════════════════════════════════════════ */

function ArmyLayer({ side, row, highlighted, accent }) {
  const isLeft = side === 'left'
  const flip   = isLeft ? '' : 'translate(300,0) scale(-1,1)'
  const rows = [
    { yBase: 248, yscale: 0.58, op: highlighted ? 0.14 : 0.08, n: 18 },  // back
    { yBase: 250, yscale: 0.72, op: highlighted ? 0.25 : 0.18, n: 22 },
    { yBase: 252, yscale: 0.86, op: highlighted ? 0.44 : 0.34, n: 26 },
    { yBase: 255, yscale: 1.00, op: highlighted ? 0.70 : 0.58, n: 32 },  // front
  ]
  const r = rows[row]

  return (
    <svg
      viewBox="0 0 300 300"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: 0,
        bottom: 0,
        width: '30%',
        height: `${58 + row * 3}%`,
        pointerEvents: 'none',
        opacity: r.op,
        transition: 'opacity 0.9s ease',
        animation: isLeft
          ? 'armyApproachL 120s linear infinite alternate'
          : 'armyApproachR 120s linear infinite alternate',
      }}
    >
      <g transform={flip}>
        {/* Crowd mass */}
        <path
          d={`M0 300 L0 ${r.yBase} Q24 ${r.yBase-14} 50 ${r.yBase-8} Q90 ${r.yBase-16} 120 ${r.yBase-10} Q160 ${r.yBase-18} 200 ${r.yBase-12} Q240 ${r.yBase-8} 275 ${r.yBase-10} Q290 ${r.yBase-5} 300 ${r.yBase} L300 300 Z`}
          fill={highlighted ? accent : '#1e1006'}
          style={{ transition: 'fill 0.9s' }}
        />
        {/* Spears — stagger heights */}
        {Array.from({ length: r.n }, (_, i) => {
          const x   = (i / (r.n - 1)) * 285 + 5
          const top = r.yBase - 55 * r.yscale - Math.sin(i * 0.88) * 25 * r.yscale
          return (
            <line key={i}
              x1={x} y1={r.yBase}
              x2={x + (i%3-1)*1.5} y2={top}
              stroke={highlighted ? accent : 'rgba(200,158,65,0.28)'}
              strokeWidth={highlighted ? 1.3 : 0.6}
              style={{ transition: 'stroke 0.8s' }}
            />
          )
        })}
        {/* Flag bearers at intervals */}
        {[30, 100, 200].map((x, fi) => (
          <g key={fi}>
            <line x1={x} y1={r.yBase}
              x2={x} y2={r.yBase - 90*r.yscale - fi*8}
              stroke={highlighted ? accent : 'rgba(190,145,45,0.38)'}
              strokeWidth={highlighted ? 2 : 1}
              style={{ transition: 'stroke 0.8s' }}
            />
            <path
              d={`M${x} ${r.yBase-90*r.yscale-fi*8} L${x+18} ${r.yBase-84*r.yscale-fi*8} L${x} ${r.yBase-77*r.yscale-fi*8} Z`}
              fill={highlighted ? accent : 'rgba(170,120,40,0.35)'}
              style={{
                transformOrigin: `${x}px ${r.yBase-90*r.yscale}px`,
                animation: `flagWave ${3 + fi*0.5}s ease-in-out ${fi*0.3}s infinite`,
                transition: 'fill 0.8s',
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

function Army({ side, highlighted }) {
  return (
    <div style={{
      position: 'absolute',
      [side === 'left' ? 'left' : 'right']: 0,
      bottom: 0, width: '30%', height: '72%',
      pointerEvents: 'none',
    }}>
      {[0, 1, 2, 3].map(row => (
        <ArmyLayer
          key={row}
          side={side}
          row={row}
          highlighted={highlighted}
          accent={GOLD}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CHARIOT — SVG artwork, horses with animated manes, Krishna
═══════════════════════════════════════════════════════════ */

function ChariotScene({ krishnaZone, chariotZone }) {
  return (
    <div style={{
      position: 'absolute',
      left: '50%', bottom: '14%',
      transform: 'translateX(-50%)',
      width: 'clamp(240px, 30vw, 400px)',
      pointerEvents: 'none', zIndex: 5,
    }}>
      <svg viewBox="0 0 340 220" style={{ width: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="pfGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%"   stopColor={GOLD}     />
            <stop offset="42%"  stopColor="#00c8b0"  />
            <stop offset="100%" stopColor="#4488ff"  />
          </linearGradient>
          <radialGradient id="pfEye">
            <stop offset="0%"   stopColor="#4488ff" stopOpacity="0.95" />
            <stop offset="44%"  stopColor="#00c8b0" stopOpacity="0.85" />
            <stop offset="100%" stopColor={GOLD}    stopOpacity="0.65" />
          </radialGradient>
          <filter id="feather-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="spokeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* ── Horse 1 (left) ── */}
        <g opacity="0.88">
          <ellipse cx="65"  cy="148" rx="30" ry="15" fill="#140e04" />
          <ellipse cx="84"  cy="132" rx="13" ry="17" fill="#140e04" />
          {[52,64,74,88].map((x,i) => (
            <line key={i} x1={x} y1={157} x2={x+(i%2?2:-2)} y2={178} stroke="#140e04" strokeWidth="4" strokeLinecap="round"/>
          ))}
          {/* Animated mane */}
          <path d="M84 122 Q92 108 95 114 Q98 106 100 118 Q103 108 104 122"
            stroke="#8a6010" strokeWidth="1.6" fill="none"
            style={{ animation: 'symFloat 3.8s ease-in-out infinite' }}
          />
        </g>

        {/* ── Horse 2 (right) ── */}
        <g opacity="0.88">
          <ellipse cx="275" cy="148" rx="30" ry="15" fill="#140e04" />
          <ellipse cx="256" cy="132" rx="13" ry="17" fill="#140e04" />
          {[252,264,274,288].map((x,i) => (
            <line key={i} x1={x} y1={157} x2={x+(i%2?2:-2)} y2={178} stroke="#140e04" strokeWidth="4" strokeLinecap="round"/>
          ))}
          <path d="M256 122 Q248 108 245 114 Q242 106 240 118 Q237 108 236 122"
            stroke="#8a6010" strokeWidth="1.6" fill="none"
            style={{ animation: 'symFloat 4.2s ease-in-out -1.4s infinite' }}
          />
        </g>

        {/* ── Reins ── */}
        <path d="M94 132 Q130 155 160 158 M246 132 Q210 155 180 158"
          stroke={GOLD} strokeWidth="1.2" fill="none" opacity="0.45"
          style={{ animation: 'symFloat 5s ease-in-out infinite' }}
        />

        {/* ── Chariot body ── */}
        <path d="M115 190 L115 145 L225 145 L225 190 Z"
          fill="#060402" stroke={GOLD} strokeWidth="1.2" opacity="0.94" />
        {/* Decorative panel band */}
        <path d="M115 158 L225 158" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
        {/* Lotus motifs on chariot body */}
        {[135, 170, 205].map((x, i) => (
          <g key={i} opacity="0.18">
            <circle cx={x} cy={172} r="4" fill="none" stroke={GOLD} strokeWidth="0.6" />
            {[0,60,120,180,240,300].map(a => (
              <line key={a}
                x1={x} y1={172}
                x2={x + Math.cos(a*Math.PI/180)*4} y2={172 + Math.sin(a*Math.PI/180)*4}
                stroke={GOLD} strokeWidth="0.4"
              />
            ))}
          </g>
        ))}

        {/* ── Wheels with gradient spokes ── */}
        {[118, 222].map((cx, wi) => (
          <g key={wi}>
            <circle cx={cx} cy={190} r="32" fill="none" stroke={GOLD} strokeWidth="1.8" opacity="0.75" />
            <circle cx={cx} cy={190} r="24" fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.28" />
            {Array.from({ length: 8 }, (_, s) => (
              <line key={s}
                x1={cx} y1={190}
                x2={cx + Math.cos(s * Math.PI/4) * 30}
                y2={190 + Math.sin(s * Math.PI/4) * 30}
                stroke="url(#spokeGrad)" strokeWidth="1.1"
              />
            ))}
            <circle cx={cx} cy={190} r="5.5" fill={GOLD} opacity="0.9" />
            <circle cx={cx} cy={190} r="2.5" fill="#050302" />
          </g>
        ))}

        {/* ── Canopy arch ── */}
        <path d="M124 145 Q170 115 216 145" fill="none" stroke={GOLD} strokeWidth="1.1" opacity="0.3" />

        {/* ── Krishna figure ── */}
        <g style={{
          filter: krishnaZone ? 'drop-shadow(0 0 14px #00c8b0cc)' : 'none',
          transition: 'filter 0.6s',
        }}>
          <rect x="162" y="100" width="11" height="32" fill="#0d0804" rx="2" />
          <circle cx="167" cy="92" r="10.5" fill="#0d0804" />
          {/* Arms */}
          <line x1="162" y1="112" x2="150" y2="127" stroke="#0d0804" strokeWidth="4" strokeLinecap="round"/>
          <line x1="173" y1="112" x2="188" y2="125" stroke="#0d0804" strokeWidth="4" strokeLinecap="round"/>
          {/* Crown */}
          <path d="M160 84 Q167 78 174 84" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.65" />

          {/* ── Peacock feather — only full-colour element ── */}
          <path
            d="M167 82 Q174 66 171 50 Q168 38 170 24"
            stroke="url(#pfGrad)" strokeWidth="2.4" fill="none"
            filter="url(#feather-glow)"
            style={{ animation: 'symFloat 5.5s ease-in-out infinite' }}
          />
          {/* Barbs */}
          {[0,1,2,3].map(i => (
            <line key={i}
              x1="170" y1={32 + i*6}
              x2={170 + (i%2===0 ? 7 : -7)} y2={30 + i*6}
              stroke="url(#pfGrad)" strokeWidth="0.8" opacity="0.55"
            />
          ))}
          {/* Eye of the feather */}
          <ellipse cx="170" cy="20" rx="5.5" ry="8.5"
            fill="url(#pfEye)"
            style={{ animation: 'symPulse 4s ease-in-out infinite' }}
          />

          {/* Chariot hover ring */}
          {chariotZone && (
            <ellipse cx="170" cy="168" rx="74" ry="24"
              fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4"
              style={{ animation: 'symPulse 3s ease-in-out infinite' }}
            />
          )}
        </g>
      </svg>

      {/* ── Name — shimmer gold sweep ── */}
      <div style={{
        textAlign: 'center',
        marginTop: '-0.3rem',
        fontFamily: '"Cinzel Decorative", Cinzel, serif',
        fontSize: 'clamp(1rem, 2.6vw, 2rem)',
        fontWeight: 700,
        letterSpacing: '0.16em',
        userSelect: 'none',
        background: `linear-gradient(90deg,
          #8a6010 0%, #c8941e 15%, #f0c040 35%,
          #fde080 50%, #f0c040 65%, #c8941e 85%, #8a6010 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'nameShimmer 3.2s linear infinite',
      }}>
        ROHIT SWERASHI
      </div>

      {/* ── Subtitle ── */}
      <div style={{
        textAlign: 'center',
        marginTop: '0.3rem',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: 'clamp(0.45rem, 0.95vw, 0.65rem)',
        fontStyle: 'italic',
        letterSpacing: '0.22em',
        color: 'rgba(240,228,190,0.38)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        userSelect: 'none',
      }}>
        <span>Entrepreneur</span>
        <span style={{ color: GOLD, fontSize: '0.55em', animation: 'diamondPulse 3s ease-in-out infinite' }}>◆</span>
        <span>Builder</span>
        <span style={{ color: GOLD, fontSize: '0.55em', animation: 'diamondPulse 3s ease-in-out 1s infinite' }}>◆</span>
        <span>Man of God</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CHAPTER FLAGS — 18 flags on the ground
═══════════════════════════════════════════════════════════ */

const FLAG_POS = CHAPTERS.map((_, i) => ({
  x: 3 + i * 5.4,
  y: 67 + Math.abs(Math.sin(i * 1.1)) * 5,
}))

function ChapterFlag({ ch, pos, onClick }) {
  const [hovered, setHovered] = useState(false)
  const windFreq = 2.6 + (parseInt(ch.num) * 0.18) % 1.8
  const windAmp  = 0.3 + (parseInt(ch.num) * 0.07) % 0.6  // affects flag waving depth

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.x}%`, top: `${pos.y}%`,
        transform: 'translate(-50%,-100%)',
        cursor: 'pointer', zIndex: 8, userSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(ch)}
    >
      {/* Staff */}
      <div style={{
        width: 1.5, height: 40,
        background: hovered ? ch.accent : 'rgba(195,155,65,0.4)',
        margin: '0 auto',
        transition: 'background 0.3s',
      }} />
      {/* Fabric */}
      <div style={{
        position: 'absolute', top: 0, left: 2,
        width: 16, height: 10,
        background: hovered ? ch.accent : 'rgba(175,125,45,0.32)',
        clipPath: 'polygon(0 0,100% 25%,100% 75%,0 100%)',
        transition: 'background 0.3s',
        animation: `flagWave ${windFreq}s ease-in-out ${windAmp}s infinite`,
        transformOrigin: 'left center',
      }} />
      {/* Roman numeral on flag */}
      <div style={{
        position: 'absolute', top: 1, left: 3,
        fontFamily: 'Cinzel, serif',
        fontSize: '0.32rem',
        color: hovered ? '#000' : 'rgba(220,175,55,0.6)',
        lineHeight: 1,
        letterSpacing: 0,
        pointerEvents: 'none',
        transition: 'color 0.3s',
        userSelect: 'none',
      }}>
        {['I','II','III','IV','V','VI','VII','VIII','IX','X',
          'XI','XII','XIII','XIV','XV','XVI','XVII','XVIII'][parseInt(ch.num)-1]}
      </div>
      {/* Hover tooltip — chapter name */}
      {hovered && (
        <div style={{
          position: 'absolute', bottom: '-2rem', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Cinzel, serif', fontSize: '0.42rem',
          color: ch.accent, whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          textShadow: `0 0 8px ${ch.accent}88`,
          pointerEvents: 'none',
          animation: 'cinematicTextIn 0.2s ease-out',
        }}>
          {ch.name}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ZONE HIGHLIGHTS
═══════════════════════════════════════════════════════════ */

function ZoneHighlights({ zone }) {
  return (
    <>
      {[
        { key:'left',    style:{ left:0, top:0, width:'28%', height:'100%', bg:'linear-gradient(to right,rgba(212,175,55,0.09) 0%,transparent 100%)' } },
        { key:'right',   style:{ right:0, top:0, width:'28%', height:'100%', bg:'linear-gradient(to left,rgba(212,175,55,0.09) 0%,transparent 100%)' } },
        { key:'up',      style:{ left:'20%', top:0, width:'60%', height:'32%', bg:'radial-gradient(ellipse at 50% 0%,rgba(212,175,55,0.11) 0%,transparent 70%)' } },
        { key:'chariot', style:{ left:'38%', top:'38%', width:'24%', height:'36%', bg:'radial-gradient(ellipse at 50% 60%,rgba(212,175,55,0.15) 0%,transparent 70%)' } },
        { key:'krishna', style:{ left:'50%', top:'24%', width:'20%', height:'35%', bg:'radial-gradient(ellipse at 50% 50%,rgba(0,200,176,0.13) 0%,transparent 70%)' } },
        { key:'horizon', style:{ left:'18%', top:'59%', width:'64%', height:'16%', bg:'linear-gradient(to bottom,transparent 0%,rgba(212,175,55,0.12) 50%,transparent 100%)' } },
      ].map(({ key, style }) => (
        <div key={key} style={{
          position: 'absolute',
          ...style,
          background: style.bg,
          opacity: zone === key ? 1 : 0,
          transition: 'opacity 0.55s ease',
          pointerEvents: 'none', zIndex: 4,
        }} />
      ))}
      {/* Horizon line */}
      <div style={{
        position: 'absolute', left:'15%', right:'15%', top:'63%', height: 1,
        background:'linear-gradient(90deg,transparent 0%,rgba(212,175,55,0.4) 20%,rgba(212,175,55,0.6) 50%,rgba(212,175,55,0.4) 80%,transparent 100%)',
        opacity: zone === 'horizon' ? 1 : 0.28,
        transition: 'opacity 0.5s',
        animation: 'horizonGlow 6s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 4,
      }} />
    </>
  )
}

function ZoneLabel({ zone }) {
  const cfg = ZONES[zone]
  if (!cfg) return null
  const isKrishna = zone === 'krishna'
  return (
    <div style={{
      position: 'absolute', bottom: '7%', left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center', zIndex: 20, pointerEvents: 'none',
      animation: 'cinematicTextIn 0.35s ease-out forwards',
    }}>
      <p style={{
        fontFamily: 'Cinzel, serif',
        fontSize: 'clamp(0.62rem, 1.5vw, 1rem)',
        letterSpacing: '0.55em',
        color: isKrishna ? '#00c8b0' : GOLD,
        textTransform: 'uppercase',
        marginBottom: '0.28rem',
        textShadow: `0 0 22px ${isKrishna ? '#00c8b0' : GOLD}88`,
      }}>{cfg.label}</p>
      <p style={{
        fontFamily: '"Cormorant Garamond",Georgia,serif',
        fontSize: 'clamp(0.5rem,1vw,0.7rem)',
        letterSpacing: '0.3em',
        color: 'rgba(240,228,190,0.4)',
        textTransform: 'uppercase',
      }}>{cfg.sub}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   WEAPONS PANEL
═══════════════════════════════════════════════════════════ */

function WeaponSvg({ id }) {
  const G = GOLD
  if (id === 'bow') return (
    <svg viewBox="0 0 60 120" width="52" height="104">
      <path d="M30 8 Q56 60 30 112" fill="none" stroke={G} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="30" y1="10" x2="30" y2="110" stroke={G} strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7"/>
      <line x1="30" y1="56" x2="50" y2="61" stroke={G} strokeWidth="1.8"/>
      <path d="M50 61 L44 56 L46 64 Z" fill={G}/>
      <circle cx="30" cy="8"   r="3" fill={G}/><circle cx="30" cy="112" r="3" fill={G}/>
    </svg>
  )
  if (id === 'conch') return (
    <svg viewBox="0 0 70 90" width="62" height="80">
      <path d="M35 10 Q58 14 64 38 Q68 58 54 72 Q38 84 22 76 Q8 65 11 48 Q14 28 28 18 Z"
        fill="none" stroke={G} strokeWidth="2.2"/>
      <path d="M35 22 Q52 26 56 44 Q58 58 46 66 Q35 73 26 68"
        fill="none" stroke={G} strokeWidth="1.1" opacity="0.5"/>
      <circle cx="35" cy="10" r="4" fill={G}/>
    </svg>
  )
  if (id === 'chakra') return (
    <svg viewBox="0 0 80 80" width="75" height="75">
      {Array.from({length:16},(_,i) => (
        <path key={i} d="M40 40 L40 6 Q42 3 40 1 Q38 3 40 6 Z"
          fill={G} opacity="0.85" transform={`rotate(${i*22.5} 40 40)`}/>
      ))}
      <circle cx="40" cy="40" r="22" fill="none" stroke={G} strokeWidth="1.6"/>
      <circle cx="40" cy="40" r="14" fill="none" stroke={G} strokeWidth="0.7" opacity="0.4"/>
      {/* Sanskrit characters on outer ring */}
      {['ॐ','श्री','हरि','ॐ'].map((ch,i) => (
        <text key={i} x="40" y="40" textAnchor="middle" dominantBaseline="middle"
          fontSize="3.5" fill={G} opacity="0.25"
          transform={`rotate(${i*90} 40 40) translate(0,-30) rotate(${-(i*90)})`}>
          {ch}
        </text>
      ))}
      <circle cx="40" cy="40" r="6" fill={G}/>
      <circle cx="40" cy="40" r="3" fill="#050b1a"/>
    </svg>
  )
  if (id === 'sword') return (
    <svg viewBox="0 0 40 130" width="36" height="116">
      <path d="M20 8 L23 82 L20 94 L17 82 Z" fill={G} opacity="0.92"/>
      <line x1="20" y1="12" x2="20" y2="80" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <rect x="11" y="82" width="18" height="3.5" fill={G} rx="1"/>
      <rect x="17" y="85.5" width="6" height="22" fill={G} opacity="0.72" rx="1"/>
      <circle cx="20" cy="110" r="6" fill={G} opacity="0.85"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 60 140" width="54" height="125">
      {Array.from({length:8},(_,i) => (
        <ellipse key={i} cx="30" cy="32" rx="15" ry="8"
          fill={G} opacity="0.72" transform={`rotate(${i*45} 30 32)`}/>
      ))}
      <circle cx="30" cy="32" r="11" fill={G}/>
      <rect x="27.5" y="43" width="5" height="88" fill={G} opacity="0.88" rx="2.5"/>
      <circle cx="30" cy="134" r="6.5" fill={G} opacity="0.75"/>
    </svg>
  )
}

function WeaponsPanel({ onClose }) {
  const [hovered,   setHovered]   = useState(null)
  const [spinFast,  setSpinFast]  = useState(false)

  return (
    <div
      style={{
        position:'absolute', inset:0, zIndex:15,
        background:'radial-gradient(ellipse at 50% 80%,rgba(212,175,55,0.06) 0%,rgba(0,0,0,0.52) 60%)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'flex-end',
        paddingBottom:'17%',
      }}
      onClick={e => { if(e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        position:'absolute', top:'18%', textAlign:'center', pointerEvents:'none',
        animation:'cinematicTextIn 0.5s ease-out forwards',
      }}>
        <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(0.58rem,1.4vw,0.9rem)', letterSpacing:'0.55em', color:GOLD, textTransform:'uppercase' }}>
          My Weapons
        </p>
        <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontSize:'clamp(0.48rem,1vw,0.7rem)', letterSpacing:'0.3em', color:'rgba(240,228,190,0.38)', textTransform:'uppercase' }}>
          Skills &amp; Arsenal
        </p>
      </div>

      <div style={{ display:'flex', gap:'clamp(1.2rem,3.5vw,3.5rem)', alignItems:'flex-end' }}>
        {WEAPONS.map((w, i) => (
          <div key={w.id}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem',
              cursor:'pointer',
              animation:`fogRise 0.9s cubic-bezier(0.22,1,0.36,1) ${i*0.13}s both`,
            }}
            onMouseEnter={() => { setHovered(w.id); if(w.id==='chakra') setSpinFast(true) }}
            onMouseLeave={() => { setHovered(null); setSpinFast(false) }}
          >
            <div style={{
              filter: hovered === w.id
                ? `drop-shadow(0 0 24px ${GOLD}cc) brightness(1.35)`
                : `drop-shadow(0 0 8px ${GOLD}55)`,
              transition:'filter 0.35s ease',
              animation: w.id === 'chakra'
                ? `symSpin ${spinFast && hovered==='chakra' ? '0.45s' : '2s'} linear infinite`
                : 'symFloat 6s ease-in-out infinite',
              animationDelay: w.id === 'chakra' ? '0s' : `${i*-1.1}s`,
              transformOrigin:'50% 50%',
            }}>
              <WeaponSvg id={w.id}/>
            </div>
            <p style={{
              fontFamily:'Cinzel,serif',
              fontSize:'clamp(0.4rem,0.88vw,0.58rem)',
              letterSpacing:'0.4em',
              color:GOLD, opacity:0.75,
              textTransform:'uppercase', textAlign:'center',
            }}>{w.label}</p>
            <div style={{
              height:'2.5rem', opacity: hovered===w.id ? 1 : 0,
              transform: hovered===w.id ? 'translateY(0)' : 'translateY(6px)',
              transition:'all 0.3s ease', textAlign:'center',
            }}>
              <p style={{
                fontFamily:'"Cormorant Garamond",Georgia,serif',
                fontSize:'clamp(0.48rem,1vw,0.7rem)',
                color:'rgba(240,228,190,0.6)', fontStyle:'italic',
                whiteSpace:'nowrap',
              }}>"{w.desc}"</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position:'absolute', bottom:'4%',
        fontFamily:'Cinzel,serif', fontSize:'0.44rem',
        letterSpacing:'0.4em',
        color:'rgba(240,228,190,0.18)',
        textTransform:'uppercase', cursor:'pointer',
      }} onClick={onClose}>
        Click anywhere to return
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CHAPTER CINEMATIC — full screen, battlefield dims to 40%
═══════════════════════════════════════════════════════════ */

function ChapterCinematic({ ch, onClose }) {
  return (
    <div
      style={{
        position:'absolute', inset:0, zIndex:30,
        display:'flex',
        cursor:'pointer',
        animation:'cinematicIn 0.5s ease-out forwards',
      }}
      onClick={onClose}
    >
      {/* Dim the battlefield behind */}
      <div style={{
        position:'absolute', inset:0,
        background:'rgba(0,0,0,0.60)',
        zIndex:0, pointerEvents:'none',
      }} />

      {/* LEFT — translucent parchment panel */}
      <div style={{
        position:'relative', zIndex:1,
        width:'46%', height:'100%',
        background:'rgba(4,7,16,0.82)',
        backdropFilter:'blur(14px)',
        WebkitBackdropFilter:'blur(14px)',
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'clamp(2rem,5vw,5rem)',
        animation:'cinematicTextIn 0.55s 0.1s ease-out both',
        borderRight:`1px solid ${ch.accent}22`,
      }}>
        {/* Chapter badge */}
        <p style={{
          fontFamily:'Cinzel,serif',
          fontSize:'clamp(0.44rem,0.9vw,0.6rem)',
          letterSpacing:'0.55em',
          color:ch.accent, opacity:0.65,
          textTransform:'uppercase',
          marginBottom:'0.6rem',
        }}>
          Adhyaya {ch.num} · {ch.theme}
        </p>

        {/* Chapter title */}
        <h2 style={{
          fontFamily:'"Cinzel Decorative",Cinzel,serif',
          fontSize:'clamp(1.2rem,2.8vw,2.2rem)',
          color:ch.accent,
          letterSpacing:'0.1em',
          lineHeight:1.2,
          marginBottom:'1.2rem',
        }}>
          {ch.name}
        </h2>

        <div style={{ width:40, height:1, background:`${ch.accent}44`, marginBottom:'1.2rem' }} />

        {/* Sanskrit shloka */}
        <p style={{
          fontFamily:'"Cormorant Garamond",Georgia,serif',
          fontSize:'clamp(0.78rem,1.7vw,1.1rem)',
          color:ch.accent,
          letterSpacing:'0.06em',
          lineHeight:2,
          fontStyle:'italic',
          marginBottom:'0.9rem',
        }}>
          {ch.shloka}
        </p>

        {/* English */}
        <p style={{
          fontFamily:'"Cormorant Garamond",Georgia,serif',
          fontSize:'clamp(0.58rem,1.2vw,0.82rem)',
          color:'rgba(240,228,190,0.55)',
          letterSpacing:'0.1em',
          lineHeight:1.8,
          marginBottom:'0.5rem',
        }}>
          {ch.shlokaEn}
        </p>
        <p style={{
          fontFamily:'Cinzel,serif',
          fontSize:'clamp(0.38rem,0.78vw,0.52rem)',
          color:`${ch.accent}66`,
          letterSpacing:'0.2em',
          textTransform:'uppercase',
        }}>
          — {ch.shlokaRef}
        </p>

        <div style={{ width:40, height:1, background:`${ch.accent}44`, marginTop:'1.2rem' }} />

        <p style={{
          marginTop:'1.5rem',
          fontFamily:'Cinzel,serif',
          fontSize:'0.42rem',
          letterSpacing:'0.4em',
          color:'rgba(240,228,190,0.18)',
          textTransform:'uppercase',
        }}>
          Click to Return
        </p>
      </div>

      {/* RIGHT — divine art image */}
      <div style={{
        position:'relative', zIndex:1,
        flex:1, overflow:'hidden',
        animation:'cinematicIn 0.7s ease-out forwards',
      }}>
        {ch.artImage && (
          <img src={ch.artImage} alt="" style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%',
            objectFit:'cover',
            objectPosition:'center 22%',
            opacity:0.62,
            filter:`brightness(0.88) contrast(1.06) saturate(1.12) drop-shadow(0 0 80px ${ch.accent}44)`,
          }}/>
        )}
        {/* Vignette — draws eye to the image center */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 50% 40%,transparent 28%,rgba(0,0,0,0.68) 82%)',
          pointerEvents:'none',
        }} />
        {/* Left edge gradient (blends into text panel) */}
        <div style={{
          position:'absolute', left:0, top:0, bottom:0, width:'12%',
          background:`linear-gradient(to right, rgba(4,7,16,0.82), transparent)`,
          pointerEvents:'none',
        }} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CONTENT PANELS
═══════════════════════════════════════════════════════════ */

const PANEL_CONTENT = {
  story:   { title:'My Story',    sub:'The Warrior Behind the Code', body:'From a small town dreamer to an architect of digital experiences — this is not just a portfolio. It is a battlefield journal. Every project is a war. Every deadline, a siege. Every solution, a victory.', cta:'Read the Full Journey →' },
  journey: { title:'My Battles', sub:'The Path Walked',              body:'Each soldier in that army on the left is a chapter of this story. Startups launched. Systems built. Teams led. Failures survived. The army grows with every year — and so does its general.', cta:'See the Timeline →' },
  vision:  { title:'My Vision',  sub:'India · Technology · 2047',    body:"GeniOS — India's intelligence operating system. The goal is not to build software. The goal is to make India the knowledge capital of the world. One line of code at a time.", cta:'Understand the Mission →' },
  dharma:  { title:'My Dharma',  sub:'The Code That Cannot Be Compiled', body:'"God First. Nation First. Everything else is detail." — This is not a tagline. It is the architecture of every decision. The framework behind the framework.', cta:'Read the Values →' },
  contact: { title:'Begin the Conversation', sub:"Let's Create Together", body:'Whether you have a mission to build, a vision to architect, or a battlefield you need a general for — send the message. The chariot is ready.', cta:'rohit@swerashi.com →' },
}

function ContentPanel({ section, onClose }) {
  const p = PANEL_CONTENT[section]
  if (!p) return null
  return (
    <div
      style={{
        position:'absolute', inset:0, zIndex:20,
        background:'rgba(2,5,12,0.80)',
        backdropFilter:'blur(8px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        animation:'cinematicIn 0.4s ease-out forwards',
        cursor:'pointer',
      }}
      onClick={e => { if(e.target===e.currentTarget) onClose() }}
    >
      <div style={{
        maxWidth:560, width:'88%',
        padding:'clamp(1.5rem,4vw,3rem)',
        border:`1px solid ${GOLD}22`,
        background:'rgba(8,6,3,0.82)',
        position:'relative',
        animation:'cinematicTextIn 0.5s ease-out forwards',
      }}>
        {[
          {top:'8px',left:'8px',borderTop:`1px solid ${GOLD}44`,borderLeft:`1px solid ${GOLD}44`},
          {top:'8px',right:'8px',borderTop:`1px solid ${GOLD}44`,borderRight:`1px solid ${GOLD}44`},
          {bottom:'8px',left:'8px',borderBottom:`1px solid ${GOLD}44`,borderLeft:`1px solid ${GOLD}44`},
          {bottom:'8px',right:'8px',borderBottom:`1px solid ${GOLD}44`,borderRight:`1px solid ${GOLD}44`},
        ].map((s,i) => (
          <div key={i} style={{ position:'absolute', width:12, height:12, ...s }}/>
        ))}
        <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(0.44rem,0.88vw,0.6rem)', letterSpacing:'0.5em', color:GOLD, opacity:0.6, textTransform:'uppercase', marginBottom:'0.6rem' }}>{p.sub}</p>
        <h2 style={{ fontFamily:'"Cinzel Decorative",Cinzel,serif', fontSize:'clamp(1.2rem,3vw,2rem)', color:GOLD, letterSpacing:'0.1em', marginBottom:'1.2rem', lineHeight:1.2 }}>{p.title}</h2>
        <div style={{ width:40, height:1, background:`${GOLD}40`, marginBottom:'1.2rem' }}/>
        <p style={{ fontFamily:'"Cormorant Garamond",Georgia,serif', fontSize:'clamp(0.8rem,1.6vw,1rem)', color:'rgba(240,228,190,0.7)', lineHeight:1.85, marginBottom:'1.6rem' }}>{p.body}</p>
        <button style={{
          fontFamily:'Cinzel,serif', fontSize:'clamp(0.4rem,0.84vw,0.56rem)',
          letterSpacing:'0.4em', color:GOLD,
          background:'none', border:`1px solid ${GOLD}44`,
          padding:'0.7rem 1.4rem', cursor:'pointer',
          textTransform:'uppercase', transition:'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background=`${GOLD}15`; e.currentTarget.style.borderColor=`${GOLD}88` }}
          onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.borderColor=`${GOLD}44` }}
          onClick={onClose}
        >{p.cta}</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN BATTLEFIELD
═══════════════════════════════════════════════════════════ */

export default function Battlefield() {
  const [zone,      setZone]      = useState(null)
  const [section,   setSection]   = useState(null)
  const [cinematic, setCinematic] = useState(null)
  const lastZone = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const z = detectZone(e.clientX, e.clientY)
    if (z !== lastZone.current) { lastZone.current = z; setZone(z) }
  }, [])

  const handleClick = useCallback(() => {
    if (!zone) return
    const cfg = ZONES[zone]
    if (cfg) setSection(cfg.section)
  }, [zone])

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') { setSection(null); setCinematic(null) }
  }, [])

  return (
    <div
      style={{
        position:'fixed', inset:0,
        overflow:'hidden',
        background:`linear-gradient(180deg,
          #000004  0%,
          #070919 13%,
          #0e0d22 25%,
          #1f1110 38%,
          #331506  52%,
          #512308  62%,
          #3e1c04  69%,
          #1c0e03  82%,
          #0a0602 100%)`,
        cursor: zone ? 'pointer' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      {/* ── Sky canvas (1400 stars + Milky Way) — rendered once ── */}
      <SkyCanvas />

      {/* ── Bright twinkling stars (DOM, CSS animation) ── */}
      <TwinklingStars />

      {/* ── Dawn light breath at horizon ── */}
      <DawnBreath />

      {/* ── Fog ── */}
      <FogLayers />
      <FogWisps />

      {/* ── Armies (4 depth layers each) ── */}
      <Army side="left"  highlighted={zone === 'left'}  />
      <Army side="right" highlighted={zone === 'right'} />

      {/* ── Ground darkening ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'32%',
        background:'linear-gradient(to top,rgba(3,1,0,0.96) 0%,rgba(8,4,1,0.55) 65%,transparent 100%)',
        pointerEvents:'none', zIndex:2,
      }} />

      {/* ── Ground cracks ── */}
      {[12,32,52,70,85].map((x,i) => (
        <div key={i} style={{
          position:'absolute',
          bottom:`${8+i*3.4}%`, left:`${x}%`,
          width:`${5+i}%`, height:1,
          background:'rgba(170,110,35,0.07)',
          transform:`rotate(${-5+i*3}deg)`,
          pointerEvents:'none', zIndex:3,
        }}/>
      ))}

      {/* ── Chapter flags ── */}
      {CHAPTERS.map((ch, i) => (
        <ChapterFlag key={ch.id} ch={ch} pos={FLAG_POS[i]} onClick={setCinematic} />
      ))}

      {/* ── Chariot + Krishna + Name ── */}
      <ChariotScene
        krishnaZone={zone === 'krishna'}
        chariotZone={zone === 'chariot'}
      />

      {/* ── Sky zone label (vision) ── */}
      {zone === 'up' && (
        <div style={{
          position:'absolute', top:'10%', left:'50%',
          transform:'translateX(-50%)',
          textAlign:'center', pointerEvents:'none', zIndex:10,
          animation:'cinematicTextIn 0.4s ease-out forwards',
        }}>
          <div style={{ width:1, height:28, background:'rgba(212,175,55,0.38)', margin:'0 auto 0.45rem' }}/>
          <p style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(0.48rem,1vw,0.7rem)', letterSpacing:'0.5em', color:GOLD, textTransform:'uppercase' }}>
            MY VISION
          </p>
        </div>
      )}

      {/* ── Zone highlight overlays ── */}
      <ZoneHighlights zone={zone} />

      {/* ── Zone label ── */}
      {zone && <ZoneLabel zone={zone} />}

      {/* ── Idle hint ── */}
      {!zone && (
        <div style={{
          position:'absolute', bottom:'3.5%', left:'50%',
          transform:'translateX(-50%)',
          textAlign:'center', pointerEvents:'none', zIndex:10,
          animation:'symFloat 4s ease-in-out infinite',
        }}>
          <p style={{
            fontFamily:'Cinzel,serif', fontSize:'clamp(0.38rem,0.82vw,0.52rem)',
            letterSpacing:'0.42em',
            color:'rgba(212,175,55,0.2)',
            textTransform:'uppercase',
          }}>
            Move Your Cursor · Explore the Battlefield
          </p>
        </div>
      )}

      {/* ═══ OVERLAYS ═══════════════════════════════════════════ */}

      {section === 'weapons' && (
        <WeaponsPanel onClose={() => setSection(null)} />
      )}
      {section && section !== 'weapons' && (
        <ContentPanel section={section} onClose={() => setSection(null)} />
      )}
      {cinematic && (
        <ChapterCinematic ch={cinematic} onClose={() => setCinematic(null)} />
      )}
    </div>
  )
}
