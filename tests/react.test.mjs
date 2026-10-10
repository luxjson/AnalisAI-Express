import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { JSDOM } from "jsdom";
const root = path.resolve(import.meta.dirname, ".."),
  manifest = JSON.parse(
    fs.readFileSync(path.join(root, "src/pages/manifest.json")),
  ),
  fixtures = JSON.parse(
    fs.readFileSync(path.join(root, "tests/fixtures/pages.json")),
  );
let vite, dom;
before(async () => {
  dom = new JSDOM('<html><body><div id="root"></div></body></html>', {
    url: "http://localhost:5173",
    pretendToBeVisual: true,
  });
  for (const key of [
    "window",
    "document",
    "navigator",
    "location",
    "localStorage",
    "sessionStorage",
    "MutationObserver",
    "CustomEvent",
    "HTMLElement",
    "HTMLFormElement",
    "HTMLInputElement",
    "HTMLSelectElement",
    "Event",
    "File",
    "FileReader",
    "FormData",
    "Blob",
    "getComputedStyle",
  ])
    if (dom.window[key])
      Object.defineProperty(globalThis, key, {
        value: dom.window[key],
        configurable: true,
        writable: true,
      });
  dom.window.scrollTo = () => {};
  globalThis.history = dom.window.history;
  globalThis.alert = () => {};
  globalThis.confirm = () => false;
  globalThis.TestChart = class {
    static defaults = {};
    destroy() {}
    update() {}
  };
  dom.window.HTMLCanvasElement.prototype.getContext = function () {
    return { canvas: this };
  };
  vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    plugins: [
      {
        name: "test-canvas",
        enforce: "pre",
        transform(code, id) {
          if (id.includes("/src/interactions/"))
            return code.replace(
              /import\s*\{\s*Chart\s*\}\s*from\s*["']chart\.js\/auto["'];?/g,
              "const Chart = globalThis.TestChart;",
            );
        },
      },
    ],
  });
});
after(async () => {
  await vite.close();
  dom.window.close();
});
for (const [view, meta] of Object.entries(manifest)) {
  if (view.startsWith("partials/")) continue;
  test("native JSX renders " + view, async () => {
    const { default: Page } = await vite.ssrLoadModule(
      "/src/pages/" + meta.component + ".jsx",
    );
    const data = fixtures[meta.component];
    const html = renderToStaticMarkup(
      React.createElement(Page, { data, handlers: {} }),
    );
    assert.ok(html.length > 100);
    assert.ok(!html.includes("<%"));
    const d = new JSDOM(html).window.document;
    for (const element of d.querySelectorAll('script[type="application/json"]'))
      assert.doesNotThrow(() => JSON.parse(element.textContent));
  });
}
test("student upload validation belongs to the delivery form and cannot block logout", async () => {
  const { default: Page } = await vite.ssrLoadModule(
    "/src/pages/Aluno_alunoTarefas.jsx",
  );
  const { initialize } = await vite.ssrLoadModule(
    "/src/interactions/pages_student_tasks.jsx",
  );
  const { createInteractionScope } = await vite.ssrLoadModule(
    "/src/services/lifecycle.js",
  );
  const container = document.getElementById("root"),
    previousAlert = globalThis.alert;
  container.innerHTML = renderToStaticMarkup(
    React.createElement(Page, {
      data: fixtures.Aluno_alunoTarefas,
      handlers: {},
    }),
  );
  const scope = createInteractionScope(),
    alerts = [];
  try {
    globalThis.alert = (message) => alerts.push(message);
    Object.defineProperty(document.getElementById("arquivoInput"), "files", {
      value: [new File(["test"], "invalid.exe")],
      configurable: true,
    });
    initialize({ scope, handlers: {}, onReady: () => {} });
    const logout = new window.Event("submit", { cancelable: true });
    container.querySelector('form[action="/logout"]').dispatchEvent(logout);
    assert.equal(logout.defaultPrevented, false);
    const delivery = new window.Event("submit", { cancelable: true });
    document.getElementById("formEnvioTarefa").dispatchEvent(delivery);
    assert.equal(delivery.defaultPrevented, true);
    assert.equal(alerts.length, 1);
  } finally {
    scope.dispose();
    globalThis.alert = previousAlert;
    container.innerHTML = "";
  }
});

test("internal links refuse browser-normalized external destinations", async () => {
  const { safeSiteLink } = await vite.ssrLoadModule("/src/services/ui.jsx");
  for (const value of [
    "//example.com",
    "/\\example.com",
    "/\n/example.com",
    "javascript:alert(1)",
  ])
    assert.equal(safeSiteLink(value), "/");
  assert.equal(safeSiteLink("/aluno?aba=senha"), "/aluno?aba=senha");
  assert.equal(safeSiteLink(undefined, "/dashboard"), "/dashboard");
});

