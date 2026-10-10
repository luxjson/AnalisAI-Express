import React from "react";
import Page from "../pages/Dashboard_dashboardUsuarios";
import { SkeletonFrame } from "../components/loading-layout";
import { rows } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    usuarios: rows(5, () => ({
      id: 0,
      nome: "",
      email: "",
      cargo: "",
      status: "",
    })),
  };
}
export default function Dashboard_dashboardUsuariosSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardUsuarios">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
