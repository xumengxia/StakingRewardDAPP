<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    contractUnknownEventPayload.log⇒ Log
  </div>
  <el-button class="mrg-bot" type="primary" @click="contractUnknownEventPayloadFun">
    contractUnknownEventPayload
  </el-button>
  <el-button class="mrg-bot" type="success" @click="testSetRewardsDuration">
    测试触发 SetDuration 事件
  </el-button>
  <el-divider />

  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new ContractUnknownEventPayload(contract: BaseContract, listener: null | Listener, filter: ContractEventName, log:
    Log)
  </div>
  <el-divider />

  <h4 class="mrg-bot">METHODS:</h4>
  <div class="code-comment mrg-bot">
    contractUnknownEventPayload.getBlock()⇒ Promise< Block >
  </div>
  <el-button class="mrg-bot" type="primary" @click="getBlockFun">
    getBlock
  </el-button>
  <div class="code-comment mrg-bot">
    contractUnknownEventPayload.getTransaction()⇒ Promise< TransactionResponse >
  </div>
  <el-button class="mrg-bot" type="primary" @click="getTransactionFun">
    getTransaction
  </el-button>
  <div class="code-comment mrg-bot">
    contractUnknownEventPayload.getTransactionReceipt()⇒ Promise< TransactionReceipt >
  </div>
  <el-button class="mrg-bot" type="primary" @click="getTransactionReceiptFun">
    getTransactionReceipt
  </el-button>

</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import baseContract from "./baseContract.vue";
  import BaseContractMethod from "./BaseContractMethod.vue";
  import { useStore } from "@/store/index";
  import { processAuthResult } from "@/utils/commonTools";
  import contractFactory from "./contractFactory.vue";
  const Store = useStore();
  const eventLog = ref();
  const emit = defineEmits(['updateEvenload']);
  Store.contracts.stakingRewards.on("SetDuration", (user, duration, timestamp, eventPayload) => {
    // console.log("=== SetDuration 事件被触发 ===");
    // console.log("用户地址:", user);
    // console.log("时长:", duration.toString());
    // console.log("时间戳:", timestamp.toString());
    console.log("完整事件对象:", eventPayload);
    eventLog.value = eventPayload;
    emit('updateEvenload', eventPayload.log);
  });


  // 测试触发 SetDuration 事件
  const testSetRewardsDuration = async () => {
    try {
      // console.log("🚀 开始调用 setRewardsDuration 函数...");

      // 调用合约函数来触发事件
      const tx = await Store.contracts.stakingRewards.setRewardsDuration(1000);
      const receipt = await tx.wait();
      // console.log("✅ 交易已确认，收据:", receipt);

      // 查看交易日志
      if (receipt.logs && receipt.logs.length > 0) {
        // console.log("📋 交易日志:", receipt.logs);
        // 解析事件日志
        const eventLog = Store.contracts.stakingRewards.interface.parseLog(receipt.logs[0]);
        console.log("🔍 解析后的事件:", eventLog);

      }

    } catch (error) {
      console.error("❌ 调用 setRewardsDuration 时出错:", error);
    }
  };
  const getBlockFun = async () => {

    const block = await eventLog.value.getBlock();
    console.log("🔍 获取区块:", block);
  }
  const getTransactionFun = async () => {
    const transaction = await eventLog.value.getTransaction();
    console.log("🔍 获取交易:", transaction);
  }
  const getTransactionReceiptFun = async () => {
    const transactionReceipt = await eventLog.value.getTransactionReceipt();
    console.log("🔍 获取交易收据:", transactionReceipt);
  }
</script>

<style scoped>
  /* 页面样式 */
</style>