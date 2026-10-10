import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch as fetch } from "../services/api";
import { styleFrom, escapeHtml, mount, richMarkup } from "../services/ui";
export function initialize({ onReady, handlers }) {
  onReady(() => {
    const modal = document.querySelector(".settings-modal");
    if (!modal) return;
    const validSections = new Set([
      "general",
      "account",
      "privacy",
      "notifications",
      "checkup",
    ]);
    let isCheckupUnlocked = false;
    const setSection = (section) => {
      const selected = validSections.has(section) ? section : "general";
      modal.querySelectorAll("[data-settings-section]").forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.settingsSection === selected,
        );
      });
      modal.querySelectorAll("[data-settings-panel]").forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.dataset.settingsPanel === selected,
        );
      });
      if (selected === "notifications") {
        loadNotifications();
      } else if (selected === "checkup") {
        if (isCheckupUnlocked) {
          handlers.refreshCheckup();
        } else {
          setTimeout(() => {
            document.getElementById("checkupPasswordInput")?.focus();
          }, 100);
        }
      }
    };
    const openSettings = (section = "general") => {
      setSection(section);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    };
    window.addEventListener("analisai:open-settings", (event) =>
      openSettings(event.detail?.section || "general"),
    );
    modal.querySelectorAll("[data-settings-section]").forEach((button) => {
      button.addEventListener("click", () =>
        setSection(button.dataset.settingsSection),
      );
    });
    const search = modal.querySelector("[data-settings-search]");
    const navItems = [...modal.querySelectorAll("[data-settings-section]")];
    const navLabels = [...modal.querySelectorAll(".settings-nav-label")];
    const panels = [...modal.querySelectorAll("[data-settings-panel]")];
    search?.addEventListener("input", () => {
      const query = search.value.trim().toLocaleLowerCase("pt-BR");
      if (!query) {
        navItems.forEach((item) => {
          item.hidden = false;
        });
        panels.forEach((panel) => {
          panel.hidden = false;
        });
        navLabels.forEach((label) => {
          label.hidden = false;
        });
        return;
      }
      const matches = new Set();
      panels.forEach((panel) => {
        const text = panel.textContent.trim().toLocaleLowerCase("pt-BR");
        if (text.includes(query)) matches.add(panel.dataset.settingsPanel);
        panel.hidden = !text.includes(query);
      });
      navItems.forEach((item) => {
        const section = item.dataset.settingsSection;
        const navText = item.textContent.trim().toLocaleLowerCase("pt-BR");
        const visible = navText.includes(query) || matches.has(section);
        item.hidden = !visible;
      });
      navLabels.forEach((label) => {
        let item = label.nextElementSibling;
        let visible = false;
        while (item && !item.classList.contains("settings-nav-label")) {
          if (!item.hidden) visible = true;
          item = item.nextElementSibling;
        }
        label.hidden = !visible;
      });
      const firstMatch = navItems.find((item) => !item.hidden);
      if (firstMatch) setSection(firstMatch.dataset.settingsSection);
    });
    const fill = (key, value) => {
      modal.querySelectorAll(`[data-account="${key}"]`).forEach((el) => {
        if (value !== undefined && value !== null)
          el.textContent = String(value);
      });
    };
    const loadAccount = async () => {
      try {
        const response = await fetch("/api/conta", {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Não foi possível carregar os dados da conta");
        const data = await response.json();
        Object.entries(data).forEach(([key, value]) => fill(key, value));
      } catch (error) {
        console.error("Erro ao carregar conta:", error);
        modal.querySelectorAll("[data-account]").forEach((el) => {
          if (el.textContent === "Carregando..." || el.textContent === "—")
            el.textContent = "—";
        });
      }
    };
    const loadNotifications = async () => {
      try {
        const response = await fetch("/api/configuracoes-notificacoes");
        if (!response.ok)
          throw new Error("Não foi possível carregar as notificações");
        const config = await response.json();
        modal.querySelectorAll("[data-notification]").forEach((toggle) => {
          toggle.classList.toggle(
            "active",
            Boolean(config[toggle.dataset.notification]),
          );
        });
      } catch (error) {
        const feedback = modal.querySelector("[data-settings-feedback]");
        if (feedback) feedback.textContent = error.message;
      }
    };
    modal.querySelectorAll("[data-notification]").forEach((toggle) => {
      toggle.addEventListener("click", () => toggle.classList.toggle("active"));
    });
    modal
      .querySelector("[data-save-notifications]")
      ?.addEventListener("click", async () => {
        const data = {};
        modal.querySelectorAll("[data-notification]").forEach((toggle) => {
          data[toggle.dataset.notification] =
            toggle.classList.contains("active");
        });
        const feedback = modal.querySelector("[data-settings-feedback]");
        try {
          const csrfToken =
            document.querySelector('meta[name="csrf-token"]')?.content || "";
          const response = await fetch("/api/configuracoes-notificacoes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken,
            },
            body: JSON.stringify(data),
          });
          if (!response.ok)
            throw new Error("Não foi possível salvar as notificações");
          if (feedback) {
            feedback.textContent = "Preferências salvas.";
            feedback.classList.add("is-success");
            feedback.classList.remove("is-error");
          }
        } catch (error) {
          if (feedback) {
            feedback.textContent = error.message;
            feedback.classList.add("is-error");
            feedback.classList.remove("is-success");
          }
        }
      });
    const getCsrfToken = () =>
      document.querySelector('meta[name="csrf-token"]')?.content || "";
    handlers.submitCheckupPassword = async function () {
      const input = document.getElementById("checkupPasswordInput");
      const btn = document.getElementById("btnUnlockCheckup");
      const errorContainer = document.getElementById("checkupAuthError");
      const errorMsg = document.getElementById("checkupAuthErrorMsg");
      const password = input?.value.trim() || "";
      if (!password) {
        if (errorMsg && errorContainer) {
          errorMsg.textContent = "Digite a senha administrativa.";
          errorContainer.style.display = "flex";
        }
        return;
      }
      if (btn) {
        btn.disabled = true;
        mount(
          btn,
          <>
            <i className={"ph-bold ph-spinner checkup-spin"}></i>
            {" Verificando credenciais..."}
          </>,
        );
      }
      if (errorContainer) errorContainer.style.display = "none";
      try {
        const res = await fetch("/dashboard/verify-delete-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": getCsrfToken(),
          },
          body: JSON.stringify({
            password,
          }),
        });
        const data = await res.json();
        if (res.ok && data.valid) {
          isCheckupUnlocked = true;
          const authContainer = document.getElementById("checkupAuthContainer");
          const dashContainer = document.getElementById(
            "checkupDashboardContainer",
          );
          if (authContainer) authContainer.style.display = "none";
          if (dashContainer) dashContainer.style.display = "block";
          input.value = "";
          await handlers.refreshCheckup();
        } else {
          if (errorMsg && errorContainer) {
            errorMsg.textContent =
              data.message || "Senha administrativa incorreta.";
            errorContainer.style.display = "flex";
          }
          input.value = "";
          input.focus();
        }
      } catch (err) {
        console.error("Erro na autenticação de checkup:", err);
        if (errorMsg && errorContainer) {
          errorMsg.textContent =
            "Erro ao se comunicar com o servidor. Tente novamente.";
          errorContainer.style.display = "flex";
        }
      } finally {
        if (btn) {
          btn.disabled = false;
          mount(
            btn,
            <>
              <i className={"ph-bold ph-lock-key-open"}></i>
              {" Desbloquear Diagnóstico"}
            </>,
          );
        }
      }
    };
    handlers.refreshCheckup = async function () {
      const listEl = document.getElementById("checkupTablesList");
      const scanBtn = document.getElementById("btnScanAgain");
      if (scanBtn) {
        scanBtn.disabled = true;
        mount(
          scanBtn,
          <>
            <i className={"ph-bold ph-arrows-clockwise checkup-spin"}></i>
            {" Diagnosticando..."}
          </>,
        );
      }
      if (listEl) {
        mount(
          listEl,
          <>
            {"\n                "}
            <div className={"checkup-loading-state"}>
              {"\n                    "}
              <i className={"ph-bold ph-circle-notch checkup-spin"}></i>
              {"\n                    "}
              <span>
                {
                  "Executando verificação de integridade nas tabelas e chaves..."
                }
              </span>
              {"\n                "}
            </div>
            {"\n            "}
          </>,
        );
      }
      try {
        const res = await fetch("/dashboard/checkup/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": getCsrfToken(),
          },
        });
        if (!res.ok) {
          throw new Error("Falha ao obter diagnóstico.");
        }
        const data = await res.json();
        renderCheckupResults(data);
      } catch (err) {
        console.error("Erro ao rodar checkup:", err);
        if (listEl) {
          mount(
            listEl,
            <>
              {"\n                    "}
              <div
                className={"checkup-alert-error"}
                style={styleFrom("display: flex;")}
              >
                {"\n                        "}
                <i className={"ph-bold ph-warning-circle"}></i>
                {"\n                        "}
                <span>
                  {"Não foi possível completar o diagnóstico: "}
                  {err.message}
                </span>
                {"\n                    "}
              </div>
              {"\n                "}
            </>,
          );
        }
      } finally {
        if (scanBtn) {
          scanBtn.disabled = false;
          mount(
            scanBtn,
            <>
              <i className={"ph-bold ph-arrows-clockwise"}></i>
              {" Escanear Novamente"}
            </>,
          );
        }
      }
    };
    function renderCheckupResults(data) {
      const totalTablesEl = document.getElementById("valTotalTables");
      const healthyTablesEl = document.getElementById("valHealthyTables");
      const issuesEl = document.getElementById("valTotalIssues");
      if (totalTablesEl)
        totalTablesEl.textContent = String(data.totalTables || 0);
      if (healthyTablesEl)
        healthyTablesEl.textContent = String(data.healthyTables || 0);
      if (issuesEl) issuesEl.textContent = String(data.totalIssues || 0);
      const backupDetailsEl = document.getElementById("backupBannerDetails");
      if (backupDetailsEl && data.backupStatus) {
        const bs = data.backupStatus;
        if (bs.lastBackup) {
          const dateStr = new Date(bs.lastBackup).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          });
          const lastBackup =
            bs.backups && bs.backups.length > 0 ? bs.backups[0] : null;
          const tipo = lastBackup?.tipo || "json";
          let iconHtml = "";
          let tipoLabel = "";
          if (tipo === "neon-snapshot") {
            iconHtml = (
              <>
                <i
                  className={"ph-bold ph-cloud"}
                  style={styleFrom("color: var(--success-green);")}
                ></i>
              </>
            );
            tipoLabel = "Snapshot Neon";
          } else {
            iconHtml = (
              <>
                <i
                  className={"ph-bold ph-database"}
                  style={styleFrom("color: var(--text-gray);")}
                ></i>
              </>
            );
            tipoLabel = "Backup JSON";
          }
          mount(
            backupDetailsEl,
            <>
              {"\n                    "}
              <span>
                {"Último backup: "}
                {dateStr}
              </span>
              {"\n                    "}
              <span className={"backup-type-badge"}>
                {"\n                        "}
                {iconHtml} {tipoLabel}
                {"\n                    "}
              </span>
              {"\n                    "}
              <span>
                {"Total: "}
                {bs.totalBackups}
                {" arquivos"}
              </span>
              {"\n                "}
            </>,
          );
        } else {
          backupDetailsEl.textContent =
            "Rotina configurada para cada 7 dias. Nenhum backup executado ainda.";
        }
      }
      const listEl = document.getElementById("checkupTablesList");
      if (!listEl) return;
      if (!data.tables || data.tables.length === 0) {
        mount(
          listEl,
          <>
            <p
              style={styleFrom("color: var(--text-gray); text-align: center;")}
            >
              {"Nenhuma tabela registrada para análise."}
            </p>
          </>,
        );
        return;
      }
      let html = [];
      data.tables.forEach((t) => {
        const hasIssue = t.hasIssues;
        const cardClass = hasIssue
          ? "checkup-table-card has-issue"
          : "checkup-table-card";
        const badgeClass = hasIssue
          ? "table-badge-status table-badge-issue"
          : "table-badge-status table-badge-healthy";
        const badgeIcon = hasIssue ? "ph-bold ph-warning" : "ph-bold ph-check";
        const badgeText = hasIssue
          ? `⚠️ ${t.issuesCount} Inconsistência(s)`
          : "Íntegro";
        let issuesHtml = "";
        if (hasIssue && t.issues?.length > 0) {
          issuesHtml = (
            <>
              {"\n                    "}
              <div className={"table-issues-list"}>
                {"\n                        "}
                {t.issues.map((iss, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    {"\n                            "}
                    <div className={"table-issue-item"}>
                      {"\n                                "}
                      <i className={"ph-bold ph-warning-diamond"}></i>
                      {"\n                                "}
                      <span>{iss}</span>
                      {"\n                            "}
                    </div>
                    {"\n                        "}
                  </React.Fragment>
                ))}
                {"\n                    "}
              </div>
              {"\n                "}
            </>
          );
        }
        const fixButtonHtml = hasIssue ? (
          <>
            {"\n                "}
            <button
              type={"button"}
              className={"btn-table-fix"}
              onClick={(event) => {
                handlers.executeSystemRepair("t.table");
              }}
              title={"Corrigir anomalias nesta tabela"}
            >
              {"\n                    "}
              <i className={"ph-bold ph-wrench"}></i>
              {" Corrigir\n                "}
            </button>
            {"\n            "}
          </>
        ) : (
          ""
        );
        html.push(
          <React.Fragment key={html.length}>
            {"\n                "}
            <div className={cardClass} data-table-name={t.table}>
              {"\n                    "}
              <div className={"table-card-header"}>
                {"\n                        "}
                <div className={"table-card-title-group"}>
                  {"\n                            "}
                  <span className={"table-name"}>{t.table}</span>
                  {"\n                            "}
                  <span className={"table-rows-count"}>
                    {t.totalRows}
                    {" registros"}
                  </span>
                  {"\n                        "}
                </div>
                {"\n                        "}
                <div className={"table-card-status-group"}>
                  {"\n                            "}
                  <span className={badgeClass}>
                    {"\n                                "}
                    <i className={badgeIcon}></i> {badgeText}
                    {"\n                            "}
                  </span>
                  {"\n                            "}
                  {fixButtonHtml}
                  {"\n                        "}
                </div>
                {"\n                    "}
              </div>
              {"\n                    "}
              {issuesHtml}
              {"\n                "}
            </div>
            {"\n            "}
          </React.Fragment>,
        );
      });
      mount(listEl, html);
    }
    handlers.executeSystemRepair = async function (table = "all") {
      const confirmMsg =
        table === "all"
          ? "Deseja executar a rotina de saneamento em todas as tabelas? O sistema irá isolar e corrigir registros corrompidos ou órfãos."
          : `Deseja corrigir as inconsistências detectadas na tabela "${table}"?`;
      if (!confirm(confirmMsg)) return;
      const fixAllBtn = document.getElementById("btnFixAll");
      if (fixAllBtn) {
        fixAllBtn.disabled = true;
        mount(
          fixAllBtn,
          <>
            <i className={"ph-bold ph-spinner checkup-spin"}></i>
            {" Corrigindo..."}
          </>,
        );
      }
      try {
        const res = await fetch("/dashboard/checkup/repair", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": getCsrfToken(),
          },
          body: JSON.stringify({
            table,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          openCheckupReportModal([
            ...(data.summary || []),
            ...(data.credenciais || []).map(
              (c) =>
                `Credencial criada para ${c.nome}: e-mail ${c.email}; matrícula ${c.matricula}; senha temporária ${c.senha}. Guarde-a antes de fechar.`,
            ),
          ]);
        } else {
          alert(data.error || "Não foi possível completar o reparo.");
        }
      } catch (err) {
        console.error("Erro ao executar reparo:", err);
        alert("Erro de conexão ao reparar o banco de dados.");
      } finally {
        if (fixAllBtn) {
          fixAllBtn.disabled = false;
          mount(
            fixAllBtn,
            <>
              <i className={"ph-bold ph-wrench"}></i>
              {" Corrigir Todas as Tabelas"}
            </>,
          );
        }
      }
    };
    handlers.triggerManualBackup = async function () {
      const btn = document.getElementById("btnTriggerBackup");
      if (btn) {
        btn.disabled = true;
        mount(
          btn,
          <>
            <i className={"ph-bold ph-spinner checkup-spin"}></i>
            {" Salvando snapshot..."}
          </>,
        );
      }
      try {
        const res = await fetch("/dashboard/checkup/backup-now", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": getCsrfToken(),
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          const backup = data.backup;
          const tipo = backup.tipo || "json";
          const tipoLabel =
            tipo === "neon-snapshot" ? "Snapshot Neon" : "Backup JSON";
          alert(`Backup criado com sucesso: ${backup.filename} (${tipoLabel})`);
          const backupDetailsEl = document.getElementById(
            "backupBannerDetails",
          );
          if (backupDetailsEl && data.status) {
            const dateStr = new Date(backup.createdAt).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            });
            let iconHtml = "";
            let tipoLabelBanner = "";
            if (tipo === "neon-snapshot") {
              iconHtml = (
                <>
                  <i
                    className={"ph-bold ph-cloud"}
                    style={styleFrom("color: var(--success-green);")}
                  ></i>
                </>
              );
              tipoLabelBanner = "Snapshot Neon";
            } else {
              iconHtml = (
                <>
                  <i
                    className={"ph-bold ph-database"}
                    style={styleFrom("color: var(--text-gray);")}
                  ></i>
                </>
              );
              tipoLabelBanner = "Backup JSON";
            }
            mount(
              backupDetailsEl,
              <>
                {"\n                        "}
                <span>
                  {"Último backup: "}
                  {dateStr}
                </span>
                {"\n                        "}
                <span className={"backup-type-badge"}>
                  {"\n                            "}
                  {iconHtml} {tipoLabelBanner}
                  {"\n                        "}
                </span>
                {"\n                        "}
                <span>
                  {"Total: "}
                  {data.status.totalBackups}
                  {" arquivos"}
                </span>
                {"\n                    "}
              </>,
            );
          }
        } else {
          alert(data.error || "Falha ao realizar backup.");
        }
      } catch (err) {
        console.error("Erro no backup manual:", err);
        alert("Erro ao disparar backup manual.");
      } finally {
        if (btn) {
          btn.disabled = false;
          mount(
            btn,
            <>
              <i className={"ph-bold ph-floppy-disk"}></i>
              {" Fazer Backup Agora"}
            </>,
          );
        }
      }
    };
    function openCheckupReportModal(summaryList) {
      const modalEl = document.getElementById("checkupReportModal");
      const listEl = document.getElementById("checkupReportList");
      const subtitleEl = document.getElementById("checkupReportSubtitle");
      if (!modalEl || !listEl) return;
      const count = Array.isArray(summaryList) ? summaryList.length : 0;
      const isClean =
        count === 0 ||
        (count === 1 && summaryList[0].includes("Nenhuma anomalia"));
      if (subtitleEl) {
        if (!isClean) {
          subtitleEl.textContent = `${count} intervenção(ões) realizada(s) com sucesso. Banco de dados otimizado e consistente.`;
        } else {
          subtitleEl.textContent =
            "A base de dados foi verificada e está 100% íntegra.";
        }
      }
      if (!summaryList || summaryList.length === 0) {
        mount(
          listEl,
          <>
            {"\n                "}
            <div className={"checkup-report-item"}>
              {"\n                    "}
              <i className={"ph-bold ph-check-circle"}></i>
              {"\n                    "}
              <div>
                {
                  "Todas as tabelas já estavam consistentes e nenhuma alteração foi necessária."
                }
              </div>
              {"\n                "}
            </div>
            {"\n            "}
          </>,
        );
      } else {
        mount(
          listEl,
          summaryList.map((item) => {
            const escaped = item;
            const isItemClean = escaped.includes("Nenhuma anomalia");
            const formatted = isItemClean
              ? `${escaped}`
              : escaped.replace(/^\[([a-zA-Z0-9_]+)\]/, "");
            return (
              <>
                {"\n                    "}
                <div className={"checkup-report-item"}>
                  {"\n                        "}
                  <i
                    className={
                      "ph-bold " +
                      (isItemClean ? "ph-check-circle" : "ph-check")
                    }
                  ></i>
                  {"\n                        "}
                  <div>{formatted}</div>
                  {"\n                    "}
                </div>
                {"\n                "}
              </>
            );
          }),
        );
      }
      modalEl.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
    handlers.closeCheckupReportModal = function () {
      const modalEl = document.getElementById("checkupReportModal");
      if (modalEl) modalEl.style.display = "none";
      document.body.style.overflow = "";
      handlers.refreshCheckup();
    };
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const checkupReportEl = document.getElementById("checkupReportModal");
        if (checkupReportEl && checkupReportEl.style.display === "flex") {
          handlers.closeCheckupReportModal();
        }
      }
    });
    function escapeHtml(text) {
      if (!text) return "";
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return String(text).replace(/[&<>"']/g, (m) => map[m]);
    }
    loadAccount();
    const requestedSection = new URLSearchParams(window.location.search).get(
      "settings",
    );
    if (requestedSection) {
      openSettings(requestedSection);
      const url = new URL(window.location.href);
      url.searchParams.delete("settings");
      history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  });
  Object.assign(handlers, {});
}
