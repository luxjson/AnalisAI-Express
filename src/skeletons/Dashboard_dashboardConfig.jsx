import React from "react";
import Page from "../pages/Dashboard_dashboardConfig";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    stats: {},
    email: "",
    cargo: data.userCargo || "",
    ultimoAcesso: null,
    config: {},
  };
}
export default function Dashboard_dashboardConfigSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardConfig">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
