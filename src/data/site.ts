// Site identity, links, navigation and default SEO.
// Phase 2 holds only what the layout needs; Phase 3 adds the hero and bio content.

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

export interface Site {
  name: string;
  headline: string;
  locale: string;
  email: string;
  social: SocialLink[];
  cvPath: string;
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
  // TODO: URL del repositorio del sitio, si será público (se muestra en el footer).
  sourceUrl: undefined,
};
