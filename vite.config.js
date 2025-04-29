import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import dynamicImport from "vite-plugin-dynamic-import";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue2(), dynamicImport()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.APP_ENV),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      vue: "vue/dist/vue.esm.js",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NepaliDatePicker-Vue3",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
