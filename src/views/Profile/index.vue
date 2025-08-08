<template>
  <div class="profile">
    <div class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">钱包信息</h2>
      <p id="wallet-address">0x...（未连接）</p>
      <p class="text-sm text-gray-400">当前网络：本地测试网</p>
    </div>

    <!-- 资产概览 -->
    <div class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-4">资产概览</h2>
      <p>Staking Token 余额：<span id="staking-balance">0 ETH</span></p>
      <p>已质押量：<span id="staked-balance">0 ETH</span></p>
      <p>Rewards Token 余额：<span id="rewards-balance">0 ETH</span></p>
    </div>

    <!-- 操作记录 -->
    <div class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-2">操作记录</h2>
      <ul id="operation-history" class="space-y-2"></ul>
      <button id="refresh-btn" class="mt-4 px-4 py-2 bg-blue-600 rounded">
        刷新数据
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style scoped>
/* 页面样式 */
</style>
