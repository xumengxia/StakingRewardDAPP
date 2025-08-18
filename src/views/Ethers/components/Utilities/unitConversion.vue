<template>
  <h4>1Ether == 10^3Finney == 10^6Gwei == 10^18wei</h4>
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
    name: "formatEther",
    info: "将WEI值转为ETH字符串（固定18位小数）	",
    data: 'formatEther(1000000000000000000) → "1.0"',
    result: "",
  },
  {
    name: "formatUnits",
    info: "按指定单位/小数位数转换数值为字符串（如gwei=9位）",
    data: 'formatUnits("1500000000", "gwei") → "1.5"',
    result: "",
  },
  {
    name: "parseEther",
    info: "将ETH字符串转为WEI的BigInt（固定18位小数）",
    data: 'parseEther("0.5") → 500000000000000000n',
    result: "",
  },
  {
    name: "parseUnits",
    info: "按指定单位/小数位数转换字符串为BigInt",
    data: 'parseUnits("2.5", 6) → 2500000n',
    result: "",
  },
  {
    name: "UUID",
    info: "生成符合RFC 4122的唯一标识符（如版本4随机UUID）/小数位数转换字符串为BigInt",
    data: 'uuidv4(ethers.randomBytes(16)) → "fbecf922-4f2e-42eb-b9c8-421745c64496"',
    result: "",
  },
];
const dataHelpeFun = (row) => {
  switch (row.name) {
    case "formatEther":
      row.result = ethers.formatEther("1000000000000000000");
      break;
    case "formatUnits":
      row.result = ethers.formatUnits("1500000000", "gwei");
      break;
    case "parseEther":
      row.result = ethers.parseEther("0.5");
      break;
    case "parseUnits":
      row.result = ethers.parseUnits("2.5", 6);
      break;
    case "UUID":
      row.result = ethers.uuidV4(ethers.randomBytes(16));
      break;
  }
};
</script>

<style scoped></style>
