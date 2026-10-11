import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
import ErrorNotice from "../components/ErrorNotice";
export default function Login({
  data,
  handlers,
  error,
  onDismissError,
}) {
  const {
    error_msg = null,
    success_msg = null,
    tipo = "professor",
    csrfToken = null,
  } = data;
  return (
    <>
      <React.Fragment>
        <LoadingElement as="div" className={"login-wrapper"} root={true}>
          <div style={styleFrom("margin-bottom: 20px;")}>
            <a
              href={"/"}
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
                  <img
                    src={"/images/logo3-white.png"}
                    alt={"AnalisAI"}
                    id={"logoimg"}
                  />
                </div>,
              );
              if (error || error_msg) {
                nodes.push(
                  <ErrorNotice
                    key="login-error"
                    inline
                    message={error || error_msg}
                    onClose={error ? onDismissError : undefined}
                  />,
                );
              }
              if (success_msg && success_msg.length > 0) {
                nodes.push(
                  <div className={"alert-box success"} key={nodes.length}>
                    <i className={"fas fa-check-circle"}></i>
                    <LoadingValue
                      slot="login:2"
                      width="12ch"
                      known={false}
                      value={success_msg}
                    />
                  </div>,
                );
              }
              nodes.push(
                <div className={"login-tabs"} key={nodes.length}>
                  <LoadingElement
                    as="button"
                    className={
                      "login-tab professor " +
                      (tipo === "professor" ? "active" : "")
                    }
                    onClick={(event) => {
                      handlers.switchTab("professor");
                    }}
                    tone={true}
                  >
                    {"PROFESSOR"}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={
                      "login-tab aluno " + (tipo === "aluno" ? "active" : "")
                    }
                    onClick={(event) => {
                      handlers.switchTab("aluno");
                    }}
                    tone={true}
                  >
                    {"ALUNO"}
                  </LoadingElement>
                </div>,
              );
              nodes.push(
                <LoadingElement
                  as="div"
                  className={
                    "login-form professor " +
                    (tipo === "professor" ? "active" : "")
                  }
                  id={"professorForm"}
                  key={nodes.length}
                  tone={true}
                >
                  <form
                    action={"/login/professor"}
                    method={"POST"}
                    style={styleFrom("display: flex;flex-direction: column;")}
                  >
                    <input type={"hidden"} name={"_csrf"} value={csrfToken} />
                    <div className={"input-group"}>
                      <input
                        type={"text"}
                        name={"usuario"}
                        placeholder={"E-MAIL INSTITUCIONAL"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                        required={true}
                      />
                    </div>
                    <div className={"input-group"}>
                      <input
                        type={"password"}
                        name={"senha"}
                        placeholder={"SENHA"}
                        required={true}
                      />
                    </div>
                    <button
                      type={"submit"}
                      className={"btn-secondary-dash"}
                      style={styleFrom("justify-content: center;")}
                    >
                      {"ENTRAR NO SISTEMA"}
                    </button>
                  </form>
                  <a href={"/esqueci-senha"} className={"link-esqueci"}>
                    {"Esqueci minha senha"}
                  </a>
                </LoadingElement>,
              );
              nodes.push(
                <LoadingElement
                  as="div"
                  className={
                    "login-form aluno " + (tipo === "aluno" ? "active" : "")
                  }
                  id={"alunoForm"}
                  key={nodes.length}
                  tone={true}
                >
                  <div className={"info-box-login"}>
                    <i className={"fas fa-info-circle"}></i>
                    {
                      " Use sua matrícula ou e-mail cadastrado\n                "
                    }
                  </div>
                  <form
                    action={"/login/aluno"}
                    method={"POST"}
                    style={styleFrom("display: flex;flex-direction: column;")}
                  >
                    <input type={"hidden"} name={"_csrf"} value={csrfToken} />
                    <div className={"input-group input-group-aluno"}>
                      <input
                        type={"text"}
                        name={"matricula"}
                        placeholder={"MATRÍCULA"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                      />
                    </div>
                    <div className={"input-group input-group-aluno"}>
                      <input
                        type={"email"}
                        name={"email"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                        placeholder={"E-MAIL"}
                      />
                    </div>
                    <div className={"input-group input-group-aluno"}>
                      <input
                        type={"password"}
                        name={"senha"}
                        placeholder={"SENHA"}
                        required={true}
                      />
                    </div>
                    <button
                      type={"submit"}
                      className={"btn-secondary-dash"}
                      style={styleFrom("justify-content: center;")}
                    >
                      {"ENTRAR NO SISTEMA"}
                    </button>
                  </form>
                </LoadingElement>,
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
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
