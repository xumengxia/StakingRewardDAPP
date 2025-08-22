<template>
  <h4 class="mrg-bot">types:</h4>
  <el-table :data="hdNodeWalletProperties">
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="description" label="说明" />
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
      name: "CrowdsaleAccount⇒ { address: string , privateKey: string }",
      description: "用于存储众筹钱包的基础数据结构，",
    },
    {
      name: "EncryptOptions⇒ { client?: string , entropy?: BytesLike , iv?: BytesLike , progressCallback?: ProgressCallback , salt?: BytesLike , scrypt?: { N?: number , p?: number , r?: number } , uuid?: string }",
      description: "定义密钥库加密参数，包含可选字段",
    },
    {
      name: "KeystoreAccount⇒ { address: string , mnemonic?: { entropy: string , locale?: string , path?: string } , privateKey: string }",
      description: "标准密钥库账户结构，扩展功能包括：",
    },

  ];

  const tableData = [
    {
      name: "decryptCrowdsaleJson",
      info: "解密以太坊早期众筹钱包格式（已废弃但保留兼容）",
      data: "decryptCrowdsaleJson(json: string, password: string | Uint8Array)⇒ CrowdsaleAccount",
      result: ""
    },
    {
      name: "decryptKeystoreJson",
      info: "异步解密标准密钥库JSON钱包（推荐）",
      data: "decryptKeystoreJson(json: string, password: string | Uint8Array, progress?: ProgressCallback)⇒ Promise<KeystoreAccount>",
      result: ""
    },
    {
      name: "decryptKeystoreJsonSync",
      info: "同步解密标准密钥库JSON钱包",
      data: "decryptKeystoreJsonSync(json: string, password: string | Uint8Array)⇒ KeystoreAccount",
      result: ""
    },
    {
      name: "encryptKeystoreJson",
      info: "异步加密账户为密钥库JSON格式",
      data: "encryptKeystoreJson(account: KeystoreAccount, password: string | Uint8Array, options?: EncryptOptions)⇒ Promise<string>",
      result: ""
    },
    {
      name: "encryptKeystoreJsonSync",
      info: "同步加密账户为密钥库JSON格式",
      data: "encryptKeystoreJsonSync(account: KeystoreAccount, password: string | Uint8Array, options?: EncryptOptions)⇒ string",
      result: ""
    },
    {
      name: "isCrowdsaleJson",
      info: "验证JSON是否为有效众筹钱包格式",
      data: "isCrowdsaleJson(json: string)⇒ boolean",
      result: ""
    },
    {
      name: "isKeystoreJson",
      info: "验证JSON是否为有效密钥库钱包格式",
      data: "isKeystoreJson(json: string)⇒ boolean",
      result: ""
    }
  ];


  // 初始化HD钱包
  const wallet = new ethers.Wallet(privateKey);
  const password = import.meta.env.VITE_PASSWORD;
  const getJson = async () => {
    return await wallet.encrypt(password);
  }
  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "decryptCrowdsaleJson":
        await ethers.Wallet.decryptCrowdsaleJson(await getJson(), password);
        // const _encryptedJson = await ethers.Wallet.fromEncryptedJson(jsonStr, password)
        row.result = "无法解密标准json,推荐使用fromEncryptedJson";
        break;
      case "decryptKeystoreJson":
        const _decryptKeystoreJson = await ethers.decryptKeystoreJsonSync(await getJson(), password)
        row.result = processAuthResult(_decryptKeystoreJson);
        break;
      case "decryptKeystoreJsonSync":
        const _decryptKeystoreJsonSync = await ethers.decryptKeystoreJsonSync(await getJson(), password);
        row.result = processAuthResult(_decryptKeystoreJsonSync);
        break;
      case "encryptKeystoreJson":
        const _privateKey = "0x" + privateKey;
        const _encryptKeystoreJson = await ethers.encryptKeystoreJsonSync({ address: Store.currentAccount, privateKey: _privateKey }, password);
        row.result = processAuthResult(_encryptKeystoreJson);
        break;
      case "encryptKeystoreJsonSync":
        const _encryptKeystoreJsonSync = await ethers.encryptKeystoreJsonSync({ address: Store.currentAccount, privateKey: "0x" + privateKey }, password);
        row.result = processAuthResult(_encryptKeystoreJsonSync);
        break;
      case "isCrowdsaleJson":
        row.result = await ethers.isCrowdsaleJson(await getJson());
        break;
      case "isKeystoreJson":
        row.result = await ethers.isKeystoreJson(await getJson());
        break;

    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>