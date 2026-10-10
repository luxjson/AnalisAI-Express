import React from "react";
import { Chart } from "chart.js/auto";
import { apiFetch as fetch } from "../services/api";
import { styleFrom, escapeHtml, mount, richMarkup } from "../services/ui";
export function initialize({ onReady, handlers }) {
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
    menuButton?.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    backdrop?.addEventListener("click", closeMenu);
    document
      .querySelectorAll(".sidebar .side-link")
      .forEach((link) => link.addEventListener("click", closeMenu));
    const settings = document.querySelector("[data-settings-modal]");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettings = () => {
      settingsModal?.classList.remove("is-open");
      settingsModal?.setAttribute("aria-hidden", "true");
    };
    settings?.addEventListener("click", (event) => {
      event.preventDefault();
      settingsModal?.classList.add("is-open");
      settingsModal?.setAttribute("aria-hidden", "false");
      closeMenu();
    });
    settingsModal?.addEventListener("click", (event) => {
      if (
        event.target === settingsModal ||
        event.target.closest("[data-close-settings]")
      )
        closeSettings();
    });
    document.addEventListener("keydown", (event) => {
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
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("infoModal");
    if (event.target == modal) {
      closeModal();
    }
  });
  Object.assign(handlers, {
    openModal,
    closeModal,
  });
}
