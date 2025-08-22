<template>
  <div class="tab-container">
    <h3>1. TYPES </h3>
    <div class=" mrg-top code-comment">ContractEventName⇒ string | ContractEvent | TopicFilter | DeferredTopicFilter
    </div>
    <el-divider />

    <h3>2. class BaseContract</h3>
    <el-card class="mrg-top">
      <baseContract></baseContract>
    </el-card>
    <el-divider />

    <h3>3. interface BaseContractMethod</h3>
    <el-card class="mrg-top">
      <BaseContractMethod></BaseContractMethod>
    </el-card>
    <el-divider />

    <h3>4. interface ContractEvent</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">
        fragment⇒ EventFragment | name⇒ string
      </div>
      <div class="code-comment mrg-bot">
        getFragment(args: ContractEventArgs< A >)⇒ EventFragment
      </div>
      <el-button class="mrg-bot" type="primary" @click=" getFragmentFun"> getFragment</el-button>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import baseContract from "./baseContract.vue";
  import BaseContractMethod from "./BaseContractMethod.vue";
  import { useStore } from "@/store/index";
  const Store = useStore();
  const getFragmentFun = async () => {

  }
</script>

<style scoped>
  /* 页面样式 */
</style>