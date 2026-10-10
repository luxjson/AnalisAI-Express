import { LoadingElement } from "../components/loading-layout";
import React from "react";
import { StudentChatWelcome } from "../components/ChatWelcome.jsx";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
export default function Aluno_alunoIA({ data, handlers }) {
  const {} = data;
  return (
    <>
      <React.Fragment>
        <Partials_barAluno
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <LoadingElement as="div" className={"main-layout"} root={true}>
          <main className={"ai-page-content"}>
            <section className={"ai-chat"} data-endpoint={"/api/ia/aluno/chat"}>
              <div className={"ai-chat-header"}>
                <div className={"ai-chat-actions"}>
                  <button
                    type={"button"}
                    className={"ai-chat-action"}
                    data-new-chat={""}
                    title={"Novo chat"}
                  >
                    <i className={"ph-bold ph-plus"}></i>
                    <span>{"Novo chat"}</span>
                  </button>
                  <button
                    type={"button"}
                    className={"ai-chat-action"}
                    data-history={""}
                    title={"Mostrar histórico"}
                  >
                    <i className={"ph-bold ph-clock-counter-clockwise"}></i>
                    <span>{"Histórico"}</span>
                  </button>
                  <div className={"ai-history"} aria-hidden={"true"}>
                    <div
                      className={"ai-history-backdrop"}
                      data-close-history={""}
                    ></div>
                    <aside className={"ai-history-drawer"}>
                      <div className={"ai-history-heading"}>
                        <button
                          type={"button"}
                          data-close-history={""}
                          title={"Fechar"}
                        >
                          <i className={"ph-bold ph-x"}></i>
                        </button>
                      </div>
                      <div className={"ai-history-list"}></div>
                    </aside>
                  </div>
                </div>
              </div>
              <div className={"ai-messages"} aria-live={"polite"}>
                <StudentChatWelcome />
              </div>
              <form className={"ai-form"}>
                <textarea
                  maxLength={"4000"}
                  placeholder={"Pergunte ao Agente..."}
                  required={true}
                  defaultValue={""}
                ></textarea>
                <button type={"submit"} title={"Enviar"}>
                  <i className={"ph-bold ph-paper-plane-right"}></i>
                </button>
              </form>
            </section>
          </main>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
