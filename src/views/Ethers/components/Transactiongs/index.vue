<template>
  <div class="tab-container">
    <h3>1. TYPES</h3>
    <el-card class="mrg-top">
      <typeTable></typeTable>
    </el-card>
    <el-divider />

    <h3>2. FUNCTIONS</h3>
    <el-card class="mrg-top">
      <functionsTable></functionsTable>
    </el-card>
    <el-divider />

    <h3>3. INTERFACE</h3>
    <el-card class="mrg-top">
      <interfaceTable></interfaceTable>
    </el-card>
    <el-divider />

    <h3>4. class Transaction (类的属性表格介绍)</h3>
    <el-card class="mrg-top">
      <classTable></classTable>
    </el-card>
    <el-divider />

    <h3>4. CREATING INSTANCES(创建实例)</h3>
    <el-card class="mrg-top">
      <div class="mrg-bot">4.1 构造函数参数 </div>
      <el-button type="primary" @click="newTransaction">new Transaction()</el-button>
      <div class="mrg-bot mrg-top">4.2 Transaction.from(tx?: string | TransactionLike string)</div>
      <el-button type="primary" @click="transactionFrom">Transaction.from</el-button>
      <h4 class="mrg-bot mrg-top">4.2 FUNCTIONS</h4>
      <functions></functions>
    </el-card>
    <el-divider />

    <h3>5. interface TransactionLike</h3>
    <el-card class="mrg-top">


      <transactionLike></transactionLike>
    </el-card>
    <!-- <el-divider /> -->
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import typeTable from "./typeTable.vue";
  import functionsTable from "./functionsTable.vue";
  import interfaceTable from "./interfaceTable.vue";
  import classTable from "./classTable.vue";
  import functions from "./functions.vue";
  import transactionLike from "./transactionLike.vue";
  import { useStore } from "@/store/index";

  const Store = useStore();
  const newTransaction = async () => {
    const tx = await new ethers.Transaction()
    console.log('newTransaction', tx);

  }
  const transactionFrom = async () => {
    // const tx = await ethers.Transaction.from(Store.currentAccount)
    const tx = await ethers.Transaction.from({
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      value: 100,
    })
    console.log('transactionFrom', tx);

  }
</script>

<style scoped>
  /* 页面样式 */
</style>