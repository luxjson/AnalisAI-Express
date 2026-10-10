import { LoadingElement } from "./loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function Partials_notificacoes({ data, handlers }) {
  const {} = data;
  return (
    <>
      <LoadingElement as="div" className={"notificacoes-container"}>
        <LoadingElement
          as="a"
          className={"header-icon"}
          id={"notificacoesBtn"}
          onClick={(event) => {
            handlers.toggleNotificacoes();
          }}
        >
          <LoadingElement
            as="i"
            id={"sinoIcone"}
            className={"fas fa-bell"}
          ></LoadingElement>
          <LoadingElement
            as="span"
            id={"notificacoesBadge"}
            className={"notificacoes-badge"}
            style={styleFrom("display: none;")}
          >
            {"0"}
          </LoadingElement>
        </LoadingElement>
        <LoadingElement
          as="div"
          id={"notificacoesPopup"}
          className={"notificacoes-popup"}
        >
          <LoadingElement as="div" className={"notificacoes-header"}>
            <LoadingElement as="h3">{"NOTIFICAÇÕES"}</LoadingElement>
            <LoadingElement
              as="button"
              onClick={(event) => {
                handlers.marcarTodasLidas();
              }}
              className={"notificacoes-limpar"}
              title={"Marcar todas como lidas"}
            >
              <LoadingElement
                as="i"
                className={"fas fa-check-double"}
              ></LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="div"
            id={"notificacoesLista"}
            className={"notificacoes-lista"}
          >
            <LoadingElement as="div" className={"notificacoes-loading"}>
              <LoadingElement
                as="i"
                className={"fas fa-circle-notch fa-spin"}
              ></LoadingElement>
              {" Carregando...\r\n            "}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"notificacoes-footer"}>
            <LoadingElement as="a" href={"#"} id={"notificacoesConfigLink"}>
              <LoadingElement as="i" className={"fas fa-cog"}></LoadingElement>
              {" Configurações\r\n            "}
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
    </>
  );
}
