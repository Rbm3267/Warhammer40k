import type { Era } from "../data/eras";
import GlossaryText from "./GlossaryText";

interface TimelineBarProps {
  eras: Era[];
  eraIdx: number;
  onSelectEra: (index: number) => void;
}

export default function TimelineBar({ eras, eraIdx, onSelectEra }: TimelineBarProps) {
  const era = eras[eraIdx];

  return (
    <>
      <div className="px-6 py-6 max-w-3xl">
        <div
          className="text-xs tracking-[0.2em] uppercase mb-1"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: era.id === "indomitus" ? "#C9A227" : "#6B6E74",
          }}
        >
          {era.range}
        </div>
        <h2
          className="text-xl sm:text-2xl font-bold mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {era.label}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#B5B0A8" }}>
          <GlossaryText text={era.blurb} />
        </p>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 border-t px-4 sm:px-6 py-3"
        style={{ background: "#0B0C0Ecc", backdropFilter: "blur(6px)", borderColor: "#2A2D33" }}
      >
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {eras.map((e, i) => (
            <button
              key={e.id}
              onClick={() => onSelectEra(i)}
              className="flex flex-col items-center flex-shrink-0 px-1.5 sm:px-2 py-1"
            >
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-wide whitespace-nowrap mb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: i === eraIdx ? "#C9A227" : "#6B6E74",
                }}
              >
                {e.label}
              </span>
              <span
                className="block h-1 rounded-full transition-all"
                style={{
                  width: i === eraIdx ? "36px" : "16px",
                  background: i === eraIdx ? "#C9A227" : "#3A3D42",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
