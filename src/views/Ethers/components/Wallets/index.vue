<template>
  <div class="tab-container">
    <h3>1. class BaseWallet</h3>
    <el-card class="mrg-top">
      <baseWallet></baseWallet>
    </el-card>
    <el-divider />

    <h3>2. class Mnemonnic</h3>
    <el-card class="mrg-top">
      <Mnemonic></Mnemonic>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import baseWallet from "./BaseWallet.vue";
import Mnemonic from "./Mnemonic.vue";
const Store = useStore();
const privateKey = import.meta.env.VITE_PRIVATEKEY;
</script>

<style scoped>
/* 页面样式 */
</style>
