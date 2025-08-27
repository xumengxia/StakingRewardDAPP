<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="providerData1" style="width: 100%">
    <el-table-column prop="name" label="名称" width="200" />
    <el-table-column prop="desc" label="desc" />
  </el-table>
  <!-- <el-button class="mrg-top" type="primary" @click="getGasCostProperties">
    getGasCostProperties
  </el-button> -->

  <el-divider />
  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="code-comment">
    new FeeData(gasPrice?: null | bigint, maxFeePerGas?: null | bigint,
    maxPriorityFeePerGas?: null | bigint)
  </div>
  <el-button class="mrg-top" type="primary" @click="newFeeDataFun">
    new FeeData
  </el-button>

  <el-divider />
  <h4 class="mrg-bot">METHODS:</h4>
  <div class="code-comment">toJSON()⇒ any</div>
  <el-button class="mrg-top" type="primary" @click="toJSONFun">
    toJSON
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
    name: "gasPrice",
    desc: "传统网络的gas价格（仅限EIP-1559前网络），只读属性",
  },
  {
    name: "maxFeePerGas",
    desc: "每gas的最大费用（EIP-1559网络）= 基础费 + 优先费，且不超过此值，传统网络为null，只读属性",
  },
  {
    name: "maxPriorityFeePerGas",
    desc: "每gas的最大优先费（激励验证者打包交易），传统网络为null，只读属性",
  },
];
const toJSONFun = () => {
  const feeData = new ethers.FeeData(
    1000000000000000000,
    1000000000000000000,
    1000000000000000000
  );
  const json = feeData.toJSON();
  console.log("json", json);
};
const newFeeDataFun = async () => {
  const feeData = new ethers.FeeData(
    1000000000000000000,
    1000000000000000000,
    1000000000000000000
  );
  console.log("feeData", feeData);
};
</script>

<style scoped></style>
