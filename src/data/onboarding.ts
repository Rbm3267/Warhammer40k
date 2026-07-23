export interface OnboardingStep {
  id: string;
  eraId: string;
  factionId: string | null;
  instruction: string;
}

/**
 * A suggested click order for brand-new visitors. Edit freely — each step just
 * names an era to jump to and, optionally, a faction to open there.
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "step-1",
    eraId: "dat",
    factionId: null,
    instruction:
      "Start at the Dark Age of Technology, on the far left of the timeline — humanity's forgotten golden age, before any of this began.",
  },
  {
    id: "step-2",
    eraId: "crusade",
    factionId: "imperium",
    instruction:
      "Jump to the Great Crusade and open the Imperium of Man to see how the whole thousand-world empire got started.",
  },
  {
    id: "step-3",
    eraId: "heresy",
    factionId: null,
    instruction:
      "Scrub forward to the Horus Heresy — the single war that splits the Imperium in half and defines everything after it.",
  },
  {
    id: "step-4",
    eraId: "heresy",
    factionId: "chaosmarines",
    instruction:
      "Open Chaos Space Marines to see exactly who the Imperium lost that day, and why the grudge never ended.",
  },
  {
    id: "step-5",
    eraId: "indomitus",
    factionId: "tyranids",
    instruction:
      "Finish in the present era and open the Tyranids to see one of the new threats the Imperium is up against now.",
  },
];