test("API client refuses malformed and scalar success responses", async () => {
  const { request } = await vite.ssrLoadModule("/src/services/api.js");
  const previous = globalThis.fetch;
  try {
    for (const body of ["<html>Gateway error</html>", "null", '"unexpected"']) {
      globalThis.fetch = async () => new Response(body, { status: 200 });
      await assert.rejects(
        request("/backend/auth/session"),
        (error) =>
          error.status === 502 &&
          error.message === "Resposta inválida do servidor.",
      );
    }
    globalThis.fetch = async () => new Response("{", { status: 503 });
    await assert.rejects(
      request("/backend/auth/session"),
      (error) => error.status === 503,
    );
  } finally {
    globalThis.fetch = previous;
  }
});

test("aborted API response cannot replace the current CSRF token", async () => {
  const { apiFetch, setCsrfToken } = await vite.ssrLoadModule(
    "/src/services/api.js",
  );
  const previous = globalThis.fetch,
    controller = new AbortController();
  const input = document.createElement("input");
  input.name = "_csrf";
  document.body.append(input);
  try {
    setCsrfToken("current-test-token");
    globalThis.fetch = async () => {
      controller.abort();
      return Response.json({ csrfToken: "stale-test-token" });
    };
    await apiFetch("/backend/auth/session", { signal: controller.signal });
    assert.equal(input.value, "current-test-token");
  } finally {
    globalThis.fetch = previous;
    input.remove();
    setCsrfToken("");
  }
});

test("React escapes stored XSS in student names", async () => {
  const { default: Page } = await vite.ssrLoadModule(
    "/src/pages/Dashboard_dashboardEdit.jsx",
  );
  const data = structuredClone(fixtures.Dashboard_dashboardEdit);
  data.alunos[0].nome = "<img src=x onerror=alert(1)>";
  const html = renderToStaticMarkup(
    React.createElement(Page, { data, handlers: {} }),
  );
  assert.ok(html.includes("&lt;img"));
  assert.equal(
    new JSDOM(html).window.document.querySelectorAll("img[onerror]").length,
    0,
  );
});
test("DOMPurify removes executable payloads from rich AI text and math", async () => {
  const { richMarkup } = await vite.ssrLoadModule("/src/services/ui.jsx");
  for (const payload of [
    "<img src=x onerror=alert(1)>",
    "<svg onload=alert(1)>",
    "$$<img src=x onerror=alert(1)>$$",
    '<a href="javascript:alert(1)">X</a>',
  ]) {
    const html = renderToStaticMarkup(richMarkup(payload, true));
    const d = new JSDOM(html).window.document;
    assert.equal(
      d.querySelectorAll(
        'script,svg,img,[onerror],[onload],a[href^="javascript:"]',
      ).length,
      0,
    );
  }
});
test("login tabs work with native JSX events", async () => {
  const { createRoot } = await import("react-dom/client");
  const { flushSync } = await import("react-dom");
  const { default: Page } = await vite.ssrLoadModule("/src/pages/Login.jsx");
  const { initialize } = await vite.ssrLoadModule(
    "/src/interactions/pages_auth_login.jsx",
  );
  const handlers = {};
  const container = document.getElementById("root"),
    reactRoot = createRoot(container);
  flushSync(() =>
    reactRoot.render(
      React.createElement(Page, { data: fixtures.Login, handlers }),
    ),
  );
  initialize({ handlers, onReady: (cb) => cb() });
  const tab = document.querySelectorAll(".login-tab")[1];
  tab.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  assert.ok(document.getElementById("alunoForm").classList.contains("active"));
  assert.equal(
    document.getElementById("logoimg").getAttribute("src"),
    "/images/logo3-green.png",
  );
  flushSync(() => reactRoot.unmount());
});
test("JSON embedded in native JSX cannot terminate a data script", async () => {
  const { default: Page } = await vite.ssrLoadModule(
    "/src/pages/Dashboard_dashboardEdit.jsx",
  );
  const data = structuredClone(fixtures.Dashboard_dashboardEdit);
  const payload = "</script><script>alert(1)</script>&";
  data.alunos[0].nome = payload;
  const html = renderToStaticMarkup(
    React.createElement(Page, { data, handlers: {} }),
  );
  const d = new JSDOM(html).window.document;
  assert.equal(
    d.querySelectorAll('script:not([type="application/json"])').length,
    0,
  );
  assert.equal(
    JSON.parse(d.getElementById("dashboard-edit-data").textContent)[0].nome,
    payload,
  );
});

test("all pages retain the original stylesheet order, including repeated links", async () => {
  const expected = JSON.parse(
    fs.readFileSync(path.join(root, "tests/fixtures/style-order.json")),
  );
  const { applyPageStyles } = await vite.ssrLoadModule(
    "/src/services/page-styles.js",
  );
  const target = new JSDOM(
    '<html><head><style id="compatibility">#root { display: contents; }</style></head><body></body></html>',
  ).window;
  for (const [view, page] of Object.entries(expected)) {
    applyPageStyles(view, target.document);
    assert.deepEqual(
      [...target.document.querySelectorAll("[data-page-style]")].map((link) =>
        link.getAttribute("href"),
      ),
      page.styles,
      view,
    );
    assert.equal(target.document.body.className, page.bodyClass, view);
    assert.equal(target.document.title, page.title, view);
    assert.equal(
      target.document.documentElement.dataset.theme,
      page.theme,
      view,
    );
    assert.ok(target.document.getElementById("compatibility"), view);
  }
  target.close();
});

