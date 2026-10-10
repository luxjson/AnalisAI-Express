import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
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
          <LoadingElement as="main" className={"dash-content"}>
            <LoadingElement as="section" className={"welcome-banner"}>
              <LoadingElement as="div" className={"banner-text"}>
                <LoadingElement as="h1">
                  {"Bem-vindo(a) de volta, "}
                  <LoadingValue
                    slot="dashboard/dashboardMain:1"
                    width="12ch"
                    known={true}
                    value={user.split(" ")[0].toUpperCase()}
                  />
                  {"!"}
                </LoadingElement>
                <LoadingElement as="p">
                  {
                    "Acompanhe o desempenho das turmas e gerencie as competências de forma simples."
                  }
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="section" className={"section-container"}>
              <LoadingElement as="h2" className={"section-title-2"}>
                <LoadingElement
                  as="i"
                  className={"fas fa-graduation-cap"}
                ></LoadingElement>
                {" ENSINO MÉDIO"}
              </LoadingElement>
              <LoadingElement as="div" className={"dash-grid"}>
                <LoadingElement as="div" className={"stats-card"}>
                  <LoadingElement as="h3">{"TOTAL DE ALUNOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:2"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.total || 0}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stats-card apto"}>
                  <LoadingElement as="h3">{"APTOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:3"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.apto || 0}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stats-card inapto"}>
                  <LoadingElement as="h3">{"INAPTOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:4"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["MÉDIO"]?.inapto || 0}
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
                      slot="dashboard/dashboardMain:5"
                      width="3ch"
                      known={false}
                      value={
                        data.schoolSummary?.["MÉDIO"]?.desenvolvimento || 0
                      }
                    />
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="section" className={"section-container"}>
              <LoadingElement as="h2" className={"section-title-2"}>
                <LoadingElement
                  as="i"
                  className={"fas fa-book"}
                ></LoadingElement>
                {" ENSINO FUNDAMENTAL"}
              </LoadingElement>
              <LoadingElement as="div" className={"dash-grid"}>
                <LoadingElement as="div" className={"stats-card"}>
                  <LoadingElement as="h3">{"TOTAL DE ALUNOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:6"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.total || 0}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stats-card apto"}>
                  <LoadingElement as="h3">{"APTOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:7"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.apto || 0}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"stats-card inapto"}>
                  <LoadingElement as="h3">{"INAPTOS"}</LoadingElement>
                  <LoadingElement as="p" className={"stats-number"}>
                    <LoadingValue
                      slot="dashboard/dashboardMain:8"
                      width="3ch"
                      known={false}
                      value={data.schoolSummary?.["FUNDAMENTAL"]?.inapto || 0}
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
                      slot="dashboard/dashboardMain:9"
                      width="3ch"
                      known={false}
                      value={
                        data.schoolSummary?.["FUNDAMENTAL"]?.desenvolvimento ||
                        0
                      }
                    />
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="section"
              className={"section-container ranking-section"}
            >
              <LoadingElement as="h2" className={"section-title-2"}>
                <LoadingElement
                  as="i"
                  className={"fas fa-trophy"}
                ></LoadingElement>
                {" RANKING DE COMPETÊNCIAS"}
              </LoadingElement>
              <LoadingElement as="div" className={"ranking-tabs"}>
                <LoadingElement
                  as="button"
                  className={"ranking-tab active"}
                  onClick={(event) => {
                    handlers.showRanking("geral");
                  }}
                >
                  {"GERAL"}
                </LoadingElement>
                <LoadingElement
                  as="button"
                  className={"ranking-tab"}
                  onClick={(event) => {
                    handlers.showRanking("medio");
                  }}
                >
                  {"ENSINO MÉDIO"}
                </LoadingElement>
                <LoadingElement
                  as="button"
                  className={"ranking-tab"}
                  onClick={(event) => {
                    handlers.showRanking("fundamental");
                  }}
                >
                  {"ENSINO FUNDAMENTAL"}
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"rankingGeral"}
                className={"ranking-content active"}
              >
                {(() => {
                  const nodes = [];
                  if (rankingGeral && rankingGeral.length > 0) {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"ranking-list"}
                        key={nodes.length}
                      >
                        {(() => {
                          const nodes = [];
                          rankingGeral.forEach((comp, index) => {
                            nodes.push(
                              <LoadingElement
                                as="div"
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
                                <LoadingElement
                                  as="div"
                                  className={"ranking-info"}
                                >
                                  <LoadingElement as="h4">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:11"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </LoadingElement>
                                  <LoadingElement as="p">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:12"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"ranking-media"}
                                >
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
                        className={"empty-ranking"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-chart-bar"}
                        ></LoadingElement>
                        <LoadingElement as="p">
                          {"Nenhuma competência avaliada ainda"}
                        </LoadingElement>
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"rankingMedio"}
                className={"ranking-content"}
              >
                {(() => {
                  const nodes = [];
                  if (rankingMedio && rankingMedio.length > 0) {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"ranking-list"}
                        key={nodes.length}
                      >
                        {(() => {
                          const nodes = [];
                          rankingMedio.forEach((comp, index) => {
                            nodes.push(
                              <LoadingElement
                                as="div"
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
                                <LoadingElement
                                  as="div"
                                  className={"ranking-info"}
                                >
                                  <LoadingElement as="h4">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:15"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </LoadingElement>
                                  <LoadingElement as="p">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:16"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"ranking-media"}
                                >
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
                        className={"empty-ranking"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-chart-bar"}
                        ></LoadingElement>
                        <LoadingElement as="p">
                          {"Nenhuma competência avaliada no Ensino Médio"}
                        </LoadingElement>
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
              <LoadingElement
                as="div"
                id={"rankingFundamental"}
                className={"ranking-content"}
              >
                {(() => {
                  const nodes = [];
                  if (rankingFundamental && rankingFundamental.length > 0) {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"ranking-list"}
                        key={nodes.length}
                      >
                        {(() => {
                          const nodes = [];
                          rankingFundamental.forEach((comp, index) => {
                            nodes.push(
                              <LoadingElement
                                as="div"
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
                                <LoadingElement
                                  as="div"
                                  className={"ranking-info"}
                                >
                                  <LoadingElement as="h4">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:19"
                                      width="min(18ch, 100%)"
                                      known={false}
                                      value={comp.nome}
                                    />
                                  </LoadingElement>
                                  <LoadingElement as="p">
                                    <LoadingValue
                                      slot="dashboard/dashboardMain:20"
                                      width="3ch"
                                      known={false}
                                      value={comp.total_avaliacoes}
                                    />
                                    {" avaliações"}
                                  </LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"ranking-media"}
                                >
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
                        className={"empty-ranking"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"fas fa-chart-bar"}
                        ></LoadingElement>
                        <LoadingElement as="p">
                          {"Nenhuma competência avaliada no Ensino Fundamental"}
                        </LoadingElement>
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="footer" className={"dash-footer"}>
            <LoadingElement as="div" className={"footer-actions"}>
              <LoadingElement
                as="a"
                href={"/dashboard/edit"}
                className={"btn-secondary-dash"}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-pencil-alt"}
                ></LoadingElement>
                {" GERENCIAR"}
              </LoadingElement>
              <LoadingElement
                as="a"
                href={"/dashboard/graficos"}
                className={"btn-secondary-dash"}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-chart-pie"}
                ></LoadingElement>
                {" ESTATÍSTICAS"}
              </LoadingElement>
              <LoadingElement
                as="a"
                href={"/manuais/professor"}
                className={"btn-secondary-dash"}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-book-open"}
                ></LoadingElement>
                {" MANUAL DO PROFESSOR"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"footer-credits"}>
              <LoadingElement as="p">
                {"© 2026 AnalisAI\n            "}
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
    user = "",
    userCargo = null,
    alunos = [],
    rankingGeral = [],
    rankingMedio = [],
    rankingFundamental = [],
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Dashboard\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardMain:22"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="span"
              className={"user-role"}
              style={styleFrom("color: #888888;")}
            >
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardMain:23"
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
