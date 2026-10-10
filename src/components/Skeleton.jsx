import React from "react";

export function Skeleton({ className = "", style }) {
  return (
    <div className={`skeleton ${className}`} style={style} aria-hidden="true" />
  );
}

export function SkeletonLines({ count = 3 }) {
  return (
    <div className="skeleton-lines" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          style={{
            height: 16,
            width: index === count - 1 ? "65%" : "100%",
            borderRadius: 6,
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonScreen({
  view,
  as: Tag = "div",
  className = "main-layout",
  children,
}) {
  return (
    <>
      <Tag
        className={`${className} skeleton-route`}
        data-skeleton-view={view}
        aria-busy="true"
        inert
      >
        {children}
      </Tag>
      <span className="skeleton-status" role="status">
        Preparando página…
      </span>
    </>
  );
}

export function SkeletonHeader({ publicPage = false }) {
  return (
    <header className="dash-header skeleton-header">
      <div className="header-left skeleton-header-title">
        <Skeleton style={{ width: publicPage ? 180 : "70%", height: 32 }} />
      </div>
      <div className="header-user">
        {!publicPage && (
          <div className="skeleton-user">
            <Skeleton style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <div className="skeleton-user-lines">
              <Skeleton style={{ height: 16, width: "100%" }} />
              <Skeleton style={{ height: 16, width: "65%" }} />
            </div>
          </div>
        )}
        <Skeleton style={{ width: publicPage ? 140 : 40, height: 40 }} />
      </div>
    </header>
  );
}

export function SkeletonHero({ large = false }) {
  return (
    <section
      className={`welcome-banner skeleton-panel skeleton-hero${large ? " skeleton-hero-large" : ""}`}
    >
      <Skeleton
        style={{ height: large ? 60 : 40, width: "70%", marginBottom: 24 }}
      />
      <div className="skeleton-hero-description">
        <SkeletonLines count={2} />
      </div>
      {large && <SkeletonActions count={2} />}
    </section>
  );
}

export function SkeletonActions({ count = 2, compact = false }) {
  return (
    <div className="skeleton-actions">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          style={{ width: compact ? 100 : 160, height: 48 }}
        />
      ))}
    </div>
  );
}

export function SkeletonSection({
  children,
  titleWidth = "35%",
  className = "",
}) {
  return (
    <section className={`section-container ${className}`}>
      <Skeleton style={{ width: titleWidth, height: 28, marginBottom: 30 }} />
      {children}
    </section>
  );
}

export function SkeletonStats({ count = 4, className = "dash-grid" }) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div className="stats-card skeleton-panel" key={index}>
          <Skeleton style={{ height: 16, width: "65%", marginBottom: 20 }} />
          <Skeleton style={{ height: 48, width: "50%" }} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({
  count = 3,
  className = "dash-grid",
  actions = true,
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div className="stats-card skeleton-panel" key={index}>
          <Skeleton style={{ height: 28, width: "75%", marginBottom: 20 }} />
          <SkeletonLines count={3} />
          {actions && <SkeletonActions count={1} compact />}
        </div>
      ))}
    </div>
  );
}

export function SkeletonRows({ count = 5, className = "ranking-list" }) {
  return (
    <div className={`${className} skeleton-rows`}>
      {Array.from({ length: count }, (_, index) => (
        <div className="ranking-item skeleton-row skeleton-panel" key={index}>
          <Skeleton style={{ width: 48, height: 48, flexShrink: 0 }} />
          <div className="skeleton-row-content">
            <SkeletonLines count={2} />
          </div>
          <Skeleton style={{ width: 100, height: 40, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonToolbar({ actions = 3, search = true }) {
  return (
    <div className="toolbar skeleton-toolbar">
      <SkeletonActions count={actions} compact />
      {search && (
        <Skeleton
          className="skeleton-search"
          style={{ height: 48, width: 280 }}
        />
      )}
    </div>
  );
}

export function SkeletonTable({ columns = 6, count = 5 }) {
  return (
    <div className="table-container skeleton-panel skeleton-table-container">
      <table className="alunos-table skeleton-table" aria-hidden="true">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index}>
                <Skeleton style={{ width: "65%", height: 16 }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }, (_, column) => (
                <td key={column}>
                  <Skeleton
                    style={{
                      width: column === 0 ? "75%" : "50%",
                      height: column === columns - 1 ? 32 : 16,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonField({ height = 48 }) {
  return (
    <div className="skeleton-field">
      <Skeleton style={{ width: "35%", height: 16 }} />
      <Skeleton style={{ height }} />
    </div>
  );
}

export function SkeletonFooter() {
  return (
    <footer className="dash-footer skeleton-footer">
      <SkeletonActions />
      <Skeleton style={{ width: 240, height: 16, margin: "24px auto 0" }} />
    </footer>
  );
}

export function SkeletonSidebarContent({ kind = "professor" }) {
  return (
    <>
      <div className="sidebar-top skeleton-sidebar-top">
        <Skeleton style={{ width: 40, height: 40, marginBottom: 24 }} />
        {Array.from(
          { length: kind === "public" ? 3 : kind === "aluno" ? 7 : 8 },
          (_, index) => (
            <div className="skeleton-side-link" key={index}>
              <Skeleton style={{ width: 26, height: 26, borderRadius: 6 }} />
              <Skeleton style={{ width: 44, height: 16, borderRadius: 6 }} />
            </div>
          ),
        )}
      </div>
      <div className="sidebar-bottom skeleton-sidebar-bottom">
        <Skeleton style={{ width: 40, height: 40, borderRadius: "50%" }} />
        <Skeleton style={{ width: 40, height: 40 }} />
      </div>
    </>
  );
}
