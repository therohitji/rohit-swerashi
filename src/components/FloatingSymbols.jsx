/* ─────────────────────────────────────────────────────────────────────
   FloatingSymbols — 30 animated Hindu / Mahabharata SVG icons
   Fixed background layer (z-index 1), gold, very low opacity.
   Each symbol has its own animation type, duration and phase offset.
   ───────────────────────────────────────────────────────────────────── */

/* ── SVG symbols ─────────────────────────────────────────────────── */

const Om = () => (
  <text x="50" y="80" textAnchor="middle" fontSize="88"
    fontFamily="Georgia,'Palatino Linotype',serif"
    fill="currentColor">ॐ</text>
)

const DharmaChakra = () => {
  const spokes = Array.from({ length: 8 }, (_, i) => (
    <line key={i} x1="50" y1="17" x2="50" y2="37" strokeWidth="2.2"
      transform={`rotate(${i * 45} 50 50)`} />
  ))
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <circle cx="50" cy="50" r="33" strokeWidth="2.8" />
      <circle cx="50" cy="50" r="33" strokeWidth="0.8" opacity="0.3" />
      <circle cx="50" cy="50" r="9" strokeWidth="2.2" />
      {spokes}
    </g>
  )
}

const Lotus = () => {
  const petals = Array.from({ length: 8 }, (_, i) => (
    <ellipse key={i} cx="50" cy="29" rx="7" ry="20"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      transform={`rotate(${i * 45} 50 50)`} />
  ))
  return (
    <g>
      {petals}
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.6" />
    </g>
  )
}

const Trishul = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="50" y1="48" x2="50" y2="94" strokeWidth="3.5" />
    <line x1="50" y1="13" x2="50" y2="50" strokeWidth="2.8" />
    <polygon points="50,6 43,18 57,18" fill="currentColor" opacity="0.9" />
    <path d="M 50,29 Q 33,25 29,18" strokeWidth="2.2" />
    <polygon points="28,12 23,23 35,21" fill="currentColor" opacity="0.75" />
    <path d="M 50,29 Q 67,25 71,18" strokeWidth="2.2" />
    <polygon points="72,12 65,21 77,23" fill="currentColor" opacity="0.75" />
    <line x1="42" y1="48" x2="58" y2="48" strokeWidth="2.2" />
  </g>
)

const Dhanush = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round">
    <path d="M 24,87 C 12,63 12,37 24,13" strokeWidth="4" />
    <line x1="24" y1="87" x2="24" y2="13" strokeWidth="1.4" />
    <line x1="24" y1="50" x2="79" y2="50" strokeWidth="2.2" />
    <polygon points="85,50 72,44 72,56" fill="currentColor" />
    <path d="M 24,50 L 17,43 M 24,50 L 17,57" strokeWidth="1.8" />
  </g>
)

const Shankha = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round">
    <path d="M 50,11 C 76,11 86,32 82,54 C 78,73 63,85 50,87 C 36,87 24,76 22,60 C 20,44 30,28 45,20 C 47,11 49,9 50,11 Z" strokeWidth="2.5" />
    <path d="M 50,32 C 64,32 69,43 66,54 C 63,63 55,66 48,65 C 40,63 37,55 40,48" strokeWidth="2" />
    <path d="M 36,74 Q 28,79 27,87 Q 36,93 50,91" strokeWidth="2" />
  </g>
)

const Diya = () => (
  <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50,44 C 44,33 46,19 50,8 C 54,19 56,33 50,44 Z"
      fill="currentColor" opacity="0.82" />
    <path d="M 50,42 C 47,33 48,23 50,15 C 52,23 53,33 50,42 Z"
      fill="currentColor" opacity="0.35" />
    <line x1="50" y1="44" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
    <path d="M 26,67 Q 26,53 50,53 Q 74,53 74,67 Q 70,81 50,83 Q 30,81 26,67 Z"
      fill="none" stroke="currentColor" strokeWidth="2.8" />
    <path d="M 65,58 Q 82,55 84,64 Q 82,71 65,68"
      fill="none" stroke="currentColor" strokeWidth="2" />
  </g>
)

