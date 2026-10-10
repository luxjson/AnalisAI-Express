import React from "react";
import Page from "../pages/Index";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function IndexSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="index">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
