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
  footer: {
    updated: "Última actualización:",
    source: "Ver código del sitio",
  },
} as const;

export type Ui = typeof ui;
