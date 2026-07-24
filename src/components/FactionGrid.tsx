import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import type { Faction } from "../data/factions";

interface FactionGridProps {
  factions: Faction[];
  activeEraId: string;
  onSelectFaction: (id: string) => void;
}

const MAX_TILT_DEG = 6;

function FactionSeal({
  faction,
  active,
  onSelect,
}: {
  faction: Faction;
  active: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, hovering: false });

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      rotateY: (px - 0.5) * MAX_TILT_DEG * 2,
      rotateX: (0.5 - py) * MAX_TILT_DEG * 2,
      hovering: true,
    });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0, hovering: false });

  const pulseStyle = active
    ? ({
        "--pulse-color": `${faction.color}59`,
        "--pulse-color-inset": `${faction.color}40`,
      } as CSSProperties)
    : undefined;

  return (
    <button
      ref={ref}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col items-center px-1 py-3 text-center"
      style={{
        opacity: active ? 1 : 0.4,
        transform: `perspective(700px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: tilt.hovering
          ? "transform 60ms linear"
          : "transform 300ms ease, opacity 300ms ease",
        willChange: "transform",
      }}
    >
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mb-3 transition-transform duration-300 group-hover:scale-110 ${
          active ? "animate-pulse-glow" : ""
        }`}
        style={{
          border: `1.5px solid ${active ? faction.color : "#3A3D42"}`,
          color: active ? faction.color : "#6B6E74",
          fontFamily: "'Cinzel', serif",
          background: `radial-gradient(circle, ${faction.color}1e 0%, transparent 72%)`,
          ...pulseStyle,
        }}
      >
        {faction.sigil}
      </div>
      <div
        className="font-bold text-sm sm:text-base leading-tight"
        style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
      >
        {faction.name}
      </div>
      <div
        className="text-[9px] sm:text-[10px] mt-1"
        style={{
          color: active ? faction.color : "#6B6E74",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {active ? "active this era" : "dormant this era"}
      </div>
    </button>
  );
}

export default function FactionGrid({ factions, activeEraId, onSelectFaction }: FactionGridProps) {
  return (
    <div className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-2 gap-y-5 mt-2 max-w-6xl mx-auto">
      {factions.map((f) => {
        const active = f.events.some((e) => e.era === activeEraId);
        return (
          <FactionSeal
            key={f.id}
            faction={f}
            active={active}
            onSelect={() => onSelectFaction(f.id)}
          />
        );
      })}
    </div>
  );
}
