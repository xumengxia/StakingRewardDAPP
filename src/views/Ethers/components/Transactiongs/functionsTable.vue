<template>
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
  const Store = useStore();

  const tableData = [
    {
      name: "accessListify",
      info: "将任意Ethers支持的访问列表结构转换为标准AccessList格式，用于优化交易Gas费用计算‌",
      data: 'const list = accessListify([{ address: "0x...", storageKeys: ["0x00"] }])',
      result: "",
    },
    {
      name: "authorizationify",
      info: "将任意Ethers支持的访问列表结构转换为标准AccessList格式，用于优化交易Gas费用计算‌",
      data: 'const auth = authorizationify({ address: string , chainId: BigNumberish , nonce: BigNumberish , signature: SignatureLike })',
      result: "",
    },
    {
      name: "computeAddress",
      info: "从公钥/私钥计算以太坊地址（支持Hex字符串或SigningKey对象）‌",
      data: 'computeAddress("0x0479...") → 返回0xab12...格式地址',
      result: "",
    },
    {
      name: "recoverAddress",
      info: "通过消息摘要和签名反推出发送地址，用于验证签名有效性‌",
      data: 'recoverAddress(key: string | SigningKey) → 返回签名者地址',
      result: "",
    },

  ];


  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "accessListify":
        const storageKey = ethers.zeroPadBytes("0x00", 32); // 生成"0x0000...00"（64字符）
        row.result = JSON.stringify(ethers.accessListify([{ address: Store.currentAccount, storageKeys: [storageKey] }]));
        break;

      case "authorizationify":
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const nonce = await Store.provider.getTransactionCount(
          Store.currentAccount
        );
        const signature = await Store.signer.signMessage("hello World!");
        console.log(chainId, nonce, signature);
        Store.$patch({
          chainId, nonce, signature
        });
        console.log(Store);

        const _authorizationify = ethers.authorizationify({ address: Store.currentAccount, chainId: chainId, nonce: nonce, signature: signature });
        console.log('_authorizationify', _authorizationify);

        row.result = JSON.stringify(
          _authorizationify,
          (key, value) => typeof value === 'bigint' ? Number(value) : value
        );

        break;

      case "computeAddress":
        const wallet = ethers.Wallet.createRandom(); // 生成随机私钥
        row.result = ethers.computeAddress(wallet);
        break;

      case "recoverAddress":
        const tx = await Store.contracts.rewards.transfer(
          '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          '1000000000000000000000')
        await tx.wait();
        console.log("交易哈希:", tx.hash, Store.signature);
        row.result = ethers.recoverAddress(tx.hash, Store.signature);
        break;
    }
  };
</script>

<style scoped></style>