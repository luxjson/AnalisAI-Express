import {
  LoadingValue,
  LoadingElement,
  LoadingCanvas,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import { download } from "../services/api";
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
                          <LoadingValue
                            slot="aluno/alunoDashboard:1"
                            width="min(18ch, 100%)"
                            known={true}
                            value={aluno.nome.split(" ")[0].toUpperCase()}
                          />
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
                                <LoadingValue
                                  slot="aluno/alunoDashboard:2"
                                  width="3ch"
                                  known={false}
                                  value={aluno.matricula}
                                />
                              </p>
                            </div>,
                          );
                          const mediaGeralValue = mediaGeral == null || mediaGeral === "" ? null : Number(mediaGeral);
                          const mediaGeralNum = Number.isFinite(mediaGeralValue) ? mediaGeralValue : null;
                          let mediaClass = data.mediaGeralClass;
                          nodes.push(
                            <LoadingElement
                              as="div"
                              className={"stats-card " + mediaClass}
                              key={nodes.length}
                              tone={true}
                            >
                              <h3>{"MÉDIA GERAL"}</h3>
                              <p className={"stats-number"}>
                                <LoadingValue
                                  slot="aluno/alunoDashboard:3"
                                  width="3ch"
                                  known={false}
                                  value={mediaGeralNum == null ? "—" : mediaGeralNum.toFixed(1)}
                                />
                              </p>
                            </LoadingElement>,
                          );
                          nodes.push(
                            <div className={"stats-card"} key={nodes.length}>
                              <h3>{"PRESENÇA"}</h3>
                              <p className={"stats-number"}>
                                <LoadingValue
                                  slot="aluno/alunoDashboard:4"
                                  width="3ch"
                                  known={false}
                                  value={aluno.presenca == null ? "—" : aluno.presenca}
                                />
                                {aluno.presenca == null ? "" : "%"}
                              </p>
                            </div>,
                          );
                          return nodes;
                        })()}
                      </div>
                    </section>,
                  );
                  const attendance = data.frequenciaResumo || null;
                  nodes.push(
                    <section className={"section-container"} key={nodes.length}>
                      <h2 className={"section-title-2"}>
                        {"FREQUÊNCIA NO ANO "}{attendance?.ano || ""}
                      </h2>
                      <p style={styleFrom("color:var(--text-gray); margin-bottom:18px;")}>
                        {"O percentual é calculado pelos períodos de aula registrados, não pelos dias do calendário."}
                      </p>
                      <div className={"dash-grid"}>
                        {[
                          { label: "PERÍODOS REGISTRADOS", value: attendance?.total_aulas ?? 0 },
                          { label: "PRESENÇAS", value: attendance?.presencas ?? 0, tone: "apto" },
                          { label: "FALTAS", value: attendance?.faltas ?? 0, tone: "inapto" },
                          { label: "FALTAS JUSTIFICADAS", value: attendance?.justificadas ?? 0, tone: "desenvolvimento" },
                        ].map((item) => (
                          <div className={"stats-card " + (item.tone || "")} key={item.label}>
                            <h3>{item.label}</h3>
                            <p className={"stats-number"}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <p style={styleFrom("color:var(--text-gray); font-size:.85rem; margin-top:14px;")}>
                        {attendance?.total_aulas
                          ? `O calendário de ${attendance.ano} tem ${attendance.diasNoAno} dias; foram registrados ${attendance.dias_registrados} dias com aula.`
                          : `O calendário de ${attendance?.ano || "referência"} tem ${attendance?.diasNoAno || "365 ou 366"} dias. Ainda não há registros de aula para calcular sua frequência anual.`}
                      </p>
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
                            <LoadingValue
                              slot="aluno/alunoDashboard:5"
                              width="3ch"
                              known={false}
                              value={competencias.length}
                            />
                          </p>
                        </div>
                        <div className={"stats-card apto"}>
                          <h3>{"APTAS"}</h3>
                          <p className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoDashboard:6"
                              width="3ch"
                              known={false}
                              value={data.performanceSummary?.aptas || 0}
                            />
                          </p>
                        </div>
                        <div className={"stats-card inapto"}>
                          <h3>{"MELHORAR"}</h3>
                          <p className={"stats-number"}>
                            <LoadingValue
                              slot="aluno/alunoDashboard:7"
                              width="3ch"
                              known={false}
                              value={data.performanceSummary?.melhorar || 0}
                            />
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
                            <LoadingCanvas
                              id={"radarChart"}
                              variant="plot"
                              frame={true}
                            ></LoadingCanvas>
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
                                        <LoadingValue
                                          slot="aluno/alunoDashboard:8"
                                          width="12ch"
                                          known={true}
                                          value={index + 1}
                                        />
                                      </div>
                                      <div className={"ranking-info"}>
                                        {(() => {
                                          const nodes = [];
                                          nodes.push(
                                            <h4 key={nodes.length}>
                                              <LoadingValue
                                                slot="aluno/alunoDashboard:9"
                                                width="min(18ch, 100%)"
                                                known={false}
                                                value={comp.nome}
                                              />
                                            </h4>,
                                          );
                                          nodes.push(
                                            <p key={nodes.length}>
                                              {"Avaliado em: "}
                                              <LoadingValue
                                                slot="aluno/alunoDashboard:10"
                                                width="10ch"
                                                known={false}
                                                value={comp.data_formatada}
                                              />
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
                                                <LoadingValue
                                                  slot="aluno/alunoDashboard:11"
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
                  <button
                    type={"button"}
                    className={"btn-secondary-dash"}
                    onClick={async () => {
                      const studentId = aluno.id || data.userId;
                      if (!studentId) {
                        window.dispatchEvent(new CustomEvent("analisai:interaction-error", { detail: "Não foi possível identificar sua conta." }));
                        return;
                      }
                      try {
                        await download(
                          "/dashboard/aluno-relatorio/" + encodeURIComponent(studentId) + "/pdf?ano=" + new Date().getFullYear(),
                          "meu-relatorio-pedagogico.pdf",
                        );
                      } catch (error) {
                        window.dispatchEvent(new CustomEvent("analisai:interaction-error", { detail: error.message || "Não foi possível baixar o relatório." }));
                      }
                    }}
                  >
                    <i className={"fas fa-file-pdf"} aria-hidden={"true"}></i>
                    {" MEU RELATÓRIO PDF"}
                  </button>
                </div>
                <div className={"footer-credits"}>
                  <p>{"© 2026 AnalisAI"}</p>
                </div>
              </footer>
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
            <LoadingValue
              slot="aluno/alunoDashboard:13"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
          </div>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="aluno/alunoDashboard:14"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </strong>
            </span>
            <span className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoDashboard:15"
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
