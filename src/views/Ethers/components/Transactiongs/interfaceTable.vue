<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />

  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();

  const tableData = [
    {
      name: "Authorization",
      info: "address=>string | chainId=>bigint | nonce=>bigint | signature=>signature",
    },
    {
      name: "Blob",
      info: "commitment=>string | data=>string | proof=>string",

    },
    {
      name: "KzgLibrary",
      info: "kzgLibrary.blobToKzgCommitment⇒ (blob: Uint8Array) => Uint8Array | computeBlobKzgProof⇒ (blob: Uint8Array, commitment: Uint8Array) => Uint8Array",

    },

  ];

</script>

<style scoped></style>