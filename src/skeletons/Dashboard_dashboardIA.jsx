import React from "react";
import Page from "../pages/Dashboard_dashboardIA";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function Dashboard_dashboardIASkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardIA">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
