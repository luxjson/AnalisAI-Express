import { LoadingElement } from "./loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function Partials_header({ data, handlers }) {
  const {} = data;
  return (
    <>
      <LoadingElement as="aside" className={"sidebar"}>
        <LoadingElement as="div" className={"sidebar-top"}>
          <LoadingElement as="div" className={"logo-container"}>
            <LoadingElement as="a" href={"#inicio"}>
              <LoadingElement
                as="img"
                src={"/images/side-bar-logo.png"}
                alt={"S"}
                className={"sideBarLogo"}
              />
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"divider"}></LoadingElement>
          <LoadingElement
            as="a"
            href={"#inicio"}
            className={"side-link active"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement as="i" className={"fas fa-home"}></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Início"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement as="a" href={"#sobre"} className={"side-link"}>
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"fas fa-layer-group"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Pilares"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement as="a" href={"#faq"} className={"side-link"}>
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"fas fa-question-circle"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Dúvidas"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
        </LoadingElement>
        <LoadingElement as="div" className={"sidebar-bottom"}>
          <LoadingElement
            as="a"
            href={"#"}
            className={"side-link"}
            onClick={(event) => {
              handlers.openModal();
            }}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"fas fa-info-circle"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Sobre"}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="a"
            href={"/login"}
            className={"side-link exit-link"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"fas fa-sign-in-alt"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Entrar"}
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" id={"infoModal"} className={"modal-new-overlay"}>
        <LoadingElement as="div" className={"modal-new-card"}>
          <LoadingElement
            as="button"
            className={"modal-new-close"}
            onClick={(event) => {
              handlers.closeModal();
            }}
          >
            <LoadingElement as="i" className={"fas fa-times"}></LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="div"
            className={"modal-new-header"}
            style={styleFrom(
              "justify-content: center;align-items: center;display: flex;flex-direction: column;",
            )}
          >
            <LoadingElement
              as="img"
              src={"/images/logo3-white.png"}
              alt={"AnalisAI"}
              className={"modal-new-logo"}
            />
            <LoadingElement as="div" className={"version-badge"}>
              {"Versão 1.0.4"}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"modal-new-body"}>
            <LoadingElement as="p" className={"modal-new-text"}>
              {[
                "\r\n                Plataforma avançada para gestão de ",
                "competências e análise de desempenho educacional. \r\n             ",
                "   Desenvolvida para facilitar a visualização de dados e tomada ",
                "de decisão pedagógica.\r\n            ",
              ].join("")}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"modal-new-divider"}
            ></LoadingElement>
            <LoadingElement as="div" className={"modal-new-info-grid"}>
              <LoadingElement as="div" className={"info-item"}>
                <LoadingElement as="span">{"Ambiente"}</LoadingElement>
                <LoadingElement as="p">{"Produção"}</LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"info-item"}>
                <LoadingElement as="span">{"Atualização"}</LoadingElement>
                <LoadingElement as="p">{"Junho 2026"}</LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"modal-new-footer"}>
            <LoadingElement as="p">{"© 2026 AnalisAI"}</LoadingElement>
            <LoadingElement as="a" href={"/equipe"} className={"modal-link"}>
              {"Time de desenvolvimento"}
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
    </>
  );
}
