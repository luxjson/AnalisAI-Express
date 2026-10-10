import manifest from "../pages/manifest.json";
const iconStyles = {
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css": "/vendor/phosphor/bold/style.css",
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css": "/vendor/phosphor/regular/style.css",
  "https://cdnjs.cloudflare.com/ajax/libs/phosphor-icons/2.1.1/css/phosphor-bold.min.css": "/vendor/phosphor/bold/style.css"
};
export function stylesFor(view) {
  const page = manifest[view];
  if (!page) throw new Error("Página sem configuração de estilos.");
  // Repeated links are intentional: removing one can change the CSS cascade.
  return (page.styleOrder || page.styles).flatMap(href => {
    // This legacy API-only dependency had no matching icons in its template.
    if (href.includes("font-awesome")) return [];
    return [iconStyles[href] || href];
  });
}
export function applyPageStyles(view, target = document) {
  const page = manifest[view];
  const existing = [...target.head.querySelectorAll("[data-page-style]")];
  for (const href of stylesFor(view)) {
    const index = existing.findIndex(link => link.getAttribute("href") === href);
    const link = index >= 0 ? existing.splice(index, 1)[0] : target.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.pageStyle = "true";
    target.head.append(link);
  }
  for (const old of existing) old.remove();
  target.body.className = page.bodyClass || "";
  target.title = page.title || "AnalisAI";
  if (page.scripts.includes("/js/shared/theme-init.js")) target.documentElement.dataset.theme = "dark";else target.documentElement.removeAttribute("data-theme");
}
const preloaded = new Set();
export function preloadPageStyles(view, target = document) {
  for (const href of new Set(stylesFor(view))) {
    if (!href.startsWith('/') || preloaded.has(href)) continue;
    preloaded.add(href);
    const link = target.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    target.head.append(link);
  }
}
