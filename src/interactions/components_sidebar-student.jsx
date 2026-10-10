import { createInteractionScope } from "../services/lifecycle";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
  onReady(function () {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll(".side-link");
    links.forEach((link) => {
      const linkPath = link.getAttribute("href");
      if (currentPath === linkPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const menu = document.querySelector(".sidebar");
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    const closeMenu = () => {
      menu?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    };
    lifecycle.listen(menuButton, "click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    lifecycle.listen(backdrop, "click", closeMenu);
    document
      .querySelectorAll(".sidebar .side-link")
      .forEach((link) => lifecycle.listen(link, "click", closeMenu));
    const settings = document.querySelector("[data-settings-modal]");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettings = () => {
      settingsModal?.classList.remove("is-open");
      settingsModal?.setAttribute("aria-hidden", "true");
    };
    lifecycle.listen(settings, "click", (event) => {
      event.preventDefault();
      settingsModal?.classList.add("is-open");
      settingsModal?.setAttribute("aria-hidden", "false");
      closeMenu();
    });
    lifecycle.listen(settingsModal, "click", (event) => {
      if (
        event.target === settingsModal ||
        event.target.closest("[data-close-settings]")
      )
        closeSettings();
    });
    lifecycle.listen(document, "keydown", (event) => {
      if (event.key === "Escape") closeSettings();
    });
  });
  function openModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "flex";
  }
  function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.style.display = "none";
  }
  lifecycle.listen(window, "click", function (event) {
    const modal = document.getElementById("infoModal");
    if (event.target == modal) {
      closeModal();
    }
  });
  lifecycle.bindHandlers(handlers, {
    openModal,
    closeModal,
  });
  return lifecycle;
}
