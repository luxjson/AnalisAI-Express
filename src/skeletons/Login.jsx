import React from "react";
import Page from "../pages/Login";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function LoginSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="login">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
