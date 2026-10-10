import React from "react";
import Page from "../pages/Aluno_alunoCompetencias";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, student, competence } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    aluno: {
      ...student(),
      ...data.aluno,
    },
    stats: {},
    competencias: rows(3, competence),
  };
}
export default function Aluno_alunoCompetenciasSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="aluno/alunoCompetencias">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
