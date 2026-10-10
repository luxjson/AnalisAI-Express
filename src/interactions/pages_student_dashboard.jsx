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
  function getPageData(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || "null");
    } catch (error) {
      if (!lifecycle.active) return;
      console.error("Falha ao ler dados da página.");
      return null;
    }
  }
  onReady(function () {
    const ctx = document.getElementById("radarChart")?.getContext("2d");
    if (!ctx) return;
    const labels = getPageData("aluno-dashboard-data")?.labels || [];
    const valores = getPageData("aluno-dashboard-data")?.valores || [];
    lifecycle.chart(Chart, ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [{
          label: "Seu Desempenho",
          data: valores,
          backgroundColor: "rgba(33, 115, 70, 0.2)",
          borderColor: "#217346",
          borderWidth: 3,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#217346",
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.1)"
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              circular: true
            },
            ticks: {
              display: false,
              maxTicksLimit: 5
            },
            pointLabels: {
              color: "#aaa",
              font: {
                family: "helvetica",
                size: 12,
                weight: "bold"
              }
            },
            suggestedMin: 0,
            suggestedMax: 10
          }
        }
      }
    });
  });
  lifecycle.bindHandlers(handlers, {
    getPageData
  });
  return lifecycle;
}
