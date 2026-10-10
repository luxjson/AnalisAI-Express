import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Aluno_alunoTarefas({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    success_msg = null,
    error_msg = null,
    stats = {},
    tarefas = [],
    csrfToken = null,
  } = data;
  return (
    <>
      <React.Fragment>
        <Partials_barAluno
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <LoadingElement as="div" className={"main-layout"} root={true}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <LoadingElement as="main" className={"dash-content"}>
            {(() => {
              const nodes = [];
              nodes.push(
                <LoadingElement
                  as="section"
                  className={"welcome-banner"}
                  style={styleFrom(
                    "background: linear-gradient(90deg, #1b5e38 0%, #217346 100%);",
                  )}
                  key={nodes.length}
                >
                  <LoadingElement as="div" className={"banner-text"}>
                    <LoadingElement as="h1">
                      <LoadingElement
                        as="i"
                        className={"fas fa-tasks"}
                      ></LoadingElement>
                      {" Minhas Tarefas"}
                    </LoadingElement>
                    <LoadingElement as="p">
                      {
                        "Gerencie suas entregas, acompanhe prazos e visualize os feedbacks dos seus professores em um só lugar."
                      }
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>,
              );
              if (success_msg && success_msg.length > 0) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"alert alert-success"}
                    style={styleFrom("margin-bottom: 25px;")}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-check-circle"}
                    ></LoadingElement>
                    <LoadingValue
                      slot="aluno/alunoTarefas:1"
                      width="12ch"
                      known={false}
                      value={success_msg}
                    />
                  </LoadingElement>,
                );
              }
              if (error_msg && error_msg.length > 0) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"alert alert-error"}
                    style={styleFrom("margin-bottom: 25px;")}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-exclamation-triangle"}
                    ></LoadingElement>
                    <LoadingValue
                      slot="aluno/alunoTarefas:2"
                      width="12ch"
                      known={false}
                      value={error_msg}
                    />
                  </LoadingElement>,
                );
              }
              nodes.push(
                <LoadingElement
                  as="section"
                  className={"section-container"}
                  key={nodes.length}
                >
                  <LoadingElement as="div" className={"dash-grid"}>
                    <LoadingElement as="div" className={"stats-card"}>
                      <LoadingElement as="h3">{"TOTAL"}</LoadingElement>
                      <LoadingElement as="p" className={"stats-number"}>
                        <LoadingValue
                          slot="aluno/alunoTarefas:3"
                          width="3ch"
                          known={false}
                          value={stats.total || 0}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"stats-card desenvolvimento"}
                    >
                      <LoadingElement as="h3">{"PENDENTES"}</LoadingElement>
                      <LoadingElement as="p" className={"stats-number"}>
                        <LoadingValue
                          slot="aluno/alunoTarefas:4"
                          width="3ch"
                          known={false}
                          value={stats.pendentes || 0}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"stats-card"}
                      style={styleFrom("border-left: 6px solid #70b5f9;")}
                    >
                      <LoadingElement as="h3">{"AGUARDANDO"}</LoadingElement>
                      <LoadingElement as="p" className={"stats-number"}>
                        <LoadingValue
                          slot="aluno/alunoTarefas:5"
                          width="3ch"
                          known={false}
                          value={stats.aguardando || 0}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"stats-card apto"}>
                      <LoadingElement as="h3">{"CONCLUÍDAS"}</LoadingElement>
                      <LoadingElement as="p" className={"stats-number"}>
                        <LoadingValue
                          slot="aluno/alunoTarefas:6"
                          width="3ch"
                          known={false}
                          value={stats.concluidas || 0}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"stats-card inapto"}>
                      <LoadingElement as="h3">{"ATRASADAS"}</LoadingElement>
                      <LoadingElement as="p" className={"stats-number"}>
                        <LoadingValue
                          slot="aluno/alunoTarefas:7"
                          width="3ch"
                          known={false}
                          value={stats.atrasadas || 0}
                        />
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>,
              );
              nodes.push(
                <LoadingElement
                  as="section"
                  className={"section-container"}
                  key={nodes.length}
                >
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <LoadingElement
                        as="h2"
                        className={"section-title-2"}
                        key={nodes.length}
                      >
                        {" LISTA DE ATIVIDADES"}
                      </LoadingElement>,
                    );
                    if (tarefas && tarefas.length > 0) {
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"dash-grid"}
                          key={nodes.length}
                        >
                          {(() => {
                            const nodes = [];
                            tarefas.forEach((tarefa) => {
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
                              const isUrgent =
                                tarefa.data_limite &&
                                dataLimite < hoje &&
                                tarefa.status === "PENDENTE";
                              nodes.push(
                                <LoadingElement
                                  as="div"
                                  className={"stats-card"}
                                  style={styleFrom(
                                    "border-left: 6px solid " +
                                      statusColor +
                                      "; display: flex; flex-direction: column; gap: 15px; padding: 30px;",
                                  )}
                                  key={nodes.length}
                                >
                                  {(() => {
                                    const nodes = [];
                                    nodes.push(
                                      <LoadingElement
                                        as="div"
                                        style={styleFrom(
                                          "display: flex; justify-content: space-between; align-items: center;",
                                        )}
                                        key={nodes.length}
                                      >
                                        {(() => {
                                          const nodes = [];
                                          nodes.push(
                                            <LoadingElement
                                              as="span"
                                              className={
                                                "media-nota " + statusClass
                                              }
                                              style={styleFrom(
                                                "font-size: 0.7rem; padding: 4px 12px; letter-spacing: 1px;",
                                              )}
                                              key={nodes.length}
                                              tone={true}
                                            >
                                              <LoadingValue
                                                slot="aluno/alunoTarefas:8"
                                                width="12ch"
                                                known={false}
                                                value={statusLabel}
                                              />
                                            </LoadingElement>,
                                          );
                                          if (tarefa.data_limite) {
                                            nodes.push(
                                              <LoadingElement
                                                as="span"
                                                style={styleFrom(
                                                  "font-size: 0.75rem; color: " +
                                                    (isUrgent
                                                      ? "var(--color-inapto)"
                                                      : "var(--text-muted)"),
                                                )}
                                                key={nodes.length}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "far fa-calendar-alt"
                                                  }
                                                ></LoadingElement>
                                                <LoadingValue
                                                  slot="aluno/alunoTarefas:9"
                                                  width="10ch"
                                                  known={false}
                                                  value={
                                                    tarefa.data_limite_formatada
                                                  }
                                                />
                                              </LoadingElement>,
                                            );
                                          }
                                          return nodes;
                                        })()}
                                      </LoadingElement>,
                                    );
                                    nodes.push(
                                      <LoadingElement
                                        as="div"
                                        key={nodes.length}
                                      >
                                        <LoadingElement
                                          as="h3"
                                          style={styleFrom(
                                            "color: var(--text-white); font-size: 1.15rem; margin-bottom: 5px; text-transform: none;",
                                          )}
                                        >
                                          <LoadingValue
                                            slot="aluno/alunoTarefas:10"
                                            width="min(18ch, 100%)"
                                            known={false}
                                            value={tarefa.titulo}
                                          />
                                        </LoadingElement>
                                        <LoadingElement
                                          as="span"
                                          style={styleFrom(
                                            "font-size: 0.7rem; color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px;",
                                          )}
                                        >
                                          <LoadingElement
                                            as="i"
                                            className={"fas fa-tag"}
                                          ></LoadingElement>
                                          <LoadingValue
                                            slot="aluno/alunoTarefas:11"
                                            width="min(18ch, 100%)"
                                            known={false}
                                            value={
                                              tarefa.competencia_nome || "Geral"
                                            }
                                          />
                                        </LoadingElement>
                                      </LoadingElement>,
                                    );
                                    if (tarefa.descricao) {
                                      nodes.push(
                                        <LoadingElement
                                          as="p"
                                          style={styleFrom(
                                            "font-size: 0.85rem; color: var(--text-gray); line-height: 1.5; margin: 5px 0;",
                                          )}
                                          key={nodes.length}
                                        >
                                          <LoadingValue
                                            slot="aluno/alunoTarefas:12"
                                            width="min(32ch, 100%)"
                                            known={false}
                                            value={tarefa.descricao.substring(
                                              0,
                                              120,
                                            )}
                                          />
                                          <LoadingValue
                                            slot="aluno/alunoTarefas:13"
                                            width="min(32ch, 100%)"
                                            known={false}
                                            value={
                                              tarefa.descricao.length > 120
                                                ? "..."
                                                : ""
                                            }
                                          />
                                        </LoadingElement>,
                                      );
                                    }
                                    if (
                                      tarefa.status === "DEVOLVIDA" &&
                                      tarefa.feedback
                                    ) {
                                      nodes.push(
                                        <LoadingElement
                                          as="div"
                                          style={styleFrom(
                                            "background: rgba(212, 160, 23, 0.1); border: 1px solid var(--color-desenvolvimento); padding: 12px; border-radius: 10px;",
                                          )}
                                          key={nodes.length}
                                        >
                                          <LoadingElement
                                            as="p"
                                            style={styleFrom(
                                              "font-size: 0.8rem; color: var(--color-desenvolvimento);",
                                            )}
                                          >
                                            <LoadingElement
                                              as="i"
                                              className={
                                                "fas fa-exclamation-circle"
                                              }
                                            ></LoadingElement>
                                            <LoadingElement as="strong">
                                              {"Feedback:"}
                                            </LoadingElement>
                                            <LoadingValue
                                              slot="aluno/alunoTarefas:14"
                                              width="min(32ch, 100%)"
                                              known={false}
                                              value={tarefa.feedback}
                                            />
                                          </LoadingElement>
                                        </LoadingElement>,
                                      );
                                    }
                                    if (
                                      tarefa.status === "CONCLUIDA" &&
                                      tarefa.nota
                                    ) {
                                      nodes.push(
                                        <LoadingElement
                                          as="div"
                                          style={styleFrom(
                                            "display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px;",
                                          )}
                                          key={nodes.length}
                                        >
                                          {(() => {
                                            const nodes = [];
                                            nodes.push(
                                              <LoadingElement
                                                as="span"
                                                className={"media-nota apto"}
                                                style={styleFrom(
                                                  "font-size: 1.4rem;",
                                                )}
                                                key={nodes.length}
                                              >
                                                <LoadingValue
                                                  slot="aluno/alunoTarefas:15"
                                                  width="3ch"
                                                  known={false}
                                                  value={parseFloat(
                                                    tarefa.nota,
                                                  ).toFixed(1)}
                                                />
                                              </LoadingElement>,
                                            );
                                            if (tarefa.feedback) {
                                              nodes.push(
                                                <LoadingElement
                                                  as="p"
                                                  style={styleFrom(
                                                    "font-size: 0.8rem; color: var(--text-gray); font-style: italic;",
                                                  )}
                                                  key={nodes.length}
                                                >
                                                  {'"'}
                                                  <LoadingValue
                                                    slot="aluno/alunoTarefas:16"
                                                    width="min(32ch, 100%)"
                                                    known={false}
                                                    value={tarefa.feedback}
                                                  />
                                                  {'"'}
                                                </LoadingElement>,
                                              );
                                            }
                                            return nodes;
                                          })()}
                                        </LoadingElement>,
                                      );
                                    }
                                    nodes.push(
                                      <LoadingElement
                                        as="div"
                                        style={styleFrom(
                                          "margin-top: auto; padding-top: 15px;",
                                        )}
                                        key={nodes.length}
                                      >
                                        {(() => {
                                          const nodes = [];
                                          if (canSubmit) {
                                            nodes.push(
                                              <LoadingElement
                                                as="button"
                                                className={"btn-secondary-dash"}
                                                style={styleFrom(
                                                  " justify-content: center;",
                                                )}
                                                onClick={(event) => {
                                                  handlers.abrirModalEnvio(
                                                    tarefa.tarefa_aluno_id,
                                                    tarefa.titulo,
                                                  );
                                                }}
                                                key={nodes.length}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "fas fa-paper-plane"
                                                  }
                                                ></LoadingElement>
                                                <LoadingValue
                                                  slot="aluno/alunoTarefas:17"
                                                  width="12ch"
                                                  known={false}
                                                  value={
                                                    tarefa.status ===
                                                    "DEVOLVIDA"
                                                      ? "REENVIAR TAREFA"
                                                      : "ENVIAR TAREFA"
                                                  }
                                                />
                                              </LoadingElement>,
                                            );
                                          } else if (
                                            tarefa.status === "ENTREGUE"
                                          ) {
                                            nodes.push(
                                              <LoadingElement
                                                as="div"
                                                style={styleFrom(
                                                  "text-align: center; font-size: 0.8rem; color: var(--text-muted);",
                                                )}
                                                key={nodes.length}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "fas fa-check-circle"
                                                  }
                                                  style={styleFrom(
                                                    "color: #70b5f9;",
                                                  )}
                                                ></LoadingElement>
                                                {" Entregue em "}
                                                <LoadingValue
                                                  slot="aluno/alunoTarefas:18"
                                                  width="10ch"
                                                  known={false}
                                                  value={
                                                    tarefa.data_entrega_formatada
                                                  }
                                                />
                                              </LoadingElement>,
                                            );
                                          } else if (
                                            tarefa.status === "CONCLUIDA"
                                          ) {
                                            nodes.push(
                                              <LoadingElement
                                                as="div"
                                                style={styleFrom(
                                                  "text-align: center; font-size: 0.8rem; color: var(--text-muted);",
                                                )}
                                                key={nodes.length}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "fas fa-certificate"
                                                  }
                                                  style={styleFrom(
                                                    "color: var(--color-apto);",
                                                  )}
                                                ></LoadingElement>
                                                {
                                                  " Atividade Avaliada\n                                        "
                                                }
                                              </LoadingElement>,
                                            );
                                          }
                                          return nodes;
                                        })()}
                                      </LoadingElement>,
                                    );
                                    return nodes;
                                  })()}
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
                          className={"stats-card"}
                          style={styleFrom(
                            "text-align: center; padding: 80px;",
                          )}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-tasks"}
                            style={styleFrom(
                              "font-size: 4rem; color: var(--border-color); margin-bottom: 20px;",
                            )}
                          ></LoadingElement>
                          <LoadingElement
                            as="p"
                            style={styleFrom("color: var(--text-gray);")}
                          >
                            {"Você não possui tarefas pendentes no momento."}
                          </LoadingElement>
                        </LoadingElement>,
                      );
                    }
                    return nodes;
                  })()}
                </LoadingElement>,
              );
              return nodes;
            })()}
          </LoadingElement>
          <LoadingElement as="footer" className={"dash-footer"}>
            <LoadingElement as="div" className={"footer-actions"}>
              <LoadingElement
                as="a"
                href={"/aluno"}
                className={"btn-secondary-dash"}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-arrow-left"}
                ></LoadingElement>
                {" VOLTAR AO PAINEL\n                "}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"footer-credits"}>
              <LoadingElement as="p">{"© 2026 AnalisAI"}</LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"modalEnvioTarefa"}
          className={"modal-overlay"}
        >
          <LoadingElement as="div" className={"modal-content"}>
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModalEnvio();
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="h2" className={"section-title-2"}>
              {"\n                ENVIAR TAREFA\n            "}
            </LoadingElement>
            <LoadingElement
              as="p"
              id={"tarefaTituloEnvio"}
              style={styleFrom(
                "color: #fff; font-size: 1rem; margin-bottom: 25px; opacity: 0.8;",
              )}
            ></LoadingElement>
            <LoadingElement
              as="form"
              id={"formEnvioTarefa"}
              method={"POST"}
              encType={"multipart/form-data"}
            >
              <LoadingElement
                as="input"
                type={"hidden"}
                name={"_csrf"}
                value={csrfToken}
              />
              <LoadingElement
                as="div"
                style={styleFrom(
                  "display: flex; flex-direction: column; gap: 20px;",
                )}
              >
                <LoadingElement as="div">
                  <LoadingElement
                    as="label"
                    style={styleFrom(
                      "font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;",
                    )}
                  >
                    {"Resposta em Texto"}
                  </LoadingElement>
                  <LoadingElement
                    as="textarea"
                    name={"resposta_texto"}
                    style={styleFrom(
                      [
                        "width: 100%; background: var(--card-bg); border: 1px solid ",
                        "var(--border-color); border-radius: 15px; padding: 15px; color: ",
                        "var(--text-white); resize: vertical; min-height: 120px;",
                      ].join(""),
                    )}
                    placeholder={"Descreva sua resposta aqui..."}
                    defaultValue={""}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="div">
                  <LoadingElement
                    as="label"
                    style={styleFrom(
                      "font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;",
                    )}
                  >
                    {"Anexar Arquivo"}
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "border: 2px dashed var(--border-color); border-radius: 20px; padding: 30px; text-align: center; cursor: pointer; transition: 0.3s;",
                    )}
                    onMouseOver={(event) => {
                      event.currentTarget.style.borderColor =
                        "var(--color-apto)";
                    }}
                    onMouseOut={(event) => {
                      event.currentTarget.style.borderColor =
                        "var(--border-color)";
                    }}
                    onClick={(event) => {
                      document.getElementById("arquivoInput").click();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-file-upload"}
                      style={styleFrom(
                        "font-size: 2rem; color: #333; margin-bottom: 10px;",
                      )}
                    ></LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom("font-size: 0.8rem; color: #888;")}
                    >
                      {"Clique para selecionar (PDF, Imagens ou Documentos)"}
                    </LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"file"}
                      id={"arquivoInput"}
                      name={"arquivo"}
                      style={styleFrom("display: none;")}
                    />
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    id={"nomeArquivo"}
                    style={styleFrom(
                      "font-size: 0.75rem; color: var(--color-apto); margin-top: 10px; text-align: center;",
                    )}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="button"
                  type={"submit"}
                  className={"btn-secondary-dash"}
                  style={styleFrom("justify-content: center; height: 55px;")}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-paper-plane"}
                  ></LoadingElement>
                  {" FINALIZAR ENTREGA\n                    "}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    success_msg = null,
    error_msg = null,
    stats = {},
    tarefas = [],
    csrfToken = null,
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="div" className={"logo"}>
          <LoadingElement
            as="img"
            src={"/images/logo3-green.png"}
            alt={"AnalisAI"}
            style={styleFrom("height: 40px;")}
          />
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement
            as="div"
            className={"user-avatar"}
            style={styleFrom("background: var(--color-apto);")}
          >
            <LoadingValue
              slot="aluno/alunoTarefas:19"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
          </LoadingElement>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="aluno/alunoTarefas:20"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoTarefas:21"
                width="12ch"
                known={true}
                value={aluno.ano_escolar}
              />
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