const Surya = () => {
  const rays = Array.from({ length: 12 }, (_, i) => (
    <line key={i} x1="50" y1="7" x2="50" y2="21"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      transform={`rotate(${i * 30} 50 50)`} />
  ))
  return (
    <g>
      <circle cx="50" cy="50" r="21" fill="currentColor" opacity="0.18" />
      <circle cx="50" cy="50" r="21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      {rays}
    </g>
  )
}

const Feather = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round">
    <path d="M 50,93 C 50,80 48,70 50,52" strokeWidth="2.2" />
    <ellipse cx="50" cy="28" rx="17" ry="27" strokeWidth="2.2" />
    <ellipse cx="50" cy="32" rx="11" ry="18" strokeWidth="1.6" />
    <ellipse cx="50" cy="34" rx="6" ry="10" fill="currentColor" opacity="0.55" />
    <path d="M 48,53 L 20,78" strokeWidth="0.9" opacity="0.5" />
    <path d="M 45,60 L 16,78" strokeWidth="0.9" opacity="0.4" />
    <path d="M 43,67 L 18,84" strokeWidth="0.8" opacity="0.32" />
    <path d="M 52,53 L 80,78" strokeWidth="0.9" opacity="0.5" />
    <path d="M 55,60 L 84,78" strokeWidth="0.9" opacity="0.4" />
    <path d="M 57,67 L 82,84" strokeWidth="0.8" opacity="0.32" />
  </g>
)

const Yantra = () => (
  <g fill="none" stroke="currentColor" strokeLinejoin="round">
    <circle cx="50" cy="50" r="44" strokeWidth="1.8" />
    <polygon points="50,8 89,80 11,80" strokeWidth="2.2" />
    <polygon points="50,92 11,20 89,20" strokeWidth="2.2" />
    <circle cx="50" cy="50" r="13" strokeWidth="1.2" opacity="0.5" />
    <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.95" />
  </g>
)

const Kalash = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 36,84 Q 22,68 26,52 Q 30,36 50,34 Q 70,36 74,52 Q 78,68 64,84 Z" strokeWidth="2.8" />
    <rect x="42" y="24" width="16" height="12" rx="3" strokeWidth="2.2" />
    <ellipse cx="50" cy="18" rx="10" ry="8" strokeWidth="2.2" />
    <path d="M 40,22 C 30,14 26,6 30,2" strokeWidth="1.6" />
    <path d="M 60,22 C 70,14 74,6 70,2" strokeWidth="1.6" />
    <path d="M 30,57 Q 50,62 70,57" strokeWidth="1.2" opacity="0.55" />
    <path d="M 28,67 Q 50,72 72,67" strokeWidth="1.2" opacity="0.45" />
  </g>
)

const Gita = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50,20 Q 30,15 12,20 L 12,82 Q 30,77 50,82 Q 70,77 88,82 L 88,20 Q 70,15 50,20 Z" strokeWidth="2.8" />
    <line x1="50" y1="20" x2="50" y2="82" strokeWidth="2.2" />
    <line x1="18" y1="36" x2="44" y2="33" strokeWidth="1.3" opacity="0.6" />
    <line x1="18" y1="45" x2="44" y2="42" strokeWidth="1.3" opacity="0.6" />
    <line x1="18" y1="54" x2="44" y2="51" strokeWidth="1.3" opacity="0.55" />
    <line x1="18" y1="63" x2="44" y2="60" strokeWidth="1.3" opacity="0.5" />
    <line x1="56" y1="33" x2="82" y2="36" strokeWidth="1.3" opacity="0.6" />
    <line x1="56" y1="42" x2="82" y2="45" strokeWidth="1.3" opacity="0.6" />
    <line x1="56" y1="51" x2="82" y2="54" strokeWidth="1.3" opacity="0.55" />
    <line x1="56" y1="60" x2="82" y2="63" strokeWidth="1.3" opacity="0.5" />
  </g>
)

const Spark = () => (
  <g stroke="currentColor" strokeLinecap="round">
    <line x1="50" y1="4" x2="50" y2="96" strokeWidth="1.5" />
    <line x1="4" y1="50" x2="96" y2="50" strokeWidth="1.5" />
    <line x1="18" y1="18" x2="82" y2="82" strokeWidth="1" />
    <line x1="82" y1="18" x2="18" y2="82" strokeWidth="1" />
    <circle cx="50" cy="50" r="5.5" fill="currentColor" opacity="0.95" />
  </g>
)

