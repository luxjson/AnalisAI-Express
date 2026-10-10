import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch as fetch } from "../services/api";
import { styleFrom, escapeHtml, mount, richMarkup } from "../services/ui";
export function initialize({ onReady, handlers }) {
  function openEraseModal() {
    document.getElementById("eraseAllModal").style.display = "flex";
  }
  function closeEraseModal() {
    document.getElementById("eraseAllModal").style.display = "none";
  }
  Object.assign(handlers, {
    openEraseModal,
    closeEraseModal,
  });
}
