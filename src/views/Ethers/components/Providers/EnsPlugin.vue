<template>
  <h3 class="mrg-bot">6-1 class EnsPlugin</h3>
  <div>ENS 用于域名解析 支持多链 主要方法是 resolveName 和 lookupAddress</div>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">
      address⇒ stringread-only 合约地址 | targetNetwork⇒ number ENS所在的链的id
    </div>
    <el-button
      class="mrg-bot mrg-top"
      type="primary"
      @click="getEnsPluginPropertiesFun"
    >
      getEnsPluginProperties
    </el-button>
    <el-divider />

    <h4 class="mrg-bot">CREATING INSTANCES :</h4>
    <div class="code-comment">
      new EnsPlugin(address?: null | string, targetNetwork?: null | number
    </div>
    <el-button class="mrg-bot mrg-top" type="primary" @click="newEnsPluginFun">
      new EnsPlugin
    </el-button>
  </el-card>
  <el-divider />

  <h3 class="mrg-bot">6-2 interface EventFilter</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">
      address⇒ AddressLike | Array< AddressLike > | topics⇒ TopicFilter
    </div>

    <el-button class="mrg-bot mrg-top" type="primary" @click="EventFilterFun">
      EventFilter
    </el-button>
  </el-card>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();
const getEnsPluginPropertiesFun = () => {
  const ensPlugin = new ethers.EnsPlugin("0x1234567890abcdef", 1);
  console.log("ensPlugin", ensPlugin);
};
const newEnsPluginFun = async () => {
  const ensPlugin = new ethers.EnsPlugin("0x1234567890abcdef", 1);
  console.log("ensPlugin", ensPlugin);
};
const EventFilterFun = async () => {
  const eventFilter: ethers.EventFilter = {
    address: Store.currentAccount,
    topics: ["0x1234567890abcdef"],
  };
  console.log("eventFilter", eventFilter);
};
</script>

<style scoped></style>
