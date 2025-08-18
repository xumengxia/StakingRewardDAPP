<template>
  <div class="tab-container">
    <h3>1. getAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">转换为标准的校验和地址</h4>
      <h4 class=" mrg-bot">getAddress("{{ Store.currentAccount }}")</h4>
      <div>
        <el-button type="primary">getAddress</el-button>
      </div>
      <span class="code-result">// {{ }}</span>
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