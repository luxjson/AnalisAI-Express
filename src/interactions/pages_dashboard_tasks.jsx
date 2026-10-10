import { refresh } from "../services/navigation";
import { createInteractionScope } from "../services/lifecycle";
import { parseCalendarDate } from "../services/ui";
import React from "react";
import { apiFetch } from "../services/api";
import { styleFrom, mount as mountContent } from "../services/ui";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
  const fetch = lifecycle.fetch(apiFetch);
  const mount = lifecycle.mount(mountContent);
  function showEditTaskTab(tabName) {
    document
      .querySelectorAll("#editarTarefaModal .tab-content")
      .forEach((content) => {
        content.style.display = "none";
        content.classList.remove("active");
      });
    document.querySelectorAll("#editarTarefaModal .tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const targetId =
      "editTask" + tabName.charAt(0).toUpperCase() + tabName.slice(1) + "Tab";
    const activeContent = document.getElementById(targetId);
    if (activeContent) {
      activeContent.style.display = "block";
      activeContent.classList.add("active");
    }
    document.getElementById("btn-edit-task-" + tabName).classList.add("active");
  }
  function showTaskTab(tabName) {
    document
      .querySelectorAll("#novaTarefaModal .tab-content")
      .forEach((content) => {
        content.style.display = "none";
        content.classList.remove("active");
      });
    document.querySelectorAll("#novaTarefaModal .tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const targetId =
      "task" + tabName.charAt(0).toUpperCase() + tabName.slice(1) + "Tab";
    const activeContent = document.getElementById(targetId);
    if (activeContent) {
      activeContent.style.display = "block";
      activeContent.classList.add("active");
    }
    document.getElementById("btn-task-" + tabName).classList.add("active");
  }
  function abrirModalNovaTarefa() {
    document.getElementById("novaTarefaModal").style.display = "flex";
  }
  function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  function toggleTodosAlunos() {
    const selecionarTodos = document.getElementById("selecionarTodosAlunos");
    const alunosVisiveis = document.querySelectorAll(
      '#novaTarefaModal .aluno-tarefa-item[style="display: flex"], #novaTarefaModal .aluno-tarefa-item:not([style*="display: none"])',
    );
    alunosVisiveis.forEach((item) => {
      const checkbox = item.querySelector(".aluno-checkbox");
      if (checkbox) {
        checkbox.checked = selecionarTodos.checked;
      }
    });
  }
  function verTarefa(id) {
    fetch(`/dashboard/tarefas/${id}`)
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        let html = [];
        data.alunos.forEach((aluno) => {
          let statusText = "";
          let statusCor = "";
          if (aluno.status_tarefa === "CONCLUIDA") {
            statusText = "CORRIGIDA";
            statusCor = "#217346";
          } else if (aluno.status_tarefa === "ENTREGUE") {
            statusText = "AGUARDANDO CORREÇÃO";
            statusCor = "#217346";
          } else if (aluno.status_tarefa === "DEVOLVIDA") {
            statusText = "DEVOLVIDA";
            statusCor = "#ffa500";
          } else if (aluno.status_tarefa === "ATRASADA") {
            statusText = "ATRASADA";
            statusCor = "#ff0101";
          } else {
            statusText = "PENDENTE";
            statusCor = "#d4a017";
          }
          html.push(
            <React.Fragment key={html.length}>
              {"\n                            "}
              <div
                style={styleFrom(
                  "background:#111; border-radius:8px; padding:15px; margin-bottom:10px;",
                )}
              >
                {"\n                                "}
                <div
                  style={styleFrom(
                    "display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;",
                  )}
                >
                  {"\n                                    "}
                  <div>
                    {"\n                                        "}
                    <span style={styleFrom("color:#fff; font-size:1rem;")}>
                      {aluno.nome}
                    </span>
                    {"\n                                        "}
                    <span
                      style={styleFrom(
                        "color:#888; font-size:0.75rem; margin-left:8px;",
                      )}
                    >
                      {aluno.ano_escolar}
                    </span>
                    {"\n                                    "}
                  </div>
                  {"\n                                    "}
                  <span
                    style={styleFrom(
                      "color:" +
                        statusCor +
                        "; font-size:0.8rem; background:#151515; padding:4px 10px; border-radius:15px;",
                    )}
                  >
                    {"\n                                        "}
                    {statusText}
                    {"\n                                    "}
                  </span>
                  {"\n                                "}
                </div>
                {
                  "\n                                \n                                "
                }
                {aluno.resposta_texto ? (
                  <>
                    {"\n                                    "}
                    <div
                      style={styleFrom(
                        "background:#151515; padding:8px; border-radius:6px; margin-top:8px;",
                      )}
                    >
                      {"\n                                        "}
                      <span style={styleFrom("color:#888; font-size:0.7rem;")}>
                        {"Resposta:"}
                      </span>
                      {"\n                                        "}
                      <p
                        style={styleFrom(
                          "color:#ccc; font-size:0.85rem; margin-top:5px;",
                        )}
                      >
                        {aluno.resposta_texto}
                      </p>
                      {"\n                                    "}
                    </div>
                    {"\n                                "}
                  </>
                ) : (
                  ""
                )}
                {
                  "\n                                \n                                "
                }
                {aluno.resposta_arquivo ? (
                  <>
                    {"\n                                    "}
                    <div
                      style={styleFrom(
                        "background:#151515; padding:8px; border-radius:6px; margin-top:8px;",
                      )}
                    >
                      {"\n                                        "}
                      <span style={styleFrom("color:#888; font-size:0.7rem;")}>
                        {"Arquivo:"}
                      </span>
                      {"\n                                        "}
                      <a
                        href={"/uploads/" + aluno.resposta_arquivo}
                        target={"_blank"}
                        style={styleFrom(
                          "color:#217346; display:block; margin-top:5px; text-decoration:none;",
                        )}
                      >
                        {"\n                                            "}
                        <i className={"fas fa-file"}></i>{" "}
                        {aluno.resposta_arquivo.length > 20
                          ? aluno.resposta_arquivo.substring(0, 15) +
                            "..." +
                            aluno.resposta_arquivo.split(".").pop()
                          : aluno.resposta_arquivo}
                        {"\n                                        "}
                      </a>
                      {"\n                                    "}
                    </div>
                    {"\n                                "}
                  </>
                ) : (
                  ""
                )}
                {
                  "\n                                \n                                "
                }
                {aluno.nota ? (
                  <>
                    {"\n                                    "}
                    <div style={styleFrom("margin-top:8px; text-align:right;")}>
                      {"\n                                        "}
                      <span
                        style={styleFrom(
                          "background:rgba(33,115,70,0.1); color:#217346; padding:4px 12px; border-radius:15px;",
                        )}
                      >
                        {"\n                                            Nota: "}
                        {aluno.nota}
                        {"\n                                        "}
                      </span>
                      {"\n                                    "}
                    </div>
                    {"\n                                "}
                  </>
                ) : (
                  ""
                )}
                {"\n                            "}
              </div>
              {"\n                        "}
            </React.Fragment>,
          );
        });
        html = (
          <>
            {"\n                        "}
            <div style={styleFrom("margin-bottom: 25px;")}>
              {"\n                            "}
              <h3
                style={styleFrom(
                  "color:#fff; font-size:1.3rem; margin-bottom:15px; text-align:center; border-bottom:1px solid #333; padding-bottom:10px;",
                )}
              >
                {"\n                                "}
                {data.tarefa.titulo}
                {"\n                            "}
              </h3>
              {"\n                            \n                            "}
              <p
                style={styleFrom(
                  "color:#888; margin-bottom:20px; line-height:1.6; background:#111; padding:15px; border-radius:8px;",
                )}
              >
                {"\n                                "}
                {data.tarefa.descricao || "Sem descrição"}
                {"\n                            "}
              </p>
              {"\n                            \n                            "}
              <div
                style={styleFrom(
                  "display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-bottom:25px;",
                )}
              >
                {"\n                                "}
                <div
                  style={styleFrom(
                    "background:#111; padding:12px; border-radius:8px;",
                  )}
                >
                  {"\n                                    "}
                  <div
                    style={styleFrom(
                      "color:#666; font-size:0.7rem; text-transform:uppercase; margin-bottom:3px;",
                    )}
                  >
                    {"TURMA"}
                  </div>
                  {"\n                                    "}
                  <div style={styleFrom("color:#fff; font-size:1rem;")}>
                    {data.tarefa.turma}
                  </div>
                  {"\n                                "}
                </div>
                {"\n                                "}
                <div
                  style={styleFrom(
                    "background:#111; padding:12px; border-radius:8px;",
                  )}
                >
                  {"\n                                    "}
                  <div
                    style={styleFrom(
                      "color:#666; font-size:0.7rem; text-transform:uppercase; margin-bottom:3px;",
                    )}
                  >
                    {"DATA DE ENTREGA"}
                  </div>
                  {"\n                                    "}
                  <div style={styleFrom("color:#fff; font-size:1rem;")}>
                    {data.tarefa.data_entrega
                      ? parseCalendarDate(
                          data.tarefa.data_entrega,
                        ).toLocaleDateString("pt-BR")
                      : "Sem data"}
                  </div>
                  {"\n                                "}
                </div>
                {"\n                                "}
                <div
                  style={styleFrom(
                    "background:#111; padding:12px; border-radius:8px;",
                  )}
                >
                  {"\n                                    "}
                  <div
                    style={styleFrom(
                      "color:#666; font-size:0.7rem; text-transform:uppercase; margin-bottom:3px;",
                    )}
                  >
                    {"PRIORIDADE"}
                  </div>
                  {"\n                                    "}
                  <div style={styleFrom("color:#fff; font-size:1rem;")}>
                    {data.tarefa.prioridade}
                  </div>
                  {"\n                                "}
                </div>
                {"\n                                "}
                <div
                  style={styleFrom(
                    "background:#111; padding:12px; border-radius:8px;",
                  )}
                >
                  {"\n                                    "}
                  <div
                    style={styleFrom(
                      "color:#666; font-size:0.7rem; text-transform:uppercase; margin-bottom:3px;",
                    )}
                  >
                    {"STATUS"}
                  </div>
                  {"\n                                    "}
                  <div style={styleFrom("color:#fff; font-size:1rem;")}>
                    {data.tarefa.status}
                  </div>
                  {"\n                                "}
                </div>
                {"\n                            "}
              </div>
              {"\n                            \n                            "}
              <h4
                style={styleFrom(
                  "color:#fff; margin-bottom:15px; font-size:1rem;",
                )}
              >
                {"\n                                "}
                <i className={"fas fa-users"}></i>
                {" ALUNOS ("}
                {data.alunos.length}
                {")\n                            "}
              </h4>
              {"\n                            \n                            "}
              <div
                style={styleFrom(
                  "max-height:400px; overflow-y:auto; padding-right:5px;",
                )}
              >
                {"\n                    "}
                {html}
              </div>
            </div>
          </>
        );
        mount(document.getElementById("tarefaDetalhes"), html);
        document.getElementById("verTarefaModal").style.display = "flex";
      })
      .catch((error) => lifecycle.reportError(error));
  }
  function avaliarTarefa(id) {
    fetch(`/dashboard/tarefas/${id}`)
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        let html = [];
        data.alunos.forEach((aluno) => {
          let statusText = "";
          let statusColor = "";
          let statusBg = "";
          if (aluno.status_tarefa === "CONCLUIDA") {
            statusText = "CONCLUÍDA";
            statusColor = "#217346";
            statusBg = "rgba(33,115,70,0.1)";
          } else if (aluno.status_tarefa === "ENTREGUE") {
            statusText = "AGUARDANDO CORREÇÃO";
            statusColor = "#217346";
            statusBg = "rgba(33,115,70,0.1)";
          } else if (aluno.status_tarefa === "DEVOLVIDA") {
            statusText = "DEVOLVIDA";
            statusColor = "#ffa500";
            statusBg = "rgba(255,165,0,0.1)";
          } else if (aluno.status_tarefa === "ATRASADA") {
            statusText = "ATRASADA";
            statusColor = "#ff0101";
            statusBg = "rgba(255,1,1,0.1)";
          } else {
            statusText = "PENDENTE";
            statusColor = "#d4a017";
            statusBg = "rgba(212,160,23,0.1)";
          }
          function abreviarNomeArquivo(nomeArquivo) {
            if (!nomeArquivo) return "";
            if (nomeArquivo.length <= 25) return nomeArquivo;
            const partes = nomeArquivo.split(".");
            const ext = partes.pop();
            const nome = partes.join(".");
            return nome.substring(0, 15) + "..." + ext;
          }
          html.push(
            <React.Fragment key={html.length}>
              {"\n                    "}
              <div
                style={styleFrom(
                  "background: #111111; border: 2px solid #2e3134; border-radius: 12px; padding: 18px; margin-bottom: 20px;",
                )}
              >
                {"\n                        "}
                <div
                  style={styleFrom(
                    "display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;",
                  )}
                >
                  {"\n                            "}
                  <div>
                    {"\n                                "}
                    <span style={styleFrom("color: #fff; font-size: 1.1rem;")}>
                      {aluno.nome}
                    </span>
                    {"\n                                "}
                    <span
                      style={styleFrom(
                        "color: #888; font-size: 0.8rem; margin-left: 10px;",
                      )}
                    >
                      {aluno.ano_escolar}
                    </span>
                    {"\n                            "}
                  </div>
                  {"\n                            "}
                  <span
                    style={styleFrom(
                      "background: " +
                        statusBg +
                        "; color: " +
                        statusColor +
                        "; padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; border: 2px solid " +
                        statusColor +
                        ";",
                    )}
                  >
                    {"\n                                "}
                    {statusText}
                    {"\n                            "}
                  </span>
                  {"\n                        "}
                </div>
                {"\n                        \n                        "}
                {aluno.data_entrega_aluno ? (
                  <>
                    {"\n                            "}
                    <div
                      style={styleFrom(
                        "background: #151515; border-radius: 8px; padding: 12px; margin-bottom: 15px;",
                      )}
                    >
                      {"\n                                "}
                      <div
                        style={styleFrom(
                          "display: flex; align-items: center; gap: 8px;",
                        )}
                      >
                        {"\n                                    "}
                        <i
                          className={"fas fa-clock"}
                          style={styleFrom(
                            "color: #217346; font-size: 0.9rem;",
                          )}
                        ></i>
                        {"\n                                    "}
                        <span
                          style={styleFrom("color: #888; font-size: 0.85rem;")}
                        >
                          {
                            "\n                                        Entregue em: "
                          }
                          <strong style={styleFrom("color: #fff;")}>
                            {new Date(aluno.data_entrega_aluno).toLocaleString(
                              "pt-BR",
                            )}
                          </strong>
                          {"\n                                    "}
                        </span>
                        {"\n                                "}
                      </div>
                      {"\n                            "}
                    </div>
                    {"\n                        "}
                  </>
                ) : (
                  ""
                )}
                {"\n                        \n                        "}
                {aluno.resposta_texto ? (
                  <>
                    {"\n                            "}
                    <div
                      style={styleFrom(
                        "background: #151515; border-radius: 8px; padding: 15px; margin-bottom: 15px;",
                      )}
                    >
                      {"\n                                "}
                      <span
                        style={styleFrom(
                          "color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;",
                        )}
                      >
                        {"\n                                    "}
                        <i
                          className={"fas fa-quote-right"}
                          style={styleFrom("margin-right: 5px;")}
                        ></i>
                        {"RESPOSTA DO ALUNO:\n                                "}
                      </span>
                      {"\n                                "}
                      <p
                        style={styleFrom(
                          "color: #fff; font-size: 0.9rem; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; margin: 0;",
                        )}
                      >
                        {"\n                                    "}
                        {aluno.resposta_texto}
                        {"\n                                "}
                      </p>
                      {"\n                            "}
                    </div>
                    {"\n                        "}
                  </>
                ) : (
                  ""
                )}
                {"\n                        \n                        "}
                {aluno.resposta_arquivo ? (
                  <>
                    {"\n                            "}
                    <div
                      style={styleFrom(
                        "background: #151515; border-radius: 8px; padding: 12px; margin-bottom: 15px;",
                      )}
                    >
                      {"\n                                "}
                      <span
                        style={styleFrom(
                          "color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;",
                        )}
                      >
                        {"\n                                    "}
                        <i
                          className={"fas fa-paperclip"}
                          style={styleFrom("margin-right: 5px;")}
                        ></i>
                        {"ARQUIVO ANEXADO:\n                                "}
                      </span>
                      {"\n                                "}
                      <a
                        href={"/uploads/" + aluno.resposta_arquivo}
                        target={"_blank"}
                        style={styleFrom(
                          [
                            "color: #217346; text-decoration: none; display: flex; ",
                            "align-items: center; gap: 8px; background: #151515; padding: 8px ",
                            "12px; border-radius: 6px; border: 2px solid #217346;",
                          ].join(""),
                        )}
                      >
                        {"\n                                    "}
                        <i
                          className={"fas fa-file-download"}
                          style={styleFrom("font-size: 1rem;")}
                        ></i>
                        {"\n                                    "}
                        <span
                          style={styleFrom(
                            "word-wrap: break-word; font-size: 0.85rem;",
                          )}
                        >
                          {abreviarNomeArquivo(aluno.resposta_arquivo)}
                        </span>
                        {"\n                                "}
                      </a>
                      {"\n                            "}
                    </div>
                    {"\n                        "}
                  </>
                ) : (
                  ""
                )}
                {"\n                        \n                        "}
                {aluno.status_tarefa === "ENTREGUE" ||
                aluno.status_tarefa === "DEVOLVIDA" ? (
                  <>
                    {"\n                            "}
                    <div
                      style={styleFrom(
                        "display: flex; gap: 10px; margin-top: 15px;",
                      )}
                    >
                      {"\n                                "}
                      <button
                        data-aluno-nome={aluno.nome}
                        onClick={(event) => {
                          mostrarAvaliacao(data.tarefa.id, aluno.id);
                        }}
                        style={styleFrom(
                          [
                            "flex: 1; background: transparent; border: 2px solid #217346; ",
                            "color: #217346; padding: 12px; border-radius: 8px; cursor: ",
                            "pointer; font-size: 0.85rem;transition: all 0.3s; display: flex; ",
                            "align-items: center; justify-content: center; gap: 8px;",
                          ].join(""),
                        )}
                      >
                        {"\n                                    "}
                        <i className={"fas fa-star"}></i>
                        {" AVALIAR\n                                "}
                      </button>
                      {"\n                                "}
                      <button
                        data-aluno-nome={aluno.nome}
                        onClick={(event) => {
                          devolverTarefa(
                            data.tarefa.id,
                            aluno.id,
                            event.currentTarget.dataset.alunoNome,
                          );
                        }}
                        style={styleFrom(
                          [
                            "flex: 1; background: transparent; border: 2px solid #ffa500; ",
                            "color: #ffa500; padding: 12px; border-radius: 8px; cursor: ",
                            "pointer; font-size: 0.85rem; transition: all 0.3s; display: ",
                            "flex; align-items: center; justify-content: center; gap: 8px;",
                          ].join(""),
                        )}
                      >
                        {"\n                                    "}
                        <i className={"fas fa-undo-alt"}></i>
                        {" DEVOLVER\n                                "}
                      </button>
                      {"\n                            "}
                    </div>
                    {"\n                        "}
                  </>
                ) : (
                  ""
                )}
                {"\n                        \n                        "}
                <div
                  id={"avaliacao-" + aluno.id}
                  style={styleFrom(
                    "display: none; margin-top: 15px; padding: 15px; background: #151515; border-radius: 8px;",
                  )}
                >
                  {"\n                            "}
                  <h4
                    style={styleFrom(
                      "color:#fff; margin-bottom:15px; font-size:1rem;",
                    )}
                  >
                    {"Avaliar: "}
                    {aluno.nome}
                  </h4>
                  {"\n                            "}
                  <input
                    type={"number"}
                    id={"nota-" + aluno.id}
                    placeholder={"Nota (0-10)"}
                    min={"0"}
                    max={"10"}
                    step={"0.1"}
                    style={styleFrom(
                      "width: 100%; padding: 12px; background: #151515; border: 2px solid #333; border-radius: 6px; color: #fff; font-size: 1rem; margin-bottom: 10px;",
                    )}
                  />
                  {"\n                            "}
                  <textarea
                    id={"feedback-" + aluno.id}
                    placeholder={"Feedback para o aluno..."}
                    style={styleFrom(
                      [
                        "width: 100%; padding: 12px; background: #151515; border: 2px ",
                        "solid #333; border-radius: 6px; color: #fff; font-size: 0.9rem; ",
                        "min-height: 80px; margin-bottom: 10px; resize: vertical;",
                      ].join(""),
                    )}
                  ></textarea>
                  {"\n                            "}
                  <button
                    onClick={(event) => {
                      salvarAvaliacao(data.tarefa.id, aluno.id);
                    }}
                    style={styleFrom(
                      "width: 100%; background: #217346; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; transition: all 0.3s;",
                    )}
                  >
                    {"\n                                "}
                    <i className={"fas fa-save"}></i>
                    {" SALVAR AVALIAÇÃO\n                            "}
                  </button>
                  {"\n                        "}
                </div>
                {"\n                    "}
              </div>
              {"\n                "}
            </React.Fragment>,
          );
        });
        html = (
          <>
            {"\n                "}
            <h3
              style={styleFrom(
                "color:#fff; margin-bottom:25px; text-align:center; font-size:1.3rem; border-bottom:1px solid #333; padding-bottom:10px;",
              )}
            >
              {"\n                    "}
              {data.tarefa.titulo}
              {"\n                "}
            </h3>
            {"\n                "}
            <div
              style={styleFrom(
                "max-height:500px; overflow-y:auto; padding-right:5px;",
              )}
            >
              {"\n            "}
              {html}
            </div>
          </>
        );
        mount(document.getElementById("avaliarTarefaConteudo"), html);
        document.getElementById("avaliarTarefaModal").style.display = "flex";
      })
      .catch((error) => lifecycle.reportError(error));
  }
  function mostrarAvaliacao(tarefaId, alunoId, alunoNome) {
    const avaliacaoDiv = document.getElementById(`avaliacao-${alunoId}`);
    if (
      avaliacaoDiv.style.display === "none" ||
      avaliacaoDiv.style.display === ""
    ) {
      avaliacaoDiv.style.display = "block";
    } else {
      avaliacaoDiv.style.display = "none";
    }
  }
  function salvarAvaliacao(tarefaId, alunoId) {
    const nota = document.getElementById(`nota-${alunoId}`).value;
    const feedback = document.getElementById(`feedback-${alunoId}`).value;
    if (!nota || nota < 0 || nota > 10) {
      alert("Por favor, insira uma nota válida entre 0 e 10");
      return;
    }
    fetch("/dashboard/tarefas/avaliar-aluno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document.querySelector('meta[name="csrf-token"]')?.content || "",
      },
      body: JSON.stringify({
        tarefa_id: tarefaId,
        aluno_id: alunoId,
        nota: parseFloat(nota),
        feedback: feedback,
      }),
    })
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        if (data.success) {
          alert("Avaliação salva com sucesso!");
          if (data.virou_competencia) {
            alert(
              "Esta nota também foi registrada como competência para o aluno!",
            );
          }
          refresh();
        } else {
          alert("Erro ao salvar avaliação");
        }
      })
      .catch((error) => lifecycle.reportError(error));
  }
  function devolverTarefa(tarefaId, alunoId, alunoNome) {
    if (
      confirm(`Deseja devolver a tarefa para ${alunoNome} fazer correções?`)
    ) {
      fetch("/dashboard/tarefas/devolver-aluno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token":
            document.querySelector('meta[name="csrf-token"]')?.content || "",
        },
        body: JSON.stringify({
          tarefa_id: tarefaId,
          aluno_id: alunoId,
        }),
      })
        .then((response) => {
          if (!lifecycle.active) return;
          return response.json();
        })
        .then((data) => {
          if (!lifecycle.active) return;
          if (data.success) {
            alert("Tarefa devolvida para correção!");
            refresh();
          } else {
            alert("Erro ao devolver tarefa");
          }
        })
        .catch((error) => lifecycle.reportError(error));
    }
  }
  function editarTarefa(id) {
    fetch(`/dashboard/tarefas/${id}`)
      .then((response) => {
        if (!lifecycle.active) return;
        return response.json();
      })
      .then((data) => {
        if (!lifecycle.active) return;
        document.getElementById("editTitulo").value = data.tarefa.titulo;
        document.getElementById("editDescricao").value =
          data.tarefa.descricao || "";
        document.getElementById("editDataEntrega").value = data.tarefa
          .data_entrega
          ? data.tarefa.data_entrega.split("T")[0]
          : "";
        document.getElementById("editPrioridade").value =
          data.tarefa.prioridade;
        document.getElementById("editStatus").value = data.tarefa.status;
        const form = document.getElementById("editarTarefaForm");
        form.action = `/dashboard/tarefas/editar/${id}`;
        document.getElementById("editarTarefaModal").style.display = "flex";
      })
      .catch((error) => lifecycle.reportError(error));
  }
  function excluirTarefa(id) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      const form = document.getElementById("excluirTarefaForm");
      form.action = `/dashboard/tarefas/excluir/${id}`;
      form.requestSubmit();
    }
  }
  lifecycle.listen(window, "click", function (event) {
    if (event.target.classList.contains("modal-overlay")) {
      event.target.style.display = "none";
    }
  });
  lifecycle.listen(
    document.getElementById("turmaSelect"),
    "change",
    function () {
      const turmaSelecionada = this.value;
      const alunosItems = document.querySelectorAll(
        "#novaTarefaModal .aluno-tarefa-item",
      );
      alunosItems.forEach((item) => {
        const alunoTurma = item.getAttribute("data-turma");
        if (turmaSelecionada === "" || alunoTurma === turmaSelecionada) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
          const checkbox = item.querySelector(".aluno-checkbox");
          if (checkbox) checkbox.checked = false;
        }
      });
      document.getElementById("selecionarTodosAlunos").checked = false;
    },
  );
  function abrirModalNovaTarefa() {
    document.getElementById("novaTarefaModal").style.display = "flex";
    document.getElementById("turmaSelect").value = "";
    document
      .querySelectorAll("#novaTarefaModal .aluno-tarefa-item")
      .forEach((item) => {
        item.style.display = "flex";
      });
  }
  lifecycle.bindHandlers(handlers, {
    showEditTaskTab,
    showTaskTab,
    abrirModalNovaTarefa,
    fecharModal,
    toggleTodosAlunos,
    verTarefa,
    avaliarTarefa,
    mostrarAvaliacao,
    salvarAvaliacao,
    devolverTarefa,
    editarTarefa,
    excluirTarefa,
  });
  return lifecycle;
}
