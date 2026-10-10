import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_barAluno from "../components/Partials_barAluno.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Aluno_alunoPerfil({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    competencias = [],
    abaAtiva = "dados",
    csrfToken = null,
  } = data;
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
          <LoadingElement as="main" className={"dash-content"}>
            <LoadingElement as="section" className={"welcome-banner"}>
              <LoadingElement as="div" className={"banner-text"}>
                <LoadingElement as="h1">
                  {"Configurações do Estudante"}
                </LoadingElement>
                <LoadingElement as="p">
                  {"Gerencie seus dados e preferências de alertas do sistema."}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="div" className={"perfil-grid"}>
              <LoadingElement as="aside" className={"perfil-sidebar-card"}>
                <LoadingElement as="div" className={"avatar-circle"}>
                  <LoadingValue
                    slot="aluno/alunoPerfil:1"
                    width="min(18ch, 100%)"
                    known={true}
                    value={aluno.nome.charAt(0).toUpperCase()}
                  />
                </LoadingElement>
                <LoadingElement as="div" className={"perfil-info-base"}>
                  <LoadingElement as="h2">
                    <LoadingValue
                      slot="aluno/alunoPerfil:2"
                      width="min(18ch, 100%)"
                      known={true}
                      value={aluno.nome}
                    />
                  </LoadingElement>
                  <LoadingElement as="p">
                    <LoadingValue
                      slot="aluno/alunoPerfil:3"
                      width="12ch"
                      known={true}
                      value={aluno.ano_escolar}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"perfil-stats-row"}>
                  <LoadingElement as="div" className={"stat-item"}>
                    <LoadingElement as="span">{"Avaliações"}</LoadingElement>
                    <LoadingElement as="strong">
                      <LoadingValue
                        slot="aluno/alunoPerfil:4"
                        width="12ch"
                        known={false}
                        value={competencias.length}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"stat-item"}>
                    <LoadingElement as="span">{"Presença"}</LoadingElement>
                    <LoadingElement as="strong">
                      <LoadingValue
                        slot="aluno/alunoPerfil:5"
                        width="3ch"
                        known={false}
                        value={aluno.presenca}
                      />
                      {"%"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="div"
                  style={styleFrom("text-align: left; padding: 0 10px;")}
                >
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 10px;",
                    )}
                  >
                    <LoadingElement
                      as="span"
                      style={styleFrom("color: var(--text-gray);")}
                    >
                      {"Matrícula:"}
                    </LoadingElement>
                    <LoadingElement
                      as="span"
                      style={styleFrom("color: white;")}
                    >
                      <LoadingValue
                        slot="aluno/alunoPerfil:6"
                        width="12ch"
                        known={false}
                        value={aluno.matricula}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="div"
                    style={styleFrom(
                      "display: flex; justify-content: space-between; font-size: 0.85rem;",
                    )}
                  >
                    <LoadingElement
                      as="span"
                      style={styleFrom("color: var(--text-gray);")}
                    >
                      {"Conta:"}
                    </LoadingElement>
                    <LoadingElement
                      as="span"
                      className={"media-nota apto"}
                      style={styleFrom("font-size: 0.6rem; padding: 2px 10px;")}
                    >
                      {"ATIVO"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"perfil-main"}>
                <LoadingElement as="nav" className={"tabs-nav"}>
                  <LoadingElement
                    as="button"
                    className={
                      "tab-btn " + (abaAtiva === "dados" ? "active" : "")
                    }
                    onClick={(event) => {
                      handlers.mudarAba("dados");
                    }}
                    tone={true}
                  >
                    {"Meus Dados"}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={
                      "tab-btn " + (abaAtiva === "senha" ? "active" : "")
                    }
                    onClick={(event) => {
                      handlers.mudarAba("senha");
                    }}
                    tone={true}
                  >
                    {"Segurança"}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="div"
                  id={"abaDados"}
                  className={
                    "tab-content " + (abaAtiva === "dados" ? "active" : "")
                  }
                  tone={true}
                >
                  <LoadingElement as="div" className={"info-grid"}>
                    <LoadingElement as="div" className={"info-display-item"}>
                      <LoadingElement as="label">
                        {"Nome Completo"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"value"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-user"}
                        ></LoadingElement>
                        <LoadingValue
                          slot="aluno/alunoPerfil:7"
                          width="min(18ch, 100%)"
                          known={true}
                          value={aluno.nome}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"info-display-item"}>
                      <LoadingElement as="label">
                        {"Turma / Ano"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"value"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-graduation-cap"}
                        ></LoadingElement>
                        <LoadingValue
                          slot="aluno/alunoPerfil:8"
                          width="12ch"
                          known={true}
                          value={aluno.ano_escolar}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"info-display-item"}>
                      <LoadingElement as="label">{"Idade"}</LoadingElement>
                      <LoadingElement as="div" className={"value"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-calendar-day"}
                        ></LoadingElement>
                        <LoadingValue
                          slot="aluno/alunoPerfil:9"
                          width="3ch"
                          known={false}
                          value={aluno.idade}
                        />
                        {" anos"}
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="div"
                  id={"abaSenha"}
                  className={
                    "tab-content " + (abaAtiva === "senha" ? "active" : "")
                  }
                  tone={true}
                >
                  <LoadingElement
                    as="form"
                    action={"/aluno/alterar-senha?aba=senha"}
                    method={"POST"}
                  >
                    <LoadingElement
                      as="input"
                      type={"hidden"}
                      name={"_csrf"}
                      value={csrfToken}
                    />
                    <LoadingElement as="label">{"SENHA ATUAL"}</LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"password"}
                      name={"senha_atual"}
                      className={"filter-input"}
                      required={true}
                    />
                    <LoadingElement as="label">{"NOVA SENHA"}</LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"password"}
                      name={"nova_senha"}
                      className={"filter-input"}
                      required={true}
                      minLength={"12"}
                    />
                    <LoadingElement as="label">
                      {"CONFIRMAR NOVA SENHA"}
                    </LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"password"}
                      name={"confirmar_senha"}
                      className={"filter-input"}
                      required={true}
                    />
                    <LoadingElement
                      as="button"
                      type={"submit"}
                      className={"btn-secondary-dash"}
                    >
                      <LoadingElement
                        as="i"
                        className={"fas fa-key"}
                      ></LoadingElement>
                      {" Atualizar Senha"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </React.Fragment>
    </>
  );
}
export function PageHeader({ data, handlers }) {
  const {
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    competencias = [],
    abaAtiva = "dados",
    csrfToken = null,
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="div" className={"logo"}>
          <LoadingElement
            as="img"
            src={"/images/logo3-green.png"}
            alt={"AnalisAI"}
            style={styleFrom("height: 40px;")}
          />
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement
            as="div"
            className={"user-details"}
            style={styleFrom("text-align: right; padding-right: 15px;")}
          >
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="aluno/alunoPerfil:10"
                  width="min(18ch, 100%)"
                  known={true}
                  value={aluno.nome}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"user-email"}>
              <LoadingValue
                slot="aluno/alunoPerfil:11"
                width="12ch"
                known={true}
                value={aluno.ano_escolar}
              />
            </LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="div"
            className={"user-avatar"}
            style={styleFrom(
              "background: var(--student-green); width: 45px; height: 45px; font-size: 1.2rem;",
            )}
          >
            <LoadingValue
              slot="aluno/alunoPerfil:12"
              width="min(18ch, 100%)"
              known={true}
              value={aluno.nome.charAt(0).toUpperCase()}
            />
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
