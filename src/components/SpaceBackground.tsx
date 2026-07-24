import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  /** 0 (far) – 1 (near); scales both parallax displacement and twinkle. */
  depth: number;
}

const STAR_COLORS = ["#F5F2E8", "#F5F2E8", "#F5F2E8", "#F5F2E8", "#C9A227", "#8FB4D9"];
const PARALLAX_PX = 34;
const PARALLAX_EASE = 0.06;

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
    depth: Math.random() * 0.8 + 0.2,
  }));
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const targetMouse = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      stars = generateStars(width, height, 2600);
    }

    function handlePointerMove(event: PointerEvent) {
      targetMouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    function drawGalacticBand(parallaxX: number, parallaxY: number) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(width / 2 + parallaxX * 0.15, height / 2 + parallaxY * 0.15);
      ctx.rotate(-0.35);
      const band = ctx.createLinearGradient(0, -height * 0.18, 0, height * 0.18);
      band.addColorStop(0, "rgba(180, 170, 210, 0)");
      band.addColorStop(0.5, "rgba(180, 170, 210, 0.07)");
      band.addColorStop(1, "rgba(180, 170, 210, 0)");
      ctx.fillStyle = band;
      ctx.fillRect(-width, -height * 0.18, width * 2, height * 0.36);
      ctx.restore();
    }

    function drawNebulae(parallaxX: number, parallaxY: number) {
      if (!ctx) return;
      const glows = [
        { x: width * 0.22, y: height * 0.28, r: width * 0.5, color: "rgba(107, 45, 139, 0.12)" },
        { x: width * 0.78, y: height * 0.68, r: width * 0.45, color: "rgba(62, 111, 168, 0.09)" },
        { x: width * 0.5, y: height * 0.9, r: width * 0.4, color: "rgba(201, 162, 39, 0.05)" },
      ];
      for (const glow of glows) {
        const x = glow.x + parallaxX * 0.3;
        const y = glow.y + parallaxY * 0.3;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glow.r);
        gradient.addColorStop(0, glow.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function render() {
      if (!ctx) return;

      if (!prefersReducedMotion) {
        mouse.x += (targetMouse.x - mouse.x) * PARALLAX_EASE;
        mouse.y += (targetMouse.y - mouse.y) * PARALLAX_EASE;
      }
      const parallaxX = mouse.x * PARALLAX_PX * dpr;
      const parallaxY = mouse.y * PARALLAX_PX * dpr;

      ctx.fillStyle = "#05060A";
      ctx.fillRect(0, 0, width, height);
      drawGalacticBand(parallaxX, parallaxY);
      drawNebulae(parallaxX, parallaxY);

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.35;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.baseAlpha + twinkle));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX * star.depth,
          star.y + parallaxY * star.depth,
          star.radius * dpr,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame += 1;
      animationFrame = requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full" aria-hidden="true" />
  );
}
