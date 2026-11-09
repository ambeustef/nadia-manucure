import React from 'react';

/**
 * "Signature Nadia" nail-art designs, inspired by Nadia's own creations
 * (public/images/nadia_creations.jpg).
 *
 * Every design is drawn in the *local frame* of the Studio Macro nail:
 * the caller wraps it in `rotate(33, 57, 37)` and clips it to the real nail outline,
 * so here the nail runs vertically with
 *   - the free edge (tip) at the top, around y ≈ 17
 *   - the cuticle at the bottom, around y ≈ 58
 *   - the centre line at x = 57, nail width ≈ 44 → 70.
 * Shapes can overflow freely: the clip path trims them to the nail.
 */

export type NailArtId = 'none' | 'french-fuchsia-3d' | 'tigre-sunset' | 'leopard-rouge' | 'swirl-rouge' | 'guepard-coeur';

export interface NailArtOption {
  id: NailArtId;
  label: string;
  sublabel: string;
  /** Small CSS preview for the selector button */
  swatch: string;
  /** Colour used for the thin rim around the nail */
  rim: string;
}

export const NAIL_ARTS: NailArtOption[] = [
  { id: 'none', label: 'Vernis uni', sublabel: 'Teinte sélectionnée', swatch: 'linear-gradient(135deg,#F3D3CC,#E8B9B0)', rim: '' },
  { id: 'french-fuchsia-3d', label: 'French Fuchsia 3D', sublabel: 'Pointe coulée en relief', swatch: 'linear-gradient(180deg,#FF1E8C 0 38%,#F4CFCB 38%)', rim: '#C2185B' },
  { id: 'tigre-sunset', label: 'Tigre Sunset', sublabel: 'French V orange & fuchsia', swatch: 'linear-gradient(180deg,#FF9A1F 0 20%,#FF2A7F 20% 40%,#F4CFCB 40%)', rim: '#C2185B' },
  { id: 'leopard-rouge', label: 'Léopard Rouge', sublabel: 'Rouge vif, taches noires', swatch: 'radial-gradient(circle at 30% 35%,#2A0306 0 12%,transparent 13%),radial-gradient(circle at 70% 65%,#2A0306 0 12%,transparent 13%),#E3121E', rim: '#7A0710' },
  { id: 'swirl-rouge', label: 'Swirl Rouge', sublabel: 'Base laiteuse & ruban rouge', swatch: 'linear-gradient(160deg,#F6E7E0 0 45%,#D3172B 45% 55%,#F6E7E0 55%)', rim: '#B5122A' },
  { id: 'guepard-coeur', label: 'Guépard & Cœur', sublabel: 'Cœur fuchsia 3D & strass', swatch: 'radial-gradient(circle at 50% 35%,#FF1E8C 0 22%,transparent 23%),radial-gradient(circle at 25% 75%,#1C1208 0 8%,transparent 9%),radial-gradient(circle at 72% 80%,#1C1208 0 8%,transparent 9%),#E9CC9F', rim: '#8A5A2B' },
];

// Shared nude base used under the french-style designs
const NUDE_TOP = '#F6D6D2';
const NUDE_BOTTOM = '#EDBDB6';

/** <defs> needed by the designs (gradients, 3D filters). Render once inside the <svg>. */
export const NailArtDefs: React.FC = () => (
  <>
    <linearGradient id="na-nude" gradientUnits="userSpaceOnUse" x1="0" y1="14" x2="0" y2="60">
      <stop offset="0%" stopColor={NUDE_TOP} />
      <stop offset="100%" stopColor={NUDE_BOTTOM} />
    </linearGradient>
    <linearGradient id="na-fuchsia" gradientUnits="userSpaceOnUse" x1="0" y1="14" x2="0" y2="32">
      <stop offset="0%" stopColor="#FF3D9E" />
      <stop offset="100%" stopColor="#E5007A" />
    </linearGradient>
    <linearGradient id="na-sunset" gradientUnits="userSpaceOnUse" x1="0" y1="15" x2="0" y2="36">
      <stop offset="0%" stopColor="#FFB321" />
      <stop offset="38%" stopColor="#FF7A1A" />
      <stop offset="62%" stopColor="#FF2F7D" />
      <stop offset="100%" stopColor="#E0006E" />
    </linearGradient>
    <linearGradient id="na-red" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#A50A14" />
      <stop offset="30%" stopColor="#E3121E" />
      <stop offset="70%" stopColor="#EE1C25" />
      <stop offset="100%" stopColor="#A50A14" />
    </linearGradient>
    <linearGradient id="na-milk" gradientUnits="userSpaceOnUse" x1="0" y1="14" x2="0" y2="60">
      <stop offset="0%" stopColor="#FBF1EC" />
      <stop offset="100%" stopColor="#F1DCD3" />
    </linearGradient>
    <linearGradient id="na-cheetah" gradientUnits="userSpaceOnUse" x1="0" y1="28" x2="0" y2="60">
      <stop offset="0%" stopColor="#F0D5AA" />
      <stop offset="100%" stopColor="#E2BF8C" />
    </linearGradient>
    {/* 3D gel relief: soft drop shadow under raised elements */}
    <filter id="na-relief" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0.25" dy="0.6" stdDeviation="0.45" floodColor="#4A0025" floodOpacity="0.55" />
    </filter>
    <filter id="na-soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="0.35" />
    </filter>
    {/* Soft-edged leopard / tortoise blotches */}
    <filter id="na-blotch" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="0.45" />
    </filter>
    <filter id="na-blotch-halo" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="1.1" />
    </filter>
    <radialGradient id="na-stone" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="45%" stopColor="#D9DEE6" />
      <stop offset="100%" stopColor="#7C8594" />
    </radialGradient>
  </>
);

