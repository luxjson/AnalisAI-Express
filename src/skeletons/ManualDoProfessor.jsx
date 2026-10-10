import React from "react";
import Page from "../pages/ManualDoProfessor";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function ManualDoProfessorSkeleton({
  data = {},
  handlers = {},
}) {
  return (
    <SkeletonFrame view="manualDoProfessor">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
