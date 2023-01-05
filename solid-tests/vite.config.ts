import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3030,
    open: false,
    proxy: {
      "/be": {
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/be/, ""),
      },
    },
  },
  build: {
    target: "esnext",
  },
});
