/**
 * Fixed, non-interactive film layer over the page content: faint CRT scanlines
 * plus a corner vignette, to make the whole site read as a salvaged archive
 * terminal rather than a flat web page. Sits below the timeline bar and all
 * modals so interactive chrome stays crisp.
 */
export default function GrimdarkOverlay() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-20 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
          opacity: 0.35,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.42) 100%)",
        }}
      />
    </div>
  );
}
