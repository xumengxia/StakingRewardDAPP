<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />
    <el-table-column prop="data" label="实例输入" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
const Store = useStore();

const tableData = [
  {
    name: "toUtf8Bytes",
    info: "将字符串转换为 UTF-8 字节序列（Uint8Array）	",
    data: 'ethers.toUtf8Bytes("hello") → [104, 101, 108, 108, 111]‌',
    result: "",
  },
  {
    name: "toUtf8String",
    info: "将字节数据解码为 UTF-8 字符串（支持十六进制/Uint8Array）",
    data: 'ethers.toUtf8String("0x68656c6c6f") → "hello"‌',
    result: "",
  },
  {
    name: "toUtf8CodePoints",
    info: "将字符串转换为 UTF-8 码点（code points）数组，支持可选的 Unicode 规范化。",
    data: 'toUtf8CodePoints("café", "NFD")',
    result: "",
  },
  {
    name: "toBeArray",
    info: "将十六进制字符串转为字节数组（兼容RLP解码结果）",
    data: 'ethers.toBeArray("0x68656c6c6f") → [104,101,108,108,111]',
    result: "",
  },
];
const dataHelpeFun = (row) => {
  switch (row.name) {
    case "toUtf8Bytes":
      row.result = ethers.toUtf8Bytes("hello");
      break;
    case "toUtf8String":
      row.result = ethers.toUtf8String("0x68656c6c6f");
      break;
    case "toBeArray":
      row.result = ethers.toBeArray("0x68656c6c6f");
      break;
    case "toUtf8CodePoints":
      row.result = ethers.toUtf8CodePoints("cafe", "NFC");
      break;
  }
};
</script>

<style scoped></style>
