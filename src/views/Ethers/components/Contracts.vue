<template>
  <div class="tab-container">
    <h3>1. getAddress（转换为标准的校验和地址）</h3>

    <el-card class="mrg-top" style="max-width: 480px">
      {{ Store.currentAccount }}
      <span>getAddress()</span>
    </el-card>
    <!-- <el-divider /> -->
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
const Store = useStore();
</script>

<style scoped>
/* 页面样式 */
</style>
