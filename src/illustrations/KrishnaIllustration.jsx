const KrishnaIllustration = () => (
  <svg
    viewBox="0 0 300 520"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-label="Krishna playing flute illustration"
  >
    <defs>
      {/* Skin — divine blue */}
      <linearGradient id="skinGrad" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#4a7fd4" />
        <stop offset="40%" stopColor="#2d5098" />
        <stop offset="100%" stopColor="#1a2f6e" />
      </linearGradient>

      {/* Gold */}
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0d060" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8b6914" />
      </linearGradient>

      {/* Saffron dhoti */}
      <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffb040" />
        <stop offset="100%" stopColor="#ff6800" />
      </linearGradient>

      {/* Halo */}
      <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.65" />
        <stop offset="65%" stopColor="#d4af37" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
      </radialGradient>

      {/* Body ambient glow */}
      <radialGradient id="bodyGlow" cx="50%" cy="38%" r="52%">
        <stop offset="0%" stopColor="#4a7fd4" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#1a2f6e" stopOpacity="0" />
      </radialGradient>

      {/* Soft glow filter */}
      <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ── AMBIENT GLOW ─────────────────────────── */}
    <ellipse cx="150" cy="260" rx="155" ry="225" fill="url(#bodyGlow)" />

    {/* ── HALO ─────────────────────────────────── */}
    <circle cx="150" cy="132" r="74" fill="url(#haloGrad)" filter="url(#glow)" />
    <circle cx="150" cy="132" r="68" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.5" />
    <circle cx="150" cy="132" r="61" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.28" />
    {/* Halo petal marks */}
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * 45 * Math.PI) / 180
      return (
        <line
          key={i}
          x1={150 + 61 * Math.cos(a)} y1={132 + 61 * Math.sin(a)}
          x2={150 + 68 * Math.cos(a)} y2={132 + 68 * Math.sin(a)}
          stroke="#d4af37" strokeWidth="2.2" opacity="0.55"
        />
      )
    })}

    {/* ── PEACOCK FEATHER ──────────────────────── */}
    {/* Rachis */}
    <path d="M 163 68 Q 188 46 212 18" stroke="#0a7a5a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* Barbs */}
    <path d="M 182 50 Q 192 43 198 48" stroke="#1a8a6a" strokeWidth="1.5" fill="none" />
    <path d="M 175 59 Q 186 51 193 55" stroke="#1a8a6a" strokeWidth="1.5" fill="none" />
    <path d="M 169 63 Q 180 56 186 60" stroke="#1a8a6a" strokeWidth="1.5" fill="none" />
    {/* Eye layers */}
    <ellipse cx="212" cy="18" rx="15" ry="19" fill="#0d6b4e" />
    <ellipse cx="212" cy="18" rx="10.5" ry="13" fill="#1565c0" />
    <ellipse cx="212" cy="18" rx="6.5" ry="8" fill="#1a237e" />
    <ellipse cx="212" cy="18" rx="3.5" ry="4.5" fill="#060512" />
    <ellipse cx="210" cy="15" rx="2" ry="2.2" fill="white" opacity="0.6" />
    <ellipse cx="212" cy="18" rx="15" ry="19" fill="none" stroke="#22c5ae" strokeWidth="1.4" opacity="0.7" />

    {/* ── CROWN / MUKUT ────────────────────────── */}
    {/* Three spires */}
    <path d="M 119 106 L 130 74 L 141 106 Z" fill="url(#goldGrad)" filter="url(#glow)" />
    <path d="M 136 106 L 150 46 L 164 106 Z" fill="url(#goldGrad)" filter="url(#glow)" />
    <path d="M 159 106 L 170 74 L 181 106 Z" fill="url(#goldGrad)" filter="url(#glow)" />
    {/* Crown band */}
    <path d="M 116 104 Q 150 114 184 104 L 182 117 Q 150 127 118 117 Z" fill="url(#goldGrad)" />
    {/* Crown jewels */}
    <circle cx="150" cy="60" r="6.5" fill="#cc2233" filter="url(#glow)" />
    <circle cx="150" cy="60" r="3.5" fill="#ff4455" opacity="0.85" />
    <circle cx="129" cy="80" r="4" fill="#1565c0" />
    <circle cx="171" cy="80" r="4" fill="#1565c0" />
    <circle cx="131" cy="113" r="3" fill="#cc2233" />
    <circle cx="150" cy="115" r="3" fill="#2d5098" />
    <circle cx="169" cy="113" r="3" fill="#cc2233" />
    {/* Feather mount */}
    <circle cx="163" cy="70" r="5" fill="url(#goldGrad)" />

    {/* ── FACE ─────────────────────────────────── */}
    <ellipse cx="150" cy="135" rx="39" ry="44" fill="url(#skinGrad)" />

    {/* Tilak */}
    <path d="M 148 103 Q 150 98 152 103 L 150 116 Z" fill="#cc2233" />
    <circle cx="150" cy="103" r="3.5" fill="white" />
    <circle cx="150" cy="103" r="2" fill="#ffcc44" />

    {/* Eyebrows */}
    <path d="M 126 122 Q 137 116 145 120" stroke="#0d0820" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <path d="M 155 120 Q 163 116 174 122" stroke="#0d0820" strokeWidth="2.8" fill="none" strokeLinecap="round" />

    {/* Left eye */}
    <ellipse cx="136" cy="130" rx="11" ry="8" fill="white" />
    <ellipse cx="135" cy="131" rx="7.5" ry="6.5" fill="#1a1050" />
    <circle cx="133" cy="130" r="4" fill="#050518" />
    <circle cx="131" cy="128" r="1.5" fill="white" />
    <path d="M 125 130 Q 136 122 147 130" stroke="#0d0820" strokeWidth="1.5" fill="none" />

    {/* Right eye */}
    <ellipse cx="164" cy="130" rx="11" ry="8" fill="white" />
    <ellipse cx="165" cy="131" rx="7.5" ry="6.5" fill="#1a1050" />
    <circle cx="167" cy="130" r="4" fill="#050518" />
    <circle cx="169" cy="128" r="1.5" fill="white" />
    <path d="M 153 130 Q 164 122 175 130" stroke="#0d0820" strokeWidth="1.5" fill="none" />

    {/* Nose */}
    <path d="M 149 138 Q 144 148 147 154 Q 150 156 153 154 Q 156 148 151 138" fill="#2555a0" opacity="0.55" />

    {/* Lips — pursed for flute */}
    <path d="M 139 163 Q 144 160 150 161 Q 156 160 161 163" stroke="#cc3344" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 141 166 Q 150 163 159 166" stroke="#aa2233" strokeWidth="1.5" fill="none" />

    {/* Ear ornaments */}
    <ellipse cx="111" cy="135" rx="12" ry="14" fill="url(#skinGrad)" />
    <circle cx="111" cy="132" r="8" fill="url(#goldGrad)" />
    <circle cx="111" cy="132" r="4" fill="#cc2233" />
    <ellipse cx="189" cy="135" rx="12" ry="14" fill="url(#skinGrad)" />
    <circle cx="189" cy="132" r="8" fill="url(#goldGrad)" />
    <circle cx="189" cy="132" r="4" fill="#cc2233" />

    {/* ── NECK ─────────────────────────────────── */}
    <rect x="136" y="177" width="28" height="15" rx="4" fill="url(#skinGrad)" />

    {/* ── NECKLACE ─────────────────────────────── */}
    <path d="M 122 193 Q 150 208 178 193" stroke="url(#goldGrad)" strokeWidth="4.5" fill="none" />
    {[0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9].map((t, i) => (
      <circle
        key={i}
        cx={122 + t * 56} cy={193 + Math.sin(t * Math.PI) * 15}
        r="3" fill="#d4af37" opacity="0.9"
      />
    ))}

    {/* ── TORSO ────────────────────────────────── */}
    {/* Left shoulder cap */}
    <path d="M 108 192 Q 93 200 87 212 Q 82 224 88 234 Q 104 222 114 208 Z" fill="url(#skinGrad)" />
    {/* Right shoulder cap */}
    <path d="M 192 192 Q 207 200 213 212 Q 218 224 212 234 Q 196 222 186 208 Z" fill="url(#skinGrad)" />
    {/* Main torso */}
    <path d="M 110 193 Q 105 242 109 292 Q 128 307 150 305 Q 172 307 191 292 Q 195 242 190 193 Q 174 186 150 184 Q 126 186 110 193 Z" fill="url(#skinGrad)" />

    {/* Kaustubha gem */}
    <circle cx="150" cy="228" r="10" fill="url(#goldGrad)" />
    <circle cx="150" cy="228" r="7" fill="#8b0000" />
    <circle cx="150" cy="228" r="4" fill="#cc1111" />
    <circle cx="148" cy="226" r="1.5" fill="white" opacity="0.7" />

    {/* Vaijayanti mala (long garland) */}
    <path
      d="M 126 200 Q 150 218 174 200 Q 174 242 162 264 Q 155 278 150 282 Q 145 278 138 264 Q 126 242 126 200"
      stroke="#2a8a2a" strokeWidth="3" fill="none" opacity="0.65"
    />

    {/* ── ARMS (RAISED TO PLAY FLUTE) ──────────── */}
    {/* Left upper arm */}
    <path d="M 110 200 Q 94 190 80 175 Q 75 169 76 162" stroke="url(#skinGrad)" strokeWidth="22" fill="none" strokeLinecap="round" />
    {/* Left forearm */}
    <path d="M 76 162 Q 78 156 83 151" stroke="url(#skinGrad)" strokeWidth="18" fill="none" strokeLinecap="round" />
    {/* Left hand */}
    <ellipse cx="83" cy="149" rx="12" ry="10" fill="url(#skinGrad)" transform="rotate(-20,83,149)" />

    {/* Right upper arm */}
    <path d="M 190 200 Q 206 190 220 175 Q 225 169 224 162" stroke="url(#skinGrad)" strokeWidth="22" fill="none" strokeLinecap="round" />
    {/* Right forearm */}
    <path d="M 224 162 Q 222 156 217 151" stroke="url(#skinGrad)" strokeWidth="18" fill="none" strokeLinecap="round" />
    {/* Right hand */}
    <ellipse cx="217" cy="149" rx="12" ry="10" fill="url(#skinGrad)" transform="rotate(20,217,149)" />

    {/* Arm bangles */}
    <path d="M 91 182 Q 98 179 104 182" stroke="url(#goldGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    <path d="M 196 182 Q 202 179 209 182" stroke="url(#goldGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />

    {/* ── BANSURI (FLUTE) ──────────────────────── */}
    <path d="M 80 157 Q 150 151 220 155" stroke="#5a3a08" strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M 80 156 Q 150 150 220 154" stroke="#a07428" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
    {/* Holes */}
    {[0.18, 0.3, 0.43, 0.56, 0.68, 0.8].map((t, i) => (
      <circle key={i} cx={80 + t * 140} cy={157 - t * 2} r="2.5" fill="#2a1000" opacity="0.85" />
    ))}
    {/* Decorative bands */}
    <path d="M 92 156 L 92 149" stroke="#d4af37" strokeWidth="1.8" />
    <path d="M 208 154 L 208 147" stroke="#d4af37" strokeWidth="1.8" />

    {/* ── WAIST BELT ───────────────────────────── */}
    <path d="M 109 293 Q 150 307 191 293 L 191 304 Q 150 318 109 304 Z" fill="url(#goldGrad)" />
    <circle cx="150" cy="303" r="7.5" fill="url(#goldGrad)" />
    <circle cx="150" cy="303" r="4.5" fill="#cc2233" />

    {/* ── DHOTI ────────────────────────────────── */}
    <path d="M 109 302 Q 103 348 110 392 Q 126 422 150 420 Q 174 422 190 392 Q 197 348 191 302" fill="url(#saffronGrad)" />
    {/* Pleats */}
    <path d="M 150 307 Q 145 357 148 412" stroke="#ff6800" strokeWidth="1.5" fill="none" opacity="0.45" />
    <path d="M 158 306 Q 164 354 161 408" stroke="#ff6800" strokeWidth="1" fill="none" opacity="0.25" />
    <path d="M 142 306 Q 136 354 139 408" stroke="#ff6800" strokeWidth="1" fill="none" opacity="0.25" />
    {/* Border */}
    <path d="M 109 302 Q 150 312 191 302" stroke="#d4af37" strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M 110 392 Q 150 400 190 392" stroke="#d4af37" strokeWidth="2.5" fill="none" opacity="0.6" />

    {/* ── LEGS ─────────────────────────────────── */}
    <path d="M 110 392 Q 112 432 118 462 Q 124 477 131 472 Q 137 467 136 450 Q 133 430 128 392 Z" fill="url(#skinGrad)" />
    <path d="M 190 392 Q 188 432 182 462 Q 176 477 169 472 Q 163 467 164 450 Q 167 430 172 392 Z" fill="url(#skinGrad)" />

    {/* Anklets */}
    <path d="M 116 457 Q 128 464 140 457" stroke="url(#goldGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    <path d="M 160 457 Q 172 464 184 457" stroke="url(#goldGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />

    {/* ── LOTUS PEDESTAL ───────────────────────── */}
    {[-50, -30, -12, 6, 24, 42, 60, 78].map((angle, i) => {
      const r = (angle * Math.PI) / 180
      const cx = 150 + 42 * Math.sin(r)
      const cy = 492 - 16 * Math.abs(Math.cos(r)) + (i % 2 === 0 ? 0 : 3)
      return (
        <ellipse
          key={i} cx={cx} cy={cy} rx="17" ry="28"
          fill={i % 2 === 0 ? '#c97090' : '#e090a8'}
          transform={`rotate(${angle},${cx},${cy})`}
          opacity="0.8"
        />
      )
    })}
    <ellipse cx="150" cy="492" rx="24" ry="12" fill="#ffcc44" opacity="0.6" />

    {/* ── DIVINE SPARKLES ──────────────────────── */}
    {[
      { x: 248, y: 78, s: 8 },
      { x: 52, y: 118, s: 6 },
      { x: 262, y: 198, s: 5 },
      { x: 38, y: 244, s: 7 },
      { x: 258, y: 330, s: 5 },
      { x: 44, y: 384, s: 4 },
    ].map(({ x, y, s }, i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        <line x1={-s} y1="0" x2={s} y2="0" stroke="#d4af37" strokeWidth="1.6" opacity="0.75" />
        <line x1="0" y1={-s} x2="0" y2={s} stroke="#d4af37" strokeWidth="1.6" opacity="0.75" />
        <line x1={-s * 0.65} y1={-s * 0.65} x2={s * 0.65} y2={s * 0.65} stroke="#d4af37" strokeWidth="1" opacity="0.45" />
        <line x1={s * 0.65} y1={-s * 0.65} x2={-s * 0.65} y2={s * 0.65} stroke="#d4af37" strokeWidth="1" opacity="0.45" />
        <circle cx="0" cy="0" r="2" fill="#d4af37" opacity="0.95" />
      </g>
    ))}
  </svg>
)

export default KrishnaIllustration
