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
      <div className="px-6 py-6">
        <div
          key={era.id}
          className="animate-fade-slide-in max-w-2xl rounded-sm border p-4 sm:p-5 backdrop-blur-sm"
          style={{ borderColor: `${era.accentColor}55`, background: `${era.accentColor}0d` }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="block h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ background: era.accentColor }}
            />
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: era.accentColor }}
            >
              {era.range}
            </span>
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
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t px-4 sm:px-6 py-2"
        style={{ background: "#0B0C0Ecc", backdropFilter: "blur(6px)", borderColor: "#2A2D33" }}
      >
        <div className="flex items-center gap-0.5 sm:gap-2 overflow-x-auto snap-x snap-mandatory">
          {eras.map((e, i) => (
            <button
              key={e.id}
              onClick={() => onSelectEra(i)}
              className="flex flex-col items-center flex-shrink-0 px-2 sm:px-2 py-3 sm:py-2 snap-center"
            >
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-wide whitespace-nowrap mb-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: i === eraIdx ? e.accentColor : "#6B6E74",
                }}
              >
                {e.label}
              </span>
              <span
                className="block h-1 rounded-full transition-all"
                style={{
                  width: i === eraIdx ? "36px" : "16px",
                  background: i === eraIdx ? e.accentColor : "#3A3D42",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
