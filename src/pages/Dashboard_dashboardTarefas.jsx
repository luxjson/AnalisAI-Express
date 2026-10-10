import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Dashboard_dashboardTarefas({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    success_msg = null,
    error_msg = null,
    stats = {},
    filtros = {
      mes: 1,
      ano: 2026,
      turma: "",
    },
    tarefas = [],
    csrfToken = null,
    listaCompetencias = [],
    alunos = [],
  } = data;

  return (
    <>
      <React.Fragment>
        <Partials_barProfessor
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <div className={"main-layout"}>
          {(() => {
            const nodes = [];
            nodes.push(
              <header className={"dash-header"} key={nodes.length}>
                <div className={"header-left"}>
                  <h1>
                    {
                      "\n                    Gerenciar Tarefas\n                "
                    }
                  </h1>
                </div>
                <div className={"header-user"}>
                  <div className={"user-profile-group"}>
                    <div className={"user-details"}>
                      <span className={"user-name"}>
                        <strong>{user}</strong>
                      </span>
                      <span
                        className={"user-role"}
                        style={styleFrom("color: #888888;")}
                      >
                        <strong>{userCargo}</strong>
                      </span>
                    </div>
                  </div>
                  <div className={"header-actions"}>
                    <Partials_notificacoes
                      data={{
                        ...data,
                        ...{
                          notificacaoClasse: "header-icon",
                        },
                      }}
                      handlers={handlers}
                    />
                  </div>
                </div>
              </header>,
            );
            if (success_msg && success_msg.length > 0) {
              nodes.push(
                <div className={"alert alert-success"} key={nodes.length}>
                  {success_msg}
                  <span
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </span>
                </div>,
              );
            }
            if (error_msg && error_msg.length > 0) {
              nodes.push(
                <div className={"alert alert-error"} key={nodes.length}>
                  {error_msg}
                  <span
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </span>
                </div>,
              );
            }
            nodes.push(
              <div className={"tarefas-header"} key={nodes.length}>
                <button
                  className={"btn-secondary-dash"}
                  onClick={(event) => {
                    handlers.abrirModalNovaTarefa();
                  }}
                  style={styleFrom("padding: 12px 25px;")}
                >
                  <i className={"fas fa-plus"}></i>
                  {" NOVA TAREFA\n            "}
                </button>
              </div>,
            );
            nodes.push(
              <div className={"tarefas-stats"} key={nodes.length}>
                <div className={"stat-card"}>
                  <div className={"stat-icon"}>
                    <i className={"fas fa-tasks"}></i>
                  </div>
                  <div className={"stat-info"}>
                    <h3>{stats.total || 0}</h3>
                    <p>{"Total de Tarefas"}</p>
                  </div>
                </div>
                <div className={"stat-card"}>
                  <div className={"stat-icon"}>
                    <i className={"fas fa-clock"}></i>
                  </div>
                  <div className={"stat-info"}>
                    <h3>{stats.ativas || 0}</h3>
                    <p>{"Tarefas Ativas"}</p>
                  </div>
                </div>
                <div className={"stat-card"}>
                  <div className={"stat-icon"}>
                    <i className={"fas fa-exclamation-triangle"}></i>
                  </div>
                  <div className={"stat-info"}>
                    <h3>{stats.atrasadas || 0}</h3>
                    <p>{"Atrasadas"}</p>
                  </div>
                </div>
              </div>,
            );
            nodes.push(
              <form
                method={"GET"}
                action={"/dashboard/tarefas"}
                key={nodes.length}
              >
                <div className={"filtros-tarefas"}>
                  <div className={"filtro-group"}>
                    <label>{"TURMA"}</label>
                    <select
                      name={"turma"}
                      className={"filtro-select"}
                      defaultValue={filtros.turma || ""}
                    >
                      <option value={""}>{"TODAS AS TURMAS"}</option>
                      <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                      <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                      <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                      <option value={"9º FUNDAMENTAL"}>
                        {"9º FUNDAMENTAL"}
                      </option>
                    </select>
                  </div>
                  <div className={"filtro-group"}>
                    <label>{"STATUS"}</label>
                    <select
                      name={"status"}
                      className={"filtro-select"}
                      defaultValue={filtros.status || ""}
                    >
                      <option value={""}>{"TODOS OS STATUS"}</option>
                      <option value={"ATIVA"}>{"ATIVA"}</option>
                      <option value={"CONCLUIDA"}>{"CONCLUÍDA"}</option>
                    </select>
                  </div>
                  <div
                    className={"filtro-group"}
                    style={styleFrom("flex: 0 0 auto;")}
                  >
                    <button type={"submit"} className={"btn-secondary-dash"}>
                      <i className={"fas fa-filter"}></i>
                      {" FILTRAR\n                    "}
                    </button>
                  </div>
                  <div
                    className={"filtro-group"}
                    style={styleFrom("flex: 0 0 auto;")}
                  >
                    <a
                      href={"/dashboard/tarefas"}
                      className={"btn-secondary-dash"}
                    >
                      <i className={"fas fa-times"}></i>
                      {" LIMPAR\n                    "}
                    </a>
                  </div>
                </div>
              </form>,
            );
            if (tarefas && tarefas.length > 0) {
              nodes.push(
                <div className={"tarefas-grid"} key={nodes.length}>
                  {(() => {
                    const nodes = [];
                    tarefas.forEach((tarefa) => {
                      let prioridadeClass = "media";
                      let prioridadeText = "MÉDIA";
                      if (tarefa.prioridade === "ALTA") {
                        prioridadeClass = "alta";
                        prioridadeText = "ALTA";
                      } else if (tarefa.prioridade === "BAIXA") {
                        prioridadeClass = "baixa";
                        prioridadeText = "BAIXA";
                      }
                      const totalAlunos = parseInt(tarefa.total_alunos) || 0;
                      const concluidas = parseInt(tarefa.concluidas) || 0;
                      const entregues = parseInt(tarefa.entregues) || 0;
                      const devolvidas = parseInt(tarefa.devolvidas) || 0;
                      const atrasadas = parseInt(tarefa.atrasadas) || 0;
                      const percentual =
                        totalAlunos > 0
                          ? Math.round((concluidas / totalAlunos) * 100)
                          : 0;
                      const hoje = new Date();
                      const dataEntrega = new Date(tarefa.data_entrega);
                      const isUrgente =
                        tarefa.data_entrega &&
                        dataEntrega < hoje &&
                        tarefa.status === "ATIVA";
                      nodes.push(
                        <div className={"tarefa-card"} key={nodes.length}>
                          <div
                            className={"tarefa-prioridade " + prioridadeClass}
                          >
                            {prioridadeText}
                          </div>
                          <div className={"tarefa-header"}>
                            <h3 className={"tarefa-titulo"}>{tarefa.titulo}</h3>
                            <span className={"tarefa-turma"}>
                              <i className={"fas fa-users"}></i>
                              {tarefa.turma}
                            </span>
                          </div>
                          <p className={"tarefa-descricao"}>
                            {tarefa.descricao || "Sem descrição"}
                          </p>
                          <div className={"tarefa-meta"}>
                            <div
                              className={
                                "tarefa-data " + (isUrgente ? "urgente" : "")
                              }
                            >
                              <i className={"far fa-calendar-alt"}></i>
                              {tarefa.data_entrega
                                ? new Date(
                                    tarefa.data_entrega,
                                  ).toLocaleDateString("pt-BR")
                                : "Sem data"}
                            </div>
                            <div className={"tarefa-data"}>
                              <i className={"fas fa-user"}></i>
                              {tarefa.professor_nome || "Professor"}
                            </div>
                          </div>
                          <div className={"tarefa-progresso"}>
                            <div className={"progresso-header"}>
                              <span>{"Progresso"}</span>
                              <span>
                                {concluidas}
                                {"/"}
                                {totalAlunos}
                              </span>
                            </div>
                            <div className={"progresso-bar"}>
                              <div
                                className={"progresso-fill"}
                                style={styleFrom("width: " + percentual + "%")}
                              ></div>
                            </div>
                          </div>
                          <div className={"tarefa-footer"}>
                            {(() => {
                              const nodes = [];
                              let statusTarefa = "PENDENTE";
                              let statusCor = "#d4a017";
                              let statusIcon = "fa-clock";
                              if (tarefa.status === "CONCLUIDA") {
                                statusTarefa = "CONCLUÍDA";
                                statusCor = "#217346";
                                statusIcon = "fa-check-circle";
                              } else if (
                                concluidas > 0 &&
                                concluidas === totalAlunos
                              ) {
                                statusTarefa = "CONCLUÍDA";
                                statusCor = "#217346";
                                statusIcon = "fa-check-circle";
                              } else if (entregues > 0) {
                                statusTarefa = "AGUARDANDO CORREÇÃO";
                                statusCor = "#217346";
                                statusIcon = "fa-hourglass-half";
                              } else if (devolvidas > 0) {
                                statusTarefa = "DEVOLVIDA";
                                statusCor = "#ffa500";
                                statusIcon = "fa-undo-alt";
                              } else if (atrasadas > 0) {
                                statusTarefa = "ATRASADA";
                                statusCor = "#ff0101";
                                statusIcon = "fa-exclamation-triangle";
                              }
                              nodes.push(
                                <div
                                  style={styleFrom(
                                    "display: flex; align-items: center; gap: 8px;",
                                  )}
                                  key={nodes.length}
                                >
                                  <i
                                    className={"fas " + statusIcon}
                                    style={styleFrom(
                                      "color: " + statusCor + ";",
                                    )}
                                  ></i>
                                  <span
                                    style={styleFrom(
                                      "color: " +
                                        statusCor +
                                        "; font-size: 0.8rem;",
                                    )}
                                  >
                                    {statusTarefa}
                                  </span>
                                </div>,
                              );
                              nodes.push(
                                <span
                                  style={styleFrom(
                                    "color: #666; font-size: 0.75rem;",
                                  )}
                                  key={nodes.length}
                                >
                                  {concluidas || 0}
                                  {"/"}
                                  {totalAlunos || 0}
                                </span>,
                              );
                              return nodes;
                            })()}
                          </div>
                          <div
                            className={"tarefa-acoes"}
                            style={styleFrom(
                              "margin-top: 15px; justify-content: flex-end;",
                            )}
                          >
                            {(() => {
                              const nodes = [];
                              nodes.push(
                                <button
                                  className={"btn-tarefa"}
                                  onClick={(event) => {
                                    handlers.verTarefa(tarefa.id);
                                  }}
                                  title={"Ver detalhes"}
                                  key={nodes.length}
                                >
                                  <i className={"fas fa-eye"}></i>
                                </button>,
                              );
                              nodes.push(
                                <button
                                  className={"btn-tarefa"}
                                  onClick={(event) => {
                                    handlers.editarTarefa(tarefa.id);
                                  }}
                                  title={"Editar"}
                                  key={nodes.length}
                                >
                                  <i
                                    className={"ph-bold ph-pen"}
                                    aria-hidden={"true"}
                                  ></i>
                                </button>,
                              );
                              nodes.push(
                                <button
                                  className={"btn-tarefa excluir"}
                                  onClick={(event) => {
                                    handlers.excluirTarefa(tarefa.id);
                                  }}
                                  title={"Excluir"}
                                  key={nodes.length}
                                >
                                  <i
                                    className={"ph-bold ph-trash"}
                                    aria-hidden={"true"}
                                  ></i>
                                </button>,
                              );
                              if (entregues > 0 && concluidas < entregues) {
                                nodes.push(
                                  <button
                                    className={"btn-tarefa"}
                                    onClick={(event) => {
                                      handlers.avaliarTarefa(tarefa.id);
                                    }}
                                    title={"Avaliar tarefas"}
                                    style={styleFrom(
                                      "border-color: #217346; color: #217346;",
                                    )}
                                    key={nodes.length}
                                  >
                                    <i className={"fas fa-star"}></i>
                                  </button>,
                                );
                              }
                              return nodes;
                            })()}
                          </div>
                        </div>,
                      );
                    });
                    return nodes;
                  })()}
                </div>,
              );
            } else {
              nodes.push(
                <div className={"empty-tarefas"} key={nodes.length}>
                  <i className={"fas fa-tasks"}></i>
                  <h3>{"Nenhuma tarefa encontrada"}</h3>
                  <p>{'Clique em "NOVA TAREFA" para começar.'}</p>
                </div>,
              );
            }
            nodes.push(
              <footer className={"dash-footer"} key={nodes.length}>
                <a href={"/dashboard/edit"} className={"btn-secondary-dash"}>
                  <i className={"fas fa-pencil-alt"}></i>
                  {" EDITOR DE NOTAS\n            "}
                </a>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI\n            "}</p>
                </div>
              </footer>,
            );
            return nodes;
          })()}
        </div>
        <div id={"novaTarefaModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom("max-width: 500px; padding: 30px;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("novaTarefaModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVA TAREFA\n        "}
            </h2>
            <div
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <button
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showTaskTab("geral");
                }}
                id={"btn-task-geral"}
              >
                {"GERAL"}
              </button>
              <button
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showTaskTab("config");
                }}
                id={"btn-task-config"}
              >
                {"AJUSTES"}
              </button>
              <button
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showTaskTab("alunos");
                }}
                id={"btn-task-alunos"}
              >
                {"ALUNOS"}
              </button>
            </div>
            <form
              action={"/dashboard/tarefas/criar"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div id={"taskGeralTab"} className={"tab-content active"}>
                <div className={"filter-options"}>
                  <label style={styleFrom("margin-top: 0;")}>
                    {"TÍTULO DA ATIVIDADE"}
                  </label>
                  <input
                    type={"text"}
                    name={"titulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"DESCRIÇÃO DETALHADA"}
                  </label>
                  <textarea
                    name={"descricao"}
                    className={"filter-input"}
                    rows={"5"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></textarea>
                </div>
              </div>
              <div
                id={"taskConfigTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <div className={"filter-options"}>
                  <div
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;",
                    )}
                  >
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"TURMA"}
                      </label>
                      <select
                        name={"turma"}
                        id={"turmaSelect"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      >
                        <option value={""}>{"SELECIONE"}</option>
                        <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                        <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                        <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                        <option value={"9º FUNDAMENTAL"}>
                          {"9º FUNDAMENTAL"}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"DATA LIMITE"}
                      </label>
                      <input
                        type={"date"}
                        name={"data_entrega"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </div>
                  </div>
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"COMPETÊNCIA ALVO"}
                  </label>
                  <select
                    name={"competencia_id"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    {(() => {
                      const nodes = [];
                      nodes.push(
                        <option value={""} key={nodes.length}>
                          {"NENHUMA ESPECÍFICA"}
                        </option>,
                      );
                      if (listaCompetencias && listaCompetencias.length > 0) {
                        listaCompetencias.forEach((comp) => {
                          nodes.push(
                            <option value={comp.id} key={nodes.length}>
                              {comp.nome}
                            </option>,
                          );
                        });
                      }
                      return nodes;
                    })()}
                  </select>
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"NÍVEL DE PRIORIDADE"}
                  </label>
                  <select
                    name={"prioridade"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <option value={"BAIXA"}>{"BAIXA"}</option>
                    <option value={"MEDIA"}>{"MÉDIA"}</option>
                    <option value={"ALTA"}>{"ALTA"}</option>
                  </select>
                </div>
              </div>
              <div
                id={"taskAlunosTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <div className={"filter-options"}>
                  <label
                    style={styleFrom(
                      "display:flex; align-items:center; gap:10px; cursor:pointer; background: var(--bg-secondary); padding: 12px; border-radius: 10px; margin-top: 0;",
                    )}
                  >
                    <input
                      type={"checkbox"}
                      id={"selecionarTodosAlunos"}
                      onClick={(event) => {
                        handlers.toggleTodosAlunos();
                      }}
                      style={styleFrom(
                        "width:16px; height:16px; accent-color: var(--primary-red);",
                      )}
                    />
                    <span
                      style={styleFrom(
                        "color:var(--text-white); font-size: 0.75rem; letter-spacing: 0.5px;",
                      )}
                    >
                      {"VINCULAR A TURMA TODA"}
                    </span>
                  </label>
                  <div
                    className={"alunos-tarefa"}
                    style={styleFrom(
                      "max-height: 200px; overflow-y: auto; margin-top: 15px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border-color); padding: 10px;",
                    )}
                  >
                    {(() => {
                      const nodes = [];
                      alunos.forEach((aluno) => {
                        nodes.push(
                          <div
                            className={"aluno-tarefa-item"}
                            data-turma={aluno.ano_escolar}
                            style={styleFrom("margin-bottom: 0;")}
                            key={nodes.length}
                          >
                            <label
                              style={styleFrom(
                                "display:flex; align-items:center; gap:10px; cursor:pointer; flex:1; margin-top:2px",
                              )}
                            >
                              <input
                                type={"checkbox"}
                                name={"alunos"}
                                defaultValue={aluno.id}
                                className={"aluno-checkbox"}
                                style={styleFrom(
                                  "width:15px; height:15px; accent-color: var(--primary-red);",
                                )}
                              />
                              <div className={"aluno-tarefa-info"}>
                                <h4
                                  style={styleFrom(
                                    "font-size: 0.8rem; color: #fff;",
                                  )}
                                >
                                  {aluno.nome}
                                </h4>
                                <p
                                  style={styleFrom(
                                    "font-size: 0.65rem; color: var(--text-gray);",
                                  )}
                                >
                                  {aluno.ano_escolar}
                                </p>
                              </div>
                            </label>
                          </div>,
                        );
                      });
                      return nodes;
                    })()}
                  </div>
                </div>
              </div>
              <button
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <i className={"fas fa-save"}></i>
                {" PUBLICAR ATIVIDADE\n            "}
              </button>
            </form>
          </div>
        </div>
        <div id={"verTarefaModal"} className={"modal-overlay"}>
          <div className={"modal-content modal-lg"}>
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("verTarefaModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"}>{"DETALHES DA TAREFA"}</h2>
            <div id={"tarefaDetalhes"} className={"filter-options"}></div>
          </div>
        </div>
        <div id={"avaliarTarefaModal"} className={"modal-overlay"}>
          <div className={"modal-content modal-lg"}>
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("avaliarTarefaModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2 className={"section-title-2"}>{"AVALIAR TAREFA"}</h2>
            <div
              id={"avaliarTarefaConteudo"}
              className={"filter-options"}
            ></div>
          </div>
        </div>
        <div id={"editarTarefaModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom("max-width: 500px; padding: 30px;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("editarTarefaModal");
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <h2
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n                EDITAR TAREFA\n            "}
            </h2>
            <div
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <button
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showEditTaskTab("geral");
                }}
                id={"btn-edit-task-geral"}
              >
                {"CONTEÚDO"}
              </button>
              <button
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showEditTaskTab("config");
                }}
                id={"btn-edit-task-config"}
              >
                {"CONFIGURAÇÕES"}
              </button>
            </div>
            <form
              id={"editarTarefaForm"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <input type={"hidden"} name={"_csrf"} value={csrfToken} />
              <div id={"editTaskGeralTab"} className={"tab-content active"}>
                <div className={"filter-options"}>
                  <label style={styleFrom("margin-top: 0;")}>{"TÍTULO"}</label>
                  <input
                    type={"text"}
                    name={"titulo"}
                    id={"editTitulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"DESCRIÇÃO"}
                  </label>
                  <textarea
                    name={"descricao"}
                    id={"editDescricao"}
                    className={"filter-input"}
                    rows={"6"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></textarea>
                </div>
              </div>
              <div
                id={"editTaskConfigTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <div className={"filter-options"}>
                  <div
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;",
                    )}
                  >
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"ENTREGA"}
                      </label>
                      <input
                        type={"date"}
                        name={"data_entrega"}
                        id={"editDataEntrega"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </div>
                    <div>
                      <label style={styleFrom("margin-top: 0;")}>
                        {"PRIORIDADE"}
                      </label>
                      <select
                        name={"prioridade"}
                        id={"editPrioridade"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      >
                        <option value={"BAIXA"}>{"BAIXA"}</option>
                        <option value={"MEDIA"}>{"MÉDIA"}</option>
                        <option value={"ALTA"}>{"ALTA"}</option>
                      </select>
                    </div>
                  </div>
                  <label style={styleFrom("margin-top: 15px;")}>
                    {"STATUS DA ATIVIDADE"}
                  </label>
                  <select
                    name={"status"}
                    id={"editStatus"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <option value={"ATIVA"}>{"ATIVA"}</option>
                    <option value={"CONCLUIDA"}>{"CONCLUÍDA"}</option>
                  </select>
                </div>
              </div>
              <button
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <i className={"fas fa-save"}></i>
                {" ATUALIZAR TAREFA\n                "}
              </button>
            </form>
          </div>
        </div>
        <form
          id={"excluirTarefaForm"}
          method={"POST"}
          style={styleFrom("display:none")}
        >
          <input type={"hidden"} name={"_csrf"} value={csrfToken} />
        </form>
      </React.Fragment>
    </>
  );
}
