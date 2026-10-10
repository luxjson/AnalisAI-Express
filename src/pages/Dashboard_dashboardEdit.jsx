import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Dashboard_dashboardEdit({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    success_msg = null,
    error_msg = null,
    alunos = [],
    csrfToken = null,
    listaCompetencias = [],
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
                    {"\n                    Editor de Notas\n                "}
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
                        style={styleFrom("color: var(--text-gray);")}
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
              <div className={"toolbar"} key={nodes.length}>
                <div className={"action-buttons"}>
                  <button
                    className={"btn-icon btn-filter"}
                    id={"btnFilter"}
                    onClick={(event) => {
                      handlers.openFilter();
                    }}
                    title={"Filtrar"}
                  >
                    <i className={"fas fa-filter"}></i>
                  </button>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openAddModal();
                    }}
                    title={"Adicionar Aluno"}
                  >
                    <i className={"fas fa-plus"}></i>
                    {" ADICIONAR ALUNO\n                "}
                  </button>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openImportModal();
                    }}
                    title={"Importar Planilha"}
                  >
                    <i className={"fas fa-file-import"}></i>
                    {" IMPORTAR TABELA\n                "}
                  </button>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.exportarTabelaParaExcel();
                    }}
                    title={"Exportar Tabela"}
                  >
                    <i className={"fas fa-file-export"}></i>
                    {" EXPORTAR TABELA\n                "}
                  </button>
                </div>
                <div className={"search-container"}>
                  <i className={"fas fa-search"}></i>
                  <input
                    type={"text"}
                    id={"searchInput"}
                    placeholder={"Pesquisar aluno..."}
                  />
                </div>
              </div>,
            );
            nodes.push(
              <div
                id={"importModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div className={"modal-content"}>
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeImportModal();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <h2
                    className={"section-title-2"}
                    style={styleFrom(
                      "text-align: center; margin-bottom: 30px; font-size: 1.2rem;",
                    )}
                  >
                    {
                      "\n                    IMPORTAR PLANILHA\n                "
                    }
                  </h2>
                  <a
                    href={"/baixar-modelo-importacao"}
                    className={"btn-secondary-dash"}
                    style={styleFrom(
                      "display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; margin-bottom: 15px; text-decoration: none; height: 55px;",
                    )}
                  >
                    <i className={"fas fa-download"}></i>
                    {"\n                    BAIXAR MODELO\n                "}
                  </a>
                  <div
                    className={"file-drop-area"}
                    onClick={(event) => {
                      document.getElementById("fileInput").click();
                    }}
                    style={styleFrom("padding: 25px; margin: 15px 0;")}
                  >
                    <i
                      className={"fas fa-cloud-upload-alt"}
                      style={styleFrom(
                        "font-size: 2rem; color: var(--text-muted);",
                      )}
                    ></i>
                    <span
                      className={"file-msg"}
                      style={styleFrom(
                        "font-size: 0.8rem; color: var(--text-gray);",
                      )}
                    >
                      {"Clique ou arraste"}
                    </span>
                    <span
                      style={styleFrom(
                        "color: var(--text-muted); font-size: 0.7rem;",
                      )}
                    >
                      {".xlsx, .xls, .csv"}
                    </span>
                    <input
                      type={"file"}
                      id={"fileInput"}
                      accept={".xlsx,.xls,.csv"}
                      style={styleFrom("display: none;")}
                    />
                  </div>
                  <div
                    id={"fileName"}
                    className={"file-name"}
                    style={styleFrom(
                      "font-size: 0.75rem; padding: 6px; text-align: center; color: var(--success-green); background: var(--success-green-alpha); border-radius: 8px; margin-bottom: 10px;",
                    )}
                  ></div>
                  <div style={styleFrom("margin: 15px 0; text-align: center;")}>
                    <label
                      style={styleFrom(
                        "display: inline-flex; align-items: center; gap: 5px; color: var(--text-white); cursor: pointer; font-size: 0.8rem;",
                      )}
                    >
                      <input
                        type={"checkbox"}
                        id={"primeiraLinhaCabecalho"}
                        defaultChecked={true}
                        style={styleFrom(
                          "accent-color: var(--success-green); width: 16px; height: 16px;",
                        )}
                      />
                      {
                        "\n                        1ª linha cabeçalho\n                    "
                      }
                    </label>
                  </div>
                  <button
                    type={"button"}
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.importarPlanilha();
                    }}
                    style={styleFrom(
                      "width: 100%; padding: 12px; font-size: 0.9rem; margin-top: 5px; justify-content: center; height: 55px",
                    )}
                  >
                    <i className={"fas fa-file-import"}></i>
                    {" IMPORTAR\n                "}
                  </button>
                  <p
                    style={styleFrom(
                      "color: var(--text-muted); font-size: 0.65rem; text-align: center; margin-top: 20px;",
                    )}
                  >
                    <i
                      className={"fas fa-info-circle"}
                      style={styleFrom("color: var(--success-green);")}
                    ></i>
                    {
                      "\n                    Use o modelo para formato correto\n                "
                    }
                  </p>
                </div>
              </div>,
            );
            nodes.push(
              <div
                id={"previewImportModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div
                  className={"modal-content"}
                  style={styleFrom(
                    "max-width: 600px; border-color: var(--success-green);",
                  )}
                >
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closePreviewModal();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <h2
                    className={"section-title-2"}
                    style={styleFrom(
                      "text-align: center; margin-bottom: 20px; color: var(--success-green);",
                    )}
                  >
                    {"\n                    PRÉ-VISUALIZAÇÃO\n                "}
                  </h2>
                  <div
                    style={styleFrom(
                      "text-align: center; margin-bottom: 20px;",
                    )}
                  >
                    <i
                      className={"fas fa-check-circle"}
                      style={styleFrom(
                        "font-size: 3rem; color: var(--success-green);",
                      )}
                    ></i>
                    <p
                      style={styleFrom(
                        "color: var(--text-white); font-size: 1.1rem; margin: 10px 0;",
                      )}
                      id={"previewCount"}
                    ></p>
                  </div>
                  <div
                    style={styleFrom(
                      "background: var(--card-bg); border: 2px solid var(--success-green); border-radius: 12px; padding: 15px; margin-bottom: 20px; max-height: 300px; overflow-y: auto;",
                    )}
                  >
                    <table
                      style={styleFrom(
                        "width: 100%; border-collapse: collapse;",
                      )}
                    >
                      <thead>
                        <tr
                          style={styleFrom(
                            "border-bottom: 1px solid var(--border-color);",
                          )}
                        >
                          <th
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"NOME"}
                          </th>
                          <th
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"ANO"}
                          </th>
                          <th
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"COMPETÊNCIAS"}
                          </th>
                        </tr>
                      </thead>
                      <tbody id={"previewList"}></tbody>
                    </table>
                  </div>
                  <div
                    style={styleFrom(
                      "display: flex; gap: 10px; margin-top: 20px;",
                    )}
                  >
                    <button
                      className={"btn-secondary-dash"}
                      onClick={(event) => {
                        handlers.confirmarImportacao();
                      }}
                      style={styleFrom(
                        "flex: 1; justify-content: center; background: var(--success-green-alpha); border-color: var(--success-green); color: var(--text-white);",
                      )}
                    >
                      <i className={"fas fa-check"}></i>
                      {" CONFIRMAR\n                    "}
                    </button>
                    <button
                      className={"btn-secondary-dash"}
                      onClick={(event) => {
                        handlers.closePreviewModal();
                      }}
                      style={styleFrom("flex: 1; justify-content: center;")}
                    >
                      <i className={"fas fa-times"}></i>
                      {" CANCELAR\n                    "}
                    </button>
                  </div>
                </div>
              </div>,
            );
            nodes.push(
              <main className={"edit-content"} key={nodes.length}>
                <section className={"ai-editor-panel"}>
                  <details className={"ai-accordion"}>
                    <summary className={"ai-accordion-summary"}>
                      <div
                        className={"ai-panel-heading"}
                        style={styleFrom(
                          "cursor: pointer; display: flex; align-items: center; justify-content: space-between; width: 100%;",
                        )}
                      >
                        <div>
                          <h2 className={"section-title-2"}>
                            {"SITUAÇÃO DO ALUNO"}
                          </h2>
                          <p>
                            {
                              "Gere uma leitura objetiva com base nas competências, presença e tarefas registradas."
                            }
                          </p>
                        </div>
                        <div
                          style={styleFrom(
                            "display: flex; align-items: center; gap: 16px;",
                          )}
                        >
                          <a
                            className={"btn-secondary-dash"}
                            href={"/dashboard/ia"}
                          >
                            <i className={"fas fa-comments"}></i>
                            {" ABRIR CHAT"}
                          </a>
                          <span className={"ai-accordion-icon"}>
                            <i className={"ph-bold ph-caret-down"}></i>
                          </span>
                        </div>
                      </div>
                    </summary>
                    <div className={"ai-accordion-content"}>
                      <div className={"ai-editor-controls"}>
                        <select id={"aiStudentSelect"}>
                          {(() => {
                            const nodes = [];
                            nodes.push(
                              <option value={""} key={nodes.length}>
                                {"Selecione um aluno"}
                              </option>,
                            );
                            alunos.forEach((aluno) => {
                              nodes.push(
                                <option value={aluno.id} key={nodes.length}>
                                  {aluno.nome}
                                  {" - "}
                                  {aluno.ano_escolar}
                                </option>,
                              );
                            });
                            return nodes;
                          })()}
                        </select>
                        <button
                          className={"btn-secondary-dash"}
                          id={"aiAnalyzeStudent"}
                          type={"button"}
                        >
                          <i className={"fas fa-chart-line"}></i>
                          {" ANALISAR"}
                        </button>
                      </div>
                      <div
                        className={"ai-suggestion-list"}
                        aria-label={"Sugestões de análise"}
                      >
                        <button
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Elabore um diagnóstico pedagógico em texto corrido sobre este aluno, analisando rendimento geral, competências e pontos de atenção."
                          }
                        >
                          <i className={"fas fa-list-check"}></i>
                          <span>{"Diagnóstico"}</span>
                        </button>
                        <button
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Sugira intervenções pedagógicas personalizadas e estratégias ativas para fortalecer o aprendizado deste aluno."
                          }
                        >
                          <i className={"fas fa-lightbulb"}></i>
                          <span>{"Intervenções"}</span>
                        </button>
                        <button
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Faça uma análise detalhada sobre o engajamento, frequência e tarefas deste aluno, propondo ações práticas."
                          }
                        >
                          <i className={"fas fa-arrow-trend-up"}></i>
                          <span>{"Engajamento"}</span>
                        </button>
                      </div>
                      <div
                        id={"aiEditorResult"}
                        className={"ai-result"}
                        aria-live={"polite"}
                      >
                        {"A análise aparecerá aqui."}
                      </div>
                    </div>
                  </details>
                </section>
                <div className={"table-container"}>
                  <table className={"alunos-table"} id={"alunosTable"}>
                    <thead>
                      <tr>
                        <th>{"ID"}</th>
                        <th>{"ALUNO"}</th>
                        <th>{"ANO ESCOLAR"}</th>
                        <th>{"IDADE"}</th>
                        <th>{"MÉDIA DE NOTAS"}</th>
                        <th>{"PRESENÇA (%)"}</th>
                        <th>{"NÍVEL"}</th>
                        <th>{"AÇÕES"}</th>
                      </tr>
                    </thead>
                    <tbody id={"alunosTableBody"}>
                      {(() => {
                        const nodes = [];
                        if (alunos && alunos.length > 0) {
                          alunos.forEach((aluno) => {
                            const mediaCompetencias = Number(
                              aluno.media_competencias,
                            );
                            const temCompetencias =
                              aluno.competencias?.length > 0;
                            const nivelReal = aluno.nivel;
                            const nivelClass = aluno.nivelClass;
                            nodes.push(
                              <tr
                                data-aluno-id={aluno.id}
                                data-presenca={aluno.presenca}
                                key={nodes.length}
                              >
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.ano_escolar}</td>
                                <td>{aluno.idade}</td>
                                <td className={"media-notas"}>
                                  {(() => {
                                    const nodes = [];
                                    if (temCompetencias) {
                                      nodes.push(
                                        <strong key={nodes.length}>
                                          {mediaCompetencias.toFixed(1)}
                                        </strong>,
                                      );
                                      nodes.push(
                                        <small
                                          style={styleFrom(
                                            "color: #888; display: block;",
                                          )}
                                          key={nodes.length}
                                        >
                                          {"("}
                                          {aluno.competencias.length}
                                          {" competências)"}
                                        </small>,
                                      );
                                    } else {
                                      nodes.push(
                                        <span
                                          style={styleFrom("color: #888;")}
                                          key={nodes.length}
                                        >
                                          {"Sem competências"}
                                        </span>,
                                      );
                                    }
                                    return nodes;
                                  })()}
                                </td>
                                <td>
                                  {aluno.presenca}
                                  {"%"}
                                </td>
                                <td className={"status " + nivelClass}>
                                  {nivelReal}
                                </td>
                                <td className={"td-actions"}>
                                  <button
                                    type={"button"}
                                    className={"btn-table-edit"}
                                    data-id={aluno.id}
                                    data-name={aluno.nome}
                                    data-presenca={aluno.presenca}
                                    onClick={(event) => {
                                      handlers.openEditModal(
                                        event.currentTarget.dataset.id,
                                        event.currentTarget.dataset.name,
                                        event.currentTarget.dataset.presenca,
                                      );
                                    }}
                                    title={"Editar Aluno"}
                                  >
                                    <i
                                      className={"ph-bold ph-pen"}
                                      aria-hidden={"true"}
                                    ></i>
                                  </button>
                                  <a
                                    href={"#"}
                                    data-id={aluno.id}
                                    data-name={aluno.nome}
                                    onClick={(event) => {
                                      event.preventDefault();
                                      handlers.confirmDelete(
                                        event.currentTarget.dataset.id,
                                        event.currentTarget.dataset.name,
                                      );
                                    }}
                                    className={"delete-link"}
                                    title={"Excluir Aluno"}
                                  >
                                    <i
                                      className={"ph-bold ph-trash"}
                                      aria-hidden={"true"}
                                    ></i>
                                  </a>
                                </td>
                              </tr>,
                            );
                          });
                        }
                        return nodes;
                      })()}
                    </tbody>
                  </table>
                </div>
                <div className={"competencias-section"}>
                  <h2 className={"section-title-2"}>
                    {"COMPETÊNCIAS POR ALUNO"}
                  </h2>
                  <div
                    className={"search-container"}
                    style={styleFrom("margin-bottom: 25px; max-width: 400px;")}
                  >
                    <i className={"fas fa-search"}></i>
                    <input
                      type={"text"}
                      id={"competenciasSearchInput"}
                      placeholder={"Procurar competências de aluno..."}
                    />
                  </div>
                  <div className={"competencias-grid"}>
                    {(() => {
                      const nodes = [];
                      if (alunos && alunos.length > 0) {
                        alunos.forEach((aluno) => {
                          if (
                            aluno.competencias &&
                            aluno.competencias.length > 0
                          ) {
                            nodes.push(
                              <div
                                className={"competencia-card"}
                                data-aluno-nome={aluno.nome.toLowerCase()}
                                key={nodes.length}
                              >
                                <div className={"competencia-header"}>
                                  <h3>{aluno.nome}</h3>
                                  <span className={"competencia-ano"}>
                                    {aluno.ano_escolar}
                                  </span>
                                </div>
                                <div className={"competencia-list"}>
                                  {(() => {
                                    const nodes = [];
                                    aluno.competencias.forEach((comp) => {
                                      const compClass =
                                        comp.gradeClass === "desenvolvimento"
                                          ? "em-desenvolvimento"
                                          : comp.gradeClass;
                                      nodes.push(
                                        <div
                                          className={"competencia-item"}
                                          key={nodes.length}
                                        >
                                          <div className={"competencia-info"}>
                                            {(() => {
                                              const nodes = [];
                                              nodes.push(
                                                <span
                                                  className={"competencia-nome"}
                                                  key={nodes.length}
                                                >
                                                  {comp.nome}
                                                </span>,
                                              );
                                              if (comp.observacoes) {
                                                nodes.push(
                                                  <span
                                                    className={
                                                      "competencia-desc"
                                                    }
                                                    key={nodes.length}
                                                  >
                                                    {comp.observacoes.substring(
                                                      0,
                                                      30,
                                                    )}
                                                    {comp.observacoes.length >
                                                    30
                                                      ? "..."
                                                      : ""}
                                                  </span>,
                                                );
                                              }
                                              return nodes;
                                            })()}
                                          </div>
                                          <span
                                            className={
                                              "competencia-nota " + compClass
                                            }
                                          >
                                            {parseFloat(comp.nota).toFixed(1)}
                                          </span>
                                        </div>,
                                      );
                                    });
                                    return nodes;
                                  })()}
                                </div>
                              </div>,
                            );
                          }
                        });
                      }
                      return nodes;
                    })()}
                  </div>
                </div>
                <div className={"evolution-container"}>
                  <h2 className={"section-title-2"}>
                    {"EVOLUÇÃO INDIVIDUAL POR ALUNO"}
                  </h2>
                  <div
                    className={"search-container"}
                    style={styleFrom("margin-bottom: 25px; max-width: 400px;")}
                  >
                    <i className={"fas fa-search"}></i>
                    <input
                      type={"text"}
                      id={"chartSearchInput"}
                      placeholder={"Procurar gráfico de aluno..."}
                    />
                  </div>
                  <div className={"charts-grid"}>
                    {(() => {
                      const nodes = [];
                      if (alunos && alunos.length > 0) {
                        alunos.forEach((aluno) => {
                          if (
                            aluno.competencias &&
                            aluno.competencias.length > 0
                          ) {
                            nodes.push(
                              <div
                                className={"chart-card"}
                                data-aluno-nome={aluno.nome.toLowerCase()}
                                key={nodes.length}
                              >
                                <h3>
                                  {"ALUNO: "}
                                  {aluno.nome}
                                </h3>
                                <div
                                  className={"chart-wrapper"}
                                  style={styleFrom(
                                    "position: relative; height: 300px; width: 100%;",
                                  )}
                                >
                                  <canvas id={"chart-" + aluno.id}></canvas>
                                </div>
                              </div>,
                            );
                          }
                        });
                      }
                      return nodes;
                    })()}
                  </div>
                </div>
              </main>,
            );
            nodes.push(
              <div
                id={"filterModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div className={"modal-content"}>
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeFilter();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <h2 className={"section-title-2"}>{"FILTRAR LISTA"}</h2>
                  <div className={"filter-options"}>
                    <label>{"ANO ESCOLAR:"}</label>
                    <select id={"filterAno"} className={"filter-input"}>
                      <option value={""}>{"TODOS OS ANOS"}</option>
                      <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                      <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                      <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                      <option value={"9º FUNDAMENTAL"}>
                        {"9º FUNDAMENTAL"}
                      </option>
                    </select>
                    <label
                      style={styleFrom("margin-top: 15px; display: block;")}
                    >
                      {"STATUS:"}
                    </label>
                    <select id={"filterStatus"} className={"filter-input"}>
                      <option value={""}>{"TODOS OS NÍVEIS"}</option>
                      <option value={"APTO"}>{"APTO"}</option>
                      <option value={"INAPTO"}>{"INAPTO"}</option>
                      <option value={"EM DESENVOLVIMENTO"}>
                        {"EM DESENVOLVIMENTO"}
                      </option>
                    </select>
                    <div
                      style={styleFrom(
                        "display: flex; gap: 10px; margin-top: 25px;",
                      )}
                    >
                      <button
                        className={"btn-secondary-dash"}
                        onClick={(event) => {
                          handlers.applyFilter();
                        }}
                        style={styleFrom("flex: 2; justify-content: center;")}
                      >
                        {"FILTRAR"}
                      </button>
                      <button
                        className={"btn-secondary-dash"}
                        onClick={(event) => {
                          handlers.clearFilters();
                        }}
                        style={styleFrom("flex: 1; justify-content: center;")}
                      >
                        {"LIMPAR"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>,
            );
            nodes.push(
              <div
                id={"addAlunoModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div
                  className={"modal-content claude-modal claude-create-student"}
                >
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeAddModal();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <div className={"claude-modal-heading"}>
                    <span className={"claude-modal-kicker"}>{"Alunos"}</span>
                    <h2>{"Adicionar aluno"}</h2>
                    <p>
                      {
                        "Cadastre um novo aluno para acompanhar seu desempenho acadêmico."
                      }
                    </p>
                  </div>
                  <form
                    action={"/dashboard/add-aluno"}
                    method={"POST"}
                    className={"filter-options claude-form"}
                  >
                    <input type={"hidden"} name={"_csrf"} value={csrfToken} />
                    <label>{"NOME COMPLETO:"}</label>
                    <input
                      type={"text"}
                      name={"nome"}
                      className={"filter-input"}
                      pattern={"[A-Za-zÀ-ÖØ-öø-ÿ\\s]+"}
                      onInput={(event) => {
                        event.currentTarget.value =
                          event.currentTarget.value.replace(
                            /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g,
                            "",
                          );
                      }}
                      placeholder={"Nome do aluno"}
                      required={true}
                    />
                    <label
                      style={styleFrom("margin-top: 15px; display: block;")}
                    >
                      {"ANO ESCOLAR:"}
                    </label>
                    <select name={"ano_escolar"} className={"filter-input"}>
                      <option value={"1º MÉDIO"}>{"1º MÉDIO"}</option>
                      <option value={"2º MÉDIO"}>{"2º MÉDIO"}</option>
                      <option value={"3º MÉDIO"}>{"3º MÉDIO"}</option>
                      <option value={"9º FUNDAMENTAL"}>
                        {"9º FUNDAMENTAL"}
                      </option>
                    </select>
                    <div
                      style={styleFrom(
                        "display: flex; gap: 10px; margin-top: 15px;",
                      )}
                    >
                      <div style={styleFrom("flex: 1;")}>
                        <label>{"IDADE:"}</label>
                        <input
                          type={"number"}
                          name={"idade"}
                          min={"14"}
                          max={"20"}
                          className={"filter-input"}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className={"claude-modal-actions"}>
                      <button
                        type={"button"}
                        className={"claude-btn-secondary"}
                        onClick={(event) => {
                          handlers.closeAddModal();
                        }}
                      >
                        {"Cancelar"}
                      </button>
                      <button type={"submit"} className={"claude-btn-primary"}>
                        {"Criar aluno"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
            );
            nodes.push(
              <div
                id={"editAlunoModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div
                  className={"modal-content"}
                  style={styleFrom("max-width: 450px; padding: 30px;")}
                >
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeEditModal();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <h2
                    className={"section-title-2"}
                    style={styleFrom("font-size: 1.1rem; margin-bottom: 20px;")}
                  >
                    <i className={"fas fa-user-edit"}></i>
                    <span id={"editNomeAluno"}></span>
                  </h2>
                  <div
                    className={"edit-tabs"}
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr;border-bottom: none;",
                    )}
                  >
                    <button
                      className={"tab-btn active"}
                      onClick={(event) => {
                        handlers.showEditTab("info");
                      }}
                      id={"btn-tab-info"}
                    >
                      {"ACESSO"}
                    </button>
                    <button
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("notas");
                      }}
                      id={"btn-tab-notas"}
                    >
                      {"NOTAS"}
                    </button>
                    <button
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("add");
                      }}
                      id={"btn-tab-add"}
                    >
                      {"LANÇAR"}
                    </button>
                    <button
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("presenca");
                      }}
                      id={"btn-tab-presenca"}
                    >
                      {"FALTAS"}
                    </button>
                  </div>
                  <div
                    style={styleFrom(
                      "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
                    )}
                  >
                    <div id={"editInfoTab"} className={"tab-content active"}>
                      <div id={"loginInfo"}></div>
                    </div>
                    <div
                      id={"editNotasTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <h3
                        style={styleFrom(
                          "font-size: 0.7rem; color: var(--text-gray); margin-bottom: 10px; letter-spacing: 1px;",
                        )}
                      >
                        {"COMPETÊNCIAS REGISTRADAS"}
                      </h3>
                      <div
                        id={"competenciasListContainer"}
                        className={"competencias-list-edit"}
                        style={styleFrom("max-height: 200px;")}
                      ></div>
                    </div>
                    <div
                      id={"editAddTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <form
                        action={"/dashboard/adicionar-competencia"}
                        method={"POST"}
                        className={"filter-options"}
                      >
                        <input
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <input
                          type={"hidden"}
                          name={"aluno_id"}
                          id={"editAlunoIdComp"}
                        />
                        <div
                          style={styleFrom(
                            "display: grid; grid-template-columns: 2fr 1fr; gap: 10px;",
                          )}
                        >
                          <div>
                            <label style={styleFrom("margin-top: 0;")}>
                              {"COMPETÊNCIA:"}
                            </label>
                            <select
                              name={"competencia_id"}
                              className={"filter-input"}
                              style={styleFrom(
                                "padding: 10px; font-size: 0.8rem;",
                              )}
                              required={true}
                            >
                              {(() => {
                                const nodes = [];
                                nodes.push(
                                  <option value={""} key={nodes.length}>
                                    {"SELECIONE..."}
                                  </option>,
                                );
                                if (
                                  listaCompetencias &&
                                  listaCompetencias.length > 0
                                ) {
                                  listaCompetencias.forEach((comp) => {
                                    nodes.push(
                                      <option
                                        value={comp.id}
                                        key={nodes.length}
                                      >
                                        {comp.nome}
                                      </option>,
                                    );
                                  });
                                }
                                return nodes;
                              })()}
                            </select>
                          </div>
                          <div>
                            <label style={styleFrom("margin-top: 0;")}>
                              {"NOTA:"}
                            </label>
                            <input
                              type={"number"}
                              step={"0.1"}
                              name={"nota"}
                              min={"0"}
                              max={"10"}
                              className={"filter-input"}
                              style={styleFrom(
                                "padding: 10px; font-size: 0.8rem;",
                              )}
                              required={true}
                            />
                          </div>
                        </div>
                        <label style={styleFrom("margin-top: 10px;")}>
                          {"OBSERVAÇÕES:"}
                        </label>
                        <textarea
                          name={"observacoes"}
                          className={"filter-input"}
                          style={styleFrom(
                            "height: 60px; padding: 10px; font-size: 0.8rem;",
                          )}
                          placeholder={"Feedback..."}
                          defaultValue={""}
                        ></textarea>
                        <button
                          type={"submit"}
                          className={"btn-secondary-dash"}
                          style={styleFrom(
                            "margin-top: 15px; height: 45px; justify-content: center; font-size: 0.75rem;",
                          )}
                        >
                          {"REGISTRAR NOTA"}
                        </button>
                      </form>
                    </div>
                    <div
                      id={"editPresencaTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <form
                        action={"/dashboard/atualizar-presenca"}
                        method={"POST"}
                        className={"filter-options"}
                      >
                        <input
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <input
                          type={"hidden"}
                          name={"aluno_id"}
                          id={"editAlunoId"}
                        />
                        <label style={styleFrom("margin-top: 0;")}>
                          {"FREQUÊNCIA ATUAL (%)"}
                        </label>
                        <input
                          type={"number"}
                          name={"presenca"}
                          id={"editPresencaInput"}
                          min={"0"}
                          max={"100"}
                          className={"filter-input"}
                          style={styleFrom("padding: 10px;")}
                          required={true}
                        />
                        <button
                          type={"submit"}
                          className={"btn-secondary-dash"}
                          style={styleFrom(
                            "margin-top: 20px; height: 45px; justify-content: center; font-size: 0.75rem;",
                          )}
                        >
                          {"ATUALIZAR STATUS"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>,
            );
            nodes.push(
              <div
                id={"exportSuccessModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <div
                  className={"modal-content"}
                  style={styleFrom(
                    "display: flex; flex-direction: column; align-items: center;",
                  )}
                >
                  <button
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeExportModal();
                    }}
                  >
                    <i className={"ph-bold ph-x"}></i>
                  </button>
                  <h2
                    className={"modal-title-success"}
                    style={styleFrom("color: #fff;")}
                  >
                    {"Relatório Gerado"}
                  </h2>
                  <p className={"modal-text-success"}>
                    {
                      "A planilha foi processada com sucesso e o seu download já começou."
                    }
                  </p>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.closeExportModal();
                    }}
                  >
                    {"CONCLUIR"}
                  </button>
                </div>
              </div>,
            );
            nodes.push(
              <footer className={"dash-footer"} key={nodes.length}>
                <a
                  href={"#"}
                  onClick={(event) => {
                    handlers.exportarTabelaParaExcel();
                  }}
                  className={"btn-secondary-dash"}
                >
                  <i className={"fas fa-file-export"}></i>
                  {" EXPORTAR PLANILHA COMPLETA\n            "}
                </a>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI\n            "}</p>
                </div>
              </footer>,
            );
            return nodes;
          })()}
        </div>
        <div id={"errorModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom(
              "max-width: 450px; border-color: var(--primary-red);",
            )}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.closeErrorModal();
              }}
            >
              <i className={"ph-bold ph-x"}></i>
            </button>
            <div style={styleFrom("text-align: center;")}>
              <div
                style={styleFrom(
                  "font-size: 4rem; color: var(--primary-red); margin-bottom: 15px;",
                )}
              >
                <i className={"fas fa-exclamation-triangle"}></i>
              </div>
              <h2
                className={"section-title-2"}
                style={styleFrom(
                  "color: var(--primary-red); margin-bottom: 15px;",
                )}
                id={"errorTitulo"}
              >
                {"\n                    ERRO\n                "}
              </h2>
              <p
                style={styleFrom(
                  "color: var(--text-gray); font-size: 1rem; margin-bottom: 10px;",
                )}
                id={"errorMensagem"}
              >
                {"\n                    Ocorreu um erro\n                "}
              </p>
              <div
                style={styleFrom(
                  "background: var(--bg-secondary); border-radius: 8px; padding: 10px; margin: 15px 0;",
                )}
              >
                <p
                  style={styleFrom(
                    "color: var(--primary-red); font-size: 0.85rem;",
                  )}
                  id={"errorDetalhe"}
                ></p>
              </div>
              <button
                className={"btn-action"}
                onClick={(event) => {
                  handlers.closeErrorModal();
                }}
                style={styleFrom(
                  "width: 100%; justify-content: center; border-color: var(--primary-red); color: var(--primary-red);",
                )}
              >
                <i className={"fas fa-times"}></i>
                {" FECHAR\n                "}
              </button>
            </div>
          </div>
        </div>
        <div id={"loadingModal"} className={"modal-overlay"}>
          <div
            className={"modal-content"}
            style={styleFrom(
              "max-width: 400px; text-align: center; border-color: var(--success-green);",
            )}
          >
            <div style={styleFrom("padding: 30px;")}>
              <div
                className={"loading-spinner"}
                style={styleFrom("margin: 20px auto;")}
              >
                <i
                  className={"fas fa-circle-notch fa-spin"}
                  style={styleFrom(
                    "font-size: 4rem; color: var(--success-green);",
                  )}
                ></i>
              </div>
              <h3
                style={styleFrom(
                  "color: var(--text-white); margin-bottom: 15px;",
                )}
              >
                {"IMPORTANDO DADOS"}
              </h3>
              <p
                style={styleFrom(
                  "color: var(--text-gray); margin-bottom: 20px;",
                )}
              >
                {"Processando alunos e competências..."}
              </p>
              <div
                style={styleFrom(
                  "width: 100%; height: 6px; background: var(--bg-secondary); border-radius: 10px; overflow: hidden;",
                )}
              >
                <div
                  id={"loadingBar"}
                  style={styleFrom(
                    "width: 0%; height: 100%; background: var(--success-green); transition: width 0.3s ease;",
                  )}
                ></div>
              </div>
              <p
                id={"loadingStatus"}
                style={styleFrom(
                  "color: var(--text-gray); font-size: 0.8rem; margin-top: 10px;",
                )}
              >
                {"0% concluído"}
              </p>
            </div>
          </div>
        </div>
        <div
          id={"credenciaisModal"}
          className={"modal-overlay"}
          style={styleFrom("display:none;")}
        >
          <div
            className={"modal-content modal-lg"}
            style={styleFrom("max-width: 800px;")}
          >
            <button
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModalCredenciais();
              }}
            >
              {"×"}
            </button>
            <h2
              style={styleFrom(
                "color: var(--text-white); margin-bottom: 10px; text-align: center; letter-spacing: 1px;",
              )}
            >
              <i
                className={"fas fa-user-check"}
                style={styleFrom("color: var(--success-green);")}
              ></i>
              {" Alunos Importados com Sucesso!\n        "}
            </h2>
            <p
              style={styleFrom(
                "color: var(--text-gray); text-align: center; margin-bottom: 20px;",
              )}
            >
              {
                "\n            Abaixo estão as credenciais de acesso para cada aluno. Guarde-as com segurança.\n        "
              }
            </p>
            <div id={"credenciaisLista"}></div>
          </div>
        </div>
        <script type="application/json" id="dashboard-edit-data">
          {String(safeJson(alunos))}
        </script>
      </React.Fragment>
    </>
  );
}
