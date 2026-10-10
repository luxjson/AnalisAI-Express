import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import { styleFrom } from "../services/ui";
export default function Login({ data, handlers }) {
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
          <LoadingElement as="div" style={styleFrom("margin-bottom: 20px;")}>
            <LoadingElement
              as="a"
              href={"/"}
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
                    id={"logoimg"}
                  />
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
                      slot="login:1"
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
                      slot="login:2"
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
                  className={"login-tabs"}
                  key={nodes.length}
                >
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
                </LoadingElement>,
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
                  <LoadingElement
                    as="form"
                    action={"/login/professor"}
                    method={"POST"}
                    style={styleFrom("display: flex;flex-direction: column;")}
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
                        type={"text"}
                        name={"usuario"}
                        placeholder={"E-MAIL INSTITUCIONAL"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                        required={true}
                      />
                    </LoadingElement>
                    <LoadingElement as="div" className={"input-group"}>
                      <LoadingElement
                        as="input"
                        type={"password"}
                        name={"senha"}
                        placeholder={"SENHA"}
                        required={true}
                      />
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      type={"submit"}
                      className={"btn-secondary-dash"}
                      style={styleFrom("justify-content: center;")}
                    >
                      {"ENTRAR NO SISTEMA"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="a"
                    href={"/esqueci-senha"}
                    className={"link-esqueci"}
                  >
                    {"Esqueci minha senha"}
                  </LoadingElement>
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
                  <LoadingElement as="div" className={"info-box-login"}>
                    <LoadingElement
                      as="i"
                      className={"fas fa-info-circle"}
                    ></LoadingElement>
                    {
                      " Use sua matrícula ou e-mail cadastrado\n                "
                    }
                  </LoadingElement>
                  <LoadingElement
                    as="form"
                    action={"/login/aluno"}
                    method={"POST"}
                    style={styleFrom("display: flex;flex-direction: column;")}
                  >
                    <LoadingElement
                      as="input"
                      type={"hidden"}
                      name={"_csrf"}
                      value={csrfToken}
                    />
                    <LoadingElement
                      as="div"
                      className={"input-group input-group-aluno"}
                    >
                      <LoadingElement
                        as="input"
                        type={"text"}
                        name={"matricula"}
                        placeholder={"MATRÍCULA"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                      />
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"input-group input-group-aluno"}
                    >
                      <LoadingElement
                        as="input"
                        type={"email"}
                        name={"email"}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.toLowerCase();
                        }}
                        placeholder={"E-MAIL"}
                      />
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"input-group input-group-aluno"}
                    >
                      <LoadingElement
                        as="input"
                        type={"password"}
                        name={"senha"}
                        placeholder={"SENHA"}
                        required={true}
                      />
                    </LoadingElement>
                    <LoadingElement
                      as="button"
                      type={"submit"}
                      className={"btn-secondary-dash"}
                      style={styleFrom("justify-content: center;")}
                    >
                      {"ENTRAR NO SISTEMA"}
                    </LoadingElement>
                  </LoadingElement>
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
