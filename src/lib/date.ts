// Dates are shown in the owner's time zone, so the build date matches the local calendar day.
const TIME_ZONE = "America/Santiago";

/** Long Spanish date, e.g. "27 de septiembre de 2026". */
export function formatLongDate(date: Date, locale = "es-CL"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  }).format(date);
}

/** ISO date (YYYY-MM-DD) for the `datetime` attribute of <time>. */
export function toIsoDate(date: Date): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(date);
}

/** Calendar year in the owner's time zone. */
export function getYear(date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      timeZone: TIME_ZONE,
    }).format(date),
  );
}

export interface PeriodPart {
  label: string;
  /** Machine-readable value for <time datetime>; absent for "present". */
  datetime?: string;
}

const MONTHS_SHORT = [
  "ene.",
  "feb.",
  "mar.",
  "abr.",
  "may.",
  "jun.",
  "jul.",
  "ago.",
  "sept.",
  "oct.",
  "nov.",
  "dic.",
];

/** Turns `YYYY`, `YYYY-MM` or `present` into a label and a datetime value. */
export function toPeriodPart(value: string, presentLabel: string): PeriodPart {
  if (value === "present") return { label: presentLabel };
  const [year, month] = value.split("-");
  const monthLabel = month ? MONTHS_SHORT[Number(month) - 1] : undefined;
  return {
    label: monthLabel ? `${monthLabel} ${year}` : year,
    datetime: value,
  };
}
