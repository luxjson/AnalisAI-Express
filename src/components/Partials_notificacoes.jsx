import React from "react";
import { styleFrom } from "../services/ui";
export default function Partials_notificacoes({ data, handlers }) {
  const {} = data;
  return (
    <>
      <div className={"notificacoes-container"}>
        <a
          className={"header-icon"}
          id={"notificacoesBtn"}
          onClick={(event) => {
            handlers.toggleNotificacoes();
          }}
        >
          <i id={"sinoIcone"} className={"fas fa-bell"}></i>
          <span
            id={"notificacoesBadge"}
            className={"notificacoes-badge"}
            style={styleFrom("display: none;")}
          >
            {"0"}
          </span>
        </a>
        <div id={"notificacoesPopup"} className={"notificacoes-popup"}>
          <div className={"notificacoes-header"}>
            <h3>{"NOTIFICAÇÕES"}</h3>
            <button
              onClick={(event) => {
                handlers.marcarTodasLidas();
              }}
              className={"notificacoes-limpar"}
              title={"Marcar todas como lidas"}
            >
              <i className={"fas fa-check-double"}></i>
            </button>
          </div>
          <div id={"notificacoesLista"} className={"notificacoes-lista"}>
            <div className={"notificacoes-loading"}>
              <i className={"fas fa-circle-notch fa-spin"}></i>
              {" Carregando...\r\n            "}
            </div>
          </div>
          <div className={"notificacoes-footer"}>
            <a href={"#"} id={"notificacoesConfigLink"}>
              <i className={"fas fa-cog"}></i>
              {" Configurações\r\n            "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
