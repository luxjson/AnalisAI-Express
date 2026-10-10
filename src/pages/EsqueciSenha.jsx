import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function EsqueciSenha({ data, handlers }) {
  const { error_msg = null, success_msg = null, csrfToken = null } = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"login-wrapper"} root={true}>
          <LoadingElement as="div" style={styleFrom("margin-bottom: 20px;")}>
            <LoadingElement
              as="a"
              href={"/login"}
              className={"btn-secondary-dash"}
              style={styleFrom("text-decoration: none;")}
            >
              <LoadingElement
                as="i"
                className={"fas fa-undo-alt"}
              ></LoadingElement>
              {" VOLTAR\n            "}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"login-card"}>
            {(() => {
              const nodes = [];
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"login-logo"}
                  key={nodes.length}
                >
                  <LoadingElement
                    as="img"
                    src={"/images/logo3-white.png"}
                    alt={"AnalisAI"}
                  />
                </LoadingElement>,
              );
              nodes.push(
                <LoadingElement
                  as="h2"
                  className={"page-title"}
                  key={nodes.length}
                >
                  {"Recuperar Senha"}
                </LoadingElement>,
              );
              if (error_msg && error_msg.length > 0) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"alert-box error"}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-exclamation-circle"}
                    ></LoadingElement>
                    <LoadingValue
                      slot="esqueciSenha:1"
                      width="12ch"
                      known={false}
                      value={error_msg}
                    />
                  </LoadingElement>,
                );
              }
              if (success_msg && success_msg.length > 0) {
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"alert-box success"}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-check-circle"}
                    ></LoadingElement>
                    <LoadingValue
                      slot="esqueciSenha:2"
                      width="12ch"
                      known={false}
                      value={success_msg}
                    />
                  </LoadingElement>,
                );
              }
              nodes.push(
                <LoadingElement
                  as="div"
                  className={"info-box-login"}
                  key={nodes.length}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-info-circle"}
                  ></LoadingElement>
                  {
                    " Informe seu e-mail para solicitar a redefinição da sua senha.\n            "
                  }
                </LoadingElement>,
              );
              nodes.push(
                <LoadingElement
                  as="form"
                  action={"/esqueci-senha/solicitar"}
                  method={"POST"}
                  key={nodes.length}
                >
                  <LoadingElement
                    as="input"
                    type={"hidden"}
                    name={"_csrf"}
                    value={csrfToken}
                  />
                  <LoadingElement as="div" className={"input-group"}>
                    <LoadingElement
                      as="input"
                      type={"email"}
                      name={"email"}
                      placeholder={"SEU E-MAIL CADASTRADO"}
                      onInput={(event) => {
                        event.currentTarget.value =
                          event.currentTarget.value.toLowerCase();
                      }}
                      required={true}
                    />
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    type={"submit"}
                    className={"btn-secondary-dash"}
                    style={styleFrom(
                      "width: 100%;text-align: center;display: flex;justify-content: center;",
                    )}
                  >
                    {
                      "\n                    SOLICITAR REDEFINIÇÃO\n                "
                    }
                  </LoadingElement>
                </LoadingElement>,
              );
              nodes.push(
                <LoadingElement
                  as="p"
                  style={styleFrom(
                    "text-align: center; margin-top: 25px; color: #555; font-size: 0.8rem;",
                  )}
                  key={nodes.length}
                >
                  {
                    "\n                Um administrador será notificado para validar seu pedido.\n            "
                  }
                </LoadingElement>,
              );
              return nodes;
            })()}
          </LoadingElement>
          <LoadingElement
            as="footer"
            style={styleFrom("margin-top: 30px; text-align: center;")}
          >
            <LoadingElement
              as="a"
              href={"/termos"}
              className={"btn-secondary-dash"}
              style={styleFrom(
                "font-size: 0.7rem; border: none; background: transparent;",
              )}
            >
              {"\n                TERMOS DE SERVIÇO\n            "}
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
