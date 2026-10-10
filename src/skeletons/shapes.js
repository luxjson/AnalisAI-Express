export const rows = (length, create) =>
  Array.from({ length }, (_, index) => create(index));
export const competence = () => ({
  id: 0,
  nome: "",
  categoria: "",
  nota: 0,
  gradeClass: "skeleton",
  observacoes: " ",
  data_registro: "1970-01-01",
  data_formatada: "",
});
export const student = () => ({
  id: 0,
  nome: "",
  email: "",
  ano_escolar: "",
  idade: 0,
  presenca: 0,
  matricula: "",
  media_competencias: 0,
  nivel: "",
  nivelClass: "skeleton",
  competencias: rows(2, competence),
});
export const ranking = () => ({
  nome: "",
  total_avaliacoes: 0,
  media: 0,
  gradeClass: "skeleton",
});
export const task = () => ({
  id: 0,
  tarefa_aluno_id: 0,
  titulo: "",
  descricao: " ",
  turma: "",
  prioridade: "MEDIA",
  status: "PENDENTE",
  data_entrega: "1970-01-01",
  data_limite: "1970-01-01",
  data_limite_formatada: "",
  professor_nome: "",
  competencia_nome: "",
  total_alunos: 0,
  concluidas: 0,
  entregues: 0,
  devolvidas: 0,
  atrasadas: 0,
  feedback: "",
  nota: null,
});
export function calendarShape(search = "") {
  const params = new URLSearchParams(search),
    today = new Date();
  const month = Number(params.get("mes")),
    year = Number(params.get("ano"));
  const mes =
    Number.isInteger(month) && month >= 1 && month <= 12
      ? month
      : today.getMonth() + 1;
  const ano =
    Number.isInteger(year) && year >= 1900 && year <= 2200
      ? year
      : today.getFullYear();
  const filters = { mes, ano, turma: params.get("turma") || "" };
  return {
    filtros: filters,
    calendar: {
      startWeek: new Date(Date.UTC(ano, mes - 1, 1)).getUTCDay(),
      days: rows(new Date(Date.UTC(ano, mes, 0)).getUTCDate(), (i) => ({
        dia: i + 1,
        date: `${ano}-${String(mes).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
        eventos: [],
        feriados: [],
      })),
    },
  };
}
