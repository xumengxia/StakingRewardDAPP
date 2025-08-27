<template>
  <div>
    核心价值： 解决并发问题：<br />
    自动管理 nonce 冲突 <br />
    提升可靠性：减少交易失败率 <br />
    简化开发：无需手动计算 nonce 生产必备：实际应用中的核心工具 <br />
    记住要点： 并发交易时使用 创建一次，重复使用 自动处理 nonce 递增 <br />
    支持重试和错误处理
  </div>
  <h4 class="mrg-bot mrg-top">PROPERTIES:</h4>

  <div>signer⇒ Signer</div>
  <el-divider />
  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="mrg-bot code-comment">new NonceManager(signer: Signer)</div>
  <el-button class="mrg-bot" type="primary" @click="newNonceManagerFun">
    new NonceManager
  </el-button>

  <el-divider />
  <h4 class="mrg-bot">METHODS:</h4>
  <div class="mrg-bot code-comment">nonceManager.increment()⇒ void</div>
  <el-button class="mrg-bot" type="primary" @click="incrementFun">
    increment
  </el-button>
  <div class="mrg-bot code-comment">nonceManager.reset()⇒ void</div>
  <el-button class="mrg-bot" type="primary" @click="resetFun">
    reset
  </el-button>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();
const nonceManager = new ethers.NonceManager(Store.signer);
const newNonceManagerFun = () => {};

const incrementFun = () => {
  console.log(Store.signer);

  const nonceManager = new ethers.NonceManager(Store.signer);
  const currentNonce = nonceManager.increment();
  console.log("当前 nonce:", currentNonce); // 例如: 5
  // 再次调用会返回下一个 nonce
  const nextNonce = nonceManager.increment();
  console.log("下一个 nonce:", nextNonce); // 例如: 6
};

const resetFun = () => {
  nonceManager.reset();
  console.log(nonceManager, "resetFun");
};

// 并发发送多个交易
async function sendMultipleTransactions() {
  const tx1 = {
    to: "0x...",
    value: ethers.parseEther("0.1"),
  };

  const tx2 = {
    to: "0x...",
    value: ethers.parseEther("0.2"),
  };

  // 使用 NonceManager 自动管理 nonce
  const promise1 = nonceManager.sendTransaction(tx1);
  const promise2 = nonceManager.sendTransaction(tx2);

  // 两个交易会按顺序发送，nonce 自动递增
  const [result1, result2] = await Promise.all([promise1, promise2]);

  console.log("交易1:", result1.hash);
  console.log("交易2:", result2.hash);
}

// 批量转账给多个地址
async function batchTransfer(recipients: string[], amounts: bigint[]) {
  const transactions = recipients.map((recipient, index) => ({
    to: recipient,
    value: amounts[index],
  }));

  // 并发发送，NonceManager 自动排队
  const promises = transactions.map((tx) => nonceManager.sendTransaction(tx));

  try {
    const results = await Promise.all(promises);
    console.log(`成功发送 ${results.length} 笔交易`);
    return results;
  } catch (error) {
    console.error("批量转账失败:", error);
    throw error;
  }
}
</script>

<style scoped></style>
