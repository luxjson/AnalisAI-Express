import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Dashboard_dashboardSolicitacoes({
  data,
  handlers
}) {
  const {
    user = "",
    userCargo = null,
    solicitacoes = [],
    csrfToken = null
  } = data;
  return <>
      <React.Fragment>
        <Partials_barProfessor data={{
        ...data
      }} handlers={handlers} />
        <div className={"main-layout"}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <main className={"dash-content"}>
            {(() => {
            const nodes = [];
            if (solicitacoes.length === 0) {
              nodes.push(<div className={"empty-state"} key={nodes.length}>
                    <i className={"fas fa-inbox"} style={styleFrom("font-size: 3rem; color: #333;")}></i>
                    <h3 style={styleFrom("color: #666; margin-top: 15px;")}>
                      {"Nenhuma solicitação pendente"}
                    </h3>
                  </div>);
            } else {
              nodes.push(<div className={"solicitacoes-grid"} key={nodes.length}>
                    {(() => {
                  const nodes = [];
                  solicitacoes.forEach(s => {
                    nodes.push(<div className={"solicitacao-card"} key={nodes.length}>
                            <div className={"solicitacao-nome"}>
                              <i className={"fas fa-user"}></i>
                              {s.nome}
                            </div>
                            <div className={"solicitacao-email"}>
                              <i className={"fas fa-envelope"}></i>
                              {s.email}
                            </div>
                            <div className={"solicitacao-data"}>
                              <i className={"far fa-clock"}></i>
                              {new Date(s.data_solicitacao).toLocaleString("pt-BR")}
                            </div>
                            <div className={"solicitacao-acoes"}>
                              <button className={"btn-secondary-dash"} onClick={event => {
                          handlers.abrirModalAprovar(s.id, s.nome);
                        }}>
                                <i className={"fas fa-check"}></i>
                                {" APROVAR\n                                "}
                              </button>
                              <button className={"btn-secondary-dash"} onClick={event => {
                          handlers.abrirModalRejeitar(s.id, s.nome);
                        }}>
                                <i className={"fas fa-times"}></i>
                                {" REJEITAR\n                                "}
                              </button>
                            </div>
                          </div>);
                  });
                  return nodes;
                })()}
                  </div>);
            }
            return nodes;
          })()}
          </main>
        </div>
        <div id={"modalAprovar"} className={"modal-overlay"}>
          <div className={"modal-content modal-pequeno"}>
            <button className={"close-btn"} onClick={event => {
            handlers.fecharModal("modalAprovar");
          }}>
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"}>{"APROVAR SOLICITAÇÃO"}</h2>
            <form action={""} method={"POST"} id={"formAprovar"}>
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div className={"filter-options"}>
                <p style={styleFrom("color: #888; margin-bottom: 15px;")} id={"nomeAprovar"}></p>
                <label>{"NOVA SENHA"}</label>
                <input type={"password"} name={"nova_senha"} className={"filter-input"} required={true} minLength={"12"} />
                <button type={"submit"} className={"btn-secondary-dash"} style={styleFrom("margin-top: 20px; justify-content: center;")}>
                  {"REDEFINIR SENHA"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id={"modalRejeitar"} className={"modal-overlay"}>
          <div className={"modal-content modal-pequeno"}>
            <button className={"close-btn"} onClick={event => {
            handlers.fecharModal("modalRejeitar");
          }}>
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"}>{"REJEITAR SOLICITAÇÃO"}</h2>
            <form action={""} method={"POST"} id={"formRejeitar"}>
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div className={"filter-options"}>
                <p style={styleFrom("color: #888; margin-bottom: 15px;")} id={"nomeRejeitar"}></p>
                <label>{"MOTIVO (opcional)"}</label>
                <textarea name={"motivo"} className={"filter-input"} rows={"3"} placeholder={"Por que está rejeitando?"} defaultValue={""}></textarea>
                <button type={"submit"} className={"btn-secondary-dash"} style={styleFrom("margin-top: 20px; justify-content: center;")}>
                  {"REJEITAR"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    </>;
}
export function PageHeader({
  data,
  handlers
}) {
  const {
    user = "",
    userCargo = null,
    solicitacoes = [],
    csrfToken = null
  } = data;
  return <header className={"dash-header"}>
            <div className={"header-left"}>
              <h1>
                {"\n                    Solicitações de Senha\n                "}
              </h1>
            </div>
            <div className={"header-user"}>
              <div className={"user-profile-group"}>
                <div className={"user-details"}>
                  <span className={"user-name"}>
                    <strong>{user}</strong>
                  </span>
                  <span className={"user-role"} style={styleFrom("color: #888888;")}>
                    <strong>{userCargo}</strong>
                  </span>
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
