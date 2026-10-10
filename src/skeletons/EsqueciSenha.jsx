import React from "react";
import Page from "../pages/EsqueciSenha";
import { SkeletonFrame } from "../components/loading-layout";
export function loadingData(data = {}) {
  return {
    ...data,
    csrfToken: data.csrfToken || "",
  };
}
export default function EsqueciSenhaSkeleton({ data = {}, handlers = {} }) {
  return (
    <SkeletonFrame view="esqueciSenha">
      <Page data={loadingData(data)} handlers={handlers} />
    </SkeletonFrame>
  );
}
