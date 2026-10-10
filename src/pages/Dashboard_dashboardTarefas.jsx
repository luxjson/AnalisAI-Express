import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
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
        <LoadingElement as="div" className={"main-layout"} root={true}>
          {(() => {
            const nodes = [];
            nodes.push(
              <PageHeader key="page-header" data={data} handlers={handlers} />,
            );
            if (success_msg && success_msg.length > 0) {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"alert alert-success"}
                  key={nodes.length}
                >
                  <LoadingValue
                    slot="dashboard/dashboardTarefas:1"
                    width="12ch"
                    known={false}
                    value={success_msg}
                  />
                  <LoadingElement
                    as="span"
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </LoadingElement>
                </LoadingElement>,
              );
            }
            if (error_msg && error_msg.length > 0) {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"alert alert-error"}
                  key={nodes.length}
                >
                  <LoadingValue
                    slot="dashboard/dashboardTarefas:2"
                    width="12ch"
                    known={false}
                    value={error_msg}
                  />
                  <LoadingElement
                    as="span"
                    className={"close-alert"}
                    onClick={(event) => {
                      event.currentTarget.parentElement.style.display = "none";
                    }}
                  >
                    {"×"}
                  </LoadingElement>
                </LoadingElement>,
              );
            }
            nodes.push(
              <LoadingElement
                as="div"
                className={"tarefas-header"}
                key={nodes.length}
              >
                <LoadingElement
                  as="button"
                  className={"btn-secondary-dash"}
                  onClick={(event) => {
                    handlers.abrirModalNovaTarefa();
                  }}
                  style={styleFrom("padding: 12px 25px;")}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-plus"}
                  ></LoadingElement>
                  {" NOVA TAREFA\n            "}
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                className={"tarefas-stats"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"stat-card"}>
                  <LoadingElement as="div" className={"stat-icon"}>
                    <LoadingElement
                      as="i"
                      className={"fas fa-tasks"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"stat-info"}>
                    <LoadingElement as="h3">
                      <LoadingValue
                        slot="dashboard/dashboardTarefas:3"
                        width="3ch"
                        known={false}
                        value={stats.total || 0}
                      />
                    </LoadingElement>
                    <LoadingElement as="p">{"Total de Tarefas"}</LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stat-card"}>
                  <LoadingElement as="div" className={"stat-icon"}>
                    <LoadingElement
                      as="i"
                      className={"fas fa-clock"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"stat-info"}>
                    <LoadingElement as="h3">
                      <LoadingValue
                        slot="dashboard/dashboardTarefas:4"
                        width="12ch"
                        known={false}
                        value={stats.ativas || 0}
                      />
                    </LoadingElement>
                    <LoadingElement as="p">{"Tarefas Ativas"}</LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stat-card"}>
                  <LoadingElement as="div" className={"stat-icon"}>
                    <LoadingElement
                      as="i"
                      className={"fas fa-exclamation-triangle"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"stat-info"}>
                    <LoadingElement as="h3">
                      <LoadingValue
                        slot="dashboard/dashboardTarefas:5"
                        width="3ch"
                        known={false}
                        value={stats.atrasadas || 0}
                      />
                    </LoadingElement>
                    <LoadingElement as="p">{"Atrasadas"}</LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="form"
                method={"GET"}
                action={"/dashboard/tarefas"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"filtros-tarefas"}>
                  <LoadingElement as="div" className={"filtro-group"}>
                    <LoadingElement as="label">{"TURMA"}</LoadingElement>
                    <LoadingElement
                      as="select"
                      name={"turma"}
                      className={"filtro-select"}
                      defaultValue={filtros.turma || ""}
                    >
                      <LoadingElement as="option" value={""}>
                        {"TODAS AS TURMAS"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"1º MÉDIO"}>
                        {"1º MÉDIO"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"2º MÉDIO"}>
                        {"2º MÉDIO"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"3º MÉDIO"}>
                        {"3º MÉDIO"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"9º FUNDAMENTAL"}>
                        {"9º FUNDAMENTAL"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"filtro-group"}>
                    <LoadingElement as="label">{"STATUS"}</LoadingElement>
                    <LoadingElement
                      as="select"
                      name={"status"}
                      className={"filtro-select"}
                      defaultValue={filtros.status || ""}
                    >
                      <LoadingElement as="option" value={""}>
                        {"TODOS OS STATUS"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"ATIVA"}>
                        {"ATIVA"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"CONCLUIDA"}>
                        {"CONCLUÍDA"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"filtro-group"}
                    style={styleFrom("flex: 0 0 auto;")}
                  >
                    <LoadingElement
                      as="button"
                      type={"submit"}
                      className={"btn-secondary-dash"}
                    >
                      <LoadingElement
                        as="i"
                        className={"fas fa-filter"}
                      ></LoadingElement>
                      {" FILTRAR\n                    "}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"filtro-group"}
                    style={styleFrom("flex: 0 0 auto;")}
                  >
                    <LoadingElement
                      as="a"
                      href={"/dashboard/tarefas"}
                      className={"btn-secondary-dash"}
                    >
                      <LoadingElement
                        as="i"
                        className={"fas fa-times"}
                      ></LoadingElement>
                      {" LIMPAR\n                    "}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            if (tarefas && tarefas.length > 0) {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"tarefas-grid"}
                  key={nodes.length}
                >
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
                        <LoadingElement
                          as="div"
                          className={"tarefa-card"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="div"
                            className={"tarefa-prioridade " + prioridadeClass}
                            tone={true}
                          >
                            <LoadingValue
                              slot="dashboard/dashboardTarefas:6"
                              width="3ch"
                              known={false}
                              value={prioridadeText}
                            />
                          </LoadingElement>
                          <LoadingElement as="div" className={"tarefa-header"}>
                            <LoadingElement as="h3" className={"tarefa-titulo"}>
                              <LoadingValue
                                slot="dashboard/dashboardTarefas:7"
                                width="min(18ch, 100%)"
                                known={false}
                                value={tarefa.titulo}
                              />
                            </LoadingElement>
                            <LoadingElement
                              as="span"
                              className={"tarefa-turma"}
                            >
                              <LoadingElement
                                as="i"
                                className={"fas fa-users"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardTarefas:8"
                                width="12ch"
                                known={false}
                                value={tarefa.turma}
                              />
                            </LoadingElement>
                          </LoadingElement>
                          <LoadingElement as="p" className={"tarefa-descricao"}>
                            <LoadingValue
                              slot="dashboard/dashboardTarefas:9"
                              width="min(32ch, 100%)"
                              known={false}
                              value={tarefa.descricao || "Sem descrição"}
                            />
                          </LoadingElement>
                          <LoadingElement as="div" className={"tarefa-meta"}>
                            <LoadingElement
                              as="div"
                              className={
                                "tarefa-data " + (isUrgente ? "urgente" : "")
                              }
                              tone={true}
                            >
                              <LoadingElement
                                as="i"
                                className={"far fa-calendar-alt"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardTarefas:10"
                                width="10ch"
                                known={false}
                                value={
                                  tarefa.data_entrega
                                    ? new Date(
                                        tarefa.data_entrega,
                                      ).toLocaleDateString("pt-BR")
                                    : "Sem data"
                                }
                              />
                            </LoadingElement>
                            <LoadingElement as="div" className={"tarefa-data"}>
                              <LoadingElement
                                as="i"
                                className={"fas fa-user"}
                              ></LoadingElement>
                              <LoadingValue
                                slot="dashboard/dashboardTarefas:11"
                                width="min(18ch, 100%)"
                                known={false}
                                value={tarefa.professor_nome || "Professor"}
                              />
                            </LoadingElement>
                          </LoadingElement>
                          <LoadingElement
                            as="div"
                            className={"tarefa-progresso"}
                          >
                            <LoadingElement
                              as="div"
                              className={"progresso-header"}
                            >
                              <LoadingElement as="span">
                                {"Progresso"}
                              </LoadingElement>
                              <LoadingElement as="span">
                                <LoadingValue
                                  slot="dashboard/dashboardTarefas:12"
                                  width="3ch"
                                  known={false}
                                  value={concluidas}
                                />
                                {"/"}
                                <LoadingValue
                                  slot="dashboard/dashboardTarefas:13"
                                  width="3ch"
                                  known={false}
                                  value={totalAlunos}
                                />
                              </LoadingElement>
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"progresso-bar"}
                            >
                              <LoadingElement
                                as="div"
                                className={"progresso-fill"}
                                style={styleFrom("width: " + percentual + "%")}
                                fill={true}
                              ></LoadingElement>
                            </LoadingElement>
                          </LoadingElement>
                          <LoadingElement as="div" className={"tarefa-footer"}>
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
                                <LoadingElement
                                  as="div"
                                  style={styleFrom(
                                    "display: flex; align-items: center; gap: 8px;",
                                  )}
                                  key={nodes.length}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"fas " + statusIcon}
                                    style={styleFrom(
                                      "color: " + statusCor + ";",
                                    )}
                                    tone={true}
                                  ></LoadingElement>
                                  <LoadingElement
                                    as="span"
                                    style={styleFrom(
                                      "color: " +
                                        statusCor +
                                        "; font-size: 0.8rem;",
                                    )}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardTarefas:14"
                                      width="12ch"
                                      known={false}
                                      value={statusTarefa}
                                    />
                                  </LoadingElement>
                                </LoadingElement>,
                              );
                              nodes.push(
                                <LoadingElement
                                  as="span"
                                  style={styleFrom(
                                    "color: #666; font-size: 0.75rem;",
                                  )}
                                  key={nodes.length}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardTarefas:15"
                                    width="3ch"
                                    known={false}
                                    value={concluidas || 0}
                                  />
                                  {"/"}
                                  <LoadingValue
                                    slot="dashboard/dashboardTarefas:16"
                                    width="3ch"
                                    known={false}
                                    value={totalAlunos || 0}
                                  />
                                </LoadingElement>,
                              );
                              return nodes;
                            })()}
                          </LoadingElement>
                          <LoadingElement
                            as="div"
                            className={"tarefa-acoes"}
                            style={styleFrom(
                              "margin-top: 15px; justify-content: flex-end;",
                            )}
                          >
                            {(() => {
                              const nodes = [];
                              nodes.push(
                                <LoadingElement
                                  as="button"
                                  className={"btn-tarefa"}
                                  onClick={(event) => {
                                    handlers.verTarefa(tarefa.id);
                                  }}
                                  title={"Ver detalhes"}
                                  key={nodes.length}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"fas fa-eye"}
                                  ></LoadingElement>
                                </LoadingElement>,
                              );
                              nodes.push(
                                <LoadingElement
                                  as="button"
                                  className={"btn-tarefa"}
                                  onClick={(event) => {
                                    handlers.editarTarefa(tarefa.id);
                                  }}
                                  title={"Editar"}
                                  key={nodes.length}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-pen"}
                                    aria-hidden={"true"}
                                  ></LoadingElement>
                                </LoadingElement>,
                              );
                              nodes.push(
                                <LoadingElement
                                  as="button"
                                  className={"btn-tarefa excluir"}
                                  onClick={(event) => {
                                    handlers.excluirTarefa(tarefa.id);
                                  }}
                                  title={"Excluir"}
                                  key={nodes.length}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-trash"}
                                    aria-hidden={"true"}
                                  ></LoadingElement>
                                </LoadingElement>,
                              );
                              if (entregues > 0 && concluidas < entregues) {
                                nodes.push(
                                  <LoadingElement
                                    as="button"
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
                                    <LoadingElement
                                      as="i"
                                      className={"fas fa-star"}
                                    ></LoadingElement>
                                  </LoadingElement>,
                                );
                              }
                              return nodes;
                            })()}
                          </LoadingElement>
                        </LoadingElement>,
                      );
                    });
                    return nodes;
                  })()}
                </LoadingElement>,
              );
            } else {
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"empty-tarefas"}
                  key={nodes.length}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-tasks"}
                  ></LoadingElement>
                  <LoadingElement as="h3">
                    {"Nenhuma tarefa encontrada"}
                  </LoadingElement>
                  <LoadingElement as="p">
                    {'Clique em "NOVA TAREFA" para começar.'}
                  </LoadingElement>
                </LoadingElement>,
              );
            }
            nodes.push(
              <LoadingElement
                as="footer"
                className={"dash-footer"}
                key={nodes.length}
              >
                <LoadingElement
                  as="a"
                  href={"/dashboard/edit"}
                  className={"btn-secondary-dash"}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-pencil-alt"}
                  ></LoadingElement>
                  {" EDITOR DE NOTAS\n            "}
                </LoadingElement>
                <LoadingElement as="div" className={"footer-credits"}>
                  <LoadingElement as="p">
                    {"© 2026 AnalisAI\n            "}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            return nodes;
          })()}
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"novaTarefaModal"}
          className={"modal-overlay"}
        >
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom("max-width: 500px; padding: 30px;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("novaTarefaModal");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="h2"
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n            NOVA TAREFA\n        "}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showTaskTab("geral");
                }}
                id={"btn-task-geral"}
              >
                {"GERAL"}
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showTaskTab("config");
                }}
                id={"btn-task-config"}
              >
                {"AJUSTES"}
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showTaskTab("alunos");
                }}
                id={"btn-task-alunos"}
              >
                {"ALUNOS"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="form"
              action={"/dashboard/tarefas/criar"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement
                as="div"
                id={"taskGeralTab"}
                className={"tab-content active"}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 0;")}
                  >
                    {"TÍTULO DA ATIVIDADE"}
                  </LoadingElement>
                  <LoadingElement
                    as="input"
                    type={"text"}
                    name={"titulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"DESCRIÇÃO DETALHADA"}
                  </LoadingElement>
                  <LoadingElement
                    as="textarea"
                    name={"descricao"}
                    className={"filter-input"}
                    rows={"5"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"taskConfigTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;",
                    )}
                  >
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"TURMA"}
                      </LoadingElement>
                      <LoadingElement
                        as="select"
                        name={"turma"}
                        id={"turmaSelect"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                        required={true}
                      >
                        <LoadingElement as="option" value={""}>
                          {"SELECIONE"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"1º MÉDIO"}>
                          {"1º MÉDIO"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"2º MÉDIO"}>
                          {"2º MÉDIO"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"3º MÉDIO"}>
                          {"3º MÉDIO"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"9º FUNDAMENTAL"}>
                          {"9º FUNDAMENTAL"}
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"DATA LIMITE"}
                      </LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"date"}
                        name={"data_entrega"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"COMPETÊNCIA ALVO"}
                  </LoadingElement>
                  <LoadingElement
                    as="select"
                    name={"competencia_id"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                    options={true}
                  >
                    {(() => {
                      const nodes = [];
                      nodes.push(
                        <LoadingElement
                          as="option"
                          value={""}
                          key={nodes.length}
                        >
                          {"NENHUMA ESPECÍFICA"}
                        </LoadingElement>,
                      );
                      if (listaCompetencias && listaCompetencias.length > 0) {
                        listaCompetencias.forEach((comp) => {
                          nodes.push(
                            <LoadingElement
                              as="option"
                              value={comp.id}
                              key={nodes.length}
                            >
                              {comp.nome}
                            </LoadingElement>,
                          );
                        });
                      }
                      return nodes;
                    })()}
                  </LoadingElement>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"NÍVEL DE PRIORIDADE"}
                  </LoadingElement>
                  <LoadingElement
                    as="select"
                    name={"prioridade"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <LoadingElement as="option" value={"BAIXA"}>
                      {"BAIXA"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"MEDIA"}>
                      {"MÉDIA"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"ALTA"}>
                      {"ALTA"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"taskAlunosTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="label"
                    style={styleFrom(
                      "display:flex; align-items:center; gap:10px; cursor:pointer; background: var(--bg-secondary); padding: 12px; border-radius: 10px; margin-top: 0;",
                    )}
                  >
                    <LoadingElement
                      as="input"
                      type={"checkbox"}
                      id={"selecionarTodosAlunos"}
                      onClick={(event) => {
                        handlers.toggleTodosAlunos();
                      }}
                      style={styleFrom(
                        "width:16px; height:16px; accent-color: var(--primary-red);",
                      )}
                    />
                    <LoadingElement
                      as="span"
                      style={styleFrom(
                        "color:var(--text-white); font-size: 0.75rem; letter-spacing: 0.5px;",
                      )}
                    >
                      {"VINCULAR A TURMA TODA"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"alunos-tarefa"}
                    style={styleFrom(
                      "max-height: 200px; overflow-y: auto; margin-top: 15px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border-color); padding: 10px;",
                    )}
                  >
                    {(() => {
                      const nodes = [];
                      alunos.forEach((aluno) => {
                        nodes.push(
                          <LoadingElement
                            as="div"
                            className={"aluno-tarefa-item"}
                            data-turma={aluno.ano_escolar}
                            style={styleFrom("margin-bottom: 0;")}
                            key={nodes.length}
                          >
                            <LoadingElement
                              as="label"
                              style={styleFrom(
                                "display:flex; align-items:center; gap:10px; cursor:pointer; flex:1; margin-top:2px",
                              )}
                            >
                              <LoadingElement
                                as="input"
                                type={"checkbox"}
                                name={"alunos"}
                                defaultValue={aluno.id}
                                className={"aluno-checkbox"}
                                style={styleFrom(
                                  "width:15px; height:15px; accent-color: var(--primary-red);",
                                )}
                              />
                              <LoadingElement
                                as="div"
                                className={"aluno-tarefa-info"}
                              >
                                <LoadingElement
                                  as="h4"
                                  style={styleFrom(
                                    "font-size: 0.8rem; color: #fff;",
                                  )}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardTarefas:17"
                                    width="min(18ch, 100%)"
                                    known={true}
                                    value={aluno.nome}
                                  />
                                </LoadingElement>
                                <LoadingElement
                                  as="p"
                                  style={styleFrom(
                                    "font-size: 0.65rem; color: var(--text-gray);",
                                  )}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardTarefas:18"
                                    width="12ch"
                                    known={true}
                                    value={aluno.ano_escolar}
                                  />
                                </LoadingElement>
                              </LoadingElement>
                            </LoadingElement>
                          </LoadingElement>,
                        );
                      });
                      return nodes;
                    })()}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-save"}
                ></LoadingElement>
                {" PUBLICAR ATIVIDADE\n            "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"verTarefaModal"}
          className={"modal-overlay"}
        >
          <LoadingElement as="div" className={"modal-content modal-lg"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("verTarefaModal");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="h2" className={"section-title-2"}>
              {"DETALHES DA TAREFA"}
            </LoadingElement>
            <LoadingElement
              as="div"
              id={"tarefaDetalhes"}
              className={"filter-options"}
            ></LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"avaliarTarefaModal"}
          className={"modal-overlay"}
        >
          <LoadingElement as="div" className={"modal-content modal-lg"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("avaliarTarefaModal");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="h2" className={"section-title-2"}>
              {"AVALIAR TAREFA"}
            </LoadingElement>
            <LoadingElement
              as="div"
              id={"avaliarTarefaConteudo"}
              className={"filter-options"}
            ></LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"editarTarefaModal"}
          className={"modal-overlay"}
        >
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom("max-width: 500px; padding: 30px;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModal("editarTarefaModal");
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="h2"
              className={"section-title-2"}
              style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
            >
              {"\n                EDITAR TAREFA\n            "}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"edit-tabs"}
              style={styleFrom(
                "display: grid; grid-template-columns: 1fr 1fr; gap: 5px; border-bottom: none;",
              )}
            >
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn active"}
                onClick={(event) => {
                  handlers.showEditTaskTab("geral");
                }}
                id={"btn-edit-task-geral"}
              >
                {"CONTEÚDO"}
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"button"}
                className={"tab-btn"}
                onClick={(event) => {
                  handlers.showEditTaskTab("config");
                }}
                id={"btn-edit-task-config"}
              >
                {"CONFIGURAÇÕES"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="form"
              id={"editarTarefaForm"}
              method={"POST"}
              style={styleFrom(
                "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
              )}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement
                as="div"
                id={"editTaskGeralTab"}
                className={"tab-content active"}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 0;")}
                  >
                    {"TÍTULO"}
                  </LoadingElement>
                  <LoadingElement
                    as="input"
                    type={"text"}
                    name={"titulo"}
                    id={"editTitulo"}
                    className={"filter-input"}
                    style={styleFrom("padding: 12px;")}
                    required={true}
                  />
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"DESCRIÇÃO"}
                  </LoadingElement>
                  <LoadingElement
                    as="textarea"
                    name={"descricao"}
                    id={"editDescricao"}
                    className={"filter-input"}
                    rows={"6"}
                    style={styleFrom("padding: 12px; resize: none;")}
                    defaultValue={""}
                  ></LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"editTaskConfigTab"}
                className={"tab-content"}
                style={styleFrom("display: none;")}
              >
                <LoadingElement as="div" className={"filter-options"}>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;",
                    )}
                  >
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"ENTREGA"}
                      </LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"date"}
                        name={"data_entrega"}
                        id={"editDataEntrega"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      />
                    </LoadingElement>
                    <LoadingElement as="div">
                      <LoadingElement
                        as="label"
                        style={styleFrom("margin-top: 0;")}
                      >
                        {"PRIORIDADE"}
                      </LoadingElement>
                      <LoadingElement
                        as="select"
                        name={"prioridade"}
                        id={"editPrioridade"}
                        className={"filter-input"}
                        style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                      >
                        <LoadingElement as="option" value={"BAIXA"}>
                          {"BAIXA"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"MEDIA"}>
                          {"MÉDIA"}
                        </LoadingElement>
                        <LoadingElement as="option" value={"ALTA"}>
                          {"ALTA"}
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="label"
                    style={styleFrom("margin-top: 15px;")}
                  >
                    {"STATUS DA ATIVIDADE"}
                  </LoadingElement>
                  <LoadingElement
                    as="select"
                    name={"status"}
                    id={"editStatus"}
                    className={"filter-input"}
                    style={styleFrom("padding: 10px; font-size: 0.8rem;")}
                  >
                    <LoadingElement as="option" value={"ATIVA"}>
                      {"ATIVA"}
                    </LoadingElement>
                    <LoadingElement as="option" value={"CONCLUIDA"}>
                      {"CONCLUÍDA"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                type={"submit"}
                className={"btn-secondary-dash"}
                style={styleFrom(
                  "margin-top: 25px; width: 100%; height: 50px; justify-content: center; font-size: 0.8rem;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-save"}
                ></LoadingElement>
                {" ATUALIZAR TAREFA\n                "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="form"
          id={"excluirTarefaForm"}
          method={"POST"}
          style={styleFrom("display:none")}
        >
          <LoadingElement
            as="input"
            type={"hidden"}
            name={"_csrf"}
            value={csrfToken}
          />
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
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
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Gerenciar Tarefas\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardTarefas:19"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="span"
              className={"user-role"}
              style={styleFrom("color: #888888;")}
            >
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardTarefas:20"
                  width="12ch"
                  known={true}
                  value={userCargo}
                />
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement as="div" className={"header-actions"}>
          <Partials_notificacoes
            data={{
              ...data,
              ...{
                notificacaoClasse: "header-icon",
              },
            }}
            handlers={handlers}
          />
        </LoadingElement>
      </LoadingElement>
    </LoadingElement>
  );
}
