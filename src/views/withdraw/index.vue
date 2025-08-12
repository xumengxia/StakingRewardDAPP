<template>
  <div class="withdraw">
    <!-- 提取质押 -->
    <div
      id="staked-section"
      class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg"
    >
      <h3 class="text-lg font-semibold mb-2">提取质押资产</h3>
      <p>
        可提取：<span id="withdraw-staked-amount"
          >{{ Store.stakData.balance }}
        </span>
      </p>
      <div class="mrg-top" style="display: flex">
        <el-input v-model="amount" placeholder="Eth" />
        <el-button type="primary" class="mrg-lef" @click="withdrawFun"
          >withdraw</el-button
        >
      </div>
    </div>
    <el-divider />
    <!-- 提取奖励（默认隐藏，切换后显示） -->
    <div
      id="reward-section"
      class="max-w-md mx-auto bg-gray-800 p-6 rounded-lg hidden"
    >
      <h3 class="text-lg font-semibold mb-2">提取奖励资产</h3>
      <p>
        可提取：<span id="withdraw-reward-amount">{{
          Store.rewardsData.balance
        }}</span>
      </p>
      <el-button class="mrg-top" type="primary" @click="getRewardFun"
        >getReward</el-button
      >
    </div>
    <el-divider />
    <!-- 操作记录 -->
    <div class="mt-8 max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">操作记录</h3>
      <ul id="withdraw-history" class="space-y-2"></ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
const Store = useStore();
const amount = ref("");
const withdrawFun = async () => {
  try {
    const tx = await Store.contracts.stakingRewards.withdraw(amount.value);
    await tx.wait(); // 等待区块确认
    console.log("getReward成功！", tx);
  } catch (err) {
    console.error("getReward失败:", err);
  }
};
const getRewardFun = async () => {
  try {
    const tx = await Store.contracts.stakingRewards.getReward();
    await tx.wait(); // 等待区块确认
    console.log("getReward成功！", tx);
  } catch (err) {
    console.error("getReward失败:", err);
  }
};
</script>

<style scoped>
/* 页面样式 */
</style>
