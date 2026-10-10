import { navigate, refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch } from "../services/api";
import { styleFrom, escapeHtml, mount as mountContent, richMarkup } from "../services/ui";
export function initialize({
  onReady,
  handlers,
  scope
}) {
  const lifecycle = scope || createInteractionScope();
  const fetch = lifecycle.fetch(apiFetch);
  const mount = lifecycle.mount(mountContent);
  (function () {
    const button = document.getElementById("aiAnalyzeStudent");
    const select = document.getElementById("aiStudentSelect");
    const result = document.getElementById("aiEditorResult");
    if (!button || !select || !result) return;
    const suggestionButtons = document.querySelectorAll("[data-ai-prompt]");
    function escapeHtml(value) {
      return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]);
    }
    function renderMarkdown(value) {
      return richMarkup(value);
    }
    async function analyze(message) {
      if (!select.value) {
        mount(result, <>
            <p>{"Selecione um aluno para iniciar a análise."}</p>
          </>);
        return;
      }
      button.disabled = true;
      suggestionButtons.forEach(item => {
        item.disabled = true;
      });
      mount(result, <>
          <p>
            <em>{"Analisando dados do aluno..."}</em>
          </p>
        </>);
      try {
        const response = await fetch(`/api/ia/professor/aluno/${encodeURIComponent(select.value)}/analisar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({
            message
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível analisar o aluno.");
        mount(result, renderMarkdown(data.answer));
      } catch (error) {
        if (!lifecycle.active) return;
        mount(result, <>
            <p style={styleFrom("color: var(--primary-red);")}>
              {error.message}
            </p>
          </>);
      } finally {
        if (!lifecycle.active) return;
        button.disabled = false;
        suggestionButtons.forEach(item => {
          item.disabled = false;
        });
      }
    }
    lifecycle.listen(button, "click", () => analyze("Faça um diagnóstico pedagógico completo em texto corrido sobre este aluno. Analise situação atual, pontos fortes, prioridades de intervenção e próximos passos práticos."));
    suggestionButtons.forEach(item => lifecycle.listen(item, "click", () => analyze(item.dataset.aiPrompt)));
  })();
  lifecycle.bindHandlers(handlers, {});
  return lifecycle;
}
