/**
 * Character sprites.
 *
 * One parametric body, three hair/costume variants, tinted by the palette in
 * src/data/characters.js. Motion lives in CSS (see styles/stage.css):
 *   .sprite            -> idle sway + blink
 *   .sprite.is-talking -> mouth animation, lit
 *   .sprite.is-dim     -> desaturated, pushed back
 *
 * Replace a variant with <img src="/sprites/aoi.png" /> and everything else
 * in the engine keeps working.
 */

const Base = ({ p, hair, collar }) => (
  <svg viewBox="0 0 420 640" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    {/* back hair */}
    {hair.back}

    {/* shoulders / robe */}
    <path d="M210 300 L352 392 Q382 414 388 452 L400 640 L20 640 L32 452 Q38 414 68 392 Z" fill={p.robe} />
    <path d="M210 300 L268 330 L236 640 L184 640 L152 330 Z" fill={p.trim} opacity="0.95" />
    {collar}
    <path d="M20 640 L400 640" stroke="#000" strokeOpacity="0.2" strokeWidth="10" />

    {/* neck */}
    <path d="M178 250 h64 v72 l-32 20 -32-20 Z" fill={p.skin} />
    <path d="M178 250 h64 v36 h-64 Z" fill="#000" opacity="0.12" />

    {/* head */}
    <ellipse cx="210" cy="176" rx="96" ry="106" fill={p.skin} />

    {/* eyes */}
    <g className="sprite-eyes">
      <ellipse cx="172" cy="182" rx="15" ry="20" fill="#1A1418" />
      <ellipse cx="248" cy="182" rx="15" ry="20" fill="#1A1418" />
      <circle cx="177" cy="175" r="5" fill="#FFF" opacity="0.9" />
      <circle cx="253" cy="175" r="5" fill="#FFF" opacity="0.9" />
    </g>
    <path d="M154 154 q18 -12 36 -2" stroke="#1A1418" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M230 152 q18 -10 36 2" stroke="#1A1418" strokeWidth="6" fill="none" strokeLinecap="round" />

    {/* blush */}
    <ellipse cx="146" cy="214" rx="18" ry="9" fill="#D9756A" opacity="0.28" />
    <ellipse cx="274" cy="214" rx="18" ry="9" fill="#D9756A" opacity="0.28" />

    {/* mouth: scales vertically when talking */}
    <g className="sprite-mouth">
      <ellipse cx="210" cy="232" rx="16" ry="9" fill="#7C3B3B" />
    </g>

    {/* front hair */}
    {hair.front}
  </svg>
)

