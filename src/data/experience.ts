// Timeline for "Sobre mí y trayectoria". Listed newest first, as rendered.
import type { TechId } from "./tech";

export type ExperienceKind =
  "education" | "work" | "research" | "teaching" | "award" | "certification";

/** `YYYY`, `YYYY-MM` or `present`. */
export type ExperienceDate = `${number}` | `${number}-${number}` | "present";

export interface Experience {
  kind: ExperienceKind;
  title: string;
  organization: string;
  /** Omitted only while the real date is unknown. */
  start?: ExperienceDate;
  end: ExperienceDate;
  /** Extra context for the dates (e.g. "egreso estimado en 2027"). */
  dateNote?: string;
  description?: string;
  highlights?: string[];
  tech?: TechId[];
}

export const experience: Experience[] = [
  {
    kind: "education",
    title: "Ingeniería Civil en Computación",
    organization: "Universidad de Talca",
    start: "2019",
    end: "present",
    dateNote: "egreso estimado en 2027",
    description:
      "Cursando cuarto año. Electivos: Análisis y Extracción de Datos; Visualización de Datos; Procesamiento de Lenguaje Natural (en curso).",
  },
  {
    kind: "work",
    title: "Trabajador de temporada agrícola",
    organization: "Fundos y contratistas agrícolas, Provincia de Curicó",
    start: "2017",
    end: "2026",
    dateNote: "por temporadas",
    highlights: [
      "Más de 8 temporadas consecutivas en cosecha de cereza y producción de tabaco; empecé al egresar de la enseñanza media y seguí en paralelo a la universidad.",
      "En cereza: cosechero, seleccionador, planillero (registro y control de producción) y jefe de cuadrilla, coordinando al equipo de trabajo.",
      "En tabaco: responsable del semillero y de las distintas labores del cultivo; el empleador me vuelve a llamar cada temporada.",
    ],
  },
  {
    kind: "education",
    title: "Enseñanza media técnico-profesional, especialidad Electrónica",
    organization: "Colegio Politécnico San José, Curicó",
    end: "2017",
  },
];
