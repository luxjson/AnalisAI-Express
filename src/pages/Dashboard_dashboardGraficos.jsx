import {
  LoadingCanvas,
  LoadingValue,
  LoadingElement,
  PageDataScript,
} from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";

export default function Dashboard_dashboardGraficos({ data, handlers }) {
  const { user = "", userCargo = null, stats = {} } = data;
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
          <main className={"dash-content graficos-grid"}>
            <p className={"section-label"}>{"PANORAMA DE NÍVEIS"}</p>
            <div className={"row-triple"}>
              <div className={"dash-card card-grafico"}>
                {stats.total > 0 ? (
                  <>
                    <div className={"chart-ring-box"}>
                      <LoadingCanvas id={"chartAptos"} variant="ring" />
                    </div>
                    <p className={"chart-label label-verde"}>
                      {"ALUNOS APTOS"}
                    </p>
                    <p className={"chart-value"}>
                      <LoadingValue
                        slot="dashboard/dashboardGraficos:1"
                        width="3ch"
                        known={false}
                        value={stats.apto}
                      />
                    </p>
                  </>
                ) : (
                  <div className={"empty-chart"}>{"SEM DADOS PARA EXIBIR"}</div>
                )}
              </div>
              <div className={"dash-card card-grafico"}>
                {stats.total > 0 ? (
                  <>
                    <div className={"chart-ring-box"}>
                      <LoadingCanvas id={"chartInaptos"} variant="ring" />
                    </div>
                    <p className={"chart-label label-vermelho"}>
                      {"ALUNOS INAPTOS"}
                    </p>
                    <p className={"chart-value"}>
                      <LoadingValue
                        slot="dashboard/dashboardGraficos:2"
                        width="3ch"
                        known={false}
                        value={stats.inapto}
                      />
                    </p>
                  </>
                ) : (
                  <div className={"empty-chart"}>{"SEM DADOS PARA EXIBIR"}</div>
                )}
              </div>
              <div className={"dash-card card-grafico"}>
                {stats.total > 0 ? (
                  <>
                    <div className={"chart-ring-box"}>
                      <LoadingCanvas
                        id={"chartDesenvolvimento"}
                        variant="ring"
                      />
                    </div>
                    <p className={"chart-label label-amarelo"}>
                      {"EM DESENVOLVIMENTO"}
                    </p>
                    <p className={"chart-value"}>
                      <LoadingValue
                        slot="dashboard/dashboardGraficos:3"
                        width="3ch"
                        known={false}
                        value={stats.total - stats.apto - stats.inapto}
                      />
                    </p>
                  </>
                ) : (
                  <div className={"empty-chart"}>{"SEM DADOS PARA EXIBIR"}</div>
                )}
              </div>
            </div>
            <p className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO MÉDIO"}
            </p>
            <div className={"dash-card card-grafico-large"}>
              {stats.mediaMedio !== undefined && stats.total > 0 ? (
                <>
                  <div className="report-chart-frame">
                    <LoadingCanvas id="chartMedio" variant="plot" />
                  </div>
                  <p className={"chart-value-large"}>
                    <LoadingValue
                      slot="dashboard/dashboardGraficos:4"
                      width="3ch"
                      known={false}
                      value={stats.mediaMedio}
                    />
                  </p>
                </>
              ) : (
                <div className={"empty-chart"}>{"NENHUM DADO DISPONÍVEL"}</div>
              )}
            </div>
            <p className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO FUNDAMENTAL"}
            </p>
            <div className={"dash-card card-grafico-small"}>
              {stats.mediaFundamental !== undefined && stats.total > 0 ? (
                <>
                  <div className="report-chart-frame">
                    <LoadingCanvas id="chartFundamental" variant="plot" />
                  </div>
                  <p className={"chart-value-large"}>
                    <LoadingValue
                      slot="dashboard/dashboardGraficos:5"
                      width="3ch"
                      known={false}
                      value={stats.mediaFundamental}
                    />
                  </p>
                </>
              ) : (
                <div className={"empty-chart"}>{"NENHUM DADO DISPONÍVEL"}</div>
              )}
            </div>
          </main>
          <footer className={"dash-footer"}>
            <div className={"footer-actions"}>
              <a href={"/dashboard/edit"} className={"btn-secondary-dash"}>
                <i className={"fas fa-arrow-left"}></i>
                {" VOLTAR AO EDITOR\n                "}
              </a>
              <button
                onClick={(event) => {
                  handlers.atualizarGraficos();
                }}
                className={"btn-secondary-dash"}
              >
                <i className={"fas fa-sync-alt"}></i>
                {" ATUALIZAR\n                "}
              </button>
            </div>
            <div className={"footer-credits"}>
              <p>{"© 2026 AnalisAI\n                "}</p>
            </div>
          </footer>
        </LoadingElement>
        <PageDataScript type="application/json" id="dashboard-graficos-data">
          {String(safeJson(stats))}
        </PageDataScript>
      </React.Fragment>
    </>
  );
}

export function PageHeader({ data, handlers }) {
  const { user = "", userCargo = null, stats = {} } = data;
  return (
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"Relatorios"}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardGraficos:6"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </strong>
            </span>
            <span className={"user-role"} style={styleFrom("color: #888888;")}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardGraficos:7"
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