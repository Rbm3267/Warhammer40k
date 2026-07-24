export interface FactionEvent {
  era: string;
  text: string;
}

export interface Faction {
  id: string;
  name: string;
  sigil: string;
  color: string;
  blurb: string;
  events: FactionEvent[];
}

export const FACTIONS: Faction[] = [
  {
    id: "imperium",
    name: "Imperium of Man",
    sigil: "I",
    color: "#C9A227",
    blurb:
      "A million-world theocratic empire held together by faith, bureaucracy, and the psychic will of its bedridden god-emperor. It does not so much govern the galaxy as endure it.",
    events: [
      {
        era: "crusade",
        text: "Founded when the Emperor unites Terra's warring tribes and launches the Great Crusade to reclaim humanity's lost colonies.",
      },
      {
        era: "scouring",
        text: "Reorganizes around the Adeptus Terra and the Ecclesiarchy's cult of the Emperor after the Heresy nearly destroys it.",
      },
      {
        era: "watch",
        text: "Survives ten millennia through sheer institutional inertia, treating stagnation itself as a form of security.",
      },
      {
        era: "indomitus",
        text: "Fractures into Imperium Sanctus and Imperium Nihilus when the Great Rift tears the galaxy apart.",
      },
    ],
  },
  {
    id: "astartes",
    name: "Adeptus Astartes",
    sigil: "A",
    color: "#3E6FA8",
    blurb:
      "Genetically remade warrior-monks bred for war since childhood, organized into a thousand independent Chapters, each guarding its own traditions as fiercely as its territory.",
    events: [
      {
        era: "crusade",
        text: "The Emperor's twenty Primarchs are grown, lost across the stars, and each raises a Legion in their image.",
      },
      {
        era: "heresy",
        text: "Nine of eighteen Legions fall to Chaos under Horus, the deepest betrayal in the Imperium's history.",
      },
      {
        era: "scouring",
        text: "Surviving Legions are broken into a thousand smaller Chapters under the Codex Astartes, ending the age of the Legion forever.",
      },
      {
        era: "indomitus",
        text: "Primaris Marines — a new, larger strain — reinforce every Chapter as Guilliman prepares the Imperium for a longer war.",
      },
    ],
  },
  {
    id: "chaosmarines",
    name: "Chaos Space Marines",
    sigil: "C",
    color: "#8B1E2B",
    blurb:
      "The Traitor Legions, scattered into countless warbands within the Eye of Terror, fighting a ten-thousand-year grudge match against the Imperium that cast them out.",
    events: [
      {
        era: "heresy",
        text: "Follow Horus into open rebellion, believing the Emperor's secularism has betrayed humanity's true destiny.",
      },
      {
        era: "scouring",
        text: "Retreat into the Eye of Terror after Horus falls, nursing millennia-long grudges instead of dying out.",
      },
      {
        era: "watch",
        text: "Erupt in thirteen Black Crusades led by Abaddon the Despoiler, each carving the Imperium's border a little further back.",
      },
    ],
  },
  {
    id: "chaosgods",
    name: "The Ruinous Powers",
    sigil: "☗",
    color: "#6B2D8B",
    blurb:
      "Khorne, Nurgle, Tzeentch, and Slaanesh — four vast entities born from the accumulated emotion of mortal races, ruling the warp as living embodiments of rage, decay, ambition, and excess.",
    events: [
      {
        era: "strife",
        text: "Coalesce out of humanity's fear and violence during the psychically catastrophic Age of Strife.",
      },
      {
        era: "heresy",
        text: "Court and corrupt the Warmaster Horus, turning a war of ambition into a war of faith.",
      },
      {
        era: "watch",
        text: "Wage an unending, unwinnable war against each other through mortal proxies across ten thousand years.",
      },
    ],
  },
  {
    id: "aeldari",
    name: "Aeldari",
    sigil: "Ø",
    color: "#3E8E7E",
    blurb:
      "The last free survivors of a once-galaxy-spanning elder race, living aboard vast craftworlds and bound by rigid mental disciplines to hold their own psychic excess at bay.",
    events: [
      {
        era: "dat",
        text: "Rule a golden-age empire that predates humanity's own rise by tens of thousands of years.",
      },
      {
        era: "strife",
        text: "Their species' pursuit of hedonism births the Chaos God Slaanesh, an event that annihilates their empire overnight.",
      },
      {
        era: "watch",
        text: "Cling to survival aboard scattered craftworlds, each faction pursuing a desperate, divergent plan to outlive extinction.",
      },
    ],
  },
  {
    id: "drukhari",
    name: "Drukhari",
    sigil: "Ψ",
    color: "#9B2560",
    blurb:
      "Aeldari who fled underground rather than adopt psychic discipline, sustaining their unnaturally long lives through raids of torture and slaughter launched from the webway city of Commorragh.",
    events: [
      {
        era: "strife",
        text: "Split from their kin during the Fall, choosing cruelty and excess over the discipline that saved the craftworlds.",
      },
      {
        era: "watch",
        text: "Raid across realspace through hidden webway gates, feeding on suffering to stave off the fate that consumed their ancestors.",
      },
    ],
  },
  {
    id: "necrons",
    name: "Necrons",
    sigil: "N",
    color: "#2E8B57",
    blurb:
      "A once-organic empire that traded flesh for living-metal immortality, now waking in dynasty after dynasty from sixty-million-year slumber to reclaim a galaxy that has forgotten them.",
    events: [
      {
        era: "dat",
        text: "Bind their souls into deathless metal bodies in a desperate war against a species already lost to the history of every other race.",
      },
      {
        era: "strife",
        text: "Enter a self-imposed sleep known as the Great Sleep as their star-god masters fall dormant.",
      },
      {
        era: "rising",
        text: "Dynasty after dynasty begins to awaken, their tomb-worlds stirring just as the rest of the galaxy destabilizes.",
      },
    ],
  },
  {
    id: "orks",
    name: "Orks",
    sigil: "Ω",
    color: "#6B7F1E",
    blurb:
      "A fungoid warrior species that spreads by spore rather than birth, so profoundly shaped by belief that their crude machines work because the Orks are collectively certain they should.",
    events: [
      {
        era: "dat",
        text: "Ancient and already widespread by the time humanity leaves Terra, remnants of an empire even older than the Aeldari's.",
      },
      {
        era: "watch",
        text: "Wage constant, decentralized war across every era, needing no grand strategy beyond the next fight.",
      },
    ],
  },
  {
    id: "tyranids",
    name: "Tyranids",
    sigil: "T",
    color: "#7A2048",
    blurb:
      "An extragalactic hive-mind that consumes entire biospheres to fuel its own endless growth, arriving in hive fleets that leave nothing behind but stripped rock.",
    events: [
      {
        era: "rising",
        text: "First detected entering the galaxy as Hive Fleet Behemoth, forcing the Imperium to confront a genuinely new kind of extinction threat.",
      },
      {
        era: "indomitus",
        text: "Continue to press inward in multiple hive fleets, treating the chaos of the Great Rift as opportunity rather than obstacle.",
      },
    ],
  },
  {
    id: "tau",
    name: "T'au Empire",
    sigil: "Δ",
    color: "#2E9BA8",
    blurb:
      "A young, rapidly expanding race pursuing the Greater Good, a caste-based philosophy of unity and purpose that has already absorbed dozens of client species — willingly or otherwise.",
    events: [
      {
        era: "rising",
        text: "Begin the Sphere Expansions, encountering the Imperium directly for the first time and refusing to yield territory quietly.",
      },
      {
        era: "indomitus",
        text: "Continue expanding along the Imperium's eastern border even as the wider galaxy falls into greater disorder.",
      },
    ],
  },
  {
    id: "genestealer",
    name: "Genestealer Cults",
    sigil: "G",
    color: "#8A9B3E",
    blurb:
      "Hidden insurgencies seeded generations in advance by Tyranid vanguard organisms, patiently infiltrating an Imperial world's institutions until they can tear it apart from within.",
    events: [
      {
        era: "rising",
        text: "Spread quietly ahead of the hive fleets, a genetic fifth column that can lie dormant for generations before it strikes.",
      },
    ],
  },
  {
    id: "votann",
    name: "Leagues of Votann",
    sigil: "V",
    color: "#A8672E",
    blurb:
      "Stout, void-dwelling descendants of an early human offshoot, bound to their ancestors through living memory-cores and largely indifferent to the wars of the Imperium around them.",
    events: [
      {
        era: "dat",
        text: "Set out from Terra during humanity's first golden age of expansion, long before the Imperium ever existed.",
      },
      {
        era: "indomitus",
        text: "Re-emerge from isolation, their hold-worlds rediscovered by an Imperium that barely remembers they exist.",
      },
    ],
  },
];