const Namaste = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50,84 Q 38,82 34,72 L 30,46 Q 28,38 34,34 Q 38,24 42,26 L 44,34 Q 46,24 48,22 L 50,28" strokeWidth="2.2" />
    <path d="M 50,84 Q 62,82 66,72 L 70,46 Q 72,38 66,34 Q 62,24 58,26 L 56,34 Q 54,24 52,22 L 50,28" strokeWidth="2.2" />
    <path d="M 50,28 C 50,22 50,18 50,15" strokeWidth="2" />
    <path d="M 34,62 Q 26,59 24,52 Q 26,45 34,50" strokeWidth="1.6" />
    <path d="M 66,62 Q 74,59 76,52 Q 74,45 66,50" strokeWidth="1.6" />
  </g>
)

const Arrow = () => (
  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" y1="50" x2="78" y2="50" strokeWidth="2.2" />
    <polygon points="88,50 75,43 75,57" fill="currentColor" />
    <path d="M 10,50 L 3,42 M 10,50 L 3,58" strokeWidth="1.8" />
    <path d="M 18,50 L 12,44 M 18,50 L 12,56" strokeWidth="1.5" />
  </g>
)

/* ── Symbol map ───────────────────────────────────────────────────── */

const ICONS = {
  om: Om,
  chakra: DharmaChakra,
  lotus: Lotus,
  trishul: Trishul,
  dhanush: Dhanush,
  shankha: Shankha,
  diya: Diya,
  surya: Surya,
  feather: Feather,
  yantra: Yantra,
  kalash: Kalash,
  gita: Gita,
  spark: Spark,
  namaste: Namaste,
  arrow: Arrow,
}

/* ── Instance layout ─────────────────────────────────────────────────
   x/y  : % from top-left
   sz   : px (width & height of the symbol)
   op   : base opacity (0 – 1)
   a    : animation class suffix (float | float-r | spin | spin-r | pulse | drift)
   d    : animation duration in seconds
   dl   : negative delay — starts each symbol mid-cycle so they're not in sync
   ─────────────────────────────────────────────────────────────────── */

