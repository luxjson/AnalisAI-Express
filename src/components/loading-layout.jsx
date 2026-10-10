import React, { createContext, useContext } from "react";
import { SkeletonSidebarContent } from "./Skeleton";

const LoadingContext = createContext(null);

export function SkeletonFrame({ view, children }) {
  return (
    <LoadingContext.Provider value={view}>
      {children}
      {view && (
        <span className="skeleton-status" role="status">
          Preparando página…
        </span>
      )}
    </LoadingContext.Provider>
  );
}

export function LoadingValue({ value }) {
  return <>{value}</>;
}

export function LoadingElement({
  as: Tag = "div",
  root = false,
  tone = false,
  fill = false,
  options = false,
  children,
  ...props
}) {
  const view = useContext(LoadingContext);
  if (view && root && Tag === "aside") {
    return (
      <Tag
        {...props}
        className={`${props.className || ""} skeleton-route`}
        data-skeleton-view={view}
        aria-busy="true"
        inert
      >
        <SkeletonSidebarContent
          kind={view.endsWith("aluno") ? "aluno" : "professor"}
        />
      </Tag>
    );
  }
  if (view && Tag === "button") {
    return (
      <Tag
        {...props}
        className={`${props.className || ""} skeleton skeleton-mobile-toggle`}
        aria-hidden="true"
        inert
      />
    );
  }
  return <Tag {...props}>{children}</Tag>;
}

export function PageDataScript(props) {
  return <script {...props} />;
}

export function LoadingCanvas({ variant, frame, ...props }) {
  return <canvas {...props} />;
}
