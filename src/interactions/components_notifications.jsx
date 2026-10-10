import { navigate, refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import { safeSiteLink } from "../services/ui";
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
  let notificacoesInterval;
  let notificacoesAtivas = true;
  function toggleNotificacoes() {
    if (!notificacoesAtivas) {
      return;
    }
    const popup = document.getElementById("notificacoesPopup");
    popup.classList.toggle("mostrar");
    if (popup.classList.contains("mostrar")) {
      carregarNotificacoes();
    }
  }
  async function carregarConfiguracoes() {
    try {
      const response = await fetch("/api/configuracoes-notificacoes");
      if (!response.ok) return;
      const config = await response.json();
      const icon = document.getElementById("sinoIcone");
      if (!icon) return;
      notificacoesAtivas = config.notificacoes_ativas !== false;
      icon.className = notificacoesAtivas ? "fas fa-bell" : "fas fa-bell-slash";
      if (!notificacoesAtivas) {
        const badge = document.getElementById("notificacoesBadge");
        if (badge) badge.style.display = "none";
      } else await carregarNotificacoes();
    } catch {
      if (!lifecycle.active) return;
    } /* Background polling retries on the next interval. */
  }
  async function carregarNotificacoes() {
    try {
      const response = await fetch("/api/notificacoes");
      if (!response.ok) return;
      const data = await response.json();
      if (!document.getElementById("notificacoesLista")) return;
      atualizarListaNotificacoes(Array.isArray(data.notificacoes) ? data.notificacoes : []);
      atualizarBadge(Number(data.totalNaoLidas) || 0);
    } catch {
      if (!lifecycle.active) return;
    }
  }
  function atualizarListaNotificacoes(notificacoes) {
    const lista = document.getElementById("notificacoesLista");
    if (notificacoes.length === 0) {
      mount(lista, <>
          <div className={"notificacoes-vazio"}>
            <i className={"far fa-bell-slash"}></i>
            {" Nenhuma notificação"}
          </div>
        </>);
      return;
    }
    let html = [];
    notificacoes.forEach(notif => {
      const data = new Date(notif.data_criacao).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
      html.push(<React.Fragment key={html.length}>
          {"\n            "}
          <div className={"notificacao-item " + (notif.lida ? "" : "nao-lida")} data-id={notif.id}>
            {"\n                "}
            <div className={"notificacao-icone"} style={styleFrom("background: " + notif.cor + "20; color: " + notif.cor + ";")}>
              {"\n                    "}
              <i className={notif.icone}></i>
              {"\n                "}
            </div>
            {"\n                "}
            <div className={"notificacao-conteudo"} onClick={event => {
            abrirNotificacao(notif.link);
          }}>
              {"\n                    "}
              <div className={"notificacao-titulo"}>{notif.titulo}</div>
              {"\n                    "}
              <div className={"notificacao-mensagem"}>{notif.mensagem}</div>
              {"\n                    "}
              <div className={"notificacao-data"}>{data}</div>
              {"\n                "}
            </div>
            {"\n                "}
            {!notif.lida ? <>
                {"\n                "}
                <div className={"notificacao-acoes"}>
                  {"\n                    "}
                  <button className={"notificacao-marcar"} onClick={event => {
                marcarComoLida(notif.id);
              }} title={"Marcar como lida"}>
                    {"\n                        "}
                    <i className={"fas fa-check"}></i>
                    {"\n                    "}
                  </button>
                  {"\n                "}
                </div>
                {"\n                "}
              </> : ""}
            {"\n            "}
          </div>
          {"\n        "}
        </React.Fragment>);
    });
    mount(lista, html);
  }
  function atualizarBadge(total) {
    const badge = document.getElementById("notificacoesBadge");
    if (total > 0) {
      badge.style.display = "flex";
      badge.textContent = total > 9 ? "9+" : total;
    } else {
      badge.style.display = "none";
    }
  }
  function marcarComoLida(id) {
    fetch(`/api/notificacoes/marcar-lida/${id}`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || ""
      }
    }).then(response => {
      if (!lifecycle.active) return;
      return response.json();
    }).then(data => {
      if (!lifecycle.active) return;
      if (data.success) {
        carregarNotificacoes();
      }
    });
  }
  function marcarTodasLidas() {
    fetch("/api/notificacoes/marcar-todas-lidas", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || ""
      }
    }).then(response => {
      if (!lifecycle.active) return;
      return response.json();
    }).then(data => {
      if (!lifecycle.active) return;
      if (data.success) {
        carregarNotificacoes();
      }
    });
  }
  function abrirNotificacao(link) {
    if (link) {
      navigate(safeSiteLink(link));
    }
  }
  onReady(async function () {
    if (!document.getElementById("notificacoesPopup")) return;
    const configLink = document.getElementById("notificacoesConfigLink");
    if (configLink) {
      configLink.href = "#";
      lifecycle.listen(configLink, "click", event => {
        event.preventDefault();
        document.getElementById("notificacoesPopup")?.classList.remove("mostrar");
        window.dispatchEvent(new CustomEvent("analisai:open-settings", {
          detail: {
            section: "notifications"
          }
        }));
      });
    }
    await carregarConfiguracoes();
    notificacoesInterval = lifecycle.interval(carregarNotificacoes, 30000);
    lifecycle.listen(document, "click", function (event) {
      const container = document.querySelector(".notificacoes-container");
      const popup = document.getElementById("notificacoesPopup");
      if (container && popup && !container.contains(event.target)) {
        popup.classList.remove("mostrar");
      }
    });
  });
  lifecycle.listen(window, "beforeunload", function () {
    if (notificacoesInterval) {
      clearInterval(notificacoesInterval);
    }
  });
  lifecycle.bindHandlers(handlers, {
    toggleNotificacoes,
    carregarConfiguracoes,
    carregarNotificacoes,
    atualizarListaNotificacoes,
    atualizarBadge,
    marcarComoLida,
    marcarTodasLidas,
    abrirNotificacao
  });
  return lifecycle;
}
