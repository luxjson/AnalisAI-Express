import { createInteractionScope } from "../services/lifecycle";
import { Chart } from "chart.js/auto";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
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
  var historicoData = getPageData("aluno-evolucao-data") || [];
  var myChart;
  onReady(function () {
    var ctx = document.getElementById("evolucaoChart")?.getContext("2d");
    if (!ctx) return;
    var labels = historicoData.map(function (i) {
      return i.data;
    });
    var medias = historicoData.map(function (i) {
      return parseFloat(i.media_dia) || 0;
    });
    myChart = lifecycle.chart(Chart, ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sua Média",
            data: medias,
            borderColor: "#217346",
            backgroundColor: "rgba(33, 115, 70, 0.1)",
            borderWidth: 4,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: historicoData.map((i) => i.gradeColor),
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: "rgba(255,255,255,0.05)",
            },
            ticks: {
              color: "#888",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#888",
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#151515",
            titleColor: "#fff",
            borderColor: "#333",
            borderWidth: 1,
          },
        },
      },
    });
  });
  function mudarPeriodo(periodo, botao) {
    document
      .querySelectorAll(".periodo-btn")
      .forEach((btn) => btn.classList.remove("active"));
    botao.classList.add("active");
    var hoje = new Date();
    var dadosFiltrados = [];
    if (periodo === "7d") {
      var lim = new Date();
      lim.setDate(hoje.getDate() - 7);
      dadosFiltrados = filtrarData(lim);
    } else if (periodo === "30d") {
      var lim = new Date();
      lim.setDate(hoje.getDate() - 30);
      dadosFiltrados = filtrarData(lim);
    } else if (periodo === "90d") {
      var lim = new Date();
      lim.setDate(hoje.getDate() - 90);
      dadosFiltrados = filtrarData(lim);
    } else {
      dadosFiltrados = historicoData;
    }
    myChart.data.labels = dadosFiltrados.map((i) => i.data);
    myChart.data.datasets[0].data = dadosFiltrados.map((i) =>
      parseFloat(i.media_dia),
    );
    myChart.data.datasets[0].pointBackgroundColor = dadosFiltrados.map(
      (i) => i.gradeColor,
    );
    myChart.update();
  }
  function filtrarData(limite) {
    return historicoData.filter(function (item) {
      var p = item.data.split("/");
      return new Date(p[2], p[1] - 1, p[0]) >= limite;
    });
  }
  lifecycle.bindHandlers(handlers, {
    getPageData,
    mudarPeriodo,
    filtrarData,
  });
  return lifecycle;
}
