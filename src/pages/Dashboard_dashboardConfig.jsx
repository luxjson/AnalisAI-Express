import { LoadingValue, LoadingElement } from "../components/loading-layout";
import React from "react";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { styleFrom } from "../services/ui";
export default function Dashboard_dashboardConfig({ data, handlers }) {
  const {
    user = "",
    userCargo = null,
    cargo = null,
    stats = {},
    ultimoAcesso = null,
    abaAtiva = "dados",
    email = null,
    config = {},
    success_msg = null,
    error_msg = null,
    csrfToken = null,
  } = data;
  return (
    <>
      <React.Fragment>
        <Partials_barProfessor
          data={{
            ...data,
          }}
          handlers={handlers}
        />
        <LoadingElement as="div" className={"main-layout"} root={true}>
          <PageHeader key="page-header" data={data} handlers={handlers} />
          <LoadingElement as="main" className={"dash-content"}>
            <LoadingElement as="div" className={"perfil-grid"}>
              <LoadingElement as="aside" className={"perfil-sidebar-card"}>
                <LoadingElement as="div" className={"avatar-circle"}>
                  <LoadingValue
                    slot="dashboard/dashboardConfig:1"
                    width="12ch"
                    known={true}
                    value={user.charAt(0).toUpperCase()}
                  />
                </LoadingElement>
                <LoadingElement as="div" className={"perfil-info-base"}>
                  <LoadingElement as="h2">
                    <LoadingValue
                      slot="dashboard/dashboardConfig:2"
                      width="12ch"
                      known={true}
                      value={user}
                    />
                  </LoadingElement>
                  <LoadingElement as="p">
                    <LoadingValue
                      slot="dashboard/dashboardConfig:3"
                      width="12ch"
                      known={false}
                      value={cargo}
                    />
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"perfil-stats-row"}>
                  <LoadingElement as="div" className={"stat-item"}>
                    <LoadingElement as="span">{"Tarefas"}</LoadingElement>
                    <LoadingElement as="strong">
                      <LoadingValue
                        slot="dashboard/dashboardConfig:4"
                        width="12ch"
                        known={false}
                        value={stats.tarefas || 0}
                      />
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"stat-item"}>
                    <LoadingElement as="span">{"Alunos"}</LoadingElement>
                    <LoadingElement as="strong">
                      <LoadingValue
                        slot="dashboard/dashboardConfig:5"
                        width="12ch"
                        known={false}
                        value={stats.alunos || 0}
                      />
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
                      {"Status:"}
                    </LoadingElement>
                    <LoadingElement
                      as="span"
                      className={"media-nota apto status-badge-professor"}
                    >
                      {"ATIVO"}
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
                      {"Último Acesso:"}
                    </LoadingElement>
                    <LoadingElement as="span">
                      <LoadingValue
                        slot="dashboard/dashboardConfig:6"
                        width="12ch"
                        known={false}
                        value={ultimoAcesso || "---"}
                      />
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"perfil-main"}>
                <LoadingElement
                  as="div"
                  id={"mensagemSucesso"}
                  className={"mensagem-sucesso"}
                >
                  <LoadingElement
                    as="i"
                    className={"fas fa-check-circle"}
                  ></LoadingElement>
                  {" Preferências salvas com sucesso!\n                    "}
                </LoadingElement>
                <LoadingElement as="nav" className={"tabs-container"}>
                  <LoadingElement
                    as="button"
                    className={
                      "tab-trigger " + (abaAtiva === "dados" ? "active" : "")
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
                      "tab-trigger " +
                      (abaAtiva === "notificacoes" ? "active" : "")
                    }
                    onClick={(event) => {
                      handlers.mudarAba("notificacoes");
                    }}
                    tone={true}
                  >
                    {"Notificações"}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={
                      "tab-trigger " + (abaAtiva === "senha" ? "active" : "")
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
                          slot="dashboard/dashboardConfig:7"
                          width="12ch"
                          known={true}
                          value={user}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"info-display-item"}>
                      <LoadingElement as="label">
                        {"E-mail Institucional"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"value"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-envelope"}
                        ></LoadingElement>
                        <LoadingValue
                          slot="dashboard/dashboardConfig:8"
                          width="22ch"
                          known={false}
                          value={email}
                        />
                      </LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="div" className={"info-display-item"}>
                      <LoadingElement as="label">
                        {"Cargo / Função"}
                      </LoadingElement>
                      <LoadingElement as="div" className={"value"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-briefcase"}
                        ></LoadingElement>
                        <LoadingValue
                          slot="dashboard/dashboardConfig:9"
                          width="12ch"
                          known={false}
                          value={cargo}
                        />
                      </LoadingElement>
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="div"
                  id={"abaNotificacoes"}
                  className={
                    "tab-content " +
                    (abaAtiva === "notificacoes" ? "active" : "")
                  }
                  tone={true}
                >
                  <LoadingElement as="form" id={"configForm"}>
                    <LoadingElement as="div" className={"toggle-item"}>
                      <LoadingElement as="div">
                        <LoadingElement as="h4">
                          {"Alertas de Sistema"}
                        </LoadingElement>
                        <LoadingElement as="p">
                          {"Notificações globais da plataforma"}
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        className={
                          "toggle-switch " +
                          (config.notificacoes_ativas ? "ativo" : "")
                        }
                        data-input={"notificacoes_ativas"}
                        tone={true}
                      ></LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"hidden"}
                        name={"notificacoes_ativas"}
                        id={"notificacoes_ativas"}
                        value={config.notificacoes_ativas}
                      />
                    </LoadingElement>
                    <LoadingElement as="div" className={"toggle-item"}>
                      <LoadingElement as="div">
                        <LoadingElement as="h4">
                          {"Atividades de Alunos"}
                        </LoadingElement>
                        <LoadingElement as="p">
                          {"Avisar sobre novas entregas e tarefas"}
                        </LoadingElement>
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        className={
                          "toggle-switch " +
                          (config.notificacoes_tarefas ? "ativo" : "")
                        }
                        data-input={"notificacoes_tarefas"}
                        tone={true}
                      ></LoadingElement>
                      <LoadingElement
                        as="input"
                        type={"hidden"}
                        name={"notificacoes_tarefas"}
                        id={"notificacoes_tarefas"}
                        value={config.notificacoes_tarefas}
                      />
                    </LoadingElement>
                    <LoadingElement
                      as="input"
                      type={"hidden"}
                      name={"notificacoes_avaliacoes"}
                      id={"notificacoes_avaliacoes"}
                      value={config.notificacoes_avaliacoes}
                    />
                    <LoadingElement
                      as="input"
                      type={"hidden"}
                      name={"notificacoes_competencias"}
                      id={"notificacoes_competencias"}
                      value={config.notificacoes_competencias}
                    />
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.salvarConfiguracoes();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"fas fa-save"}
                    ></LoadingElement>
                    {" SALVAR CONFIGURAÇÕES\n                        "}
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
                  {(() => {
                    const nodes = [];
                    if (success_msg && success_msg.length > 0) {
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"alert alert-success"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-check-circle"}
                          ></LoadingElement>
                          <LoadingValue
                            slot="dashboard/dashboardConfig:10"
                            width="12ch"
                            known={false}
                            value={success_msg}
                          />
                        </LoadingElement>,
                      );
                    }
                    if (error_msg && error_msg.length > 0) {
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"alert alert-error"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="i"
                            className={"fas fa-exclamation-circle"}
                          ></LoadingElement>
                          <LoadingValue
                            slot="dashboard/dashboardConfig:11"
                            width="12ch"
                            known={false}
                            value={error_msg}
                          />
                        </LoadingElement>,
                      );
                    }
                    nodes.push(
                      <LoadingElement
                        as="form"
                        className={"senha-form"}
                        action={"/dashboard/alterar-senha"}
                        method={"POST"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="input"
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <LoadingElement as="label">
                          {"SENHA ATUAL"}
                        </LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"password"}
                          name={"senha_atual"}
                          className={"form-input-premium"}
                          required={true}
                        />
                        <LoadingElement as="label">
                          {"NOVA SENHA"}
                        </LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"password"}
                          name={"nova_senha"}
                          className={"form-input-premium"}
                          required={true}
                          minLength={"12"}
                          placeholder={"Mínimo 12 caracteres"}
                        />
                        <LoadingElement as="label">
                          {"CONFIRMAR NOVA SENHA"}
                        </LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"password"}
                          name={"confirmar_senha"}
                          className={"form-input-premium"}
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
                          {" ATUALIZAR SENHA\n                            "}
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    return nodes;
                  })()}
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
    user = "",
    userCargo = null,
    cargo = null,
    stats = {},
    ultimoAcesso = null,
    abaAtiva = "dados",
    email = null,
    config = {},
    success_msg = null,
    error_msg = null,
    csrfToken = null,
  } = data;
  return (
    <LoadingElement as="header" className={"dash-header"}>
      <LoadingElement as="div" className={"header-left"}>
        <LoadingElement as="h1">
          {"\n                    Configurações\n                "}
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" className={"header-user"}>
        <LoadingElement as="div" className={"user-profile-group"}>
          <LoadingElement as="div" className={"user-details"}>
            <LoadingElement as="span" className={"user-name"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardConfig:12"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"user-role"}>
              <LoadingElement as="strong">
                <LoadingValue
                  slot="dashboard/dashboardConfig:13"
                  width="12ch"
                  known={true}
                  value={userCargo}
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
