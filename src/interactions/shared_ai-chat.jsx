import { navigate, refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch } from "../services/api";
import { styleFrom, escapeHtml, mount as mountContent, unmount, richMarkup } from "../services/ui";
import { ProfessorChatWelcome, StudentChatWelcome } from "../components/ChatWelcome.jsx";
export function initialize({
  onReady,
  handlers,
  scope
}) {
  const lifecycle = scope || createInteractionScope();
  const fetch = lifecycle.fetch(apiFetch);
  const mount = lifecycle.mount(mountContent);
  (function () {
    const chat = document.querySelector(".ai-chat");
    if (!chat) return;
    const endpoint = chat.dataset.endpoint;
    const form = chat.querySelector(".ai-form");
    const input = form.querySelector("textarea");
    const messages = chat.querySelector(".ai-messages");
    const historyPanel = chat.querySelector(".ai-history");
    const historyList = chat.querySelector(".ai-history-list");
    const Welcome = endpoint === "/api/ia/aluno/chat" ? StudentChatWelcome : ProfessorChatWelcome;
    let conversationId = null;
    let sending = false;
    async function getCsrfToken() {
      const tokenResponse = await fetch("/api/csrf-token", {
        cache: "no-store"
      });
      const tokenData = await tokenResponse.json().catch(() => {
        if (!lifecycle.active) return;
        return {};
      });
      if (!tokenResponse.ok || !tokenData.csrfToken) {
        throw new Error(tokenData.error || "Não foi possível validar a sessão.");
      }
      const meta = document.querySelector('meta[name="csrf-token"]');
      if (meta) meta.content = tokenData.csrfToken;
      return tokenData.csrfToken;
    }
    async function csrfFetch(url, options = {}) {
      const token = await getCsrfToken();
      const headers = new Headers(options.headers || {});
      headers.set("X-CSRF-Token", token);
      let response = await fetch(url, {
        ...options,
        headers
      });
      if (response.status !== 403) return response;
      const preview = await response.clone().json().catch(() => {
        if (!lifecycle.active) return;
        return {};
      });
      if (preview.error !== "Token CSRF inválido.") return response;
      const refreshedToken = await getCsrfToken();
      headers.set("X-CSRF-Token", refreshedToken);
      response = await fetch(url, {
        ...options,
        headers
      });
      return response;
    }
    function resizeInput() {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
    }
    function escapeHtml(value) {
      return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]);
    }
    function renderAssistantText(value) {
      return richMarkup(value);
    }
    window.renderAssistantMarkdown = renderAssistantText;
    function addMessage(text, type) {
      chat.classList.add("has-messages");
      const element = document.createElement("div");
      element.className = `ai-message ai-message-${type}`;
      if (type === "assistant" || type === "system") mount(element, renderAssistantText(text));else element.textContent = text;
      messages.appendChild(element);
      messages.scrollTop = messages.scrollHeight;
      return element;
    }
    function addGradeAction(action) {
      const element = document.createElement("div");
      element.className = "ai-grade-action";
      mount(element, <>
          <div>
            <strong>{"Confirmar alteração?"}</strong>
            <span></span>
          </div>
          <button type={"button"}>
            <i className={"fas fa-check"}></i>
            {" Aplicar"}
          </button>
        </>);
      element.querySelector("span").textContent = `${action.alunoNome} · ${action.competenciaNome} · nota ${action.nota}`;
      lifecycle.listen(element.querySelector("button"), "click", async event => {
        const button = event.currentTarget;
        button.disabled = true;
        try {
          const response = await fetch("/api/ia/professor/alterar-nota", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
              ...action,
              confirm: true
            })
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Não foi possível alterar a nota.");
          element.classList.add("is-done");
          mount(button, <>
                <i className={"fas fa-check"}></i>
                {" Aplicada"}
              </>);
          addMessage(data.message, "assistant");
        } catch (error) {
          if (!lifecycle.active) return;
          button.disabled = false;
          addMessage(error.message, "error");
        }
      });
      messages.appendChild(element);
      messages.scrollTop = messages.scrollHeight;
    }
    function clearContent(container) {
      // Appended messages and history cards have their own React roots.
      for (const element of [...container.children]) unmount(element);
      unmount(container);
      container.replaceChildren();
    }
    function setMessages(conversationMessages) {
      clearContent(messages);
      chat.classList.add("has-messages");
      conversationMessages.forEach(message => addMessage(message.text, message.role === "model" ? "assistant" : "user"));
    }
    function closeHistory() {
      historyPanel.classList.remove("is-open");
      historyPanel.setAttribute("aria-hidden", "true");
    }
    function formatDate(value) {
      return new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short"
      });
    }
    function renderHistory(conversations) {
      clearContent(historyList);
      if (!conversations.length) {
        mount(historyList, <>
            <div className={"ai-history-empty"}>
              <p>{"Nenhuma conversa salva ainda."}</p>
            </div>
          </>);
        return;
      }
      conversations.forEach(conversation => {
        const item = document.createElement("div");
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.className = "ai-history-item";
        mount(item, <>
            <span className={"ai-history-item-icon"}>
              <i className={"fas fa-message"}></i>
            </span>
            <span className={"ai-history-item-copy"}>
              <strong></strong>
              <small>
                {conversation.fixado ? "Fixado · " : ""}
                {formatDate(conversation.data_atualizacao)}
              </small>
            </span>
            <span className={"ai-history-item-actions"}>
              <button type={"button"} data-action={"fixar"} title={"Fixar conversa"}>
                <i className={"fas fa-thumbtack"}></i>
              </button>
              <button type={"button"} data-action={"renomear"} title={"Renomear conversa"}>
                <i className={"fas fa-pen"}></i>
              </button>
              <button type={"button"} data-action={"apagar"} title={"Apagar conversa"}>
                <i className={"fas fa-trash"}></i>
              </button>
            </span>
          </>);
        item.querySelector("strong").textContent = conversation.titulo;
        lifecycle.listen(item, "click", () => {
          conversationId = conversation.id;
          setMessages(conversation.messages || []);
          closeHistory();
        });
        lifecycle.listen(item, "keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            item.click();
          }
        });
        item.querySelectorAll("[data-action]").forEach(actionButton => lifecycle.listen(actionButton, "click", async event => {
          event.stopPropagation();
          const action = actionButton.dataset.action;
          let titulo;
          if (action === "renomear") {
            titulo = window.prompt("Nome da conversa:", conversation.titulo);
            if (!titulo || !titulo.trim()) return;
          }
          if (action === "apagar" && !window.confirm("Apagar esta conversa e todas as mensagens?")) return;
          actionButton.disabled = true;
          try {
            const response = await csrfFetch(`/api/ia/historico/${conversation.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
              },
              body: JSON.stringify({
                acao: action,
                titulo
              })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Não foi possível atualizar a conversa.");
            if (action === "apagar") {
              item.remove();
              if (conversationId === conversation.id) newChat().catch(error => {
                if (!lifecycle.active) return;
                return addMessage(error.message, "error");
              });
            } else if (action === "renomear") {
              conversation.titulo = data.conversation.titulo;
              item.querySelector("strong").textContent = conversation.titulo;
            } else {
              conversation.fixado = data.conversation.fixado;
              await openHistory();
            }
          } catch (error) {
            if (!lifecycle.active) return;
            addMessage(error.message, "error");
          } finally {
            if (!lifecycle.active) return;
            actionButton.disabled = false;
          }
        }));
        historyList.appendChild(item);
      });
    }
    async function openHistory() {
      historyPanel.classList.add("is-open");
      historyPanel.setAttribute("aria-hidden", "false");
      clearContent(historyList);
      mount(historyList, <>
          <div className={"ai-history-loading"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </>);
      try {
        const response = await fetch("/api/ia/historico");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar o histórico.");
        renderHistory(data.conversations || []);
      } catch (error) {
        if (!lifecycle.active) return;
        mount(historyList, <>
            <div className={"ai-history-empty"}>
              <i className={"fas fa-triangle-exclamation"}></i>
              <p>{error.message}</p>
            </div>
          </>);
      }
    }
    async function newChat() {
      if (sending) return;
      conversationId = null;
      clearContent(messages);
      mount(messages, <Welcome />);
      chat.classList.remove("has-messages");
      closeHistory();
      input.value = "";
      resizeInput();
      input.focus();
    }
    async function sendMessage(message) {
      const cleanMessage = message.trim();
      if (!cleanMessage || sending) return;
      sending = true;
      addMessage(cleanMessage, "user");
      input.value = "";
      resizeInput();
      input.disabled = true;
      const loading = addMessage("Analisando os dados...", "loading");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({
            message: cleanMessage,
            conversationId
          })
        });
        const data = await response.json();
        loading.remove();
        if (data.conversationId) conversationId = data.conversationId;
        if (!response.ok) throw new Error(data.error || "Não foi possível obter uma resposta.");
        addMessage(data.answer, "assistant");
        if (data.action?.type === "update_grade") addGradeAction(data.action);
        conversationId = data.conversationId || conversationId;
      } catch (error) {
        if (!lifecycle.active) return;
        loading.remove();
        addMessage(error.message, "error");
      } finally {
        if (!lifecycle.active) return;
        sending = false;
        input.disabled = false;
        input.focus();
      }
    }
    lifecycle.listen(form, "submit", event => {
      event.preventDefault();
      sendMessage(input.value);
    });
    lifecycle.listen(chat.querySelector("[data-new-chat]"), "click", () => newChat().catch(error => {
      if (!lifecycle.active) return;
      return addMessage(error.message, "error");
    }));
    lifecycle.listen(chat.querySelector("[data-history]"), "click", openHistory);
    chat.querySelectorAll("[data-close-history]").forEach(element => lifecycle.listen(element, "click", closeHistory));
    lifecycle.listen(input, "input", resizeInput);
    lifecycle.listen(input, "keydown", event => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });
    lifecycle.listen(messages, "click", event => {
      const button = event.target.closest?.("button[data-prompt]");
      if (button && messages.contains(button)) sendMessage(button.dataset.prompt);
    });
    resizeInput();
  })();
  lifecycle.bindHandlers(handlers, {});
  return lifecycle;
}
