import { LoadingElement, LoadingValue } from "../components/loading-layout";
import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
export default function ManualDoAluno({ data, handlers }) {
  const { user = "" } = data;
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
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <div className={"pdf-header"}>
            <a
              href={"/pdf/manual-do-aluno.pdf"}
              download={true}
              className={"btn-secondary-dash"}
            >
              <i className={"fas fa-download"}></i>
              {" BAIXAR PDF\n            "}
            </a>
          </div>
          <div className={"pdf-container"}>
            <iframe src={"/pdf/manual-do-aluno.pdf"}></iframe>
          </div>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const { user = "" } = data;
  return (
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"\n                    Manual do Aluno\n                "}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="manualDoAluno:1"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </strong>
            </span>
          </div>
        </div>
        <div className={"header-actions"}>
          <Partials_notificacoes
            data={{
              ...data,
              ...{
                notificacaoClasse: "header-icon",
              },
            }}
            handlers={handlers}
          />
        </div>
      </div>
    </header>
  );
}
