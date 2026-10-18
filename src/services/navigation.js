import manifest from "../pages/manifest.json";
export const routes = {
  "/": "index",
  "/login": "login",
  "/esqueci-senha": "esqueciSenha",
  "/termos": "termos",
  "/privacidade": "privacidade",
  "/manuais": "manuais",
  "/manuais/aluno": "manualDoAluno",
  "/manuais/professor": "manualDoProfessor",
  "/equipe": "dashboard/dashboardEquipe",
  "/aluno/equipe": "dashboard/dashboardEquipe",
  "/dashboard/equipe": "dashboard/dashboardEquipe",
  "/api": "API/index",
  "/dashboard": "dashboard/dashboardMain",
  "/dashboard/edit": "dashboard/dashboardEdit",
  "/dashboard/graficos": "dashboard/dashboardGraficos",
  "/dashboard/tarefas": "dashboard/dashboardTarefas",
  "/dashboard/calendario": "dashboard/dashboardCalendario",
  "/dashboard/usuarios": "dashboard/dashboardUsuarios",
  "/dashboard/solicitacoes-senha": "dashboard/dashboardSolicitacoes",
  "/dashboard/ia": "dashboard/dashboardIA",
  "/dashboard/config": "dashboard/dashboardConfig",
  "/aluno": "aluno/alunoDashboard",
  "/aluno/competencias": "aluno/alunoCompetencias",
  "/aluno/evolucao": "aluno/alunoEvolucao",
  "/aluno/tarefas": "aluno/alunoTarefas",
  "/aluno/ia": "aluno/alunoIA",
  "/aluno/perfil": "aluno/alunoPerfil",
};
export const publicRoutes = new Set([
  "/",
  "/login",
  "/esqueci-senha",
  "/termos",
  "/privacidade",
  "/equipe",
  "/api",
]);
export const normalizePath = (path) => path.replace(/\/$/, "") || "/";
export const viewFor = (path) => routes[normalizePath(path)] || "error";
export function sidebarFor(view, data) {
  const includes = manifest[view]?.includes || [];
  if (
    includes.includes("partials/barAluno") &&
    includes.includes("partials/barProfessor")
  )
    return data.tipo === "aluno" ? "aluno" : "professor";
  return includes.includes("partials/barAluno")
    ? "aluno"
    : includes.includes("partials/barProfessor")
      ? "professor"
      : null;
}
export function navigate(href, { replace = false } = {}) {
  const url = new URL(href, window.location.href);
  if (
    url.origin !== window.location.origin ||
    !routes[normalizePath(url.pathname)]
  ) {
    window.location.assign(url.href);
    return;
  }
  const next = url.pathname + url.search + url.hash;
  window.history.replaceState(
    {
      ...window.history.state,
      analisaiScroll: [window.scrollX, window.scrollY],
    },
    "",
    window.location.href,
  );
  window.history[replace ? "replaceState" : "pushState"](
    {
      analisaiScroll: [0, 0],
    },
    "",
    next,
  );
  window.dispatchEvent(new window.Event("analisai:navigate"));
}
export const refresh = () =>
  window.dispatchEvent(new window.Event("analisai:navigate"));
export function installNavigation(onChange, preload = () => {}) {
  const changed = (event) =>
    onChange(window.location.pathname + window.location.search, {
      scroll:
        event.type === "popstate"
          ? window.history.state?.analisaiScroll || [0, 0]
          : [0, 0],
    });
  const resolveLink = (event) => {
    const link = event.target.closest?.("a[href]");
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self") ||
      link.getAttribute("rel")?.includes("external")
    )
      return null;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return null;
    const url = new URL(link.href, window.location.origin);
    return url.origin === window.location.origin &&
      routes[normalizePath(url.pathname)]
      ? url
      : null;
  };
  const click = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const url = resolveLink(event);
    if (!url) return;
    event.preventDefault();
    navigate(url.href);
  };
  const prefetch = (event) => {
    const url = resolveLink(event);
    if (url) preload(viewFor(url.pathname));
  };
  const submit = (event) => {
    if (event.defaultPrevented) return;
    const form = event.target;
    if (
      !(form instanceof window.HTMLFormElement) ||
      form.method.toUpperCase() !== "GET" ||
      (form.target && form.target !== "_self")
    )
      return;
    const url = new URL(form.action, window.location.origin);
    if (
      url.origin !== window.location.origin ||
      !routes[normalizePath(url.pathname)]
    )
      return;
    event.preventDefault();
    url.search = "";
    const fields = new window.FormData(form);
    if (event.submitter?.name)
      fields.append(event.submitter.name, event.submitter.value);
    for (const [key, value] of fields)
      if (typeof value === "string") url.searchParams.append(key, value);
    navigate(url.href);
  };
  document.addEventListener("click", click);
  document.addEventListener("pointerover", prefetch);
  document.addEventListener("focusin", prefetch);
  document.addEventListener("submit", submit);
  window.addEventListener("popstate", changed);
  window.addEventListener("analisai:navigate", changed);
  return () => {
    document.removeEventListener("click", click);
    document.removeEventListener("pointerover", prefetch);
    document.removeEventListener("focusin", prefetch);
    document.removeEventListener("submit", submit);
    window.removeEventListener("popstate", changed);
    window.removeEventListener("analisai:navigate", changed);
  };
}
