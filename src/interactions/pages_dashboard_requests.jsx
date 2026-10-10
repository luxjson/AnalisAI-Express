import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch as fetch } from "../services/api";
import { styleFrom, escapeHtml, mount, richMarkup } from "../services/ui";
export function initialize({ onReady, handlers }) {
  function abrirModalAprovar(id, nome) {
    document.getElementById("formAprovar").action =
      `/dashboard/solicitacoes-senha/aprovar/${id}`;
    mount(
      document.getElementById("nomeAprovar"),
      <>
        <strong>{nome}</strong>
      </>,
    );
    document.getElementById("modalAprovar").style.display = "flex";
  }
  function abrirModalRejeitar(id, nome) {
    document.getElementById("formRejeitar").action =
      `/dashboard/solicitacoes-senha/rejeitar/${id}`;
    mount(
      document.getElementById("nomeRejeitar"),
      <>
        <strong>{nome}</strong>
      </>,
    );
    document.getElementById("modalRejeitar").style.display = "flex";
  }
  function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  Object.assign(handlers, {
    abrirModalAprovar,
    abrirModalRejeitar,
    fecharModal,
  });
}
