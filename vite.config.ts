import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "muhuan-developers",
  project: "traveller",
  // An auth token is required for uploading source maps.
  authToken:
    "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",
  // ...
};

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      reactRouter(),
      sentryReactRouter(sentryConfig, config),
    ],
    server: {
      host: true,
      allowedHosts: [
        "5173-muhuanlegend-dash-pztbznc7qdh.ws-eu118.gitpod.io",
        "5174-muhuanlegend-dash-pztbznc7qdh.ws-eu118.gitpod.io",
      ],
    },
    ssr: {
      noExternal: [/@syncfusion/],
    },
  };
});
