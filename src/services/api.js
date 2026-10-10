import routeMap from "./route-map.json";
let csrf = "";
export function setCsrfToken(value) {
  csrf = value || "";
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (meta) meta.content = csrf;
  document
    .querySelectorAll('input[name="_csrf"]')
    .forEach((el) => (el.value = csrf));
}
function resolveRoute(input, method) {
  const url = new URL(input, window.location.origin);
  if (url.origin !== window.location.origin)
    throw new Error("Destino de API inválido.");
  if (url.pathname.startsWith("/backend/"))
    return { path: url.pathname + url.search, method };
  if (url.pathname.startsWith("/uploads/"))
    return {
      path:
        "/backend/arquivos/" +
        encodeURIComponent(url.pathname.slice("/uploads/".length)),
      method: "GET",
    };
  for (const row of routeMap) {
    const pattern =
      "^" +
      row.original
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/:([a-z]+)/gi, "([^/]+)") +
      "$";
    const match = url.pathname.match(new RegExp(pattern));
    if (!match) continue;
    let i = 1;
    const path = row.uri.replace(/:([a-z]+)/gi, () =>
      encodeURIComponent(decodeURIComponent(match[i++])),
    );
    let mappedMethod = row.method;
    if (row.original === "/api/configuracoes-notificacoes" && method !== "GET")
      mappedMethod = "PATCH";
    if (url.pathname === "/dashboard/edit" && method === "GET")
      mappedMethod = "GET";
    return { path: "/backend" + path + url.search, method: mappedMethod };
  }
  return null;
}
export async function apiFetch(input, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const route = resolveRoute(String(input), method);
  if (!route) return fetch(input, options);
  if (route.path === "/backend/admin/usuarios" && route.method === "PATCH") {
    const payload = JSON.parse(options.body || "{}");
    if (!/^\d+$/.test(String(payload.id))) throw new Error("Usuário inválido.");
    route.path += "/" + encodeURIComponent(payload.id);
  }
  const headers = new Headers(options.headers || {});
  if (!["GET", "HEAD", "OPTIONS"].includes(route.method))
    headers.set("X-CSRF-Token", csrf);
  const response = await fetch(route.path, {
    ...options,
    method: route.method,
    headers,
    credentials: "same-origin",
    cache: "no-store",
  });
  if (response.headers.get("content-type")?.includes("application/json")) {
    const data = await response
      .clone()
      .json()
      .catch(() => null);
    if (!options.signal?.aborted && data?.csrfToken)
      setCsrfToken(data.csrfToken);
  }
  return response;
}
export async function request(path, options) {
  const response = await apiFetch(path, options);
  let data;
  try {
    data = await response.json();
    if (data === null || typeof data !== "object")
      throw new Error("O servidor não retornou um objeto ou lista JSON.");
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw Object.assign(
      new Error("Resposta inválida do servidor.", { cause: error }),
      {
        status: response.ok ? 502 : response.status,
      },
    );
  }
  if (!response.ok)
    throw Object.assign(
      new Error(
        data.error ||
          data.message ||
          data.erro ||
          "Não foi possível concluir a operação.",
      ),
      { status: response.status },
    );
  return data;
}
export async function download(path, filename) {
  const r = await apiFetch(path);
  if (!r.ok) {
    const data = await r.json().catch(() => ({}));
    throw new Error(data.error || "Não foi possível baixar o arquivo.");
  }
  const blob = await r.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    filename ||
    r.headers.get("content-disposition")?.match(/filename="?([^";]+)/)?.[1] ||
    "arquivo";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
