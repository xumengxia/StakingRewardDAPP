<template>
  <div class="tab-container">
    <h3>1. TYPES</h3>
    <div class="mrg-top code-comment">
      ContractEventName⇒ string | ContractEvent | TopicFilter |
      DeferredTopicFilter
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
      <el-button class="mrg-bot" type="primary" @click="getFragmentFun">
        getFragment</el-button
      >
    </el-card>
    <el-divider />

    <h3>5. interface ContractEventPayload</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">
        args⇒ Result | eventName⇒ stringr | eventSignature=>string |
        fragment=>EventFragment | log=>EventLog
      </div>
    </el-card>
    <el-divider />

    <h3>6. class ContractFactory</h3>
    <el-card class="mrg-top">
      <contractFactory></contractFactory>
    </el-card>
    <el-divider />

    <h3>7. interface ContractTransaction</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">
        data⇒ string | from⇒ string | to⇒ string
      </div>
    </el-card>
    <el-divider />

    <h3>8. class ContractTransactionReceipt合同交易收据</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">logs⇒ Array< EventLog | Log ></div>
    </el-card>
    <el-divider />

    <h3>9. class ContractTransactionResponse交易合同响应</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">METHODS:</h4>
      <div class="code-comment mrg-bot">
        .wait(confirms?: number, timeout?: number)⇒ Promise< null |
        ContractTransactionReceipt >
      </div>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import baseContract from "./baseContract.vue";
import BaseContractMethod from "./BaseContractMethod.vue";
import { useStore } from "@/store/index";
import { processAuthResult } from "@/utils/commonTools";
import contractFactory from "./contractFactory.vue";
const Store = useStore();

const getFragmentFun = async () => {
  try {
    // Get the event from the contract interface
    const _getEvent = Store.contracts.stakingRewards.getEvent("SetDuration");
    console.log("Event:", processAuthResult(_getEvent));

    // Get the fragment from the event
    const _fragment = _getEvent.getFragment();
    console.log("Fragment:", _fragment);
  } catch (error) {
    console.error("Error getting event fragment:", error);
  }
};
</script>

<style scoped>
/* 页面样式 */
</style>
