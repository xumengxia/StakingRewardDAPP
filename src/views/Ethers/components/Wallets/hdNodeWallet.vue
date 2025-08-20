<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <el-table :data="hdNodeWalletProperties" style="width: 100%">
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="description" label="说明" />
    <el-table-column prop="example" label="示例" />
  </el-table>
  <el-divider />

  <h3>creating instances:</h3>
  <el-table class="mrg-top" :data="hdNodeWalletConstructors" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="description" label="说明" />
    <el-table-column prop="params" label="示例" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-divider />

  <h4>METHODS:</h4>
  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="data" label="实例输入" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table> -->
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools.ts';
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const Mnemonic = ethers.Mnemonic.fromEntropy("0x" + privateKey)

  const hdNodeWalletProperties = [
    {
      name: "chainCode",
      type: "string",
      description: "用于派生子密钥的链码（相当于公钥）",
      example: "0x4ef2a1a2..."
    },
    {
      name: "depth",
      type: "number",
      description: "钱包层级深度（对应路径中的分段数量）",
      example: 3
    },
    {
      name: "extendedKey",
      type: "string",
      description: "以xpriv开头的扩展密钥，可重建HD节点",
      example: "xprv9s21ZrQH..."
    },
    {
      name: "fingerprint",
      type: "string",
      type: "string",
      description: "4字节的父/子节点快速标识符（可能存在冲突）",
      example: "0x3a4f2c11"
    },
    {
      name: "index",
      type: "number",
      description: "子索引号（≥2³¹表示硬化节点）",
      example: 0
    },
    {
      name: "mnemonic",
      type: "null | Mnemonic",
      description: "创建HD节点的助记词（扩展密钥源时为null）",
      example: null
    },
    {
      name: "parentFingerprint",
      type: "string",
      description: "父节点指纹",
      example: "0x00000000"
    },
    {
      name: "path",
      type: "null | string",
      description: "派生路径（扩展密钥源时可能为null）",
      example: "m/44'/60'/0'/0/0"
    },
    {
      name: "publicKey",
      type: "string",
      description: "压缩格式的公钥",
      example: "0x03a1b2c3..."
    }
  ];
  const hdNodeWalletConstructors = [
    {
      name: "createRandom",
      params: 'createRandom(password?: string, path?: string, wordlist?: Wordlist)⇒ HDNodeWallet',
      description: "通过随机数生成新的HD节点钱包",
      result: ''
    },
    {
      name: "fromMnemonic",
      params: '.fromMnemonic(mnemonic: Mnemonic, path?: string)⇒ HDNodeWallet',
      description: "从BIP39助记词派生HD钱包",
      result: ''
    },
    {
      name: "fromPhrase",
      params: 'fromPhrase(phrase: string, password?: string, path?: string, wordlist?: Wordlist)⇒ HDNodeWallet',
      description: "从助记词短语创建HD节点",
      result: ''
    },
    {
      name: "fromSeed",
      params: 'fromSeed(seed: BytesLike)⇒ HDNodeWallet',
      description: "直接从种子字节创建HD节点",
      result: ''
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

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "createRandom":
        const _wallet = await ethers.Wallet.createRandom();
        row.result = processAuthResult(_wallet);
        break;
      case "fromMnemonic":
        const _fromMnemonic = await ethers.HDNodeWallet.fromMnemonic(Mnemonic)
        row.result = processAuthResult(_fromMnemonic);
        break;
      case "fromPhrase":
        const _fromPhrase = await ethers.HDNodeWallet.fromPhrase(Mnemonic.phrase)
        row.result = processAuthResult(_fromPhrase);
        break;
      case "fromSeed":
        // 从助记词生成种子
        const seed = await Mnemonic.computeSeed(Mnemonic.entropy);
        log
        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>