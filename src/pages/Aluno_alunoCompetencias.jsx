import {
  LoadingValue,
  LoadingElement,
  LoadingCanvas,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoCompetencias({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    stats = {},
    competencias = [],
  } = data;
  return (
    <>
      <React.Fragment>
        {(() => {
          const nodes = [];
          nodes.push(
            <Partials_barAluno
              data={{
                ...data,
              }}
              handlers={handlers}
              key={nodes.length}
            />,
          );
          nodes.push(
            <LoadingElement
              as="div"
              className={"main-layout"}
              key={nodes.length}
              root={true}
            >
              <PageHeader key="page-header" data={data} handlers={handlers} />
              <LoadingElement as="main" className={"dash-content"}>
                {(() => {
                  const nodes = [];
                  nodes.push(
                    <LoadingElement
                      as="section"
                      className={"welcome-banner"}
                      style={styleFrom(
                        "background: linear-gradient(90deg, #1b5e38 0%, #217346 100%); padding: 40px;",
                      )}
                      key={nodes.length}
                    >
                      <LoadingElement as="div" className={"banner-text"}>
                        <LoadingElement as="h1">
                          <LoadingElement
                            as="i"
                            className={"fas fa-medal"}
                          ></LoadingElement>
                          {" Relatório de Competências"}
                        </LoadingElement>
                        <LoadingElement as="p">
                          {
                            "Filtre, analise e acompanhe o detalhamento de cada habilidade avaliada pelos seus professores."
                          }
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
                      <LoadingElement as="div" className={"dash-grid"}>
                        <LoadingElement as="div" className={"stats-card"}>
                          <LoadingElement as="h3">
                            {"TOTAL AVALIADAS"}
                          </LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoCompetencias:1"
                              width="3ch"
                              known={false}
                              value={stats.total || 0}
                            />
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"stats-card apto"}>
                          <LoadingElement as="h3">{"APTAS"}</LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoCompetencias:2"
                              width="3ch"
                              known={false}
                              value={stats.aptas || 0}
                            />
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"stats-card desenvolvimento"}
                        >
                          <LoadingElement as="h3">
                            {"EM DESENVOLVIMENTO"}
                          </LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoCompetencias:3"
                              width="3ch"
                              known={false}
                              value={stats.desenvolvimento || 0}
                            />
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"stats-card inapto"}
                        >
                          <LoadingElement as="h3">{"INAPTAS"}</LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoCompetencias:4"
                              width="3ch"
                              known={false}
                              value={stats.inaptas || 0}
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
                      <LoadingElement
                        as="div"
                        className={"stats-card"}
                        style={styleFrom(
                          "padding: 25px; display: flex; flex-direction: column; gap: 15px; justify-content: space-between;",
                        )}
                      >
                        <LoadingElement
                          as="div"
                          style={styleFrom(
                            "display: flex; gap: 15px; flex-wrap: wrap; align-items: center; flex: 1; justify-content: space-between;",
                          )}
                        >
                          <LoadingElement
                            as="input"
                            type={"text"}
                            id={"searchInput"}
                            style={styleFrom(
                              "flex: 2; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width:50%;",
                            )}
                            placeholder={"Pesquisar competência..."}
                          />
                          <LoadingElement
                            as="select"
                            id={"categoriaFilter"}
                            style={styleFrom(
                              "flex: 1; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width: 25%",
                            )}
                          >
                            <LoadingElement as="option" value={""}>
                              {"TODAS CATEGORIAS"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"Técnica"}>
                              {"TÉCNICA"}
                            </LoadingElement>
                            <LoadingElement
                              as="option"
                              value={"Comportamental"}
                            >
                              {"COMPORTAMENTAL"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"Cognitiva"}>
                              {"COGNITIVA"}
                            </LoadingElement>
                          </LoadingElement>
                          <LoadingElement
                            as="select"
                            id={"nivelFilter"}
                            style={styleFrom(
                              "flex: 1; background: var(--card-bg); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-white); max-width: 25%;",
                            )}
                          >
                            <LoadingElement as="option" value={""}>
                              {"TODOS OS NÍVEIS"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"apto"}>
                              {"APTO"}
                            </LoadingElement>
                            <LoadingElement
                              as="option"
                              value={"desenvolvimento"}
                            >
                              {"DESENVOLVIMENTO"}
                            </LoadingElement>
                            <LoadingElement as="option" value={"inapto"}>
                              {"INAPTO"}
                            </LoadingElement>
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          style={styleFrom("display: flex; gap: 15px;")}
                        >
                          <LoadingElement
                            as="button"
                            onClick={(event) => {
                              handlers.aplicarFiltros();
                            }}
                            className={"btn-secondary-dash"}
                            style={styleFrom("height: 50px;")}
                          >
                            <LoadingElement
                              as="i"
                              className={"fas fa-filter"}
                            ></LoadingElement>
                            {" FILTRAR\n                        "}
                          </LoadingElement>
                          <LoadingElement
                            as="button"
                            onClick={(event) => {
                              handlers.limparFiltros();
                            }}
                            className={"btn-secondary-dash"}
                            style={styleFrom("height: 50px;")}
                          >
                            <LoadingElement
                              as="i"
                              className={"fas fa-times"}
                            ></LoadingElement>
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
                            as="div"
                            style={styleFrom(
                              "display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;",
                            )}
                            key={nodes.length}
                          >
                            <LoadingElement
                              as="h2"
                              className={"section-title-2"}
                              style={styleFrom("margin-bottom: 0;")}
                            >
                              {"DETALHAMENTO"}
                            </LoadingElement>
                            <LoadingElement
                              as="select"
                              id={"ordenarSelect"}
                              onChange={(event) => {
                                handlers.ordenarCompetencias();
                              }}
                              style={styleFrom(
                                "background: var(--card-bg); border: 1px solid var(--border-color); padding: 8px 15px; border-radius: 8px; color: #888; font-size: 0.8rem;",
                              )}
                            >
                              <LoadingElement as="option" value={"data_desc"}>
                                {"MAIS RECENTES"}
                              </LoadingElement>
                              <LoadingElement as="option" value={"nome_asc"}>
                                {"A-Z"}
                              </LoadingElement>
                            </LoadingElement>
                          </LoadingElement>,
                        );
                        if (competencias && competencias.length > 0) {
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"dash-grid"}
                              id={"competenciasGrid"}
                              key={nodes.length}
                            >
                              {(() => {
                                const nodes = [];
                                competencias.forEach((comp) => {
                                  let notaNum = parseFloat(comp.nota) || 0;
                                  let statusClass = comp.gradeClass;
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
                                      className={"stats-card " + statusClass}
                                      data-nome={comp.nome.toLowerCase()}
                                      data-categoria={comp.categoria || ""}
                                      data-nivel={statusClass}
                                      data-nota={notaNum}
                                      data-data={comp.data_registro}
                                      style={styleFrom(
                                        "padding: 25px; border-left: 6px solid var(--color-" +
                                          statusClass +
                                          ");",
                                      )}
                                      key={nodes.length}
                                      tone={true}
                                    >
                                      {(() => {
                                        const nodes = [];
                                        nodes.push(
                                          <LoadingElement
                                            as="div"
                                            style={styleFrom(
                                              "display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;",
                                            )}
                                            key={nodes.length}
                                          >
                                            <LoadingElement as="div">
                                              <LoadingElement
                                                as="h3"
                                                style={styleFrom(
                                                  "color: var(--text-white); font-size: 1.1rem; margin-bottom: 5px;",
                                                )}
                                              >
                                                <LoadingValue
                                                  slot="aluno/alunoCompetencias:5"
                                                  width="min(18ch, 100%)"
                                                  known={false}
                                                  value={comp.nome}
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
                                                  slot="aluno/alunoCompetencias:6"
                                                  width="min(18ch, 100%)"
                                                  known={false}
                                                  value={
                                                    comp.categoria || "GERAL"
                                                  }
                                                />
                                              </LoadingElement>
                                            </LoadingElement>
                                            <LoadingElement
                                              as="span"
                                              className={
                                                "media-nota " + statusClass
                                              }
                                              style={styleFrom(
                                                "font-size: 1.2rem; padding: 5px 15px;",
                                              )}
                                              tone={true}
                                            >
                                              <LoadingValue
                                                slot="aluno/alunoCompetencias:7"
                                                width="3ch"
                                                known={false}
                                                value={notaNum.toFixed(1)}
                                              />
                                            </LoadingElement>
                                          </LoadingElement>,
                                        );
                                        nodes.push(
                                          <LoadingElement
                                            as="p"
                                            style={styleFrom(
                                              "font-size: 0.85rem; color: var(--text-gray); line-height: 1.5; margin-bottom: 15px;",
                                            )}
                                            key={nodes.length}
                                          >
                                            <LoadingValue
                                              slot="aluno/alunoCompetencias:8"
                                              width="min(32ch, 100%)"
                                              known={false}
                                              value={
                                                comp.descricao ||
                                                "Sem descrição disponível."
                                              }
                                            />
                                          </LoadingElement>,
                                        );
                                        if (comp.observacoes) {
                                          nodes.push(
                                            <LoadingElement
                                              as="div"
                                              style={styleFrom(
                                                "background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; margin-bottom: 15px;",
                                              )}
                                              key={nodes.length}
                                            >
                                              <LoadingElement
                                                as="p"
                                                style={styleFrom(
                                                  "font-size: 0.8rem; color: #aaa; font-style: italic;",
                                                )}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "fas fa-quote-left"
                                                  }
                                                  style={styleFrom(
                                                    "color: var(--color-" +
                                                      statusClass +
                                                      ");",
                                                  )}
                                                ></LoadingElement>
                                                <LoadingValue
                                                  slot="aluno/alunoCompetencias:9"
                                                  width="min(32ch, 100%)"
                                                  known={false}
                                                  value={comp.observacoes}
                                                />
                                              </LoadingElement>
                                            </LoadingElement>,
                                          );
                                        }
                                        nodes.push(
                                          <LoadingElement
                                            as="div"
                                            style={styleFrom(
                                              "border-top: 1px solid var(--border-soft); padding-top: 15px; font-size: 0.75rem; color: var(--text-muted);",
                                            )}
                                            key={nodes.length}
                                          >
                                            <LoadingElement
                                              as="i"
                                              className={"far fa-calendar-alt"}
                                            ></LoadingElement>
                                            <LoadingValue
                                              slot="aluno/alunoCompetencias:10"
                                              width="10ch"
                                              known={false}
                                              value={comp.data_formatada}
                                            />
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
                                className={"fas fa-clipboard-list"}
                                style={styleFrom(
                                  "font-size: 4rem; color: var(--border-color); margin-bottom: 20px;",
                                )}
                              ></LoadingElement>
                              <LoadingElement as="h3">
                                {"Nenhuma competência avaliada"}
                              </LoadingElement>
                            </LoadingElement>,
                          );
                        }
                        return nodes;
                      })()}
                    </LoadingElement>,
                  );
                  if (competencias && competencias.length > 0) {
                    nodes.push(
                      <LoadingElement
                        as="section"
                        className={"section-container"}
                        key={nodes.length}
                      >
                        <LoadingElement as="div" className={"stats-card"}>
                          <LoadingElement
                            as="h2"
                            className={"section-title-2"}
                            style={styleFrom("margin-bottom: 20px;")}
                          >
                            {"DESEMPENHO POR HABILIDADE"}
                          </LoadingElement>
                          <LoadingElement
                            as="div"
                            style={styleFrom(
                              "height: 300px; position: relative;",
                            )}
                          >
                            <LoadingCanvas
                              id={"competenciasChart"}
                              variant="plot"
                              frame={true}
                            ></LoadingCanvas>
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                  }
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
            </LoadingElement>,
          );
          if (competencias && competencias.length > 0) {
            nodes.push(
              <PageDataScript
                type="application/json"
                id="aluno-competencias-data"
                key={nodes.length}
              >
                {String(safeJson(competencias))}
              </PageDataScript>,
            );
          }
          return nodes;
        })()}
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
    stats = {},
    competencias = [],
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
              slot="aluno/alunoCompetencias:11"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
          </LoadingElement>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="aluno/alunoCompetencias:12"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoCompetencias:13"
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
