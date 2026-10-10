import { LoadingElement, LoadingValue } from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
export default function ManualDoProfessor({ data, handlers }) {
  const { userCargo = null, user = "" } = data;
  return (
    <>
      <React.Fragment>
        {(() => {
          const nodes = [];
          if (userCargo === "Professor" || userCargo === "Admin") {
            nodes.push(
              <Partials_barProfessor
                data={{
                  ...data,
                }}
                handlers={handlers}
                key={nodes.length}
              />,
            );
          } else {
            nodes.push(
              <Partials_barAluno
                data={{
                  ...data,
                }}
                handlers={handlers}
                key={nodes.length}
              />,
            );
          }
          nodes.push(
            <LoadingElement
              as="div"
              className={"main-layout"}
              key={nodes.length}
              root={true}
            >
              <PageHeader key="page-header" data={data} handlers={handlers} />
              <LoadingElement as="div" className={"pdf-header"}>
                <LoadingElement
                  as="a"
                  href={"/pdf/manual-do-professor.pdf"}
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
                  src={"/pdf/manual-do-professor.pdf"}
                ></LoadingElement>
              </LoadingElement>
            </LoadingElement>,
          );
          return nodes;
        })()}
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const { userCargo = null, user = "" } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Manual do Professor\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="manualDoProfessor:1"
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
