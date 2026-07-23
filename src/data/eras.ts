export interface Era {
  id: string;
  label: string;
  range: string;
  blurb: string;
}

export const ERAS: Era[] = [
  {
    id: "dat",
    label: "Dark Age of Technology",
    range: "~M15 – M25",
    blurb:
      "Humanity spreads across the stars on the back of near-magical machine intelligence, colonizing thousands of worlds faster than any empire before or since.",
  },
  {
    id: "strife",
    label: "Age of Strife",
    range: "M25 – M30",
    blurb:
      "The webway collapses, warp storms sever the galaxy, and isolated human colonies fall to madness, mutation, and the whispering attention of the warp.",
  },
  {
    id: "crusade",
    label: "Great Crusade",
    range: "M30 – M31",
    blurb:
      "A being who has walked among mankind since its birth unites Terra, breeds twenty superhuman sons, and marches out to reclaim every lost world of man.",
  },
  {
    id: "heresy",
    label: "Horus Heresy",
    range: "M31",
    blurb:
      "The Emperor's own Warmaster turns traitor. Brother is set against brother, half the galaxy burns, and the dream of a rational Imperium dies on Terra's steps.",
  },
  {
    id: "scouring",
    label: "The Scouring",
    range: "M31 – M32",
    blurb:
      "Traitor remnants are hunted to the galaxy's edge. The wounded Imperium turns inward, calcifying its wartime faith into rigid, unquestioning law.",
  },
  {
    id: "watch",
    label: "The Long Watch",
    range: "M32 – M41",
    blurb:
      "Ten thousand years of grinding attrition — Black Crusades from the Eye of Terror, xenos empires rising and falling, an Imperium too vast to ever truly rule.",
  },
  {
    id: "rising",
    label: "Rising Threats",
    range: "late M41",
    blurb:
      "Tyranid hive fleets are sighted for the first time, the young T'au Empire begins its expansion, and long-dormant Necron dynasties stir beneath the soil.",
  },
  {
    id: "indomitus",
    label: "Age of the Dark Imperium",
    range: "M42, present",
    blurb:
      "The Cicatrix Maledictum splits the galaxy in two. A resurrected primarch leads the Indomitus Crusade into a darker, faster, more desperate age of war.",
  },
];
