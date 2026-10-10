import React, { createContext, useContext } from "react";

const LoadingContext = createContext(null);

export function SkeletonFrame({ view, children }) {
  return (
    <LoadingContext.Provider value={view}>
      {children}
      <span className="skeleton-status" role="status">
        Preparando informações…
      </span>
    </LoadingContext.Provider>
  );
}

export function LoadingValue({ value, slot, width = "12ch", known = false }) {
  const view = useContext(LoadingContext);
  if (!view || (known && value !== null && value !== undefined && value !== ""))
    return <>{value}</>;
  return (
    <span
      className="skeleton-shape skeleton-value"
      data-skeleton-slot={slot}
      aria-hidden="true"
      style={{ width }}
    >
      {"\u00a0"}
    </span>
  );
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
  if (!view) return <Tag {...props}>{children}</Tag>;
  const loading = {
    ...(root
      ? {
          className: `${props.className || ""} skeleton-route`,
          inert: true,
          "aria-busy": true,
          "data-skeleton-view": view,
        }
      : {}),
    ...(tone ? { "data-skeleton-tone": true } : {}),
    ...(fill ? { "data-skeleton-fill": true } : {}),
    ...(options ? { "data-skeleton-options": true } : {}),
  };
  return (
    <Tag {...props} {...loading}>
      {children}
    </Tag>
  );
}

export function PageDataScript(props) {
  const view = useContext(LoadingContext);
  return view ? null : <script {...props} />;
}

export function LoadingCanvas({ variant = "plot", frame = false, ...props }) {
  const view = useContext(LoadingContext);
  if (!view) return <canvas {...props} />;
  return (
    <canvas
      {...props}
      className={`${props.className || ""} skeleton-canvas skeleton-${variant}`}
      aria-hidden="true"
      data-skeleton-chart={props.id}
      data-skeleton-frame={frame || undefined}
    />
  );
}
