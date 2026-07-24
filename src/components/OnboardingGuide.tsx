import { ChevronLeft, ChevronRight, Compass, X } from "lucide-react";
import type { Era } from "../data/eras";
import type { Faction } from "../data/factions";
import type { OnboardingStep } from "../data/onboarding";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { GothicCorners } from "./GothicOrnaments";

interface OnboardingGuideProps {
  steps: OnboardingStep[];
  eras: Era[];
  factions: Faction[];
  stepIndex: number;
  onGoToStep: (index: number) => void;
  onClose: () => void;
}

export default function OnboardingGuide({
  steps,
  eras,
  factions,
  stepIndex,
  onGoToStep,
  onClose,
}: OnboardingGuideProps) {
  useBodyScrollLock(true);

  const step = steps[stepIndex];
  const era = eras.find((e) => e.id === step.eraId);
  const faction = step.factionId ? factions.find((f) => f.id === step.factionId) : undefined;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md rounded-sm border p-6"
        style={{
          background: "#0F1012",
          borderColor: "#C9A22799",
          boxShadow: "0 0 60px -12px #C9A22755",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <GothicCorners />
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2" style={{ color: "#C9A227" }}>
            <Compass size={16} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Newcomer's Path
            </span>
          </div>
          <button onClick={onClose} style={{ color: "#6B6E74" }} aria-label="Close guide">
            <X size={18} />
          </button>
        </div>

        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
        >
          Step {stepIndex + 1} of {steps.length}
          {era && <span style={{ color: "#6B6E74" }}> · {era.label}</span>}
        </h3>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#B5B0A8", fontFamily: "'Crimson Pro', serif" }}
        >
          {step.instruction}
        </p>

        {faction && (
          <div
            className="mb-6 text-xs pb-4 border-b"
            style={{
              borderColor: "#2A2D33",
              color: "#6B6E74",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Opening: <span style={{ color: faction.color }}>{faction.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: i === stepIndex ? "#C9A227" : "#3A3D42" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onGoToStep(stepIndex - 1)}
              disabled={isFirst}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-sm border disabled:opacity-30"
              style={{
                borderColor: "#2A2D33",
                color: "#B5B0A8",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <ChevronLeft size={12} /> Back
            </button>
            <button
              onClick={() => (isLast ? onClose() : onGoToStep(stepIndex + 1))}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-sm border"
              style={{
                borderColor: "#C9A227",
                color: "#C9A227",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {isLast ? "Done" : "Take me there"} <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
