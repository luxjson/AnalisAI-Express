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
  function abrirModalEnvio(tarefaAlunoId, titulo) {
    document.getElementById("tarefaTituloEnvio").innerText = titulo;
    document.getElementById("formEnvioTarefa").action = `/aluno/tarefas/enviar/${tarefaAlunoId}`;
    document.getElementById("modalEnvioTarefa").style.display = "flex";
  }
  function fecharModalEnvio() {
    document.getElementById("modalEnvioTarefa").style.display = "none";
    document.getElementById("formEnvioTarefa").reset();
    document.getElementById("nomeArquivo").innerText = "";
  }
  lifecycle.listen(document.getElementById("arquivoInput"), "change", function (e) {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("nomeArquivo").innerText = `📄 ${file.name}`;
    }
  });
  lifecycle.listen(window, "click", function (event) {
    const modal = document.getElementById("modalEnvioTarefa");
    if (event.target == modal) fecharModalEnvio();
  });
  lifecycle.listen(document.querySelector("form"), "submit", function (e) {
    const inputArquivo = document.querySelector('input[type="file"]');
    if (inputArquivo && inputArquivo.files.length > 0) {
      const arquivo = inputArquivo.files[0];
      const nomeArquivo = arquivo.name;
      const extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf(".")).toLowerCase();
      const extensoesPermitidas = [".pdf", ".doc", ".docx", ".odt", ".xls", ".xlsx", ".csv", ".ppt", ".pptx", ".jpg", ".jpeg", ".png", ".webp", ".txt", ".zip", ".rar"];
      if (!extensoesPermitidas.includes(extensao)) {
        e.preventDefault();
        alert("Tipo de arquivo não permitido! Selecione um arquivo válido.");
        return false;
      }
    }
  });
  lifecycle.bindHandlers(handlers, {
    abrirModalEnvio,
    fecharModalEnvio
  });
  return lifecycle;
}
