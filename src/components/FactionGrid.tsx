import { ChevronRight } from "lucide-react";
import type { Faction } from "../data/factions";

interface FactionGridProps {
  factions: Faction[];
  activeEraId: string;
  onSelectFaction: (id: string) => void;
}

export default function FactionGrid({ factions, activeEraId, onSelectFaction }: FactionGridProps) {
  return (
    <div className="px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {factions.map((f) => {
        const active = f.events.some((e) => e.era === activeEraId);
        return (
          <button
            key={f.id}
            onClick={() => onSelectFaction(f.id)}
            className="text-left p-4 rounded-sm border transition-all duration-300"
            style={{
              borderColor: active ? f.color : "#2A2D33",
              background: active ? `${f.color}14` : "#111214",
              opacity: active ? 1 : 0.45,
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold mb-3"
              style={{
                border: `1px solid ${f.color}`,
                color: f.color,
                fontFamily: "'Cinzel', serif",
              }}
            >
              {f.sigil}
            </div>
            <div
              className="font-bold text-sm sm:text-base"
              style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
            >
              {f.name}
            </div>
            <div
              className="text-xs mt-1 flex items-center gap-1"
              style={{
                color: active ? f.color : "#6B6E74",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {active ? "active this era" : "dormant this era"}
              <ChevronRight size={12} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
