<template>
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot mrg-top">
    new Wallet(key: string | SigningKey, provider?: null | Provider)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newWallet">newWallet</el-button>
  <el-divider />
  <h4>METHODS:</h4>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />
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
  import { processAuthResult } from '@/utils/commonTools';
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  let wallet;
  const Mnemonic = ethers.Mnemonic.fromEntropy("0x" + privateKey);

  const newWallet = () => {
    wallet = new ethers.Wallet(privateKey);
    console.log('wallet:', wallet);

  }
  const tableData = [
    {
      name: "encrypt",
      info: "异步生成加密的JSON Keystore钱包",
      data: 'encrypt(password: Uint8Array | string, progressCallback?: ProgressCallback)⇒ Promise< string >',
      result: "",
    },
    {
      name: "encryptSync",
      info: "同步生成加密的JSON Keystore钱包",
      data: 'encryptSync(password: Uint8Array | string)⇒ string',
      result: "",
    },
    {
      name: "createRandom",
      info: "创建随机HD钱包‌",
      data: 'createRandom(provider?: null | Provider)⇒ HDNodeWallet	',
      result: "",
    },
    {
      name: "fromEncryptedJson",
      info: "异步解密JSON Keystore钱包",
      data: "fromEncryptedJson(json: string, password: Uint8Array | string, progress?: ProgressCallback)⇒ Promise< HDNodeWallet | Wallet >",
      result: "",
    }, ,
    {
      name: "fromEncryptedJsonSync",
      info: "同步解密JSON Keystore钱包",
      data: "fromEncryptedJsonSync(json: string, password: Uint8Array | string)⇒ HDNodeWallet | Wallet",
      result: "",
    },
    {
      name: "fromPhrase",
      info: "通过助记词生成HD钱包",
      data: "fromPhrase(phrase: string, provider?: Provider)⇒ HDNodeWallet",
      result: "",
    }
  ];
  const password = import.meta.env.VITE_PASSWORD;
  let jsonStr;

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "encrypt":
        jsonStr = await wallet.encrypt(password);
        row.result = jsonStr;
        break;
      case "encryptSync":
        row.result = await wallet.encryptSync(password)
        break;
      case "createRandom":
        const _wallet = await ethers.Wallet.createRandom();
        row.result = processAuthResult(_wallet);
        break;
      case "fromEncryptedJson":
        const encryptedJson = await ethers.Wallet.fromEncryptedJson(jsonStr, password)
        row.result = processAuthResult(encryptedJson);
        break;
      case "fromEncryptedJsonSync":
        const encryptedJsonSync = ethers.Wallet.fromEncryptedJsonSync(jsonStr, password)
        row.result = processAuthResult(encryptedJsonSync);
        break;
      case "fromPhrase":
        const _phrase = ethers.Wallet.fromPhrase(Mnemonic.phrase)
        row.result = processAuthResult(_phrase);
        break;

    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>