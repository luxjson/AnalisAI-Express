import React from "react";
import Page from "../pages/ManualDoAluno";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function ManualDoAlunoSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="manualDoAluno">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
