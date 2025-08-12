<template>
  <div class="profile">
    <div>
      <h2>钱包信息</h2>
      <p>{{ Store.isConnected ? Store.currentAccount : "0x...（未连接）" }}</p>
      <p>当前网络：</p>
    </div>
    <el-divider />
    <!-- 资产概览 -->
    <div>
      <h2>资产概览</h2>
      <p>
        Staking Token 余额：<span>{{ Store.stakData.balance }} ETH</span>
      </p>
      <p>
        已质押量：<span>{{ Store.stakData.totalSupply }} ETH</span>
      </p>
      <p>
        Rewards Token 余额：<span>{{ Store.rewardsData.balance }} ETH</span>
      </p>
    </div>
    <el-divider />
    <!-- 操作记录 -->
    <div>
      <h2>操作记录</h2>
      <el-button class="mrg-top" type="primary" @click="checkFun"
        >查询</el-button
      >
      <ul></ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
const Store = useStore();
const checkFun = async () => {
  const currentBlock = await Store.provider.getBlockNumber(); // 获取当前区块
  console.log("当前区块：", currentBlock);
  // const filter = Store.contracts.stakingRewards.filters.Transfer;
  const events = await Store.contracts.stakingRewards.queryFilter(
    null, // 传入 null 表示不筛选特定事件
    0, // 起始区块：创世块
    "latest" // 结束区块：最新块
  );
  console.log("查询历史事件：", events, events.length);
};
</script>

<style scoped></style>
