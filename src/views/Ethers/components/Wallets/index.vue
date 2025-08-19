<template>
  <div class="tab-container">
    <h3>1. TYPES</h3>
    <el-card class="mrg-top">
      <typeTable></typeTable>
    </el-card>
    <el-divider />

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