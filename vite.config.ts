import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: true,
    allowedHosts: [
      "5173-muhuanlegend-dash-pztbznc7qdh.ws-eu118.gitpod.io",
      "5174-muhuanlegend-dash-pztbznc7qdh.ws-eu118.gitpod.io"
    ]
  }
});
