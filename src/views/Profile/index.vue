<template>
  <div class="profile">
    <div>
      <h2>钱包信息</h2>
      <p>{{ Store.isConnected ? Store.currentAccount : "0x...（未连接）" }}</p>
      <p>当前网络：</p>
    </div>

    <!-- 资产概览 -->
    <div>
      <h2>资产概览</h2>
      <p>Staking Token 余额：<span>0 ETH</span></p>
      <p>
        已质押量：<span>{{ Store.stakData.totalSupply }} ETH</span>
      </p>
      <p>Rewards Token 余额：<span>0 ETH</span></p>
    </div>

    <!-- 操作记录 -->
    <div>
      <h2>操作记录</h2>
      <ul></ul>
      <button id="refresh-btn" class="mt-4 px-4 py-2 bg-blue-600 rounded">
        刷新数据
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
const Store = useStore();
</script>

<style scoped></style>
