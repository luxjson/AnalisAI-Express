import React, { createContext, useContext } from "react";

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

export function LoadingValue({ value, slot, width = "12ch" }) {
  const view = useContext(LoadingContext);
  if (!view) return <>{value}</>;
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

function maskText(children) {
  return React.Children.map(children, (child) => {
    if (
      (typeof child !== "string" && typeof child !== "number") ||
      !String(child).trim()
    )
      return child;
    return (
      <span className="skeleton-copy" aria-hidden="true">
        {child}
      </span>
    );
  });
}

function placeholderKind(tag, props) {
  if (
    ["button", "input", "select", "textarea", "summary"].includes(tag) ||
    (tag === "a" && /(?:^|\s)btn(?:-|\s|$)/.test(props.className || ""))
  )
    return "control";
  if (tag === "i") return "icon";
  if (["img", "svg", "video", "iframe", "object"].includes(tag)) return "media";
  return undefined;
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
  const kind = placeholderKind(Tag, props);
  const rawText = ["option", "textarea", "title", "style"].includes(Tag);
  if (Tag === "script") return null;
  const loading = {
    ...(Tag === "iframe" ? { src: undefined, srcDoc: "" } : {}),
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
    ...(kind && !(Tag === "input" && props.type === "hidden")
      ? { "data-skeleton-kind": kind, "aria-hidden": true, inert: true }
      : {}),
  };
  return (
    <Tag {...props} {...loading}>
      {rawText ? children : maskText(children)}
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
