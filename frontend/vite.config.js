// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports
    environment: "jsdom", // simulates browser environment
    setupFiles: "./setupTests.js", // optional: for jest-dom
  },
});
