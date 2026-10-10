import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
export default function Error({ data, handlers }) {
  const { mensagem = null, erroDetalhe = null } = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"page"} root={true}>
          <LoadingElement as="div" className={"content"}>
            {(() => {
              const nodes = [];
              nodes.push(
                <LoadingElement
                  as="h1"
                  className={"heading"}
                  key={nodes.length}
                >
                  {"\r\n                Se você está lendo isso,"}
                  <LoadingElement as="br" />
                  {"\r\n                algo deu terrivelmente,"}
                  <LoadingElement as="br" />
                  {"\r\n                terrivelmente errado.\r\n            "}
                </LoadingElement>,
              );
              if (mensagem) {
                nodes.push(
                  <LoadingElement
                    as="p"
                    className={"message"}
                    key={nodes.length}
                  >
                    <LoadingValue
                      slot="error:1"
                      width="12ch"
                      known={false}
                      value={mensagem}
                    />
                  </LoadingElement>,
                );
              }
              if (erroDetalhe) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"detail-box"}
                    key={nodes.length}
                  >
                    <LoadingElement as="p" className={"label"}>
                      {"DETALHES"}
                    </LoadingElement>
                    <LoadingElement as="p" className={"value"}>
                      <LoadingValue
                        slot="error:2"
                        width="12ch"
                        known={false}
                        value={erroDetalhe}
                      />
                    </LoadingElement>
                  </LoadingElement>,
                );
              }
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"actions"}
                  key={nodes.length}
                >
                  <LoadingElement
                    as="a"
                    href={"#"}
                    onClick={(event) => {
                      event.preventDefault();
                      history.back();
                    }}
                    className={"btn"}
                  >
                    {"\r\n                    Voltar "}
                    <LoadingElement
                      as="i"
                      className={"fas fa-arrow-left arrow"}
                    ></LoadingElement>
                  </LoadingElement>
                </LoadingElement>,
              );
              return nodes;
            })()}
          </LoadingElement>
          <LoadingElement
            as="div"
            className={"code-stack"}
            aria-hidden={"true"}
          >
            <LoadingElement as="span" className={"layer l1"}>
              {"404"}
            </LoadingElement>
            <LoadingElement as="span" className={"layer l2"}>
              {"404"}
            </LoadingElement>
            <LoadingElement as="span" className={"layer l3"}>
              {"404"}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="footer" className={"credits"}>
            {"© 2026 AnalisAI"}
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