/** Silver rhinestone with a tiny sparkle */
const Stone: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 0.9 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="url(#na-stone)" stroke="#5C6370" strokeWidth={0.12} />
    <path d={`M ${cx - r * 1.3} ${cy} H ${cx + r * 1.3} M ${cx} ${cy - r * 1.3} V ${cy + r * 1.3}`} stroke="#FFFFFF" strokeWidth={0.12} opacity={0.9} />
  </g>
);

/** Irregular organic blob (smooth closed curve), deterministic for a given seed */
const blobPath = (cx: number, cy: number, r: number, rot: number, seed: number): string => {
  const n = 7;
  const rand = (k: number) => {
    const x = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const pts = Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2 + (rot * Math.PI) / 180;
    const rr = r * (0.62 + rand(k) * 0.55);
    return [cx + Math.cos(a) * rr * 1.15, cy + Math.sin(a) * rr * 0.85];
  });
  const f = (v: number) => v.toFixed(2);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + ' Z';
};

const LEOPARD_SPOTS: [number, number, number, number][] = [
  [48, 20, 2.6, 10], [61, 22, 2.9, -20], [70, 27, 2.4, 30], [53, 28, 2.7, 45], [44, 32, 2.3, -10],
  [64, 33, 3.0, 15], [56, 38, 2.6, -35], [47, 42, 2.8, 25], [68, 42, 2.5, -15], [59, 47, 2.9, 5],
  [50, 52, 2.6, -30], [66, 53, 2.4, 40], [56, 58, 2.5, 10], [44, 57, 2.2, 0],
];

const CHEETAH_SPOTS: [number, number, number, number, number][] = [
  [48, 37, 1.0, 0.7, 20], [55, 41, 0.8, 0.55, -30], [63, 39, 1.1, 0.7, 10], [69, 44, 0.9, 0.6, 40],
  [46, 46, 0.9, 0.65, -15], [52, 50, 1.1, 0.75, 30], [60, 48, 0.85, 0.6, -10], [66, 52, 1.0, 0.7, 25],
  [49, 56, 0.9, 0.6, 0], [57, 55, 1.05, 0.7, -25], [64, 59, 0.9, 0.6, 15], [44, 52, 0.7, 0.5, 35],
];

