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
                        "background: linear-gradient(90deg, #1b5e38 0%, #217346 100%);",
                      )}
                      key={nodes.length}
                    >
                      <LoadingElement as="div" className={"banner-text"}>
                        <LoadingElement as="h1">
                          {"Olá, "}
                          <LoadingValue
                            slot="aluno/alunoDashboard:1"
                            width="min(18ch, 100%)"
                            known={true}
                            value={aluno.nome.split(" ")[0].toUpperCase()}
                          />
                          {"!"}
                        </LoadingElement>
                        <LoadingElement as="p">
                          {
                            "Confira seu desempenho acadêmico, competências avaliadas e sua evolução no curso."
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
                      <LoadingElement as="h2" className={"section-title-2"}>
                        {"INFORMAÇÕES GERAIS"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"dash-grid"}>
                        {(() => {
                          const nodes = [];
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"stats-card"}
                              key={nodes.length}
                            >
                              <LoadingElement as="h3">
                                {"MATRÍCULA"}
                              </LoadingElement>
                              <LoadingElement as="p" className={"stats-number"}>
                                <LoadingValue
                                  slot="aluno/alunoDashboard:2"
                                  width="3ch"
                                  known={false}
                                  value={aluno.matricula}
                                />
                              </LoadingElement>
                            </LoadingElement>,
                          );
                          let mediaGeralNum = parseFloat(mediaGeral) || 0;
                          let mediaClass = data.mediaGeralClass;
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"stats-card " + mediaClass}
                              key={nodes.length}
                              tone={true}
                            >
                              <LoadingElement as="h3">
                                {"MÉDIA GERAL"}
                              </LoadingElement>
                              <LoadingElement as="p" className={"stats-number"}>
                                <LoadingValue
                                  slot="aluno/alunoDashboard:3"
                                  width="3ch"
                                  known={false}
                                  value={mediaGeralNum.toFixed(1)}
                                />
                              </LoadingElement>
                            </LoadingElement>,
                          );
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"stats-card"}
                              key={nodes.length}
                            >
                              <LoadingElement as="h3">
                                {"PRESENÇA"}
                              </LoadingElement>
                              <LoadingElement as="p" className={"stats-number"}>
                                <LoadingValue
                                  slot="aluno/alunoDashboard:4"
                                  width="3ch"
                                  known={false}
                                  value={aluno.presenca}
                                />
                                {"%"}
                              </LoadingElement>
                            </LoadingElement>,
                          );
                          return nodes;
                        })()}
                      </LoadingElement>
                    </LoadingElement>,
                  );
                  nodes.push(
                    <LoadingElement
                      as="section"
                      className={"section-container"}
                      key={nodes.length}
                    >
                      <LoadingElement as="h2" className={"section-title-2"}>
                        {"RESUMO DE PERFORMANCE"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"dash-grid"}>
                        <LoadingElement as="div" className={"stats-card"}>
                          <LoadingElement as="h3">{"AVALIADAS"}</LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoDashboard:5"
                              width="3ch"
                              known={false}
                              value={competencias.length}
                            />
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"stats-card apto"}>
                          <LoadingElement as="h3">{"APTAS"}</LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoDashboard:6"
                              width="3ch"
                              known={false}
                              value={data.performanceSummary?.aptas || 0}
                            />
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"stats-card inapto"}
                        >
                          <LoadingElement as="h3">{"MELHORAR"}</LoadingElement>
                          <LoadingElement as="p" className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoDashboard:7"
                              width="3ch"
                              known={false}
                              value={data.performanceSummary?.melhorar || 0}
                            />
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>
                    </LoadingElement>,
                  );
                  if (competencias && competencias.length > 0) {
                    nodes.push(
                      <LoadingElement
                        as="section"
                        className={"section-container"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2" className={"section-title-2"}>
                          {"MAPA DE COMPETÊNCIAS"}
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"stats-card"}
                          style={styleFrom("padding: 40px;")}
                        >
                          <LoadingElement
                            as="div"
                            style={styleFrom(
                              "height: 400px; position: relative;",
                            )}
                          >
                            <LoadingCanvas
                              id={"radarChart"}
                              variant="plot"
                              frame={true}
                            ></LoadingCanvas>
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                  }
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
                            {"MINHAS NOTAS DETALHADAS"}
                          </LoadingElement>,
                        );
                        if (competencias && competencias.length > 0) {
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"ranking-list"}
                              key={nodes.length}
                            >
                              {(() => {
                                const nodes = [];
                                competencias.forEach((comp, index) => {
                                  let notaNum = parseFloat(comp.nota) || 0;
                                  let statusClass = comp.gradeClass;
                                  nodes.push(
                                    <LoadingElement
                                      as="div"
                                      className={"ranking-item"}
                                      key={nodes.length}
                                    >
                                      <LoadingElement
                                        as="div"
                                        className={"ranking-position"}
                                      >
                                        <LoadingValue
                                          slot="aluno/alunoDashboard:8"
                                          width="12ch"
                                          known={true}
                                          value={index + 1}
                                        />
                                      </LoadingElement>
                                      <LoadingElement
                                        as="div"
                                        className={"ranking-info"}
                                      >
                                        {(() => {
                                          const nodes = [];
                                          nodes.push(
                                            <LoadingElement
                                              as="h4"
                                              key={nodes.length}
                                            >
                                              <LoadingValue
                                                slot="aluno/alunoDashboard:9"
                                                width="min(18ch, 100%)"
                                                known={false}
                                                value={comp.nome}
                                              />
                                            </LoadingElement>,
                                          );
                                          nodes.push(
                                            <LoadingElement
                                              as="p"
                                              key={nodes.length}
                                            >
                                              {"Avaliado em: "}
                                              <LoadingValue
                                                slot="aluno/alunoDashboard:10"
                                                width="10ch"
                                                known={false}
                                                value={comp.data_formatada}
                                              />
                                            </LoadingElement>,
                                          );
                                          if (comp.observacoes) {
                                            nodes.push(
                                              <LoadingElement
                                                as="p"
                                                style={styleFrom(
                                                  "text-transform: none; color: var(--text-gray); margin-top: 5px;",
                                                )}
                                                key={nodes.length}
                                              >
                                                <LoadingElement
                                                  as="i"
                                                  className={
                                                    "fas fa-comment-dots"
                                                  }
                                                ></LoadingElement>
                                                {' "'}
                                                <LoadingValue
                                                  slot="aluno/alunoDashboard:11"
                                                  width="min(32ch, 100%)"
                                                  known={false}
                                                  value={comp.observacoes}
                                                />
                                                {
                                                  '"\n                                        '
                                                }
                                              </LoadingElement>,
                                            );
                                          }
                                          return nodes;
                                        })()}
                                      </LoadingElement>
                                      <LoadingElement
                                        as="div"
                                        className={"ranking-media"}
                                      >
                                        <LoadingElement
                                          as="span"
                                          className={
                                            "media-nota " + statusClass
                                          }
                                          tone={true}
                                        >
                                          <LoadingValue
                                            slot="aluno/alunoDashboard:12"
                                            width="3ch"
                                            known={false}
                                            value={notaNum.toFixed(1)}
                                          />
                                        </LoadingElement>
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
                              className={"stats-card"}
                              style={styleFrom(
                                "text-align: center; padding: 60px;",
                              )}
                              key={nodes.length}
                            >
                              <LoadingElement
                                as="i"
                                className={"fas fa-clipboard-list"}
                                style={styleFrom(
                                  "font-size: 3rem; color: var(--border-color); margin-bottom: 20px;",
                                )}
                              ></LoadingElement>
                              <LoadingElement
                                as="p"
                                style={styleFrom("color: var(--text-gray);")}
                              >
                                {"Nenhuma competência avaliada ainda."}
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
                    href={"/aluno/evolucao"}
                    className={"btn-secondary-dash"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-chart-line"}
                    ></LoadingElement>
                    {" VER EVOLUÇÃO\n                "}
                  </LoadingElement>
                  <LoadingElement
                    as="a"
                    href={"/manuais/aluno"}
                    className={"btn-secondary-dash"}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-book-open"}
                    ></LoadingElement>
                    {" MANUAL DO ALUNO\n                "}
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
                id="aluno-dashboard-data"
                key={nodes.length}
              >
                {String(
                  safeJson({
                    labels: competencias.map((c) => c.nome),
                    valores: competencias.map((c) => parseFloat(c.nota) || 0),
                  }),
                )}
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
    mediaGeral = null,
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
            style={styleFrom(
              "background: var(--color-apto); shadow: 0 4px 10px rgba(33, 115, 70, 0.3);",
            )}
          >
            <LoadingValue
              slot="aluno/alunoDashboard:13"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
          </LoadingElement>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="aluno/alunoDashboard:14"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoDashboard:15"
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
