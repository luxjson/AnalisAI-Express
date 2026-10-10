import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_API_URL");
  const api = env.VITE_API_URL || "http://localhost:3000";
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/backend": {
          target: api,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, "/api/v1"),
        },
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            charts: ["chart.js"],
          },
        },
      },
    },
  };
});
