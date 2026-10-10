import React from "react";
import Page from "../pages/Error";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function ErrorSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="error">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
