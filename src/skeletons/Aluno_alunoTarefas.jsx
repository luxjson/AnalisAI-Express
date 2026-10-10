import React from "react";
import Page from "../pages/Aluno_alunoTarefas";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, student, task } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    aluno: {
      ...student(),
      ...data.aluno,
    },
    stats: {},
    tarefas: rows(3, task),
  };
}
export default function Aluno_alunoTarefasSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="aluno/alunoTarefas">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
