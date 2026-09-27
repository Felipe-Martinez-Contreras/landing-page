// Prints the WCAG 2.x contrast ratio of every text/background pair of the palette in DESIGN.md.
// Usage: node scripts/contrast.mjs
const themes = {
  light: {
    canvas: "#F3F5F4",
    surface: "#FFFFFF",
    ink: "#15202B",
    "ink-muted": "#4D5A66",
    line: "#C9D1D5",
    accent: "#2346B0",
    "accent-ink": "#FFFFFF",
    highlight: "#A11D3A",
  },
  dark: {
    canvas: "#0F161D",
    surface: "#17212A",
    ink: "#E5EAEE",
    "ink-muted": "#9AA7B3",
    line: "#2B3845",
    accent: "#94AEFF",
    "accent-ink": "#0C1633",
    highlight: "#F2899C",
  },
};

// [foreground, background, minimum ratio, usage]
const pairs = [
  ["ink", "canvas", 4.5, "texto principal"],
  ["ink", "surface", 4.5, "texto sobre superficie"],
  ["ink-muted", "canvas", 4.5, "texto secundario"],
  ["ink-muted", "surface", 4.5, "texto secundario sobre superficie"],
  ["accent", "canvas", 4.5, "enlaces y anillo de foco"],
  ["accent", "surface", 4.5, "enlaces sobre superficie"],
  ["accent-ink", "accent", 4.5, "texto del botón principal"],
  ["highlight", "canvas", 4.5, "dato resaltado del elemento distintivo"],
  ["highlight", "surface", 4.5, "dato resaltado sobre superficie"],
  ["line", "canvas", 1, "divisores (decorativos, sin mínimo)"],
];

const channel = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = false;
console.log("| Par (texto / fondo) | Uso | Claro | Oscuro | Mínimo |");
console.log("| --- | --- | --- | --- | --- |");
for (const [fg, bg, min, usage] of pairs) {
  const cells = Object.values(themes).map((t) => {
    const r = ratio(t[fg], t[bg]);
    if (r < min) failed = true;
    return `${r.toFixed(2)}:1${r < min ? " ✗" : ""}`;
  });
  console.log(
    `| \`${fg}\` / \`${bg}\` | ${usage} | ${cells.join(" | ")} | ${min > 1 ? `${min}:1` : "—"} |`,
  );
}
process.exit(failed ? 1 : 0);
