import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ChevronRight } from "lucide-react";
import type { Faction } from "../data/factions";
import { GothicCorners } from "./GothicOrnaments";

interface FactionGridProps {
  factions: Faction[];
  activeEraId: string;
  onSelectFaction: (id: string) => void;
}

const MAX_TILT_DEG = 9;

function FactionCard({
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
      className="relative text-left p-3 sm:p-4 rounded-sm border"
      style={{
        borderColor: active ? faction.color : "#2A2D33",
        background: active ? `${faction.color}14` : "#111214cc",
        opacity: active ? 1 : 0.45,
        transform: `perspective(700px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.hovering ? 1.02 : 1}, ${tilt.hovering ? 1.02 : 1}, 1)`,
        transition: tilt.hovering
          ? "transform 60ms linear"
          : "transform 300ms ease, opacity 300ms ease",
        boxShadow: tilt.hovering ? "0 20px 40px -20px rgba(0,0,0,0.7)" : "none",
        willChange: "transform",
      }}
    >
      {active && <GothicCorners color={faction.color} size={10} />}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-base sm:text-lg font-bold mb-3 ${
          active ? "animate-pulse-glow" : ""
        }`}
        style={{
          border: `1.5px solid ${faction.color}`,
          color: faction.color,
          fontFamily: "'Cinzel', serif",
          background: `radial-gradient(circle, ${faction.color}22 0%, transparent 70%)`,
          ...pulseStyle,
        }}
      >
        {faction.sigil}
      </div>
      <div
        className="font-bold text-sm sm:text-base"
        style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
      >
        {faction.name}
      </div>
      <div
        className="text-[10px] sm:text-xs mt-1 flex items-center gap-1"
        style={{
          color: active ? faction.color : "#6B6E74",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {active ? "active this era" : "dormant this era"}
        <ChevronRight size={12} />
      </div>
    </button>
  );
}

export default function FactionGrid({ factions, activeEraId, onSelectFaction }: FactionGridProps) {
  return (
    <div className="px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
      {factions.map((f) => {
        const active = f.events.some((e) => e.era === activeEraId);
        return (
          <FactionCard
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