/** The design itself, drawn in the nail's local frame (see file header). */
export const NailArtLayer: React.FC<{ design: NailArtId; gloss: number }> = ({ design, gloss }) => {
  const shine = Math.max(0.35, gloss / 100);

  switch (design) {
    case 'french-fuchsia-3d':
      return (
        <g>
          <rect x="30" y="5" width="56" height="65" fill="url(#na-nude)" />
          {/* Fuchsia tip with melted, dripping 3D edge */}
          <path
            filter="url(#na-relief)"
            fill="url(#na-fuchsia)"
            d="M 30 5 H 86 V 27 C 82 27 80 31 77 30 C 74 29 73 25 70 27 C 67 29 68 35 64 35 C 60 35 61 29 58 29 C 55 29 55 33 52 33 C 49 33 50 28 47 28 C 44 28 44 31 41 31 C 38 31 36 27 30 28 Z"
          />
          {/* Wet-look highlights riding the drips */}
          <path
            d="M 44 24 C 50 22 58 22 66 23"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity={0.75 * shine}
            filter="url(#na-soft)"
          />
          <circle cx="63.6" cy="32.6" r="0.6" fill="#FFFFFF" opacity={0.8 * shine} />
          <circle cx="51.6" cy="30.8" r="0.5" fill="#FFFFFF" opacity={0.7 * shine} />
          <Stone cx={57} cy={50} r={0.8} />
        </g>
      );

    case 'tigre-sunset': {
      // Deep V french line: the point dips toward the cuticle at the centre, sides rise toward the tip
      const vEdge = (x: number) => 40 - Math.abs(x - 57) * 0.9;
      const stripes = [-12, -8, -4, 0, 4, 8, 12];
      return (
        <g>
          <rect x="30" y="5" width="56" height="65" fill="url(#na-nude)" />
          <path fill="url(#na-sunset)" d="M 28 5 H 86 V 13.8 L 57 40 L 28 13.8 Z" />
          {/* Tiger stripes: tapered black strokes rising from the V line toward the tip */}
          <g fill="#140306">
            {stripes.map((o) => {
              const x = 57 + o;
              const y = vEdge(x);
              const lean = o * 0.35;
              return (
                <path
                  key={o}
                  d={`M ${x - 0.75} ${y + 0.4} Q ${x + lean - 0.2} ${y - 5.5} ${x + lean * 1.6} ${y - 11} Q ${x + lean + 0.5} ${y - 5.5} ${x + 0.75} ${y + 0.4} Z`}
                />
              );
            })}
            {/* a few short secondary stripes */}
            <path d="M 46 24 Q 48.5 22.6 51.5 23.4 Q 48.5 24.6 46 24 Z" />
            <path d="M 62.5 23.4 Q 65.5 22.6 68 24 Q 65.5 24.6 62.5 23.4 Z" />
            <path d="M 53 19.5 Q 55 18.6 57 19.2 Q 55 20.2 53 19.5 Z" />
          </g>
          {/* Thin glossy line along the V edge */}
          <path d="M 30 15.7 L 57 39.6 L 84 15.7" fill="none" stroke="#FFFFFF" strokeWidth="0.25" opacity={0.6 * shine} />
          <Stone cx={57} cy={52} r={0.75} />
        </g>
      );
    }

    case 'leopard-rouge':
      // Glossy red "tortoise-leopard": soft-edged dark blotches with deep-red halos
      return (
        <g>
          <rect x="30" y="5" width="56" height="65" fill="url(#na-red)" />
          <g filter="url(#na-blotch-halo)" fill="#8A0A12" opacity={0.75}>
            {LEOPARD_SPOTS.map(([cx, cy, r, rot], i) => (
              <path key={i} d={blobPath(cx, cy, r * 1.35, rot, i + 7)} />
            ))}
          </g>
          <g filter="url(#na-blotch)" fill="#1A0204" opacity={0.92}>
            {LEOPARD_SPOTS.map(([cx, cy, r, rot], i) => (
              <path key={i} d={blobPath(cx, cy, r * 1.0, rot, i)} />
            ))}
          </g>
          {/* small satellite specks */}
          <g filter="url(#na-blotch)" fill="#1A0204" opacity={0.8}>
            {LEOPARD_SPOTS.slice(0, 9).map(([cx, cy, r], i) => (
              <circle key={i} cx={cx + r * 1.5} cy={cy - r * 0.9} r={r * 0.28} />
            ))}
          </g>
        </g>
      );

    case 'swirl-rouge':
      return (
        <g>
          <rect x="30" y="5" width="56" height="65" fill="url(#na-milk)" />
          {/* Main red ribbon sweeping from the side wall up across the tip */}
          <path
            d="M 36 50 C 48 46 48 34 57 29 C 63 26 68 27 80 20"
            fill="none"
            stroke="#D3172B"
            strokeWidth="2.6"
            strokeLinecap="round"
            filter="url(#na-relief)"
          />
          {/* Fine echo line */}
          <path
            d="M 60 58 C 63 50 70 46 80 44"
            fill="none"
            stroke="#D3172B"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M 41 47.6 C 48 44 49 35 56 30.8"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.4"
            strokeLinecap="round"
            opacity={0.6 * shine}
          />
        </g>
      );

    case 'guepard-coeur':
      return (
        <g>
          {/* Nude-pink tip, cheetah lower half with a slanted boundary */}
          <rect x="30" y="5" width="56" height="65" fill="url(#na-nude)" />
          <path fill="url(#na-cheetah)" d="M 28 36 C 40 31 70 29 88 33 V 70 H 28 Z" />
          <g fill="#1C1208">
            {CHEETAH_SPOTS.map(([cx, cy, rx, ry, rot], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} />
            ))}
          </g>
          {/* Raised fuchsia 3D heart */}
          <g filter="url(#na-relief)">
            <path
              fill="url(#na-fuchsia)"
              d="M 57 41 C 51 37 47.5 33.5 48 30 C 48.5 26.5 52.5 25.2 55 27.4 C 56 28.3 56.6 29.2 57 30 C 57.4 29.2 58 28.3 59 27.4 C 61.5 25.2 65.5 26.5 66 30 C 66.5 33.5 63 37 57 41 Z"
            />
          </g>
          <path
            d="M 50.5 29.2 C 51.5 27.6 53.6 27.4 54.8 28.6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity={0.8 * shine}
          />
          <Stone cx={53.5} cy={24} r={0.75} />
          <Stone cx={60.5} cy={23.2} r={0.65} />
          <Stone cx={57} cy={44.5} r={0.7} />
        </g>
      );

    default:
      return null;
  }
};
