import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api/products": "http://localhost:5000",
    },
  },
});
