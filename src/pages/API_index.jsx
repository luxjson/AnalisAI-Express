import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function API_index({ data, handlers }) {
  const { baseUrl = null } = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"api-container"} root={true}>
          <LoadingElement as="header" className={"api-header"}>
            <LoadingElement as="div" className={"logo"}>
              <LoadingElement
                as="img"
                src={"/images/side-bar-logo.png"}
                alt={"AnalisAI"}
                style={styleFrom(
                  "height:40px; filter: brightness(0) invert(8.24%);",
                )}
              />
            </LoadingElement>
            <LoadingElement as="h1">
              {"AnalisAI "}
              <LoadingElement
                as="span"
                style={styleFrom("font-weight:400;color:var(--text-muted);")}
              >
                {"API"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"version"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-code"}
              ></LoadingElement>
              {" v2.0.0"}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"api-description"}>
            <LoadingElement
              as="i"
              className={"ph-bold ph-info"}
              style={styleFrom("color:var(--accent);margin-right:8px;")}
            ></LoadingElement>
            {[
              "\r\n            API REST da plataforma de gestão pedagógica ",
              "AnalisAI.\r\n            Todas as rotas mutáveis (POST, PUT, ",
              "PATCH, DELETE) exigem token CSRF no cabeçalho ",
            ].join("")}
            <LoadingElement as="code">{"X-CSRF-Token"}</LoadingElement>
            {
              ".\r\n            A maioria dos endpoints requer autenticação via sessão.\r\n        "
            }
          </LoadingElement>
          <LoadingElement as="div" style={styleFrom("margin-bottom:24px;")}>
            <LoadingElement as="span" className={"base-url"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-link"}
              ></LoadingElement>
              {" Base URL: "}
              <LoadingElement as="span" id={"baseUrlDisplay"}>
                <LoadingValue
                  slot="API/index:1"
                  width="12ch"
                  known={true}
                  value={baseUrl}
                />
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"api-card"}>
            <LoadingElement as="div" className={"api-card-header"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-list"}
              ></LoadingElement>
              <LoadingElement as="h2">{"Endpoints Disponíveis"}</LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"api-card-body"}>
              <LoadingElement as="table" className={"endpoint-table"}>
                <LoadingElement as="thead">
                  <LoadingElement as="tr">
                    <LoadingElement as="th" style={styleFrom("width:80px;")}>
                      {"Método"}
                    </LoadingElement>
                    <LoadingElement
                      as="th"
                      style={styleFrom("min-width:160px;")}
                    >
                      {"Endpoint"}
                    </LoadingElement>
                    <LoadingElement as="th">{"Descrição"}</LoadingElement>
                    <LoadingElement as="th" style={styleFrom("width:120px;")}>
                      {"Autenticação"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="tbody">
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Lista de endpoints (esta página)"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"auth-badge"}>
                        {"Público"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/conta"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Dados da conta do usuário logado"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/notificacoes"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Lista de notificações não lidas"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"PATCH"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/notificacoes/:id"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Marcar uma notificação como lida"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"PATCH"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/notificacoes"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Marcar todas as notificações como lidas"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/preferencias/notificacoes"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Obter configurações de notificações"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"PATCH"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/preferencias/notificacoes"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Salvar configurações de notificações"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/tarefas-stats"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Estatísticas de tarefas (professores)"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Professor)"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/aluno/dados-grafico"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Dados para gráficos do aluno"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Aluno)"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/aluno/ranking-comparativo"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Ranking comparativo do aluno"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Aluno)"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/alunos/busca"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Buscar alunos (professores)"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Professor)"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/health"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Verificação de saúde do sistema"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"auth-badge"}>
                        {"Público"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/conversas"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Histórico de conversas da IA"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method patch"}>
                        {"PATCH"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/conversas/:id"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Atualizar conversa (apagar, fixar, renomear)"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"POST"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/estudante/mensagens"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Chat do aluno com a IA"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Aluno) + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"POST"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/professor/mensagens"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Chat do professor com a IA"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Professor) + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"POST"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/alunos/:id/analises"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Analisar aluno via IA"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Professor) + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method post"}>
                        {"POST"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/ia/avaliacoes"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Alterar nota via IA (com confirmação)"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement
                        as="span"
                        className={"auth-badge required"}
                      >
                        {"Sessão (Professor) + CSRF"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="tr">
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"method get"}>
                        {"GET"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="code" className={"endpoint-path"}>
                        {"/auth/csrf"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="td" className={"endpoint-desc"}>
                      {"Obter token CSRF"}
                    </LoadingElement>
                    <LoadingElement as="td">
                      <LoadingElement as="span" className={"auth-badge"}>
                        {"Sessão (opcional)"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="div"
            className={"api-card"}
            style={styleFrom("margin-top:12px;")}
          >
            <LoadingElement as="div" className={"api-card-header"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-shield-check"}
              ></LoadingElement>
              <LoadingElement as="h2">
                {"Autenticação e Segurança"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"api-card-body"}
              style={styleFrom("padding:18px 24px;")}
            >
              <LoadingElement
                as="div"
                style={styleFrom(
                  "display:flex;flex-wrap:wrap;gap:16px;font-size:0.9rem;",
                )}
              >
                <LoadingElement as="div">
                  <LoadingElement
                    as="span"
                    className={"auth-badge"}
                    style={styleFrom("background:rgba(255,255,255,0.06);")}
                  >
                    {"Público"}
                  </LoadingElement>
                  {" – sem autenticação"}
                </LoadingElement>
                <LoadingElement as="div">
                  <LoadingElement as="span" className={"auth-badge required"}>
                    {"Sessão"}
                  </LoadingElement>
                  {" – requer login via cookie de sessão"}
                </LoadingElement>
                <LoadingElement as="div">
                  <LoadingElement
                    as="span"
                    className={"auth-badge csrf"}
                    style={styleFrom(
                      "color:#ffc107;border-color:#ffc107;background:rgba(255,193,7,0.08);",
                    )}
                  >
                    {"CSRF"}
                  </LoadingElement>
                  {" – token CSRF obrigatório no header "}
                  <LoadingElement as="code">{"X-CSRF-Token"}</LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                style={styleFrom(
                  "margin-top:16px;color:var(--text-muted);font-size:0.85rem;border-top:1px solid var(--border);padding-top:14px;",
                )}
              >
                <LoadingElement as="strong">
                  {"Como obter o token CSRF:"}
                </LoadingElement>
                {" Faça uma requisição "}
                <LoadingElement as="code">
                  {"GET /backend/auth/csrf"}
                </LoadingElement>
                {" e use o valor retornado no campo "}
                <LoadingElement as="code">{"csrfToken"}</LoadingElement>
                {".\r\n                    "}
                <LoadingElement as="br" />
                <LoadingElement as="strong">
                  {"Exemplo de requisição com CSRF:"}
                </LoadingElement>
                <LoadingElement
                  as="pre"
                  style={styleFrom(
                    "background:var(--code-bg);padding:10px 14px;border-radius:8px;margin-top:8px;font-size:0.8rem;color:#ccc;overflow-x:auto;",
                  )}
                >
                  {[
                    "\r\nfetch('/backend/ia/professor/mensagens', {\r\n    method: ",
                    "'POST',\r\n    headers: {\r\n        'Content-Type': ",
                    "'application/json',\r\n        'X-CSRF-Token': token\r\n    },\r\n    ",
                    "body: JSON.stringify({ message: 'Olá' })\r\n})",
                  ].join("")}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="footer" className={"api-footer"}>
            <LoadingElement as="span">
              {"© 2026 "}
              <LoadingElement as="a" href={"/"}>
                {"AnalisAI"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span">
              <LoadingElement as="a" href={"/dashboard"} target={"_blank"}>
                <LoadingElement
                  as="i"
                  className={"ph-bold ph-house"}
                ></LoadingElement>
                {" Dashboard"}
              </LoadingElement>
              <LoadingElement as="span" style={styleFrom("margin:0 8px;")}>
                {"•"}
              </LoadingElement>
              <LoadingElement as="a" href={"/manuais"} target={"_blank"}>
                <LoadingElement
                  as="i"
                  className={"ph-bold ph-book"}
                ></LoadingElement>
                {" Manuais"}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
