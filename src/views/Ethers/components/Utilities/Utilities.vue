<template>
  <div class="tab-container">
    <h3>1. Base58 Encoding()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">
        Base58是一种去除了易混淆字符的编码格式，主要用于加密货币地址和放混淆场景
      </h4>
      <el-button class="mrg-bot" type="primary" @click="encodeBase58Fun">encodeBase58</el-button>
      <br />
      <el-button type="primary" @click="decodeBase58Fun">decodeBase58(暂时解码err)</el-button>
      <br />
    </el-card>
    <el-divider />

    <h3>2. Base64 Encoding()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">
        Base64是一种将二进制数据编码为ASCII字符串的方法，常用于文本协议传输二进制数据‌(binary)
      </h4>
      <el-button class="mrg-bot" type="primary" @click="base64EncodingFun">base64Encoding</el-button>
      <br />

      <br />
    </el-card>
    <el-divider />

    <h3>3. Data Helpers</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot"> 3.1 type </h4>
      <div class="code-comment">
        BytesLike => DataHexString(偶数长度十六进制字符串) | Uint8Array(字节数组) :二进制数据的通用表示形式 <br />
        HexString => HexString(十六进制字符串) 0x开头
      </div>
      <el-divider />
      <h4 class="mrg-bot"> 3.2 FUNCTIONS </h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="函数名" width="180" />
        <el-table-column prop="info" label="功能描述" />
        <el-table-column prop="data" label="实例输入" />
        <el-table-column prop="result" label="结果" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();
  const encodeResult = ref();
  const encodeBase58Fun = () => {
    const val = ethers.toUtf8Bytes("Hello World!!"); // toUtft8Bytes
    console.log("toUtf8Bytes('Hello World!!'):", val);
    const result = ethers.encodeBase58(val);
    console.log(`encodeBase58Fun(${val}):`, result);
  };
  const decodeBase58Fun = () => {
    const val = ethers.decodeBase58('72k1xXWE6pgmLCU5Uk');
    console.log("decodeBase58('72k1xXWE6pgmLCU5Uk'):", val);
  };
  const base64EncodingFun = () => {
    console.log(`encodeBase64("0x1234"): `, ethers.encodeBase64("0x1234"));
    console.log(`ethers.encodeBase64(new Uint8Array([0x12, 0x34])): `, ethers.encodeBase64(new Uint8Array([0x12, 0x34])));
    console.log('ethers.decodeBase64("EjQ="): ', ethers.decodeBase64("EjQ="));
    console.log('---------------------------------------------');

    console.log(`encodeBase64(toUtf8Bytes("Hello World!!")): `, ethers.encodeBase64(ethers.toUtf8Bytes("Hello World!!")));
    const result = ethers.decodeBase64("SGVsbG8gV29ybGQhIQ==")
    console.log('ethers.decodeBase64("SGVsbG8gV29ybGQhIQ=="): ', ethers.toUtf8String(result));

  };
  const tableData = [
    {
      name: 'concat',
      info: '拼接多个BytesLike为单个DataHexString',
      data: '["0x12", "0x34"]',
      result: ''
    }, {
      name: 'concat',
      info: '拼接多个BytesLike为单个DataHexString',
      data: '["0x12", "0x34"]',
      result: ''
    }, {
      name: 'concat',
      info: '拼接多个BytesLike为单个DataHexString',
      data: '["0x12", "0x34"]',
      result: ''
    }]
  const dataHelpeFun = (row) => {
    switch (row.name) {
      case 'concat':
        row.result = ethers.concat(["0x12", "0x34"])
        break;
    }

  };
</script>

<style scoped>
  /* 页面样式 */
</style>