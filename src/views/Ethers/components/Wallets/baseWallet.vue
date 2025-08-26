<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    address=>string | privateKey=>string | signingKey=>signingKey
  </div>
  <el-divider />
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new BaseWallet(privateKey: SigningKey, provider?: null | Provider)
  </div>
  <el-button class="mrg-bot" type="primary" @click="createInstances">newBaseWallet</el-button>
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
  import { processAuthResult, getAuthParams } from '@/utils/commonTools.ts';
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const signingKey = new ethers.SigningKey("0x" + privateKey);
  const baseWallet = new ethers.BaseWallet(signingKey, Store.provider);
  const createInstances = async () => {
    console.log("baseWallet", baseWallet);
  };
  const tableData = [
    {
      name: "authorize",
      info: "生成授权凭证‌",
      data: 'await wallet.authorize({scope: ["read"]})',
      result: "",
    },
    {
      name: "authorizeSync",
      info: "立即返回授权凭证	‌",
      data: 'wallet.authorizeSync({scope: ["write"]})',
      result: "",
    },
    {
      name: "signMessageSync",
      info: "同步生成消息签名",
      data: "signMessageSync(message: string | Uint8Array)⇒ string",
      result: "",
    },
  ];

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "authorize":
        const authParams = await getAuthParams();
        const _authorize = await baseWallet.authorize(authParams);
        row.result = processAuthResult(_authorize);
        break;
      case "authorizeSync":
        const syncParams = await getAuthParams();
        const _authorizeSync = baseWallet.authorizeSync(syncParams);
        row.result = processAuthResult(_authorizeSync);
        break;
      case "signMessageSync":
        const msg = "hello world";
        row.result = baseWallet.signMessageSync(ethers.toUtf8Bytes(msg));
        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>