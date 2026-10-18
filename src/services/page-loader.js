import { request, setCsrfToken } from "./api";
import { normalizePath, publicRoutes } from "./navigation";
export function baseData(session = {}, search = "") {
  const who = session.identity;
  return {
    csrfToken: session.csrfToken || "",
    user: who?.nome || "",
    userId: who?.id,
    userCargo: who?.cargo || (who?.kind === "aluno" ? "Aluno" : ""),
    isAdmin: who?.cargo === "Admin",
    aluno:
      who?.kind === "aluno"
        ? who
        : {
            nome: "",
            ano_escolar: "",
          },
    tipo: new URLSearchParams(search).has("tipo")
      ? new URLSearchParams(search).get("tipo") === "aluno"
        ? "aluno"
        : "professor"
      : who?.kind || "professor",
    baseUrl: "/backend",
    mensagem: "A página que você está procurando não existe.",
    erroDetalhe: null,
    abaAtiva: (who?.kind === "aluno"
      ? ["dados", "senha"]
      : ["dados", "senha", "notificacoes"]
    ).includes(new URLSearchParams(search).get("aba"))
      ? new URLSearchParams(search).get("aba")
      : "dados",
  };
}
export function sessionRedirect(path, who) {
  if (!publicRoutes.has(path) && !who) return "/login";
  if (path.startsWith("/dashboard") && who?.kind !== "professor")
    return "/aluno";
  if (path.startsWith("/aluno") && who?.kind !== "aluno") return "/dashboard";
  if (
    who?.kind === "professor" &&
    who?.cargo === "Professor" &&
    who?.onboardingConcluido === false &&
    path !== "/dashboard/configuracao-inicial"
  )
    return "/dashboard/configuracao-inicial";
  if (
    who?.cargo === "Coordenador" &&
    [
      "/dashboard/edit",
      "/dashboard/tarefas",
      "/dashboard/calendario",
      "/dashboard/ia",
    ].includes(path)
  )
    return "/dashboard/relatorios-pedagogicos";
  if (path === "/login" && who)
    return who.kind === "aluno" ? "/aluno" : "/dashboard";
  if (
    ["/dashboard/usuarios", "/dashboard/solicitacoes-senha"].includes(path) &&
    who?.cargo !== "Admin"
  )
    return "/dashboard/relatorios-pedagogicos";
  return null;
}
export async function loadSession(signal) {
  const session = await request("/backend/auth/session", {
    signal,
  });
  if (signal?.aborted)
    throw new DOMException("Navegação cancelada.", "AbortError");
  setCsrfToken(session.csrfToken);
  return session;
}
export async function loadPageData(href, session, signal) {
  const url = new URL(href, window.location.origin),
    path = normalizePath(url.pathname);
  let data = baseData(session, url.search);
  if (
    !publicRoutes.has(path) &&
    ![
      "/manuais",
      "/manuais/aluno",
      "/manuais/professor",
      "/dashboard/equipe",
      "/aluno/equipe",
    ].includes(path)
  ) {
    if (path === "/aluno/perfil")
      data = {
        ...data,
        ...(await request("/aluno", {
          signal,
        })),
      };
    else if (path === "/dashboard/config") {
      const [account, config] = await Promise.all([
        request("/api/conta", {
          signal,
        }),
        request("/api/configuracoes-notificacoes", {
          signal,
        }),
      ]);
      data = {
        ...data,
        email: account.email,
        cargo: account.role,
        foto_perfil: account.foto_perfil || null,
        ultimoAcesso: account.lastAccess,
        stats: {
          tarefas: account.tasks,
          alunos: account.students,
        },
        config,
      };
    } else if (path.startsWith("/dashboard") || path.startsWith("/aluno"))
      data = {
        ...data,
        ...(await request(path + url.search, {
          signal,
        })),
      };
  }
  if (signal?.aborted)
    throw new DOMException("Navegação cancelada.", "AbortError");
  if (url.searchParams.has("aba"))
    data.abaAtiva = baseData(session, url.search).abaAtiva;
  const message = sessionStorage.getItem("analisai:message");
  if (message) {
    sessionStorage.removeItem("analisai:message");
    data.success_msg = message;
  }
  return data;
}
