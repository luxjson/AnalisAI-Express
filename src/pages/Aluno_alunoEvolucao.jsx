import {
  LoadingCanvas,
  LoadingValue,
  LoadingElement,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoEvolucao({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    competencias = [],
    categorias = [],
    historico = [],
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
              <main className={"dash-content"}>
                {(() => {
                  const nodes = [];
                  if (competencias && competencias.length > 0) {
                    nodes.push(
                      <section
                        className={"welcome-banner"}
                        style={styleFrom(
                          "background: linear-gradient(90deg, #1b5e38 0%, #217346 100%); padding-bottom: 60px;",
                        )}
                        key={nodes.length}
                      >
                        <div className={"banner-text"}>
                          <h1>{"Sua Jornada Acadêmica"}</h1>
                          <p>
                            {
                              "Acompanhe em tempo real o seu crescimento e a consolidação das suas competências."
                            }
                          </p>
                        </div>
                      </section>,
                    );
                    nodes.push(
                      <section className={"filter-bar"} key={nodes.length}>
                        <div className={"periodo-selector"}>
                          <button
                            className={"periodo-btn active"}
                            onClick={(event) => {
                              handlers.mudarPeriodo("7d", event.currentTarget);
                            }}
                          >
                            {"7 Dias"}
                          </button>
                          <button
                            className={"periodo-btn"}
                            onClick={(event) => {
                              handlers.mudarPeriodo("30d", event.currentTarget);
                            }}
                          >
                            {"30 Dias"}
                          </button>
                          <button
                            className={"periodo-btn"}
                            onClick={(event) => {
                              handlers.mudarPeriodo("90d", event.currentTarget);
                            }}
                          >
                            {"90 Dias"}
                          </button>
                          <button
                            className={"periodo-btn"}
                            onClick={(event) => {
                              handlers.mudarPeriodo("all", event.currentTarget);
                            }}
                          >
                            {"Todo o Curso"}
                          </button>
                        </div>
                      </section>,
                    );
                    nodes.push(
                      <section
                        className={"section-container"}
                        key={nodes.length}
                      >
                        <div
                          className={"stats-card"}
                          style={styleFrom("padding: 40px;")}
                        >
                          <h2
                            className={"section-title-2"}
                            style={styleFrom("margin-bottom: 30px;")}
                          >
                            {"Desempenho Temporal"}
                          </h2>
                          <div
                            style={styleFrom(
                              "height: 400px; position: relative;",
                            )}
                          >
                            <LoadingCanvas
                              id={"evolucaoChart"}
                              variant="plot"
                              frame={true}
                            ></LoadingCanvas>
                          </div>
                        </div>
                      </section>,
                    );
                    if (categorias && categorias.length > 0) {
                      nodes.push(
                        <section
                          className={"section-container"}
                          key={nodes.length}
                        >
                          <h2 className={"section-title-2"}>
                            {"Performance por Área de Conhecimento"}
                          </h2>
                          <div className={"dash-grid"}>
                            {(() => {
                              const nodes = [];
                              categorias.forEach((cat) => {
                                let mediaCat = cat.media / 10;
                                let colorClass = cat.gradeClass;
                                nodes.push(
                                  <div
                                    className={"stats-card"}
                                    style={styleFrom(
                                      "border-left: 5px solid var(--color-" +
                                        colorClass +
                                        ");",
                                    )}
                                    key={nodes.length}
                                  >
                                    <div
                                      style={styleFrom(
                                        "display: flex; justify-content: space-between; align-items: center;",
                                      )}
                                    >
                                      <h3
                                        style={styleFrom(
                                          "margin-bottom: 0; color: var(--text-white);",
                                        )}
                                      >
                                        <LoadingValue
                                          slot="aluno/alunoEvolucao:1"
                                          width="min(18ch, 100%)"
                                          known={false}
                                          value={cat.categoria}
                                        />
                                      </h3>
                                      <LoadingElement
                                        as="span"
                                        className={"media-nota " + colorClass}
                                        tone={true}
                                      >
                                        <LoadingValue
                                          slot="aluno/alunoEvolucao:2"
                                          width="3ch"
                                          known={false}
                                          value={mediaCat.toFixed(1)}
                                        />
                                      </LoadingElement>
                                    </div>
                                    <div className={"progresso-bar-container"}>
                                      <LoadingElement
                                        as="div"
                                        className={"progresso-bar-fill"}
                                        style={styleFrom(
                                          "width: " +
                                            cat.media +
                                            "%; background: var(--color-" +
                                            colorClass +
                                            ");",
                                        )}
                                        fill={true}
                                      ></LoadingElement>
                                    </div>
                                    <p
                                      style={styleFrom(
                                        "font-size: 0.7rem; color: var(--text-muted); margin-top: 10px; text-transform: uppercase;",
                                      )}
                                    >
                                      {
                                        "\n                                    Aproveitamento: "
                                      }
                                      <LoadingValue
                                        slot="aluno/alunoEvolucao:3"
                                        width="3ch"
                                        known={false}
                                        value={cat.media.toFixed(0)}
                                      />
                                      {"%\n                                "}
                                    </p>
                                  </div>,
                                );
                              });
                              return nodes;
                            })()}
                          </div>
                        </section>,
                      );
                    }
                    nodes.push(
                      <section
                        className={"section-container"}
                        key={nodes.length}
                      >
                        <h2 className={"section-title-2"}>
                          {"Histórico de Registros"}
                        </h2>
                        <div className={"ranking-list"}>
                          {(() => {
                            const nodes = [];
                            competencias.forEach((comp) => {
                              let n = parseFloat(comp.nota) || 0;
                              let c = comp.gradeClass;
                              nodes.push(
                                <div
                                  className={"ranking-item"}
                                  key={nodes.length}
                                >
                                  <div
                                    className={"ranking-position"}
                                    style={styleFrom(
                                      "background: rgba(255,255,255,0.05); color: #666;",
                                    )}
                                  >
                                    <i className={"far fa-calendar-alt"}></i>
                                  </div>
                                  <div className={"ranking-info"}>
                                    {(() => {
                                      const nodes = [];
                                      nodes.push(
                                        <h4 key={nodes.length}>
                                          <LoadingValue
                                            slot="aluno/alunoEvolucao:4"
                                            width="min(18ch, 100%)"
                                            known={false}
                                            value={comp.nome}
                                          />
                                        </h4>,
                                      );
                                      nodes.push(
                                        <p key={nodes.length}>
                                          <LoadingValue
                                            slot="aluno/alunoEvolucao:5"
                                            width="10ch"
                                            known={false}
                                            value={comp.data_formatada}
                                          />
                                          {" • "}
                                          <LoadingValue
                                            slot="aluno/alunoEvolucao:6"
                                            width="min(18ch, 100%)"
                                            known={false}
                                            value={comp.categoria || "Geral"}
                                          />
                                        </p>,
                                      );
                                      if (comp.observacoes) {
                                        nodes.push(
                                          <p
                                            style={styleFrom(
                                              "text-transform: none; color: var(--text-gray); margin-top: 5px; font-style: italic;",
                                            )}
                                            key={nodes.length}
                                          >
                                            {
                                              '\n                                            "'
                                            }
                                            <LoadingValue
                                              slot="aluno/alunoEvolucao:7"
                                              width="min(32ch, 100%)"
                                              known={false}
                                              value={comp.observacoes}
                                            />
                                            {
                                              '"\n                                        '
                                            }
                                          </p>,
                                        );
                                      }
                                      return nodes;
                                    })()}
                                  </div>
                                  <div className={"ranking-media"}>
                                    <LoadingElement
                                      as="span"
                                      className={"media-nota " + c}
                                      tone={true}
                                    >
                                      <LoadingValue
                                        slot="aluno/alunoEvolucao:8"
                                        width="3ch"
                                        known={false}
                                        value={n.toFixed(1)}
                                      />
                                    </LoadingElement>
                                  </div>
                                </div>,
                              );
                            });
                            return nodes;
                          })()}
                        </div>
                      </section>,
                    );
                  } else {
                    nodes.push(
                      <div
                        className={"stats-card"}
                        style={styleFrom("text-align: center; padding: 100px;")}
                        key={nodes.length}
                      >
                        <i
                          className={"fas fa-chart-line"}
                          style={styleFrom(
                            "font-size: 4rem; color: var(--border-color); margin-bottom: 20px;",
                          )}
                        ></i>
                        <h3>{"Nenhum dado para exibir"}</h3>
                        <p style={styleFrom("color: var(--text-gray);")}>
                          {
                            "Suas avaliações aparecerão aqui assim que forem registradas."
                          }
                        </p>
                      </div>,
                    );
                  }
                  return nodes;
                })()}
              </main>
              <footer className={"dash-footer"}>
                <div className={"footer-actions"}>
                  <a href={"/aluno"} className={"btn-secondary-dash"}>
                    <i className={"fas fa-arrow-left"}></i>
                    {" VOLTAR AO PAINEL"}
                  </a>
                </div>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI"}</p>
                </div>
              </footer>
            </LoadingElement>,
          );
          if (historico && historico.length > 0) {
            nodes.push(
              <PageDataScript
                type="application/json"
                id="aluno-evolucao-data"
                key={nodes.length}
              >
                {String(safeJson(historico))}
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
    competencias = [],
    categorias = [],
    historico = [],
  } = data;
  return (
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <div className={"logo"}>
          <img
            src={"/images/logo3-green.png"}
            alt={"AnalisAI"}
            style={styleFrom("height: 40px;")}
          />
        </div>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div
            className={"user-avatar"}
            style={styleFrom("background: var(--color-apto);")}
          >
            <LoadingValue
              slot="aluno/alunoEvolucao:9"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
          </div>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="aluno/alunoEvolucao:10"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </strong>
            </span>
            <span className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoEvolucao:11"
                width="12ch"
                known={true}
                value={aluno.ano_escolar}
              />
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
    </header>
  );
}
