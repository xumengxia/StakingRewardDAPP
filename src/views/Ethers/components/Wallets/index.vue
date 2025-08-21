<template>
  <div class="tab-container">
    <h3>1. class BaseWallet</h3>
    <el-card class="mrg-top">
      <baseWallet></baseWallet>
    </el-card>
    <el-divider />

    <h3>2. class Mnemonnic</h3>
    <el-card class="mrg-top">
      <MnemonicTable></MnemonicTable>
    </el-card>
    <el-divider />

    <h3>3.class Wallet</h3>
    <el-card class="mrg-top">
      <Wallet></Wallet>
    </el-card>
    <el-divider />

    <h3>4.HD Wallets</h3>
    <el-card class="mrg-top mrg-bot">
      <h3>4.1 CONSTANTS:defaultPath=>string</h3>
      <el-divider />
      <h3 class="mrg-bot">4.2 FUNCTIONS</h3>
      <h4 class="mrg-bot">getAccountPath(index: Numeric)⇒ string <span class="code-pink">（未实现）</span></h4>
      <el-button class="mrg-bot" type="primary" @click="getAccountPath">getAccountPath</el-button>
      <div class="code-result mrg-bot">defaultPath：{{defaultPath}}</div>
      <el-divider />
    </el-card>
    <el-divider />

    <h3>5.class HDNodeVoidWallet =>仅包含公钥和链码，‌不存储私钥‌，适用于观察模式（watch-only）‌
    </h3>
    <el-card class="mrg-top">
      <hdNodeVoidWallet></hdNodeVoidWallet>
    </el-card>
    <el-divider />

    <h3>5.class HDNodeWallet=>完整包含私钥、公钥和链码（chainCode），可执行交易签名等敏感操作‌
    </h3>
    <el-card class="mrg-top">
      <hdNodeWallet></hdNodeWallet>
    </el-card>
    <el-divider />

    <h3>6. JSON Wallets </h3>
    <el-card class="mrg-top">
      <jsonWallet></jsonWallet>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import baseWallet from "./BaseWallet.vue";
  import MnemonicTable from "./Mnemonic.vue";
  import hdNodeVoidWallet from "./hdNodeVoidWallet.vue";
  import hdNodeWallet from "./hdNodeWallet.vue";
  import jsonWallet from "./jsonWallet.vue";
  import Wallet from "./Wallet.vue";
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const defaultPath = ref('');
  const Mnemonic = ethers.Mnemonic.fromEntropy("0x" + privateKey);
  // const wallet = new ethers.Wallet(privateKey);
  const getAccountPath = async () => {
    // 通过助记词生成HD钱包
    const hdNode = await ethers.Wallet.fromPhrase(Mnemonic.phrase)
    console.log('hdNode', hdNode);
    defaultPath.value = hdNode.path


  }
</script>

<style scoped>
  /* 页面样式 */
</style>