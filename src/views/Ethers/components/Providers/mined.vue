<template>
  <h3 class="mrg-bot">15.1 interface MinedBlock 挖矿区块</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <el-table :data="providerData1" style="width: 100%">
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="desc" label="desc" />
    </el-table>
    <el-button class="mrg-bot" type="primary" @click="getMinedBlockFun">
      getMinedBlock
    </el-button>
  </el-card>
  <el-divider />
  <h3 class="mrg-bot">15.2 interface MinedTransactionResponse 挖矿交易响应</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <el-table :data="providerData2" style="width: 100%">
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="desc" label="desc" />
    </el-table>
    <el-button
      class="mrg-bot"
      type="primary"
      @click="getMinedTransactionResponseFun"
    >
      getMinedTransactionResponse
    </el-button>
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
    name: "date",
    desc: "区块日期（根据时间戳生成），只读属性",
  },
  {
    name: "hash",
    desc: "区块哈希值，唯一标识符，只读属性",
  },
  {
    name: "miner",
    desc: "区块矿工地址（即区块生产者），只读属性",
  },
  {
    name: "number",
    desc: "区块编号（即区块高度），只读属性",
  },
  {
    name: "timestamp",
    desc: "区块时间戳（自纪元起的秒数），只读属性",
  },
];
const providerData2 = [
  {
    name: "blockHash",
    desc: "该交易所在区块的哈希值",
  },
  {
    name: "blockNumber",
    desc: "该交易所在区块的编号（区块高度）",
  },
  {
    name: "date",
    desc: "该交易发生的具体日期",
  },
];
const getMinedBlockFun = async () => {
  const latestBlock = await Store.provider.getBlock("latest");
  const blockDate = latestBlock.date;
  console.log("区块日期:", blockDate);
  console.log("格式化日期:", blockDate.toLocaleString());

  // 2. 区块哈希
  const blockHash = latestBlock.hash;
  console.log("区块哈希:", blockHash);

  // 3. 矿工地址
  const miner = latestBlock.miner;
  console.log("矿工地址:", miner);

  // 4. 区块号/高度
  const blockNumber = latestBlock.number;
  console.log("区块号:", blockNumber);

  // 5. 区块时间戳
  const timestamp = latestBlock.timestamp;
  console.log("时间戳:", timestamp);
  console.log("Unix时间:", new Date(timestamp * 1000).toLocaleString());
};
const getMinedTransactionResponseFun = async () => {
  try {
    const txHash =
      "0xdc872917c3fa8d9ed15d28607b845120bab17aae5ae7016c2476d2ca2032380d";

    // 获取交易收据
    const receipt = await Store.provider.getTransactionReceipt(txHash);
    console.log("交易收据:", receipt);

    if (!receipt) {
      console.log("❌ 交易尚未被挖矿或不存在");

      return;
    }

    // 获取区块信息
    const block = await Store.provider.getBlock(receipt.blockHash);
    console.log("区块信息:", block);

    if (!block) {
      console.log("❌ 无法获取区块信息");

      return;
    }

    // 构造 MinedTransactionResponse 实例
    const minedTxResponse = {
      blockHash: receipt.blockHash,
      getBlock,
      blockNumber: receipt.blockNumber,
      date: new Date(block.timestamp * 1000),
    };

    console.log("MinedTransactionResponse 实例:", minedTxResponse);

    console.log(
      `✅ 获取成功:
      区块哈希: ${minedTxResponse.blockHash.slice(0, 10)}...
      区块号: ${minedTxResponse.blockNumber}
      交易日期: ${minedTxResponse.date.toLocaleString()}`
    );
  } catch (error) {
    console.error("获取 MinedTransactionResponse 失败:", error);
  }
};
</script>

<style scoped></style>
