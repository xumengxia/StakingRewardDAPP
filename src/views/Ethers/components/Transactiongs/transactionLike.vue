<template>
  <el-table :data="transactionProperties" style="width: 100%">
    <el-table-column prop="name" label="类型名称" width="180" />
    <el-table-column prop="type" label="结构定义" />
    <el-table-column prop="desc" label="用途说明" />
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();

  const transactionProperties = [
    { name: "accessList", type: "null | AccessListish", desc: "柏林和伦敦交易的访问列表" },
    { name: "authorizationList", type: "null | Array<Authorization>", desc: "EIP-7702授权列表" },
    { name: "blobs", type: "null | Array<BlobLike>", desc: "EIP-4844附加的Blob数据" },
    { name: "blobVersionedHashes", type: "null | Array<string>", desc: "EIP-4844版本化哈希" },
    { name: "chainId", type: "null | BigNumberish", desc: "交易生效的链ID" },
    { name: "data", type: "null | string", desc: "交易附加数据" },
    { name: "from", type: "null | Address", desc: "发送方地址" },
    { name: "gasLimit", type: "null | BigNumberish", desc: "最大Gas消耗量" },
    { name: "gasPrice", type: "null | BigNumberish", desc: "传统交易的Gas单价" },
    { name: "hash", type: "null | string", desc: "交易哈希" },
    { name: "kzg", type: "null | KzgLibraryLike", desc: "EIP-4844的KZG计算库" },
    { name: "maxFeePerBlobGas", type: "null | BigNumberish", desc: "单Blob Gas最大费用" },
    { name: "maxFeePerGas", type: "null | BigNumberish", desc: "EIP-1559交易的最大总Gas费" },
    { name: "maxPriorityFeePerGas", type: "null | BigNumberish", desc: "EIP-1559交易的优先小费" },
    { name: "nonce", type: "null | number", desc: "交易序列号" },
    { name: "signature", type: "null | SignatureLike", desc: "发送方签名" },
    { name: "to", type: "null | Address", desc: "接收方地址（创建合约时为null）" },
    { name: "type", type: "null | number", desc: "交易类型：0（传统）、1（柏林）、2（伦敦）" },
    { name: "value", type: "null | BigNumberish", desc: "转账金额（wei单位）" }
  ];
</script>

<style scoped></style>