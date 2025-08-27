<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="mrg-bot code-comment">networkPlugin.name⇒ string</div>
  <el-divider />
  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="mrg-bot code-comment">new NetworkPlugin(name: string)</div>
  <el-button class="mrg-bot" type="primary" @click="newNetworkPluginFun">
    new NetworkPlugin
  </el-button>
  <h4 class="mrg-bot">METHODS:</h4>
  <div class="mrg-bot code-comment">networkPlugin.clone()⇒ NetworkPlugin</div>
  <el-button class="mrg-bot" type="primary" @click="copyFun">
    networkPlugin.clone()
  </el-button>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();

const newNetworkPluginFun = () => {
  const networkPlugin = new ethers.NetworkPlugin("name");
  console.log(networkPlugin, "newNetworkPluginFun");
};
const copyFun = () => {
  const networkPlugin = new ethers.NetworkPlugin("name");
  const copyNetworkPlugin = networkPlugin.clone();
  console.log(copyNetworkPlugin, "copyFun");
};
</script>

<style scoped></style>
