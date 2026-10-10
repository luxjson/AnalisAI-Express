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
  function showRanking(tipo) {
    document.querySelectorAll(".ranking-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".ranking-content").forEach(content => content.classList.remove("active"));
    if (tipo === "geral") {
      document.querySelectorAll(".ranking-tab")[0].classList.add("active");
      document.getElementById("rankingGeral").classList.add("active");
    } else if (tipo === "medio") {
      document.querySelectorAll(".ranking-tab")[1].classList.add("active");
      document.getElementById("rankingMedio").classList.add("active");
    } else {
      document.querySelectorAll(".ranking-tab")[2].classList.add("active");
      document.getElementById("rankingFundamental").classList.add("active");
    }
  }
  lifecycle.bindHandlers(handlers, {
    showRanking
  });
  return lifecycle;
}
