import React from "react";
import Page from "../pages/Dashboard_dashboardEquipe";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function Dashboard_dashboardEquipeSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardEquipe">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
