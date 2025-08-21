<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="propertiesData" style="width: 100%">
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="data" label="说明" />
  </el-table>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="data" label="实例输入" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools.ts';
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const Mnemonic = ethers.Mnemonic.fromEntropy("0x" + privateKey)

  const propertiesData = [
    {
      name: "chainCode",
      type: "string (read-only)",
      data: "用于派生子密钥的链码，本质上是增强密钥派生安全性的熵源，与父密钥共同生成子密钥"
    },
    {
      name: "depth",
      type: "number (read-only)",
      data: "当前节点在派生路径中的层级深度，如路径 m/44'/60'/0'/0/1 的深度为5"
    },
    {
      name: "extendedKey",
      type: "string (read-only)",
      data: "扩展密钥（xpub/xprv），用于重建中性化密钥并派生子地址"
    },
    {
      name: "fingerprint",
      type: "string (read-only)",
      data: "4字节的节点快速标识符，用于检测父子节点关系（可能碰撞）"
    },
    {
      name: "index",
      type: "number (read-only)",
      data: "当前节点的子索引号，≥2147483648（0x80000000）时表示硬化派生"
    },
    {
      name: "parentFingerprint",
      type: "string (read-only)",
      data: "父节点指纹，用于验证派生路径的连续性"
    },
    {
      name: "path",
      type: "string | null (read-only)",
      data: "完整派生路径（如 m/44'/60'/0'/0/1），若来源未编码路径则为null"
    },
    {
      name: "publicKey",
      type: "string (read-only)",
      data: "压缩格式的公钥（33字节，以0x02或0x03开头）"
    }
  ];

  const tableData = [
    {
      name: "deriveChild",
      info: "生成助记词对应的种子	",
      data: 'deriveChild(index: Numeric)⇒ HDNodeVoidWallet',
      result: "",
    },
    {
      name: "derivePath",
      info: "将熵转换为助记词短语	",
      data: 'ederivePath(path: string)⇒ HDNodeVoidWallet',
      result: "",
    },
    {
      name: "hasPath",
      info: "验证助记词有效性		‌",
      data: 'hasPath()⇒ boolean',
      result: "",
    }
  ];
  // 初始化HD钱包
  const hdNodeVoidWallet = ethers.Wallet.fromPhrase(Mnemonic.phrase);

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "deriveChild":
        const _deriveChild = await hdNodeVoidWallet.deriveChild(0);
        row.result = processAuthResult(_deriveChild);
        break;
      case "derivePath":
        const _derivePath = await hdNodeVoidWallet.derivePath("0/1");
        row.result = processAuthResult(_derivePath)
        break;
      case "hasPath":
        const _hasPath = await hdNodeVoidWallet.hasPath();
        row.result = _hasPath;
        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>