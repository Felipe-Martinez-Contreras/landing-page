// Builds the data of the hero figure, "Chile en puntos" (DESIGN.md §5, option A).
//
//   node scripts/build-health-map.mjs                 # rebuild from the snapshot in the repo
//   node scripts/build-health-map.mjs --from raw.csv  # refresh the snapshot from a new MINSAL export
//
// Source: "Establecimientos de Salud Vigentes", DEIS, Ministerio de Salud, datos.gob.cl (CC0).
// The snapshot keeps only what the figure needs (latitude, longitude, emergency service and
// region code) of the facilities in operation with coordinates. It is not published.
// Output: src/data/health-map.json (dot layers as SVG path data, label positions and counts).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const SNAPSHOT = new URL("scripts/data/health-facilities.csv", root);
const OUTPUT = new URL("src/data/health-map.json", root);

const SOURCE = {
  name: "DEIS, Ministerio de Salud",
  publisher: "datos.gob.cl",
  license: "CC0",
  url: "https://datos.gob.cl/dataset/establecimientos-de-salud-vigentes",
  cutDate: "2026-09-22",
};

// Continental Chile. Leaves out Rapa Nui, Juan Fernández and invalid coordinates.
const BOUNDS = { north: -17, south: -56.5, west: -76, east: -66 };
// Height of the plot in viewBox units; coordinates are rounded to this grid, so one dot
// stands for one grid cell with at least one facility, not for one facility.
const HEIGHT = 600;
const KM_PER_DEGREE_OF_LATITUDE = 111.2;
const PAD = 4;
const METROPOLITAN_REGION = "13";
// Latitude band where most facilities sit (central valley to Biobío), for the caption.
const BAND = { north: -32, south: -38.5 };
const LABELS = [
  { name: "Arica", lat: -18.4783, lon: -70.3126 },
  { name: "Santiago", lat: -33.4489, lon: -70.6693 },
  { name: "Punta Arenas", lat: -53.1638, lon: -70.9171 },
];

function parseCsv(text, separator) {
  const [header, ...lines] = text
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(separator));
  return lines.map((cells) =>
    Object.fromEntries(header.map((key, i) => [key, cells[i] ?? ""])),
  );
}

function refreshSnapshot(rawPath) {
  const rows = parseCsv(readFileSync(rawPath, "utf8"), ";");
  const kept = rows
    .filter((row) =>
      row.EstadoFuncionamiento.toLowerCase().startsWith("vigente"),
    )
    .map((row) => ({
      lat: Number(row.Latitud),
      lon: Number(row.Longitud),
      emergency: row.TieneServicioUrgencia.toUpperCase() === "SI" ? 1 : 0,
      region: row.RegionCodigo,
    }))
    .filter(
      (row) =>
        row.lat !== 0 && Number.isFinite(row.lat) && Number.isFinite(row.lon),
    );
  const csv = [
    "lat,lon,emergency,region",
    ...kept.map((r) => `${r.lat},${r.lon},${r.emergency},${r.region}`),
  ].join("\n");
  writeFileSync(SNAPSHOT, `${csv}\n`);
  console.log(
    `Snapshot: ${kept.length} facilities in operation with coordinates.`,
  );
}

const fromIndex = process.argv.indexOf("--from");
if (fromIndex !== -1) refreshSnapshot(process.argv[fromIndex + 1]);

const all = parseCsv(readFileSync(SNAPSHOT, "utf8"), ",").map((row) => ({
  lat: Number(row.lat),
  lon: Number(row.lon),
  emergency: row.emergency === "1",
  region: row.region,
}));
const points = all.filter(
  (p) =>
    p.lat <= BOUNDS.north &&
    p.lat >= BOUNDS.south &&
    p.lon >= BOUNDS.west &&
    p.lon <= BOUNDS.east,
);

// Equirectangular projection, corrected by the cosine of the middle latitude.
const lats = points.map((p) => p.lat);
const lons = points.map((p) => p.lon);
const [latMin, latMax] = [Math.min(...lats), Math.max(...lats)];
const [lonMin, lonMax] = [Math.min(...lons), Math.max(...lons)];
const cos = Math.cos((((latMin + latMax) / 2) * Math.PI) / 180);
const scale = HEIGHT / (latMax - latMin);
const width = Math.ceil((lonMax - lonMin) * cos * scale);
const project = ({ lat, lon }) => [
  Math.round((lon - lonMin) * cos * scale),
  Math.round((latMax - lat) * scale),
];

// One zero-length, round-capped segment per grid cell: "M x y h0" with relative moves.
function toPath(layer) {
  const cells = [...new Set(layer.map((p) => project(p).join(",")))]
    .map((key) => key.split(",").map(Number))
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let d = "";
  let [px, py] = [0, 0];
  for (const [x, y] of cells) {
    d += d ? `m${x - px} ${y - py}h0` : `M${x} ${y}h0`;
    [px, py] = [x, y];
  }
  return { d: d.replace(/ -/g, "-"), cells: cells.length };
}

const base = toPath(points);
const emergency = toPath(points.filter((p) => p.emergency));
const inBand = points.filter((p) => p.lat <= BAND.north && p.lat >= BAND.south);

const box = { width: width + PAD * 2, height: HEIGHT + PAD * 2 };
const percent = (value, total) => Math.round((value / total) * 1000) / 10;

const output = {
  source: SOURCE,
  viewBox: `${-PAD} ${-PAD} ${box.width} ${box.height}`,
  aspectRatio: `${box.width} / ${box.height}`,
  layers: { base: base.d, emergency: emergency.d },
  labels: LABELS.map((label) => {
    const [x, y] = project(label);
    return {
      name: label.name,
      x: percent(x + PAD, box.width),
      y: percent(y + PAD, box.height),
    };
  }),
  grid: {
    cellKm: Math.round(KM_PER_DEGREE_OF_LATITUDE / scale),
    dots: base.cells,
    emergencyDots: emergency.cells,
  },
  counts: {
    inOperationWithCoordinates: all.length,
    continental: points.length,
    emergency: points.filter((p) => p.emergency).length,
    metropolitan: points.filter((p) => p.region === METROPOLITAN_REGION).length,
    band: {
      ...BAND,
      count: inBand.length,
      share: percent(inBand.length, points.length),
    },
  },
};

writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(
  `${fileURLToPath(OUTPUT)}: ${points.length} points (${base.cells} cells), ` +
    `${output.counts.emergency} with emergency service (${emergency.cells} cells), ` +
    `path data ${base.d.length + emergency.d.length} bytes.`,
);
