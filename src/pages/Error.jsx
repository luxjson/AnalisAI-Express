import React from "react";
import { styleFrom, safeJson } from "../services/ui";
export default function Error({ data, handlers }) {
  const { mensagem = null, erroDetalhe = null } = data;

  return (
    <>
      <React.Fragment>
        <div className={"page"}>
          <div className={"content"}>
            {(() => {
              const nodes = [];
              nodes.push(
                <h1 className={"heading"} key={nodes.length}>
                  {"\r\n                Se você está lendo isso,"}
                  <br />
                  {"\r\n                algo deu terrivelmente,"}
                  <br />
                  {"\r\n                terrivelmente errado.\r\n            "}
                </h1>,
              );
              if (mensagem) {
                nodes.push(
                  <p className={"message"} key={nodes.length}>
                    {mensagem}
                  </p>,
                );
              }
              if (erroDetalhe) {
                nodes.push(
                  <div className={"detail-box"} key={nodes.length}>
                    <p className={"label"}>{"DETALHES"}</p>
                    <p className={"value"}>{erroDetalhe}</p>
                  </div>,
                );
              }
              nodes.push(
                <div className={"actions"} key={nodes.length}>
                  <a
                    href={"#"}
                    onClick={(event) => {
                      event.preventDefault();
                      history.back();
                    }}
                    className={"btn"}
                  >
                    {"\r\n                    Voltar "}
                    <i className={"fas fa-arrow-left arrow"}></i>
                  </a>
                </div>,
              );
              return nodes;
            })()}
          </div>
          <div className={"code-stack"} aria-hidden={"true"}>
            <span className={"layer l1"}>{"404"}</span>
            <span className={"layer l2"}>{"404"}</span>
            <span className={"layer l3"}>{"404"}</span>
          </div>
          <footer className={"credits"}>{"© 2026 AnalisAI"}</footer>
        </div>
      </React.Fragment>
    </>
  );
}
