import type { Experience } from "../data/experience";
import { toPeriodPart, type PeriodPart } from "./date";

export interface ExperienceView {
  title: string;
  organization: string;
  /** Absent start: only the end (or "ongoing") is shown. */
  start?: PeriodPart;
  end: PeriodPart;
  dateNote?: string;
  description?: string;
  highlights: string[];
}

interface Labels {
  present: string;
  /** Used alone when an entry has no start date and has not ended. */
  ongoing: string;
}

export function toExperienceView(
  entry: Experience,
  { present, ongoing }: Labels,
): ExperienceView {
  const end = toPeriodPart(
    entry.end,
    entry.start === undefined ? ongoing : present,
  );
  return {
    title: entry.title,
    organization: entry.organization,
    start: entry.start ? toPeriodPart(entry.start, present) : undefined,
    end,
    dateNote: entry.dateNote,
    description: entry.description,
    highlights: entry.highlights ?? [],
  };
}
