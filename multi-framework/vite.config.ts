import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svelte()],
  server: {
    port: 3030,
    open: false,
    proxy: {
      "/be": {
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/be/, ""),
        ws: true,
        secure: false,
      },
    },
  },
});
