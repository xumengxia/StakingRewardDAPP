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
  import { ethers } from "ethers";
import { useStore } from "@/store/index";
const Store = useStore();
const checkFun = async () => {
  const currentBlock = await Store.provider.getBlockNumber(); // 获取当前区块
  console.log("当前区块：", currentBlock);
// 获取从区块0到最新区块的所有Staked事件
const filter = Store.contracts.stakingRewards.filters.Staked();
const events = await Store.contracts.stakingRewards.queryFilter(filter, 0, "latest");

console.log(events,'events');

// 遍历历史事件
events.forEach(event => {
  const { user, amount, timestamp } = event.args;
  console.log(user, amount, timestamp );
 
  console.log(ethers.formatEther(amount));
  
  // console.log(`历史记录：用户 ${user} 在 ${new Date(timestamp * 1000)} 质押了 ${ethers.formatEther(amount)} 代币`);
});
};
</script>

<style scoped></style>
