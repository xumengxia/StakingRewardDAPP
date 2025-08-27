<template>
  <h3 class="mrg-bot">14. class Log</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <el-table :data="providerData1" style="width: 100%">
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="desc" label="desc" />
    </el-table>
    <el-button class="mrg-bot" type="primary" @click="getLogFun">
      getLog
    </el-button>

    <el-divider />
    <h4 class="mrg-bot">METHODS:</h4>
    <el-table :data="methodsData" style="width: 100%">
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="desc" label="desc" />
      <el-table-column prop="result" label="结果" />
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="editFun(row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult, getAuthParams } from "@/utils/commonTools";
const Store = useStore();

const providerData1 = [
  {
    name: "address",
    desc: "日志发出的智能合约地址，只读属性",
  },
  {
    name: "blockHash",
    desc: "日志所在区块哈希值，建议通过getBlock获取完整区块信息，只读属性",
  },
  {
    name: "blockNumber",
    desc: "日志所在区块编号（区块高度），在孤儿区块情况下可能变化，只读属性",
  },
  {
    name: "data",
    desc: "日志事件发生时包含的数据内容，只读属性",
  },
  {
    name: "index",
    desc: "日志在区块中的索引位置（开发者通常不直接使用），可用于区块包含性证明，只读属性",
  },
  {
    name: "provider",
    desc: "用于获取额外信息的日志关联提供者，只读属性",
  },
  {
    name: "removed",
    desc: "若日志因孤儿区块被移除则为true（仅在孤儿事件监听器中可能发生），只读属性",
  },
  {
    name: "topics",
    desc: "日志包含的索引主题数组，可通过provider.getLogs方法高效过滤，只读属性",
  },
  {
    name: "transactionHash",
    desc: "日志所在交易的哈希值，建议通过getTransaction获取完整交易信息，只读属性",
  },
  {
    name: "transactionIndex",
    desc: "日志在交易中的索引位置，只读属性",
  },
];
const methodsData = [
  {
    name: "getBlock()",
    desc: "异步获取包含该日志的完整区块信息（返回Promise<Block>对象）",
  },
  {
    name: "getTransaction()",
    desc: "异步获取包含该日志的完整交易信息（返回Promise<TransactionResponse>对象）",
  },
  {
    name: "getTransactionReceipt()",
    desc: "异步获取该日志所在交易的收据（返回Promise<TransactionReceipt>对象）",
  },
  {
    name: "toJSON()",
    desc: "将日志转换为JSON兼容格式的普通对象",
  },
];
const logData = ref([]);
const getLogFun = async () => {
  const currentBlock = await Store.provider.getBlockNumber();
  console.log("当前区块号", currentBlock);
  const fromBlock = Math.max(0, currentBlock - 100);
  const toBlock = currentBlock;

  console.log(`查询区块范围: ${fromBlock} - ${toBlock}`);
  // 方法1: 查询所有日志
  const allLogs = await Store.provider.getLogs({
    fromBlock: fromBlock,
    toBlock: toBlock,
  });
  logData.value = allLogs;
  console.log("所有日志数量:", allLogs);
};
const editFun = async (row) => {
  switch (row.name) {
    case "getBlock()":
      const block = await logData.value[0].getBlock(row.result);
      row.result = block;
      console.log("区块信息", block);
      break;
    case "getTransaction()":
      const transaction = await logData.value[0].getTransaction(row.result);
      row.result = transaction;
      console.log("交易信息", transaction);
      break;
    case "getTransactionReceipt()":
      const receipt = await logData.value[0].getTransactionReceipt(row.result);
      row.result = receipt;
      console.log("交易收据", receipt);
      break;
    case "toJSON()":
      const json = await logData.value[0].toJSON();
      row.result = json;
      console.log("JSON", json);
      break;
  }
};
</script>

<style scoped></style>
