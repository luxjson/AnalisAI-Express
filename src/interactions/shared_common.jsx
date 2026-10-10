import { createInteractionScope } from "../services/lifecycle";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
  lifecycle.listen(window, "scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".side-link");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
  function openModal() {
    document.getElementById("infoModal").style.display = "flex";
  }
  function closeModal() {
    document.getElementById("infoModal").style.display = "none";
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
