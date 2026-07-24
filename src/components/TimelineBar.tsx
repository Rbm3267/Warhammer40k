import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Era } from "../data/eras";
import EraArt from "./EraArt";
import GlossaryText from "./GlossaryText";

interface TimelineBarProps {
  eras: Era[];
  eraIdx: number;
  onSelectEra: (index: number) => void;
}

const SOFT_MASK = {
  maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
  WebkitMaskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
} as const;

export default function TimelineBar({ eras, eraIdx, onSelectEra }: TimelineBarProps) {
  const era = eras[eraIdx];

  return (
    <>
      {/* Era spotlight — borderless, art fades into the page */}
      <section className="px-6 pt-6 pb-2 text-center">
        <div key={era.id} className="animate-fade-slide-in max-w-3xl mx-auto">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-6 h-40 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${era.accentColor}1c, transparent 70%)`,
              }}
            />
            <div style={SOFT_MASK}>
              <EraArt era={era} />
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-2 mt-2 mb-1 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: era.accentColor }}
          >
            <span className="block h-1.5 w-1.5 rotate-45" style={{ background: era.accentColor }} />
            {era.range}
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-4 mb-2">
            <button
              aria-label="Previous era"
              disabled={eraIdx === 0}
              onClick={() => onSelectEra(eraIdx - 1)}
              className="p-2.5 rounded-full transition-opacity disabled:opacity-20 hover:opacity-100 opacity-60"
              style={{ color: "#B5B0A8" }}
            >
              <ChevronLeft size={22} />
            </button>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {era.label}
            </h2>
            <button
              aria-label="Next era"
              disabled={eraIdx === eras.length - 1}
              onClick={() => onSelectEra(eraIdx + 1)}
              className="p-2.5 rounded-full transition-opacity disabled:opacity-20 hover:opacity-100 opacity-60"
              style={{ color: "#B5B0A8" }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <p
            className="max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
            style={{ color: "#B5B0A8" }}
          >
            <GlossaryText text={era.blurb} />
          </p>
        </div>
      </section>

      {/* Bottom chronology rail — gradient fade, nodes on a continuous line */}
      <nav
        aria-label="Timeline of eras"
        className="fixed bottom-0 left-0 right-0 z-30 pt-8 pb-1"
        style={{ background: "linear-gradient(180deg, transparent, rgba(5,6,10,0.94) 45%)" }}
      >
        <div className="overflow-x-auto snap-x snap-mandatory">
          <div className="relative mx-auto flex w-max items-stretch px-6">
            <span
              aria-hidden="true"
              className="absolute left-10 right-10 bottom-[13px] h-px"
              style={{ background: "#2A2D33" }}
            />
            {eras.map((e, i) => {
              const isActive = i === eraIdx;
              return (
                <button
                  key={e.id}
                  onClick={() => onSelectEra(i)}
                  aria-current={isActive ? "true" : undefined}
                  className="relative flex flex-col items-center px-2.5 sm:px-3.5 pt-1 pb-2 snap-center"
                >
                  <span
                    className="text-[9px] sm:text-[10px] uppercase tracking-wide whitespace-nowrap mb-2 transition-colors"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: isActive ? e.accentColor : "#6B6E74",
                    }}
                  >
                    {e.label}
                  </span>
                  <span className="flex h-3 items-center">
                    {isActive ? (
                      <span
                        className="block h-2 w-2 rotate-45"
                        style={{ background: e.accentColor, boxShadow: `0 0 8px ${e.accentColor}` }}
                      />
                    ) : (
                      <span
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ background: "#3A3D42" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
