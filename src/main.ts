// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js"; // 如果配置了路由
import "@/styles/global.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css"; // 引入 Element Plus 样式
// import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // 引入图标库

const app = createApp(App);
// 全局注册所有图标（可直接在模板中使用）
// Object.keys(ElementPlusIconsVue).forEach((key) => {
//   app.component(key, ElementPlusIconsVue[key]);
// });

app
  .use(pinia)
  .use(router) // 如果配置了路由
  .mount("#app");
