import React from "react";
import { styleFrom, safeJson } from "../services/ui";
export default function API_index({ data, handlers }) {
  const { baseUrl = null } = data;
  return (
    <>
      <React.Fragment>
        <div className={"api-container"}>
          <header className={"api-header"}>
            <div className={"logo"}>
              <img
                src={"/images/side-bar-logo.png"}
                alt={"AnalisAI"}
                style={styleFrom(
                  "height:40px; filter: brightness(0) invert(8.24%);",
                )}
              />
            </div>
            <h1>
              {"AnalisAI "}
              <span
                style={styleFrom("font-weight:400;color:var(--text-muted);")}
              >
                {"API"}
              </span>
            </h1>
            <span className={"version"}>
              <i className={"ph-bold ph-code"}></i>
              {" v2.0.0"}
            </span>
          </header>
          <div className={"api-description"}>
            <i
              className={"ph-bold ph-info"}
              style={styleFrom("color:var(--accent);margin-right:8px;")}
            ></i>
            {
              "\r\n            API REST da plataforma de gestão pedagógica AnalisAI.\r\n            Todas as rotas mutáveis (POST, PUT, PATCH, DELETE) exigem token CSRF no cabeçalho "
            }
            <code>{"X-CSRF-Token"}</code>
            {
              ".\r\n            A maioria dos endpoints requer autenticação via sessão.\r\n        "
            }
          </div>
          <div style={styleFrom("margin-bottom:24px;")}>
            <span className={"base-url"}>
              <i className={"ph-bold ph-link"}></i>
              {" Base URL: "}
              <span id={"baseUrlDisplay"}>{baseUrl}</span>
            </span>
          </div>
          <div className={"api-card"}>
            <div className={"api-card-header"}>
              <i className={"ph-bold ph-list"}></i>
              <h2>{"Endpoints Disponíveis"}</h2>
            </div>
            <div className={"api-card-body"}>
              <table className={"endpoint-table"}>
                <thead>
                  <tr>
                    <th style={styleFrom("width:80px;")}>{"Método"}</th>
                    <th style={styleFrom("min-width:160px;")}>{"Endpoint"}</th>
                    <th>{"Descrição"}</th>
                    <th style={styleFrom("width:120px;")}>{"Autenticação"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Lista de endpoints (esta página)"}
                    </td>
                    <td>
                      <span className={"auth-badge"}>{"Público"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/conta"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Dados da conta do usuário logado"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>{"Sessão"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/notificacoes"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Lista de notificações não lidas"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>{"Sessão"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"PATCH"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/notificacoes/:id"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Marcar uma notificação como lida"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"PATCH"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/notificacoes"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Marcar todas as notificações como lidas"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/preferencias/notificacoes"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Obter configurações de notificações"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>{"Sessão"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"PATCH"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/preferencias/notificacoes"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Salvar configurações de notificações"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/tarefas-stats"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Estatísticas de tarefas (professores)"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Professor)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/aluno/dados-grafico"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Dados para gráficos do aluno"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Aluno)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/aluno/ranking-comparativo"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Ranking comparativo do aluno"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Aluno)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/alunos/busca"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Buscar alunos (professores)"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Professor)"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/health"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Verificação de saúde do sistema"}
                    </td>
                    <td>
                      <span className={"auth-badge"}>{"Público"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/ia/conversas"}</code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Histórico de conversas da IA"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>{"Sessão"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method patch"}>{"PATCH"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/ia/conversas/:id"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Atualizar conversa (apagar, fixar, renomear)"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"POST"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/ia/estudante/mensagens"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Chat do aluno com a IA"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Aluno) + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"POST"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/ia/professor/mensagens"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Chat do professor com a IA"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Professor) + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"POST"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/ia/alunos/:id/analises"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Analisar aluno via IA"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Professor) + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method post"}>{"POST"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>
                        {"/ia/avaliacoes"}
                      </code>
                    </td>
                    <td className={"endpoint-desc"}>
                      {"Alterar nota via IA (com confirmação)"}
                    </td>
                    <td>
                      <span className={"auth-badge required"}>
                        {"Sessão (Professor) + CSRF"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={"method get"}>{"GET"}</span>
                    </td>
                    <td>
                      <code className={"endpoint-path"}>{"/auth/csrf"}</code>
                    </td>
                    <td className={"endpoint-desc"}>{"Obter token CSRF"}</td>
                    <td>
                      <span className={"auth-badge"}>
                        {"Sessão (opcional)"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"api-card"} style={styleFrom("margin-top:12px;")}>
            <div className={"api-card-header"}>
              <i className={"ph-bold ph-shield-check"}></i>
              <h2>{"Autenticação e Segurança"}</h2>
            </div>
            <div
              className={"api-card-body"}
              style={styleFrom("padding:18px 24px;")}
            >
              <div
                style={styleFrom(
                  "display:flex;flex-wrap:wrap;gap:16px;font-size:0.9rem;",
                )}
              >
                <div>
                  <span
                    className={"auth-badge"}
                    style={styleFrom("background:rgba(255,255,255,0.06);")}
                  >
                    {"Público"}
                  </span>
                  {" – sem autenticação"}
                </div>
                <div>
                  <span className={"auth-badge required"}>{"Sessão"}</span>
                  {" – requer login via cookie de sessão"}
                </div>
                <div>
                  <span
                    className={"auth-badge csrf"}
                    style={styleFrom(
                      "color:#ffc107;border-color:#ffc107;background:rgba(255,193,7,0.08);",
                    )}
                  >
                    {"CSRF"}
                  </span>
                  {" – token CSRF obrigatório no header "}
                  <code>{"X-CSRF-Token"}</code>
                </div>
              </div>
              <div
                style={styleFrom(
                  "margin-top:16px;color:var(--text-muted);font-size:0.85rem;border-top:1px solid var(--border);padding-top:14px;",
                )}
              >
                <strong>{"Como obter o token CSRF:"}</strong>
                {" Faça uma requisição "}
                <code>{"GET /backend/auth/csrf"}</code>
                {" e use o valor retornado no campo "}
                <code>{"csrfToken"}</code>
                {".\r\n                    "}
                <br />
                <strong>{"Exemplo de requisição com CSRF:"}</strong>
                <pre
                  style={styleFrom(
                    "background:var(--code-bg);padding:10px 14px;border-radius:8px;margin-top:8px;font-size:0.8rem;color:#ccc;overflow-x:auto;",
                  )}
                >
                  {
                    "\r\nfetch('/backend/ia/professor/mensagens', {\r\n    method: 'POST',\r\n    headers: {\r\n        'Content-Type': 'application/json',\r\n        'X-CSRF-Token': token\r\n    },\r\n    body: JSON.stringify({ message: 'Olá' })\r\n})"
                  }
                </pre>
              </div>
            </div>
          </div>
          <footer className={"api-footer"}>
            <span>
              {"© 2026 "}
              <a href={"/"}>{"AnalisAI"}</a>
            </span>
            <span>
              <a href={"/dashboard"} target={"_blank"}>
                <i className={"ph-bold ph-house"}></i>
                {" Dashboard"}
              </a>
              <span style={styleFrom("margin:0 8px;")}>{"•"}</span>
              <a href={"/manuais"} target={"_blank"}>
                <i className={"ph-bold ph-book"}></i>
                {" Manuais"}
              </a>
            </span>
          </footer>
        </div>
      </React.Fragment>
    </>
  );
}
