import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/react-root.css";
import { applyPageStyles } from "./services/page-styles";
import { request, setCsrfToken } from "./services/api";
import { initializeInteractions, installForms } from "./services/interactions";
import manifest from "./pages/manifest.json";
import "./services/icons";
const pages = import.meta.glob("./pages/*.jsx");
const routes = {
  "/": "index",
  "/login": "login",
  "/esqueci-senha": "esqueciSenha",
  "/termos": "termos",
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
  "/aluno": "aluno/alunoDashboard",
  "/aluno/competencias": "aluno/alunoCompetencias",
  "/aluno/evolucao": "aluno/alunoEvolucao",
  "/aluno/tarefas": "aluno/alunoTarefas",
  "/aluno/ia": "aluno/alunoIA",
  "/aluno/perfil": "aluno/alunoPerfil",
  "/dashboard/config": "dashboard/dashboardConfig",
};
const publicRoutes = new Set([
  "/",
  "/login",
  "/esqueci-senha",
  "/termos",
  "/equipe",
  "/api",
]);
function App() {
  const [state, setState] = useState(null),
    [error, setError] = useState("");
  const handlers = useRef({});
  useEffect(() => {
    let active = true;
    (async () => {
      const path = location.pathname.replace(/\/$/, "") || "/";
      const view = routes[path] || "error";
      let session;
      try {
        session = await request("/backend/auth/session");
        setCsrfToken(session.csrfToken);
      } catch (err) {
        if (!publicRoutes.has(path)) throw err;
        session = { identity: null };
      }
      const who = session.identity;
      if (!publicRoutes.has(path) && !who) {
        location.replace("/login");
        return;
      }
      if (path.startsWith("/dashboard") && who?.kind !== "professor") {
        location.replace("/aluno");
        return;
      }
      if (path.startsWith("/aluno") && who?.kind !== "aluno") {
        location.replace("/dashboard");
        return;
      }
      if (
        ["/dashboard/usuarios", "/dashboard/solicitacoes-senha"].includes(
          path,
        ) &&
        who?.cargo !== "Admin"
      )
        throw new Error("Acesso administrativo necessário.");
      if (path === "/login" && who) {
        location.replace(who.kind === "aluno" ? "/aluno" : "/dashboard");
        return;
      }
      let data = {
        csrfToken: session.csrfToken,
        user: who?.nome || "",
        userId: who?.id,
        userCargo: who?.cargo || (who?.kind === "aluno" ? "Aluno" : ""),
        isAdmin: who?.cargo === "Admin",
        aluno: who?.kind === "aluno" ? who : { nome: "", ano_escolar: "" },
        tipo:
          new URLSearchParams(location.search).get("tipo") === "aluno"
            ? "aluno"
            : "professor",
        baseUrl: "/backend",
        mensagem: "A página que você está procurando não existe.",
        erroDetalhe: null,
        abaAtiva: "dados",
      };
      if (
        !publicRoutes.has(path) &&
        view !== "error" &&
        ![
          "/manuais",
          "/manuais/aluno",
          "/manuais/professor",
          "/dashboard/equipe",
          "/aluno/equipe",
        ].includes(path)
      ) {
        if (path === "/aluno/perfil") {
          data = { ...data, ...(await request("/aluno")) };
        } else if (path === "/dashboard/config") {
          const account = await request("/api/conta");
          const config = await request("/api/configuracoes-notificacoes");
          data = {
            ...data,
            email: account.email,
            cargo: account.role,
            ultimoAcesso: account.lastAccess,
            stats: { tarefas: account.tasks, alunos: account.students },
            config,
          };
        } else data = { ...data, ...(await request(path + location.search)) };
      }
      const message = sessionStorage.getItem("analisai:message");
      if (message) {
        sessionStorage.removeItem("analisai:message");
        data.success_msg = message;
      }
      const component = (
        await pages[`./pages/${manifest[view].component}.jsx`]()
      ).default;
      if (!active) return;
      applyPageStyles(view);
      setState({ view, component, data });
    })().catch((e) => {
      if (active) setError(e.message);
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!state) return;
    const cleanup = installForms(setError);
    initializeInteractions(state.view, handlers.current).catch((e) =>
      setError(e.message),
    );
    return cleanup;
  }, [state]);
  if (!state)
    return (
      <div role="status" className="login-wrapper">
        <p>{error || "Carregando AnalisAI..."}</p>
        {error && (
          <button onClick={() => location.reload()}>Tentar novamente</button>
        )}
      </div>
    );
  const Page = state.component;
  return (
    <>
      <Page data={state.data} handlers={handlers.current} />
      {error && (
        <div
          role="alert"
          className="alert-box error"
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 100000,
          }}
        >
          <span>{error}</span>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
document.documentElement.dataset.theme = "dark";
try {
  localStorage.removeItem("analisai-theme-v2");
} catch {}
createRoot(document.getElementById("root")).render(<App />);
