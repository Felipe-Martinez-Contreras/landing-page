import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { techIds } from "./data/tech";

// One Markdown file per project; its body is the case study (CLAUDE.md §4).
// Files starting with "_" are ignored.
const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short name for links from the skills section. Defaults to `title`. */
      shortTitle: z.string().optional(),
      summary: z.string().max(160),
      year: z.number().int(),
      context: z.string().optional(),
      status: z.enum(["completed", "in-progress"]),
      area: z.enum(["data-ml", "dev-cloud"]),
      // An id missing from data/tech.ts breaks the build.
      tech: z.array(z.enum(techIds)).min(1),
      methods: z.array(z.string()).optional(),
      role: z.string().optional(),
      problem: z.string(),
      approach: z.string(),
      result: z.string(),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            comparison: z.string().optional(),
          }),
        )
        .optional(),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
          notebook: z.url().optional(),
          paper: z.url().optional(),
        })
        .default({}),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
