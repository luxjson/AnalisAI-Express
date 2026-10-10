import React from "react";
import Page from "../pages/Manuais";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function ManuaisSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="manuais">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
