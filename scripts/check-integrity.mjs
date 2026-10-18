import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return [absolute];
  });
}

function resolveRelative(importer, specifier) {
  const base = path.resolve(path.dirname(importer), specifier);
  const candidates = [
    base, base + ".js", base + ".jsx", base + ".mjs", base + ".cjs",
    base + ".json", base + ".css", base + ".svg", base + ".png",
    base + ".jpg", base + ".jpeg", base + ".ico", base + ".woff",
    base + ".woff2", base + ".ttf", path.join(base, "index.js"),
    path.join(base, "index.jsx"), path.join(base, "index.json"),
  ];
  return candidates.find((candidate) => {
    try { return fs.statSync(candidate).isFile(); } catch { return false; }
  });
}

const sourceFiles = [...walk(path.join(root, "src")), ...walk(path.join(root, "scripts")), ...walk(path.join(root, "tests"))]
  .filter((file) => /\.(?:js|jsx|mjs|cjs)$/.test(file));
for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  const patterns = [
    /\b(?:from\s*|import\s*)['"](\.\.?\/[^'"]+)['"]/g,
    /\bimport\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g,
    /\brequire\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      if (!resolveRelative(file, match[1])) {
        errors.push(path.relative(root, file) + ": unresolved local import " + match[1]);
      }
    }
  }
}


const assetPattern = /\/(?:images|pdf|fonts)\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|svg|ico|pdf|woff2?|ttf)/g;
for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(assetPattern)) {
    const assetPath = path.join(root, "public", match[0].slice(1));
    if (!fs.existsSync(assetPath)) {
      errors.push(path.relative(root, file) + ": missing public asset " + match[0]);
    }
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "src/pages/manifest.json"), "utf8"));
for (const [view, entry] of Object.entries(manifest)) {
  if (!entry || typeof entry.component !== "string") {
    errors.push("manifest: missing component name for " + view);
    continue;
  }
  if (view.startsWith("partials/")) {
    const component = path.join(root, "src/components", entry.component + ".jsx");
    if (!fs.existsSync(component)) errors.push("manifest: missing component for " + view + ": " + entry.component);
  } else {
    const page = path.join(root, "src/pages", entry.component + ".jsx");
    const skeleton = path.join(root, "src/skeletons", entry.component + ".jsx");
    if (!fs.existsSync(page)) errors.push("manifest: missing page module for " + view + ": " + entry.component);
    if (!fs.existsSync(skeleton)) errors.push("manifest: missing skeleton module for " + view + ": " + entry.component);
  }
  for (const include of entry.includes || []) {
    if (!manifest[include]) errors.push("manifest: " + view + " includes unknown view " + include);
  }
  for (const style of entry.styles || []) {
    if (style.startsWith("/css/") && !fs.existsSync(path.join(root, "public", style.slice(1)))) {
      errors.push("manifest: missing local stylesheet " + style + " in " + view);
    }
  }
  for (const script of entry.scripts || []) {
    if (!script.startsWith("/js/") || ["/js/shared/theme-init.js", "/js/shared/phosphor-icons.js"].includes(script)) continue;
    const moduleName = script.slice(4).replaceAll("/", "_").replace(".js", ".jsx");
    if (!fs.existsSync(path.join(root, "src/interactions", moduleName))) {
      errors.push("manifest: script has no interaction module " + script + " (" + moduleName + ")");
    }
  }
}

const navigation = fs.readFileSync(path.join(root, "src/services/navigation.js"), "utf8");
const routePairs = [...navigation.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].filter((match) => match[1].startsWith("/"));
for (const route of routePairs) {
  if (!manifest[route[2]]) errors.push("navigation: route " + route[1] + " references unknown view " + route[2]);
}
const routeMap = JSON.parse(fs.readFileSync(path.join(root, "src/services/route-map.json"), "utf8"));
const seen = new Set();
for (const row of routeMap) {
  if (!row.original || !row.uri || !["GET", "POST", "PATCH", "PUT", "DELETE"].includes(String(row.method).toUpperCase())) {
    errors.push("route-map: invalid route entry " + JSON.stringify(row));
    continue;
  }
  const key = String(row.method).toUpperCase() + " " + row.original;
  if (seen.has(key)) errors.push("route-map: duplicate mapping " + key);
  seen.add(key);
  if (!row.uri.startsWith("/")) errors.push("route-map: API path must start with / for " + key);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (!packageJson.scripts || !packageJson.scripts.test) errors.push("package.json: missing test script");
if (!packageJson.scripts || !packageJson.scripts.build) errors.push("package.json: missing production build script");

if (errors.length) {
  console.error("Frontend integrity check failed:\n- " + errors.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Frontend integrity passed: " + sourceFiles.length + " JS/JSX files, " + Object.keys(manifest).length + " manifest views, " + routePairs.length + " navigation routes, and " + routeMap.length + " API mappings.");
}
