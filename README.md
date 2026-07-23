# Compendium of the Dark Millennia

A newcomer-friendly, non-commercial fan project exploring the lore of Warhammer
40,000: an interactive timeline of eras from the Dark Age of Technology to the
present Age of the Dark Imperium, alongside the major factions active in each.

This is a fan-made lore explorer built for learning and appreciation. It is not
affiliated with, endorsed by, or produced by Games Workshop. Warhammer 40,000
and all related names, characters, and settings are the property of Games
Workshop.

## Features

- **Timeline bar** — scrub through 8 eras of the setting; the faction grid
  reorders and dims to show who was active in each.
- **Faction detail modal** — click any faction for a blurb and an
  era-by-era timeline of their history.
- **"Start Here" onboarding path** — a guided, data-driven walkthrough
  (`src/data/onboarding.ts`) that suggests a click order for brand-new
  visitors. Shown automatically on first visit, and reachable any time via
  the "Start Here" button in the header.
- **Glossary tooltips** — jargon like _Primarch_, _The Warp_, _Codex Astartes_,
  and more (`src/data/glossary.ts`) is underlined inline in faction and era
  text; hover (or tap, on mobile) to see a short definition.

## Tech stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for utility styling
- [lucide-react](https://lucide.dev/) for icons
- Google Fonts: Cinzel, Crimson Pro, JetBrains Mono
- ESLint + Prettier

## Project structure

```
src/
  data/
    eras.ts        # Era definitions (id, label, range, blurb)
    factions.ts     # Faction definitions + their per-era events
    glossary.ts      # Glossary terms + definitions
    onboarding.ts     # "Start Here" guided tour steps
  components/
    TimelineBar.tsx        # Era blurb + bottom era scrubber
    FactionGrid.tsx         # Faction cards, sorted/dimmed by active era
    FactionDetailModal.tsx   # Per-faction detail panel
    OnboardingGuide.tsx       # "Start Here" walkthrough overlay
    GlossaryText.tsx          # Wraps glossary terms found in a string
    GlossaryTermSpan.tsx       # Interactive tooltip for a single term
  App.tsx    # Top-level layout, state, and header/footer
```

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other useful scripts:

```bash
npm run build         # type-check and build for production
npm run preview        # preview the production build locally
npm run lint            # run ESLint
npm run format           # format the codebase with Prettier
npm run format:check      # check formatting without writing
```

## Deployment

This is a static Vite site, so it deploys anywhere that serves static files.
For Vercel specifically, no manual configuration is required beyond what's
already in this repo (`vercel.json`, build output `dist/`):

- **CLI:** run `vercel deploy` from the project root (or `vercel --prod` for
  a production deployment).
- **Dashboard:** import this repository in the Vercel dashboard — it will
  detect the Vite framework preset automatically and use `npm run build`
  with output directory `dist`.

Either path is a one-command / one-click deploy; no extra environment
variables or build settings are needed.

## Editing content

- Add or edit factions in `src/data/factions.ts`.
- Add or edit eras in `src/data/eras.ts`.
- Add or edit glossary terms in `src/data/glossary.ts` — each entry has a
  `match` list of literal strings to look for in body text.
- Add or edit onboarding steps in `src/data/onboarding.ts` — each step is
  just an era id, an optional faction id, and an instruction string.
