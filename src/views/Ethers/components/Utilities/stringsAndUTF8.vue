<template>
  <h4 class="mrg-bot mrg-top">UtF8ErrorReason => 错误处理函数参数说明</h4>
  <el-table :data="tableData1" style="width: 100%">
    <el-table-column prop="name" label="错误类型" width="180" />
    <el-table-column prop="info" label="触发条件" />
  </el-table>

  <h4 class="mrg-bot mrg-top">UTF-8ErrorFunc=> UTF-8错误处理原因码对照表</h4>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
const Store = useStore();

const tableData1 = [
  {
    name: "UNEXPECTED_CONTINUE",
    info: "出现无效的continuation字节（字节头10开头但前无引导字节）	",
  },
  {
    name: "BAD_PREFIX",
    info: "首字节格式无效（非0/110/1110/11110开头）	",
  },
  {
    name: "OVERRUN",
    info: "数据长度不足（如1110开头但后续字节不足2个）	",
  },
  ,
  {
    name: "MISSING_CONTINUE",
    info: "缺少continuation字节（偏移量处应有10开头字节但不存在）	",
  },
  {
    name: "OUT_OF_RANGE",
    info: "码点值超过UTF-8上限（>0x10FFFF）	",
  },
  {
    name: "UTF16_SURROGATE",
    info: "出现UTF-16代理对码点（U+D800-U+DFFF）	",
  },
  {
    name: "OVERLONG",
    info: "编码冗余（如用3字节表示本可用1字节编码的ASCII字符）	",
    data: "badCodepoint=None‌",
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
  }
};
</script>

<style scoped></style>
