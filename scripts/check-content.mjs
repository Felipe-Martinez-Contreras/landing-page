// Fails if any "TODO:" marker remains in the content layer (src/content, src/data).
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOTS = ["src/content", "src/data"];
const MARKER = "TODO:";

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.isFile()) yield path;
  }
}

const hits = [];
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const lines = (await readFile(file, "utf8")).split(/\r?\n/);
    lines.forEach((line, i) => {
      if (line.includes(MARKER)) {
        hits.push(`${relative(process.cwd(), file)}:${i + 1}  ${line.trim()}`);
      }
    });
  }
}

if (hits.length > 0) {
  console.error(`${hits.length} pending ${MARKER} marker(s):\n`);
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log(`No ${MARKER} markers in ${ROOTS.join(", ")}.`);
