import type { CollectionEntry } from "astro:content";
import { tech, type TechId } from "../data/tech";

export type ProjectEntry = CollectionEntry<"projects">;
export type ProjectLinkKind = keyof ProjectEntry["data"]["links"];

export interface LinkView {
  label: string;
  href: string;
}

export interface ProjectView {
  id: string;
  /** Anchor id of the project on the home page. */
  anchor: string;
  title: string;
  summary: string;
  year: number;
  status: string;
  context?: string;
  role?: string;
  problem: string;
  approach: string;
  result: string;
  featured: boolean;
  tech: { id: TechId; label: string }[];
  /** The card's single main action: case study, else repo, else demo. */
  primary?: LinkView;
  secondary: LinkView[];
}

/** A project has a case study page when its Markdown body is not empty. */
export function hasCaseStudy(entry: ProjectEntry): boolean {
  return (entry.body ?? "").trim().length > 0;
}

/** Published projects: featured first, then by `order`. Drafts never render. */
export function sortProjects(entries: ProjectEntry[]): ProjectEntry[] {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        a.data.order - b.data.order,
    );
}

/** Published projects with a case study, in the same order as on the home page. */
export function caseStudies(entries: ProjectEntry[]): ProjectEntry[] {
  return sortProjects(entries).filter(hasCaseStudy);
}

/** The case study after `id`, wrapping around; none when it is the only one. */
export function nextCaseStudy(
  studies: ProjectEntry[],
  id: string,
): ProjectEntry | undefined {
  const index = studies.findIndex((entry) => entry.id === id);
  if (index === -1 || studies.length < 2) return undefined;
  return studies[(index + 1) % studies.length];
}

export function projectAnchor(id: string): string {
  return `proyecto-${id}`;
}

/** Path of the case study, relative to the site root. */
export function caseStudyPath(id: string): string {
  return `/proyectos/${id}`;
}

interface ViewOptions {
  statusLabels: Record<ProjectEntry["data"]["status"], string>;
  linkLabels: Record<ProjectLinkKind | "caseStudy", string>;
  /** Resolves a root-relative path with the base URL. */
  resolve: (path: string) => string;
}

const LINK_ORDER: ProjectLinkKind[] = ["repo", "demo", "notebook", "paper"];

/** External links of a project (repo, demo, notebook, paper), in a fixed order. */
export function externalLinks(
  entry: ProjectEntry,
  labels: Record<ProjectLinkKind, string>,
): LinkView[] {
  return LINK_ORDER.flatMap((kind) => {
    const href = entry.data.links[kind];
    return href ? [{ label: labels[kind], href }] : [];
  });
}

export function toProjectView(
  entry: ProjectEntry,
  { statusLabels, linkLabels, resolve }: ViewOptions,
): ProjectView {
  const { data } = entry;
  const links: LinkView[] = [];
  if (hasCaseStudy(entry)) {
    links.push({
      label: linkLabels.caseStudy,
      href: resolve(caseStudyPath(entry.id)),
    });
  }
  links.push(...externalLinks(entry, linkLabels));
  const [primary, ...secondary] = links;

  return {
    id: entry.id,
    anchor: projectAnchor(entry.id),
    title: data.title,
    summary: data.summary,
    year: data.year,
    status: statusLabels[data.status],
    context: data.context,
    role: data.role,
    problem: data.problem,
    approach: data.approach,
    result: data.result,
    featured: data.featured,
    tech: data.tech.map((id) => ({ id, label: tech[id].label })),
    primary,
    secondary,
  };
}
