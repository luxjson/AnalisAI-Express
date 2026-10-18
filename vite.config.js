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
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "vendor",
                test: /node_modules[\\/](react|react-dom)[\\/]/,
                priority: 10,
              },
              {
                name: "charts",
                test: /node_modules[\\/]chart\\.js[\\/]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },
  };
});
