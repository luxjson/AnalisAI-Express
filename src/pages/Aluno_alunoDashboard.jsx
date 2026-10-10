import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Aluno_alunoDashboard({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    mediaGeral = null,
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
            <div className={"main-layout"} key={nodes.length}>
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
                      style={styleFrom(
                        "background: var(--color-apto); shadow: 0 4px 10px rgba(33, 115, 70, 0.3);",
                      )}
                    >
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
              <main className={"dash-content"}>
                {(() => {
                  const nodes = [];
                  nodes.push(
                    <section
                      className={"welcome-banner"}
                      style={styleFrom(
                        "background: linear-gradient(90deg, #1b5e38 0%, #217346 100%);",
                      )}
                      key={nodes.length}
                    >
                      <div className={"banner-text"}>
                        <h1>
                          {"Olá, "}
                          {aluno.nome.split(" ")[0].toUpperCase()}
                          {"!"}
                        </h1>
                        <p>
                          {
                            "Confira seu desempenho acadêmico, competências avaliadas e sua evolução no curso."
                          }
                        </p>
                      </div>
                    </section>,
                  );
                  nodes.push(
                    <section className={"section-container"} key={nodes.length}>
                      <h2 className={"section-title-2"}>
                        {"INFORMAÇÕES GERAIS"}
                      </h2>
                      <div className={"dash-grid"}>
                        {(() => {
                          const nodes = [];
                          nodes.push(
                            <div className={"stats-card"} key={nodes.length}>
                              <h3>{"MATRÍCULA"}</h3>
                              <p className={"stats-number"}>
                                {aluno.matricula}
                              </p>
                            </div>,
                          );
                          let mediaGeralNum = parseFloat(mediaGeral) || 0;
                          let mediaClass = data.mediaGeralClass;
                          nodes.push(
                            <div
                              className={"stats-card " + mediaClass}
                              key={nodes.length}
                            >
                              <h3>{"MÉDIA GERAL"}</h3>
                              <p className={"stats-number"}>
                                {mediaGeralNum.toFixed(1)}
                              </p>
                            </div>,
                          );
                          nodes.push(
                            <div className={"stats-card"} key={nodes.length}>
                              <h3>{"PRESENÇA"}</h3>
                              <p className={"stats-number"}>
                                {aluno.presenca}
                                {"%"}
                              </p>
                            </div>,
                          );
                          return nodes;
                        })()}
                      </div>
                    </section>,
                  );
                  nodes.push(
                    <section className={"section-container"} key={nodes.length}>
                      <h2 className={"section-title-2"}>
                        {"RESUMO DE PERFORMANCE"}
                      </h2>
                      <div className={"dash-grid"}>
                        <div className={"stats-card"}>
                          <h3>{"AVALIADAS"}</h3>
                          <p className={"stats-number"}>
                            {competencias.length}
                          </p>
                        </div>
                        <div className={"stats-card apto"}>
                          <h3>{"APTAS"}</h3>
                          <p className={"stats-number"}>
                            {data.performanceSummary?.aptas || 0}
                          </p>
                        </div>
                        <div className={"stats-card inapto"}>
                          <h3>{"MELHORAR"}</h3>
                          <p className={"stats-number"}>
                            {data.performanceSummary?.melhorar || 0}
                          </p>
                        </div>
                      </div>
                    </section>,
                  );
                  if (competencias && competencias.length > 0) {
                    nodes.push(
                      <section
                        className={"section-container"}
                        key={nodes.length}
                      >
                        <h2 className={"section-title-2"}>
                          {"MAPA DE COMPETÊNCIAS"}
                        </h2>
                        <div
                          className={"stats-card"}
                          style={styleFrom("padding: 40px;")}
                        >
                          <div
                            style={styleFrom(
                              "height: 400px; position: relative;",
                            )}
                          >
                            <canvas id={"radarChart"}></canvas>
                          </div>
                        </div>
                      </section>,
                    );
                  }
                  nodes.push(
                    <section className={"section-container"} key={nodes.length}>
                      {(() => {
                        const nodes = [];
                        nodes.push(
                          <h2 className={"section-title-2"} key={nodes.length}>
                            {"MINHAS NOTAS DETALHADAS"}
                          </h2>,
                        );
                        if (competencias && competencias.length > 0) {
                          nodes.push(
                            <div className={"ranking-list"} key={nodes.length}>
                              {(() => {
                                const nodes = [];
                                competencias.forEach((comp, index) => {
                                  let notaNum = parseFloat(comp.nota) || 0;
                                  let statusClass = comp.gradeClass;
                                  nodes.push(
                                    <div
                                      className={"ranking-item"}
                                      key={nodes.length}
                                    >
                                      <div className={"ranking-position"}>
                                        {index + 1}
                                      </div>
                                      <div className={"ranking-info"}>
                                        {(() => {
                                          const nodes = [];
                                          nodes.push(
                                            <h4 key={nodes.length}>
                                              {comp.nome}
                                            </h4>,
                                          );
                                          nodes.push(
                                            <p key={nodes.length}>
                                              {"Avaliado em: "}
                                              {comp.data_formatada}
                                            </p>,
                                          );
                                          if (comp.observacoes) {
                                            nodes.push(
                                              <p
                                                style={styleFrom(
                                                  "text-transform: none; color: var(--text-gray); margin-top: 5px;",
                                                )}
                                                key={nodes.length}
                                              >
                                                <i
                                                  className={
                                                    "fas fa-comment-dots"
                                                  }
                                                ></i>
                                                {' "'}
                                                {comp.observacoes}
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
                                        <span
                                          className={
                                            "media-nota " + statusClass
                                          }
                                        >
                                          {notaNum.toFixed(1)}
                                        </span>
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
                            <div
                              className={"stats-card"}
                              style={styleFrom(
                                "text-align: center; padding: 60px;",
                              )}
                              key={nodes.length}
                            >
                              <i
                                className={"fas fa-clipboard-list"}
                                style={styleFrom(
                                  "font-size: 3rem; color: var(--border-color); margin-bottom: 20px;",
                                )}
                              ></i>
                              <p style={styleFrom("color: var(--text-gray);")}>
                                {"Nenhuma competência avaliada ainda."}
                              </p>
                            </div>,
                          );
                        }
                        return nodes;
                      })()}
                    </section>,
                  );
                  return nodes;
                })()}
              </main>
              <footer className={"dash-footer"}>
                <div className={"footer-actions"}>
                  <a href={"/aluno/evolucao"} className={"btn-secondary-dash"}>
                    <i className={"fas fa-chart-line"}></i>
                    {" VER EVOLUÇÃO\n                "}
                  </a>
                  <a href={"/manuais/aluno"} className={"btn-secondary-dash"}>
                    <i className={"fas fa-book-open"}></i>
                    {" MANUAL DO ALUNO\n                "}
                  </a>
                </div>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI"}</p>
                </div>
              </footer>
            </div>,
          );
          if (competencias && competencias.length > 0) {
            nodes.push(
              <script
                type="application/json"
                id="aluno-dashboard-data"
                key={nodes.length}
              >
                {String(
                  safeJson({
                    labels: competencias.map((c) => c.nome),
                    valores: competencias.map((c) => parseFloat(c.nota) || 0),
                  }),
                )}
              </script>,
            );
          }
          return nodes;
        })()}
      </React.Fragment>
    </>
  );
}
