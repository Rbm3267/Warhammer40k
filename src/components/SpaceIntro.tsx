import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

const STAR_COLORS = ["#F5F2E8", "#F5F2E8", "#F5F2E8", "#F5F2E8", "#C9A227", "#8FB4D9"];

function generateStars(width: number, height: number, density: number): Star[] {
  const count = Math.floor((width * height) / density);
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.2,
    baseAlpha: Math.random() * 0.5 + 0.35,
    twinkleSpeed: Math.random() * 0.02 + 0.006,
    twinklePhase: Math.random() * Math.PI * 2,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }));
}

interface SpaceIntroProps {
  onEnter: () => void;
}

export default function SpaceIntro({ onEnter }: SpaceIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let animationFrame = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      stars = generateStars(width, height, 2200);
    }

    function drawGalacticBand() {
      if (!ctx) return;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-0.35);
      const band = ctx.createLinearGradient(0, -height * 0.18, 0, height * 0.18);
      band.addColorStop(0, "rgba(180, 170, 210, 0)");
      band.addColorStop(0.5, "rgba(180, 170, 210, 0.07)");
      band.addColorStop(1, "rgba(180, 170, 210, 0)");
      ctx.fillStyle = band;
      ctx.fillRect(-width, -height * 0.18, width * 2, height * 0.36);
      ctx.restore();
    }

    function drawNebulae() {
      if (!ctx) return;
      const glows = [
        { x: width * 0.22, y: height * 0.28, r: width * 0.5, color: "rgba(107, 45, 139, 0.12)" },
        { x: width * 0.78, y: height * 0.68, r: width * 0.45, color: "rgba(62, 111, 168, 0.09)" },
        { x: width * 0.5, y: height * 0.9, r: width * 0.4, color: "rgba(201, 162, 39, 0.05)" },
      ];
      for (const glow of glows) {
        const gradient = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.r);
        gradient.addColorStop(0, glow.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function render() {
      if (!ctx) return;
      ctx.fillStyle = "#05060A";
      ctx.fillRect(0, 0, width, height);
      drawGalacticBand();
      drawNebulae();

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.35;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame += 1;
      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

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
      style={{ opacity: leaving ? 0 : 1, transform: leaving ? "scale(1.06)" : "scale(1)" }}
      onClick={handleEnter}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative px-6 text-center">
        <div
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8A8579" }}
        >
          Somewhere in the 42nd Millennium
        </div>
        <h1
          className="text-3xl sm:text-5xl font-black tracking-wide mb-4"
          style={{ fontFamily: "'Cinzel', serif", color: "#D8D2C4" }}
        >
          Compendium of the Dark Millennia
        </h1>
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
