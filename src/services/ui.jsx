import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import DOMPurify from "dompurify";
import { renderAssistantText } from "./markdown";
const roots = new WeakMap();
export function safeJson(value) {
  return (JSON.stringify(value) ?? "null").replace(
    /[<>&\u2028\u2029]/g,
    (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"),
  );
}
export function styleFrom(value) {
  const style = {};
  for (const item of String(value || "").split(";")) {
    const index = item.indexOf(":");
    if (index < 0) continue;
    const key = item.slice(0, index).trim();
    const val = item.slice(index + 1).trim();
    if (!key || !val) continue;
    style[
      key.startsWith("--")
        ? key
        : key.replace(/-([a-z])/g, (_, s) => s.toUpperCase())
    ] = val;
  }
  return style;
}
export function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
export function mount(container, node) {
  if (!container) return;
  let root = roots.get(container);
  if (!root) {
    root = createRoot(container);
    roots.set(container, root);
  }
  flushSync(() => root.render(<>{node}</>));
}
export function unmount(container, { defer = false } = {}) {
  const root = roots.get(container);
  if (!root) return;
  roots.delete(container);
  if (defer) queueMicrotask(() => root.unmount());
  else flushSync(() => root.unmount());
}

export function richMarkup(value, alreadyHtml = false) {
  const raw = alreadyHtml
    ? String(value || "")
    : renderAssistantText(String(value || ""));
  const html = DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "h4",
      "h5",
      "blockquote",
      "pre",
      "code",
      "hr",
      "span",
      "sup",
      "sub",
    ],
    ALLOWED_ATTR: ["class"],
    ALLOW_DATA_ATTR: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
export function safeSiteLink(value, fallback = "/") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u001f\u007f]/.test(value)
  )
    return fallback;
  return value;
}

export function parseCalendarDate(value) {
  return new Date(String(value || "").slice(0, 10) + "T12:00:00");
}
