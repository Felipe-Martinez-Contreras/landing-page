import {
  tech,
  techCategories,
  type TechCategory,
  type TechId,
} from "../data/tech";
import {
  caseStudyPath,
  hasCaseStudy,
  projectAnchor,
  type LinkView,
  type ProjectEntry,
} from "./projects";

export interface SkillView {
  id: TechId;
  label: string;
  note?: string;
  /** Projects that use it; empty means no counter is shown. */
  projects: LinkView[];
}

export interface SkillGroupView {
  id: TechCategory;
  label: string;
  skills: SkillView[];
}

/**
 * Groups the registry by category and attaches, to each technology, the published
 * projects that use it (evidence instead of self-assessment). Within a group,
 * technologies with evidence come first, keeping registry order otherwise.
 */
export function groupSkills(
  projects: ProjectEntry[],
  resolve: (path: string) => string,
): SkillGroupView[] {
  const usage = new Map<TechId, LinkView[]>();
  for (const project of projects) {
    const href = hasCaseStudy(project)
      ? caseStudyPath(project.id)
      : `/#${projectAnchor(project.id)}`;
    const link = {
      label: project.data.shortTitle ?? project.data.title,
      href: resolve(href),
    };
    for (const id of project.data.tech) {
      usage.set(id, [...(usage.get(id) ?? []), link]);
    }
  }

  const ids = Object.keys(tech) as TechId[];
  return techCategories.map((category) => {
    const skills: SkillView[] = ids
      .filter((id) => tech[id].category === category.id)
      .map((id) => {
        const info: { label: string; note?: string } = tech[id];
        return {
          id,
          label: info.label,
          note: info.note,
          projects: usage.get(id) ?? [],
        };
      });
    // Array.prototype.sort is stable: registry order holds within each half.
    skills.sort(
      (a, b) => Number(b.projects.length > 0) - Number(a.projects.length > 0),
    );
    return { ...category, skills };
  });
}
