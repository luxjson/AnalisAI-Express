export function installMobileMenu(scope) {
  const button = document.querySelector(".mobile-menu-toggle");
  const menu = document.querySelector(".sidebar");
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (!button || !menu) return () => {};

  menu.id ||= "mobile-navigation";
  button.setAttribute("aria-controls", menu.id);

  const close = (restoreFocus = false) => {
    menu.classList.remove("is-open");
    backdrop?.classList.remove("is-visible");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus) button.focus();
  };

  scope.listen(button, "click", () => {
    if (menu.classList.contains("is-open")) {
      close(true);
      return;
    }
    menu.classList.add("is-open");
    backdrop?.classList.add("is-visible");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Fechar menu");
    menu.querySelector("a[href], button:not([disabled])")?.focus();
  });
  scope.listen(backdrop, "click", () => close(true));
  scope.listen(menu, "click", (event) => {
    if (event.target.closest(".side-link")) close();
  });
  scope.listen(document, "keydown", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [
      button,
      ...menu.querySelectorAll("a[href], button:not([disabled])"),
    ];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  scope.listen(window, "resize", () => {
    if (window.innerWidth > 768) close();
  });
  scope.listen(window, "analisai:route-ready", () => close());
  return close;
}
