import React from "react";
import Page from "../pages/Dashboard_dashboardCalendario";
import { SkeletonFrame } from "../components/loading-layout";
import { rows, calendarShape } from "./shapes";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
    ...calendarShape(data.loadingSearch),
    tipos: rows(3, () => ({
      tipo: "",
      total: 0,
      cor: "var(--color-skeleton)",
    })),
    eventos: rows(3, () => ({
      id: 0,
      titulo: "",
      data_inicio: "1970-01-01",
      data_fim: "1970-01-01",
      cor: "var(--color-skeleton)",
    })),
    feriados: [],
  };
}
export default function Dashboard_dashboardCalendarioSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="dashboard/dashboardCalendario">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
