/** A verified source behind a number or claim in the deck. */
export interface Source {
  /** Stable id used by <SourceChip id="..." /> on slides. */
  id: string;
  /** Short label for the chip, e.g. "LinkedIn". */
  publisher: string;
  /** Full title of the report, paper or page. */
  title: string;
  /** Publication year. */
  year: number;
  /** Direct link to the source (the page that states the claim). */
  url: string;
  /** The exact claim the deck makes from it (Hebrew, as on the slide). */
  claim: string;
  /** Scene ids that cite it. */
  usedIn: string[];
}
