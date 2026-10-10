import { createInteractionScope } from "../services/lifecycle";
export function initialize({ onReady, handlers, scope }) {
  const lifecycle = scope || createInteractionScope();
  function openEraseModal() {
    document.getElementById("eraseAllModal").style.display = "flex";
  }
  function closeEraseModal() {
    document.getElementById("eraseAllModal").style.display = "none";
  }
  lifecycle.bindHandlers(handlers, {
    openEraseModal,
    closeEraseModal,
  });
  return lifecycle;
}