test("the React container contributes no layout box to original flex bodies", () => {
  const css = fs.readFileSync(
    path.join(root, "src/styles/react-root.css"),
    "utf8",
  );
  assert.match(
    fs.readFileSync(path.join(root, "src/main.jsx"), "utf8"),
    /import\s+["']\.\/styles\/react-root\.css["']/,
  );
  const target = new JSDOM(
    "<html><head><style>body { display: flex; } " +
      css +
      '</style></head><body><div id="root"><main></main></div></body></html>',
  ).window;
  assert.equal(target.getComputedStyle(target.document.body).display, "flex");
  assert.equal(
    target.getComputedStyle(target.document.getElementById("root")).display,
    "contents",
  );
  target.close();
});

test("local icon styles and fonts match the original Phosphor version", () => {
  for (const weight of ["bold", "regular"]) {
    const name = weight === "bold" ? "Phosphor-Bold" : "Phosphor";
    for (const file of [
      "style.css",
      `${name}.woff2`,
      `${name}.woff`,
      `${name}.ttf`,
      `${name}.svg`,
    ]) {
      assert.deepEqual(
        fs.readFileSync(
          path.join(root, "public/vendor/phosphor", weight, file),
        ),
        fs.readFileSync(
          path.join(root, "node_modules/@phosphor-icons/web/src", weight, file),
        ),
        weight + "/" + file,
      );
    }
  }
});

test("password reset button sends the selected student ID after switching students", async () => {
  const { default: Page } = await vite.ssrLoadModule(
    "/src/pages/Dashboard_dashboardEdit.jsx",
  );
  const { initialize } = await vite.ssrLoadModule(
    "/src/interactions/pages_dashboard_edit.jsx",
  );
  const container = document.getElementById("root");
  container.innerHTML = renderToStaticMarkup(
    React.createElement(Page, {
      data: fixtures.Dashboard_dashboardEdit,
      handlers: {},
    }),
  );
  const previousFetch = globalThis.fetch,
    previousConfirm = globalThis.confirm;
  const requests = [],
    handlers = {};
  globalThis.confirm = () => true;
  globalThis.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), ...options });
    const reset = String(url).match(
      /^\/backend\/alunos\/(\d+)\/redefinicao-senha$/,
    );
    let data = String(url).endsWith("/competencias")
      ? []
      : { email: "aluno@test.local", matricula: "TESTE" };
    if (options.method === "POST") {
      assert.ok(
        reset,
        "the password endpoint contains a real numeric student ID",
      );
      data = { sucesso: true, senha: "SENHA-DE-TESTE-" + reset[1] };
    }
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  };
  const waitUntil = async (condition) => {
    for (let attempt = 0; attempt < 100 && !condition(); attempt++)
      await new Promise((resolve) => setTimeout(resolve, 5));
    assert.ok(condition());
  };
  try {
    initialize({ handlers, onReady: () => {} });
    for (const id of [17, 42]) {
      handlers.openEditModal(id, "ALUNO TESTE", 75);
      await waitUntil(
        () => document.getElementById("editAlunoId").value === String(id),
      );
      document.querySelector("#loginInfo button").click();
      await waitUntil(
        () =>
          document.getElementById("senhaAlunoValor").textContent ===
          "SENHA-DE-TESTE-" + id,
      );
      assert.equal(
        requests.filter((request) => request.method === "POST").at(-1).url,
        `/backend/alunos/${id}/redefinicao-senha`,
      );
    }
    globalThis.confirm = () => false;
    document.querySelector("#loginInfo button").click();
    assert.equal(
      requests.filter((request) => request.method === "POST").length,
      2,
      "cancelling does not reset a password",
    );
  } finally {
    globalThis.fetch = previousFetch;
    globalThis.confirm = previousConfirm;
    container.innerHTML = "";
  }
});

