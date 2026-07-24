import { X } from "lucide-react";
import type { Era } from "../data/eras";
import type { Faction } from "../data/factions";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import GlossaryText from "./GlossaryText";
import { GothicCorners } from "./GothicOrnaments";

interface FactionDetailModalProps {
  faction: Faction;
  eras: Era[];
  activeEraId: string;
  onClose: () => void;
}

export default function FactionDetailModal({
  faction,
  eras,
  activeEraId,
  onClose,
}: FactionDetailModalProps) {
  useBodyScrollLock(true);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-xl max-h-[80vh] overflow-y-auto rounded-sm border p-6"
        style={{ background: "#0F1012", borderColor: faction.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <GothicCorners color={faction.color} />
        <div
          className="text-[9px] tracking-[0.3em] uppercase text-center mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4A4D52" }}
        >
          ++ Archive record retrieved ++
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center rounded-full text-base font-bold"
              style={{
                border: `1px solid ${faction.color}`,
                color: faction.color,
                fontFamily: "'Cinzel', serif",
              }}
            >
              {faction.sigil}
            </div>
            <h3 className="text-xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
              {faction.name}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: "#6B6E74" }} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#B5B0A8" }}>
          <GlossaryText text={faction.blurb} />
        </p>
        <div
          className="text-xs tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6E74" }}
        >
          Timeline
        </div>
        <div className="space-y-4 border-l pl-4" style={{ borderColor: "#2A2D33" }}>
          {eras
            .filter((e) => faction.events.some((ev) => ev.era === e.id))
            .map((e) => {
              const ev = faction.events.find((x) => x.era === e.id);
              if (!ev) return null;
              const isCurrent = e.id === activeEraId;
              return (
                <div key={e.id} className="relative">
                  <div
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: isCurrent ? faction.color : "#3A3D42" }}
                  />
                  <div
                    className="text-xs mb-1"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isCurrent ? faction.color : "#6B6E74",
                    }}
                  >
                    {e.label} · {e.range}
                  </div>
                  <div className="text-sm" style={{ color: "#C9C4BC" }}>
                    <GlossaryText text={ev.text} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
