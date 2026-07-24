import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GlossaryTermData } from "../data/glossary";

interface GlossaryTermSpanProps {
  data: GlossaryTermData;
  children: ReactNode;
}

export default function GlossaryTermSpan({ data, children }: GlossaryTermSpanProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        className="appearance-none bg-transparent m-0 p-0 border-0 border-b align-baseline cursor-help text-inherit font-inherit"
        style={{
          borderBottomStyle: "dotted",
          borderBottomWidth: "1px",
          borderBottomColor: "#8A8579",
        }}
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 sm:w-56 max-w-[80vw] rounded-sm border p-3 text-left shadow-lg pointer-events-none"
          style={{ background: "#0F1012", borderColor: "#C9A227" }}
        >
          <span
            className="block text-[10px] tracking-[0.2em] uppercase mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A227" }}
          >
            {data.term}
          </span>
          <span
            className="block text-xs leading-relaxed"
            style={{ fontFamily: "'Crimson Pro', serif", color: "#B5B0A8" }}
          >
            {data.definition}
          </span>
        </span>
      )}
    </span>
  );
}
