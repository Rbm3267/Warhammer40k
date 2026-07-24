import { useEffect, useState } from "react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { OrnateDivider } from "./GothicOrnaments";

interface SpaceIntroProps {
  onEnter: () => void;
}

export default function SpaceIntro({ onEnter }: SpaceIntroProps) {
  const [leaving, setLeaving] = useState(false);

  useBodyScrollLock(true);

  useEffect(() => {
    const handleKeyDown = () => handleEnter();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEnter() {
    setLeaving(true);
    window.setTimeout(onEnter, 700);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer transition-all duration-700"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.06)" : "scale(1)",
        background:
          "radial-gradient(circle at 50% 45%, rgba(5,6,10,0.25) 0%, rgba(5,6,10,0.75) 100%)",
      }}
      onClick={handleEnter}
    >
      <div className="relative px-6 text-center max-w-2xl">
        <div
          className="text-[10px] tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B6E74" }}
        >
          ++ Accessing sanctioned archive · clearance granted ++
        </div>
        <div
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8A8579" }}
        >
          Somewhere in the 42nd Millennium
        </div>
        <h1
          className="text-3xl sm:text-5xl font-black tracking-wide mb-4"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#D8D2C4",
            textShadow: "0 0 32px rgba(201, 162, 39, 0.25)",
          }}
        >
          Compendium of the Dark Millennia
        </h1>
        <OrnateDivider className="mb-4 max-w-sm mx-auto" />
        <p
          className="mx-auto mb-10 max-w-lg text-sm sm:text-base"
          style={{ color: "#9B9690", fontFamily: "'Crimson Pro', serif" }}
        >
          Ten thousand years of war, faith, and fire, compiled from fragmentary archive records.
        </p>
        <button
          type="button"
          onClick={handleEnter}
          className="px-6 py-3 rounded-sm border text-sm tracking-[0.2em] uppercase"
          style={{
            borderColor: "#C9A227",
            color: "#C9A227",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Enter the Archive
        </button>
        <div
          className="mt-6 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4A4D52" }}
        >
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}
