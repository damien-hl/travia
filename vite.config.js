import { defineConfig } from "vite";

export default defineConfig({
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
