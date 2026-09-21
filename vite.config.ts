import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? "/",
  css: {
    preprocessorOptions: {
      sass: {
        silenceDeprecations: ["color-functions"],
      },
      scss: {
        silenceDeprecations: ["color-functions"],
      },
    },
  },
});
