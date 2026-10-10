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
  function abrirModalAprovar(id, nome) {
    document.getElementById("formAprovar").action = `/dashboard/solicitacoes-senha/aprovar/${id}`;
    mount(document.getElementById("nomeAprovar"), <>
        <strong>{nome}</strong>
      </>);
    document.getElementById("modalAprovar").style.display = "flex";
  }
  function abrirModalRejeitar(id, nome) {
    document.getElementById("formRejeitar").action = `/dashboard/solicitacoes-senha/rejeitar/${id}`;
    mount(document.getElementById("nomeRejeitar"), <>
        <strong>{nome}</strong>
      </>);
    document.getElementById("modalRejeitar").style.display = "flex";
  }
  function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  lifecycle.bindHandlers(handlers, {
    abrirModalAprovar,
    abrirModalRejeitar,
    fecharModal
  });
  return lifecycle;
}
