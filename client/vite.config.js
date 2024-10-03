import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// instead of serving static pages, we will use the React plugin to serve our React app
export default defineConfig({
  plugins: [react()],
});
