import { useEffect } from "react";

interface SavedBodyStyle {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
}

let lockCount = 0;
let savedScrollY = 0;
let savedStyle: SavedBodyStyle | null = null;

function lockBodyScroll() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const { body } = document;
    savedStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && savedStyle) {
    const { body } = document;
    body.style.position = savedStyle.position;
    body.style.top = savedStyle.top;
    body.style.left = savedStyle.left;
    body.style.right = savedStyle.right;
    body.style.width = savedStyle.width;
    body.style.overflow = savedStyle.overflow;
    savedStyle = null;
    window.scrollTo(0, savedScrollY);
  }
}

/**
 * Locks background scroll while `active` is true, using the iOS-safe
 * `position: fixed` body trick — plain `overflow: hidden` alone doesn't
 * reliably stop scroll on iOS Safari, and letting the page scroll behind a
 * fullscreen overlay is what causes fixed-position overlays to visibly
 * detach and drift on that browser.
 *
 * Reference-counted at module scope so multiple overlays can be stacked
 * (e.g. the onboarding guide opening a faction detail on top of it)
 * without one's unmount prematurely unlocking scroll for the other, and so
 * it stays correct under React StrictMode's mount/cleanup/remount dance.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [active]);
}
