import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoTarefas({
  data,
  handlers
}) {
  const {
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    success_msg = null,
    error_msg = null,
    stats = {},
    tarefas = [],
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
            {(() => {
            const nodes = [];
            nodes.push(<section className={"welcome-banner"} style={styleFrom("background: linear-gradient(90deg, #1b5e38 0%, #217346 100%);")} key={nodes.length}>
                  <div className={"banner-text"}>
                    <h1>
                      <i className={"fas fa-tasks"}></i>
                      {" Minhas Tarefas"}
                    </h1>
                    <p>
                      {"Gerencie suas entregas, acompanhe prazos e visualize os feedbacks dos seus professores em um só lugar."}
                    </p>
                  </div>
                </section>);
            if (success_msg && success_msg.length > 0) {
              nodes.push(<div className={"alert alert-success"} style={styleFrom("margin-bottom: 25px;")} key={nodes.length}>
                    <i className={"fas fa-check-circle"}></i>
                    {success_msg}
                  </div>);
            }
            if (error_msg && error_msg.length > 0) {
              nodes.push(<div className={"alert alert-error"} style={styleFrom("margin-bottom: 25px;")} key={nodes.length}>
                    <i className={"fas fa-exclamation-triangle"}></i>
                    {error_msg}
                  </div>);
            }
            nodes.push(<section className={"section-container"} key={nodes.length}>
                  <div className={"dash-grid"}>
                    <div className={"stats-card"}>
                      <h3>{"TOTAL"}</h3>
                      <p className={"stats-number"}>{stats.total || 0}</p>
                    </div>
                    <div className={"stats-card desenvolvimento"}>
                      <h3>{"PENDENTES"}</h3>
                      <p className={"stats-number"}>{stats.pendentes || 0}</p>
                    </div>
                    <div className={"stats-card"} style={styleFrom("border-left: 6px solid #70b5f9;")}>
                      <h3>{"AGUARDANDO"}</h3>
                      <p className={"stats-number"}>{stats.aguardando || 0}</p>
                    </div>
                    <div className={"stats-card apto"}>
                      <h3>{"CONCLUÍDAS"}</h3>
                      <p className={"stats-number"}>{stats.concluidas || 0}</p>
                    </div>
                    <div className={"stats-card inapto"}>
                      <h3>{"ATRASADAS"}</h3>
                      <p className={"stats-number"}>{stats.atrasadas || 0}</p>
                    </div>
                  </div>
                </section>);
            nodes.push(<section className={"section-container"} key={nodes.length}>
                  {(() => {
                const nodes = [];
                nodes.push(<h2 className={"section-title-2"} key={nodes.length}>
                        {" LISTA DE ATIVIDADES"}
                      </h2>);
                if (tarefas && tarefas.length > 0) {
                  nodes.push(<div className={"dash-grid"} key={nodes.length}>
                          {(() => {
                      const nodes = [];
                      tarefas.forEach(tarefa => {
                        let statusColor = "#888";
                        let statusClass = "pendente";
                        let statusLabel = tarefa.status_texto;
                        let canSubmit = false;
                        if (tarefa.status_real === "ATRASADA") {
                          statusColor = "var(--color-inapto)";
                          statusClass = "inapto";
                          canSubmit = true;
                        } else if (tarefa.status === "DEVOLVIDA") {
                          statusColor = "var(--color-desenvolvimento)";
                          statusClass = "desenvolvimento";
                          canSubmit = true;
                        } else if (tarefa.status === "ENTREGUE") {
                          statusColor = "#70b5f9";
                          statusClass = "aguardando";
                        } else if (tarefa.status === "CONCLUIDA") {
                          statusColor = "var(--color-apto)";
                          statusClass = "apto";
                        } else if (tarefa.status === "PENDENTE") {
                          statusColor = "var(--color-desenvolvimento)";
                          statusClass = "desenvolvimento";
                          canSubmit = true;
                        }
                        const hoje = new Date();
                        const dataLimite = new Date(tarefa.data_limite);
                        const isUrgent = tarefa.data_limite && dataLimite < hoje && tarefa.status === "PENDENTE";
                        nodes.push(<div className={"stats-card"} style={styleFrom("border-left: 6px solid " + statusColor + "; display: flex; flex-direction: column; gap: 15px; padding: 30px;")} key={nodes.length}>
                                  {(() => {
                            const nodes = [];
                            nodes.push(<div style={styleFrom("display: flex; justify-content: space-between; align-items: center;")} key={nodes.length}>
                                        {(() => {
                                const nodes = [];
                                nodes.push(<span className={"media-nota " + statusClass} style={styleFrom("font-size: 0.7rem; padding: 4px 12px; letter-spacing: 1px;")} key={nodes.length}>
                                              {statusLabel}
                                            </span>);
                                if (tarefa.data_limite) {
                                  nodes.push(<span style={styleFrom("font-size: 0.75rem; color: " + (isUrgent ? "var(--color-inapto)" : "var(--text-muted)"))} key={nodes.length}>
                                                <i className={"far fa-calendar-alt"}></i>
                                                {tarefa.data_limite_formatada}
                                              </span>);
                                }
                                return nodes;
                              })()}
                                      </div>);
                            nodes.push(<div key={nodes.length}>
                                        <h3 style={styleFrom("color: var(--text-white); font-size: 1.15rem; margin-bottom: 5px; text-transform: none;")}>
                                          {tarefa.titulo}
                                        </h3>
                                        <span style={styleFrom("font-size: 0.7rem; color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px;")}>
                                          <i className={"fas fa-tag"}></i>
                                          {tarefa.competencia_nome || "Geral"}
                                        </span>
                                      </div>);
                            if (tarefa.descricao) {
                              nodes.push(<p style={styleFrom("font-size: 0.85rem; color: var(--text-gray); line-height: 1.5; margin: 5px 0;")} key={nodes.length}>
                                          {tarefa.descricao.substring(0, 120)}
                                          {tarefa.descricao.length > 120 ? "..." : ""}
                                        </p>);
                            }
                            if (tarefa.status === "DEVOLVIDA" && tarefa.feedback) {
                              nodes.push(<div style={styleFrom("background: rgba(212, 160, 23, 0.1); border: 1px solid var(--color-desenvolvimento); padding: 12px; border-radius: 10px;")} key={nodes.length}>
                                          <p style={styleFrom("font-size: 0.8rem; color: var(--color-desenvolvimento);")}>
                                            <i className={"fas fa-exclamation-circle"}></i>
                                            <strong>{"Feedback:"}</strong>
                                            {tarefa.feedback}
                                          </p>
                                        </div>);
                            }
                            if (tarefa.status === "CONCLUIDA" && tarefa.nota) {
                              nodes.push(<div style={styleFrom("display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px;")} key={nodes.length}>
                                          {(() => {
                                  const nodes = [];
                                  nodes.push(<span className={"media-nota apto"} style={styleFrom("font-size: 1.4rem;")} key={nodes.length}>
                                                {parseFloat(tarefa.nota).toFixed(1)}
                                              </span>);
                                  if (tarefa.feedback) {
                                    nodes.push(<p style={styleFrom("font-size: 0.8rem; color: var(--text-gray); font-style: italic;")} key={nodes.length}>
                                                  {'"'}
                                                  {tarefa.feedback}
                                                  {'"'}
                                                </p>);
                                  }
                                  return nodes;
                                })()}
                                        </div>);
                            }
                            nodes.push(<div style={styleFrom("margin-top: auto; padding-top: 15px;")} key={nodes.length}>
                                        {(() => {
                                const nodes = [];
                                if (canSubmit) {
                                  nodes.push(<button className={"btn-secondary-dash"} style={styleFrom(" justify-content: center;")} onClick={event => {
                                    handlers.abrirModalEnvio(tarefa.tarefa_aluno_id, tarefa.titulo);
                                  }} key={nodes.length}>
                                                <i className={"fas fa-paper-plane"}></i>
                                                {tarefa.status === "DEVOLVIDA" ? "REENVIAR TAREFA" : "ENVIAR TAREFA"}
                                              </button>);
                                } else if (tarefa.status === "ENTREGUE") {
                                  nodes.push(<div style={styleFrom("text-align: center; font-size: 0.8rem; color: var(--text-muted);")} key={nodes.length}>
                                                <i className={"fas fa-check-circle"} style={styleFrom("color: #70b5f9;")}></i>
                                                {" Entregue em "}
                                                {tarefa.data_entrega_formatada}
                                              </div>);
                                } else if (tarefa.status === "CONCLUIDA") {
                                  nodes.push(<div style={styleFrom("text-align: center; font-size: 0.8rem; color: var(--text-muted);")} key={nodes.length}>
                                                <i className={"fas fa-certificate"} style={styleFrom("color: var(--color-apto);")}></i>
                                                {" Atividade Avaliada\n                                        "}
                                              </div>);
                                }
                                return nodes;
                              })()}
                                      </div>);
                            return nodes;
                          })()}
                                </div>);
                      });
                      return nodes;
                    })()}
                        </div>);
                } else {
                  nodes.push(<div className={"stats-card"} style={styleFrom("text-align: center; padding: 80px;")} key={nodes.length}>
                          <i className={"fas fa-tasks"} style={styleFrom("font-size: 4rem; color: var(--border-color); margin-bottom: 20px;")}></i>
                          <p style={styleFrom("color: var(--text-gray);")}>
                            {"Você não possui tarefas pendentes no momento."}
                          </p>
                        </div>);
                }
                return nodes;
              })()}
                </section>);
            return nodes;
          })()}
          </main>
          <footer className={"dash-footer"}>
            <div className={"footer-actions"}>
              <a href={"/aluno"} className={"btn-secondary-dash"}>
                <i className={"fas fa-arrow-left"}></i>
                {" VOLTAR AO PAINEL\n                "}
              </a>
            </div>
            <div className={"footer-credits"}>
              <p>{"© 2026 AnalisAI"}</p>
            </div>
          </footer>
        </div>
        <div id={"modalEnvioTarefa"} className={"modal-overlay"}>
          <div className={"modal-content"}>
            <button className={"close-btn"} onClick={event => {
            handlers.fecharModalEnvio();
          }}>
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"}>
              {"\n                ENVIAR TAREFA\n            "}
            </h2>
            <p id={"tarefaTituloEnvio"} style={styleFrom("color: #fff; font-size: 1rem; margin-bottom: 25px; opacity: 0.8;")}></p>
            <form id={"formEnvioTarefa"} method={"POST"} encType={"multipart/form-data"}>
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div style={styleFrom("display: flex; flex-direction: column; gap: 20px;")}>
                <div>
                  <label style={styleFrom("font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;")}>
                    {"Resposta em Texto"}
                  </label>
                  <textarea name={"resposta_texto"} style={styleFrom("width: 100%; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 15px; padding: 15px; color: var(--text-white); resize: vertical; min-height: 120px;")} placeholder={"Descreva sua resposta aqui..."} defaultValue={""}></textarea>
                </div>
                <div>
                  <label style={styleFrom("font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;")}>
                    {"Anexar Arquivo"}
                  </label>
                  <div style={styleFrom("border: 2px dashed var(--border-color); border-radius: 20px; padding: 30px; text-align: center; cursor: pointer; transition: 0.3s;")} onMouseOver={event => {
                  event.currentTarget.style.borderColor = "var(--color-apto)";
                }} onMouseOut={event => {
                  event.currentTarget.style.borderColor = "var(--border-color)";
                }} onClick={event => {
                  document.getElementById("arquivoInput").click();
                }}>
                    <i className={"fas fa-file-upload"} style={styleFrom("font-size: 2rem; color: #333; margin-bottom: 10px;")}></i>
                    <p style={styleFrom("font-size: 0.8rem; color: #888;")}>
                      {"Clique para selecionar (PDF, Imagens ou Documentos)"}
                    </p>
                    <input type={"file"} id={"arquivoInput"} name={"arquivo"} style={styleFrom("display: none;")} />
                  </div>
                  <div id={"nomeArquivo"} style={styleFrom("font-size: 0.75rem; color: var(--color-apto); margin-top: 10px; text-align: center;")}></div>
                </div>
                <button type={"submit"} className={"btn-secondary-dash"} style={styleFrom("justify-content: center; height: 55px;")}>
                  <i className={"fas fa-paper-plane"}></i>
                  {" FINALIZAR ENTREGA\n                    "}
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
    aluno = {
      nome: "",
      ano_escolar: ""
    },
    success_msg = null,
    error_msg = null,
    stats = {},
    tarefas = [],
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
                <div className={"user-avatar"} style={styleFrom("background: var(--color-apto);")}>
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <div className={"user-details"}>
                  <span className={"user-name"}>
                    <strong>{aluno.nome}</strong>
                  </span>
                  <span className={"user-email"}>{aluno.ano_escolar}</span>
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
