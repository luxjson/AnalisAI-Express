import React from "react";
import Page from "../pages/Aluno_alunoDashboard";
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
    competencias: rows(3, competence),
    mediaGeral: 0,
    mediaGeralClass: "skeleton",
    performanceSummary: {},
  };
}
export default function Aluno_alunoDashboardSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="aluno/alunoDashboard">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
