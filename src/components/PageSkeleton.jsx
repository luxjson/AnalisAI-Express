import React from "react";
import { Skeleton, SkeletonScreen, SkeletonSidebarContent } from "./Skeleton";

export function SidebarSkeleton({ kind = "professor" }) {
  return (
    <>
      <div
        className="mobile-menu-toggle skeleton skeleton-mobile-toggle"
        aria-hidden="true"
        inert
      />
      <SkeletonScreen as="aside" view={"sidebar/" + kind} className="sidebar">
        <SkeletonSidebarContent kind={kind} />
      </SkeletonScreen>
    </>
  );
}

export default function PageSkeleton({
  view,
  module,
  data = {},
  handlers = {},
}) {
  const PageLoadingComponent = module?.Skeleton;
  return PageLoadingComponent ? (
    <PageLoadingComponent data={data} handlers={handlers} />
  ) : (
    <SkeletonScreen view={view} className="main-layout">
      <Skeleton style={{ width: "45%", height: 42, marginBottom: 40 }} />
      <Skeleton style={{ width: "100%", height: 180 }} />
    </SkeletonScreen>
  );
}
