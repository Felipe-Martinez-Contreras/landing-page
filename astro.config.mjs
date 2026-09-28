// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Provisional domain (see CLAUDE.md §2); update when hosting is decided.
  site: "https://fmartinez.xyz",
  output: "static",
  fonts: [
    {
      // Body, UI, captions (DESIGN.md §3). Only 400 normal is preloaded.
      provider: fontProviders.fontsource(),
      name: "Atkinson Hyperlegible Next",
      cssVariable: "--typeface-body",
      weights: ["200 800"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      // Headings and chart labels (DESIGN.md §3). Not preloaded.
      provider: fontProviders.fontsource(),
      name: "Archivo",
      cssVariable: "--typeface-heading",
      weights: ["100 900"],
      // Fontsource serves the wght+wdth file; declaring the range enables font-stretch.
      stretch: "62% 125%",
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/styleguide"),
    }),
  ],
});
