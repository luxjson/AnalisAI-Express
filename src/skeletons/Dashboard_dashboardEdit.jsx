import React from "react";
import Page from "../pages/Dashboard_dashboardEdit";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, student, competence } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    alunos: rows(5, student),
    listaCompetencias: rows(1, competence),
  };
}
export default function Dashboard_dashboardEditSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardEdit">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
