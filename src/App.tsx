import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { ERAS } from "./data/eras";
import { FACTIONS } from "./data/factions";
import { ONBOARDING_STEPS } from "./data/onboarding";
import { THOUGHTS } from "./data/thoughts";
import TimelineBar from "./components/TimelineBar";
import FactionGrid from "./components/FactionGrid";
import FactionDetailModal from "./components/FactionDetailModal";
import OnboardingGuide from "./components/OnboardingGuide";
import SpaceIntro from "./components/SpaceIntro";
import SpaceBackground from "./components/SpaceBackground";
import GrimdarkOverlay from "./components/GrimdarkOverlay";
import { OrnateDivider } from "./components/GothicOrnaments";

const ONBOARDING_STORAGE_KEY = "grimdark-compendium:onboarding-seen";
const THOUGHT_INTERVAL_MS = 9000;

function eraIndexFor(eraId: string): number {
  const idx = ERAS.findIndex((e) => e.id === eraId);
  return idx !== -1 ? idx : ERAS.length - 1;
}

export default function App() {
  const [hasSeenOnboarding] = useState(() => Boolean(localStorage.getItem(ONBOARDING_STORAGE_KEY)));
  const [eraIdx, setEraIdx] = useState(() =>
    hasSeenOnboarding ? ERAS.length - 1 : eraIndexFor(ONBOARDING_STEPS[0].eraId),
  );
  const [selected, setSelected] = useState<string | null>(() =>
    hasSeenOnboarding ? null : ONBOARDING_STEPS[0].factionId,
  );
  const [onboardingOpen, setOnboardingOpen] = useState(() => !hasSeenOnboarding);
  const [onboardingStepIdx, setOnboardingStepIdx] = useState(0);
  const [entered, setEntered] = useState(false);
  const [thoughtIdx, setThoughtIdx] = useState(() => Math.floor(Math.random() * THOUGHTS.length));
  const era = ERAS[eraIdx];

  useEffect(() => {
    const id = window.setInterval(
      () => setThoughtIdx((i) => (i + 1) % THOUGHTS.length),
      THOUGHT_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const factionsSorted = useMemo(() => {
    return [...FACTIONS].sort((a, b) => {
      const aActive = a.events.some((e) => e.era === era.id) ? 1 : 0;
      const bActive = b.events.some((e) => e.era === era.id) ? 1 : 0;
      return bActive - aActive;
    });
  }, [era]);

  const selectedFaction = FACTIONS.find((f) => f.id === selected);
  const tint = selectedFaction ? selectedFaction.color : era.accentColor;

  const goToOnboardingStep = (index: number) => {
    if (index < 0 || index >= ONBOARDING_STEPS.length) return;
    const step = ONBOARDING_STEPS[index];
    setOnboardingStepIdx(index);
    setEraIdx(eraIndexFor(step.eraId));
    setSelected(step.factionId);
  };

  const startOnboarding = () => {
    goToOnboardingStep(0);
    setOnboardingOpen(true);
  };

  const closeOnboarding = () => {
    setOnboardingOpen(false);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "1");
  };

  return (
    <div
      className="min-h-screen w-full pb-28"
      style={{ color: "#D8D2C4", fontFamily: "'Crimson Pro', serif" }}
    >
      <SpaceBackground tint={tint} />
      <GrimdarkOverlay />

      {/* Everything except the starfield stays hidden until the intro is dismissed —
          the intro overlay is translucent, so live content behind it bleeds through. */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: entered ? 1 : 0, visibility: entered ? "visible" : "hidden" }}
      >
        <header className="px-6 pt-8 pb-6 border-b" style={{ borderColor: "#2A2D33" }}>
          <div
            className="text-[10px] tracking-[0.25em] uppercase mb-4 text-center"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8A8579" }}
          >
            ++ Thought for the day: {THOUGHTS[thoughtIdx]} ++
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6E74" }}
              >
                Compiled from fragmentary archive records
              </div>
              <h1
                className="text-3xl sm:text-5xl font-black tracking-wide"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#D8D2C4",
                  textShadow: "0 0 28px rgba(201, 162, 39, 0.2)",
                }}
              >
                Compendium of the Dark Millennia
              </h1>
              <OrnateDivider className="my-3 max-w-md" />
              <p className="max-w-2xl text-sm sm:text-base" style={{ color: "#9B9690" }}>
                Twelve powers, ten thousand years, one galaxy that never once stopped burning. Move
                the timeline below to see who was rising, falling, or already extinct in any given
                age.
              </p>
            </div>
            <button
              onClick={startOnboarding}
              className="flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-auto text-xs px-3 py-2.5 sm:py-2 rounded-sm border whitespace-nowrap"
              style={{
                borderColor: "#C9A227",
                color: "#C9A227",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Compass size={14} />
              Start Here
            </button>
          </div>
        </header>

        <TimelineBar eras={ERAS} eraIdx={eraIdx} onSelectEra={setEraIdx} />

        <FactionGrid factions={factionsSorted} activeEraId={era.id} onSelectFaction={setSelected} />

        <footer className="px-6 mt-10 text-center">
          <OrnateDivider color="#4A4D52" className="max-w-xs mx-auto mb-3" />
          <p
            className="text-[10px] sm:text-[11px]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4A4D52" }}
          >
            Unofficial, non-commercial fan project. Warhammer 40,000 and all related names,
            characters, and settings are the property of Games Workshop.
          </p>
        </footer>

        {selectedFaction && (
          <FactionDetailModal
            faction={selectedFaction}
            eras={ERAS}
            activeEraId={era.id}
            onClose={() => setSelected(null)}
          />
        )}

        {onboardingOpen && (
          <OnboardingGuide
            steps={ONBOARDING_STEPS}
            eras={ERAS}
            factions={FACTIONS}
            stepIndex={onboardingStepIdx}
            onGoToStep={goToOnboardingStep}
            onClose={closeOnboarding}
          />
        )}
      </div>

      {!entered && <SpaceIntro onEnter={() => setEntered(true)} />}
    </div>
  );
}
