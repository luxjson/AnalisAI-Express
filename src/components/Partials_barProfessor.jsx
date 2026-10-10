import React, { useContext } from "react";
import { PersistentSidebarContext } from "./layout-context";
import { styleFrom, safeJson } from "../services/ui";
export default function Partials_barProfessor({ data, handlers }) {
  const persistent = useContext(PersistentSidebarContext);
  if (persistent) return null;
  const {
    userCargo = null,
    csrfToken = null,
    user = "",
    email = null,
    cargo = null,
  } = data;

  return (
    <>
      {(() => {
        const nodes = [];
        nodes.push(
          <button
            key={nodes.length}
            className={"mobile-menu-toggle"}
            type={"button"}
            aria-label={"Abrir menu"}
            aria-expanded={"false"}
          >
            <i className={"fas fa-bars"}></i>
          </button>,
        );
        nodes.push(
          <div
            key={nodes.length}
            className={"mobile-menu-backdrop"}
            data-close-mobile-menu={""}
          ></div>,
        );
        nodes.push(
          <aside key={nodes.length} className={"sidebar"}>
            <div className={"sidebar-top"}>
              {(() => {
                const nodes = [];
                nodes.push(
                  <div className={"logo-container"} key={nodes.length}>
                    <img
                      src={"/images/side-bar-logo.png"}
                      alt={"S"}
                      className={"sideBarLogo"}
                    />
                  </div>,
                );
                nodes.push(
                  <div className={"divider"} key={nodes.length}></div>,
                );
                nodes.push(
                  <a
                    href={"/dashboard"}
                    data-sidebar-id={"dashboard"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i className={"fas fa-home"}></i>
                    </div>
                    <span className={"link-text"}>{"Início"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                nodes.push(
                  <a
                    href={"/dashboard/edit"}
                    data-sidebar-id={"edit"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i className={"fas fa-pen"}></i>
                    </div>
                    <span className={"link-text"}>{"Editor"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                nodes.push(
                  <a
                    href={"/dashboard/tarefas"}
                    data-sidebar-id={"tasks"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i className={"fas fa-tasks"}></i>
                    </div>
                    <span className={"link-text"}>{"Tarefas"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                nodes.push(
                  <a
                    href={"/dashboard/graficos"}
                    data-sidebar-id={"reports"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i className={"fas fa-chart-bar"}></i>
                    </div>
                    <span className={"link-text"}>{"Relatórios"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                nodes.push(
                  <a
                    href={"/dashboard/calendario"}
                    data-sidebar-id={"calendar"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i className={"fas fa-calendar"}></i>
                    </div>
                    <span className={"link-text"}>{"Calendário"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                nodes.push(
                  <a
                    href={"/dashboard/ia"}
                    data-sidebar-id={"ai"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <div className={"icon-box"}>
                      <i
                        className={"ph-bold ph-sparkle"}
                        aria-hidden={"true"}
                      ></i>
                    </div>
                    <span className={"link-text"}>{"Agente"}</span>
                    <div className={"active-indicator"}></div>
                  </a>,
                );
                if (userCargo === "Admin") {
                  nodes.push(
                    <a
                      href={"/dashboard/usuarios"}
                      data-sidebar-id={"users"}
                      className={"side-link"}
                      key={nodes.length}
                    >
                      <div className={"icon-box"}>
                        <i className={"fas fa-users"}></i>
                      </div>
                      <span className={"link-text"}>{"Usuários"}</span>
                      <div className={"active-indicator"}></div>
                    </a>,
                  );
                }
                return nodes;
              })()}
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
              <form
                action={"/logout"}
                method={"POST"}
                className={"logout-form"}
              >
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
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <label className={"settings-search"} key={nodes.length}>
                        <i className={"ph-bold ph-magnifying-glass"}></i>
                        <input
                          type={"search"}
                          data-settings-search={""}
                          placeholder={"Procurar"}
                          aria-label={"Pesquisar configurações"}
                        />
                      </label>,
                    );
                    nodes.push(
                      <span className={"settings-nav-label"} key={nodes.length}>
                        {"Configurações"}
                      </span>,
                    );
                    nodes.push(
                      <button
                        className={"settings-nav-item active"}
                        data-settings-section={"general"}
                        key={nodes.length}
                      >
                        <i className={"ph-bold ph-user-circle"}></i>
                        {" Geral"}
                      </button>,
                    );
                    nodes.push(
                      <button
                        className={"settings-nav-item"}
                        data-settings-section={"account"}
                        key={nodes.length}
                      >
                        <i className={"ph-bold ph-identification-card"}></i>
                        {" Conta"}
                      </button>,
                    );
                    nodes.push(
                      <button
                        className={"settings-nav-item"}
                        data-settings-section={"privacy"}
                        key={nodes.length}
                      >
                        <i className={"ph-bold ph-shield-check"}></i>
                        {" Privacidade"}
                      </button>,
                    );
                    nodes.push(
                      <button
                        className={"settings-nav-item"}
                        data-settings-section={"notifications"}
                        key={nodes.length}
                      >
                        <i className={"ph-bold ph-bell"}></i>
                        {" Notificações"}
                      </button>,
                    );
                    if (userCargo === "Admin") {
                      nodes.push(
                        <span
                          className={"settings-nav-label"}
                          key={nodes.length}
                        >
                          {"Administração"}
                        </span>,
                      );
                      nodes.push(
                        <button
                          className={"settings-nav-item"}
                          data-settings-section={"checkup"}
                          key={nodes.length}
                        >
                          <i className={"ph-bold ph-heartbeat"}></i>
                          {" Checkup do Sistema"}
                        </button>,
                      );
                    }
                    return nodes;
                  })()}
                </aside>
                <section className={"settings-modal-content"}>
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <button
                        type={"button"}
                        className={"settings-modal-close"}
                        data-close-settings={""}
                        aria-label={"Fechar"}
                        key={nodes.length}
                      >
                        <i className={"ph-bold ph-x"}></i>
                      </button>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section active"}
                        data-settings-panel={"general"}
                        key={nodes.length}
                      >
                        <h2 id={"settingsModalTitle"}>{"Perfil"}</h2>
                        <div className={"settings-avatar-row"}>
                          <strong>{"Avatar"}</strong>
                          <span className={"settings-avatar"}>
                            {user.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className={"settings-field"}>
                          <label>{"Nome completo"}</label>
                          <span>{user}</span>
                        </div>
                        <div className={"settings-field"}>
                          <label>{"E-mail institucional"}</label>
                          <span>
                            {typeof email !== "undefined"
                              ? email
                              : "Não informado"}
                          </span>
                        </div>
                        <div className={"settings-field"}>
                          <label>{"Função"}</label>
                          <span>
                            {typeof cargo !== "undefined"
                              ? cargo
                              : typeof userCargo !== "undefined"
                                ? userCargo
                                : "Professor"}
                          </span>
                        </div>
                      </div>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section"}
                        data-settings-panel={"account"}
                        key={nodes.length}
                      >
                        <h2>{"Conta"}</h2>
                        <p className={"settings-help"}>
                          {"Altere sua senha diretamente por este painel."}
                        </p>
                        <form
                          className={"settings-password-form"}
                          action={"/dashboard/alterar-senha"}
                          method={"POST"}
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
                        </form>
                      </div>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section"}
                        data-settings-panel={"privacy"}
                        key={nodes.length}
                      >
                        <h2>{"Privacidade"}</h2>
                        <p className={"settings-help"}>
                          {
                            "Sua sessão é protegida por autenticação e token CSRF. Nunca compartilhe sua senha. Os dados exibidos neste painel são privados da sua conta."
                          }
                        </p>
                      </div>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section"}
                        data-settings-panel={"notifications"}
                        key={nodes.length}
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
                          <label>{"Atividades de alunos"}</label>
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
                      </div>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section"}
                        data-settings-panel={"appearance"}
                        key={nodes.length}
                      >
                        <h2>{"Aparência"}</h2>
                        <div className={"settings-field settings-choice"}>
                          <label>{"Tema da interface"}</label>
                          <span className={"settings-theme-options"}>
                            <button type={"button"} data-theme={"dark"}>
                              <i className={"ph-bold ph-moon"}></i>
                              {" Escuro"}
                            </button>
                            <button type={"button"} data-theme={"light"}>
                              <i className={"ph-bold ph-sun"}></i>
                              {" Claro"}
                            </button>
                          </span>
                        </div>
                      </div>,
                    );
                    nodes.push(
                      <div
                        className={"settings-section"}
                        data-settings-panel={"preferences"}
                        key={nodes.length}
                      >
                        <h2>{"Preferências"}</h2>
                        <div className={"settings-field"}>
                          <label>{"Reduzir animações"}</label>
                          <button
                            className={"settings-switch"}
                            data-preference={"reduced-motion"}
                            type={"button"}
                          ></button>
                        </div>
                      </div>,
                    );
                    if (userCargo === "Admin") {
                      nodes.push(
                        <div
                          className={"settings-section"}
                          data-settings-panel={"checkup"}
                          key={nodes.length}
                        >
                          <div
                            id={"checkupAuthContainer"}
                            className={"checkup-step"}
                          >
                            <h2>{"Checkup do Sistema"}</h2>
                            <p className={"settings-help"}>
                              {
                                "Acesso exclusivo para administradores. Digite a senha administrativa de segurança para desbloquear o diagnóstico do banco de dados."
                              }
                            </p>
                            <div
                              id={"checkupAuthError"}
                              className={"checkup-alert-error"}
                              style={styleFrom("display: none;")}
                            >
                              <i className={"ph-bold ph-warning-circle"}></i>
                              <span id={"checkupAuthErrorMsg"}>
                                {"Senha incorreta."}
                              </span>
                            </div>
                            <form
                              id={"checkupAuthForm"}
                              className={"settings-password-form"}
                              onSubmit={(event) => {
                                event.preventDefault();
                                handlers.submitCheckupPassword();
                              }}
                            >
                              <label htmlFor={"checkupPasswordInput"}>
                                {"Senha administrativa"}
                              </label>
                              <input
                                type={"password"}
                                id={"checkupPasswordInput"}
                                placeholder={"Digite a senha administrativa"}
                                required={true}
                                autoComplete={"current-password"}
                              />
                              <button
                                className={"settings-save"}
                                type={"submit"}
                                id={"btnUnlockCheckup"}
                              >
                                <i className={"ph-bold ph-lock-key-open"}></i>
                                {
                                  " Desbloquear Diagnóstico\n                            "
                                }
                              </button>
                            </form>
                          </div>
                          <div
                            id={"checkupDashboardContainer"}
                            className={"checkup-step"}
                            style={styleFrom("display: none;")}
                          >
                            <div className={"checkup-header"}>
                              <div>
                                <h2>{"Integridade do Banco de Dados"}</h2>
                                <p className={"settings-help"}>
                                  {
                                    "Varredura profunda tabela a tabela em busca de anomalias, órfãos e dados corrompidos."
                                  }
                                </p>
                              </div>
                              <div className={"checkup-top-actions"}>
                                <button
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.refreshCheckup();
                                  }}
                                  id={"btnScanAgain"}
                                  title={"Escanear Novamente"}
                                >
                                  <i
                                    className={"ph-bold ph-arrows-clockwise"}
                                  ></i>
                                  {
                                    " Escanear Novamente\n                                "
                                  }
                                </button>
                                <button
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.executeSystemRepair("all");
                                  }}
                                  id={"btnFixAll"}
                                  title={"Corrigir Todas as Tabelas"}
                                >
                                  <i className={"ph-bold ph-wrench"}></i>
                                  {
                                    " Corrigir Todas as Tabelas\n                                "
                                  }
                                </button>
                              </div>
                            </div>
                            <div className={"checkup-backup-banner"}>
                              <div className={"backup-banner-info"}>
                                <div className={"backup-icon"}>
                                  <i className={"ph-bold ph-database"}></i>
                                </div>
                                <div className={"backup-text"}>
                                  <span className={"backup-title"}>
                                    {"Rotina de Backup Ativa (a cada 7 dias)"}
                                  </span>
                                  <span id={"backupBannerDetails"}>
                                    {"Carregando informações do backup..."}
                                  </span>
                                </div>
                              </div>
                              <div className={"backup-banner-actions"}>
                                <button
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.triggerManualBackup();
                                  }}
                                  id={"btnTriggerBackup"}
                                >
                                  <i className={"ph-bold ph-floppy-disk"}></i>
                                  {
                                    " Fazer Backup Agora\n                                "
                                  }
                                </button>
                              </div>
                            </div>
                            <div className={"checkup-overview-grid"}>
                              <div
                                className={"checkup-metric-card"}
                                id={"metricTotalTables"}
                              >
                                <span className={"metric-label"}>
                                  {"Tabelas Analisadas"}
                                </span>
                                <span
                                  className={"metric-value"}
                                  id={"valTotalTables"}
                                >
                                  {"16"}
                                </span>
                              </div>
                              <div
                                className={"checkup-metric-card metric-success"}
                                id={"metricHealthy"}
                              >
                                <span className={"metric-label"}>
                                  {"Tabelas Íntegras"}
                                </span>
                                <span
                                  className={"metric-value"}
                                  id={"valHealthyTables"}
                                >
                                  {"-"}
                                </span>
                              </div>
                              <div
                                className={"checkup-metric-card metric-warning"}
                                id={"metricIssues"}
                              >
                                <span className={"metric-label"}>
                                  {"Inconsistências"}
                                </span>
                                <span
                                  className={"metric-value"}
                                  id={"valTotalIssues"}
                                >
                                  {"-"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"checkup-tables-list"}
                              id={"checkupTablesList"}
                            >
                              <div className={"checkup-loading-state"}>
                                <i
                                  className={
                                    "ph-bold ph-circle-notch checkup-spin"
                                  }
                                ></i>
                                <span>
                                  {
                                    "Verificando integridade das tabelas e índices relacionais..."
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>,
                      );
                    }
                    return nodes;
                  })()}
                </section>
              </div>
            </div>
          </aside>,
        );
        if (userCargo === "Admin") {
          nodes.push(
            <div
              key={nodes.length}
              id={"checkupReportModal"}
              className={"checkup-modal-overlay"}
              style={styleFrom("display: none;")}
              onClick={(event) => {
                if (event.target === event.currentTarget)
                  handlers.closeCheckupReportModal();
              }}
            >
              <div
                className={"checkup-modal-card"}
                role={"dialog"}
                aria-modal={"true"}
                aria-labelledby={"checkupReportTitle"}
              >
                <button
                  className={"checkup-modal-close"}
                  type={"button"}
                  onClick={(event) => {
                    handlers.closeCheckupReportModal();
                  }}
                  aria-label={"Fechar"}
                >
                  <i className={"ph-bold ph-x"}></i>
                </button>
                <div className={"checkup-report-header"}>
                  <div
                    className={"checkup-report-icon-wrapper"}
                    id={"checkupReportIcon"}
                  >
                    <i className={"ph-bold ph-check-circle"}></i>
                  </div>
                  <h2
                    className={"checkup-report-title"}
                    id={"checkupReportTitle"}
                  >
                    {"Relatório de Alterações"}
                  </h2>
                  <p
                    className={"checkup-report-subtitle"}
                    id={"checkupReportSubtitle"}
                  >
                    {
                      "O sistema isolou e corrigiu com sucesso os problemas detectados no banco de dados."
                    }
                  </p>
                </div>
                <div
                  id={"checkupReportList"}
                  className={"checkup-report-container"}
                ></div>
                <div className={"checkup-report-footer"}>
                  <button
                    type={"button"}
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.closeCheckupReportModal();
                    }}
                  >
                    <i className={"ph-bold ph-check-circle"}></i>
                    {" CONCLUIR\n            "}
                  </button>
                </div>
              </div>
            </div>,
          );
        }
        nodes.push(
          <div
            key={nodes.length}
            id={"infoModal"}
            className={"modal-new-overlay"}
          >
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
                  src={"/images/logo3-white.png"}
                  alt={"AnalisAI"}
                  className={"modal-new-logo"}
                />
                <div className={"version-badge"}>{"Versão 1.0.4"}</div>
              </div>
              <div className={"modal-new-body"}>
                <p className={"modal-new-text"}>
                  {
                    "\n                Plataforma avançada para gestão de competências e análise de desempenho educacional. \n                Desenvolvida para facilitar a visualização de dados e tomada de decisão pedagógica.\n            "
                  }
                </p>
                <div className={"modal-new-divider"}></div>
                <div className={"modal-new-info-grid"}>
                  <div className={"info-item"}>
                    <span>{"Ambiente"}</span>
                    <p>{"Produção"}</p>
                  </div>
                  <div className={"info-item"}>
                    <span>{"Atualização"}</span>
                    <p>{"Junho 2026"}</p>
                  </div>
                </div>
              </div>
              <div className={"modal-new-footer"}>
                <p>{"© 2026 AnalisAI"}</p>
                <a href={"/dashboard/equipe"} className={"modal-link"}>
                  {"Time de desenvolvimento"}
                </a>
              </div>
            </div>
          </div>,
        );
        return nodes;
      })()}
    </>
  );
}
