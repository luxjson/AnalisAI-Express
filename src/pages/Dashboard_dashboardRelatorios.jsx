import React, { useEffect, useState } from "react";
import { request, download } from "../services/api";
import { styleFrom } from "../services/ui";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { PageHeader } from "./Dashboard_dashboardEdit.jsx";

export default function Dashboard_dashboardRelatorios({ data, handlers }) {
  const [cargo, setCargo] = useState(data.userCargo || "Professor");
  const [requests, setRequests] = useState(data.solicitacoes || []);
  const [teachers, setTeachers] = useState(data.professores || []);
  const [students, setStudents] = useState(data.alunos || []);
  const [classes, setClasses] = useState(data.turmasDisponiveis || ["9º FUNDAMENTAL", "1º MÉDIO", "2º MÉDIO", "3º MÉDIO"]);
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [turma, setTurma] = useState("");
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState({});
  const [statuses, setStatuses] = useState({});
  const [busyId, setBusyId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setCargo(data.userCargo || "Professor");
    setRequests(data.solicitacoes || []);
    setTeachers(data.professores || []);
    setStudents(data.alunos || []);
    setClasses(data.turmasDisponiveis || ["9º FUNDAMENTAL", "1º MÉDIO", "2º MÉDIO", "3º MÉDIO"]);
  }, [data.userCargo, data.solicitacoes, data.professores, data.alunos, data.turmasDisponiveis]);

  const coordinator = cargo === "Coordenador" || cargo === "Admin";
  const teacherOptions = teachers.filter((teacher) => !turma || (teacher.turmas || []).includes(turma));
  const filteredStudents = students.filter((student) => !turma || student.ano_escolar === turma);

  const reload = async () => {
    const result = await request("/dashboard/relatorios-pedagogicos");
    setCargo(result.userCargo || cargo);
    setRequests(result.solicitacoes || []);
    if (result.professores) setTeachers(result.professores);
    if (result.alunos) setStudents(result.alunos);
    if (result.turmasDisponiveis) setClasses(result.turmasDisponiveis);
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!teacherId || !message.trim() || (!studentId && !turma)) {
      setError("Selecione o professor, informe a turma ou o aluno e descreva o que precisa no relatório.");
      return;
    }
    setSaving(true);
    try {
      const result = await request("/dashboard/relatorios-pedagogicos/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professor_id: Number(teacherId),
          aluno_id: studentId ? Number(studentId) : null,
          turma: studentId ? (students.find((student) => String(student.id) === studentId)?.ano_escolar || turma || null) : turma,
          mensagem: message.trim(),
        }),
      });
      setNotice(result.mensagem || "Solicitação encaminhada.");
      setMessage("");
      await reload();
    } catch (err) {
      setError(err.message || "Não foi possível encaminhar a solicitação.");
    } finally {
      setSaving(false);
    }
  };

  const updateRequest = async (id) => {
    setError("");
    setNotice("");
    setBusyId(id);
    try {
      const currentRequest = requests.find((item) => String(item.id) === String(id));
      const result = await request("/dashboard/relatorios-pedagogicos/" + encodeURIComponent(id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statuses[id] || (currentRequest?.status === "CONCLUIDA" ? "CONCLUIDA" : "EM_ANDAMENTO"),
          resposta: responses[id] ?? currentRequest?.resposta ?? "",
        }),
      });
      setNotice("Solicitação atualizada.");
      setRequests((previous) => previous.map((item) => item.id === id ? { ...item, ...result.solicitacao, resposta: responses[id] ?? item.resposta } : item));
      await reload();
    } catch (err) {
      setError(err.message || "Não foi possível atualizar essa solicitação.");
    } finally {
      setBusyId(null);
    }
  };

  const downloadStudentReport = async (id) => {
    setError("");
    try {
      await download("/dashboard/aluno-relatorio/" + encodeURIComponent(id) + "/pdf", "relatorio-aluno-" + id + ".pdf");
    } catch (err) {
      setError(err.message || "Não foi possível baixar o relatório.");
    }
  };

  return (
    <>
      <Partials_barProfessor data={data} handlers={handlers} />
      <div className="main-layout">
        <PageHeader data={data} handlers={handlers} title={"Relatórios pedagógicos"} />
        <main className="dash-content">
          <section className="section-container">
            <p className="section-label">ACOMPANHAMENTO PEDAGÓGICO</p>
            <h1 className="section-title-2">Relatórios pedagógicos</h1>
            <p style={styleFrom("color:var(--text-gray); max-width:780px; margin-bottom:24px;")}>
              Consulte evidências de desempenho por aluno e competência. Coordenadores podem solicitar relatórios aos professores; professores atualizam o andamento e podem concluir as solicitações.
            </p>
            {error && <div className="alert alert-error" role="alert">{error}</div>}
            {notice && <div className="alert alert-success" role="status">{notice}</div>}

            {coordinator && (
              <section className="dash-card" style={styleFrom("margin-bottom:28px; padding:24px;")}>
                <h2 className="section-title-2">Solicitar relatório a um professor</h2>
                <form onSubmit={submitRequest}>
                  <div className="info-grid">
                    <label className="info-display-item">
                      <span>Turma</span>
                      <select className="form-control" value={turma} onChange={(event) => { setTurma(event.target.value); setStudentId(""); setTeacherId(""); }} required={!studentId}>
                        <option value="">Selecionar turma...</option>
                        {classes.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </label>
                    <label className="info-display-item">
                      <span>Aluno específico (opcional)</span>
                      <select className="form-control" value={studentId} onChange={(event) => { const value = event.target.value; setStudentId(value); const student = students.find((item) => String(item.id) === value); if (student) { setTurma(student.ano_escolar); setTeacherId(""); } }} >
                        <option value="">Relatório geral da turma</option>
                        {filteredStudents.map((student) => <option key={student.id} value={student.id}>{student.nome} — {student.ano_escolar}</option>)}
                      </select>
                    </label>
                    <label className="info-display-item">
                      <span>Professor responsável</span>
                      <select className="form-control" value={teacherId} onChange={(event) => setTeacherId(event.target.value)} required>
                        <option value="">Selecionar professor...</option>
                        {teacherOptions.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.nome}{teacher.turmas?.length ? " — " + teacher.turmas.join(", ") : ""}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="info-display-item" style={styleFrom("display:block; margin-top:18px;")}>
                    <span>O que precisa constar no relatório?</span>
                    <textarea className="form-control" rows={4} maxLength={1000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ex.: analisar as competências em desenvolvimento, a frequência no período e possíveis ações de recuperação." required />
                  </label>
                  <div style={styleFrom("margin-top:18px;")}>
                    <button type="submit" className="btn-secondary-dash" disabled={saving}>
                      <i className={saving ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"} aria-hidden="true"></i> {saving ? " ENVIANDO..." : " ENCAMINHAR SOLICITAÇÃO"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            <section className="section-container">
              <h2 className="section-title-2">{coordinator ? "Solicitações encaminhadas" : "Solicitações recebidas"}</h2>
              <div className="table-container">
                <table className="alunos-table">
                  <thead><tr><th>DATA</th><th>{coordinator ? "PROFESSOR" : "SOLICITANTE"}</th><th>ALUNO / TURMA</th><th>DETALHES</th><th>STATUS</th><th>RELATÓRIO</th></tr></thead>
                  <tbody>
                    {requests.map((item) => {
                      const requestId = item.id;
                      const targetStudentId = item.aluno_id || item.alunoId;
                      const visibleName = item.aluno_nome || (item.turma ? item.turma : "Turma não informada");
                      return (
                        <tr key={requestId}>
                          <td>{item.data_solicitacao ? new Date(item.data_solicitacao).toLocaleDateString("pt-BR") : "—"}</td>
                          <td>{coordinator ? (item.professor_nome || "Professor") : (item.solicitante_nome || "Coordenação")}</td>
                          <td>{visibleName}</td>
                          <td>
                            <p>{item.mensagem}</p>
                            {item.resposta && <p style={styleFrom("color:var(--text-gray); margin-top:8px;")}>Resposta: {item.resposta}</p>}
                            {!coordinator && (
                              <div style={styleFrom("display:grid; gap:8px; min-width:200px;")}>
                                <select className="form-control" value={statuses[requestId] || (item.status === "CONCLUIDA" ? "CONCLUIDA" : "EM_ANDAMENTO")} onChange={(event) => setStatuses((previous) => ({ ...previous, [requestId]: event.target.value }))}>
                                  <option value="EM_ANDAMENTO">Em andamento</option>
                                  <option value="CONCLUIDA">Concluída</option>
                                </select>
                                <textarea className="form-control" rows={2} maxLength={2000} placeholder="Resposta / resumo do relatório" value={responses[requestId] ?? item.resposta ?? ""} onChange={(event) => setResponses((previous) => ({ ...previous, [requestId]: event.target.value }))} />
                                <button type="button" className="btn-secondary-dash" onClick={() => updateRequest(requestId)} disabled={busyId === requestId}>{busyId === requestId ? "SALVANDO..." : "ATUALIZAR"}</button>
                              </div>
                            )}
                          </td>
                          <td>{item.status || "PENDENTE"}</td>
                          <td>
                            {targetStudentId
                              ? <button type="button" className="btn-secondary-dash" onClick={() => downloadStudentReport(targetStudentId)}><i className="fas fa-file-pdf" aria-hidden="true"></i> PDF DO ALUNO</button>
                              : <span>Solicitação de turma</span>}
                          </td>
                        </tr>
                      );
                    })}
                    {!requests.length && <tr><td colSpan={6}>Nenhuma solicitação de relatório no momento.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>

            {coordinator && (
              <section className="section-container" style={styleFrom("margin-top:34px;")}>
                <h2 className="section-title-2">Relatório individual de qualquer aluno</h2>
                <p style={styleFrom("color:var(--text-gray); margin-bottom:16px;")}>Gere o PDF mais recente com o histórico de competências, notas e frequência calculada a partir das aulas registradas.</p>
                <div className="table-container">
                  <table className="alunos-table">
                    <thead><tr><th>ALUNO</th><th>TURMA</th><th>RELATÓRIO</th></tr></thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.nome}</td>
                          <td>{student.ano_escolar}</td>
                          <td><button type="button" className="btn-secondary-dash" onClick={() => downloadStudentReport(student.id)}><i className="fas fa-file-pdf" aria-hidden="true"></i> BAIXAR PDF</button></td>
                        </tr>
                      ))}
                      {!filteredStudents.length && <tr><td colSpan={3}>Nenhum aluno disponível.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            <footer className="dash-footer">
              <div className="footer-actions">
                <a href="/dashboard/edit" className="btn-secondary-dash"><i className="fas fa-arrow-left" aria-hidden="true"></i> EDITOR DE NOTAS</a>
                <a href="/dashboard/frequencia" className="btn-secondary-dash"><i className="fas fa-calendar-check" aria-hidden="true"></i> FREQUÊNCIA</a>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}