for (const component of ["Dashboard_dashboardIA", "Aluno_alunoIA"]) {
  test(
    "new chat preserves welcome styles, icons and working suggestions: " +
      component,
    async () => {
      const { default: Page } = await vite.ssrLoadModule(
        "/src/pages/" + component + ".jsx",
      );
      const { initialize } = await vite.ssrLoadModule(
        "/src/interactions/shared_ai-chat.jsx",
      );
      const csrfMeta = document.createElement("meta");
      csrfMeta.name = "csrf-token";
      csrfMeta.content = "test-token";
      document.head.append(csrfMeta);
      const container = document.getElementById("root");
      container.innerHTML = renderToStaticMarkup(
        React.createElement(Page, { data: fixtures[component], handlers: {} }),
      );
      const chat = container.querySelector(".ai-chat");
      const messages = chat.querySelector(".ai-messages");
      const signature = () =>
        [...messages.querySelectorAll("*")].map((el) => ({
          tag: el.tagName,
          classes: el.className,
          style: el.getAttribute("style"),
          prompt: el.getAttribute("data-prompt"),
          type: el.getAttribute("type"),
          ariaHidden: el.getAttribute("aria-hidden"),
          text: el.textContent,
        }));
      const expected = signature();
      const prompts = [...messages.querySelectorAll("[data-prompt]")].map(
        (el) => el.dataset.prompt,
      );
      const requests = [];
      const previousFetch = globalThis.fetch;
      globalThis.fetch = async (url, options = {}) => {
        requests.push({ url: String(url), ...options });
        return new Response(
          JSON.stringify({
            answer: "Resposta de teste",
            conversationId: 77,
            csrfToken: "test-token",
            conversations: [
              {
                id: 88,
                titulo: "Primeira conversa",
                data_atualizacao: "2026-10-10T12:00:00Z",
                messages: [
                  { role: "user", text: "Pergunta salva" },
                  { role: "model", text: "Resposta salva" },
                ],
              },
              {
                id: 89,
                titulo: "Segunda conversa",
                data_atualizacao: "2026-10-10T12:00:00Z",
                messages: [
                  { role: "user", text: "Outra pergunta" },
                  { role: "model", text: "Outra resposta" },
                ],
              },
            ],
          }),
          {
            headers: { "content-type": "application/json" },
          },
        );
      };
      const waitForResponse = async () => {
        for (
          let attempt = 0;
          attempt < 100 && chat.querySelector("textarea").disabled;
          attempt++
        )
          await new Promise((resolve) => setTimeout(resolve, 5));
        assert.equal(
          chat.querySelector("textarea").disabled,
          false,
          "request completes",
        );
      };
      try {
        initialize({ handlers: {}, onReady: (callback) => callback() });
        for (let round = 0; round < prompts.length; round++) {
          chat.querySelector("[data-history]").click();
          await new Promise((resolve) => setTimeout(resolve, 0));
          chat.querySelector("textarea").value = "Texto que deve ser limpo";
          chat.querySelector("[data-new-chat]").click();
          assert.deepEqual(signature(), expected);
          assert.equal(chat.classList.contains("has-messages"), false);
          assert.equal(
            chat.querySelector(".ai-history").getAttribute("aria-hidden"),
            "true",
          );
          assert.equal(chat.querySelector("textarea").value, "");
          assert.equal(document.activeElement, chat.querySelector("textarea"));
          const before = requests.filter(
            (request) => request.method === "POST",
          ).length;
          messages.querySelectorAll("[data-prompt]")[round].click();
          await waitForResponse();
          const sent = requests.filter((request) => request.method === "POST");
          assert.equal(
            sent.length,
            before + 1,
            "restored suggestion sends exactly once",
          );
          assert.deepEqual(JSON.parse(sent.at(-1).body), {
            message: prompts[round],
            conversationId: null,
          });
          assert.ok(messages.querySelector(".ai-message-assistant"));
          assert.equal(messages.querySelector(".ai-message-loading"), null);
        }
        chat.querySelector("[data-new-chat]").click();
        assert.deepEqual(
          signature(),
          expected,
          "repeated resets clear all previous messages",
        );
        for (let round = 0; round < 2; round++) {
          chat.querySelector("[data-history]").click();
          for (
            let attempt = 0;
            attempt < 100 &&
            chat.querySelectorAll(".ai-history-item").length !== 2;
            attempt++
          )
            await new Promise((resolve) => setTimeout(resolve, 5));
          assert.equal(
            chat.querySelectorAll(".ai-history-item").length,
            2,
            "reopening history does not duplicate cards",
          );
          chat.querySelectorAll(".ai-history-item")[round].click();
          assert.equal(
            messages.querySelectorAll(".ai-message").length,
            2,
            "opening history replaces previous messages",
          );
          assert.equal(messages.querySelector(".ai-welcome"), null);
        }
        chat.querySelector("[data-new-chat]").click();
        assert.deepEqual(
          signature(),
          expected,
          "reset after loading history restores the native welcome",
        );
      } finally {
        globalThis.fetch = previousFetch;
        csrfMeta.remove();
        container.innerHTML = "";
      }
    },
  );
}

