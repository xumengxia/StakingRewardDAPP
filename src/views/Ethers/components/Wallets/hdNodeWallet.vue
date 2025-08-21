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
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="说明" />
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
      info: "根据索引派生子节点",
      data: "deriveChild(index: Numeric)⇒ HDNodeWallet",
      result: ""
    },
    {
      name: "derivePath",
      info: "根据路径派生节点",
      data: "derivePath(path: string)⇒ HDNodeWallet",
      result: ""
    },
    {
      name: "encrypt",
      info: "异步加密为JSON密钥库",
      data: "encrypt(password: Uint8Array | string, progressCallback?: ProgressCallback)⇒ Promise<string>",
      result: ""
    },
    {
      name: "encryptSync",
      info: "同步加密为JSON密钥库",
      data: "encryptSync(password: Uint8Array | string)⇒ string",
      result: ""
    },
    {
      name: "hasPath",
      info: "检测是否包含路径",
      data: "hasPath()⇒ boolean",
      result: ""
    },
    {
      name: "neuter",
      info: "创建去隐私化节点",
      data: "neuter()⇒ HDNodeVoidWallet",
      result: ""
    },
    {
      name: "fromExtendedKey",
      info: "从扩展密钥创建节点（静态方法）",
      data: "HDNodeWallet.fromExtendedKey(extendedKey: string)⇒ HDNodeWallet | HDNodeVoidWallet",
      result: ""
    }
  ];

  // 初始化HD钱包
  const hdNodeWallet = ethers.Wallet.fromPhrase(Mnemonic.phrase);
  const password = import.meta.env.VITE_PASSWORD;
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
        const _fromSeed = await ethers.HDNodeWallet.fromSeed(seed)
        row.result = processAuthResult(_fromSeed);
        break;
      case "deriveChild":
        const _deriveChild = await hdNodeWallet.deriveChild(0);
        row.result = processAuthResult(_deriveChild);
        break;
      case "derivePath":
        const _derivePath = await hdNodeWallet.derivePath('0/1')
        row.result = processAuthResult(_derivePath);
        break;
      case "encrypt":
        const _encrypt = await hdNodeWallet.encrypt(password);
        row.result = processAuthResult(_encrypt);
        break;
      case "encryptSync":
        const _encryptSync = hdNodeWallet.encryptSync(password);
        row.result = processAuthResult(_encryptSync);
        break;
      case "hasPath":
        row.result = hdNodeWallet.hasPath()

        break;
      case "neuter":
        const _neuter = await hdNodeWallet.neuter();
        row.result = processAuthResult(_neuter);
        break;
      case "fromExtendedKey":
        const hdWallet = await ethers.HDNodeWallet.fromMnemonic(Mnemonic)
        const _extendedKey = await hdWallet.extendedKey
        const _fromExtendedKey = await ethers.HDNodeWallet.fromExtendedKey(_extendedKey);
        row.result = processAuthResult(_fromExtendedKey);

        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>