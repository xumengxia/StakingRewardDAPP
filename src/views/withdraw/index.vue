<template>
  <div class="withdraw">
    <!-- 选项卡（提取质押 / 提取奖励） -->
    <div class="max-w-md mx-auto mb-6">
      <button id="withdraw-staked" class="px-4 py-2 bg-gray-800 rounded">
        提取质押
      </button>
      <button id="withdraw-reward" class="px-4 py-2 bg-gray-800 rounded ml-2">
        提取奖励
      </button>
    </div>

    <!-- 提取质押 -->
    <div
      id="staked-section"
      class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg"
    >
      <h3 class="text-lg font-semibold mb-2">提取质押资产</h3>
      <p>可提取：<span id="withdraw-staked-amount">0 ETH</span></p>
      <button
        id="withdraw-staked-btn"
        class="mt-4 px-4 py-2 bg-red-600 rounded"
      >
        提取
      </button>
    </div>

    <!-- 提取奖励（默认隐藏，切换后显示） -->
    <div
      id="reward-section"
      class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg hidden"
    >
      <h3 class="text-lg font-semibold mb-2">提取奖励资产</h3>
      <p>可提取：<span id="withdraw-reward-amount">0 ETH</span></p>
      <button
        id="withdraw-reward-btn"
        class="mt-4 px-4 py-2 bg-red-600 rounded"
      >
        领取奖励
      </button>
    </div>

    <!-- 操作记录 -->
    <div class="mt-8 max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">操作记录</h3>
      <ul id="withdraw-history" class="space-y-2"></ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style scoped>
/* 页面样式 */
</style>
