// Site identity, hero and bio content, links, navigation and default SEO.

export interface NavItem {
  label: string;
  /** Path relative to the site root (e.g. "/#proyectos"); resolved with BASE_URL. */
  href: string;
}

export type SocialId = "github" | "linkedin";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Site {
  name: string;
  headline: string;
  locale: string;
  location: string;
  email: string;
  social: SocialLink[];
  cvPath: string;
  hero: {
    /** Line under the name in the h1. */
    role: string;
    valueProposition: string;
    availability: string;
  };
  about: {
    /** First-person bio, one string per paragraph (≤ 120 words in total). */
    bio: string[];
    languages: Language[];
  };
  contact: {
    intro: string;
  };
  nav: NavItem[];
  seo: {
    /** `%s` is replaced by the page title. */
    titleTemplate: string;
    description: string;
    /** Default Open Graph image (1200×630), relative to the site root. */
    image: string;
  };
  /** Public repository of this site, shown in the footer. */
  sourceUrl?: string;
}

export const site: Site = {
  name: "Felipe Martínez",
  headline: "Estudiante de Ingeniería Civil en Computación",
  locale: "es_CL",
  location: "Curicó, Región del Maule, Chile",
  email: "felipemartinez.icc@gmail.com",
  social: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Felipe-Martinez-Contreras",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/felipe-martinez-contreras",
    },
  ],
  cvPath: "/cv/felipe-martinez-cv.pdf",
  hero: {
    role: "Estudiante de cuarto año de Ingeniería Civil en Computación en la Universidad de Talca.",
    valueProposition:
      "Construyo dashboards y pipelines de datos con Python, Dash y Power BI, y hago análisis exploratorio en R. Vengo del desarrollo web y las bases de datos, así que llevo un análisis hasta una herramienta que otros pueden usar.",
    availability:
      "Busco mi Práctica Profesional I: 8 semanas, entre enero y febrero de 2027, presencial en Curicó o alrededores, o remota.",
  },
  about: {
    bio: [
      "Antes de analizar datos, ya los registraba en terreno: como planillero en la cosecha de cereza, llevaba el registro y control de la producción. Trabajé más de ocho temporadas agrícolas seguidas desde 2017, primero al egresar de la enseñanza media y luego en paralelo a la universidad; llegué a jefe de cuadrilla y el empleador me vuelve a llamar cada temporada.",
      "Hoy estudio Ingeniería Civil en Computación en la Universidad de Talca, con electivos en análisis y visualización de datos. Abordo un problema por partes, busco alternativas y no lo suelto hasta resolverlo. Mi base técnica empezó en la enseñanza media técnico-profesional, en Electrónica.",
    ],
    languages: [{ name: "Inglés", level: "intermedio (B1), lectura técnica" }],
  },
  contact: {
    intro:
      "Si tu equipo recibe practicantes entre enero y febrero de 2027, escríbeme. También puedes revisar mi código o descargar mi CV.",
  },
  nav: [
    { label: "Sobre mí", href: "/#sobre-mi" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Habilidades", href: "/#habilidades" },
    { label: "Contacto", href: "/#contacto" },
  ],
  seo: {
    titleTemplate: "%s | Felipe Martínez",
    description:
      "Portafolio de Felipe Martínez, estudiante de cuarto año de Ingeniería Civil en Computación en la Universidad de Talca, con foco en ciencia de datos y machine learning.",
    // Created in Phase 6 (CLAUDE.md §9).
    image: "/og-default.png",
  },
  sourceUrl: "https://github.com/Felipe-Martinez-Contreras/landing-page",
};
