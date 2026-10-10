const rows = (length, create) =>
  Array.from({ length }, (_, index) => create(index));

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
