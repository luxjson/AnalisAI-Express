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
          if (["Professor", "Coordenador", "Admin"].includes(userCargo)) {
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
              <div className={"pdf-header"}>
                <a
                  href={"/pdf/manual-do-professor.pdf"}
                  download={true}
                  className={"btn-secondary-dash"}
                >
                  <i className={"fas fa-download"}></i>
                  {" BAIXAR PDF\n            "}
                </a>
              </div>
              <div className={"pdf-container"}>
                <iframe src={"/pdf/manual-do-professor.pdf"}></iframe>
              </div>
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
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"\n                    Manual do Professor\n                "}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="manualDoProfessor:1"
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
