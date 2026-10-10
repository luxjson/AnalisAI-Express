import React from "react";
import Page from "../pages/Aluno_alunoPerfil";
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
    competencias: rows(2, competence),
  };
}
export default function Aluno_alunoPerfilSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="aluno/alunoPerfil">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
