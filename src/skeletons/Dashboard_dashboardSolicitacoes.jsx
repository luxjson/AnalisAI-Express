import React from "react";
import Page from "../pages/Dashboard_dashboardSolicitacoes";
import { SkeletonFrame } from "../components/loading-layout";
import { rows } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    solicitacoes: rows(3, () => ({
      id: 0,
      nome: "",
      email: "",
      data_solicitacao: "1970-01-01",
    })),
  };
}
export default function Dashboard_dashboardSolicitacoesSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardSolicitacoes">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
