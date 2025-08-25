<template>
  <div class="tab-container">
    <h3 class="mrg-bot">1. TYPES</h3>
    <el-card class="mrg-top">
      <div class="code-comment mrg-bot">
        基础操作：BlockTag、TopicFilter<br />
        网络连接：BrowserProviderOptions、WebSocketCreator<br />
        事件监听：ProviderEvent、DebugEventBrowserProvider<br />
        交易优化：GasCostParameters<br />
        状态监控：OrphanFilter<br />
      </div>
      <typeTable></typeTable>
    </el-card>
    <el-divider />
    <el-divider />
    <h3 class="mrg-bot">2.FUNCTIONS </h3>
    <el-card class="mrg-top">
      <div class="code-comment mrg-bot">
        opyRequest(req: TransactionRequest)⇒ PreparedTransactionRequest
      </div>
      <el-button class="mrg-bot" type="primary" @click="copyRequestFun">
        copyRequest</el-button>
      <div class="code-comment mrg-bot">
        getDefaultProvider(network?: string | Networkish | WebSocketLike, options?: any)⇒ AbstractProvider
      </div>
      <el-button class="mrg-bot" type="primary" @click="getDefaultProviderFun">
        getDefaultProvider</el-button>
    </el-card>
    <el-divider />


    <h3 class="mrg-bot">3. class Block</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <blockTable></blockTable>
    </el-card>

    <el-divider />
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import typeTable from "./typeTable.vue";
  import blockTable from "./blockTable.vue";
  const Store = useStore();
  const copyRequestFun = () => {
    const request = {
      to: "0x0000000000000000000000000000000000000000",
      value: ethers.parseEther("0.001"),
      gasLimit: 21000,
      gasPrice: ethers.parseUnits("100", "gwei")
    };
    const _request = ethers.copyRequest(request);
    console.log(_request, "copyRequestFun");
  };
  const getDefaultProviderFun = () => {
    // Connect to a local Geth node
    const _provider1 = ethers.getDefaultProvider("http://localhost:8545/");
    console.log(_provider1, "copyRequestFun");
    // Connect to Ethereum mainnet with any current and future third-party services available
    const _provider2 = ethers.getDefaultProvider("mainnet");
    console.log(_provider2, "copyRequestFun");
    // Connect to Polygon, but only allow Etherscan and
    // INFURA and use "MY_API_KEY" in calls to Etherscan.
    const _provider3 = ethers.getDefaultProvider("matic", {
      etherscan: "KQJW5N5JVQVZZ1RJ2C4ZC1IQW3E1ZNNSAV",
      exclusive: ["etherscan", "infura"]
    });
    console.log(_provider3, "copyRequestFun");
  };
</script>

<style scoped>
  /* 页面样式 */
</style>