<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="类型名称" width="180" />
    <el-table-column prop="info" label="结构定义" />
    <el-table-column prop="data" label="用途说明" />
  </el-table>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
const Store = useStore();

const tableData = [
  {
    name: "AccessList",
    info: "Array< AccessListEntry >",
    data: "表示一个有序的访问列表条目集合，‌",
  },
  {
    name: "‌AccessListEntry",
    info: "{ address: string, storageKeys: Array<string> }",
    data: '单个访问列表条目，"‌',
  },
  {
    name: "‌AccessListish",
    info: "AccessList | Array< tuple< string, Array< string > > > | Record< string, Array< string > >",
    data: '任何以太坊支持的访问列表结构。"‌',
  },
  {
    name: "AuthorizationLike",
    info: "{ address: string , chainId: BigNumberish , nonce: BigNumberish , signature: SignatureLike }",
    data: "‌授权喜欢包含交易签名所需的链ID、地址、随机数和签名数据。",
  },
  {
    name: "BlobLike",
    info: "BytesLike | { commitment: BytesLike , data: BytesLike , proof: BytesLike }",
    data: "表示EIP-4844交易中的Blob数据，可直接传入二进制或包含承诺/证明的结构化对象。‌",
  },
  {
    name: "‌KzgLibraryLike",
    info: "KzgLibrary | { blobToKZGCommitment: (blob: string) => string , computeBlobKZGProof: (blob: string, commitment: string) => string } | { blobToKzgCommitment: (blob: string) => string | Uint8Array , computeBlobProof: (blob: string, commitment: string) => string | Uint8Array }",
    data: "兼容不同版本的KZG库接口（用于Blob数据计算），因实验性API可能存在命名差异。",
  },
];
</script>

<style scoped></style>
