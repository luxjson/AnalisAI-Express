import React from "react";
import Page from "../pages/Termos";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function TermosSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="termos">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
