import React from "react";
import Page from "../pages/API_index";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function API_indexSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="API/index">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