test("navigation preserves modifier clicks, GET filters and browser history", async () => {
  const { installNavigation, navigate } = await vite.ssrLoadModule(
    "/src/services/navigation.js",
  );
  const container = document.getElementById("root");
  container.innerHTML = [
    '<a id="internal" href="/dashboard/edit">Editar</a><a ',
    'id="external" href="https://example.com/">Externo</a><a ',
    'id="newtab" href="/aluno" target="_blank">Aba</a><a ',
    'id="download" href="/dashboard" download>PDF</a><form ',
    'method="get" action="/dashboard/tarefas"><input name="turma" ',
    'value="1º MÉDIO"><input name="status" value="ATIVA"></form>',
  ].join("");
  const changes = [],
    stop = installNavigation((href) => changes.push(href));
  try {
    for (const [id, options] of [
      ["internal", { ctrlKey: true }],
      ["external", {}],
      ["newtab", {}],
      ["download", {}],
    ]) {
      const event = new dom.window.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        button: 0,
        ...options,
      });
      document.addEventListener(
        "click",
        (event) => {
          assert.equal(event.defaultPrevented, false, id);
          event.preventDefault();
        },
        { once: true },
      );
      document.getElementById(id).dispatchEvent(event);
    }
    const click = new dom.window.MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    document.getElementById("internal").dispatchEvent(click);
    assert.equal(click.defaultPrevented, true);
    assert.equal(location.pathname, "/dashboard/edit");
    assert.deepEqual(history.state.analisaiScroll, [0, 0]);
    const submit = new dom.window.Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    container.querySelector("form").dispatchEvent(submit);
    assert.equal(submit.defaultPrevented, true);
    assert.equal(new URLSearchParams(location.search).get("turma"), "1º MÉDIO");
    navigate("/dashboard/ia");
    const previous = new Promise((resolve) =>
      window.addEventListener("popstate", resolve, { once: true }),
    );
    history.back();
    await previous;
    assert.equal(location.pathname, "/dashboard/tarefas");
    assert.match(changes.at(-1), /turma=/);
    const forward = new Promise((resolve) =>
      window.addEventListener("popstate", resolve, { once: true }),
    );
    history.forward();
    await forward;
    assert.equal(location.pathname, "/dashboard/ia");
  } finally {
    stop();
    container.innerHTML = "";
    history.replaceState(null, "", "/");
  }
});

test("interaction cleanup removes events, timers, handlers, charts and late responses", async () => {
  const { createInteractionScope } = await vite.ssrLoadModule(
    "/src/services/lifecycle.js",
  );
  const scope = createInteractionScope(),
    target = document.createElement("button"),
    handlers = {};
  let clicks = 0,
    ticks = 0,
    destroyed = 0;
  scope.listen(target, "click", () => clicks++);
  scope.interval(() => ticks++, 5);
  scope.timeout(() => ticks++, 10);
  scope.bindHandlers(handlers, { example: () => true });
  scope.chart(
    class {
      destroy() {
        destroyed++;
      }
    },
  );
  let finish,
    aborted = false;
  const pending = scope.fetch(async (_, options) => {
    options.signal.addEventListener("abort", () => (aborted = true));
    return await new Promise((resolve) => (finish = resolve));
  })("/test");
  target.click();
  scope.dispose();
  scope.dispose();
  target.click();
  finish(new Response("{}"));
  await assert.rejects(pending, { name: "AbortError" });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(clicks, 1);
  assert.equal(ticks, 0);
  assert.equal(destroyed, 1);
  assert.equal(aborted, true);
  assert.equal(handlers.example, undefined);
  const bodyScope = createInteractionScope();
  let finishBody;
  const response = await bodyScope.fetch(async () => ({
    json: () => new Promise((resolve) => (finishBody = resolve)),
  }))("/test");
  const body = response.json();
  bodyScope.dispose();
  finishBody({ late: true });
  await assert.rejects(body, { name: "AbortError" });
});

test("interaction failures reach the route error UI while stale errors stay silent", async () => {
  const { createInteractionScope } = await vite.ssrLoadModule(
    "/src/services/lifecycle.js",
  );
  const { installForms } = await vite.ssrLoadModule(
    "/src/services/interactions.js",
  );
  const messages = [],
    stop = installForms((message) => messages.push(message));
  const scope = createInteractionScope();
  try {
    scope.reportError(new Error("Falha de rede simulada"));
    scope.reportError(new DOMException("Cancelado", "AbortError"));
    scope.dispose();
    scope.reportError(new Error("Página anterior"));
    assert.deepEqual(messages, ["Falha de rede simulada"]);
  } finally {
    scope.dispose();
    stop();
  }
});

test("session guards preserve student, professor and administrator access rules", async () => {
  const { sessionRedirect, baseData } = await vite.ssrLoadModule(
    "/src/services/page-loader.js",
  );
  assert.equal(sessionRedirect("/dashboard", null), "/login");
  assert.equal(sessionRedirect("/dashboard", { kind: "aluno" }), "/aluno");
  assert.equal(sessionRedirect("/aluno", { kind: "professor" }), "/dashboard");
  assert.equal(sessionRedirect("/login", { kind: "aluno" }), "/aluno");
  assert.throws(
    () =>
      sessionRedirect("/dashboard/usuarios", {
        kind: "professor",
        cargo: "Professor",
      }),
    /administrativo/,
  );
  assert.equal(
    sessionRedirect("/dashboard/usuarios", {
      kind: "professor",
      cargo: "Admin",
    }),
    null,
  );
  assert.equal(
    baseData({ identity: { kind: "aluno", nome: "Teste" } }).tipo,
    "aluno",
  );
});

