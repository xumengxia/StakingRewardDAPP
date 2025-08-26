<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="transactionRequestProperties" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
  </el-table>
  <el-button class="mrg-bot mrg-top" type="primary" @click="setRequest">setRequest</el-button>
  <el-divider />


</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools.ts';
  const Store = useStore();

  const transactionRequestProperties = [
    { name: "accessList", type: "null | AccessListish", desc: "EIP-2930 访问列表" },
    { name: "authorizationList", type: "null | Array<AuthorizationLike>", desc: "EIP-7702 授权列表" },
    { name: "blobs", type: "null | Array<BlobLike>", desc: "EIP-4844 包含的 BLOB" },
    { name: "blobVersionedHashes", type: "null | Array<string>", desc: "EIP-4844 BLOB 版本哈希" },
    { name: "blockTag", type: "BlockTag", desc: "查询区块标签" },
    { name: "chainId", type: "null | BigNumberish", desc: "网络链 ID" },
    { name: "customData", type: "any", desc: "自定义网络特定值" },
    { name: "data", type: "null | string", desc: "交易数据" },
    { name: "enableCcipRead", type: "boolean", desc: "启用 CCIP-read" },
    { name: "from", type: "null | AddressLike", desc: "交易发送者" },
    { name: "gasLimit", type: "null | BigNumberish", desc: "最大 gas 限制" },
    { name: "gasPrice", type: "null | BigNumberish", desc: "传统交易 gas 价格" },
    { name: "kzg", type: "null | KzgLibraryLike", desc: "KZG 库（EIP-4844）" },
    { name: "maxFeePerBlobGas", type: "null | BigNumberish", desc: "每 BLOB gas 最大费用" },
    { name: "maxFeePerGas", type: "null | BigNumberish", desc: "EIP-1559 每 gas 最大总费用" },
    { name: "maxPriorityFeePerGas", type: "null | BigNumberish", desc: "EIP-1559 每 gas 最大优先费用" },
    { name: "nonce", type: "null | number", desc: "交易随机数" },
    { name: "to", type: "null | AddressLike", desc: "交易目标地址" },
    { name: "type", type: "null | number", desc: "交易类型" },
    { name: "value", type: "null | BigNumberish", desc: "交易值（wei）" }
  ];

  const txResponse = ref(null);
  const setRequest = async () => {
    const transactionRequest = {
      to: '0x...', // 目标地址
      // value: web3.utils.toWei('1', 'ether'), // 转账金额
      accessList: [ // EIP-2930 访问列表
        {
          address: '0x...',
          storageKeys: ['0x...']
        }
      ],
      authorizationList: [ // EIP-7702 授权列表
        {
          executor: '0x...',
          nonce: 0,
          validUntilBlock: 0,
          action: '0x...'
        }
      ],
      blobs: [ // EIP-4844 blobs
        {
          data: '0x...'
        }
      ],
      blobVersionedHashes: ['0x...'], // EIP-4844 blob 版本哈希
      blockTag: 'latest' // 区块标签
    };

    console.log(transactionRequest, 'transactionRequest');




  }


</script>

<style scoped></style>