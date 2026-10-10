import React from "react";
import { styleFrom, safeJson } from "../services/ui";
export default function EsqueciSenha({ data, handlers }) {
  const { error_msg = null, success_msg = null, csrfToken = null } = data;

  return (
    <>
      <React.Fragment>
        <div className={"login-wrapper"}>
          <div style={styleFrom("margin-bottom: 20px;")}>
            <a
              href={"/login"}
              className={"btn-secondary-dash"}
              style={styleFrom("text-decoration: none;")}
            >
              <i className={"fas fa-undo-alt"}></i>
              {" VOLTAR\n            "}
            </a>
          </div>
          <div className={"login-card"}>
            {(() => {
              const nodes = [];
              nodes.push(
                <div className={"login-logo"} key={nodes.length}>
                  <img src={"/images/logo3-white.png"} alt={"AnalisAI"} />
                </div>,
              );
              nodes.push(
                <h2 className={"page-title"} key={nodes.length}>
                  {"Recuperar Senha"}
                </h2>,
              );
              if (error_msg && error_msg.length > 0) {
                nodes.push(
                  <div className={"alert-box error"} key={nodes.length}>
                    <i className={"fas fa-exclamation-circle"}></i>
                    {error_msg}
                  </div>,
                );
              }
              if (success_msg && success_msg.length > 0) {
                nodes.push(
                  <div className={"alert-box success"} key={nodes.length}>
                    <i className={"fas fa-check-circle"}></i>
                    {success_msg}
                  </div>,
                );
              }
              nodes.push(
                <div className={"info-box-login"} key={nodes.length}>
                  <i className={"fas fa-info-circle"}></i>
                  {
                    " Informe seu e-mail para solicitar a redefinição da sua senha.\n            "
                  }
                </div>,
              );
              nodes.push(
                <form
                  action={"/esqueci-senha/solicitar"}
                  method={"POST"}
                  key={nodes.length}
                >
                  <input type={"hidden"} name={"_csrf"} value={csrfToken} />
                  <div className={"input-group"}>
                    <input
                      type={"email"}
                      name={"email"}
                      placeholder={"SEU E-MAIL CADASTRADO"}
                      onInput={(event) => {
                        event.currentTarget.value =
                          event.currentTarget.value.toLowerCase();
                      }}
                      required={true}
                    />
                  </div>
                  <button
                    type={"submit"}
                    className={"btn-secondary-dash"}
                    style={styleFrom(
                      "width: 100%;text-align: center;display: flex;justify-content: center;",
                    )}
                  >
                    {
                      "\n                    SOLICITAR REDEFINIÇÃO\n                "
                    }
                  </button>
                </form>,
              );
              nodes.push(
                <p
                  style={styleFrom(
                    "text-align: center; margin-top: 25px; color: #555; font-size: 0.8rem;",
                  )}
                  key={nodes.length}
                >
                  {
                    "\n                Um administrador será notificado para validar seu pedido.\n            "
                  }
                </p>,
              );
              return nodes;
            })()}
          </div>
          <footer style={styleFrom("margin-top: 30px; text-align: center;")}>
            <a
              href={"/termos"}
              className={"btn-secondary-dash"}
              style={styleFrom(
                "font-size: 0.7rem; border: none; background: transparent;",
              )}
            >
              {"\n                TERMOS DE SERVIÇO\n            "}
            </a>
          </footer>
        </div>
      </React.Fragment>
    </>
  );
}
