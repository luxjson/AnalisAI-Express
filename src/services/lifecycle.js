import { unmount } from "./ui";
export function createInteractionScope() {
  let active = true;
  const cleanup = [],
    roots = new Set();
  const controllers = new Set();
  const scope = {
    get active() {
      return active;
    },
    reportError(error) {
      if (!active || error?.name === "AbortError") return;
      window.dispatchEvent(
        new CustomEvent("analisai:interaction-error", {
          detail: error?.message || "Não foi possível concluir a operação.",
        }),
      );
    },
    listen(target, type, listener, options) {
      if (!active || !target) return;
      const guarded = function (...args) {
        if (active)
          return typeof listener === "function"
            ? listener.apply(this, args)
            : listener.handleEvent(...args);
      };
      target.addEventListener(type, guarded, options);
      cleanup.push(() => target.removeEventListener(type, guarded, options));
    },
    timeout(fn, delay, ...args) {
      if (!active) return;
      const id = setTimeout(() => {
        if (active) fn(...args);
      }, delay);
      cleanup.push(() => clearTimeout(id));
      return id;
    },
    interval(fn, delay, ...args) {
      if (!active) return;
      const id = setInterval(() => {
        if (active) fn(...args);
      }, delay);
      cleanup.push(() => clearInterval(id));
      return id;
    },
    chart(Chart, ...args) {
      if (!active) return null;
      const chart = new Chart(...args);
      cleanup.push(() => chart.destroy());
      return chart;
    },
    fetch(client) {
      return async (input, options = {}) => {
        if (!active)
          throw new DOMException("Navegação cancelada.", "AbortError");
        const controller = new AbortController();
        controllers.add(controller);
        const abort = () => controller.abort();
        options.signal?.addEventListener("abort", abort, {
          once: true,
        });
        if (options.signal?.aborted) controller.abort();
        try {
          const result = await client(input, {
            ...options,
            signal: controller.signal,
          });
          if (!active)
            throw new DOMException("Navegação cancelada.", "AbortError");
          for (const method of [
            "json",
            "text",
            "blob",
            "arrayBuffer",
            "formData",
          ]) {
            if (typeof result[method] !== "function") continue;
            const read = result[method].bind(result);
            result[method] = async (...args) => {
              const body = await read(...args);
              if (!active)
                throw new DOMException("Navegação cancelada.", "AbortError");
              return body;
            };
          }
          return result;
        } finally {
          controllers.delete(controller);
          options.signal?.removeEventListener("abort", abort);
        }
      };
    },
    mount(client) {
      return (container, node) => {
        if (!active) return;
        roots.add(container);
        return client(container, node);
      };
    },
    bindHandlers(target, handlers) {
      for (const [key, value] of Object.entries(handlers)) {
        const previous = target[key];
        target[key] = value;
        cleanup.push(() => {
          if (target[key] === value) {
            if (previous === undefined) delete target[key];
            else target[key] = previous;
          }
        });
      }
    },
    dispose() {
      if (!active) return;
      active = false;
      for (const controller of controllers) controller.abort();
      controllers.clear();
      for (const callback of cleanup.reverse()) {
        try {
          callback();
        } catch (error) {
          console.error("Falha ao limpar interação", error);
        }
      }
      for (const root of roots)
        unmount(root, {
          defer: true,
        });
      roots.clear();
    },
  };
  return scope;
}
