<template>
  <h4 class="mrg-bot">txResponse.value = await Store.provider.getTransaction(tx.hash);</h4>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="transactionProperties" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
  </el-table>
  <el-button class="mrg-bot mrg-top" type="primary" @click="getProperties">getProperties</el-button>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="transactionMethods" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
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

  const transactionProperties = [
    { name: "accessList", type: "null | AccessList", desc: "EIP-2930访问列表" },
    { name: "authorizationList", type: "null | Array<Authorization>", desc: "EIP-7702授权列表" },
    { name: "blobVersionedHashes", type: "null | Array<string>", desc: "EIP-4844 BLOB版本化哈希" },
    { name: "blockHash", type: "null | string", desc: "交易所在区块的哈希" },
    { name: "blockNumber", type: "null | number", desc: "交易所在区块高度" },
    { name: "chainId", type: "bigint", desc: "链ID" },
    { name: "data", type: "string", desc: "交易数据" },
    { name: "from", type: "string", desc: "交易发送者地址" },
    { name: "gasLimit", type: "bigint", desc: "最大Gas消耗量" },
    { name: "gasPrice", type: "bigint", desc: "Gas单价" },
    { name: "hash", type: "string", desc: "交易哈希" },
    { name: "index", type: "number", desc: "交易在区块中的索引" },
    { name: "maxFeePerBlobGas", type: "null | bigint", desc: "EIP-4844 BLOB Gas最大费用" },
    { name: "maxFeePerGas", type: "null | bigint", desc: "Gas最大费用" },
    { name: "maxPriorityFeePerGas", type: "null | bigint", desc: "Gas优先费用上限" },
    { name: "nonce", type: "number", desc: "交易计数器" },
    { name: "provider", type: "Provider", desc: "连接提供者" },
    { name: "signature", type: "Signature", desc: "交易签名" },
    { name: "to", type: "null | string", desc: "接收者地址" },
    { name: "type", type: "number", desc: "EIP-2718交易类型" },
    { name: "value", type: "bigint", desc: "交易价值(wei)" }
  ]
  const txResponse = ref(null);
  const getProperties = async () => {
    const tx = await Store.signer.sendTransaction({
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      value: ethers.parseEther('1'),
      gasLimit: 21000
    });
    console.log('tx', tx);

    // 获取交易响应
    txResponse.value = await Store.provider.getTransaction(tx.hash);
    console.log('txResponse', txResponse.value);

    // 检查交易是否被打包
    const mined = await tx.wait();
    if (mined) {
      console.log('Transaction mined in block:', mined.blockNumber);
    }


  }
  const transactionMethods = [
    { name: "confirmations", type: "Promise<number>", desc: "获取交易确认数" },
    { name: "getBlock", type: "Promise<null | Block>", desc: "获取交易所在区块" },
    { name: "getTransaction", type: "Promise<null | TransactionResponse>", desc: "重新获取交易实例" },
    { name: "isBerlin", type: "boolean", desc: "是否为 Berlin (EIP-2930) 交易" },
    { name: "isCancun", type: "boolean", desc: "是否为 Cancun (EIP-4844) 交易" },
    { name: "isLegacy", type: "boolean", desc: "是否为 Legacy 交易" },
    { name: "isLondon", type: "boolean", desc: "是否为 London (EIP-1559) 交易" },
    { name: "isMined", type: "boolean", desc: "交易是否被打包" },
    { name: "removedEvent", type: "OrphanFilter", desc: "监听交易被移除事件" },
    { name: "reorderedEvent", type: "OrphanFilter", desc: "监听交易顺序变更事件" },
    { name: "replaceableTransaction", type: "TransactionResponse", desc: "创建可检测替换交易的实例" },
    { name: "toJSON", type: "any", desc: "获取 JSON 兼容的交易表示" },
    { name: "wait", type: "Promise<null | TransactionReceipt>", desc: "等待交易确认" }
  ];


  const methodHelpeFun = async (row) => {
    try {
      // 只获取一次区块数据，避免重复调用
      const block = await Store.provider.getBlock("latest");

      switch (row.name) {
        case "confirmations":
          row.result = txResponse.value.confirmations;
          break;
        case "getBlock":
          row.result = processAuthResult(txResponse.value.getBlock());
          console.log('getBlock', row.result);

          break;
        case "getTransaction":
          row.result = processAuthResult(txResponse.value.getTransaction());
          break;
        case "isBerlin":
          row.result = txResponse.value.isBerlin();
          break;
        case "isCancun":
          row.result = txResponse.value.isCancun();
          break;
        case "isLegacy":
          row.result = txResponse.value.isLegacy();
          break;
        case "isLondon":
          row.result = txResponse.value.isLondon();
          break;
        case "isMined":
          row.result = txResponse.value.isMined();
          break;
        case "removedEvent":
          row.result = txResponse.value.removedEvent();
          break;
        case "reorderedEvent":
          row.result = txResponse.value.reorderedEvent();
          break;
        case "replaceableTransaction":
          row.result = txResponse.value.replaceableTransaction();
          break;
        case "toJSON":
          row.result = processAuthResult(txResponse.value.toJSON());
          break;
        case "wait":
          row.result = txResponse.value.wait();
          break;
      }


    } catch (error) {
      console.error(`❌ 获取 ${row.name} 时出错:`, error);
      row.result = "错误: " + error.message;
    }
  }

</script>

<style scoped></style>