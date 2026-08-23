import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ledger-lesson-planner/",
  server: {
    host: true,
    allowedHosts: true,
    hmr: false,
  },
});
