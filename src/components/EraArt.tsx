import type { ReactNode } from "react";
import type { Era } from "../data/eras";

/**
 * Original per-era vector vignettes, drawn in the era's accent color.
 * These are abstract scenes composed for this fan project — deliberately not
 * reproductions of Games Workshop artwork, which can't be redistributed here.
 */

const INK = "#0B0C0E";
const BONE = "#E8E4D8";

function scene(id: string, c: string): ReactNode {
  switch (id) {
    case "dat":
      // Machine rings orbiting a forge-world core.
      return (
        <>
          <circle cx="290" cy="60" r="16" fill={c} opacity="0.9" />
          <circle cx="290" cy="60" r="16" fill="url(#glow-dat)" />
          {[30, 46, 62].map((r, i) => (
            <circle
              key={r}
              cx="290"
              cy="60"
              r={r}
              fill="none"
              stroke={c}
              strokeOpacity={0.45 - i * 0.12}
              strokeWidth="1"
              strokeDasharray={i === 1 ? "5 7" : undefined}
            />
          ))}
          <circle cx="260" cy="44" r="2.5" fill={BONE} opacity="0.9" />
          <circle cx="322" cy="82" r="2" fill={BONE} opacity="0.7" />
          <circle cx="244" cy="76" r="1.5" fill={c} opacity="0.9" />
          {[40, 80, 120, 160].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={86 - i * 6}
              width="3"
              height={34 + i * 6}
              fill={INK}
              opacity="0.9"
            />
          ))}
          <rect x="0" y="104" width="400" height="16" fill={INK} />
        </>
      );
    case "strife":
      // Warp lightning over a sundered world.
      return (
        <>
          <path d="M0 120 A 210 210 0 0 1 400 120 Z" fill={INK} opacity="0.95" />
          <path d="M150 120 A 160 160 0 0 1 400 96 L 400 120 Z" fill={c} opacity="0.12" />
          {[
            "M80 0 L96 34 L84 36 L108 78",
            "M210 0 L200 28 L214 30 L196 66",
            "M320 0 L338 40 L324 42 L346 88",
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke={c} strokeWidth="1.6" strokeOpacity="0.8" />
          ))}
          <circle cx="108" cy="80" r="2.4" fill={BONE} opacity="0.8" />
          <circle cx="346" cy="90" r="2" fill={BONE} opacity="0.7" />
        </>
      );
    case "crusade":
      // A rising sun and a fleet setting out.
      return (
        <>
          <circle cx="200" cy="118" r="52" fill={c} opacity="0.55" />
          <circle cx="200" cy="118" r="52" fill="url(#glow-crusade)" />
          {[-60, -35, -12, 12, 35, 60].map((a) => (
            <line
              key={a}
              x1="200"
              y1="112"
              x2={200 + 170 * Math.sin((a * Math.PI) / 180)}
              y2={112 - 170 * Math.cos((a * Math.PI) / 180)}
              stroke={c}
              strokeOpacity="0.22"
              strokeWidth="1.4"
            />
          ))}
          {[
            [90, 52, 10],
            [140, 34, 7],
            [286, 44, 8],
          ].map(([x, y, s]) => (
            <path
              key={`${x}`}
              d={`M${x} ${y} l${s * 2} ${s * 0.7} l-${s * 2} ${s * 0.7} Z`}
              fill={INK}
              opacity="0.95"
            />
          ))}
          <rect x="0" y="112" width="400" height="8" fill={INK} />
        </>
      );
    case "heresy":
      // A world cracked in half, embers rising.
      return (
        <>
          <circle
            cx="200"
            cy="70"
            r="44"
            fill={INK}
            stroke={c}
            strokeOpacity="0.7"
            strokeWidth="1.4"
          />
          <circle cx="200" cy="70" r="44" fill={c} opacity="0.12" />
          <path
            d="M178 32 L196 58 L188 62 L206 84 L198 88 L216 108"
            fill="none"
            stroke={c}
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          {[
            [150, 40],
            [246, 34],
            [128, 78],
            [268, 84],
            [176, 12],
            [230, 8],
          ].map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={i % 2 === 0 ? 1.8 : 1.2}
              fill={c}
              opacity="0.8"
            />
          ))}
        </>
      );
    case "scouring":
      // Purging comets sweeping the traitors to the void's edge.
      return (
        <>
          {[
            [30, 30, 250],
            [80, 62, 300],
            [10, 92, 210],
          ].map(([x, y, len]) => (
            <g key={`${x}-${y}`}>
              <line
                x1={x}
                y1={y}
                x2={x + len}
                y2={y - 14}
                stroke={c}
                strokeOpacity="0.5"
                strokeWidth="1.6"
              />
              <circle cx={x + len} cy={y - 14} r="3.4" fill={BONE} opacity="0.9" />
              <circle cx={x + len} cy={y - 14} r="7" fill={c} opacity="0.25" />
            </g>
          ))}
          {[
            [340, 96],
            [368, 78],
            [312, 108],
          ].map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M${x} ${y} l9 3 l-9 3 Z`}
              fill={INK}
              stroke={c}
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
          ))}
        </>
      );
    case "watch":
      // A fortress wall holding the long dark, beacons lit.
      return (
        <>
          <path
            d="M0 120 L0 84 L24 84 L24 74 L36 74 L36 84 L88 84 L88 62 L100 62 L100 54 L112 54 L112 62 L124 62 L124 84 L190 84 L190 70 L206 70 L206 84 L268 84 L268 58 L282 58 L282 50 L294 50 L294 58 L306 58 L306 84 L360 84 L360 74 L374 74 L374 84 L400 84 L400 120 Z"
            fill={INK}
            opacity="0.97"
          />
          {[
            [106, 46],
            [288, 42],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="2.6" fill={c} />
              <circle cx={x} cy={y} r="7" fill={c} opacity="0.3" />
            </g>
          ))}
          <line x1="0" y1="84" x2="400" y2="84" stroke={c} strokeOpacity="0.3" strokeWidth="1" />
        </>
      );
    case "rising":
      // The swarm converging on a quiet world.
      return (
        <>
          <circle
            cx="86"
            cy="64"
            r="18"
            fill={INK}
            stroke={c}
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          <circle cx="86" cy="64" r="18" fill={c} opacity="0.1" />
          {[
            [396, 20],
            [372, 44],
            [388, 70],
            [352, 24],
            [344, 58],
            [366, 92],
            [320, 40],
            [312, 76],
            [292, 56],
            [270, 30],
            [262, 84],
            [238, 60],
          ].map(([x, y], i) => (
            <path
              key={`${x}-${y}`}
              d={`M${x} ${y} l-10 4 l10 4`}
              fill="none"
              stroke={c}
              strokeOpacity={0.85 - i * 0.05}
              strokeWidth="1.6"
            />
          ))}
        </>
      );
    case "indomitus":
      // The galaxy torn in two by the Great Rift.
      return (
        <>
          <ellipse
            cx="200"
            cy="60"
            rx="170"
            ry="34"
            fill="none"
            stroke={BONE}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <ellipse
            cx="200"
            cy="60"
            rx="120"
            ry="22"
            fill="none"
            stroke={BONE}
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <ellipse cx="200" cy="60" rx="60" ry="11" fill={c} opacity="0.25" />
          <path
            d="M30 34 L92 52 L82 60 L160 70 L150 80 L236 84 L228 94 L330 100"
            fill="none"
            stroke="#8B1E2B"
            strokeWidth="2.4"
            strokeOpacity="0.9"
          />
          <path
            d="M30 34 L92 52 L82 60 L160 70 L150 80 L236 84 L228 94 L330 100"
            fill="none"
            stroke="#8B1E2B"
            strokeWidth="7"
            strokeOpacity="0.22"
          />
          {[
            [120, 40],
            [260, 44],
            [180, 96],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={BONE} opacity="0.8" />
          ))}
        </>
      );
    default:
      return null;
  }
}

export default function EraArt({ era }: { era: Era }) {
  const c = era.accentColor;
  return (
    <div
      className="w-full overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${c}12, transparent)` }}
    >
      <svg
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid slice"
        className="block w-full h-24 sm:h-32"
        role="img"
        aria-label={`Stylized emblem scene for ${era.label}`}
      >
        <defs>
          <radialGradient id="glow-dat">
            <stop offset="0%" stopColor="#3E8E7E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3E8E7E" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-crusade">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </radialGradient>
        </defs>
        {scene(era.id, c)}
      </svg>
    </div>
  );
}
