<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="属性名称" width="180" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="info" label="描述" />
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();

  const tableData = [
    {
      name: "accessList",
      type: "null | AccessList",
      info: "访问列表，允许在合约执行中以折扣价(但需预付费)访问字节码和状态变量"
    },
    {
      name: "authorizationList",
      type: "null | Array<Authorization>",
      info: "授权列表"
    },
    {
      name: "blobs",
      type: "null | Array<Blob>",
      info: "交易关联的BLOb数据，设置时会自动填充blobVersionedHashes"
    },
    {
      name: "blobVersionedHashes",
      type: "null | Array<string>",
      info: "Cancun交易中的BLOb版本化哈希"
    },
    {
      name: "chainId",
      type: "bigint",
      info: "交易有效的链ID"
    },
    {
      name: "data",
      type: "string",
      info: "交易数据，对于初始化交易是部署代码"
    },
    {
      name: "from",
      type: "null | string",
      info: "发送方地址(已签名时)，否则为null（只读属性）"
    },
    {
      name: "fromPublicKey",
      type: "null | string",
      info: "发送方公钥(已签名时)，否则为null（只读属性）"
    },
    {
      name: "gasLimit",
      type: "bigint",
      info: "交易gas限制"
    },
    {
      name: "gasPrice",
      type: "null | bigint",
      info: "gas价格(传统网络使用，EIP-1559网络应为null)"
    },
    {
      name: "hash",
      type: "null | string",
      info: "交易哈希(已签名时)，否则为null（只读属性）"
    },
    {
      name: "kzg",
      type: "null | KzgLibrary",
      info: "KZG库实例"
    },
    {
      name: "maxFeePerBlobGas",
      type: "null | bigint",
      info: "Cancun交易中每个blob gas的最大费用"
    },
    {
      name: "maxFeePerGas",
      type: "null | bigint",
      info: "每单位gas支付的最大总费用(EIP-1559网络使用，传统网络应为null)"
    },
    {
      name: "maxPriorityFeePerGas",
      type: "null | bigint",
      info: "每单位gas支付的最大优先费用(EIP-1559网络使用，传统网络应为null)"
    },
    {
      name: "nonce",
      type: "number",
      info: "交易nonce值"
    },
    {
      name: "serialized",
      type: "string",
      info: "序列化后的交易(未签名时会抛出异常)（只读属性）"
    },
    {
      name: "signature",
      type: "null | Signature",
      info: "交易签名(已签名时)"
    },
    {
      name: "to",
      type: "null | string",
      info: "交易接收地址(初始化交易时为null)"
    },
    {
      name: "type",
      type: "null | number",
      info: "交易类型(null时会根据属性自动推断)"
    },
    {
      name: "typeName",
      type: "null | string",
      info: "交易类型名称（只读属性）"
    },
    {
      name: "unsignedHash",
      type: "string",
      info: "交易预映像哈希(签名者需签名的摘要)（只读属性）"
    },
    {
      name: "unsignedSerialized",
      type: "string",
      info: "交易预映像(其哈希是需要签名的摘要)（只读属性）"
    },
    {
      name: "value",
      type: "bigint",
      info: "交易发送的以太币数量(以wei为单位)"
    }
  ];

</script>

<style scoped></style>