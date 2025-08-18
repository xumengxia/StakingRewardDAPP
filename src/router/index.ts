// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home/index.vue";
import Staking from "@/views/Staking/index.vue";
import Withdraw from "@/views/withdraw/index.vue";
import Profile from "@/views/Profile/index.vue";
import Layout from "@/components/layout/Layout.vue";
import Ethers from "@/views/Ethers/index.vue"
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout, // 所有子路由都使用Layout布局
    children: [
      {
        path: "home", // 路径：/home
        name: "Home",
        component: Home,
        meta: { title: "Home" },
      },
      {
        path: "staking", // 路径：/staking
        name: "Staking",
        component: Staking,
        meta: { title: "Staking" },
      },
      {
        path: "withdraw", // 路径：/withdraw
        name: "Withdraw", // 注意首字母大写（规范）
        component: Withdraw,
        meta: { title: "Withdraw" },
      },
      {
        path: "profile", // 路径：/profile
        name: "Profile",
        component: Profile,
        meta: { title: "Profile" },
      },
      {
        path: "ethers", // 路径：/profile
        name: "ethers",
        component: Ethers,
        meta: { title: "ethers" },
      },
      {
        // 默认跳转首页
        path: "",
        redirect: "/home",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
