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
  function switchTab(tipo) {
    const tabs = document.querySelectorAll(".login-tab");
    const forms = document.querySelectorAll(".login-form");
    const logo = document.getElementById("logoimg");
    tabs.forEach(tab => tab.classList.remove("active", "professor", "aluno"));
    forms.forEach(form => form.classList.remove("active"));
    if (tipo === "professor") {
      const tab = document.querySelector(".login-tab:nth-child(1)");
      tab.classList.add("active", "professor");
      document.getElementById("professorForm").classList.add("active");
      logo.src = "/images/logo3-white.png";
    } else {
      const tab = document.querySelector(".login-tab:nth-child(2)");
      tab.classList.add("active", "aluno");
      document.getElementById("alunoForm").classList.add("active");
      logo.src = "/images/logo3-green.png";
    }
  }
  lifecycle.bindHandlers(handlers, {
    switchTab
  });
  return lifecycle;
}
