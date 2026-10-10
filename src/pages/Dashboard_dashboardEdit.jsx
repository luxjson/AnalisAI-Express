import {
  LoadingValue,
  LoadingElement,
  LoadingCanvas,
  PageDataScript,
} from "../components/loading-layout";
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
                    slot="dashboard/dashboardEdit:1"
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
                    slot="dashboard/dashboardEdit:2"
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
              <LoadingElement as="div" className={"toolbar"} key={nodes.length}>
                <LoadingElement as="div" className={"action-buttons"}>
                  <LoadingElement
                    as="button"
                    className={"btn-icon btn-filter"}
                    id={"btnFilter"}
                    onClick={(event) => {
                      handlers.openFilter();
                    }}
                    title={"Filtrar"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-filter"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openAddModal();
                    }}
                    title={"Adicionar Aluno"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-plus"}
                    ></LoadingElement>
                    {" ADICIONAR ALUNO\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.openImportModal();
                    }}
                    title={"Importar Planilha"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-file-import"}
                    ></LoadingElement>
                    {" IMPORTAR TABELA\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.exportarTabelaParaExcel();
                    }}
                    title={"Exportar Tabela"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-file-export"}
                    ></LoadingElement>
                    {" EXPORTAR TABELA\n                "}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"search-container"}>
                  <LoadingElement
                    as="i"
                    className={"fas fa-search"}
                  ></LoadingElement>
                  <LoadingElement
                    as="input"
                    type={"text"}
                    id={"searchInput"}
                    placeholder={"Pesquisar aluno..."}
                  />
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"importModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"modal-content"}>
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeImportModal();
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
                    style={styleFrom(
                      "text-align: center; margin-bottom: 30px; font-size: 1.2rem;",
                    )}
                  >
                    {
                      "\n                    IMPORTAR PLANILHA\n                "
                    }
                  </LoadingElement>
                  <LoadingElement
                    as="a"
                    href={"/baixar-modelo-importacao"}
                    className={"btn-secondary-dash"}
                    style={styleFrom(
                      "display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; margin-bottom: 15px; text-decoration: none; height: 55px;",
                    )}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-download"}
                    ></LoadingElement>
                    {"\n                    BAIXAR MODELO\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"file-drop-area"}
                    onClick={(event) => {
                      document.getElementById("fileInput").click();
                    }}
                    style={styleFrom("padding: 25px; margin: 15px 0;")}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-cloud-upload-alt"}
                      style={styleFrom(
                        "font-size: 2rem; color: var(--text-muted);",
                      )}
                    ></LoadingElement>
                    <LoadingElement
                      as="span"
                      className={"file-msg"}
                      style={styleFrom(
                        "font-size: 0.8rem; color: var(--text-gray);",
                      )}
                    >
                      {"Clique ou arraste"}
                    </LoadingElement>
                    <LoadingElement
                      as="span"
                      style={styleFrom(
                        "color: var(--text-muted); font-size: 0.7rem;",
                      )}
                    >
                      {".xlsx, .xls, .csv"}
                    </LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"file"}
                      id={"fileInput"}
                      accept={".xlsx,.xls,.csv"}
                      style={styleFrom("display: none;")}
                    />
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    id={"fileName"}
                    className={"file-name"}
                    style={styleFrom(
                      [
                        "font-size: 0.75rem; padding: 6px; text-align: center; color: ",
                        "var(--success-green); background: var(--success-green-alpha); ",
                        "border-radius: 8px; margin-bottom: 10px;",
                      ].join(""),
                    )}
                  ></LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom("margin: 15px 0; text-align: center;")}
                  >
                    <LoadingElement
                      as="label"
                      style={styleFrom(
                        "display: inline-flex; align-items: center; gap: 5px; color: var(--text-white); cursor: pointer; font-size: 0.8rem;",
                      )}
                    >
                      <LoadingElement
                        as="input"
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
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    type={"button"}
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.importarPlanilha();
                    }}
                    style={styleFrom(
                      "width: 100%; padding: 12px; font-size: 0.9rem; margin-top: 5px; justify-content: center; height: 55px",
                    )}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-file-import"}
                    ></LoadingElement>
                    {" IMPORTAR\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="p"
                    style={styleFrom(
                      "color: var(--text-muted); font-size: 0.65rem; text-align: center; margin-top: 20px;",
                    )}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-info-circle"}
                      style={styleFrom("color: var(--success-green);")}
                    ></LoadingElement>
                    {
                      "\n                    Use o modelo para formato correto\n                "
                    }
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"previewImportModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement
                  as="div"
                  className={"modal-content"}
                  style={styleFrom(
                    "max-width: 600px; border-color: var(--success-green);",
                  )}
                >
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closePreviewModal();
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
                    style={styleFrom(
                      "text-align: center; margin-bottom: 20px; color: var(--success-green);",
                    )}
                  >
                    {"\n                    PRÉ-VISUALIZAÇÃO\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "text-align: center; margin-bottom: 20px;",
                    )}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-check-circle"}
                      style={styleFrom(
                        "font-size: 3rem; color: var(--success-green);",
                      )}
                    ></LoadingElement>
                    <LoadingElement
                      as="p"
                      style={styleFrom(
                        "color: var(--text-white); font-size: 1.1rem; margin: 10px 0;",
                      )}
                      id={"previewCount"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      [
                        "background: var(--card-bg); border: 2px solid ",
                        "var(--success-green); border-radius: 12px; padding: 15px; ",
                        "margin-bottom: 20px; max-height: 300px; overflow-y: auto;",
                      ].join(""),
                    )}
                  >
                    <LoadingElement
                      as="table"
                      style={styleFrom(
                        "width: 100%; border-collapse: collapse;",
                      )}
                    >
                      <LoadingElement as="thead">
                        <LoadingElement
                          as="tr"
                          style={styleFrom(
                            "border-bottom: 1px solid var(--border-color);",
                          )}
                        >
                          <LoadingElement
                            as="th"
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"NOME"}
                          </LoadingElement>
                          <LoadingElement
                            as="th"
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"ANO"}
                          </LoadingElement>
                          <LoadingElement
                            as="th"
                            style={styleFrom(
                              "padding: 8px; text-align: left; color: var(--text-gray);",
                            )}
                          >
                            {"COMPETÊNCIAS"}
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="tbody"
                        id={"previewList"}
                      ></LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: flex; gap: 10px; margin-top: 20px;",
                    )}
                  >
                    <LoadingElement
                      as="button"
                      className={"btn-secondary-dash"}
                      onClick={(event) => {
                        handlers.confirmarImportacao();
                      }}
                      style={styleFrom(
                        "flex: 1; justify-content: center; background: var(--success-green-alpha); border-color: var(--success-green); color: var(--text-white);",
                      )}
                    >
                      <LoadingElement
                        as="i"
                        className={"fas fa-check"}
                      ></LoadingElement>
                      {" CONFIRMAR\n                    "}
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      className={"btn-secondary-dash"}
                      onClick={(event) => {
                        handlers.closePreviewModal();
                      }}
                      style={styleFrom("flex: 1; justify-content: center;")}
                    >
                      <LoadingElement
                        as="i"
                        className={"fas fa-times"}
                      ></LoadingElement>
                      {" CANCELAR\n                    "}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="main"
                className={"edit-content"}
                key={nodes.length}
              >
                <LoadingElement as="section" className={"ai-editor-panel"}>
                  <LoadingElement as="details" className={"ai-accordion"}>
                    <LoadingElement
                      as="summary"
                      className={"ai-accordion-summary"}
                    >
                      <LoadingElement
                        as="div"
                        className={"ai-panel-heading"}
                        style={styleFrom(
                          "cursor: pointer; display: flex; align-items: center; justify-content: space-between; width: 100%;",
                        )}
                      >
                        <LoadingElement as="div">
                          <LoadingElement as="h2" className={"section-title-2"}>
                            {"SITUAÇÃO DO ALUNO"}
                          </LoadingElement>
                          <LoadingElement as="p">
                            {
                              "Gere uma leitura objetiva com base nas competências, presença e tarefas registradas."
                            }
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          style={styleFrom(
                            "display: flex; align-items: center; gap: 16px;",
                          )}
                        >
                          <LoadingElement
                            as="a"
                            className={"btn-secondary-dash"}
                            href={"/dashboard/ia"}
                          >
                            <LoadingElement
                              as="i"
                              className={"fas fa-comments"}
                            ></LoadingElement>
                            {" ABRIR CHAT"}
                          </LoadingElement>
                          <LoadingElement
                            as="span"
                            className={"ai-accordion-icon"}
                          >
                            <LoadingElement
                              as="i"
                              className={"ph-bold ph-caret-down"}
                            ></LoadingElement>
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"ai-accordion-content"}>
                      <LoadingElement as="div" className={"ai-editor-controls"}>
                        <LoadingElement
                          as="select"
                          id={"aiStudentSelect"}
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
                                {"Selecione um aluno"}
                              </LoadingElement>,
                            );
                            alunos.forEach((aluno) => {
                              nodes.push(
                                <LoadingElement
                                  as="option"
                                  value={aluno.id}
                                  key={nodes.length}
                                >
                                  {aluno.nome}
                                  {" - "}
                                  {aluno.ano_escolar}
                                </LoadingElement>,
                              );
                            });
                            return nodes;
                          })()}
                        </LoadingElement>
                        <LoadingElement
                          as="button"
                          className={"btn-secondary-dash"}
                          id={"aiAnalyzeStudent"}
                          type={"button"}
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-chart-line"}
                          ></LoadingElement>
                          {" ANALISAR"}
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        className={"ai-suggestion-list"}
                        aria-label={"Sugestões de análise"}
                      >
                        <LoadingElement
                          as="button"
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Elabore um diagnóstico pedagógico em texto corrido sobre este aluno, analisando rendimento geral, competências e pontos de atenção."
                          }
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-list-check"}
                          ></LoadingElement>
                          <LoadingElement as="span">
                            {"Diagnóstico"}
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="button"
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Sugira intervenções pedagógicas personalizadas e estratégias ativas para fortalecer o aprendizado deste aluno."
                          }
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-lightbulb"}
                          ></LoadingElement>
                          <LoadingElement as="span">
                            {"Intervenções"}
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="button"
                          type={"button"}
                          className={"ai-suggestion"}
                          data-ai-prompt={
                            "Faça uma análise detalhada sobre o engajamento, frequência e tarefas deste aluno, propondo ações práticas."
                          }
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-arrow-trend-up"}
                          ></LoadingElement>
                          <LoadingElement as="span">
                            {"Engajamento"}
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        id={"aiEditorResult"}
                        className={"ai-result"}
                        aria-live={"polite"}
                      >
                        {"A análise aparecerá aqui."}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"table-container"}>
                  <LoadingElement
                    as="table"
                    className={"alunos-table"}
                    id={"alunosTable"}
                  >
                    <LoadingElement as="thead">
                      <LoadingElement as="tr">
                        <LoadingElement as="th">{"ID"}</LoadingElement>
                        <LoadingElement as="th">{"ALUNO"}</LoadingElement>
                        <LoadingElement as="th">{"ANO ESCOLAR"}</LoadingElement>
                        <LoadingElement as="th">{"IDADE"}</LoadingElement>
                        <LoadingElement as="th">
                          {"MÉDIA DE NOTAS"}
                        </LoadingElement>
                        <LoadingElement as="th">
                          {"PRESENÇA (%)"}
                        </LoadingElement>
                        <LoadingElement as="th">{"NÍVEL"}</LoadingElement>
                        <LoadingElement as="th">{"AÇÕES"}</LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="tbody" id={"alunosTableBody"}>
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
                              <LoadingElement
                                as="tr"
                                data-aluno-id={aluno.id}
                                data-presenca={aluno.presenca}
                                key={nodes.length}
                              >
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:3"
                                    width="12ch"
                                    known={false}
                                    value={aluno.id}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:4"
                                    width="min(18ch, 100%)"
                                    known={true}
                                    value={aluno.nome}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:5"
                                    width="12ch"
                                    known={true}
                                    value={aluno.ano_escolar}
                                  />
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:6"
                                    width="3ch"
                                    known={false}
                                    value={aluno.idade}
                                  />
                                </LoadingElement>
                                <LoadingElement
                                  as="td"
                                  className={"media-notas"}
                                >
                                  {(() => {
                                    const nodes = [];
                                    if (temCompetencias) {
                                      nodes.push(
                                        <LoadingElement
                                          as="strong"
                                          key={nodes.length}
                                        >
                                          <LoadingValue
                                            slot="dashboard/dashboardEdit:7"
                                            width="3ch"
                                            known={false}
                                            value={mediaCompetencias.toFixed(1)}
                                          />
                                        </LoadingElement>,
                                      );
                                      nodes.push(
                                        <LoadingElement
                                          as="small"
                                          style={styleFrom(
                                            "color: #888; display: block;",
                                          )}
                                          key={nodes.length}
                                        >
                                          {"("}
                                          <LoadingValue
                                            slot="dashboard/dashboardEdit:8"
                                            width="12ch"
                                            known={false}
                                            value={aluno.competencias.length}
                                          />
                                          {" competências)"}
                                        </LoadingElement>,
                                      );
                                    } else {
                                      nodes.push(
                                        <LoadingElement
                                          as="span"
                                          style={styleFrom("color: #888;")}
                                          key={nodes.length}
                                        >
                                          {"Sem competências"}
                                        </LoadingElement>,
                                      );
                                    }
                                    return nodes;
                                  })()}
                                </LoadingElement>
                                <LoadingElement as="td">
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:9"
                                    width="3ch"
                                    known={false}
                                    value={aluno.presenca}
                                  />
                                  {"%"}
                                </LoadingElement>
                                <LoadingElement
                                  as="td"
                                  className={"status " + nivelClass}
                                  tone={true}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:10"
                                    width="12ch"
                                    known={false}
                                    value={nivelReal}
                                  />
                                </LoadingElement>
                                <LoadingElement
                                  as="td"
                                  className={"td-actions"}
                                >
                                  <LoadingElement
                                    as="button"
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
                                    <LoadingElement
                                      as="i"
                                      className={"ph-bold ph-pen"}
                                      aria-hidden={"true"}
                                    ></LoadingElement>
                                  </LoadingElement>
                                  <LoadingElement
                                    as="a"
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
                                    <LoadingElement
                                      as="i"
                                      className={"ph-bold ph-trash"}
                                      aria-hidden={"true"}
                                    ></LoadingElement>
                                  </LoadingElement>
                                </LoadingElement>
                              </LoadingElement>,
                            );
                          });
                        }
                        return nodes;
                      })()}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"competencias-section"}>
                  <LoadingElement as="h2" className={"section-title-2"}>
                    {"COMPETÊNCIAS POR ALUNO"}
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"search-container"}
                    style={styleFrom("margin-bottom: 25px; max-width: 400px;")}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-search"}
                    ></LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"text"}
                      id={"competenciasSearchInput"}
                      placeholder={"Procurar competências de aluno..."}
                    />
                  </LoadingElement>
                  <LoadingElement as="div" className={"competencias-grid"}>
                    {(() => {
                      const nodes = [];
                      if (alunos && alunos.length > 0) {
                        alunos.forEach((aluno) => {
                          if (
                            aluno.competencias &&
                            aluno.competencias.length > 0
                          ) {
                            nodes.push(
                              <LoadingElement
                                as="div"
                                className={"competencia-card"}
                                data-aluno-nome={aluno.nome.toLowerCase()}
                                key={nodes.length}
                              >
                                <LoadingElement
                                  as="div"
                                  className={"competencia-header"}
                                >
                                  <LoadingElement as="h3">
                                    <LoadingValue
                                      slot="dashboard/dashboardEdit:11"
                                      width="min(18ch, 100%)"
                                      known={true}
                                      value={aluno.nome}
                                    />
                                  </LoadingElement>
                                  <LoadingElement
                                    as="span"
                                    className={"competencia-ano"}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardEdit:12"
                                      width="12ch"
                                      known={true}
                                      value={aluno.ano_escolar}
                                    />
                                  </LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"competencia-list"}
                                >
                                  {(() => {
                                    const nodes = [];
                                    aluno.competencias.forEach((comp) => {
                                      const compClass =
                                        comp.gradeClass === "desenvolvimento"
                                          ? "em-desenvolvimento"
                                          : comp.gradeClass;
                                      nodes.push(
                                        <LoadingElement
                                          as="div"
                                          className={"competencia-item"}
                                          key={nodes.length}
                                        >
                                          <LoadingElement
                                            as="div"
                                            className={"competencia-info"}
                                          >
                                            {(() => {
                                              const nodes = [];
                                              nodes.push(
                                                <LoadingElement
                                                  as="span"
                                                  className={"competencia-nome"}
                                                  key={nodes.length}
                                                >
                                                  <LoadingValue
                                                    slot="dashboard/dashboardEdit:13"
                                                    width="min(18ch, 100%)"
                                                    known={false}
                                                    value={comp.nome}
                                                  />
                                                </LoadingElement>,
                                              );
                                              if (comp.observacoes) {
                                                nodes.push(
                                                  <LoadingElement
                                                    as="span"
                                                    className={
                                                      "competencia-desc"
                                                    }
                                                    key={nodes.length}
                                                  >
                                                    <LoadingValue
                                                      slot="dashboard/dashboardEdit:14"
                                                      width="min(32ch, 100%)"
                                                      known={false}
                                                      value={comp.observacoes.substring(
                                                        0,
                                                        30,
                                                      )}
                                                    />
                                                    <LoadingValue
                                                      slot="dashboard/dashboardEdit:15"
                                                      width="min(32ch, 100%)"
                                                      known={false}
                                                      value={
                                                        comp.observacoes
                                                          .length > 30
                                                          ? "..."
                                                          : ""
                                                      }
                                                    />
                                                  </LoadingElement>,
                                                );
                                              }
                                              return nodes;
                                            })()}
                                          </LoadingElement>
                                          <LoadingElement
                                            as="span"
                                            className={
                                              "competencia-nota " + compClass
                                            }
                                            tone={true}
                                          >
                                            <LoadingValue
                                              slot="dashboard/dashboardEdit:16"
                                              width="3ch"
                                              known={false}
                                              value={parseFloat(
                                                comp.nota,
                                              ).toFixed(1)}
                                            />
                                          </LoadingElement>
                                        </LoadingElement>,
                                      );
                                    });
                                    return nodes;
                                  })()}
                                </LoadingElement>
                              </LoadingElement>,
                            );
                          }
                        });
                      }
                      return nodes;
                    })()}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"evolution-container"}>
                  <LoadingElement as="h2" className={"section-title-2"}>
                    {"EVOLUÇÃO INDIVIDUAL POR ALUNO"}
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"search-container"}
                    style={styleFrom("margin-bottom: 25px; max-width: 400px;")}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-search"}
                    ></LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"text"}
                      id={"chartSearchInput"}
                      placeholder={"Procurar gráfico de aluno..."}
                    />
                  </LoadingElement>
                  <LoadingElement as="div" className={"charts-grid"}>
                    {(() => {
                      const nodes = [];
                      if (alunos && alunos.length > 0) {
                        alunos.forEach((aluno) => {
                          if (
                            aluno.competencias &&
                            aluno.competencias.length > 0
                          ) {
                            nodes.push(
                              <LoadingElement
                                as="div"
                                className={"chart-card"}
                                data-aluno-nome={aluno.nome.toLowerCase()}
                                key={nodes.length}
                              >
                                <LoadingElement as="h3">
                                  {"ALUNO: "}
                                  <LoadingValue
                                    slot="dashboard/dashboardEdit:17"
                                    width="min(18ch, 100%)"
                                    known={true}
                                    value={aluno.nome}
                                  />
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"chart-wrapper"}
                                  style={styleFrom(
                                    "position: relative; height: 300px; width: 100%;",
                                  )}
                                >
                                  <LoadingCanvas
                                    id={"chart-" + aluno.id}
                                    variant="plot"
                                    frame={true}
                                  ></LoadingCanvas>
                                </LoadingElement>
                              </LoadingElement>,
                            );
                          }
                        });
                      }
                      return nodes;
                    })()}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"filterModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement as="div" className={"modal-content"}>
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeFilter();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-x"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="h2" className={"section-title-2"}>
                    {"FILTRAR LISTA"}
                  </LoadingElement>
                  <LoadingElement as="div" className={"filter-options"}>
                    <LoadingElement as="label">{"ANO ESCOLAR:"}</LoadingElement>
                    <LoadingElement
                      as="select"
                      id={"filterAno"}
                      className={"filter-input"}
                    >
                      <LoadingElement as="option" value={""}>
                        {"TODOS OS ANOS"}
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
                    <LoadingElement
                      as="label"
                      style={styleFrom("margin-top: 15px; display: block;")}
                    >
                      {"STATUS:"}
                    </LoadingElement>
                    <LoadingElement
                      as="select"
                      id={"filterStatus"}
                      className={"filter-input"}
                    >
                      <LoadingElement as="option" value={""}>
                        {"TODOS OS NÍVEIS"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"APTO"}>
                        {"APTO"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"INAPTO"}>
                        {"INAPTO"}
                      </LoadingElement>
                      <LoadingElement as="option" value={"EM DESENVOLVIMENTO"}>
                        {"EM DESENVOLVIMENTO"}
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      style={styleFrom(
                        "display: flex; gap: 10px; margin-top: 25px;",
                      )}
                    >
                      <LoadingElement
                        as="button"
                        className={"btn-secondary-dash"}
                        onClick={(event) => {
                          handlers.applyFilter();
                        }}
                        style={styleFrom("flex: 2; justify-content: center;")}
                      >
                        {"FILTRAR"}
                      </LoadingElement>
                      <LoadingElement
                        as="button"
                        className={"btn-secondary-dash"}
                        onClick={(event) => {
                          handlers.clearFilters();
                        }}
                        style={styleFrom("flex: 1; justify-content: center;")}
                      >
                        {"LIMPAR"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"addAlunoModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement
                  as="div"
                  className={"modal-content claude-modal claude-create-student"}
                >
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeAddModal();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-x"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"claude-modal-heading"}>
                    <LoadingElement as="span" className={"claude-modal-kicker"}>
                      {"Alunos"}
                    </LoadingElement>
                    <LoadingElement as="h2">{"Adicionar aluno"}</LoadingElement>
                    <LoadingElement as="p">
                      {
                        "Cadastre um novo aluno para acompanhar seu desempenho acadêmico."
                      }
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="form"
                    action={"/dashboard/add-aluno"}
                    method={"POST"}
                    className={"filter-options claude-form"}
                  >
                    <LoadingElement
                      as="input"
                      type={"hidden"}
                      name={"_csrf"}
                      value={csrfToken}
                    />
                    <LoadingElement as="label">
                      {"NOME COMPLETO:"}
                    </LoadingElement>
                    <LoadingElement
                      as="input"
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
                    <LoadingElement
                      as="label"
                      style={styleFrom("margin-top: 15px; display: block;")}
                    >
                      {"ANO ESCOLAR:"}
                    </LoadingElement>
                    <LoadingElement
                      as="select"
                      name={"ano_escolar"}
                      className={"filter-input"}
                    >
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
                    <LoadingElement
                      as="div"
                      style={styleFrom(
                        "display: flex; gap: 10px; margin-top: 15px;",
                      )}
                    >
                      <LoadingElement as="div" style={styleFrom("flex: 1;")}>
                        <LoadingElement as="label">{"IDADE:"}</LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"number"}
                          name={"idade"}
                          min={"14"}
                          max={"20"}
                          className={"filter-input"}
                          required={true}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"claude-modal-actions"}>
                      <LoadingElement
                        as="button"
                        type={"button"}
                        className={"claude-btn-secondary"}
                        onClick={(event) => {
                          handlers.closeAddModal();
                        }}
                      >
                        {"Cancelar"}
                      </LoadingElement>
                      <LoadingElement
                        as="button"
                        type={"submit"}
                        className={"claude-btn-primary"}
                      >
                        {"Criar aluno"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"editAlunoModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement
                  as="div"
                  className={"modal-content"}
                  style={styleFrom("max-width: 450px; padding: 30px;")}
                >
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeEditModal();
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
                    <LoadingElement
                      as="i"
                      className={"fas fa-user-edit"}
                    ></LoadingElement>
                    <LoadingElement
                      as="span"
                      id={"editNomeAluno"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"edit-tabs"}
                    style={styleFrom(
                      "display: grid; grid-template-columns: 1fr 1fr;border-bottom: none;",
                    )}
                  >
                    <LoadingElement
                      as="button"
                      className={"tab-btn active"}
                      onClick={(event) => {
                        handlers.showEditTab("info");
                      }}
                      id={"btn-tab-info"}
                    >
                      {"ACESSO"}
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("notas");
                      }}
                      id={"btn-tab-notas"}
                    >
                      {"NOTAS"}
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("add");
                      }}
                      id={"btn-tab-add"}
                    >
                      {"LANÇAR"}
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      className={"tab-btn"}
                      onClick={(event) => {
                        handlers.showEditTab("presenca");
                      }}
                      id={"btn-tab-presenca"}
                    >
                      {"FALTAS"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 15px;",
                    )}
                  >
                    <LoadingElement
                      as="div"
                      id={"editInfoTab"}
                      className={"tab-content active"}
                    >
                      <LoadingElement
                        as="div"
                        id={"loginInfo"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      id={"editNotasTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <LoadingElement
                        as="h3"
                        style={styleFrom(
                          "font-size: 0.7rem; color: var(--text-gray); margin-bottom: 10px; letter-spacing: 1px;",
                        )}
                      >
                        {"COMPETÊNCIAS REGISTRADAS"}
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        id={"competenciasListContainer"}
                        className={"competencias-list-edit"}
                        style={styleFrom("max-height: 200px;")}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      id={"editAddTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <LoadingElement
                        as="form"
                        action={"/dashboard/adicionar-competencia"}
                        method={"POST"}
                        className={"filter-options"}
                      >
                        <LoadingElement
                          as="input"
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <LoadingElement
                          as="input"
                          type={"hidden"}
                          name={"aluno_id"}
                          id={"editAlunoIdComp"}
                        />
                        <LoadingElement
                          as="div"
                          style={styleFrom(
                            "display: grid; grid-template-columns: 2fr 1fr; gap: 10px;",
                          )}
                        >
                          <LoadingElement as="div">
                            <LoadingElement
                              as="label"
                              style={styleFrom("margin-top: 0;")}
                            >
                              {"COMPETÊNCIA:"}
                            </LoadingElement>
                            <LoadingElement
                              as="select"
                              name={"competencia_id"}
                              className={"filter-input"}
                              style={styleFrom(
                                "padding: 10px; font-size: 0.8rem;",
                              )}
                              required={true}
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
                                    {"SELECIONE..."}
                                  </LoadingElement>,
                                );
                                if (
                                  listaCompetencias &&
                                  listaCompetencias.length > 0
                                ) {
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
                          </LoadingElement>
                          <LoadingElement as="div">
                            <LoadingElement
                              as="label"
                              style={styleFrom("margin-top: 0;")}
                            >
                              {"NOTA:"}
                            </LoadingElement>
                            <LoadingElement
                              as="input"
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
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="label"
                          style={styleFrom("margin-top: 10px;")}
                        >
                          {"OBSERVAÇÕES:"}
                        </LoadingElement>
                        <LoadingElement
                          as="textarea"
                          name={"observacoes"}
                          className={"filter-input"}
                          style={styleFrom(
                            "height: 60px; padding: 10px; font-size: 0.8rem;",
                          )}
                          placeholder={"Feedback..."}
                          defaultValue={""}
                        ></LoadingElement>
                        <LoadingElement
                          as="button"
                          type={"submit"}
                          className={"btn-secondary-dash"}
                          style={styleFrom(
                            "margin-top: 15px; height: 45px; justify-content: center; font-size: 0.75rem;",
                          )}
                        >
                          {"REGISTRAR NOTA"}
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      id={"editPresencaTab"}
                      className={"tab-content"}
                      style={styleFrom("display: none;")}
                    >
                      <LoadingElement
                        as="form"
                        action={"/dashboard/atualizar-presenca"}
                        method={"POST"}
                        className={"filter-options"}
                      >
                        <LoadingElement
                          as="input"
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <LoadingElement
                          as="input"
                          type={"hidden"}
                          name={"aluno_id"}
                          id={"editAlunoId"}
                        />
                        <LoadingElement
                          as="label"
                          style={styleFrom("margin-top: 0;")}
                        >
                          {"FREQUÊNCIA ATUAL (%)"}
                        </LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"number"}
                          name={"presenca"}
                          id={"editPresencaInput"}
                          min={"0"}
                          max={"100"}
                          className={"filter-input"}
                          style={styleFrom("padding: 10px;")}
                          required={true}
                        />
                        <LoadingElement
                          as="button"
                          type={"submit"}
                          className={"btn-secondary-dash"}
                          style={styleFrom(
                            "margin-top: 20px; height: 45px; justify-content: center; font-size: 0.75rem;",
                          )}
                        >
                          {"ATUALIZAR STATUS"}
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="div"
                id={"exportSuccessModal"}
                className={"modal-overlay"}
                key={nodes.length}
              >
                <LoadingElement
                  as="div"
                  className={"modal-content"}
                  style={styleFrom(
                    "display: flex; flex-direction: column; align-items: center;",
                  )}
                >
                  <LoadingElement
                    as="button"
                    className={"close-btn"}
                    onClick={(event) => {
                      handlers.closeExportModal();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-x"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="h2"
                    className={"modal-title-success"}
                    style={styleFrom("color: #fff;")}
                  >
                    {"Relatório Gerado"}
                  </LoadingElement>
                  <LoadingElement as="p" className={"modal-text-success"}>
                    {
                      "A planilha foi processada com sucesso e o seu download já começou."
                    }
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.closeExportModal();
                    }}
                  >
                    {"CONCLUIR"}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>,
            );
            nodes.push(
              <LoadingElement
                as="footer"
                className={"dash-footer"}
                key={nodes.length}
              >
                <LoadingElement
                  as="a"
                  href={"#"}
                  onClick={(event) => {
                    handlers.exportarTabelaParaExcel();
                  }}
                  className={"btn-secondary-dash"}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-file-export"}
                  ></LoadingElement>
                  {" EXPORTAR PLANILHA COMPLETA\n            "}
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
        <LoadingElement as="div" id={"errorModal"} className={"modal-overlay"}>
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom(
              "max-width: 450px; border-color: var(--primary-red);",
            )}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.closeErrorModal();
              }}
            >
              <LoadingElement
                as="i"
                className={"ph-bold ph-x"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" style={styleFrom("text-align: center;")}>
              <LoadingElement
                as="div"
                style={styleFrom(
                  "font-size: 4rem; color: var(--primary-red); margin-bottom: 15px;",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-exclamation-triangle"}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="h2"
                className={"section-title-2"}
                style={styleFrom(
                  "color: var(--primary-red); margin-bottom: 15px;",
                )}
                id={"errorTitulo"}
              >
                {"\n                    ERRO\n                "}
              </LoadingElement>
              <LoadingElement
                as="p"
                style={styleFrom(
                  "color: var(--text-gray); font-size: 1rem; margin-bottom: 10px;",
                )}
                id={"errorMensagem"}
              >
                {"\n                    Ocorreu um erro\n                "}
              </LoadingElement>
              <LoadingElement
                as="div"
                style={styleFrom(
                  "background: var(--bg-secondary); border-radius: 8px; padding: 10px; margin: 15px 0;",
                )}
              >
                <LoadingElement
                  as="p"
                  style={styleFrom(
                    "color: var(--primary-red); font-size: 0.85rem;",
                  )}
                  id={"errorDetalhe"}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"btn-action"}
                onClick={(event) => {
                  handlers.closeErrorModal();
                }}
                style={styleFrom(
                  "width: 100%; justify-content: center; border-color: var(--primary-red); color: var(--primary-red);",
                )}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-times"}
                ></LoadingElement>
                {" FECHAR\n                "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"loadingModal"}
          className={"modal-overlay"}
        >
          <LoadingElement
            as="div"
            className={"modal-content"}
            style={styleFrom(
              "max-width: 400px; text-align: center; border-color: var(--success-green);",
            )}
          >
            <LoadingElement as="div" style={styleFrom("padding: 30px;")}>
              <LoadingElement
                as="div"
                className={"loading-spinner"}
                style={styleFrom("margin: 20px auto;")}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-circle-notch fa-spin"}
                  style={styleFrom(
                    "font-size: 4rem; color: var(--success-green);",
                  )}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="h3"
                style={styleFrom(
                  "color: var(--text-white); margin-bottom: 15px;",
                )}
              >
                {"IMPORTANDO DADOS"}
              </LoadingElement>
              <LoadingElement
                as="p"
                style={styleFrom(
                  "color: var(--text-gray); margin-bottom: 20px;",
                )}
              >
                {"Processando alunos e competências..."}
              </LoadingElement>
              <LoadingElement
                as="div"
                style={styleFrom(
                  "width: 100%; height: 6px; background: var(--bg-secondary); border-radius: 10px; overflow: hidden;",
                )}
              >
                <LoadingElement
                  as="div"
                  id={"loadingBar"}
                  style={styleFrom(
                    "width: 0%; height: 100%; background: var(--success-green); transition: width 0.3s ease;",
                  )}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="p"
                id={"loadingStatus"}
                style={styleFrom(
                  "color: var(--text-gray); font-size: 0.8rem; margin-top: 10px;",
                )}
              >
                {"0% concluído"}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"credenciaisModal"}
          className={"modal-overlay"}
          style={styleFrom("display:none;")}
        >
          <LoadingElement
            as="div"
            className={"modal-content modal-lg"}
            style={styleFrom("max-width: 800px;")}
          >
            <LoadingElement
              as="button"
              className={"close-btn"}
              onClick={(event) => {
                handlers.fecharModalCredenciais();
              }}
            >
              {"×"}
            </LoadingElement>
            <LoadingElement
              as="h2"
              style={styleFrom(
                "color: var(--text-white); margin-bottom: 10px; text-align: center; letter-spacing: 1px;",
              )}
            >
              <LoadingElement
                as="i"
                className={"fas fa-user-check"}
                style={styleFrom("color: var(--success-green);")}
              ></LoadingElement>
              {" Alunos Importados com Sucesso!\n        "}
            </LoadingElement>
            <LoadingElement
              as="p"
              style={styleFrom(
                "color: var(--text-gray); text-align: center; margin-bottom: 20px;",
              )}
            >
              {
                "\n            Abaixo estão as credenciais de acesso para cada aluno. Guarde-as com segurança.\n        "
              }
            </LoadingElement>
            <LoadingElement as="div" id={"credenciaisLista"}></LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <PageDataScript type="application/json" id="dashboard-edit-data">
          {String(safeJson(alunos))}
        </PageDataScript>
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
    alunos = [],
    csrfToken = null,
    listaCompetencias = [],
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Editor de Notas\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardEdit:18"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="span"
              className={"user-role"}
              style={styleFrom("color: var(--text-gray);")}
            >
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardEdit:19"
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
