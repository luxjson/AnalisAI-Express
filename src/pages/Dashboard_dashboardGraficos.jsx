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
          <LoadingElement as="main" className={"dash-content graficos-grid"}>
            <LoadingElement as="p" className={"section-label"}>
              {"PANORAMA DE NÍVEIS"}
            </LoadingElement>
            <LoadingElement as="div" className={"row-triple"}>
              <LoadingElement as="div" className={"dash-card card-grafico"}>
                {(() => {
                  const nodes = [];
                  if (stats.total > 0) {
                    nodes.push(
                      <LoadingCanvas
                        id={"chartAptos"}
                        key={nodes.length}
                        variant="ring"
                      ></LoadingCanvas>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-label label-verde"}
                        key={nodes.length}
                      >
                        {"ALUNOS APTOS"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-value"}
                        key={nodes.length}
                      >
                        <LoadingValue
                          slot="dashboard/dashboardGraficos:1"
                          width="3ch"
                          known={false}
                          value={stats.apto}
                        />
                      </LoadingElement>,
                    );
                  } else {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"empty-chart"}
                        key={nodes.length}
                      >
                        {"SEM DADOS PARA EXIBIR"}
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
              <LoadingElement as="div" className={"dash-card card-grafico"}>
                {(() => {
                  const nodes = [];
                  if (stats.total > 0) {
                    nodes.push(
                      <LoadingCanvas
                        id={"chartInaptos"}
                        key={nodes.length}
                        variant="ring"
                      ></LoadingCanvas>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-label label-vermelho"}
                        key={nodes.length}
                      >
                        {"ALUNOS INAPTOS"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-value"}
                        key={nodes.length}
                      >
                        <LoadingValue
                          slot="dashboard/dashboardGraficos:2"
                          width="3ch"
                          known={false}
                          value={stats.inapto}
                        />
                      </LoadingElement>,
                    );
                  } else {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"empty-chart"}
                        key={nodes.length}
                      >
                        {"SEM DADOS PARA EXIBIR"}
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
              <LoadingElement as="div" className={"dash-card card-grafico"}>
                {(() => {
                  const nodes = [];
                  if (stats.total > 0) {
                    nodes.push(
                      <LoadingCanvas
                        id={"chartDesenvolvimento"}
                        key={nodes.length}
                        variant="ring"
                      ></LoadingCanvas>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-label label-amarelo"}
                        key={nodes.length}
                      >
                        {"EM DESENVOLVIMENTO"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"chart-value"}
                        key={nodes.length}
                      >
                        <LoadingValue
                          slot="dashboard/dashboardGraficos:3"
                          width="3ch"
                          known={false}
                          value={stats.total - stats.apto - stats.inapto}
                        />
                      </LoadingElement>,
                    );
                  } else {
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"empty-chart"}
                        key={nodes.length}
                      >
                        {"SEM DADOS PARA EXIBIR"}
                      </LoadingElement>,
                    );
                  }
                  return nodes;
                })()}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="p" className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO MÉDIO"}
            </LoadingElement>
            <LoadingElement as="div" className={"dash-card card-grafico-large"}>
              {(() => {
                const nodes = [];
                if (stats.mediaMedio !== undefined && stats.total > 0) {
                  nodes.push(
                    <LoadingCanvas
                      id={"chartMedio"}
                      key={nodes.length}
                      variant="plot"
                    ></LoadingCanvas>,
                  );
                  nodes.push(
                    <LoadingElement
                      as="p"
                      className={"chart-value-large"}
                      key={nodes.length}
                    >
                      <LoadingValue
                        slot="dashboard/dashboardGraficos:4"
                        width="3ch"
                        known={false}
                        value={stats.mediaMedio}
                      />
                    </LoadingElement>,
                  );
                } else {
                  nodes.push(
                    <LoadingElement
                      as="div"
                      className={"empty-chart"}
                      key={nodes.length}
                    >
                      {"NENHUM DADO DISPONÍVEL"}
                    </LoadingElement>,
                  );
                }
                return nodes;
              })()}
            </LoadingElement>
            <LoadingElement as="p" className={"section-label"}>
              {"DESEMPENHO MÉDIO — ENSINO FUNDAMENTAL"}
            </LoadingElement>
            <LoadingElement as="div" className={"dash-card card-grafico-small"}>
              {(() => {
                const nodes = [];
                if (stats.mediaFundamental !== undefined && stats.total > 0) {
                  nodes.push(
                    <LoadingCanvas
                      id={"chartFundamental"}
                      key={nodes.length}
                      variant="plot"
                    ></LoadingCanvas>,
                  );
                  nodes.push(
                    <LoadingElement
                      as="p"
                      className={"chart-value-large"}
                      key={nodes.length}
                    >
                      <LoadingValue
                        slot="dashboard/dashboardGraficos:5"
                        width="3ch"
                        known={false}
                        value={stats.mediaFundamental}
                      />
                    </LoadingElement>,
                  );
                } else {
                  nodes.push(
                    <LoadingElement
                      as="div"
                      className={"empty-chart"}
                      key={nodes.length}
                    >
                      {"NENHUM DADO DISPONÍVEL"}
                    </LoadingElement>,
                  );
                }
                return nodes;
              })()}
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
                  className={"fas fa-arrow-left"}
                ></LoadingElement>
                {" VOLTAR AO EDITOR\n                "}
              </LoadingElement>
              <LoadingElement
                as="button"
                onClick={(event) => {
                  handlers.atualizarGraficos();
                }}
                className={"btn-secondary-dash"}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-sync-alt"}
                ></LoadingElement>
                {" ATUALIZAR\n                "}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"footer-credits"}>
              <LoadingElement as="p">
                {"© 2026 AnalisAI\n                "}
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
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
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">{"Relatorios"}</LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardGraficos:6"
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
                  slot="dashboard/dashboardGraficos:7"
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
