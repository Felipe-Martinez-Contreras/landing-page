// Single registry of technologies (CLAUDE.md §4, rule 5). Projects reference these ids,
// validated with Zod in content.config.ts, and the skills section is derived from here.

export type TechCategory = "data-ml" | "dev-cloud" | "tools";

export interface TechInfo {
  label: string;
  category: TechCategory;
  /** Shown as-is next to the label (e.g. "cursando el electivo"). */
  note?: string;
  icon?: string;
}

export const tech = {
  // Data / ML (includes analytics and databases)
  python: { label: "Python", category: "data-ml" },
  pandas: { label: "Pandas", category: "data-ml" },
  numpy: { label: "NumPy", category: "data-ml" },
  "scikit-learn": { label: "Scikit-learn", category: "data-ml" },
  r: { label: "R", category: "data-ml" },
  nlp: { label: "NLP", category: "data-ml", note: "cursando el electivo" },
  matplotlib: { label: "Matplotlib", category: "data-ml" },
  seaborn: { label: "Seaborn", category: "data-ml" },
  plotly: { label: "Plotly", category: "data-ml" },
  "power-bi": { label: "Power BI", category: "data-ml" },
  "power-query": { label: "Power Query", category: "data-ml" },
  dax: { label: "DAX", category: "data-ml" },
  tableau: { label: "Tableau", category: "data-ml" },
  sql: { label: "SQL", category: "data-ml" },
  mysql: { label: "MySQL", category: "data-ml" },
  postgresql: { label: "PostgreSQL", category: "data-ml" },
  sqlite: { label: "SQLite", category: "data-ml" },

  // Dev / Cloud
  django: { label: "Django", category: "dev-cloud" },
  flask: { label: "Flask", category: "dev-cloud" },
  dash: { label: "Dash", category: "dev-cloud" },
  html: { label: "HTML", category: "dev-cloud" },
  css: { label: "CSS", category: "dev-cloud" },
  bootstrap: { label: "Bootstrap", category: "dev-cloud" },
  javascript: { label: "JavaScript", category: "dev-cloud" },
  "rest-apis": { label: "APIs REST", category: "dev-cloud" },
  "google-cloud": {
    label: "Google Cloud",
    category: "dev-cloud",
    note: "Cloud Run, Cloud SQL, Cloud Storage",
  },
  docker: { label: "Docker", category: "dev-cloud" },
  linux: { label: "Linux", category: "dev-cloud" },
  "tcp-ip": { label: "Redes TCP/IP", category: "dev-cloud" },
  java: { label: "Java", category: "dev-cloud" },
  "c-cpp": { label: "C/C++", category: "dev-cloud" },

  // Tools
  git: { label: "Git y GitHub", category: "tools" },
  jupyter: { label: "Jupyter", category: "tools" },
  excel: { label: "Excel", category: "tools" },
  pytest: { label: "pytest", category: "tools" },
  scrum: { label: "Scrum", category: "tools" },
} as const satisfies Record<string, TechInfo>;

export type TechId = keyof typeof tech;

/** Every registered id, in registry order (used by the Zod enum). */
export const techIds = Object.keys(tech) as [TechId, ...TechId[]];

/** Display order and names of the skill groups. */
export const techCategories: { id: TechCategory; label: string }[] = [
  { id: "data-ml", label: "Data/ML y Analytics" },
  { id: "dev-cloud", label: "Dev/Cloud" },
  { id: "tools", label: "Herramientas" },
];