const INSTANCES = [
  /* ── large anchors ── */
  { k: 'om-1',       ic: 'om',      x: 4,   y: 6,   sz: 60, op: 0.11, a: 'float-r', d: 9,   dl: 0    },
  { k: 'chakra-1',   ic: 'chakra',  x: 87,  y: 4,   sz: 52, op: 0.09, a: 'spin',    d: 20,  dl: 0    },
  { k: 'lotus-1',    ic: 'lotus',   x: 62,  y: 10,  sz: 46, op: 0.08, a: 'float',   d: 8,   dl: 1.5  },
  { k: 'yantra-1',   ic: 'yantra',  x: 76,  y: 22,  sz: 46, op: 0.07, a: 'spin-r',  d: 26,  dl: 2    },

  /* ── upper zone ── */
  { k: 'trishul-1',  ic: 'trishul', x: 2,   y: 28,  sz: 44, op: 0.09, a: 'float',   d: 10,  dl: 0.5  },
  { k: 'dhanush-1',  ic: 'dhanush', x: 87,  y: 34,  sz: 42, op: 0.08, a: 'float-r', d: 11,  dl: 3    },
  { k: 'surya-1',    ic: 'surya',   x: 26,  y: 16,  sz: 38, op: 0.08, a: 'spin',    d: 22,  dl: 1    },
  { k: 'arrow-1',    ic: 'arrow',   x: 44,  y: 24,  sz: 34, op: 0.08, a: 'drift',   d: 14,  dl: 2.5  },
  { k: 'spark-1',    ic: 'spark',   x: 5,   y: 14,  sz: 22, op: 0.12, a: 'pulse',   d: 3.5, dl: 1.2  },

  /* ── mid zone ── */
  { k: 'feather-1',  ic: 'feather', x: 5,   y: 50,  sz: 42, op: 0.09, a: 'float-r', d: 12,  dl: 0.8  },
  { k: 'shankha-1',  ic: 'shankha', x: 80,  y: 51,  sz: 40, op: 0.08, a: 'float',   d: 9,   dl: 2    },
  { k: 'gita-1',     ic: 'gita',    x: 52,  y: 40,  sz: 38, op: 0.07, a: 'float',   d: 13,  dl: 1    },
  { k: 'namaste-1',  ic: 'namaste', x: 36,  y: 56,  sz: 38, op: 0.08, a: 'float',   d: 10,  dl: 3.5  },
  { k: 'diya-1',     ic: 'diya',    x: 68,  y: 47,  sz: 40, op: 0.09, a: 'pulse',   d: 4,   dl: 0    },
  { k: 'om-2',       ic: 'om',      x: 92,  y: 44,  sz: 30, op: 0.08, a: 'float-r', d: 8,   dl: 4    },
  { k: 'spark-2',    ic: 'spark',   x: 16,  y: 43,  sz: 20, op: 0.12, a: 'pulse',   d: 3,   dl: 2    },
  { k: 'spark-3',    ic: 'spark',   x: 48,  y: 30,  sz: 18, op: 0.11, a: 'pulse',   d: 4,   dl: 0.6  },

  /* ── lower-mid zone ── */
  { k: 'kalash-1',   ic: 'kalash',  x: 88,  y: 67,  sz: 44, op: 0.09, a: 'float',   d: 10,  dl: 0.5  },
  { k: 'lotus-2',    ic: 'lotus',   x: 17,  y: 65,  sz: 36, op: 0.08, a: 'float',   d: 9,   dl: 2.5  },
  { k: 'yantra-2',   ic: 'yantra',  x: 42,  y: 70,  sz: 32, op: 0.07, a: 'spin',    d: 28,  dl: 3    },
  { k: 'trishul-2',  ic: 'trishul', x: 62,  y: 72,  sz: 34, op: 0.07, a: 'float',   d: 11,  dl: 1.8  },
  { k: 'surya-2',    ic: 'surya',   x: 2,   y: 14,  sz: 28, op: 0.07, a: 'spin',    d: 18,  dl: 4    },
  { k: 'spark-4',    ic: 'spark',   x: 72,  y: 62,  sz: 18, op: 0.11, a: 'pulse',   d: 3.5, dl: 1.5  },

  /* ── bottom zone ── */
  { k: 'gita-2',     ic: 'gita',    x: 8,   y: 80,  sz: 36, op: 0.08, a: 'float',   d: 12,  dl: 0    },
  { k: 'feather-2',  ic: 'feather', x: 76,  y: 82,  sz: 32, op: 0.07, a: 'float-r', d: 10,  dl: 2    },
  { k: 'chakra-2',   ic: 'chakra',  x: 47,  y: 85,  sz: 34, op: 0.07, a: 'spin',    d: 22,  dl: 1.5  },
  { k: 'om-3',       ic: 'om',      x: 92,  y: 86,  sz: 26, op: 0.09, a: 'float',   d: 7,   dl: 3    },
  { k: 'dhanush-2',  ic: 'dhanush', x: 28,  y: 83,  sz: 30, op: 0.07, a: 'float-r', d: 9,   dl: 1    },
  { k: 'shankha-2',  ic: 'shankha', x: 60,  y: 89,  sz: 28, op: 0.07, a: 'float',   d: 8,   dl: 4    },
  { k: 'diya-2',     ic: 'diya',    x: 3,   y: 88,  sz: 30, op: 0.08, a: 'pulse',   d: 5,   dl: 2.5  },
  { k: 'spark-5',    ic: 'spark',   x: 22,  y: 92,  sz: 16, op: 0.10, a: 'pulse',   d: 4,   dl: 3    },
]

/* ── Component ───────────────────────────────────────────────────── */

export default function FloatingSymbols() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {INSTANCES.map(({ k, ic, x, y, sz, op, a, d, dl }) => {
        const Icon = ICONS[ic]
        return (
          <div
            key={k}
            className={`sym-${a}`}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: sz,
              height: sz,
              color: '#d4af37',
              opacity: op,
              animationDuration: `${d}s`,
              animationDelay: `-${dl}s`,
            }}
          >
            <svg
              width="100%" height="100%"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <Icon />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
