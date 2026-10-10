import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import manifest from "./pages/manifest.json";
import { applyPageStyles, preloadPageStyles } from "./services/page-styles";
import { initializeInteractions, installForms } from "./services/interactions";
import { createInteractionScope } from "./services/lifecycle";
import {
  baseData,
  loadPageData,
  loadSession,
  sessionRedirect,
} from "./services/page-loader";
import {
  installNavigation,
  navigate,
  normalizePath,
  publicRoutes,
  refresh,
  sidebarFor,
  viewFor,
} from "./services/navigation";
import { PersistentSidebarContext } from "./components/layout-context";
import ProfessorSidebar from "./components/Partials_barProfessor";
import StudentSidebar from "./components/Partials_barAluno";
import PageSkeleton, { SidebarSkeleton } from "./components/PageSkeleton";
const pages = import.meta.glob("./pages/*.jsx");
const skeletons = import.meta.glob("./skeletons/*.jsx");
const cache = new Map(),
  resolved = new Map();
export function loadPageModule(view) {
  if (!cache.has(view))
    cache.set(
      view,
      Promise.all([
        pages[`./pages/${manifest[view].component}.jsx`](),
        skeletons[`./skeletons/${manifest[view].component}.jsx`](),
      ])
        .then(([page, skeleton]) => {
          const module = { ...page, Skeleton: skeleton.default };
          resolved.set(view, module);
          return module;
        })
        .catch((error) => {
          cache.delete(view);
          throw error;
        }),
    );
  return cache.get(view);
}
const hrefNow = () => window.location.pathname + window.location.search;
function Shell({ kind, data, handlers, onError }) {
  useLayoutEffect(() => {
    const scope = createInteractionScope();
    initializeInteractions(
      kind === "aluno" ? "partials/barAluno" : "partials/barProfessor",
      handlers,
      {
        scope,
      },
    ).catch((error) => {
      if (scope.active) onError(error.message);
    });
    return () => scope.dispose();
  }, [kind, data.userId, data.userCargo, handlers]);
  const Sidebar = kind === "aluno" ? StudentSidebar : ProfessorSidebar;
  return <Sidebar data={data} handlers={handlers} />;
}
export default function App() {
  const [route, setRoute] = useState(() => ({
    href: hrefNow(),
    revision: 0,
    scroll: null,
  }));
  const [session, setSession] = useState(null),
    [record, setRecord] = useState(null),
    [error, setError] = useState("");
  const handlers = useRef({});
  const url = new URL(route.href, window.location.origin),
    path = normalizePath(url.pathname),
    view = viewFor(path);
  const current =
    record?.href === route.href && record?.revision === route.revision
      ? record
      : null;
  const data = current?.data || baseData(session || {}, url.search);
  const kind = sidebarFor(view, data);
  const authenticated = !!session?.identity;
  useLayoutEffect(() => applyPageStyles(view), [view]);
  useLayoutEffect(() => {
    const formsCleanup = installForms(setError);
    const navigationCleanup = installNavigation(
      (href, options) => {
        setError("");
        setRoute((previous) => ({
          href,
          revision: previous.revision + 1,
          scroll: options.scroll,
        }));
      },
      (key) => {
        preloadPageStyles(key);
        loadPageModule(key).catch(() => {});
      },
    );
    return () => {
      formsCleanup();
      navigationCleanup();
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setError("");
    const modulePromise = loadPageModule(view);
    modulePromise
      .then((module) => {
        if (active)
          setRecord({
            href: route.href,
            revision: route.revision,
            view,
            module,
            data: {
              ...baseData(session || {}, url.search),
              loadingSearch: url.search,
            },
            status: "loading",
          });
      })
      .catch(() => {});
    (async () => {
      let nextSession;
      try {
        nextSession = await loadSession(controller.signal);
      } catch (error) {
        if (error.name === "AbortError" || !publicRoutes.has(path)) throw error;
        nextSession = {
          identity: null,
        };
      }
      if (!active) return;
      setSession(nextSession);
      const redirect = sessionRedirect(path, nextSession.identity);
      if (redirect) {
        navigate(redirect, {
          replace: true,
        });
        return;
      }
      const module = await modulePromise;
      if (!active) return;
      const empty = {
        ...baseData(nextSession, url.search),
        loadingSearch: url.search,
      };
      setRecord({
        href: route.href,
        revision: route.revision,
        view,
        module,
        data: empty,
        status: "loading",
      });
      const loaded = await loadPageData(
        route.href,
        nextSession,
        controller.signal,
      );
      if (!active) return;
      setRecord({
        href: route.href,
        revision: route.revision,
        view,
        module,
        data: loaded,
        status: "ready",
      });
    })().catch((error) => {
      if (!active || error.name === "AbortError") return;
      if (error.status === 401) {
        setSession({
          identity: null,
        });
        navigate("/login", {
          replace: true,
        });
        return;
      }
      setError(error.message || "Não foi possível carregar as informações.");
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [route.href, route.revision, view]);
  useLayoutEffect(() => {
    if (current?.status !== "ready") return;
    const scope = createInteractionScope();
    initializeInteractions(view, handlers.current, {
      scope,
      excludeSidebars: !!kind,
    }).catch((error) => {
      if (scope.active) setError(error.message);
    });
    return () => scope.dispose();
  }, [current?.status, current?.revision, current?.href, view, kind]);
  useLayoutEffect(() => {
    document
      .querySelectorAll(".sidebar .side-link")
      .forEach((link) =>
        link.classList.toggle(
          "active",
          normalizePath(new URL(link.href, window.location.origin).pathname) ===
            path,
        ),
      );
    document.querySelector(".sidebar")?.classList.remove("is-open");
    document
      .querySelector(".mobile-menu-toggle")
      ?.setAttribute("aria-expanded", "false");
    const report = document.getElementById("checkupReportModal");
    if (report) report.style.display = "none";
    document.body.style.overflow = "";
    if (route.scroll?.[1] === 0) window.scrollTo(...route.scroll);
    const settings = document.getElementById("settingsModal");
    settings?.classList.remove("is-open");
    settings?.setAttribute("aria-hidden", "true");
  }, [route.href, kind, authenticated]);
  useEffect(() => {
    if (current?.status !== "ready") return;
    window.dispatchEvent(new window.Event("analisai:route-ready"));
    if (route.scroll) window.scrollTo(...route.scroll);
    if (window.location.hash) {
      try {
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView();
      } catch {}
    }
  }, [current?.status, current?.revision, current?.href]);
  const Page = current?.module?.default;
  return (
    <>
      {kind &&
        (authenticated ? (
          <Shell
            key={
              kind + ":" + session.identity.id + ":" + session.identity.cargo
            }
            kind={kind}
            data={baseData(session, url.search)}
            handlers={handlers.current}
            onError={setError}
          />
        ) : (
          <SidebarSkeleton kind={kind} data={data} />
        ))}
      <PersistentSidebarContext.Provider value={!!kind}>
        {current?.status === "ready" && Page ? (
          <Page data={data} handlers={handlers.current} />
        ) : (
          <PageSkeleton
            view={view}
            module={current?.module || resolved.get(view)}
            data={data}
            handlers={handlers.current}
          />
        )}
      </PersistentSidebarContext.Provider>
      {error && (
        <div
          role="alert"
          className="alert-box error"
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 100000,
          }}
        >
          <span>{error}</span>
          <button type="button" onClick={refresh}>
            Tentar novamente
          </button>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
