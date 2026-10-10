import { LoadingElement } from "../components/loading-layout";
import React from "react";
import { ProfessorChatWelcome } from "../components/ChatWelcome.jsx";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
export default function Dashboard_dashboardIA({ data, handlers }) {
  const {} = data;
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
          <LoadingElement as="main" className={"ai-page-content"}>
            <LoadingElement
              as="section"
              className={"ai-chat"}
              data-endpoint={"/api/ia/professor/chat"}
            >
              <LoadingElement as="div" className={"ai-chat-header"}>
                <LoadingElement as="div" className={"ai-chat-actions"}>
                  <LoadingElement
                    as="button"
                    type={"button"}
                    className={"ai-chat-action"}
                    data-new-chat={""}
                    title={"Novo chat"}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-plus"}
                    ></LoadingElement>
                    <LoadingElement as="span">{"Novo chat"}</LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    type={"button"}
                    className={"ai-chat-action"}
                    data-history={""}
                    title={"Mostrar histórico"}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-clock-counter-clockwise"}
                    ></LoadingElement>
                    <LoadingElement as="span">{"Histórico"}</LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    className={"ai-history"}
                    aria-hidden={"true"}
                  >
                    <LoadingElement
                      as="div"
                      className={"ai-history-backdrop"}
                      data-close-history={""}
                    ></LoadingElement>
                    <LoadingElement as="aside" className={"ai-history-drawer"}>
                      <LoadingElement as="div" className={"ai-history-heading"}>
                        <LoadingElement
                          as="button"
                          type={"button"}
                          data-close-history={""}
                          title={"Fechar"}
                        >
                          <LoadingElement
                            as="i"
                            className={"ph-bold ph-x"}
                          ></LoadingElement>
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        className={"ai-history-list"}
                      ></LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"ai-messages"}
                aria-live={"polite"}
              >
                <ProfessorChatWelcome />
              </LoadingElement>
              <LoadingElement as="form" className={"ai-form"}>
                <LoadingElement
                  as="textarea"
                  maxLength={"4000"}
                  placeholder={"Pergunte ao Agente sobre sua turma..."}
                  required={true}
                  defaultValue={""}
                ></LoadingElement>
                <LoadingElement as="button" type={"submit"} title={"Enviar"}>
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-paper-plane-right"}
                  ></LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
