import React from "react";
import { SkeletonFrame } from "./loading-layout";
import ProfessorSidebar from "./Partials_barProfessor";
import StudentSidebar from "./Partials_barAluno";

export function SidebarSkeleton({ kind = "professor", data = {} }) {
  const Sidebar = kind === "aluno" ? StudentSidebar : ProfessorSidebar;
  return (
    <SkeletonFrame view={"sidebar/" + kind}>
      <Sidebar
        data={{ ...data, csrfToken: data.csrfToken || "" }}
        handlers={{}}
      />
    </SkeletonFrame>
  );
}

export default function PageSkeleton({
  view,
  module,
  data = {},
  handlers = {},
}) {
  const Skeleton = module?.Skeleton;
  return Skeleton ? (
    <Skeleton data={data} handlers={handlers} />
  ) : (
    <span className="skeleton-status" role="status" data-pending-layout={view}>
      Preparando página…
    </span>
  );
}
