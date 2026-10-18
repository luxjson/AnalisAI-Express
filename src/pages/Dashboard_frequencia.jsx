import React, { useEffect, useMemo, useState } from "react";
import { request, download } from "../services/api";
import { styleFrom } from "../services/ui";
import Partials_barProfessor from "../components/Partials_barProfessor.jsx";
import Partials_notificacoes from "../components/Partials_notificacoes.jsx";
import { PageHeader } from "./Dashboard_dashboardEdit.jsx";

const defaults = ["9º FUNDAMENTAL", "1º MÉDIO", "2º MÉDIO", "3º MÉDIO"];

function todayLocal() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function Dashboard_frequencia({ data, handlers }) {
  const [turma, setTurma] = useState(data.turma || data.turmas?.[0] || defaults[0]);
  const [date, setDate] = useState(data.data || todayLocal());
  const [start, setStart] = useState(data.horario_inicio || "07:30");
  const [end, setEnd] = useState(data.horario_fim || "08:20");
  const [year, setYear] = useState(Number(data.ano) || new Date().getFullYear());
  const [students, setStudents] = useState(data.alunos || []);
  const [status, setStatus] = useState(() =>
    Object.fromEntries((data.alunos || []).map((student) => [student.id, student.status_registrado || ""])),
  );
  const [justifications, setJustifications] = useState(() =>
    Object.fromEntries((data.alunos || []).map((student) => [student.id, student.justificativa_registrada || ""])),
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [summary, setSummary] = useState(data.resumo || { totalAlunos: (data.alunos || []).length, frequenciaMedia: null, aulasRegistradas: 0 });
  const turmas = data.turmas?.length ? data.turmas : (data.userCargo === "Coordenador" || data.userCargo === "Admin" ? defaults : [turma]);

  useEffect(() => {
    setStudents(data.alunos || []);
    setStatus(Object.fromEntries((data.alunos || []).map((student) => [student.id, student.status_registrado || ""])));
    setJustifications(Object.fromEntries((data.alunos || []).map((student) => [student.id, student.justificativa_registrada || ""])));
    setSummary(data.resumo || { totalAlunos: (data.alunos || []).length, frequenciaMedia: null, aulasRegistradas: 0 });
  }, [data.alunos, data.resumo]);

  const recorded = useMemo(
    () => students.filter((student) => student.total_aulas > 0).length,
    [students],
  );

  const loadAttendance = async (event) => {
    event?.preventDefault();
    setError("");
    setNotice("");
    if (!date || !start || !end || start >= end) {
      setError("Informe uma data e um período válido. O horário final deve ser posterior ao inicial.");
      return;
    }
    setLoading(true);
    try {
      const query = new URLSearchParams({
        turma,
        data: date,
        horario_inicio: start,
        horario_fim: end,
        ano: String(year),
      });
      const result = await request("/dashboard/frequencia?" + query.toString());
      setStudents(result.alunos || []);
      setStatus(Object.fromEntries((result.alunos || []).map((student) => [student.id, student.status_registrado || ""])));
      setJustifications(Object.fromEntries((result.alunos || []).map((student) => [student.id, student.justificativa_registrada || ""])));
      setSummary(result.resumo || {});
    } catch (err) {
      setError(err.message || "Não foi possível carregar a turma.");
    } finally {
      setLoading(false);
    }
  };

  const chooseForAll = (value) => {
    setStatus(Object.fromEntries(students.map((student) => [student.id, value])));
    setNotice(value === "PRESENTE" ? "Todos marcados como presentes. Confira a lista antes de salvar." : "A situação foi aplicada a toda a lista. Confira antes de salvar.");
  };

  const saveAttendance = async () => {
    setError("");
    setNotice("");
    if (!students.length) {
      setError("Não há alunos para registrar nesta turma.");
      return;
    }
    if (students.some((student) => !status[student.id])) {
      setError("Selecione uma situação para cada aluno antes de salvar.");
      return;
    }
    if (students.some((student) => status[student.id] === "JUSTIFICADA" && !justifications[student.id]?.trim())) {
      setError("Informe uma justificativa para cada falta justificada.");
      return;
    }
    setSaving(true);
    try {
      const result = await request("/dashboard/frequencia/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turma,
          data: date,
          horario_inicio: start,
          horario_fim: end,
          alunos: students.map((student) => ({
            aluno_id: student.id,
            status: status[student.id],
            justificativa: justifications[student.id] || "",
          })),
        }),
      });
      setNotice(result.mensagem || "Frequência salva.");
      await loadAttendance();
    } catch (err) {
      setError(err.message || "Não foi possível salvar a frequência.");
    } finally {
      setSaving(false);
    }
  };

  const downloadReport = async (studentId) => {
    setError("");
    try {
      await download("/dashboard/aluno-relatorio/" + encodeURIComponent(studentId) + "/pdf?ano=" + year, "relatorio-aluno-" + studentId + "-" + year + ".pdf");
    } catch (err) {
      setError(err.message || "Não foi possível baixar o relatório.");
    }
  };

  return (
    <>
      <Partials_barProfessor data={data} handlers={handlers} />
      <div className="main-layout">
        <PageHeader data={{ ...data, userCargo: data.userCargo, user: data.user }} handlers={handlers} title={"Frequência dos alunos"} />
        <main className="dash-content">
          <section className="section-container">
            <p className="section-label">EDITOR DE NOTAS / FREQUÊNCIA</p>
            <h1 className="section-title-2">Frequência dos alunos</h1>
            <p style={styleFrom("color:var(--text-gray); max-width:760px; margin-bottom:22px;")}>
              Registre a situação de cada aluno por data e período de aula. Fins de semana e feriados não viram faltas automaticamente; o percentual é calculado usando as aulas registradas.
            </p>
            <form className="toolbar" onSubmit={loadAttendance}>
              <label className="info-display-item">
                <span>Turma</span>
                <select className="form-control" value={turma} onChange={(event) => setTurma(event.target.value)} disabled={data.userCargo === "Professor" && turmas.length < 2}>
                  {turmas.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
              <label className="info-display-item">
                <span>Data da aula</span>
                <input
                  className="form-control"
                  type="date"
                  value={date}
                  onChange={(event) => {
                    const nextDate = event.target.value;
                    setDate(nextDate);
                    if (/^\\d{4}-\\d{2}-\\d{2}$/.test(nextDate))
                      setYear(Number(nextDate.slice(0, 4)));
                  }}
                  required
                />
              </label>
              <label className="info-display-item">
                <span>Início</span>
                <input className="form-control" type="time" value={start} onChange={(event) => setStart(event.target.value)} required />
              </label>
              <label className="info-display-item">
                <span>Fim</span>
                <input className="form-control" type="time" value={end} onChange={(event) => setEnd(event.target.value)} required />
              </label>
              <label className="info-display-item">
                <span>Ano letivo</span>
                <select
                  className="form-control"
                  value={year}
                  onChange={(event) => {
                    const nextYear = Number(event.target.value);
                    setYear(nextYear);
                    const [, month, day] = date.split("-").map(Number);
                    const maxDay = new Date(Date.UTC(nextYear, month, 0)).getUTCDate();
                    setDate(
                      nextYear + "-" +
                      String(month).padStart(2, "0") + "-" +
                      String(Math.min(day || 1, maxDay)).padStart(2, "0"),
                    );
                  }}
                >
                  {[...new Set([year - 1, year, year + 1, Number(date.slice(0, 4))])]
                    .filter((item) => item >= 2000 && item <= 2100)
                    .sort((a, b) => a - b)
                    .map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <button className="btn-secondary-dash" type="submit" disabled={loading}>
                <i className={loading ? "fas fa-spinner fa-spin" : "fas fa-search"} aria-hidden="true"></i> {loading ? " CARREGANDO..." : " CARREGAR"}
              </button>
            </form>
            {error && <div className="alert alert-error" role="alert">{error}</div>}
            {notice && <div className="alert alert-success" role="status">{notice}</div>}
            <div className="dash-grid" style={styleFrom("margin:22px 0;")}>
              <div className="stats-card"><h3>ALUNOS NA TURMA</h3><p className="stats-number">{students.length}</p></div>
              <div className="stats-card"><h3>FREQUÊNCIA MÉDIA</h3><p className="stats-number">{summary.frequenciaMedia == null ? "—" : summary.frequenciaMedia + "%"}</p></div>
              <div className="stats-card"><h3>ANO CALENDÁRIO</h3><p className="stats-number">{year}: {year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) ? 366 : 365} dias</p></div>
              <div className="stats-card"><h3>ALUNOS COM HISTÓRICO</h3><p className="stats-number">{recorded}</p></div>
            </div>
            <div className="toolbar" style={styleFrom("justify-content:space-between; gap:12px;")}>
              <div className="action-buttons">
                <button type="button" className="btn-secondary-dash" onClick={() => chooseForAll("PRESENTE")}><i className="fas fa-check" aria-hidden="true"></i> MARCAR TODOS PRESENTES</button>
                <button type="button" className="btn-secondary-dash" onClick={() => chooseForAll("FALTA")}><i className="fas fa-user-times" aria-hidden="true"></i> MARCAR TODOS AUSENTES</button>
              </div>
              <button type="button" className="btn-secondary-dash" onClick={saveAttendance} disabled={saving || loading}>
                <i className={saving ? "fas fa-spinner fa-spin" : "fas fa-save"} aria-hidden="true"></i> {saving ? " SALVANDO..." : " SALVAR FREQUÊNCIA"}
              </button>
            </div>
            <div className="table-container">
              <table className="alunos-table">
                <thead><tr><th>ALUNO</th><th>FREQUÊNCIA ANUAL</th><th>FALTAS</th><th>JUSTIFICADAS</th><th>SITUAÇÃO DESTA AULA</th><th>JUSTIFICATIVA</th><th>RELATÓRIO</th></tr></thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.nome}</td>
                      <td>{student.frequencia_anual == null ? "Sem registros" : student.frequencia_anual + "%"}</td>
                      <td>{student.faltas ?? 0}</td>
                      <td>{student.justificadas ?? 0}</td>
                      <td>
                        <select className="form-control" aria-label={"Situação de " + student.nome} value={status[student.id] || ""} onChange={(event) => setStatus((previous) => ({ ...previous, [student.id]: event.target.value }))}>
                          <option value="">Selecionar...</option>
                          <option value="PRESENTE">Presente</option>
                          <option value="FALTA">Falta</option>
                          <option value="JUSTIFICADA">Falta justificada</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control" maxLength={1000} aria-label={"Justificativa de " + student.nome} placeholder="Motivo (se justificada)" value={justifications[student.id] || ""} onChange={(event) => setJustifications((previous) => ({ ...previous, [student.id]: event.target.value }))} disabled={status[student.id] !== "JUSTIFICADA"} />
                      </td>
                      <td><button type="button" className="btn-secondary-dash" onClick={() => downloadReport(student.id)}><i className="fas fa-file-pdf" aria-hidden="true"></i> PDF</button></td>
                    </tr>
                  ))}
                  {!students.length && <tr><td colSpan={7}>{loading ? "Carregando alunos..." : "Nenhum aluno encontrado para esta turma."}</td></tr>}
                </tbody>
              </table>
            </div>
            <footer className="dash-footer">
              <div className="footer-actions">
                <a href="/dashboard/edit" className="btn-secondary-dash"><i className="fas fa-arrow-left" aria-hidden="true"></i> VOLTAR AO EDITOR</a>
                <a href="/dashboard/relatorios-pedagogicos" className="btn-secondary-dash"><i className="fas fa-file-alt" aria-hidden="true"></i> RELATÓRIOS PEDAGÓGICOS</a>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}
