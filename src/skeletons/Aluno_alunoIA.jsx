import React from "react";
import Page from "../pages/Aluno_alunoIA";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function Aluno_alunoIASkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="aluno/alunoIA">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
