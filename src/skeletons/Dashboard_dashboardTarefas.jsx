import React from "react";
import Page from "../pages/Dashboard_dashboardTarefas";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, task } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    stats: {},
    filtros: {
      turma: "",
      status: "",
    },
    tarefas: rows(3, task),
    alunos: [],
    listaCompetencias: [],
  };
}
export default function Dashboard_dashboardTarefasSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardTarefas">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
