import { LoadingElement } from "../components/loading-layout";
import React from "react";
export default function Dashboard_dashboardEquipe({ data, handlers }) {
  const {} = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"team-wrapper"} root={true}>
          <LoadingElement as="div" className={"team-logo"}>
            <LoadingElement
              as="img"
              src={"/images/logo3-white.png"}
              alt={"AnalisAI"}
            />
            <LoadingElement as="h3">{"Time de Desenvolvimento"}</LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"team-card"}>
            <LoadingElement as="div" className={"team-grid"}>
              <LoadingElement as="div" className={"team-section"}>
                <LoadingElement as="div" className={"team-section-title"}>
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-pencil"}
                  ></LoadingElement>
                  {" Front-end\n                    "}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Lucas Eduardo Duarte Pereira"}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Ellefer Fernanda Bovaroti Rizzo"}
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"team-section"}>
                <LoadingElement as="div" className={"team-section-title"}>
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-terminal-window"}
                  ></LoadingElement>
                  {" Back-end\n                    "}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Lucas Eduardo Duarte Pereira"}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Isabella Li Affa Sanches"}
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"team-section"}>
                <LoadingElement as="div" className={"team-section-title"}>
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-database"}
                  ></LoadingElement>
                  {" Banco de Dados\n                    "}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Isabella Li Affa Sanches"}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Luiz Otávio da Silva Mattarugo"}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"team-divider"}>
              <LoadingElement as="div" className={"team-actions"}>
                <LoadingElement
                  as="a"
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    history.back();
                  }}
                  className={"btn-secondary-dash"}
                >
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-arrow-left"}
                  ></LoadingElement>
                  {" Voltar ao Painel\n                    "}
                </LoadingElement>
                <LoadingElement
                  as="a"
                  href={"/dashboard"}
                  className={"btn-secondary-dash"}
                >
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-house"}
                  ></LoadingElement>
                  {" Dashboard\n                    "}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
