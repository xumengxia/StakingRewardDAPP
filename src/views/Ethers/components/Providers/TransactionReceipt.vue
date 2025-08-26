<template>
  <h4 class="mrg-bot">txgetReceipt.value = await Store.provider.getTransactionReceipt(tx.hash);</h4>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="transactionReceiptProperties" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
  </el-table>
  <el-button class="mrg-bot mrg-top" type="primary" @click="getReceipt">getReceipt</el-button>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="transactionReceiptMethods" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <!-- <el-table-column prop="type" label="类型" /> -->
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="methodHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools';
  const Store = useStore();


  const txgetReceipt = ref(null);
  const getReceipt = async () => {
    const tx = await Store.signer.sendTransaction({
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      value: ethers.parseEther('1'),
      gasLimit: 21000
    });
    console.log('tx', tx);

    // 获取交易响应
    txgetReceipt.value = await Store.provider.getTransactionReceipt(tx.hash);
    if (txgetReceipt.value) {
      console.log(`交易收据信息:`, txgetReceipt.value);
      console.log(`区块高度:`, txgetReceipt.value.blockNumber);
      console.log(`gas 价格:`, txgetReceipt.value.gasPrice);
      console.log(`gas 消耗量:`, txgetReceipt.value.gasUsed);
      console.log(`合约地址:`, txgetReceipt.value.contractAddress);
    }
    // 检查交易是否被打包
    const mined = await tx.wait();
    if (mined) {
      console.log('Transaction mined in block:', mined.blockNumber);
    }


  }
  const transactionReceiptProperties = [
    { name: "blobGasPrice", type: "null | bigint", desc: "EIP-4844 每 BLOB 支付的 gas 价格" },
    { name: "blobGasUsed", type: "null | bigint", desc: "EIP-4844 用于 BLOBs 的 gas 消耗量" },
    { name: "blockHash", type: "string", desc: "交易被包含的区块哈希" },
    { name: "blockNumber", type: "number", desc: "交易被包含的区块高度" },
    { name: "contractAddress", type: "null | string", desc: "合约部署地址（仅当交易成功部署合约时）" },
    { name: "cumulativeGasUsed", type: "bigint", desc: "区块内该交易及之前交易累积 gas 消耗" },
    { name: "fee", type: "bigint", desc: "交易总费用（wei）" },
    { name: "from", type: "string", desc: "交易发送者地址" },
    { name: "gasPrice", type: "bigint", desc: "实际执行时的 gas 价格（EIP-1559）" },
    { name: "gasUsed", type: "bigint", desc: "交易实际消耗的 gas 量" },
    { name: "hash", type: "string", desc: "交易哈希" },
    { name: "index", type: "number", desc: "交易在区块中的索引位置" },
    { name: "logs", type: "ReadonlyArray<Log>", desc: "交易产生的日志" },
    { name: "logsBloom", type: "string", desc: "日志的布隆过滤器" },
    { name: "provider", type: "Provider", desc: "日志查询提供者" },
    { name: "root", type: "null | string", desc: "交易根哈希（仅存在于 Byzantium 前区块）" },
    { name: "status", type: "null | number", desc: "交易状态（1=成功，0=回滚）" },
    { name: "to", type: "null | string", desc: "交易目标地址" },
    { name: "type", type: "number", desc: "EIP-2718 交易类型" }
  ];

  const transactionReceiptMethods = [
    {
      name: "confirmations",
      returnType: "Promise<number>",
      desc: "获取该交易已获得的确认数"
    },
    {
      name: "getBlock",
      returnType: "Promise<Block>",
      desc: "获取包含该交易的区块对象"
    },
    {
      name: "getResult",
      returnType: "Promise<string>",
      desc: "获取该交易的执行返回值（需要支持 debug_/trace_ API 的存档节点）"
    },
    {
      name: "getTransaction",
      returnType: "Promise<TransactionResponse>",
      desc: "获取该交易对应的交易响应对象"
    },
    {
      name: "toJSON",
      returnType: "any",
      desc: "获取该交易收据的JSON兼容表示形式"
    }
  ];


  const methodHelpeFun = async (row) => {
    try {
      switch (row.name) {
        case "confirmations":
          row.result = await txgetReceipt.value.confirmations();
          break;
        case "getBlock":
          // 使用不同的变量名避免冲突
          const block = await txgetReceipt.value.getBlock();
          console.log(block);  // 打印区块信息
          row.result = block;
          break;
        case "getResult":
          row.result = await txgetReceipt.value.getResult();
          console.log(row.result, 'getResult');
          break;
        case "getTransaction":
          row.result = await txgetReceipt.value.getTransaction();
          console.log(row.result, 'getTransaction');
          break;
        case "toJSON":
          row.result = txgetReceipt.value.toJSON();
          break;

      }


    } catch (error) {
      console.error(`❌ 获取 ${row.name} 时出错:`, error);
      row.result = "错误: " + error.message;
    }
  }

</script>

<style scoped></style>