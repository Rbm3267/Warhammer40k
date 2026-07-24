interface GothicCornersProps {
  color?: string;
  size?: number;
}

/** Four L-shaped corner brackets, absolutely positioned inside a `relative` parent. */
export function GothicCorners({ color = "#C9A227", size = 12 }: GothicCornersProps) {
  const base = {
    width: size,
    height: size,
    borderColor: color,
    opacity: 0.7,
  } as const;
  return (
    <span aria-hidden="true" className="pointer-events-none">
      <span className="absolute top-0 left-0 border-t border-l" style={base} />
      <span className="absolute top-0 right-0 border-t border-r" style={base} />
      <span className="absolute bottom-0 left-0 border-b border-l" style={base} />
      <span className="absolute bottom-0 right-0 border-b border-r" style={base} />
    </span>
  );
}

interface OrnateDividerProps {
  color?: string;
  className?: string;
}

/** A thin horizontal rule with a centered diamond — gothic section divider. */
export function OrnateDivider({ color = "#C9A227", className = "" }: OrnateDividerProps) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}66)` }}
      />
      <span className="block h-1.5 w-1.5 rotate-45" style={{ background: color, opacity: 0.8 }} />
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, ${color}66, transparent)` }}
      />
    </div>
  );
}
