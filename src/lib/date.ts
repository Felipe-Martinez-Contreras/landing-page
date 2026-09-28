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
