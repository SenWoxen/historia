/**
 * Backgrounds are plain SVG components so the template ships with zero
 * binary assets. Swap any of these for <img src="..."> if you have real art —
 * the scene only needs a component that fills its box.
 */

const Frame = ({ children }) => (
  <svg
    className="bg-svg"
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {children}
  </svg>
)

function Courtyard() {
  return (
    <Frame>
      <defs>
        <linearGradient id="cy-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2440" />
          <stop offset="55%" stopColor="#38405C" />
          <stop offset="100%" stopColor="#6B6070" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#cy-sky)" />
      <circle cx="1230" cy="185" r="74" fill="#F1E6C8" opacity="0.92" />
      <circle cx="1230" cy="185" r="140" fill="#F1E6C8" opacity="0.08" />

      {/* distant ridge */}
      <path d="M0 470 L230 360 L400 430 L620 320 L860 450 L1080 380 L1340 460 L1600 390 L1600 900 L0 900Z" fill="#232A41" opacity="0.85" />

      {/* tiled roof + gate */}
      <path d="M380 470 L800 330 L1220 470 Z" fill="#2A1F24" />
      <path d="M360 470 L1240 470 L1210 505 L390 505 Z" fill="#3A2A2E" />
      <rect x="470" y="505" width="660" height="330" fill="#20181B" />
      <rect x="640" y="560" width="320" height="275" fill="#12100F" />
      <rect x="796" y="560" width="8" height="275" fill="#4A3B33" />

      {/* pillars */}
      <rect x="470" y="505" width="46" height="330" fill="#4E2F2B" />
      <rect x="1084" y="505" width="46" height="330" fill="#4E2F2B" />

      {/* wet stone ground */}
      <rect y="835" width="1600" height="65" fill="#2C2E33" />
      <g opacity="0.25" stroke="#CFC8B5" strokeWidth="2">
        <path d="M0 860 H1600" />
        <path d="M0 884 H1600" />
      </g>
      <ellipse cx="800" cy="878" rx="300" ry="16" fill="#F1E6C8" opacity="0.1" />
    </Frame>
  )
}

function Archive() {
  return (
    <Frame>
      <defs>
        <radialGradient id="ar-glow" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#6B4E28" />
          <stop offset="100%" stopColor="#140F0C" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#ar-glow)" />

      {/* shelving */}
      {[80, 400, 1120, 1440].map((x) => (
        <g key={x}>
          <rect x={x} y="120" width="180" height="700" fill="#241A14" />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x={x} y={200 + r * 160} width="180" height="12" fill="#3C2A1E" />
              {[0, 1, 2, 3, 4, 5].map((s) => (
                <rect
                  key={s}
                  x={x + 10 + s * 27}
                  y={200 + r * 160 - 92}
                  width="20"
                  height="92"
                  fill={['#7A5B3A', '#8E6B45', '#5F4630', '#A08050'][(r + s) % 4]}
                  opacity="0.9"
                />
              ))}
            </g>
          ))}
        </g>
      ))}

      {/* hanging lanterns */}
      {[430, 800, 1170].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2={150 + i * 22} stroke="#2A2018" strokeWidth="4" />
          <ellipse cx={x} cy={200 + i * 22} rx="42" ry="56" fill="#E8B15C" opacity="0.95" />
          <ellipse cx={x} cy={200 + i * 22} rx="42" ry="56" fill="none" stroke="#7A4B1E" strokeWidth="4" />
          <ellipse cx={x} cy={230 + i * 22} rx="150" ry="150" fill="#F0C57A" opacity="0.07" />
        </g>
      ))}

      <rect y="800" width="1600" height="100" fill="#1A1310" />
      <rect y="800" width="1600" height="6" fill="#3B2A1C" />
    </Frame>
  )
}

function Harbour() {
  return (
    <Frame>
      <defs>
        <linearGradient id="hb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9C793" />
          <stop offset="48%" stopColor="#D79A72" />
          <stop offset="100%" stopColor="#8E6A73" />
        </linearGradient>
        <linearGradient id="hb-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E6A7E" />
          <stop offset="100%" stopColor="#38364A" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hb-sky)" />
      <circle cx="420" cy="430" r="90" fill="#F6E2B4" opacity="0.85" />
      <path d="M0 470 L280 400 L520 450 L820 385 L1180 455 L1600 405 L1600 560 L0 560Z" fill="#5C4551" opacity="0.7" />
      <rect y="540" width="1600" height="360" fill="url(#hb-sea)" />

      {/* boats */}
      {[[260, 640, 1], [900, 690, 0.86], [1330, 620, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-130 0 Q0 60 130 0 L110 34 Q0 76 -110 34 Z" fill="#33262A" />
          <rect x="-4" y="-150" width="8" height="150" fill="#33262A" />
          <path d="M4 -146 L92 -26 L4 -26 Z" fill="#EADCC0" opacity="0.92" />
        </g>
      ))}

      {/* reflections */}
      <g opacity="0.3" stroke="#F6E2B4" strokeWidth="3" strokeLinecap="round">
        {[600, 660, 720, 780, 840].map((y, i) => (
          <path key={y} d={`M${380 + i * 14} ${y} h${110 - i * 12}`} />
        ))}
      </g>
      <rect y="840" width="1600" height="60" fill="#2A2028" />
    </Frame>
  )
}

export const backgrounds = {
  courtyard: Courtyard,
  archive: Archive,
  harbour: Harbour,
}

export default function Background({ name }) {
  const Art = backgrounds[name] ?? Courtyard
  return (
    <div className="bg" key={name}>
      <Art />
      <div className="bg-vignette" />
    </div>
  )
}