const variants = {
  /* Custom PNG character: two frames on the same transparent canvas.
     `img` switches by the `talking` prop, everything else stays the same. */
  historia: {
    img: (talking) => (talking ? '/sprites/openmouth.png' : '/sprites/idle.png'),
  },
  wahidin: {
    img: (talking) =>
      talking ? '/sprites/generated/wahidin-openmouth.png' : '/sprites/generated/wahidin-idle.png',
  },
  tjipto: {
    img: (talking) =>
      talking ? '/sprites/generated/tjipto-openmouth.png' : '/sprites/generated/tjipto-idle.png',
  },
  dekkers: {
    img: (talking) =>
      talking ? '/sprites/generated/dekkers-openmouth.png' : '/sprites/generated/dekkers-idle.png',
  },
  tjokro: {
    img: (talking) =>
      talking ? '/sprites/generated/tjokro-openmouth.png' : '/sprites/generated/tjokro-idle.png',
  },
  suwardi: {
    img: (talking) =>
      talking ? '/sprites/generated/suwardi-openmouth.png' : '/sprites/generated/suwardi-idle.png',
  },
  hatta: {
    img: (talking) =>
      talking ? '/sprites/generated/hatta-openmouth.png' : '/sprites/generated/hatta-idle.png',
  },
  tirto: {
    img: (talking) =>
      talking ? '/sprites/generated/tirto-openmouth.png' : '/sprites/generated/tirto-idle.png',
  },
  samanhudi: {
    img: (talking) =>
      talking ? '/sprites/generated/samanhudi-openmouth.png' : '/sprites/generated/samanhudi-idle.png',
  },
  satiman: {
    img: (talking) =>
      talking ? '/sprites/generated/satiman-openmouth.png' : '/sprites/generated/satiman-idle.png',
  },
  karta: {
    img: (talking) =>
      talking ? '/sprites/generated/karta-openmouth.png' : '/sprites/generated/karta-idle.png',
  },
  rohanah: {
    img: (talking) =>
      talking ? '/sprites/generated/rohanah-openmouth.png' : '/sprites/generated/rohanah-idle.png',
  },
  wakil: {
    img: (talking) =>
      talking ? '/sprites/generated/wakil-openmouth.png' : '/sprites/generated/wakil-idle.png',
  },
  scholar: (p) => (
    <Base
      p={p}
      collar={<path d="M210 300 L262 326 L210 372 L158 326 Z" fill={p.trim} />}
      hair={{
        back: <ellipse cx="210" cy="196" rx="126" ry="146" fill={p.hair} />,
        front: (
          <g fill={p.hair}>
            <path d="M112 156 q26 -96 98 -96 t98 96 q-24 -46 -98 -46 t-98 46 Z" />
            <path d="M116 150 q40 -34 96 -30 l-30 74 Z" />
            <path d="M304 150 q-40 -34 -96 -30 l38 70 Z" />
            <path d="M92 120 q-16 120 6 210 l34 -18 q-22 -92 -12 -180 Z" />
            <path d="M328 120 q16 120 -6 210 l-34 -18 q22 -92 12 -180 Z" />
          </g>
        ),
      }}
    />
  ),
  guard: (p) => (
    <Base
      p={p}
      collar={
        <g>
          <path d="M148 336 L210 300 L272 336 L210 360 Z" fill={p.trim} />
          <rect x="60" y="430" width="300" height="16" fill={p.trim} opacity="0.7" />
        </g>
      }
      hair={{
        back: <ellipse cx="210" cy="180" rx="112" ry="124" fill={p.hair} />,
        front: (
          <g fill={p.hair}>
            <path d="M106 150 q10 -94 104 -94 t104 94 q-20 -30 -52 -44 l-16 40 -34 -44 -30 46 -18 -40 q-38 14 -58 42 Z" />
            <path d="M100 132 q-10 62 0 116 l26 -10 q-10 -52 -4 -98 Z" />
            <path d="M320 132 q10 62 0 116 l-26 -10 q10 -52 4 -98 Z" />
          </g>
        ),
      }}
    />
  ),
  elder: (p) => (
    <Base
      p={p}
      collar={<path d="M140 340 L210 302 L280 340 L210 386 Z" fill={p.trim} />}
      hair={{
        back: <ellipse cx="210" cy="200" rx="132" ry="154" fill={p.hair} />,
        front: (
          <g fill={p.hair}>
            <path d="M104 162 q20 -106 106 -106 t106 106 q-30 -54 -106 -54 t-106 54 Z" />
            <path d="M84 140 q-20 150 4 250 l40 -20 q-24 -110 -14 -206 Z" />
            <path d="M336 140 q20 150 -4 250 l-40 -20 q24 -110 14 -206 Z" />
          </g>
        ),
      }}
    />
  ),
}

export default function Sprite({ name, palette, talking, dim, flip, at }) {
  const custom = variants[name]
  if (!custom) return null

  const cls = [
    'sprite',
    `at-${at}`,
    talking ? 'is-talking' : 'is-idle',
    dim ? 'is-dim' : '',
    flip ? 'is-flipped' : '',
  ]
    .filter(Boolean)
    .join(' ')

  /* PNG sprite: idle.png while silent, openmouth.png while talking. Both
     frames share the same canvas (1254x1254, transparent background), so
     the swap is seamless — no jump in size or position. */
  if (custom.img) {
    return (
      <div className={cls}>
        <img
          className="sprite-img"
          src={custom.img(talking)}
          alt=""
          draggable="false"
        />
      </div>
    )
  }

  return <div className={cls}>{custom(palette)}</div>
}
