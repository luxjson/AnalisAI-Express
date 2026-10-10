import { LoadingElement } from "../components/loading-layout";
import React from "react";
export default function Dashboard_dashboardEquipe({ data, handlers }) {
  const {} = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"team-wrapper"} root={true}>
          <div className={"team-logo"}>
            <img src={"/images/logo3-white.png"} alt={"AnalisAI"} />
            <h3>{"Time de Desenvolvimento"}</h3>
          </div>
          <div className={"team-card"}>
            <div className={"team-grid"}>
              <div className={"team-section"}>
                <div className={"team-section-title"}>
                  <i className={"ph-bold ph-pencil"}></i>
                  {" Front-end\n                    "}
                </div>
                <p>{"Lucas Eduardo Duarte Pereira"}</p>
                <p>{"Ellefer Fernanda Bovaroti Rizzo"}</p>
              </div>
              <div className={"team-section"}>
                <div className={"team-section-title"}>
                  <i className={"ph-bold ph-terminal-window"}></i>
                  {" Back-end\n                    "}
                </div>
                <p>{"Lucas Eduardo Duarte Pereira"}</p>
                <p>{"Isabella Li Affa Sanches"}</p>
              </div>
              <div className={"team-section"}>
                <div className={"team-section-title"}>
                  <i className={"ph-bold ph-database"}></i>
                  {" Banco de Dados\n                    "}
                </div>
                <p>{"Isabella Li Affa Sanches"}</p>
                <p>{"Luiz Otávio da Silva Mattarugo"}</p>
              </div>
            </div>
            <div className={"team-divider"}>
              <div className={"team-actions"}>
                <a
                  href={"#"}
                  onClick={(event) => {
                    event.preventDefault();
                    history.back();
                  }}
                  className={"btn-secondary-dash"}
                >
                  <i className={"ph-bold ph-arrow-left"}></i>
                  {" Voltar ao Painel\n                    "}
                </a>
                <a href={"/dashboard"} className={"btn-secondary-dash"}>
                  <i className={"ph-bold ph-house"}></i>
                  {" Dashboard\n                    "}
                </a>
              </div>
            </div>
          </div>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
