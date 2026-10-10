import { LoadingElement } from "./loading-layout";
import React, { useContext } from "react";
import { PersistentSidebarContext } from "./layout-context";
import { styleFrom } from "../services/ui";
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
          <LoadingElement
            as="button"
            key={nodes.length}
            className={"mobile-menu-toggle"}
            type={"button"}
            aria-label={"Abrir menu"}
            aria-expanded={"false"}
          >
            <LoadingElement as="i" className={"fas fa-bars"}></LoadingElement>
          </LoadingElement>,
        );
        nodes.push(
          <LoadingElement
            as="div"
            key={nodes.length}
            className={"mobile-menu-backdrop"}
            data-close-mobile-menu={""}
          ></LoadingElement>,
        );
        nodes.push(
          <LoadingElement
            as="aside"
            key={nodes.length}
            className={"sidebar"}
            root={true}
          >
            <LoadingElement as="div" className={"sidebar-top"}>
              {(() => {
                const nodes = [];
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"logo-container"}
                    key={nodes.length}
                  >
                    <LoadingElement
                      as="img"
                      src={"/images/side-bar-logo.png"}
                      alt={"S"}
                      className={"sideBarLogo"}
                    />
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="div"
                    className={"divider"}
                    key={nodes.length}
                  ></LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard"}
                    data-sidebar-id={"dashboard"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"fas fa-home"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Início"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard/edit"}
                    data-sidebar-id={"edit"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"fas fa-pen"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Editor"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard/tarefas"}
                    data-sidebar-id={"tasks"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"fas fa-tasks"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Tarefas"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard/graficos"}
                    data-sidebar-id={"reports"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"fas fa-chart-bar"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Relatórios"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard/calendario"}
                    data-sidebar-id={"calendar"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"fas fa-calendar"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Calendário"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                nodes.push(
                  <LoadingElement
                    as="a"
                    href={"/dashboard/ia"}
                    data-sidebar-id={"ai"}
                    className={"side-link"}
                    key={nodes.length}
                  >
                    <LoadingElement as="div" className={"icon-box"}>
                      <LoadingElement
                        as="i"
                        className={"ph-bold ph-sparkle"}
                        aria-hidden={"true"}
                      ></LoadingElement>
                    </LoadingElement>
                    <LoadingElement as="span" className={"link-text"}>
                      {"Agente"}
                    </LoadingElement>
                    <LoadingElement
                      as="div"
                      className={"active-indicator"}
                    ></LoadingElement>
                  </LoadingElement>,
                );
                if (userCargo === "Admin") {
                  nodes.push(
                    <LoadingElement
                      as="a"
                      href={"/dashboard/usuarios"}
                      data-sidebar-id={"users"}
                      className={"side-link"}
                      key={nodes.length}
                    >
                      <LoadingElement as="div" className={"icon-box"}>
                        <LoadingElement
                          as="i"
                          className={"fas fa-users"}
                        ></LoadingElement>
                      </LoadingElement>
                      <LoadingElement as="span" className={"link-text"}>
                        {"Usuários"}
                      </LoadingElement>
                      <LoadingElement
                        as="div"
                        className={"active-indicator"}
                      ></LoadingElement>
                    </LoadingElement>,
                  );
                }
                return nodes;
              })()}
            </LoadingElement>
            <LoadingElement as="div" className={"sidebar-bottom"}>
              <LoadingElement
                as="a"
                href={"#"}
                className={"side-link settings-link"}
                data-settings-modal={""}
              >
                <LoadingElement as="div" className={"icon-box"}>
                  <LoadingElement
                    as="i"
                    className={"fas fa-cog"}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="span" className={"link-text"}>
                  {"Ajustes"}
                </LoadingElement>
                <LoadingElement
                  as="div"
                  className={"active-indicator"}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="form"
                action={"/logout"}
                method={"POST"}
                className={"logout-form"}
              >
                <LoadingElement
                  as="input"
                  type={"hidden"}
                  name={"_csrf"}
                  value={typeof csrfToken !== "undefined" ? csrfToken : ""}
                />
                <LoadingElement
                  as="button"
                  type={"submit"}
                  className={"side-link exit-link"}
                >
                  <LoadingElement as="div" className={"icon-box"}>
                    <LoadingElement
                      as="i"
                      className={"fas fa-sign-out-alt"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="span" className={"link-text"}>
                    {"Sair"}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
            <LoadingElement
              as="div"
              id={"settingsModal"}
              className={"settings-modal"}
              aria-hidden={"true"}
            >
              <LoadingElement
                as="div"
                className={"settings-modal-card"}
                role={"dialog"}
                aria-modal={"true"}
                aria-labelledby={"settingsModalTitle"}
              >
                <LoadingElement as="aside" className={"settings-modal-nav"}>
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <LoadingElement
                        as="label"
                        className={"settings-search"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-magnifying-glass"}
                        ></LoadingElement>
                        <LoadingElement
                          as="input"
                          type={"search"}
                          data-settings-search={""}
                          placeholder={"Procurar"}
                          aria-label={"Pesquisar configurações"}
                        />
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="span"
                        className={"settings-nav-label"}
                        key={nodes.length}
                      >
                        {"Configurações"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"settings-nav-item active"}
                        data-settings-section={"general"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-user-circle"}
                        ></LoadingElement>
                        {" Geral"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"settings-nav-item"}
                        data-settings-section={"account"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-identification-card"}
                        ></LoadingElement>
                        {" Conta"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"settings-nav-item"}
                        data-settings-section={"privacy"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-shield-check"}
                        ></LoadingElement>
                        {" Privacidade"}
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="button"
                        className={"settings-nav-item"}
                        data-settings-section={"notifications"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-bell"}
                        ></LoadingElement>
                        {" Notificações"}
                      </LoadingElement>,
                    );
                    if (userCargo === "Admin") {
                      nodes.push(
                        <LoadingElement
                          as="span"
                          className={"settings-nav-label"}
                          key={nodes.length}
                        >
                          {"Administração"}
                        </LoadingElement>,
                      );
                      nodes.push(
                        <LoadingElement
                          as="button"
                          className={"settings-nav-item"}
                          data-settings-section={"checkup"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="i"
                            className={"ph-bold ph-heartbeat"}
                          ></LoadingElement>
                          {" Checkup do Sistema"}
                        </LoadingElement>,
                      );
                    }
                    return nodes;
                  })()}
                </LoadingElement>
                <LoadingElement
                  as="section"
                  className={"settings-modal-content"}
                >
                  {(() => {
                    const nodes = [];
                    nodes.push(
                      <LoadingElement
                        as="button"
                        type={"button"}
                        className={"settings-modal-close"}
                        data-close-settings={""}
                        aria-label={"Fechar"}
                        key={nodes.length}
                      >
                        <LoadingElement
                          as="i"
                          className={"ph-bold ph-x"}
                        ></LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section active"}
                        data-settings-panel={"general"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2" id={"settingsModalTitle"}>
                          {"Perfil"}
                        </LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"settings-avatar-row"}
                        >
                          <LoadingElement as="strong">
                            {"Avatar"}
                          </LoadingElement>
                          <LoadingElement
                            as="span"
                            className={"settings-avatar"}
                          >
                            {user.charAt(0).toUpperCase()}
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"Nome completo"}
                          </LoadingElement>
                          <LoadingElement as="span">{user}</LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"E-mail institucional"}
                          </LoadingElement>
                          <LoadingElement as="span">
                            {typeof email !== "undefined"
                              ? email
                              : "Não informado"}
                          </LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">{"Função"}</LoadingElement>
                          <LoadingElement as="span">
                            {typeof cargo !== "undefined"
                              ? cargo
                              : typeof userCargo !== "undefined"
                                ? userCargo
                                : "Professor"}
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section"}
                        data-settings-panel={"account"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2">{"Conta"}</LoadingElement>
                        <LoadingElement as="p" className={"settings-help"}>
                          {"Altere sua senha diretamente por este painel."}
                        </LoadingElement>
                        <LoadingElement
                          as="form"
                          className={"settings-password-form"}
                          action={"/dashboard/alterar-senha"}
                          method={"POST"}
                        >
                          <LoadingElement
                            as="input"
                            type={"hidden"}
                            name={"_csrf"}
                            value={
                              typeof csrfToken !== "undefined" ? csrfToken : ""
                            }
                          />
                          <LoadingElement as="label">
                            {"Senha atual"}
                          </LoadingElement>
                          <LoadingElement
                            as="input"
                            type={"password"}
                            name={"senha_atual"}
                            required={true}
                            autoComplete={"current-password"}
                          />
                          <LoadingElement as="label">
                            {"Nova senha"}
                          </LoadingElement>
                          <LoadingElement
                            as="input"
                            type={"password"}
                            name={"nova_senha"}
                            required={true}
                            minLength={"12"}
                            autoComplete={"new-password"}
                          />
                          <LoadingElement as="label">
                            {"Confirmar nova senha"}
                          </LoadingElement>
                          <LoadingElement
                            as="input"
                            type={"password"}
                            name={"confirmar_senha"}
                            required={true}
                            autoComplete={"new-password"}
                          />
                          <LoadingElement
                            as="button"
                            className={"settings-save"}
                            type={"submit"}
                          >
                            {"Atualizar senha"}
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section"}
                        data-settings-panel={"privacy"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2">{"Privacidade"}</LoadingElement>
                        <LoadingElement as="p" className={"settings-help"}>
                          {
                            "Sua sessão é protegida por autenticação e token CSRF. Nunca compartilhe sua senha. Os dados exibidos neste painel são privados da sua conta."
                          }
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section"}
                        data-settings-panel={"notifications"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2">
                          {"Notificações"}
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"Notificações gerais"}
                          </LoadingElement>
                          <LoadingElement
                            as="button"
                            className={"settings-switch"}
                            data-notification={"notificacoes_ativas"}
                            type={"button"}
                          ></LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"Atividades de alunos"}
                          </LoadingElement>
                          <LoadingElement
                            as="button"
                            className={"settings-switch"}
                            data-notification={"notificacoes_tarefas"}
                            type={"button"}
                          ></LoadingElement>
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"Avaliações"}
                          </LoadingElement>
                          <LoadingElement
                            as="button"
                            className={"settings-switch"}
                            data-notification={"notificacoes_avaliacoes"}
                            type={"button"}
                          ></LoadingElement>
                        </LoadingElement>
                        <LoadingElement
                          as="button"
                          className={"settings-save"}
                          data-save-notifications={""}
                          type={"button"}
                        >
                          {"Salvar notificações"}
                        </LoadingElement>
                        <LoadingElement
                          as="span"
                          className={"settings-feedback"}
                          data-settings-feedback={""}
                        ></LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section"}
                        data-settings-panel={"appearance"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2">{"Aparência"}</LoadingElement>
                        <LoadingElement
                          as="div"
                          className={"settings-field settings-choice"}
                        >
                          <LoadingElement as="label">
                            {"Tema da interface"}
                          </LoadingElement>
                          <LoadingElement
                            as="span"
                            className={"settings-theme-options"}
                          >
                            <LoadingElement
                              as="button"
                              type={"button"}
                              data-theme={"dark"}
                            >
                              <LoadingElement
                                as="i"
                                className={"ph-bold ph-moon"}
                              ></LoadingElement>
                              {" Escuro"}
                            </LoadingElement>
                            <LoadingElement
                              as="button"
                              type={"button"}
                              data-theme={"light"}
                            >
                              <LoadingElement
                                as="i"
                                className={"ph-bold ph-sun"}
                              ></LoadingElement>
                              {" Claro"}
                            </LoadingElement>
                          </LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    nodes.push(
                      <LoadingElement
                        as="div"
                        className={"settings-section"}
                        data-settings-panel={"preferences"}
                        key={nodes.length}
                      >
                        <LoadingElement as="h2">
                          {"Preferências"}
                        </LoadingElement>
                        <LoadingElement as="div" className={"settings-field"}>
                          <LoadingElement as="label">
                            {"Reduzir animações"}
                          </LoadingElement>
                          <LoadingElement
                            as="button"
                            className={"settings-switch"}
                            data-preference={"reduced-motion"}
                            type={"button"}
                          ></LoadingElement>
                        </LoadingElement>
                      </LoadingElement>,
                    );
                    if (userCargo === "Admin") {
                      nodes.push(
                        <LoadingElement
                          as="div"
                          className={"settings-section"}
                          data-settings-panel={"checkup"}
                          key={nodes.length}
                        >
                          <LoadingElement
                            as="div"
                            id={"checkupAuthContainer"}
                            className={"checkup-step"}
                          >
                            <LoadingElement as="h2">
                              {"Checkup do Sistema"}
                            </LoadingElement>
                            <LoadingElement as="p" className={"settings-help"}>
                              {
                                "Acesso exclusivo para administradores. Digite a senha administrativa de segurança para desbloquear o diagnóstico do banco de dados."
                              }
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              id={"checkupAuthError"}
                              className={"checkup-alert-error"}
                              style={styleFrom("display: none;")}
                            >
                              <LoadingElement
                                as="i"
                                className={"ph-bold ph-warning-circle"}
                              ></LoadingElement>
                              <LoadingElement
                                as="span"
                                id={"checkupAuthErrorMsg"}
                              >
                                {"Senha incorreta."}
                              </LoadingElement>
                            </LoadingElement>
                            <LoadingElement
                              as="form"
                              id={"checkupAuthForm"}
                              className={"settings-password-form"}
                              onSubmit={(event) => {
                                event.preventDefault();
                                handlers.submitCheckupPassword();
                              }}
                            >
                              <LoadingElement
                                as="label"
                                htmlFor={"checkupPasswordInput"}
                              >
                                {"Senha administrativa"}
                              </LoadingElement>
                              <LoadingElement
                                as="input"
                                type={"password"}
                                id={"checkupPasswordInput"}
                                placeholder={"Digite a senha administrativa"}
                                required={true}
                                autoComplete={"current-password"}
                              />
                              <LoadingElement
                                as="button"
                                className={"settings-save"}
                                type={"submit"}
                                id={"btnUnlockCheckup"}
                              >
                                <LoadingElement
                                  as="i"
                                  className={"ph-bold ph-lock-key-open"}
                                ></LoadingElement>
                                {
                                  " Desbloquear Diagnóstico\n                            "
                                }
                              </LoadingElement>
                            </LoadingElement>
                          </LoadingElement>
                          <LoadingElement
                            as="div"
                            id={"checkupDashboardContainer"}
                            className={"checkup-step"}
                            style={styleFrom("display: none;")}
                          >
                            <LoadingElement
                              as="div"
                              className={"checkup-header"}
                            >
                              <LoadingElement as="div">
                                <LoadingElement as="h2">
                                  {"Integridade do Banco de Dados"}
                                </LoadingElement>
                                <LoadingElement
                                  as="p"
                                  className={"settings-help"}
                                >
                                  {
                                    "Varredura profunda tabela a tabela em busca de anomalias, órfãos e dados corrompidos."
                                  }
                                </LoadingElement>
                              </LoadingElement>
                              <LoadingElement
                                as="div"
                                className={"checkup-top-actions"}
                              >
                                <LoadingElement
                                  as="button"
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.refreshCheckup();
                                  }}
                                  id={"btnScanAgain"}
                                  title={"Escanear Novamente"}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-arrows-clockwise"}
                                  ></LoadingElement>
                                  {
                                    " Escanear Novamente\n                                "
                                  }
                                </LoadingElement>
                                <LoadingElement
                                  as="button"
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.executeSystemRepair("all");
                                  }}
                                  id={"btnFixAll"}
                                  title={"Corrigir Todas as Tabelas"}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-wrench"}
                                  ></LoadingElement>
                                  {
                                    " Corrigir Todas as Tabelas\n                                "
                                  }
                                </LoadingElement>
                              </LoadingElement>
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"checkup-backup-banner"}
                            >
                              <LoadingElement
                                as="div"
                                className={"backup-banner-info"}
                              >
                                <LoadingElement
                                  as="div"
                                  className={"backup-icon"}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-database"}
                                  ></LoadingElement>
                                </LoadingElement>
                                <LoadingElement
                                  as="div"
                                  className={"backup-text"}
                                >
                                  <LoadingElement
                                    as="span"
                                    className={"backup-title"}
                                  >
                                    {"Rotina de Backup Ativa (a cada 7 dias)"}
                                  </LoadingElement>
                                  <LoadingElement
                                    as="span"
                                    id={"backupBannerDetails"}
                                  >
                                    {"Carregando informações do backup..."}
                                  </LoadingElement>
                                </LoadingElement>
                              </LoadingElement>
                              <LoadingElement
                                as="div"
                                className={"backup-banner-actions"}
                              >
                                <LoadingElement
                                  as="button"
                                  type={"button"}
                                  className={"btn-secondary-dash"}
                                  onClick={(event) => {
                                    handlers.triggerManualBackup();
                                  }}
                                  id={"btnTriggerBackup"}
                                >
                                  <LoadingElement
                                    as="i"
                                    className={"ph-bold ph-floppy-disk"}
                                  ></LoadingElement>
                                  {
                                    " Fazer Backup Agora\n                                "
                                  }
                                </LoadingElement>
                              </LoadingElement>
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"checkup-overview-grid"}
                            >
                              <LoadingElement
                                as="div"
                                className={"checkup-metric-card"}
                                id={"metricTotalTables"}
                              >
                                <LoadingElement
                                  as="span"
                                  className={"metric-label"}
                                >
                                  {"Tabelas Analisadas"}
                                </LoadingElement>
                                <LoadingElement
                                  as="span"
                                  className={"metric-value"}
                                  id={"valTotalTables"}
                                >
                                  {"16"}
                                </LoadingElement>
                              </LoadingElement>
                              <LoadingElement
                                as="div"
                                className={"checkup-metric-card metric-success"}
                                id={"metricHealthy"}
                              >
                                <LoadingElement
                                  as="span"
                                  className={"metric-label"}
                                >
                                  {"Tabelas Íntegras"}
                                </LoadingElement>
                                <LoadingElement
                                  as="span"
                                  className={"metric-value"}
                                  id={"valHealthyTables"}
                                >
                                  {"-"}
                                </LoadingElement>
                              </LoadingElement>
                              <LoadingElement
                                as="div"
                                className={"checkup-metric-card metric-warning"}
                                id={"metricIssues"}
                              >
                                <LoadingElement
                                  as="span"
                                  className={"metric-label"}
                                >
                                  {"Inconsistências"}
                                </LoadingElement>
                                <LoadingElement
                                  as="span"
                                  className={"metric-value"}
                                  id={"valTotalIssues"}
                                >
                                  {"-"}
                                </LoadingElement>
                              </LoadingElement>
                            </LoadingElement>
                            <LoadingElement
                              as="div"
                              className={"checkup-tables-list"}
                              id={"checkupTablesList"}
                            >
                              <LoadingElement
                                as="div"
                                className={"checkup-loading-state"}
                              >
                                <LoadingElement
                                  as="i"
                                  className={
                                    "ph-bold ph-circle-notch checkup-spin"
                                  }
                                ></LoadingElement>
                                <LoadingElement as="span">
                                  {
                                    "Verificando integridade das tabelas e índices relacionais..."
                                  }
                                </LoadingElement>
                              </LoadingElement>
                            </LoadingElement>
                          </LoadingElement>
                        </LoadingElement>,
                      );
                    }
                    return nodes;
                  })()}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>,
        );
        if (userCargo === "Admin") {
          nodes.push(
            <LoadingElement
              as="div"
              key={nodes.length}
              id={"checkupReportModal"}
              className={"checkup-modal-overlay"}
              style={styleFrom("display: none;")}
              onClick={(event) => {
                if (event.target === event.currentTarget)
                  handlers.closeCheckupReportModal();
              }}
            >
              <LoadingElement
                as="div"
                className={"checkup-modal-card"}
                role={"dialog"}
                aria-modal={"true"}
                aria-labelledby={"checkupReportTitle"}
              >
                <LoadingElement
                  as="button"
                  className={"checkup-modal-close"}
                  type={"button"}
                  onClick={(event) => {
                    handlers.closeCheckupReportModal();
                  }}
                  aria-label={"Fechar"}
                >
                  <LoadingElement
                    as="i"
                    className={"ph-bold ph-x"}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"checkup-report-header"}>
                  <LoadingElement
                    as="div"
                    className={"checkup-report-icon-wrapper"}
                    id={"checkupReportIcon"}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-check-circle"}
                    ></LoadingElement>
                  </LoadingElement>
                  <LoadingElement
                    as="h2"
                    className={"checkup-report-title"}
                    id={"checkupReportTitle"}
                  >
                    {"Relatório de Alterações"}
                  </LoadingElement>
                  <LoadingElement
                    as="p"
                    className={"checkup-report-subtitle"}
                    id={"checkupReportSubtitle"}
                  >
                    {
                      "O sistema isolou e corrigiu com sucesso os problemas detectados no banco de dados."
                    }
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement
                  as="div"
                  id={"checkupReportList"}
                  className={"checkup-report-container"}
                ></LoadingElement>
                <LoadingElement as="div" className={"checkup-report-footer"}>
                  <LoadingElement
                    as="button"
                    type={"button"}
                    className={"btn-secondary-dash"}
                    onClick={(event) => {
                      handlers.closeCheckupReportModal();
                    }}
                  >
                    <LoadingElement
                      as="i"
                      className={"ph-bold ph-check-circle"}
                    ></LoadingElement>
                    {" CONCLUIR\n            "}
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>,
          );
        }
        nodes.push(
          <LoadingElement
            as="div"
            key={nodes.length}
            id={"infoModal"}
            className={"modal-new-overlay"}
          >
            <LoadingElement as="div" className={"modal-new-card"}>
              <LoadingElement
                as="button"
                className={"modal-new-close"}
                onClick={(event) => {
                  handlers.closeModal();
                }}
              >
                <LoadingElement
                  as="i"
                  className={"fas fa-times"}
                ></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"modal-new-header"}
                style={styleFrom(
                  "justify-content: center;align-items: center;display: flex;flex-direction: column;",
                )}
              >
                <LoadingElement
                  as="img"
                  src={"/images/logo3-white.png"}
                  alt={"AnalisAI"}
                  className={"modal-new-logo"}
                />
                <LoadingElement as="div" className={"version-badge"}>
                  {"Versão 1.0.4"}
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"modal-new-body"}>
                <LoadingElement as="p" className={"modal-new-text"}>
                  {[
                    "\n                Plataforma avançada para gestão de competências ",
                    "e análise de desempenho educacional. \n                ",
                    "Desenvolvida para facilitar a visualização de dados e tomada de ",
                    "decisão pedagógica.\n            ",
                  ].join("")}
                </LoadingElement>
                <LoadingElement
                  as="div"
                  className={"modal-new-divider"}
                ></LoadingElement>
                <LoadingElement as="div" className={"modal-new-info-grid"}>
                  <LoadingElement as="div" className={"info-item"}>
                    <LoadingElement as="span">{"Ambiente"}</LoadingElement>
                    <LoadingElement as="p">{"Produção"}</LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"info-item"}>
                    <LoadingElement as="span">{"Atualização"}</LoadingElement>
                    <LoadingElement as="p">{"Junho 2026"}</LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"modal-new-footer"}>
                <LoadingElement as="p">{"© 2026 AnalisAI"}</LoadingElement>
                <LoadingElement
                  as="a"
                  href={"/dashboard/equipe"}
                  className={"modal-link"}
                >
                  {"Time de desenvolvimento"}
                </LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>,
        );
        return nodes;
      })()}
    </>
  );
}
