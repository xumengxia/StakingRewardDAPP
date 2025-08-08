<template>
  <div class="Staking">
    <!-- 操作区 -->
    <div class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">质押操作</h2>
      <!-- 质押数量输入 -->
      <div class="mb-4">
        <label class="block mb-2">质押数量（ETH）</label>
        <input
          type="number"
          id="stake-amount"
          class="w-full px-3 py-2 bg-gray-700 rounded"
          placeholder="输入数量"
        />
      </div>
      <!-- 授权按钮（先调用approve） -->
      <button
        id="approve-btn"
        class="w-full px-4 py-2 bg-blue-600 rounded mb-4"
      >
        授权（Approve）
      </button>
      <!-- 质押按钮（授权后可用） -->
      <button
        id="stake-btn"
        class="w-full px-4 py-2 bg-green-600 rounded"
        disabled
      >
        质押（Stake）
      </button>
    </div>

    <!-- 质押信息区 -->
    <div class="mt-8 max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">当前质押信息</h3>
      <p>已质押：<span id="user-staked">0 ETH</span></p>
      <p>预计奖励：<span id="estimated-reward">0 ETH</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style scoped>
/* 页面样式 */
</style>
