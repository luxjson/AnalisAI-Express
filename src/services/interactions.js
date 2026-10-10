import { navigate } from "./navigation";
import { createInteractionScope } from "./lifecycle";
import manifest from "../pages/manifest.json";
import { request, download } from "./api";
import { safeSiteLink } from "./ui";
const modules = import.meta.glob("../interactions/*.jsx");
export async function initializeInteractions(
  view,
  handlers,
  { scope = createInteractionScope(), excludeSidebars = false } = {},
) {
  const seen = new Set(),
    scripts = [];
  function gather(key) {
    if (seen.has(key)) return;
    seen.add(key);
    const page = manifest[key];
    for (const child of page?.includes || []) {
      if (
        excludeSidebars &&
        ["partials/barProfessor", "partials/barAluno"].includes(child)
      )
        continue;
      gather(child);
    }
    for (const script of page?.scripts || [])
      if (!scripts.includes(script)) scripts.push(script);
  }
  gather(view);
  const ready = [];
  for (const script of scripts) {
    if (
      !script.startsWith("/js/") ||
      ["/js/shared/theme-init.js", "/js/shared/phosphor-icons.js"].includes(
        script,
      )
    )
      continue;
    const key =
      "../interactions/" +
      script.slice(4).replaceAll("/", "_").replace(".js", ".jsx");
    if (!modules[key]) continue;
    const module = await modules[key]();
    if (!scope.active) return scope;
    module.initialize({
      scope,
      handlers,
      onReady: (callback) => ready.push(callback),
    });
  }
  for (const callback of ready) {
    if (!scope.active) break;
    await callback();
  }
  return scope;
}
export function installForms(onError) {
  const interactionError = (event) => onError(event.detail);
  const submit = async (event) => {
    if (event.defaultPrevented) return;
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const action = new URL(form.action, location.origin);
    if (action.origin !== location.origin) return;
    if (form.method.toUpperCase() === "GET") return;
    event.preventDefault();
    if (form.dataset.busy === "true") return;
    form.dataset.busy = "true";
    const buttons = [...form.querySelectorAll('[type="submit"]')];
    buttons.forEach((el) => (el.disabled = true));
    try {
      const data = new FormData(form);
      const hasFile = [...data.values()].some(
        (v) => v instanceof File && v.size > 0,
      );
      let options;
      if (hasFile)
        options = {
          method: "POST",
          body: data,
        };
      else {
        const input = {};
        for (const [key, value] of data) {
          if (key === "_csrf" || value instanceof File) continue;
          if (Object.hasOwn(input, key))
            input[key] = Array.isArray(input[key])
              ? [...input[key], value]
              : [input[key], value];
          else input[key] = value;
        }
        if (input.alunos && !Array.isArray(input.alunos))
          input.alunos = [input.alunos];
        options = {
          method: form.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        };
      }
      const result = await request(action.pathname, options);
      if (!form.isConnected) return;
      if (result.message || result.success_msg)
        sessionStorage.setItem(
          "analisai:message",
          result.message || result.success_msg,
        );
      navigate(safeSiteLink(result.next, location.pathname));
    } catch (err) {
      if (form.isConnected && err.name !== "AbortError") onError(err.message);
    } finally {
      form.dataset.busy = "false";
      buttons.forEach((el) => (el.disabled = false));
    }
  };
  const click = async (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const url = new URL(link.href, location.origin);
    if (
      url.origin === location.origin &&
      (url.pathname.startsWith("/uploads/") ||
        url.pathname === "/baixar-modelo-importacao" ||
        url.pathname.startsWith("/dashboard/checkup/download/"))
    ) {
      event.preventDefault();
      try {
        await download(url.pathname);
      } catch (e) {
        onError(e.message);
      }
    }
  };
  document.addEventListener("submit", submit);
  document.addEventListener("click", click);
  window.addEventListener("analisai:interaction-error", interactionError);
  return () => {
    document.removeEventListener("submit", submit);
    document.removeEventListener("click", click);
    window.removeEventListener("analisai:interaction-error", interactionError);
  };
}
