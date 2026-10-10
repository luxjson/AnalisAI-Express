import React from "react";
import Page from "../pages/Dashboard_dashboardGraficos";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    stats: {
      total: 1,
      apto: 0,
      inapto: 0,
      mediaMedio: 0,
      mediaFundamental: 0,
    },
  };
}
export default function Dashboard_dashboardGraficosSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardGraficos">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
