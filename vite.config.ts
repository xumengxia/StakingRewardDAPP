import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], // 按需添加其他常用库（如pinia）
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // prefix: "Icon",
          enabledCollections: ["ep"], // 明确指定ep集合，避免冗余扫描
        }),
      ],
      dts: path.resolve(__dirname, "src", "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"], // 明确ep集合
        }),
        ElementPlusResolver(),
      ],
      // directoryAsNamespace: true,
      dts: path.resolve(__dirname, "src", "components.d.ts"),
    }),
    Icons({
      autoInstall: true,
      compiler: "vue3",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
