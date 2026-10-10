import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/react-root.css";
import "./styles/skeleton.css";
import "./services/icons";
document.documentElement.dataset.theme = "dark";
try {
  localStorage.removeItem("analisai-theme-v2");
} catch {}
createRoot(document.getElementById("root")).render(<App />);
