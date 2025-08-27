<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="providerData1" style="width: 100%">
    <el-table-column prop="name" label="名称" width="200" />
    <el-table-column prop="desc" label="desc" />
  </el-table>
  <el-button class="mrg-top" type="primary" @click="getGasCostProperties">
    getGasCostProperties
  </el-button>

  <el-divider />
  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="code-comment">
    new GasCostPlugin(effectiveBlock?: number, costs?: GasCostParameters)
  </div>
  <el-button class="mrg-top" type="primary" @click="newGasCostPluginFun">
    newGasCostPlugin
  </el-button>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();

const providerData1 = [
  {
    name: "effectiveBlock",
    desc: "这些gas费用值生效的起始区块编号（支持多硬分叉场景），只读属性",
  },
  {
    name: "txAccessListAddress",
    desc: "EIP-2930访问列表中每个地址的附加gas费用，只读属性",
  },
  {
    name: "txAccessListStorageKey",
    desc: "EIP-2930访问列表中每个存储键的附加gas费用，只读属性",
  },
  {
    name: "txBase",
    desc: "交易的基础gas费用，只读属性",
  },
  {
    name: "txCreate",
    desc: "创建新账户的gas费用，只读属性",
  },
  {
    name: "txDataNonzero",
    desc: "交易数据中每个非零字节的gas费用，只读属性",
  },
  {
    name: "txDataZero",
    desc: "交易数据中每个零字节的gas费用，只读属性",
  },
];

const getGasCostProperties = async () => {
  const defaultPlugin = new ethers.GasCostPlugin(11);
  console.log("effectiveBlock", defaultPlugin.effectiveBlock);
  console.log("txAccessListAddress", defaultPlugin.txAccessListAddress);
  console.log("txAccessListStorageKey", defaultPlugin.txAccessListStorageKey);
  console.log("txBase", defaultPlugin.txBase);
  console.log("txCreate", defaultPlugin.txCreate);
  console.log("txDataNonzero", defaultPlugin.txDataNonzero);
  console.log("txDataZero", defaultPlugin.txDataZero);
};

const newGasCostPluginFun = () => {
  try {
    // 1. 默认插件
    const defaultPlugin = new ethers.GasCostPlugin(11);

    console.log("✅ 默认插件创建成功:", defaultPlugin);
  } catch (error) {
    console.error("默认插件创建失败:", error);
  }
};
</script>

<style scoped></style>