test("all 25 individual skeletons mask static and dynamic content while preserving native containers", async () => {
  const { default: Dispatcher } = await vite.ssrLoadModule(
    "/src/components/PageSkeleton.jsx",
  );
  const { baseData } = await vite.ssrLoadModule("/src/services/page-loader.js");
  const { PersistentSidebarContext } = await vite.ssrLoadModule(
    "/src/components/layout-context.js",
  );
  let maskedPages = 0;
  const base = baseData({
    csrfToken: "test-only",
    identity: { kind: "aluno", id: 1, nome: "Teste", ano_escolar: "1º MÉDIO" },
  });
  function render(Component, props) {
    return new JSDOM(
      renderToStaticMarkup(
        React.createElement(
          PersistentSidebarContext.Provider,
          { value: true },
          React.createElement(Component, props),
        ),
      ),
    ).window.document;
  }
  function layout(document) {
    return [...document.body.querySelectorAll("*")]
      .filter(
        (element) =>
          !element.matches(
            ".skeleton-shape,.skeleton-copy,.skeleton-status,script",
          ),
      )
      .map((element) => ({
        tag: element.tagName,
        id: element.id,
        classes: element.className
          .toString()
          .split(/\s+/)
          .filter((name) => name && !name.startsWith("skeleton-"))
          .join(" "),
        style: element.getAttribute("style"),
        labels: element.getAttribute("aria-label"),
        type: element.getAttribute("type"),
      }));
  }
  for (const [view, meta] of Object.entries(manifest)) {
    if (view.startsWith("partials/")) continue;
    const { default: Page } = await vite.ssrLoadModule(
      "/src/pages/" + meta.component + ".jsx",
    );
    const { default: Skeleton, loadingData } = await vite.ssrLoadModule(
      "/src/skeletons/" + meta.component + ".jsx",
    );
    const pending = render(Dispatcher, {
      view,
      module: { Skeleton },
      data: base,
      handlers: {},
    });
    const native = render(Page, { data: loadingData(base), handlers: {} });
    assert.ok(pending.querySelector('[aria-busy="true"][inert]'), view);
    assert.deepEqual(
      layout(pending),
      layout(native),
      view + " container/class/inline-style parity",
    );
    assert.ok(!pending.body.textContent.includes("Carregando AnalisAI"), view);
    assert.equal(
      pending.querySelectorAll('script[type="application/json"]').length,
      0,
      view,
    );
    assert.equal(
      native.querySelectorAll(
        ".skeleton-shape,.skeleton-copy,[data-skeleton-kind],[inert],.skeleton-status",
      ).length,
      0,
      view + " loaded page",
    );
    if (pending.querySelector(".skeleton-copy")) maskedPages++;
    const texts = pending.createTreeWalker(pending.body, 4);
    while (texts.nextNode()) {
      const node = texts.currentNode;
      if (!node.textContent.trim()) continue;
      assert.ok(
        node.parentElement.closest(
          ".skeleton-copy,.skeleton-value,.skeleton-status,[data-skeleton-kind],script,style",
        ),
        view + " unmasked text: " + node.textContent.slice(0, 80),
      );
    }
    for (const leaf of pending.querySelectorAll(
      'i,img,iframe,svg,button,input:not([type="hidden"]),select,textarea',
    ))
      assert.ok(
        leaf.hasAttribute("data-skeleton-kind"),
        view + " " + leaf.outerHTML.slice(0, 100),
      );
    for (const placeholder of pending.querySelectorAll(".skeleton-shape"))
      assert.equal(placeholder.textContent.trim(), "");
  }
  assert.equal(maskedPages, 25, "all pages include static text placeholders");
  assert.match(
    fs.readFileSync(path.join(root, "src/styles/skeleton.css"), "utf8"),
    /prefers-reduced-motion/,
  );
});

test("calendar skeleton keeps the selected month grid, controls and event-list layout", async () => {
  const { default: Skeleton } = await vite.ssrLoadModule(
    "/src/skeletons/Dashboard_dashboardCalendario.jsx",
  );
  const html = renderToStaticMarkup(
    React.createElement(Skeleton, {
      data: { user: "Teste", loadingSearch: "?mes=2&ano=2028" },
      handlers: {},
    }),
  );
  const document = new JSDOM(html).window.document;
  assert.equal(
    document.querySelectorAll(".dia-cell:not(.outro-mes)").length,
    29,
  );
  assert.ok(document.querySelector(".calendario-header"));
  assert.ok(document.body.textContent.includes("PRÓXIMOS EVENTOS"));
  assert.ok(document.querySelector('[aria-busy="true"][inert]'));
});

