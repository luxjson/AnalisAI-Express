import React from "react";
import Page from "../pages/Aluno_alunoEvolucao";
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
    competencias: rows(5, competence),
    categorias: rows(3, () => ({
      categoria: "",
      media: 0,
      gradeClass: "skeleton",
    })),
    historico: [],
  };
}
export default function Aluno_alunoEvolucaoSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="aluno/alunoEvolucao">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
