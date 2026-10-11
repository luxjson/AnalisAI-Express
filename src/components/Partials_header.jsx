import React from "react";
import { styleFrom } from "../services/ui";
export default function Partials_header({ data, handlers }) {
  const {} = data;
  return (
    <>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label="Abrir menu"
        aria-expanded="false"
      >
        <i className="fas fa-bars" aria-hidden="true"></i>
      </button>
      <div className="mobile-menu-backdrop" data-close-mobile-menu=""></div>
      <aside className={"sidebar"}>
        <div className={"sidebar-top"}>
          <div className={"logo-container"}>
            <a href={"#inicio"}>
              <img
                src={"/images/side-bar-logo.png"}
                alt={"S"}
                className={"sideBarLogo"}
              />
            </a>
          </div>
          <div className={"divider"}></div>
          <a href={"#inicio"} className={"side-link active"}>
            <div className={"icon-box"}>
              <i className={"fas fa-home"}></i>
            </div>
            <span className={"link-text"}>{"Início"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a href={"#sobre"} className={"side-link"}>
            <div className={"icon-box"}>
              <i className={"fas fa-layer-group"}></i>
            </div>
            <span className={"link-text"}>{"Pilares"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a href={"#faq"} className={"side-link"}>
            <div className={"icon-box"}>
              <i className={"fas fa-question-circle"}></i>
            </div>
            <span className={"link-text"}>{"Dúvidas"}</span>
            <div className={"active-indicator"}></div>
          </a>
        </div>
        <div className={"sidebar-bottom"}>
          <a
            href={"#"}
            className={"side-link"}
            onClick={(event) => {
              handlers.openModal();
            }}
          >
            <div className={"icon-box"}>
              <i className={"fas fa-info-circle"}></i>
            </div>
            <span className={"link-text"}>{"Sobre"}</span>
          </a>
          <a href={"/login"} className={"side-link exit-link"}>
            <div className={"icon-box"}>
              <i className={"fas fa-sign-in-alt"}></i>
            </div>
            <span className={"link-text"}>{"Entrar"}</span>
          </a>
        </div>
      </aside>
      <div id={"infoModal"} className={"modal-new-overlay"}>
        <div className={"modal-new-card"}>
          <button
            className={"modal-new-close"}
            onClick={(event) => {
              handlers.closeModal();
            }}
          >
            <i className={"fas fa-times"}></i>
          </button>
          <div
            className={"modal-new-header"}
            style={styleFrom(
              "justify-content: center;align-items: center;display: flex;flex-direction: column;",
            )}
          >
            <img
              src={"/images/logo3-white.png"}
              alt={"AnalisAI"}
              className={"modal-new-logo"}
            />
            <div className={"version-badge"}>{"Versão 1.0.4"}</div>
          </div>
          <div className={"modal-new-body"}>
            <p className={"modal-new-text"}>
              {[
                "\r\n                Plataforma avançada para gestão de ",
                "competências e análise de desempenho educacional. \r\n             ",
                "   Desenvolvida para facilitar a visualização de dados e tomada ",
                "de decisão pedagógica.\r\n            ",
              ].join("")}
            </p>
            <div className={"modal-new-divider"}></div>
            <div className={"modal-new-info-grid"}>
              <div className={"info-item"}>
                <span>{"Ambiente"}</span>
                <p>{"Produção"}</p>
              </div>
              <div className={"info-item"}>
                <span>{"Atualização"}</span>
                <p>{"Junho 2026"}</p>
              </div>
            </div>
          </div>
          <div className={"modal-new-footer"}>
            <p>{"© 2026 AnalisAI"}</p>
            <a href={"/equipe"} className={"modal-link"}>
              {"Time de desenvolvimento"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
