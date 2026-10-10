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
      <LoadingElement
        as="button"
        className={"mobile-menu-toggle"}
        type={"button"}
        aria-label={"Abrir menu"}
        aria-expanded={"false"}
      >
        <LoadingElement as="i" className={"fas fa-bars"}></LoadingElement>
      </LoadingElement>
      <LoadingElement
        as="div"
        className={"mobile-menu-backdrop"}
        data-close-mobile-menu={""}
      ></LoadingElement>
      <LoadingElement as="aside" className={"sidebar"} root={true}>
        <LoadingElement as="div" className={"sidebar-top"}>
          <LoadingElement as="div" className={"logo-container"}>
            <LoadingElement
              as="img"
              src={"/images/side-bar-logo.png"}
              alt={"S"}
              className={"sideBarLogo"}
            />
          </LoadingElement>
          <LoadingElement as="div" className={"divider"}></LoadingElement>
          <LoadingElement
            as="a"
            href={"/aluno"}
            data-sidebar-id={"dashboard"}
            className={"side-link"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement as="i" className={"fas fa-home"}></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Início"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="a"
            href={"/aluno/competencias"}
            data-sidebar-id={"competencies"}
            className={"side-link"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-medal"}
                aria-hidden={"true"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Competências"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="a"
            href={"/aluno/tarefas"}
            data-sidebar-id={"tasks"}
            className={"side-link"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"ph-bold ph-check-square"}
                aria-hidden={"true"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Tarefas"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="a"
            href={"/aluno/evolucao"}
            data-sidebar-id={"evolution"}
            className={"side-link"}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement
                as="i"
                className={"fas fa-chart-line"}
              ></LoadingElement>
            </LoadingElement>
            <LoadingElement as="span" className={"link-text"}>
              {"Evolução"}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"active-indicator"}
            ></LoadingElement>
          </LoadingElement>
          <LoadingElement
            as="a"
            href={"/aluno/ia"}
            data-sidebar-id={"ai"}
            className={"side-link"}
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
          </LoadingElement>
        </LoadingElement>
        <LoadingElement as="div" className={"sidebar-bottom"}>
          <LoadingElement
            as="a"
            href={"#"}
            className={"side-link settings-link"}
            data-settings-modal={""}
          >
            <LoadingElement as="div" className={"icon-box"}>
              <LoadingElement as="i" className={"fas fa-cog"}></LoadingElement>
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
              <LoadingElement as="label" className={"settings-search"}>
                <LoadingElement
                  as="i"
                  className={"ph ph-magnifying-glass"}
                ></LoadingElement>
                <LoadingElement
                  as="input"
                  type={"search"}
                  data-settings-search={""}
                  placeholder={"Procurar"}
                  aria-label={"Pesquisar configurações"}
                />
              </LoadingElement>
              <LoadingElement as="span" className={"settings-nav-label"}>
                {"Configurações"}
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"settings-nav-item active"}
                data-settings-section={"general"}
              >
                <LoadingElement
                  as="i"
                  className={"ph ph-user"}
                ></LoadingElement>
                {" Geral"}
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"settings-nav-item"}
                data-settings-section={"account"}
              >
                <LoadingElement
                  as="i"
                  className={"ph ph-identification-card"}
                ></LoadingElement>
                {" Conta"}
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"settings-nav-item"}
                data-settings-section={"privacy"}
              >
                <LoadingElement
                  as="i"
                  className={"ph ph-shield-check"}
                ></LoadingElement>
                {" Privacidade"}
              </LoadingElement>
              <LoadingElement
                as="button"
                className={"settings-nav-item"}
                data-settings-section={"notifications"}
              >
                <LoadingElement
                  as="i"
                  className={"ph ph-bell"}
                ></LoadingElement>
                {" Notificações"}
              </LoadingElement>
            </LoadingElement>
            <LoadingElement as="section" className={"settings-modal-content"}>
              <LoadingElement
                as="button"
                type={"button"}
                className={"settings-modal-close"}
                data-close-settings={""}
                aria-label={"Fechar"}
              >
                <LoadingElement as="i" className={"ph ph-x"}></LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"settings-section active"}
                data-settings-panel={"general"}
              >
                <LoadingElement as="h2" id={"settingsModalTitle"}>
                  {"Perfil"}
                </LoadingElement>
                <LoadingElement as="div" className={"settings-avatar-row"}>
                  <LoadingElement as="strong">{"Avatar"}</LoadingElement>
                  <LoadingElement
                    as="span"
                    className={"settings-avatar"}
                    data-account={"initial"}
                  >
                    {aluno.nome.charAt(0).toUpperCase()}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Nome completo"}</LoadingElement>
                  <LoadingElement as="span" data-account={"name"}>
                    {aluno.nome}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Turma / ano"}</LoadingElement>
                  <LoadingElement as="span" data-account={"class"}>
                    {aluno.ano_escolar}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Matrícula"}</LoadingElement>
                  <LoadingElement as="span" data-account={"registration"}>
                    {typeof aluno.matricula !== "undefined"
                      ? aluno.matricula
                      : "Carregando..."}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"E-mail"}</LoadingElement>
                  <LoadingElement as="span" data-account={"email"}>
                    {"Carregando..."}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Idade"}</LoadingElement>
                  <LoadingElement as="span" data-account={"age"}>
                    {"—"}
                  </LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-account-summary"}>
                  <LoadingElement as="div" className={"settings-account-stat"}>
                    <LoadingElement as="span">{"Avaliações"}</LoadingElement>
                    <LoadingElement as="strong" data-account={"assessments"}>
                      {"—"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"settings-account-stat"}>
                    <LoadingElement as="span">{"Presença"}</LoadingElement>
                    <LoadingElement as="strong" data-account={"attendance"}>
                      {"—"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"settings-account-stat"}>
                    <LoadingElement as="span">
                      {"Status da conta"}
                    </LoadingElement>
                    <LoadingElement as="strong" data-account={"status"}>
                      {"—"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"settings-account-stat"}>
                    <LoadingElement as="span">{"Cadastro"}</LoadingElement>
                    <LoadingElement as="strong" data-account={"created"}>
                      {"—"}
                    </LoadingElement>
                  </LoadingElement>
                  <LoadingElement as="div" className={"settings-account-stat"}>
                    <LoadingElement as="span">{"Último acesso"}</LoadingElement>
                    <LoadingElement as="strong" data-account={"lastAccess"}>
                      {"—"}
                    </LoadingElement>
                  </LoadingElement>
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"settings-section"}
                data-settings-panel={"account"}
              >
                {(() => {
                  const nodes = [];
                  nodes.push(
                    <LoadingElement as="h2" key={nodes.length}>
                      {"Conta e segurança"}
                    </LoadingElement>,
                  );
                  if (typeof success_msg !== "undefined" && success_msg) {
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"settings-feedback is-success"}
                        key={nodes.length}
                      >
                        {success_msg}
                      </LoadingElement>,
                    );
                  }
                  if (typeof error_msg !== "undefined" && error_msg) {
                    nodes.push(
                      <LoadingElement
                        as="p"
                        className={"settings-feedback is-error"}
                        key={nodes.length}
                      >
                        {error_msg}
                      </LoadingElement>,
                    );
                  }
                  nodes.push(
                    <LoadingElement
                      as="p"
                      className={"settings-help"}
                      key={nodes.length}
                    >
                      {"Altere sua senha sem sair do painel atual."}
                    </LoadingElement>,
                  );
                  nodes.push(
                    <LoadingElement
                      as="form"
                      className={"settings-password-form"}
                      action={"/aluno/alterar-senha"}
                      method={"POST"}
                      key={nodes.length}
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
                      <LoadingElement as="label">{"Nova senha"}</LoadingElement>
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
                    </LoadingElement>,
                  );
                  return nodes;
                })()}
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"settings-section"}
                data-settings-panel={"privacy"}
              >
                <LoadingElement as="h2">{"Privacidade"}</LoadingElement>
                <LoadingElement as="p" className={"settings-help"}>
                  {
                    "Sua sessão é protegida por autenticação e token CSRF. Nunca compartilhe sua senha. Os dados exibidos neste painel são privados da sua conta."
                  }
                </LoadingElement>
              </LoadingElement>
              <LoadingElement
                as="div"
                className={"settings-section"}
                data-settings-panel={"notifications"}
              >
                <LoadingElement as="h2">{"Notificações"}</LoadingElement>
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
                    {"Notificações por e-mail"}
                  </LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"settings-switch"}
                    data-notification={"notificacoes_email"}
                    type={"button"}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Tarefas"}</LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"settings-switch"}
                    data-notification={"notificacoes_tarefas"}
                    type={"button"}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Avaliações"}</LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"settings-switch"}
                    data-notification={"notificacoes_avaliacoes"}
                    type={"button"}
                  ></LoadingElement>
                </LoadingElement>
                <LoadingElement as="div" className={"settings-field"}>
                  <LoadingElement as="label">{"Competências"}</LoadingElement>
                  <LoadingElement
                    as="button"
                    className={"settings-switch"}
                    data-notification={"notificacoes_competencias"}
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
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
      <LoadingElement as="div" id={"infoModal"} className={"modal-new-overlay"}>
        <LoadingElement as="div" className={"modal-new-card"}>
          <LoadingElement
            as="button"
            className={"modal-new-close"}
            onClick={(event) => {
              handlers.closeModal();
            }}
          >
            <LoadingElement as="i" className={"fas fa-times"}></LoadingElement>
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
              src={"/images/logo3-green.png"}
              alt={"AnalisAI"}
              className={"modal-new-logo"}
            />
            <LoadingElement
              as="div"
              className={"version-badge"}
              style={styleFrom(
                "background: rgba(33, 115, 70, 0.1); color: #217346;",
              )}
            >
              {"Versão Aluno 1.0.4"}
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"modal-new-body"}>
            <LoadingElement as="p" className={"modal-new-text"}>
              {[
                "\n                Área exclusiva para estudantes. Acompanhe seu ",
                "desempenho, visualize suas competências \n                e ",
                "monitore sua evolução acadêmica em tempo real através de dados ",
                "integrados.\n            ",
              ].join("")}
            </LoadingElement>
            <LoadingElement
              as="div"
              className={"modal-new-divider"}
            ></LoadingElement>
            <LoadingElement as="div" className={"modal-new-info-grid"}>
              <LoadingElement as="div" className={"info-item"}>
                <LoadingElement as="span">{"Portal"}</LoadingElement>
                <LoadingElement as="p">{"Estudante"}</LoadingElement>
              </LoadingElement>
              <LoadingElement as="div" className={"info-item"}>
                <LoadingElement as="span">{"Status"}</LoadingElement>
                <LoadingElement as="p">{"Sincronizado"}</LoadingElement>
              </LoadingElement>
            </LoadingElement>
          </LoadingElement>
          <LoadingElement as="div" className={"modal-new-footer"}>
            <LoadingElement as="p">
              {"© 2026 AnalisAI • Senai CIC"}
            </LoadingElement>
            <LoadingElement
              as="a"
              href={"/aluno/equipe"}
              className={"modal-link"}
            >
              {"Time de desenvolvimento"}
            </LoadingElement>
          </LoadingElement>
        </LoadingElement>
      </LoadingElement>
    </>
  );
}