test("loading charts fill the native fixed frames and disappear on the loaded page", async () => {
  const { default: Skeleton } = await vite.ssrLoadModule(
    "/src/skeletons/Aluno_alunoEvolucao.jsx",
  );
  const document = new JSDOM(
    renderToStaticMarkup(
      React.createElement(Skeleton, { data: { user: "Teste" }, handlers: {} }),
    ),
  ).window.document;
  const canvas = document.querySelector("#evolucaoChart");
  assert.ok(canvas.hasAttribute("data-skeleton-frame"));
  assert.equal(canvas.parentElement.style.height, "400px");
  assert.equal(
    document.querySelectorAll(".ranking-list .ranking-item").length,
    5,
  );
});

test("SPA keeps the sidebar, aborts stale page loads and reopens pages without duplicate events", async () => {
  const { createRoot } = await import("react-dom/client");
  const { flushSync } = await import("react-dom");
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const { navigate } = await vite.ssrLoadModule("/src/services/navigation.js");
  const container = document.getElementById("root");
  container.innerHTML = "";
  history.replaceState(null, "", "/dashboard/edit");
  const previousFetch = globalThis.fetch;
  const calls = [];
  let releaseSlow, slowSignal;
  const json = (data) =>
    new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  globalThis.fetch = async (url, options = {}) => {
    url = String(url);
    calls.push(url);
    if (url === "/backend/auth/session")
      return json({
        csrfToken: "teste",
        identity: {
          kind: "professor",
          id: 1,
          nome: "Admin Teste",
          cargo: "Admin",
        },
      });
    if (url === "/backend/alunos")
      return json(fixtures.Dashboard_dashboardEdit);
    if (url === "/backend/professores/estatisticas") {
      slowSignal = options.signal;
      return new Promise(
        (resolve) =>
          (releaseSlow = () =>
            resolve(json(fixtures.Dashboard_dashboardGraficos))),
      );
    }
    if (url === "/backend/professores/ia")
      return json(fixtures.Dashboard_dashboardIA);
    if (url === "/backend/ia/conversas") return json({ conversations: [] });
    if (url === "/backend/notificacoes")
      return json({ notificacoes: [], totalNaoLidas: 0 });
    if (url === "/backend/conta")
      return json({
        nome: "Admin Teste",
        email: "admin@test.local",
        role: "Admin",
        tasks: 0,
        students: 1,
      });
    return json({
      notificacoes_ativas: true,
      notificacoes_tarefas: true,
      notificacoes_avaliacoes: true,
      backups: [],
    });
  };
  const wait = async (condition) => {
    for (let i = 0; i < 200 && !condition(); i++)
      await new Promise((resolve) => setTimeout(resolve, 5));
    assert.ok(condition(), "condition completes");
  };
  const root = createRoot(container);
  try {
    flushSync(() => root.render(React.createElement(App)));
    assert.ok(container.querySelector(".skeleton-route"));
    assert.ok(!container.textContent.includes("Carregando AnalisAI"));
    await wait(
      () =>
        container.querySelector("#dashboard-edit-data") &&
        !container.querySelector(".skeleton-route"),
    );
    const sidebar = container.querySelector(".sidebar");
    assert.equal(container.querySelectorAll(".sidebar").length, 1);
    container.querySelector('.side-link[href="/dashboard/graficos"]').click();
    await wait(() => releaseSlow && container.querySelector(".skeleton-route"));
    assert.equal(container.querySelector(".sidebar"), sidebar);
    assert.ok(sidebar.classList.contains("skeleton-route"));
    assert.ok(sidebar.querySelector(".skeleton-copy"));
    assert.ok(container.querySelector(".dash-header .skeleton-copy"));
    assert.ok(container.querySelector(".row-triple .skeleton-shape"));
    navigate("/dashboard/ia");
    await wait(() => container.querySelector(".ai-chat textarea"));
    assert.equal(slowSignal.aborted, true);
    releaseSlow();
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.equal(location.pathname, "/dashboard/ia");
    assert.ok(container.querySelector(".ai-chat textarea"));
    assert.equal(container.querySelector(".sidebar"), sidebar);
    navigate("/dashboard/edit");
    await wait(
      () =>
        container.querySelector("#dashboard-edit-data") &&
        !container.querySelector(".skeleton-route"),
    );
    const button = container.querySelector(".mobile-menu-toggle");
    button.click();
    assert.equal(sidebar.classList.contains("is-open"), true);
    button.click();
    assert.equal(sidebar.classList.contains("is-open"), false);
    assert.equal(container.querySelectorAll(".sidebar").length, 1);
    assert.equal(sidebar.querySelector(".skeleton-copy"), null);
    assert.equal(container.querySelectorAll('[role="alert"]').length, 0);
  } finally {
    flushSync(() => root.unmount());
    await new Promise((resolve) => setTimeout(resolve, 0));
    globalThis.fetch = previousFetch;
    history.replaceState(null, "", "/");
  }
});

