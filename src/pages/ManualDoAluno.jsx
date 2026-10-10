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
          <LoadingElement as="div" className={"pdf-header"}>
            <LoadingElement
              as="a"
              href={"/pdf/manual-do-aluno.pdf"}
              download={true}
              className={"btn-secondary-dash"}
            >
              <LoadingElement
                as="i"
                className={"fas fa-download"}
              ></LoadingElement>
              {" BAIXAR PDF\n            "}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"pdf-container"}>
            <LoadingElement
              as="iframe"
              src={"/pdf/manual-do-aluno.pdf"}
            ></LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const { user = "" } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Manual do Aluno\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="manualDoAluno:1"
                  width="12ch"
                  known={true}
                  value={user}
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
