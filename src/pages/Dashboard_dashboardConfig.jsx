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
    foto_perfil = null,
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
          <main className={"dash-content"}>
            <div className={"perfil-grid"}>
              <aside className={"perfil-sidebar-card"}>
                <div className={"avatar-circle"} style={foto_perfil ? styleFrom("overflow:hidden; padding:0;") : undefined}>
                  {foto_perfil ? (
                    <img
                      src={foto_perfil}
                      alt={"Foto de perfil"}
                      style={styleFrom("width:100%; height:100%; object-fit:cover; border-radius:inherit;")}
                    />
                  ) : (
                    <LoadingValue
                      slot="dashboard/dashboardConfig:1"
                      width="12ch"
                      known={true}
                      value={user.charAt(0).toUpperCase()}
                    />
                  )}
                </div>
                <div className={"perfil-info-base"}>
                  <h2>
                    <LoadingValue
                      slot="dashboard/dashboardConfig:2"
                      width="12ch"
                      known={true}
                      value={user}
                    />
                  </h2>
                  <p>
                    <LoadingValue
                      slot="dashboard/dashboardConfig:3"
                      width="12ch"
                      known={false}
                      value={cargo}
                    />
                  </p>
                </div>
                <div className={"perfil-stats-row"}>
                  <div className={"stat-item"}>
                    <span>{"Tarefas"}</span>
                    <strong>
                      <LoadingValue
                        slot="dashboard/dashboardConfig:4"
                        width="12ch"
                        known={false}
                        value={stats.tarefas || 0}
                      />
                    </strong>
                  </div>
                  <div className={"stat-item"}>
                    <span>{"Alunos"}</span>
                    <strong>
                      <LoadingValue
                        slot="dashboard/dashboardConfig:5"
                        width="12ch"
                        known={false}
                        value={stats.alunos || 0}
                      />
                    </strong>
                  </div>
                </div>
                <div style={styleFrom("text-align: left; padding: 0 10px;")}>
                  <div
                    style={styleFrom(
                      "display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 10px;",
                    )}
                  >
                    <span style={styleFrom("color: var(--text-gray);")}>
                      {"Status:"}
                    </span>
                    <span className={"media-nota apto status-badge-professor"}>
                      {"ATIVO"}
                    </span>
                  </div>
                  <div
                    style={styleFrom(
                      "display: flex; justify-content: space-between; font-size: 0.85rem;",
                    )}
                  >
                    <span style={styleFrom("color: var(--text-gray);")}>
                      {"Último Acesso:"}
                    </span>
                    <span>
                      <LoadingValue
                        slot="dashboard/dashboardConfig:6"
                        width="12ch"
                        known={false}
                        value={ultimoAcesso || "---"}
                      />
                    </span>
                  </div>
                </div>
              </aside>
              <div className={"perfil-main"}>
                <div id={"mensagemSucesso"} className={"mensagem-sucesso"}>
                  <i className={"fas fa-check-circle"}></i>
                  {" Preferências salvas com sucesso!\n                    "}
                </div>
                <nav className={"tabs-container"}>
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
                </nav>
                <LoadingElement
                  as="div"
                  id={"abaDados"}
                  className={
                    "tab-content " + (abaAtiva === "dados" ? "active" : "")
                  }
                  tone={true}
                >
                  <div className={"info-grid"}>
                    <div className={"info-display-item"}>
                      <label>{"Nome Completo"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-user"}></i>
                        <LoadingValue
                          slot="dashboard/dashboardConfig:7"
                          width="12ch"
                          known={true}
                          value={user}
                        />
                      </div>
                    </div>
                    <div className={"info-display-item"}>
                      <label>{"E-mail Institucional"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-envelope"}></i>
                        <LoadingValue
                          slot="dashboard/dashboardConfig:8"
                          width="22ch"
                          known={false}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className={"info-display-item"}>
                      <label>{"Cargo / Função"}</label>
                      <div className={"value"}>
                        <i className={"fas fa-briefcase"}></i>
                        <LoadingValue
                          slot="dashboard/dashboardConfig:9"
                          width="12ch"
                          known={false}
                          value={cargo}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={styleFrom("margin-top:20px;")}>
                    <a href={"/dashboard/configuracao-inicial"} className={"btn-secondary-dash"}>
                      <i className={"fas fa-user-edit"} aria-hidden={"true"}></i>
                      {" EDITAR PERFIL, FOTO E TURMAS"}
                    </a>
                  </div>
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
                  <form id={"configForm"}>
                    <div className={"toggle-item"}>
                      <div>
                        <h4>{"Alertas de Sistema"}</h4>
                        <p>{"Notificações globais da plataforma"}</p>
                      </div>
                      <LoadingElement
                        as="div"
                        className={
                          "toggle-switch " +
                          (config.notificacoes_ativas ? "ativo" : "")
                        }
                        data-input={"notificacoes_ativas"}
                        tone={true}
                      ></LoadingElement>
                      <input
                        type={"hidden"}
                        name={"notificacoes_ativas"}
                        id={"notificacoes_ativas"}
                        value={config.notificacoes_ativas}
                      />
                    </div>
                    <div className={"toggle-item"}>
                      <div>
                        <h4>{"Atividades de Alunos"}</h4>
                        <p>{"Avisar sobre novas entregas e tarefas"}</p>
                      </div>
                      <LoadingElement
                        as="div"
                        className={
                          "toggle-switch " +
                          (config.notificacoes_tarefas ? "ativo" : "")
                        }
                        data-input={"notificacoes_tarefas"}
                        tone={true}
                      ></LoadingElement>
                      <input
                        type={"hidden"}
                        name={"notificacoes_tarefas"}
                        id={"notificacoes_tarefas"}
                        value={config.notificacoes_tarefas}
                      />
                    </div>
                    <input
                      type={"hidden"}
                      name={"notificacoes_avaliacoes"}
                      id={"notificacoes_avaliacoes"}
                      value={config.notificacoes_avaliacoes}
                    />
                    <input
                      type={"hidden"}
                      name={"notificacoes_competencias"}
                      id={"notificacoes_competencias"}
                      value={config.notificacoes_competencias}
                    />
                  </form>
                  <button
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.salvarConfiguracoes();
                    }}
                  >
                    <i className={"fas fa-save"}></i>
                    {" SALVAR CONFIGURAÇÕES\n                        "}
                  </button>
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
                        <div
                          className={"alert alert-success"}
                          key={nodes.length}
                        >
                          <i className={"fas fa-check-circle"}></i>
                          <LoadingValue
                            slot="dashboard/dashboardConfig:10"
                            width="12ch"
                            known={false}
                            value={success_msg}
                          />
                        </div>,
                      );
                    }
                    if (error_msg && error_msg.length > 0) {
                      nodes.push(
                        <div className={"alert alert-error"} key={nodes.length}>
                          <i className={"fas fa-exclamation-circle"}></i>
                          <LoadingValue
                            slot="dashboard/dashboardConfig:11"
                            width="12ch"
                            known={false}
                            value={error_msg}
                          />
                        </div>,
                      );
                    }
                    nodes.push(
                      <form
                        className={"senha-form"}
                        action={"/dashboard/alterar-senha"}
                        method={"POST"}
                        key={nodes.length}
                      >
                        <input
                          type={"hidden"}
                          name={"_csrf"}
                          value={csrfToken}
                        />
                        <label>{"SENHA ATUAL"}</label>
                        <input
                          type={"password"}
                          name={"senha_atual"}
                          className={"form-input-premium"}
                          required={true}
                        />
                        <label>{"NOVA SENHA"}</label>
                        <input
                          type={"password"}
                          name={"nova_senha"}
                          className={"form-input-premium"}
                          required={true}
                          minLength={"12"}
                          placeholder={"Mínimo 12 caracteres"}
                        />
                        <label>{"CONFIRMAR NOVA SENHA"}</label>
                        <input
                          type={"password"}
                          name={"confirmar_senha"}
                          className={"form-input-premium"}
                          required={true}
                        />
                        <button
                          type={"submit"}
                          className={"btn-secondary-dash"}
                        >
                          <i className={"fas fa-key"}></i>
                          {" ATUALIZAR SENHA\n                            "}
                        </button>
                      </form>,
                    );
                    return nodes;
                  })()}
                </LoadingElement>
              </div>
            </div>
          </main>
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
    <header className={"dash-header"}>
      <div className={"header-left"}>
        <h1>{"\n                    Configurações\n                "}</h1>
      </div>
      <div className={"header-user"}>
        <div className={"user-profile-group"}>
          <div className={"user-details"}>
            <span className={"user-name"}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardConfig:12"
                  width="12ch"
                  known={true}
                  value={user}
                />
              </strong>
            </span>
            <span className={"user-role"}>
              <strong>
                <LoadingValue
                  slot="dashboard/dashboardConfig:13"
                  width="12ch"
                  known={true}
                  value={userCargo}
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
