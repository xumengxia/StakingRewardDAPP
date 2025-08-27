<template>
  <h3 class="mrg-bot">8 FeeDataNetworkPlugin</h3>
  <el-card class="mrg-top">
    <div class="mrg-bot">
      是一个网络插件，允许网络提供自定义的费用数据获取方式，特别适用于不支持
      EIP-1559 的网络，可以通过 Gas Station 等外部服务来估算 gas
      价格。不需要了解
    </div>
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">
      feeDataFunc⇒ (provider: Provider) => Promise< FeeData >
    </div>
    <el-divider />

    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">
      getFeeData(provider: Provider)⇒ Promise< FeeData >
    </div>
    <el-button class="mrg-bot mrg-top" type="primary"> getFeeData </el-button>
  </el-card>
  <el-divider />

  <h3 class="mrg-bot">9 FetchUrlFeeDataNetworkPlugin</h3>
  <el-card class="mrg-top">
    <div class="mrg-bot">
      FetchUrlFeeDataNetworkPlugin 是一个网络插件，通过 HTTP 请求从外部 URL
      获取费用数据，特别适用于需要从 Gas Station、API 服务等外部源获取实时 gas
      价格的场景。
    </div>
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">
      processFunc⇒ (f: () => Promise< FeeData >, p: Provider, r: FetchRequest)
      => Promise< { gasPrice?: null | bigint , maxFeePerGas?: null | bigint ,
      maxPriorityFeePerGas?: null | bigint } >
    </div>
    <div>url⇒ string</div>
    <el-divider />

    <h4 class="mrg-bot">CREATING INSTANCES:</h4>
    <div class="code-comment">
      new FetchUrlFeeDataNetworkPlugin(url: string, processFunc: (f: () =>
      Promise< FeeData >, p: Provider, r: FetchRequest) => Promise< { gasPrice?:
      null | bigint , maxFeePerGas?: null | bigint , maxPriorityFeePerGas?: null
      | bigint } >)
    </div>
    <div>url⇒ string</div>
    <el-button class="mrg-bot mrg-top" type="primary">
      New FetchUrlFeeDataNetworkPlugin
    </el-button>
  </el-card>
  <el-divider />

  <h3 class="mrg-bot">10 interface Filter</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">fromBlock⇒ BlockTag | toBlock⇒ BlockTag</div>
    <el-button class="mrg-bot mrg-top" type="primary" @click="getFilterFun">
      getFilter
    </el-button>
  </el-card>
  <el-divider />

  <h3 class="mrg-bot">11 interface FilterByBlockHash</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment">blockHash⇒ string</div>
    <el-button
      class="mrg-bot mrg-top"
      type="primary"
      @click="FilterByBlockHashFun"
    >
      FilterByBlockHash
    </el-button>
  </el-card>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();
const getFilterFun = async () => {
  const rangeFilter: ethers.Filter = {
    fromBlock: 1000,
    toBlock: 2000,
  };
  console.log("rangeFilter", rangeFilter);
};
const FilterByBlockHashFun = async () => {
  // const blockHashFilter: ethers.FilterByBlockHash = {
  //   blockHash: "0x1234567890abcdef",
  // };
  // console.log("blockHashFilter", blockHashFilter);
  const latestBlock = await Store.provider.getBlock("latest");
  const blockHash = latestBlock.hash;
  console.log("blockHash", blockHash);
};
</script>

<style scoped></style>
