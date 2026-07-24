import { Fragment, type ReactNode } from "react";
import { GLOSSARY, type GlossaryTermData } from "../data/glossary";
import GlossaryTermSpan from "./GlossaryTermSpan";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface MatchEntry {
  term: GlossaryTermData;
  pattern: string;
}

const MATCH_ENTRIES: MatchEntry[] = GLOSSARY.flatMap((term) =>
  term.match.map((pattern) => ({ term, pattern })),
).sort((a, b) => b.pattern.length - a.pattern.length);

const GLOSSARY_REGEX_SOURCE = `\\b(${MATCH_ENTRIES.map((entry) => escapeRegExp(entry.pattern)).join("|")})s?\\b`;

function findTerm(matchedText: string): GlossaryTermData | undefined {
  const lower = matchedText.toLowerCase();
  const withoutTrailingS = lower.endsWith("s") ? lower.slice(0, -1) : lower;
  const entry = MATCH_ENTRIES.find(
    (candidate) =>
      candidate.pattern.toLowerCase() === lower ||
      candidate.pattern.toLowerCase() === withoutTrailingS,
  );
  return entry?.term;
}

/** Renders `text`, wrapping any recognized glossary term in an interactive tooltip span. */
export default function GlossaryText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  const regex = new RegExp(GLOSSARY_REGEX_SOURCE, "gi");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const matchedText = match[0];
    const term = findTerm(matchedText);
    if (!term) continue;

    if (match.index > lastIndex) {
      nodes.push(<Fragment key={nodes.length}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    nodes.push(
      <GlossaryTermSpan key={nodes.length} data={term}>
        {matchedText}
      </GlossaryTermSpan>,
    );
    lastIndex = match.index + matchedText.length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={nodes.length}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{nodes}</>;
}