test("both sidebar skeletons mask navigation, branding, known names and mobile controls", async () => {
  const { SidebarSkeleton } = await vite.ssrLoadModule(
    "/src/components/PageSkeleton.jsx",
  );
  for (const kind of ["professor", "aluno"]) {
    const document = new JSDOM(
      renderToStaticMarkup(
        React.createElement(SidebarSkeleton, {
          kind,
          data: {
            user: "Nome já conhecido",
            userCargo: "Admin",
            cargo: "Admin",
            csrfToken: "test-only",
          },
        }),
      ),
    ).window.document;
    assert.ok(document.querySelector(".sidebar.skeleton-route[inert]"));
    assert.ok(document.querySelector(".side-link .skeleton-copy"));
    assert.ok(document.querySelector('img[data-skeleton-kind="media"]'));
    assert.ok(
      document.querySelector(
        '.mobile-menu-toggle[data-skeleton-kind="control"][inert]',
      ),
    );
    const texts = document.createTreeWalker(document.body, 4);
    while (texts.nextNode()) {
      const node = texts.currentNode;
      if (!node.textContent.trim()) continue;
      assert.ok(
        node.parentElement.closest(
          ".skeleton-copy,.skeleton-value,.skeleton-status,[data-skeleton-kind]",
        ),
        kind + " unmasked text: " + node.textContent.slice(0, 80),
      );
    }
  }
});

test("all authenticated routes survive repeated SPA visits, role changes and configuration deep links", async () => {
  const { createRoot } = await import("react-dom/client"),
    { flushSync } = await import("react-dom");
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx"),
    { navigate, routes } = await vite.ssrLoadModule(
      "/src/services/navigation.js",
    );
  const map = JSON.parse(
      fs.readFileSync(path.join(root, "src/services/route-map.json")),
    ),
    payloads = new Map();
  for (const [url, view] of Object.entries(routes)) {
    const row = map.find((row) => row.original === url && row.method === "GET");
    if (row)
      payloads.set("/backend" + row.uri, fixtures[manifest[view].component]);
  }
  const container = document.getElementById("root"),
    previousFetch = globalThis.fetch;
  container.innerHTML = "";
  history.replaceState(null, "", "/dashboard");
  let role = "professor";
  globalThis.fetch = async (url) => {
    url = String(url);
    const pathname = new URL(url, location.origin).pathname;
    const identity =
      role === "professor"
        ? { kind: role, id: 1, nome: "Admin Teste", cargo: "Admin" }
        : { kind: role, id: 2, nome: "Aluno Teste", ano_escolar: "1º MÉDIO" };
    const data =
      pathname === "/backend/auth/session"
        ? { identity, csrfToken: "teste" }
        : payloads.get(pathname) || {
            notificacoes: [],
            totalNaoLidas: 0,
            conversations: [],
            notificacoes_ativas: true,
            nome: identity.nome,
            email: "teste@example.com",
            role: "Admin",
            tasks: 0,
            students: 1,
          };
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  };
  const wait = async (condition) => {
    for (let i = 0; i < 300 && !condition(); i++)
      await new Promise((resolve) => setTimeout(resolve, 5));
    assert.ok(condition());
  };
  const reactRoot = createRoot(container);
  try {
    flushSync(() => reactRoot.render(React.createElement(App)));
    for (const urls of [
      Object.keys(routes).filter(
        (url) => url.startsWith("/dashboard") && !url.endsWith("/equipe"),
      ),
      Object.keys(routes).filter(
        (url) => url.startsWith("/aluno") && !url.endsWith("/equipe"),
      ),
    ]) {
      role = urls[0].startsWith("/aluno") ? "aluno" : "professor";
      for (const url of [...urls, ...urls.slice().reverse()]) {
        navigate(url);
        await wait(
          () =>
            location.pathname === url &&
            !container.querySelector(".skeleton-route"),
        );
        await new Promise((resolve) => setTimeout(resolve, 15));
        assert.equal(container.querySelectorAll(".sidebar").length, 1, url);
        assert.equal(
          container.querySelectorAll('[role="alert"]').length,
          0,
          url,
        );
      }
    }
    navigate("/aluno/perfil?aba=senha");
    await wait(
      () =>
        container.querySelector("#abaSenha.active") &&
        !container.querySelector(".skeleton-route"),
    );
    assert.ok(container.querySelector("#abaSenha.active"));
    navigate("/aluno?settings=account");
    await wait(() => container.querySelector("#settingsModal.is-open"));
    assert.ok(
      container.querySelector('[data-settings-panel="account"].active'),
    );
    assert.equal(new URLSearchParams(location.search).has("settings"), false);
  } finally {
    flushSync(() => reactRoot.unmount());
    await new Promise((resolve) => setTimeout(resolve, 0));
    globalThis.fetch = previousFetch;
    history.replaceState(null, "", "/");
  }
});
