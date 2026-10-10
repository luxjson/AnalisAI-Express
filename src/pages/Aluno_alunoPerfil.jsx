import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoPerfil({
  data,
  handlers
}) {
  const {
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    competencias = [],
    abaAtiva = "dados",
    csrfToken = null
  } = data;
  return <>
      <React.Fragment>
        <Partials_barAluno data={{
        ...data
      }} handlers={handlers} />
        <div className={"main-layout"}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <main className={"dash-content"}>
            <section className={"welcome-banner"}>
              <div className={"banner-text"}>
                <h1>{"Configurações do Estudante"}</h1>
                <p>
                  {"Gerencie seus dados e preferências de alertas do sistema."}
                </p>
              </div>
            </section>
            <div className={"perfil-grid"}>
              <aside className={"perfil-sidebar-card"}>
                <div className={"avatar-circle"}>
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <div className={"perfil-info-base"}>
                  <h2>{aluno.nome}</h2>
                  <p>{aluno.ano_escolar}</p>
                </div>
                <div className={"perfil-stats-row"}>
                  <div className={"stat-item"}>
                    <span>{"Avaliações"}</span>
                    <strong>{competencias.length}</strong>
                  </div>
                  <div className={"stat-item"}>
                    <span>{"Presença"}</span>
                    <strong>
                      {aluno.presenca}
                      {"%"}
                    </strong>
                  </div>
                </div>
                <div style={styleFrom("text-align: left; padding: 0 10px;")}>
                  <div style={styleFrom("display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 10px;")}>
                    <span style={styleFrom("color: var(--text-gray);")}>
                      {"Matrícula:"}
                    </span>
                    <span style={styleFrom("color: white;")}>
                      {aluno.matricula}
                    </span>
                  </div>
                  <div style={styleFrom("display: flex; justify-content: space-between; font-size: 0.85rem;")}>
                    <span style={styleFrom("color: var(--text-gray);")}>
                      {"Conta:"}
                    </span>
                    <span className={"media-nota apto"} style={styleFrom("font-size: 0.6rem; padding: 2px 10px;")}>
                      {"ATIVO"}
                    </span>
                  </div>
                </div>
              </aside>
              <div className={"perfil-main"}>
                <nav className={"tabs-nav"}>
                  <button className={"tab-btn " + (abaAtiva === "dados" ? "active" : "")} onClick={event => {
                  handlers.mudarAba("dados");
                }}>
                    {"Meus Dados"}
                  </button>
                  <button className={"tab-btn " + (abaAtiva === "senha" ? "active" : "")} onClick={event => {
                  handlers.mudarAba("senha");
                }}>
                    {"Segurança"}
                  </button>
                </nav>
                <div id={"abaDados"} className={"tab-content " + (abaAtiva === "dados" ? "active" : "")}>
                  <div className={"info-grid"}>
                    <div className={"info-display-item"}>
                      <label>{"Nome Completo"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-user"}></i>
                        {aluno.nome}
                      </div>
                    </div>
                    <div className={"info-display-item"}>
                      <label>{"Turma / Ano"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-graduation-cap"}></i>
                        {aluno.ano_escolar}
                      </div>
                    </div>
                    <div className={"info-display-item"}>
                      <label>{"Idade"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-calendar-day"}></i>
                        {aluno.idade}
                        {" anos"}
                      </div>
                    </div>
                  </div>
                </div>
                <div id={"abaSenha"} className={"tab-content " + (abaAtiva === "senha" ? "active" : "")}>
                  <form action={"/aluno/alterar-senha?aba=senha"} method={"POST"}>
                    <input type={"hidden"} name={"_csrf"} value={csrfToken} />
                    <label>{"SENHA ATUAL"}</label>
                    <input type={"password"} name={"senha_atual"} className={"filter-input"} required={true} />
                    <label>{"NOVA SENHA"}</label>
                    <input type={"password"} name={"nova_senha"} className={"filter-input"} required={true} minLength={"12"} />
                    <label>{"CONFIRMAR NOVA SENHA"}</label>
                    <input type={"password"} name={"confirmar_senha"} className={"filter-input"} required={true} />
                    <button type={"submit"} className={"btn-secondary-dash"}>
                      <i className={"fas fa-key"}></i>
                      {" Atualizar Senha"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </React.Fragment>
    </>;
}
export function PageHeader({
  data,
  handlers
}) {
  const {
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    competencias = [],
    abaAtiva = "dados",
    csrfToken = null
  } = data;
  return <header className={"dash-header"}>
            <div className={"header-left"}>
              <div className={"logo"}>
                <img src={"/images/logo3-green.png"} alt={"AnalisAI"} style={styleFrom("height: 40px;")} />
              </div>
            </div>
            <div className={"header-user"}>
              <div className={"user-profile-group"}>
                <div className={"user-details"} style={styleFrom("text-align: right; padding-right: 15px;")}>
                  <span className={"user-name"}>
                    <strong>{aluno.nome}</strong>
                  </span>
                  <span className={"user-email"}>{aluno.ano_escolar}</span>
                </div>
                <div className={"user-avatar"} style={styleFrom("background: var(--student-green); width: 45px; height: 45px; font-size: 1.2rem;")}>
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className={"header-actions"}>
                <Partials_notificacoes data={{
          ...data,
          ...{
            notificacaoClasse: "header-icon"
          }
        }} handlers={handlers} />
              </div>
            </div>
          </header>;
}
