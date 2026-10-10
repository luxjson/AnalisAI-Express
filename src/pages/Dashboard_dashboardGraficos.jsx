import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom, safeJson } from "../services/ui";
export default function Dashboard_dashboardGraficos({
  data,
  handlers
}) {
  const {
    user = "",
    userCargo = null,
    stats = {}
  } = data;
  return <>
      <React.Fragment>
        <Partials_barProfessor data={{
        ...data
      }} handlers={handlers} />
        <div className={"main-layout"}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <main className={"dash-content graficos-grid"}>
            <p className={"section-label"}>{"PANORAMA DE NÍVEIS"}</p>
            <div className={"row-triple"}>
              <div className={"dash-card card-grafico"}>
                {(() => {
                const nodes = [];
                if (stats.total > 0) {
                  nodes.push(<canvas id={"chartAptos"} key={nodes.length}></canvas>);
                  nodes.push(<p className={"chart-label label-verde"} key={nodes.length}>
                        {"ALUNOS APTOS"}
                      </p>);
                  nodes.push(<p className={"chart-value"} key={nodes.length}>
                        {stats.apto}
                      </p>);
                } else {
                  nodes.push(<div className={"empty-chart"} key={nodes.length}>
                        {"SEM DADOS PARA EXIBIR"}
                      </div>);
                }
                return nodes;
              })()}
              </div>
              <div className={"dash-card card-grafico"}>
                {(() => {
                const nodes = [];
                if (stats.total > 0) {
                  nodes.push(<canvas id={"chartInaptos"} key={nodes.length}></canvas>);
                  nodes.push(<p className={"chart-label label-vermelho"} key={nodes.length}>
                        {"ALUNOS INAPTOS"}
                      </p>);
                  nodes.push(<p className={"chart-value"} key={nodes.length}>
                        {stats.inapto}
                      </p>);
                } else {
                  nodes.push(<div className={"empty-chart"} key={nodes.length}>
                        {"SEM DADOS PARA EXIBIR"}
                      </div>);
                }
                return nodes;
              })()}
              </div>
              <div className={"dash-card card-grafico"}>
                {(() => {
                const nodes = [];
                if (stats.total > 0) {
                  nodes.push(<canvas id={"chartDesenvolvimento"} key={nodes.length}></canvas>);
                  nodes.push(<p className={"chart-label label-amarelo"} key={nodes.length}>
                        {"EM DESENVOLVIMENTO"}
                      </p>);
                  nodes.push(<p className={"chart-value"} key={nodes.length}>
                        {stats.total - stats.apto - stats.inapto}
                      </p>);
                } else {
                  nodes.push(<div className={"empty-chart"} key={nodes.length}>
                        {"SEM DADOS PARA EXIBIR"}
                      </div>);
                }
                return nodes;
              })()}
              </div>
            </div>
            <p className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO MÉDIO"}
            </p>
            <div className={"dash-card card-grafico-large"}>
              {(() => {
              const nodes = [];
              if (stats.mediaMedio !== undefined && stats.total > 0) {
                nodes.push(<canvas id={"chartMedio"} key={nodes.length}></canvas>);
                nodes.push(<p className={"chart-value-large"} key={nodes.length}>
                      {stats.mediaMedio}
                    </p>);
              } else {
                nodes.push(<div className={"empty-chart"} key={nodes.length}>
                      {"NENHUM DADO DISPONÍVEL"}
                    </div>);
              }
              return nodes;
            })()}
            </div>
            <p className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO FUNDAMENTAL"}
            </p>
            <div className={"dash-card card-grafico-small"}>
              {(() => {
              const nodes = [];
              if (stats.mediaFundamental !== undefined && stats.total > 0) {
                nodes.push(<canvas id={"chartFundamental"} key={nodes.length}></canvas>);
                nodes.push(<p className={"chart-value-large"} key={nodes.length}>
                      {stats.mediaFundamental}
                    </p>);
              } else {
                nodes.push(<div className={"empty-chart"} key={nodes.length}>
                      {"NENHUM DADO DISPONÍVEL"}
                    </div>);
              }
              return nodes;
            })()}
            </div>
          </main>
          <footer className={"dash-footer"}>
            <div className={"footer-actions"}>
              <a href={"/dashboard/edit"} className={"btn-secondary-dash"}>
                <i className={"fas fa-arrow-left"}></i>
                {" VOLTAR AO EDITOR\n                "}
              </a>
              <button onClick={event => {
              handlers.atualizarGraficos();
            }} className={"btn-secondary-dash"}>
                <i className={"fas fa-sync-alt"}></i>
                {" ATUALIZAR\n                "}
              </button>
            </div>
            <div className={"footer-credits"}>
              <p>{"© 2026 AnalisAI\n                "}</p>
            </div>
          </footer>
        </div>
        <script type="application/json" id="dashboard-graficos-data">
          {String(safeJson(stats))}
        </script>
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
    stats = {}
  } = data;
  return <header className={"dash-header"}>
            <div className={"header-left"}>
              <h1>{"Relatorios"}</h1>
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
