import React from "react";
import Page from "../pages/Dashboard_dashboardMain";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, student, ranking } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    alunos: rows(5, student),
    rankingGeral: rows(5, ranking),
    rankingMedio: rows(5, ranking),
    rankingFundamental: rows(5, ranking),
  };
}
export default function Dashboard_dashboardMainSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardMain">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
