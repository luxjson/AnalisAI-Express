import { LoadingElement } from "./loading-layout";
import React, { useContext } from "react";
import { PersistentSidebarContext } from "./layout-context";
import { styleFrom } from "../services/ui";
export default function Partials_barAluno({ data, handlers }) {
  const persistent = useContext(PersistentSidebarContext);
  if (persistent) return null;
  const {
    csrfToken = null,
    aluno = {
      nome: "",
      ano_escolar: "",
    },
    success_msg = null,
    error_msg = null,
  } = data;
  return (
    <>
      <button
        className={"mobile-menu-toggle"}
        type={"button"}
        aria-label={"Abrir menu"}
        aria-expanded={"false"}
      >
        <i className={"fas fa-bars"}></i>
      </button>
      <div className={"mobile-menu-backdrop"} data-close-mobile-menu={""}></div>
      <LoadingElement as="aside" className={"sidebar"} root={true}>
        <div className={"sidebar-top"}>
          <div className={"logo-container"}>
            <img
              src={"/images/side-bar-logo.png"}
              alt={"S"}
              className={"sideBarLogo"}
            />
          </div>
          <div className={"divider"}></div>
          <a
            href={"/aluno"}
            data-sidebar-id={"dashboard"}
            className={"side-link"}
          >
            <div className={"icon-box"}>
              <i className={"fas fa-home"}></i>
            </div>
            <span className={"link-text"}>{"Início"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a
            href={"/aluno/competencias"}
            data-sidebar-id={"competencies"}
            className={"side-link"}
          >
            <div className={"icon-box"}>
              <i className={"ph-bold ph-medal"} aria-hidden={"true"}></i>
            </div>
            <span className={"link-text"}>{"Competências"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a
            href={"/aluno/tarefas"}
            data-sidebar-id={"tasks"}
            className={"side-link"}
          >
            <div className={"icon-box"}>
              <i className={"ph-bold ph-check-square"} aria-hidden={"true"}></i>
            </div>
            <span className={"link-text"}>{"Tarefas"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a
            href={"/aluno/evolucao"}
            data-sidebar-id={"evolution"}
            className={"side-link"}
          >
            <div className={"icon-box"}>
              <i className={"fas fa-chart-line"}></i>
            </div>
            <span className={"link-text"}>{"Evolução"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <a href={"/aluno/ia"} data-sidebar-id={"ai"} className={"side-link"}>
            <div className={"icon-box"}>
              <i className={"ph-bold ph-sparkle"} aria-hidden={"true"}></i>
            </div>
            <span className={"link-text"}>{"Agente"}</span>
            <div className={"active-indicator"}></div>
          </a>
        </div>
        <div className={"sidebar-bottom"}>
          <a
            href={"#"}
            className={"side-link settings-link"}
            data-settings-modal={""}
          >
            <div className={"icon-box"}>
              <i className={"fas fa-cog"}></i>
            </div>
            <span className={"link-text"}>{"Ajustes"}</span>
            <div className={"active-indicator"}></div>
          </a>
          <form action={"/logout"} method={"POST"} className={"logout-form"}>
            <input
              type={"hidden"}
              name={"_csrf"}
              value={typeof csrfToken !== "undefined" ? csrfToken : ""}
            />
            <button type={"submit"} className={"side-link exit-link"}>
              <div className={"icon-box"}>
                <i className={"fas fa-sign-out-alt"}></i>
              </div>
              <span className={"link-text"}>{"Sair"}</span>
            </button>
          </form>
        </div>
        <div
          id={"settingsModal"}
          className={"settings-modal"}
          aria-hidden={"true"}
        >
          <div
            className={"settings-modal-card"}
            role={"dialog"}
            aria-modal={"true"}
            aria-labelledby={"settingsModalTitle"}
          >
            <aside className={"settings-modal-nav"}>
              <label className={"settings-search"}>
                <i className={"ph ph-magnifying-glass"}></i>
                <input
                  type={"search"}
                  data-settings-search={""}
                  placeholder={"Procurar"}
                  aria-label={"Pesquisar configurações"}
                />
              </label>
              <span className={"settings-nav-label"}>{"Configurações"}</span>
              <button
                className={"settings-nav-item active"}
                data-settings-section={"general"}
              >
                <i className={"ph ph-user"}></i>
                {" Geral"}
              </button>
              <button
                className={"settings-nav-item"}
                data-settings-section={"account"}
              >
                <i className={"ph ph-identification-card"}></i>
                {" Conta"}
              </button>
              <button
                className={"settings-nav-item"}
                data-settings-section={"privacy"}
              >
                <i className={"ph ph-shield-check"}></i>
                {" Privacidade"}
              </button>
              <button
                className={"settings-nav-item"}
                data-settings-section={"notifications"}
              >
                <i className={"ph ph-bell"}></i>
                {" Notificações"}
              </button>
            </aside>
            <section className={"settings-modal-content"}>
              <button
                type={"button"}
                className={"settings-modal-close"}
                data-close-settings={""}
                aria-label={"Fechar"}
              >
                <i className={"ph ph-x"}></i>
              </button>
              <div
                className={"settings-section active"}
                data-settings-panel={"general"}
              >
                <h2 id={"settingsModalTitle"}>{"Perfil"}</h2>
                <div className={"settings-avatar-row"}>
                  <strong>{"Avatar"}</strong>
                  <span className={"settings-avatar"} data-account={"initial"}>
                    {aluno.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={"settings-field"}>
                  <label>{"Nome completo"}</label>
                  <span data-account={"name"}>{aluno.nome}</span>
                </div>
                <div className={"settings-field"}>
                  <label>{"Turma / ano"}</label>
                  <span data-account={"class"}>{aluno.ano_escolar}</span>
                </div>
                <div className={"settings-field"}>
                  <label>{"Matrícula"}</label>
                  <span data-account={"registration"}>
                    {typeof aluno.matricula !== "undefined"
                      ? aluno.matricula
                      : "Carregando..."}
                  </span>
                </div>
                <div className={"settings-field"}>
                  <label>{"E-mail"}</label>
                  <span data-account={"email"}>{"Carregando..."}</span>
                </div>
                <div className={"settings-field"}>
                  <label>{"Idade"}</label>
                  <span data-account={"age"}>{"—"}</span>
                </div>
                <div className={"settings-account-summary"}>
                  <div className={"settings-account-stat"}>
                    <span>{"Avaliações"}</span>
                    <strong data-account={"assessments"}>{"—"}</strong>
                  </div>
                  <div className={"settings-account-stat"}>
                    <span>{"Presença"}</span>
                    <strong data-account={"attendance"}>{"—"}</strong>
                  </div>
                  <div className={"settings-account-stat"}>
                    <span>{"Status da conta"}</span>
                    <strong data-account={"status"}>{"—"}</strong>
                  </div>
                  <div className={"settings-account-stat"}>
                    <span>{"Cadastro"}</span>
                    <strong data-account={"created"}>{"—"}</strong>
                  </div>
                  <div className={"settings-account-stat"}>
                    <span>{"Último acesso"}</span>
                    <strong data-account={"lastAccess"}>{"—"}</strong>
                  </div>
                </div>
              </div>
              <div
                className={"settings-section"}
                data-settings-panel={"account"}
              >
                {(() => {
                  const nodes = [];
                  nodes.push(<h2 key={nodes.length}>{"Conta e segurança"}</h2>);
                  if (typeof success_msg !== "undefined" && success_msg) {
                    nodes.push(
                      <p
                        className={"settings-feedback is-success"}
                        key={nodes.length}
                      >
                        {success_msg}
                      </p>,
                    );
                  }
                  if (typeof error_msg !== "undefined" && error_msg) {
                    nodes.push(
                      <p
                        className={"settings-feedback is-error"}
                        key={nodes.length}
                      >
                        {error_msg}
                      </p>,
                    );
                  }
                  nodes.push(
                    <p className={"settings-help"} key={nodes.length}>
                      {"Altere sua senha sem sair do painel atual."}
                    </p>,
                  );
                  nodes.push(
                    <form
                      className={"settings-password-form"}
                      action={"/aluno/alterar-senha"}
                      method={"POST"}
                      key={nodes.length}
                    >
                      <input
                        type={"hidden"}
                        name={"_csrf"}
                        value={
                          typeof csrfToken !== "undefined" ? csrfToken : ""
                        }
                      />
                      <label>{"Senha atual"}</label>
                      <input
                        type={"password"}
                        name={"senha_atual"}
                        required={true}
                        autoComplete={"current-password"}
                      />
                      <label>{"Nova senha"}</label>
                      <input
                        type={"password"}
                        name={"nova_senha"}
                        required={true}
                        minLength={"12"}
                        autoComplete={"new-password"}
                      />
                      <label>{"Confirmar nova senha"}</label>
                      <input
                        type={"password"}
                        name={"confirmar_senha"}
                        required={true}
                        autoComplete={"new-password"}
                      />
                      <button className={"settings-save"} type={"submit"}>
                        {"Atualizar senha"}
                      </button>
                    </form>,
                  );
                  return nodes;
                })()}
              </div>
              <div
                className={"settings-section"}
                data-settings-panel={"privacy"}
              >
                <h2>{"Privacidade"}</h2>
                <p className={"settings-help"}>
                  {
                    "Sua sessão é protegida por autenticação e token CSRF. Nunca compartilhe sua senha. Os dados exibidos neste painel são privados da sua conta."
                  }
                </p>
              </div>
              <div
                className={"settings-section"}
                data-settings-panel={"notifications"}
              >
                <h2>{"Notificações"}</h2>
                <div className={"settings-field"}>
                  <label>{"Notificações gerais"}</label>
                  <button
                    className={"settings-switch"}
                    data-notification={"notificacoes_ativas"}
                    type={"button"}
                  ></button>
                </div>
                <div className={"settings-field"}>
                  <label>{"Notificações por e-mail"}</label>
                  <button
                    className={"settings-switch"}
                    data-notification={"notificacoes_email"}
                    type={"button"}
                  ></button>
                </div>
                <div className={"settings-field"}>
                  <label>{"Tarefas"}</label>
                  <button
                    className={"settings-switch"}
                    data-notification={"notificacoes_tarefas"}
                    type={"button"}
                  ></button>
                </div>
                <div className={"settings-field"}>
                  <label>{"Avaliações"}</label>
                  <button
                    className={"settings-switch"}
                    data-notification={"notificacoes_avaliacoes"}
                    type={"button"}
                  ></button>
                </div>
                <div className={"settings-field"}>
                  <label>{"Competências"}</label>
                  <button
                    className={"settings-switch"}
                    data-notification={"notificacoes_competencias"}
                    type={"button"}
                  ></button>
                </div>
                <button
                  className={"settings-save"}
                  data-save-notifications={""}
                  type={"button"}
                >
                  {"Salvar notificações"}
                </button>
                <span
                  className={"settings-feedback"}
                  data-settings-feedback={""}
                ></span>
              </div>
            </section>
          </div>
        </div>
      </LoadingElement>
      <div id={"infoModal"} className={"modal-new-overlay"}>
        <div className={"modal-new-card"}>
          <button
            className={"modal-new-close"}
            onClick={(event) => {
              handlers.closeModal();
            }}
          >
            <i className={"fas fa-times"}></i>
          </button>
          <div
            className={"modal-new-header"}
            style={styleFrom(
              "justify-content: center;align-items: center;display: flex;flex-direction: column;",
            )}
          >
            <img
              src={"/images/logo3-green.png"}
              alt={"AnalisAI"}
              className={"modal-new-logo"}
            />
            <div
              className={"version-badge"}
              style={styleFrom(
                "background: rgba(33, 115, 70, 0.1); color: #217346;",
              )}
            >
              {"Versão Aluno 1.0.4"}
            </div>
          </div>
          <div className={"modal-new-body"}>
            <p className={"modal-new-text"}>
              {[
                "\n                Área exclusiva para estudantes. Acompanhe seu ",
                "desempenho, visualize suas competências \n                e ",
                "monitore sua evolução acadêmica em tempo real através de dados ",
                "integrados.\n            ",
              ].join("")}
            </p>
            <div className={"modal-new-divider"}></div>
            <div className={"modal-new-info-grid"}>
              <div className={"info-item"}>
                <span>{"Portal"}</span>
                <p>{"Estudante"}</p>
              </div>
              <div className={"info-item"}>
                <span>{"Status"}</span>
                <p>{"Sincronizado"}</p>
              </div>
            </div>
          </div>
          <div className={"modal-new-footer"}>
            <p>{"© 2026 AnalisAI • Senai CIC"}</p>
            <a href={"/aluno/equipe"} className={"modal-link"}>
              {"Time de desenvolvimento"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
