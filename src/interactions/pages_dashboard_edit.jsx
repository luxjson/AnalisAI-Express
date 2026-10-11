import { refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch } from "../services/api";
import { styleFrom, mount as mountContent } from "../services/ui";
export function initialize({ onReady, handlers, scope }) {
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
  function openLoadingModal() {
    document.getElementById("loadingModal").style.display = "flex";
    document.getElementById("loadingBar").style.width = "0%";
    document.getElementById("loadingStatus").innerText = "0% concluído";
  }
  function closeLoadingModal() {
    document.getElementById("loadingModal").style.display = "none";
  }
  function updateLoadingBar(percent, texto) {
    document.getElementById("loadingBar").style.width = percent + "%";
    document.getElementById("loadingStatus").innerText =
      texto || percent + "% concluído";
  }
  function openErrorModal(titulo, mensagem, detalhe) {
    document.getElementById("errorTitulo").innerText = titulo || "ERRO";
    document.getElementById("errorMensagem").innerText =
      mensagem || "Ocorreu um erro inesperado";
    document.getElementById("errorDetalhe").innerText = detalhe || "";
    document.getElementById("errorModal").style.display = "flex";
  }
  function closeErrorModal() {
    document.getElementById("errorModal").style.display = "none";
  }
  function openImportModal() {
    document.getElementById("importModal").style.display = "flex";
    document.getElementById("fileInput").value = "";
    document.getElementById("fileName").innerText = "";
  }
  function closeImportModal() {
    document.getElementById("importModal").style.display = "none";
  }
  lifecycle.listen(
    document.getElementById("fileInput"),
    "change",
    function (e) {
      const file = e.target.files[0];
      document.getElementById("fileName").innerText = file
        ? `📄 ${file.name}`
        : "";
    },
  );
  const dropArea = document.querySelector(".file-drop-area");
  if (dropArea) {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      lifecycle.listen(dropArea, eventName, preventDefaults, false);
    });
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    lifecycle.listen(dropArea, "drop", function (e) {
      const file = e.dataTransfer.files[0];
      document.getElementById("fileInput").files = e.dataTransfer.files;
      document.getElementById("fileName").innerText = file
        ? `📄 ${file.name}`
        : "";
    });
  }
  function openPreviewModal() {
    document.getElementById("previewImportModal").style.display = "flex";
  }
  function closePreviewModal() {
    document.getElementById("previewImportModal").style.display = "none";
  }
  lifecycle.listen(
    document.getElementById("fileInput"),
    "change",
    function (e) {
      const file = e.target.files[0];
      document.getElementById("fileName").innerText = file
        ? `📄 ${file.name}`
        : "";
    },
  );
  let alunosParaImportar = [];
  async function importarPlanilha() {
    const file = document.getElementById("fileInput").files[0];
    if (!file)
      return openErrorModal("ERRO", "Selecione um arquivo primeiro!", "");
    try {
      const data = new FormData();
      data.append("arquivo", file);
      const response = await fetch("/backend/alunos/importacoes/preview", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      alunosParaImportar = result.alunos;
      let previewHtml = [];
      alunosParaImportar.slice(0, 5).forEach((aluno) => {
        previewHtml.push(
          <React.Fragment key={previewHtml.length}>
            <tr>
              <td
                style={styleFrom(
                  "padding: 8px; border-bottom: 1px solid #222; color: #fff;",
                )}
              >
                {aluno.nome}
              </td>

              <td
                style={styleFrom(
                  "padding: 8px; border-bottom: 1px solid #222; color: #888;",
                )}
              >
                {aluno.ano_escolar}
              </td>

              <td
                style={styleFrom(
                  "padding: 8px; border-bottom: 1px solid #222; color: #888;",
                )}
              >
                {aluno.competencias.length}
              </td>
            </tr>
          </React.Fragment>,
        );
      });
      if (alunosParaImportar.length > 5) {
        previewHtml.push(
          <React.Fragment key={previewHtml.length}>
            <tr>
              <td
                colSpan={"3"}
                style={styleFrom(
                  "padding: 8px; text-align: center; color: #888;",
                )}
              >
                {"... mais "}
                {alunosParaImportar.length - 5}
                {" alunos"}
              </td>
            </tr>
          </React.Fragment>,
        );
      }
      mount(document.getElementById("previewList"), previewHtml);
      mount(
        document.getElementById("previewCount"),
        `${alunosParaImportar.length} alunos encontrados`,
      );
      closeImportModal();
      openPreviewModal();
    } catch (error) {
      if (!lifecycle.active) return;
      openErrorModal("ERRO AO PROCESSAR", error.message, "");
    }
  }
  async function confirmarImportacao() {
    if (alunosParaImportar.length === 0) return;
    closePreviewModal();
    openLoadingModal();
    updateLoadingBar(10, "Preparando dados...");
    const response = await fetch("/dashboard/importar-dados-completos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document.querySelector('meta[name="csrf-token"]')?.content || "",
      },
      body: JSON.stringify({
        alunos: alunosParaImportar,
      }),
    });
    updateLoadingBar(70, "Salvando no banco de dados...");
    const resultado = await response.json();
    if (resultado.sucesso) {
      updateLoadingBar(100, "Importação concluída!");
      lifecycle.timeout(() => {
        closeLoadingModal();
        if (resultado.credenciais && resultado.credenciais.length > 0) {
          abrirModalCredenciais(resultado.credenciais);
        } else {
          refresh();
        }
      }, 500);
    } else {
      closeLoadingModal();
      openErrorModal("ERRO NA IMPORTAÇÃO", resultado.erro, "");
    }
  }
  function abrirModalCredenciais(credenciais) {
    const modal = document.getElementById("credenciaisModal");
    const lista = document.getElementById("credenciaisLista");
    let html = [];
    credenciais.forEach((cred) => {
      html.push(
        <React.Fragment key={html.length}>
          <tr style={styleFrom("border-bottom: 1px solid #222;")}>
            <td style={styleFrom("padding: 10px; color: #fff;")}>
              {cred.nome}
            </td>

            <td style={styleFrom("padding: 10px; color: #ccc;")}>
              {cred.email}
            </td>

            <td style={styleFrom("padding: 10px; color: #ccc;")}>
              {cred.matricula}
            </td>

            <td
              style={styleFrom(
                "padding: 10px; color: #ff0101; font-weight: bold;",
              )}
            >
              {cred.senha}
            </td>
          </tr>
        </React.Fragment>,
      );
    });
    html = (
      <>
        {"\n        "}
        <div
          style={styleFrom(
            "max-height: 400px; overflow-y: auto; margin: 20px 0;",
          )}
        >
          {"\n            "}
          <table
            style={styleFrom(
              "width:100%; border-collapse: collapse; font-size: 0.85rem;",
            )}
          >
            <thead>
              <tr style={styleFrom("border-bottom: 2px solid #333;")}>
                <th
                  style={styleFrom(
                    "padding: 10px; text-align: left; color: #888;",
                  )}
                >
                  {"Nome"}
                </th>

                <th
                  style={styleFrom(
                    "padding: 10px; text-align: left; color: #888;",
                  )}
                >
                  {"E-mail"}
                </th>

                <th
                  style={styleFrom(
                    "padding: 10px; text-align: left; color: #888;",
                  )}
                >
                  {"Matrícula"}
                </th>

                <th
                  style={styleFrom(
                    "padding: 10px; text-align: left; color: #888;",
                  )}
                >
                  {"Senha"}
                </th>
              </tr>
            </thead>

            <tbody>{html}</tbody>
          </table>
          {"\n        "}
        </div>
        {"\n        "}
        <div style={styleFrom("display: flex; gap: 10px; margin-top: 20px;")}>
          {"\n            "}
          <button
            onClick={(event) => {
              fecharModalCredenciais();
            }}
            className={"btn-secondary-dash"}
            style={styleFrom("flex:1; justify-content:center;")}
          >
            {"Fechar"}
          </button>
          {"\n            "}
          <button
            onClick={(event) => {
              copiarCredenciais();
            }}
            className={"btn-secondary-dash"}
            style={styleFrom("flex:1; justify-content:center;")}
          >
            {"\n                "}
            <i className={"fas fa-copy"}></i>
            {" Copiar Tudo\n            "}
          </button>
          {"\n        "}
        </div>
        {"\n    "}
      </>
    );
    mount(lista, html);
    modal.style.display = "flex";
  }
  function fecharModalCredenciais() {
    document.getElementById("credenciaisModal").style.display = "none";
    refresh();
  }
  function copiarCredenciais() {
    const linhas = document.querySelectorAll("#credenciaisLista tbody tr");
    let texto = "";
    linhas.forEach((tr) => {
      const tds = tr.querySelectorAll("td");
      texto += `${tds[0].textContent} | ${tds[1].textContent} | ${tds[2].textContent} | ${tds[3].textContent}\n`;
    });
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        if (!lifecycle.active) return;
        alert("Credenciais copiadas para a área de transferência!");
      })
      .catch((error) => lifecycle.reportError(error));
  }
  lifecycle.listen(
    document.getElementById("competenciasSearchInput"),
    "keyup",
    function () {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll(".competencia-card").forEach((card) => {
        const studentName = card.getAttribute("data-aluno-nome") || "";
        card.style.display = studentName.includes(searchTerm) ? "" : "none";
      });
    },
  );
  lifecycle.listen(
    document.getElementById("chartSearchInput"),
    "keyup",
    function () {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll(".chart-card").forEach((card) => {
        const studentName = card.getAttribute("data-aluno-nome") || "";
        card.style.display = studentName.includes(searchTerm) ? "" : "none";
      });
    },
  );
  function openExportModal() {
    document.getElementById("exportSuccessModal").style.display = "flex";
  }
  function closeExportModal() {
    document.getElementById("exportSuccessModal").style.display = "none";
  }
  function openFilter() {
    document.getElementById("filterModal").style.display = "flex";
  }
  function closeFilter() {
    document.getElementById("filterModal").style.display = "none";
  }
  function openAddModal() {
    document.getElementById("addAlunoModal").style.display = "flex";
  }
  function closeAddModal() {
    document.getElementById("addAlunoModal").style.display = "none";
  }
  function openEditModal(id, nome, presenca) {
    fetch(`/dashboard/aluno-dados/${id}`)
      .then((response) => {
        if (!lifecycle.active) return;
        if (!response.ok) throw new Error("Falha ao carregar dados");
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        document.getElementById("editAlunoId").value = id;
        document.getElementById("editAlunoIdComp").value = id;
        document.getElementById("editNomeAluno").innerText = nome.toUpperCase();
        document.getElementById("editPresencaInput").value = presenca;
        const loginInfo = document.getElementById("loginInfo");
        if (loginInfo) {
          mount(
            loginInfo,
            <>
              {"\n                    "}
              <div
                style={styleFrom(
                  "background: #151515; padding: 15px; border-radius: 12px; border: 1px solid #333; ",
                )}
              >
                {"\n                        "}
                <p
                  style={styleFrom(
                    "color: #888; font-size: 0.7rem; text-transform: uppercase; margin-bottom: 12px;",
                  )}
                >
                  {"Credenciais do Aluno"}
                </p>
                {"\n                        "}
                <p
                  style={styleFrom(
                    "color: #fff; margin-bottom: 10px; font-size: 0.9rem;",
                  )}
                >
                  {"\n                            "}
                  <i
                    className={"fas fa-envelope"}
                    style={styleFrom("color: var(--primary-red); width: 20px;")}
                  ></i>
                  {"\n                            "}
                  <strong>{"E-mail:"}</strong> {data.email || "Não cadastrado"}
                  {"\n                        "}
                </p>
                {"\n                        "}
                <p
                  style={styleFrom(
                    "color: #fff; margin-bottom: 12px; font-size: 0.9rem;",
                  )}
                >
                  {"\n                            "}
                  <i
                    className={"fas fa-id-card"}
                    style={styleFrom("color: var(--primary-red); width: 20px;")}
                  ></i>
                  {"\n                            "}
                  <strong>{"Matrícula:"}</strong>{" "}
                  {data.matricula || "Não cadastrada"}
                  {"\n                        "}
                </p>
                {"\n                        "}
                <div
                  style={styleFrom(
                    "border-top: 1px solid #333; padding-top: 12px;",
                  )}
                >
                  {"\n                            "}
                  <p
                    style={styleFrom(
                      "color: #fff; margin-bottom: 8px; font-size: 0.9rem;",
                    )}
                  >
                    {"\n                                "}
                    <i
                      className={"fas fa-lock"}
                      style={styleFrom(
                        "color: var(--primary-red); width: 20px;",
                      )}
                    ></i>
                    {"\n                                "}
                    <strong>{"Senha:"}</strong>{" "}
                    <span id={"senhaAlunoValor"}>
                      {"Não é possível recuperar a senha atual"}
                    </span>
                    {"\n                            "}
                  </p>
                  {"\n                            "}
                  <small
                    style={styleFrom(
                      "display:block;color:#777;line-height:1.4;margin-bottom:10px;",
                    )}
                  >
                    {
                      "A senha atual é armazenada somente como hash. Gere uma nova senha abaixo para visualizar a nova credencial."
                    }
                  </small>
                  {"\n                            "}
                  <button
                    type={"button"}
                    className={"btn-secondary-dash"}
                    style={styleFrom("width:100%;justify-content:center;")}
                    onClick={(event) => {
                      gerarNovaSenhaAluno(id);
                    }}
                  >
                    {"\n                                "}
                    <i className={"fas fa-key"}></i>
                    {" GERAR NOVA SENHA\n                            "}
                  </button>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </div>
              {"\n                "}
            </>,
          );
        }
        carregarCompetencias(id);
        showEditTab("info");
        document.getElementById("editAlunoModal").style.display = "flex";
      })
      .catch((error) => {
        if (!lifecycle.active) return;
        if (!lifecycle.active) return;
        console.error("Erro ao carregar dados:", error);
        lifecycle.reportError(
          new Error("Erro ao carregar dados do aluno."),
        );
      });
  }
  function gerarNovaSenhaAluno(id) {
    const token = document.querySelector('input[name="_csrf"]')?.value;
    if (
      !confirm(
        "Gerar uma nova senha? A senha atual deixará de funcionar imediatamente.",
      )
    )
      return;
    fetch(`/dashboard/gerar-senha-aluno/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              "X-CSRF-Token": token,
            }
          : {}),
      },
      body: JSON.stringify({
        _csrf: token,
      }),
    })
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json().then((data) => {
          if (!lifecycle.active) return;
          return {
            ok: response.ok,
            data,
          };
        });
      })
      .then(({ ok, data }) => {
        if (!lifecycle.active) return;
        if (!ok) throw new Error(data.error || "Erro ao gerar senha");
        const el = document.getElementById("senhaAlunoValor");
        if (el) {
          el.textContent = data.senha;
          el.style.color = "#fff";
          el.style.fontWeight = "700";
          el.style.letterSpacing = "1px";
        }
      })
      .catch((error) => {
        if (!lifecycle.active) return;
        if (!lifecycle.active) return;
        console.error(error);
        lifecycle.reportError(
  new Error(error.message || "Erro ao gerar nova senha."),
);
      });
  }
  function showEditTab(tabName) {
    const contents = document.querySelectorAll("#editAlunoModal .tab-content");
    contents.forEach((content) => {
      content.style.display = "none";
      content.classList.remove("active");
    });
    const buttons = document.querySelectorAll("#editAlunoModal .tab-btn");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    const targetId =
      "edit" + tabName.charAt(0).toUpperCase() + tabName.slice(1) + "Tab";
    const activeContent = document.getElementById(targetId);
    if (activeContent) {
      activeContent.style.display = "block";
      activeContent.classList.add("active");
    }
    const activeBtn = document.getElementById("btn-tab-" + tabName);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  }
  function closeEditModal() {
    document.getElementById("editAlunoModal").style.display = "none";
  }
  function carregarCompetencias(alunoId) {
    fetch(`/dashboard/competencias-aluno/${alunoId}`)
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        const container = document.getElementById("competenciasListContainer");
        if (data.length === 0) {
          mount(
            container,
            <>
              <p style={styleFrom("color: #888; text-align: center;")}>
                {"Nenhuma competência registrada ainda."}
              </p>
            </>,
          );
        } else {
          let html = [];
          data.forEach((comp) => {
            const notaClass = comp.gradeClass;
            html.push(
              <React.Fragment key={html.length}>
                {"\n                                "}
                <div className={"competencia-edit-item"}>
                  {"\n                                    "}
                  <div className={"competencia-edit-info"}>
                    {"\n                                        "}
                    <span className={"competencia-edit-nome"}>{comp.nome}</span>
                    {"\n                                        "}
                    {comp.observacoes ? (
                      <>
                        <small style={styleFrom("color:#888")}>
                          {comp.observacoes}
                        </small>
                      </>
                    ) : (
                      ""
                    )}
                    {"\n                                    "}
                  </div>
                  {"\n                                    "}
                  <div
                    style={styleFrom(
                      "display: flex; align-items: center; gap: 10px;",
                    )}
                  >
                    {"\n                                        "}
                    <span className={"competencia-edit-nota " + notaClass}>
                      {parseFloat(comp.nota).toFixed(1)}
                    </span>
                    {"\n                                        "}
                    <button
                      type={"button"}
                      className={"btn-delete-comp"}
                      onClick={(event) => {
                        deletarCompetencia(comp.id);
                      }}
                    >
                      {"\n                                            "}
                      <i
                        className={"ph-bold ph-trash"}
                        aria-hidden={"true"}
                      ></i>
                      {"\n                                        "}
                    </button>
                    {"\n                                    "}
                  </div>
                  {"\n                                "}
                </div>
                {"\n                            "}
              </React.Fragment>,
            );
          });
          mount(container, html);
        }
      })
      .catch((error) => {
        if (!lifecycle.active) return;
        if (!lifecycle.active) return;
        console.error("Erro:", error);
        mount(
          document.getElementById("competenciasListContainer"),
          <>
            <p style={styleFrom("color: #ff0101; text-align: center;")}>
              {"Erro ao carregar competências."}
            </p>
          </>,
        );
      });
  }
  async function deletarCompetencia(id) {
    if (!confirm("Remover esta competência?")) return;
    const response = await fetch(`/dashboard/deletar-competencia/${id}`, {
      method: "POST",
      headers: {
        "X-CSRF-Token":
          document.querySelector('meta[name="csrf-token"]')?.content || "",
      },
    });
    if (response.ok) refresh();
  }
  onReady(() => {
    const dataAlunos = getPageData("dashboard-edit-data") || [];
    dataAlunos.forEach((aluno) => {
      const canvas = document.getElementById(`chart-${aluno.id}`);
      if (!canvas || !aluno.competencias || aluno.competencias.length === 0)
        return;
      const ctx = canvas.getContext("2d");
      const labels = aluno.competencias.map((c) => c.nome.substring(0, 10));
      const valores = aluno.competencias.map((c) => parseFloat(c.nota));
      lifecycle.chart(Chart, ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nota",
              data: valores,
              backgroundColor: aluno.competencias.map((c) => c.gradeChartColor),
              borderColor: "#ff0101",
              borderWidth: 1,
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
          },
        },
      });
    });
  });
  function applyFilter() {
    const selAno = document.getElementById("filterAno").value;
    const selStatus = document.getElementById("filterStatus").value;
    document.querySelectorAll("#alunosTableBody tr").forEach((row) => {
      const ano = row.cells[2].textContent.trim();
      const status = row.cells[6].textContent.trim();
      row.style.display =
        (selAno === "" || ano === selAno) &&
        (selStatus === "" || status === selStatus)
          ? ""
          : "none";
    });
    document
      .querySelectorAll(".chart-card, .competencia-card")
      .forEach((card) => {
        const nomeAluno =
          card.querySelector("h3")?.textContent.replace("ALUNO:", "").trim() ||
          "";
        let encontrou = false;
        document.querySelectorAll("#alunosTableBody tr").forEach((row) => {
          if (row.style.display !== "none") {
            const nomeTabela = row.cells[1].textContent.trim();
            if (nomeTabela === nomeAluno) encontrou = true;
          }
        });
        card.style.display = encontrou ? "" : "none";
      });
    closeFilter();
  }
  function clearFilters() {
    document.getElementById("filterAno").value = "";
    document.getElementById("filterStatus").value = "";
    document
      .querySelectorAll("#alunosTableBody tr, .chart-card, .competencia-card")
      .forEach((el) => (el.style.display = ""));
    closeFilter();
  }
  lifecycle.listen(
    document.getElementById("searchInput"),
    "keyup",
    function () {
      const filter = this.value.toUpperCase();
      document.querySelectorAll("#alunosTableBody tr").forEach((row) => {
        row.style.display = row.cells[1].textContent
          .toUpperCase()
          .includes(filter)
          ? ""
          : "none";
      });
    },
  );
  async function confirmDelete(id, nome) {
    if (confirm(`Remover aluno ${nome}?`)) {
      const response = await fetch(`/dashboard/delete-aluno/${id}`, {
        method: "POST",
        headers: {
          "X-CSRF-Token":
            document.querySelector('meta[name="csrf-token"]')?.content || "",
        },
      });
      if (response.ok) refresh();
    }
  }
  async function exportarTabelaParaExcel() {
    try {
      const response = await fetch("/backend/alunos/exportacoes");
      if (!response.ok) throw new Error("Não foi possível exportar.");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "Relatorio_Completo_AnalisAI.xlsx";
      link.click();
      lifecycle.timeout(() => URL.revokeObjectURL(url), 1000);
      openExportModal();
    } catch (error) {
      if (!lifecycle.active) return;
      openErrorModal("ERRO", error.message, "");
    }
  }
  lifecycle.bindHandlers(handlers, {
    getPageData,
    openLoadingModal,
    closeLoadingModal,
    updateLoadingBar,
    openErrorModal,
    closeErrorModal,
    openImportModal,
    closeImportModal,
    openPreviewModal,
    closePreviewModal,
    importarPlanilha,
    confirmarImportacao,
    abrirModalCredenciais,
    fecharModalCredenciais,
    copiarCredenciais,
    openExportModal,
    closeExportModal,
    openFilter,
    closeFilter,
    openAddModal,
    closeAddModal,
    openEditModal,
    gerarNovaSenhaAluno,
    showEditTab,
    closeEditModal,
    carregarCompetencias,
    deletarCompetencia,
    applyFilter,
    clearFilters,
    confirmDelete,
    exportarTabelaParaExcel,
  });
  return lifecycle;
}
