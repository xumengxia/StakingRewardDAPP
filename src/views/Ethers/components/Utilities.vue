<template>
  <div class="tab-container">
    <h3>1. Base58 Encoding()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">Base58是一种去除了易混淆字符的编码格式，主要用于加密货币地址和放混淆场景</h4>
      <el-button type="primary">encodeBase58</el-button> <br>
      <el-button type="primary">decodeBase58</el-button> <br>
      <span class="code-result">// {{ }}</span> <br>
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