export interface GlossaryTermData {
  id: string;
  term: string;
  definition: string;
  /** Literal substrings (case-insensitive) that should trigger this entry when found in body text. */
  match: string[];
}

export const GLOSSARY: GlossaryTermData[] = [
  {
    id: "primarch",
    term: "Primarch",
    definition:
      "One of the Emperor's twenty superhuman sons, genetically engineered to lead a Space Marine Legion during the Great Crusade.",
    match: ["Primarch"],
  },
  {
    id: "warp",
    term: "The Warp",
    definition:
      "The immaterial dimension of raw psychic energy underlying reality — the source of both faster-than-light travel and the daemonic.",
    match: ["warp"],
  },
  {
    id: "stc",
    term: "STC / Standard Template Construct",
    definition:
      "A Dark Age of Technology database of perfected design templates for building and manufacturing technology, most of it lost to history.",
    match: ["Standard Template Construct", "STC"],
  },
  {
    id: "codex-astartes",
    term: "Codex Astartes",
    definition:
      "Roboute Guilliman's tactical doctrine, written after the Horus Heresy, that reorganized the Space Marine Legions into a thousand smaller, standardized Chapters.",
    match: ["Codex Astartes"],
  },
  {
    id: "primaris-marines",
    term: "Primaris Marines",
    definition:
      "A larger, more advanced strain of Space Marine developed in secret by Roboute Guilliman and Archmagos Cawl to reinforce a depleted Adeptus Astartes.",
    match: ["Primaris Marines"],
  },
  {
    id: "webway",
    term: "Webway",
    definition:
      "A vast network of stable tunnels through the warp, built by a long-vanished precursor race, allowing travel between worlds without exposure to the warp's dangers.",
    match: ["webway"],
  },
  {
    id: "great-rift",
    term: "Great Rift",
    definition:
      "Also called the Cicatrix Maledictum — a colossal warp rift that tore the galaxy in half in the 42nd Millennium, splitting the Imperium into two halves.",
    match: ["Great Rift"],
  },
  {
    id: "hive-fleet",
    term: "Hive Fleet",
    definition:
      "A Tyranid invasion armada, one arm of an interstellar hive mind consuming entire worlds to fuel its endless expansion.",
    match: ["hive fleet"],
  },
];
