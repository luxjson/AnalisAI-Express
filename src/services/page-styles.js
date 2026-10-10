import manifest from "../pages/manifest.json";
const iconStyles = {
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css":
    "/vendor/phosphor/bold/style.css",
  "https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css":
    "/vendor/phosphor/regular/style.css",
  "https://cdnjs.cloudflare.com/ajax/libs/phosphor-icons/2.1.1/css/phosphor-bold.min.css":
    "/vendor/phosphor/bold/style.css",
};
export function stylesFor(view) {
  const page = manifest[view];
  if (!page) throw new Error("Página sem configuração de estilos.");
  // Repeated links are intentional: removing one can change the CSS cascade.
  return (page.styleOrder || page.styles).flatMap((href) => {
    // This legacy API-only dependency had no matching icons in its template.
    if (href.includes("font-awesome")) return [];
    return [iconStyles[href] || href];
  });
}
export function applyPageStyles(view, target = document) {
  const page = manifest[view];
  for (const old of target.head.querySelectorAll("[data-page-style]"))
    old.remove();
  for (const href of stylesFor(view)) {
    const link = target.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.pageStyle = "true";
    target.head.append(link);
  }
  target.body.className = page.bodyClass || "";
  target.title = page.title || "AnalisAI";
  if (page.scripts.includes("/js/shared/theme-init.js"))
    target.documentElement.dataset.theme = "dark";
  else target.documentElement.removeAttribute("data-theme");
}
