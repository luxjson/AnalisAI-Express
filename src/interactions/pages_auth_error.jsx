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
  function openEraseModal() {
    document.getElementById("eraseAllModal").style.display = "flex";
  }
  function closeEraseModal() {
    document.getElementById("eraseAllModal").style.display = "none";
  }
  lifecycle.bindHandlers(handlers, {
    openEraseModal,
    closeEraseModal
  });
  return lifecycle;
}
