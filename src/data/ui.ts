// Interface microcopy. Components receive these strings through props.

export const ui = {
  skipLink: "Saltar al contenido",
  homeLink: "Ir al inicio",
  nav: {
    label: "Principal",
    menu: "Menú",
  },
  theme: {
    toggle: "Tema oscuro",
  },
  hero: {
    primary: "Ver proyectos",
    cv: "Descargar CV (PDF)",
    socialLabel: "Perfiles",
  },
  about: {
    title: "Sobre mí y trayectoria",
    timelineTitle: "Trayectoria",
    languagesTitle: "Idiomas",
    present: "hoy",
    ongoing: "En curso",
  },
  projects: {
    title: "Proyectos",
    problem: "Problema",
    approach: "Enfoque",
    result: "Resultado",
    role: "Rol",
    tech: "Tecnologías",
    status: {
      completed: "Completado",
      "in-progress": "En curso",
    },
    links: {
      caseStudy: "Leer caso de estudio",
      repo: "Ver repositorio",
      demo: "Ver demo",
      notebook: "Ver notebook",
      paper: "Leer informe",
    },
  },
  skills: {
    title: "Habilidades",
    usedIn: (count: number) =>
      count === 1 ? "Usado en 1 proyecto:" : `Usado en ${count} proyectos:`,
  },
  contact: {
    title: "Contacto",
    emailLabel: "Correo",
    cv: "Descargar CV (PDF)",
  },
  footer: {
    updated: "Última actualización:",
    source: "Ver código del sitio en GitHub",
  },
} as const;

export type Ui = typeof ui;
