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

  // Arrow keys scrub the timeline once the visitor is in and no overlay is up.
  useEffect(() => {
    if (!entered) return;
    const onKey = (event: KeyboardEvent) => {
      if (selected || onboardingOpen) return;
      if (event.key === "ArrowLeft") setEraIdx((i) => Math.max(0, i - 1));
      if (event.key === "ArrowRight") setEraIdx((i) => Math.min(ERAS.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, selected, onboardingOpen]);

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
        <header className="px-6 pt-7 pb-4 text-center">
          <div
            className="text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8A8579" }}
          >
            ++ Thought for the day: {THOUGHTS[thoughtIdx]} ++
          </div>
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
          <OrnateDivider className="my-3 max-w-md mx-auto" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "#9B9690" }}>
            Twelve powers, ten thousand years, one galaxy that never once stopped burning. Move the
            timeline below to see who was rising, falling, or already extinct in any given age.
          </p>
          <button
            onClick={startOnboarding}
            className="inline-flex items-center gap-2 mt-5 text-xs px-5 py-2.5 rounded-full border transition-colors hover:bg-[#C9A22715]"
            style={{
              borderColor: "#C9A227",
              color: "#C9A227",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Compass size={14} />
            New to the setting? Start here
          </button>
        </header>

        <TimelineBar eras={ERAS} eraIdx={eraIdx} onSelectEra={setEraIdx} />

        <section className="mt-8 text-center px-6">
          <OrnateDivider color="#4A4D52" className="max-w-xs mx-auto mb-3" />
          <h3
            className="text-lg sm:text-xl font-bold tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
          >
            The Twelve Powers
          </h3>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mt-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6E74" }}
          >
            Select a power to open its archive record
          </p>
        </section>

        <FactionGrid factions={factionsSorted} activeEraId={era.id} onSelectFaction={setSelected} />

        <footer className="px-6 mt-12 text-center">
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
