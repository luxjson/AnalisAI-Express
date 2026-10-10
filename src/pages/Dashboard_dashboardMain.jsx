import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Dashboard_dashboardMain({
  data,
  handlers
}) {
  const {
    user = "",
    userCargo = null,
    alunos = [],
    rankingGeral = [],
    rankingMedio = [],
    rankingFundamental = []
  } = data;
  return <>
      <React.Fragment>
        <Partials_barProfessor data={{
        ...data
      }} handlers={handlers} />
        <div className={"main-layout"}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <main className={"dash-content"}>
            <section className={"welcome-banner"}>
              <div className={"banner-text"}>
                <h1>
                  {"Bem-vindo(a) de volta, "}
                  {user.split(" ")[0].toUpperCase()}
                  {"!"}
                </h1>
                <p>
                  {"Acompanhe o desempenho das turmas e gerencie as competências de forma simples."}
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
                    {data.schoolSummary?.["MÉDIO"]?.total || 0}
                  </p>
                </div>
                <div className={"stats-card apto"}>
                  <h3>{"APTOS"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["MÉDIO"]?.apto || 0}
                  </p>
                </div>
                <div className={"stats-card inapto"}>
                  <h3>{"INAPTOS"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["MÉDIO"]?.inapto || 0}
                  </p>
                </div>
                <div className={"stats-card desenvolvimento"}>
                  <h3>{"EM DESENVOLVIMENTO"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["MÉDIO"]?.desenvolvimento || 0}
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
                    {data.schoolSummary?.["FUNDAMENTAL"]?.total || 0}
                  </p>
                </div>
                <div className={"stats-card apto"}>
                  <h3>{"APTOS"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["FUNDAMENTAL"]?.apto || 0}
                  </p>
                </div>
                <div className={"stats-card inapto"}>
                  <h3>{"INAPTOS"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["FUNDAMENTAL"]?.inapto || 0}
                  </p>
                </div>
                <div className={"stats-card desenvolvimento"}>
                  <h3>{"EM DESENVOLVIMENTO"}</h3>
                  <p className={"stats-number"}>
                    {data.schoolSummary?.["FUNDAMENTAL"]?.desenvolvimento || 0}
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
                <button className={"ranking-tab active"} onClick={event => {
                handlers.showRanking("geral");
              }}>
                  {"GERAL"}
                </button>
                <button className={"ranking-tab"} onClick={event => {
                handlers.showRanking("medio");
              }}>
                  {"ENSINO MÉDIO"}
                </button>
                <button className={"ranking-tab"} onClick={event => {
                handlers.showRanking("fundamental");
              }}>
                  {"ENSINO FUNDAMENTAL"}
                </button>
              </div>
              <div id={"rankingGeral"} className={"ranking-content active"}>
                {(() => {
                const nodes = [];
                if (rankingGeral && rankingGeral.length > 0) {
                  nodes.push(<div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                      const nodes = [];
                      rankingGeral.forEach((comp, index) => {
                        nodes.push(<div className={"ranking-item"} key={nodes.length}>
                                <div className={"ranking-position " + (index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "")}>
                                  {index + 1}
                                  {"º"}
                                </div>
                                <div className={"ranking-info"}>
                                  <h4>{comp.nome}</h4>
                                  <p>
                                    {comp.total_avaliacoes}
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <span className={"media-nota " + comp.gradeClass}>
                                    {comp.media.toFixed(1)}
                                  </span>
                                </div>
                              </div>);
                      });
                      return nodes;
                    })()}
                      </div>);
                } else {
                  nodes.push(<div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>{"Nenhuma competência avaliada ainda"}</p>
                      </div>);
                }
                return nodes;
              })()}
              </div>
              <div id={"rankingMedio"} className={"ranking-content"}>
                {(() => {
                const nodes = [];
                if (rankingMedio && rankingMedio.length > 0) {
                  nodes.push(<div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                      const nodes = [];
                      rankingMedio.forEach((comp, index) => {
                        nodes.push(<div className={"ranking-item"} key={nodes.length}>
                                <div className={"ranking-position " + (index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "")}>
                                  {index + 1}
                                  {"º"}
                                </div>
                                <div className={"ranking-info"}>
                                  <h4>{comp.nome}</h4>
                                  <p>
                                    {comp.total_avaliacoes}
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <span className={"media-nota " + comp.gradeClass}>
                                    {comp.media.toFixed(1)}
                                  </span>
                                </div>
                              </div>);
                      });
                      return nodes;
                    })()}
                      </div>);
                } else {
                  nodes.push(<div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>{"Nenhuma competência avaliada no Ensino Médio"}</p>
                      </div>);
                }
                return nodes;
              })()}
              </div>
              <div id={"rankingFundamental"} className={"ranking-content"}>
                {(() => {
                const nodes = [];
                if (rankingFundamental && rankingFundamental.length > 0) {
                  nodes.push(<div className={"ranking-list"} key={nodes.length}>
                        {(() => {
                      const nodes = [];
                      rankingFundamental.forEach((comp, index) => {
                        nodes.push(<div className={"ranking-item"} key={nodes.length}>
                                <div className={"ranking-position " + (index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "")}>
                                  {index + 1}
                                  {"º"}
                                </div>
                                <div className={"ranking-info"}>
                                  <h4>{comp.nome}</h4>
                                  <p>
                                    {comp.total_avaliacoes}
                                    {" avaliações"}
                                  </p>
                                </div>
                                <div className={"ranking-media"}>
                                  <span className={"media-nota " + comp.gradeClass}>
                                    {comp.media.toFixed(1)}
                                  </span>
                                </div>
                              </div>);
                      });
                      return nodes;
                    })()}
                      </div>);
                } else {
                  nodes.push(<div className={"empty-ranking"} key={nodes.length}>
                        <i className={"fas fa-chart-bar"}></i>
                        <p>
                          {"Nenhuma competência avaliada no Ensino Fundamental"}
                        </p>
                      </div>);
                }
                return nodes;
              })()}
              </div>
            </section>
          </main>
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
        </div>
      </React.Fragment>
    </>;
}
export function PageHeader({
  data,
  handlers
}) {
  const {
    user = "",
    userCargo = null,
    alunos = [],
    rankingGeral = [],
    rankingMedio = [],
    rankingFundamental = []
  } = data;
  return <header className={"dash-header"}>
            <div className={"header-left"}>
              <h1>{"\n                    Dashboard\n                "}</h1>
            </div>
            <div className={"header-user"}>
              <div className={"user-profile-group"}>
                <div className={"user-details"}>
                  <span className={"user-name"}>
                    <strong>{user}</strong>
                  </span>
                  <span className={"user-role"} style={styleFrom("color: #888888;")}>
                    <strong>{userCargo}</strong>
                  </span>
                </div>
              </div>
              <div className={"header-actions"}>
                <Partials_notificacoes data={{
          ...data,
          ...{
            notificacaoClasse: "header-icon"
          }
        }} handlers={handlers} />
              </div>
            </div>
          </header>;
}
