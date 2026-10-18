import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React, { useEffect, useState } from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Dashboard_dashboardMain({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    alunos = [],
    rankingGeral = [],
    rankingMedio = [],
    rankingFundamental = [],
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
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <main className={"dash-content"}>
            <section className={"welcome-banner"}>
              <div className={"banner-text"}>
                <h1>
                  {"Bem-vindo(a) de volta, "}
                  <LoadingValue
                    slot="dashboard/dashboardMain:1"
                    width="12ch"
                    known={true}
                    value={user.split(" ")[0].toUpperCase()}
                  />
                  {"!"}
                </h1>
                <p>
                  {
                    "Acompanhe o desempenho das turmas e gerencie as competências de forma simples."
                  }
                </p>
              </div>
            </section>
            <section className={"section-container"}>
              <h2 className={"section-title-2"}>
                <i className={"fas fa-graduation-cap"}></i>
                {" ENSINO MÉDIO"}
              </h2>
              <div className={"dash-grid"}>
                <div className={"stats-card"}>
                  <h3>{"TOTAL DE ALUNOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:2"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.total || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card apto"}>
                  <h3>{"APTOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:3"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.apto || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card inapto"}>
                  <h3>{"INAPTOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:4"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.inapto || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card desenvolvimento"}>
                  <h3>{"EM DESENVOLVIMENTO"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:5"
                      width="3ch"
                      known={false}
                      value={
                        data.schoolSummary?.["MÉDIO"]?.desenvolvimento || 0
                      }
                    />
                  </p>
                </div>
              </div>
            </section>
            <section className={"section-container"}>
              <h2 className={"section-title-2"}>
                <i className={"fas fa-book"}></i>
                {" ENSINO FUNDAMENTAL"}
              </h2>
              <div className={"dash-grid"}>
                <div className={"stats-card"}>
                  <h3>{"TOTAL DE ALUNOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:6"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.total || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card apto"}>
                  <h3>{"APTOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:7"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.apto || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card inapto"}>
                  <h3>{"INAPTOS"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:8"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.inapto || 0}
                    />
                  </p>
                </div>
                <div className={"stats-card desenvolvimento"}>
                  <h3>{"EM DESENVOLVIMENTO"}</h3>
                  <p className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:9"
                      width="3ch"
                      known={false}
                      value={
                        data.schoolSummary?.["FUNDAMENTAL"]?.desenvolvimento ||
                        0
                      }
                    />
                  </p>
                </div>
              </div>
            </section>
            <section className={"section-container ranking-section"}>
              <h2 className={"section-title-2"}>
                <i className={"fas fa-trophy"}></i>
                {" RANKING DE COMPETÊNCIAS"}
              </h2>
              <div className={"ranking-tabs"}>
                <button
                  className={"ranking-tab active"}
                  onClick={(event) => {
                    handlers.showRanking("geral");
                  }}
                >
                  {"GERAL"}
                </button>
                <button
                  className={"ranking-tab"}
                  onClick={(event) => {
                    handlers.showRanking("medio");
                  }}
                >
                  {"ENSINO MÉDIO"}
                </button>
                <button
                  className={"ranking-tab"}
                  onClick={(event) => {
                    handlers.showRanking("fundamental");
                  }}
                >
                  {"ENSINO FUNDAMENTAL"}
                </button>
              </div>
              <div id={"rankingGeral"} className={"ranking-content active"}>
                {(() => {
                  const nodes = [];
                  if (rankingGeral && rankingGeral.length > 0) {
                    nodes.push(
                      <div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                          const nodes = [];
                          rankingGeral.forEach((comp, index) => {
                            nodes.push(
                              <div
                                className={"ranking-item"}
                                key={nodes.length}
                              >
                                <LoadingElement
                                  as="div"
                                  className={
                                    "ranking-position " +
                                    (index === 0
                                      ? "gold"
                                      : index === 1
                                        ? "silver"
                                        : index === 2
                                          ? "bronze"
                                          : "")
                                  }
                                  tone={true}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardMain:10"
                                    width="12ch"
                                    known={true}
                                    value={index + 1}
                                  />
                                  {"º"}
                                </LoadingElement>
                                <div className={"ranking-info"}>
                                  <h4>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:11"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </h4>
                                  <p>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:12"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <LoadingElement
                                    as="span"
                                    className={"media-nota " + comp.gradeClass}
                                    tone={true}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:13"
                                      width="3ch"
                                      known={false}
                                      value={comp.media.toFixed(1)}
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
                      <div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>{"Nenhuma competência avaliada ainda"}</p>
                      </div>,
                    );
                  }
                  return nodes;
                })()}
              </div>
              <div id={"rankingMedio"} className={"ranking-content"}>
                {(() => {
                  const nodes = [];
                  if (rankingMedio && rankingMedio.length > 0) {
                    nodes.push(
                      <div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                          const nodes = [];
                          rankingMedio.forEach((comp, index) => {
                            nodes.push(
                              <div
                                className={"ranking-item"}
                                key={nodes.length}
                              >
                                <LoadingElement
                                  as="div"
                                  className={
                                    "ranking-position " +
                                    (index === 0
                                      ? "gold"
                                      : index === 1
                                        ? "silver"
                                        : index === 2
                                          ? "bronze"
                                          : "")
                                  }
                                  tone={true}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardMain:14"
                                    width="12ch"
                                    known={true}
                                    value={index + 1}
                                  />
                                  {"º"}
                                </LoadingElement>
                                <div className={"ranking-info"}>
                                  <h4>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:15"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </h4>
                                  <p>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:16"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <LoadingElement
                                    as="span"
                                    className={"media-nota " + comp.gradeClass}
                                    tone={true}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:17"
                                      width="3ch"
                                      known={false}
                                      value={comp.media.toFixed(1)}
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
                      <div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>{"Nenhuma competência avaliada no Ensino Médio"}</p>
                      </div>,
                    );
                  }
                  return nodes;
                })()}
              </div>
              <div id={"rankingFundamental"} className={"ranking-content"}>
                {(() => {
                  const nodes = [];
                  if (rankingFundamental && rankingFundamental.length > 0) {
                    nodes.push(
                      <div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                          const nodes = [];
                          rankingFundamental.forEach((comp, index) => {
                            nodes.push(
                              <div
                                className={"ranking-item"}
                                key={nodes.length}
                              >
                                <LoadingElement
                                  as="div"
                                  className={
                                    "ranking-position " +
                                    (index === 0
                                      ? "gold"
                                      : index === 1
                                        ? "silver"
                                        : index === 2
                                          ? "bronze"
                                          : "")
                                  }
                                  tone={true}
                                >
                                  <LoadingValue
                                    slot="dashboard/dashboardMain:18"
                                    width="12ch"
                                    known={true}
                                    value={index + 1}
                                  />
                                  {"º"}
                                </LoadingElement>
                                <div className={"ranking-info"}>
                                  <h4>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:19"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </h4>
                                  <p>
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:20"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <LoadingElement
                                    as="span"
                                    className={"media-nota " + comp.gradeClass}
                                    tone={true}
                                  >
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:21"
                                      width="3ch"
                                      known={false}
                                      value={comp.media.toFixed(1)}
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
                      <div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>
                          {"Nenhuma competência avaliada no Ensino Fundamental"}
                        </p>
                      </div>,
                    );
                  }
                  return nodes;
                })()}
              </div>
            </section>
          </main>
          <FirstLoginTour userId={data.userId} userCargo={userCargo} />
          <footer className={"dash-footer"}>
            <div className={"footer-actions"}>
              <a href={"/dashboard/edit"} className={"btn-secondary-dash"}>
                <i className={"fas fa-pencil-alt"}></i>
                {" GERENCIAR"}
              </a>
              <a href={"/dashboard/graficos"} className={"btn-secondary-dash"}>
                <i className={"fas fa-chart-pie"}></i>
                {" ESTATÍSTICAS"}
              </a>
              <a href={"/manuais/professor"} className={"btn-secondary-dash"}>
                <i className={"fas fa-book-open"}></i>
                {" MANUAL DO PROFESSOR"}
              </a>
            </div>
            <div className={"footer-credits"}>
              <p>{"© 2026 AnalisAI\n            "}</p>
            </div>
          </footer>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
function FirstLoginTour({ userId, userCargo }) {
  const [step, setStep] = useState(-1);
  const key = userId ? `analisai:tour:v1:${userId}` : "";
  const steps = [
    {
      title: "Visão geral da plataforma",
      description: "O painel reúne os indicadores das turmas e a distribuição dos níveis de desempenho. Use esses dados para perceber rapidamente onde vale aprofundar a análise.",
    },
    {
      title: "Notas e competências",
      description: "No Editor, registre avaliações vinculadas às competências e habilidades. As informações alimentam os gráficos e ajudam a acompanhar a evolução ao longo do ano.",
    },
    {
      title: "Frequência por aula",
      description: "Acesse Frequência dentro do Editor para marcar presença, falta ou falta justificada por data e horário. O percentual é calculado a partir dos períodos registrados.",
    },
    {
      title: "Tarefas e relatórios",
      description: "Use as tarefas para acompanhar entregas. Os relatórios ajudam a identificar lacunas e planejar ações de recuperação e reforço pedagógico.",
    },
  ];
  useEffect(() => {
    if (!key || userCargo !== "Professor") return;
    try {
      if (window.localStorage.getItem(key) !== "concluido") setStep(0);
    } catch {
      setStep(0);
    }
  }, [key, userCargo]);
  const finish = () => {
    try {
      if (key) window.localStorage.setItem(key, "concluido");
    } catch {}
    setStep(-1);
  };
  if (step < 0 || !steps[step]) return null;
  const current = steps[step];
  return (
    <div
      className={"modal-overlay is-open"}
      role={"dialog"}
      aria-modal={"true"}
      aria-labelledby={"first-login-tour-title"}
      style={styleFrom("display:flex; position:fixed; inset:0; z-index:10000; align-items:center; justify-content:center; padding:20px; background:rgba(0,0,0,.76);")}
    >
      <section className={"modal-content"} style={styleFrom("display:block; width:min(560px, 100%); max-height:90vh; overflow:auto;")}>
        <p className={"section-label"}>{`PASSO ${step + 1} DE ${steps.length}`}</p>
        <h2 id={"first-login-tour-title"} className={"section-title-2"}>{current.title}</h2>
        <p style={styleFrom("color:var(--text-gray); line-height:1.65; margin:16px 0 28px;")}>{current.description}</p>
        <div style={styleFrom("display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;")}>
          <button type={"button"} className={"btn-secondary-dash"} onClick={finish}>PULAR TOUR</button>
          <button
            type={"button"}
            className={"btn-secondary-dash"}
            onClick={() => (step + 1 === steps.length ? finish() : setStep(step + 1))}
          >
            {step + 1 === steps.length ? "CONCLUIR" : "PRÓXIMO"}
            <i className={"fas fa-arrow-right"} aria-hidden={"true"}></i>
          </button>
        </div>
      </section>
    </div>
  );
}

export function PageHeader({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    alunos = [],
    rankingGeral = [],
    rankingMedio = [],
    rankingFundamental = [],
  } = data;
  return (
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"\n                    Dashboard\n                "}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardMain:22"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </strong>
            </span>
            <span className={"user-role"} style={styleFrom("color: #888888;")}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardMain:23"
                  width="12ch"
                  known={true}
                  value={userCargo}
                />
              </strong>
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
