<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div>provider.provider⇒ this</div>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="providerMethods" style="width: 100%">
    <el-table-column prop="name" label="名称" width="200" />
    <el-table-column prop="params" label="params" />
    <el-table-column prop="returnType" label="returnType" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="methodHelpeFun(row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult } from "@/utils/commonTools";
import { log } from "console";
const Store = useStore();

const providerMethods = [
  {
    name: "broadcastTransaction",
    params: ["signedTx: string"],
    returnType: "Promise<TransactionResponse>",
    description:
      "将已签名的交易广播到网络，将其添加到满足重新广播要求的任何节点的内存池中。",
  },
  {
    name: "call",
    params: ["tx: TransactionRequest"],
    returnType: "Promise<string>",
    description:
      "模拟执行交易。如果调用回滚，将抛出包含回滚数据的 CallExceptionError。",
  },
  {
    name: "destroy",
    params: [],
    returnType: "void",
    description:
      "关闭此提供者正在使用的任何资源。调用此方法后，不应再对此提供者进行任何额外调用。",
  },
  {
    name: "estimateGas",
    params: ["tx: TransactionRequest"],
    returnType: "Promise<bigint>",
    description: "估算执行交易所需的 gas 数量。",
  },
  {
    name: "getBalance",
    params: ["address: AddressLike", "blockTag?: BlockTag"],
    returnType: "Promise<bigint>",
    description:
      "获取地址的账户余额（以 wei 为单位）。如果指定了 blockTag 且节点支持该 blockTag 的归档访问，则余额为该 BlockTag 时的余额。",
  },
  {
    name: "getBlock",
    params: ["blockHashOrBlockTag: BlockTag | string", "prefetchTxs?: boolean"],
    returnType: "Promise<null | Block>",
    description:
      "解析为 blockHashOrBlockTag 对应的区块。如果 prefetchTxs 为真且后端支持在区块请求中包含交易，所有交易都将被包含，Block 对象将不需要为获取交易进行远程调用。",
  },
  {
    name: "getBlockNumber",
    params: [],
    returnType: "Promise<number>",
    description: "获取当前区块号。",
  },
  {
    name: "getCode",
    params: ["address: AddressLike", "blockTag?: BlockTag"],
    returnType: "Promise<string>",
    description: "获取地址的字节码。",
  },
  {
    name: "getFeeData",
    params: [],
    returnType: "Promise<FeeData>",
    description: "获取推荐费用数据的最佳猜测。",
  },
  {
    name: "getLogs",
    params: ["filter: Filter | FilterByBlockHash"],
    returnType: "Promise<Array<Log>>",
    description: "解析为与过滤器匹配的日志列表。",
  },
  {
    name: "getNetwork",
    params: [],
    returnType: "Promise<Network>",
    description: "获取已连接的网络。",
  },
  {
    name: "getStorage",
    params: [
      "address: AddressLike",
      "position: BigNumberish",
      "blockTag?: BlockTag",
    ],
    returnType: "Promise<string>",
    description: "获取地址在槽位 position 的存储槽值。",
  },
  {
    name: "getTransaction",
    params: ["hash: string"],
    returnType: "Promise<null | TransactionResponse>",
    description:
      "解析为哈希对应的交易。如果交易未知或在丢弃旧交易的修剪节点上，则解析为 null。",
  },
  {
    name: "getTransactionCount",
    params: ["address: AddressLike", "blockTag?: BlockTag"],
    returnType: "Promise<number>",
    description:
      "获取地址已发送的交易数量，发送交易时用作 nonce。如果指定了 blockTag 且节点支持该 blockTag 的归档访问，则交易数量为该 BlockTag 时的数量。",
  },
  {
    name: "getTransactionReceipt",
    params: ["hash: string"],
    returnType: "Promise<null | TransactionReceipt>",
    description:
      "解析为哈希对应的交易收据（如果已挖矿）。如果交易尚未挖矿、未知或在丢弃旧交易的修剪节点上，则解析为 null。",
  },
  {
    name: "getTransactionResult",
    params: ["hash: string"],
    returnType: "Promise<null | string>",
    description:
      "解析为哈希执行返回的结果。这仅在具有归档访问权限且启用了必要调试 API 的节点上受支持。",
  },
  {
    name: "lookupAddress",
    params: ["address: string"],
    returnType: "Promise<null | string>",
    description:
      "解析为与地址关联的 ENS 名称，如果未配置主名称则解析为 null。用户必须执行额外步骤来配置主名称，这在目前并不常见。",
  },
  {
    name: "resolveName",
    params: ["ensName: string"],
    returnType: "Promise<null | string>",
    description: "解析为为 ensName 配置的地址，如果未配置则解析为 null。",
  },
  {
    name: "waitForBlock",
    params: ["blockTag?: BlockTag"],
    returnType: "Promise<Block>",
    description:
      "一旦挖矿完成，解析为 blockTag 对应的区块。通过使用 currentBlockNumber + N 等待一定数量的区块时，这可能很有用。",
  },
  {
    name: "waitForTransaction",
    params: ["hash: string", "confirms?: number", "timeout?: number"],
    description: "等待交易哈希被挖矿并获得 confirms 次确认。",
  },
];

const methodHelpeFun = async (row) => {
  try {
    // 只获取一次区块数据，避免重复调用
    // const block = await Store.provider.getBlock("latest");
    const txHash =
      "0xdc872917c3fa8d9ed15d28607b845120bab17aae5ae7016c2476d2ca2032380d";
    switch (row.name) {
      case "broadcastTransaction":
        try {
          // 首先创建交易对象
          const tx = {
            to: Store.currentAccount,
            value: ethers.parseEther("0.001"),
            gasLimit: 21000,
            nonce: await Store.signer.getNonce(),
          };
          console.log("交易对象:", tx);

          // 由于 MetaMask 不支持 signTransaction，我们使用替代方案
          // 方案1：尝试使用 signTransaction（如果支持）
          try {
            const signedTx = await Store.signer.signTransaction(tx);
            console.log("已签名交易:", signedTx);

            // 广播已签名的交易
            const _tx = await Store.provider.broadcastTransaction(signedTx);
            console.log("广播结果:", _tx);
            row.result = `✅ 广播交易成功: ${_tx.hash}`;
          } catch (signError) {
            // 方案2：如果 signTransaction 不支持，直接发送交易
            console.log(
              "signTransaction 不支持，使用 sendTransaction:",
              signError.message
            );

            const txResponse = await Store.signer.sendTransaction(tx);
            console.log("直接发送交易结果:", txResponse);
            row.result = `⚠️ MetaMask 不支持 signTransaction，已直接发送交易: ${txResponse.hash}`;
          }
        } catch (error) {
          console.error("交易处理错误:", error);
          row.result = `❌ 交易处理失败: ${error.message}`;
        }
        break;
      case "call":
        const callTx = {
          to: Store.currentAccount,
          data: "0x",
          value: 0n,
        };
        const _callTx = await Store.provider.call(callTx);
        row.result = `✅ 调用交易: ${_callTx}`;
        break;
      case "destroy":
        await Store.provider.destroy();
        row.result = `✅ 销毁提供者`;
        break;

      case "estimateGas":
        const estimateTx = {
          to: Store.currentAccount,
          value: 0n,
        };
        const _estimateTx = await Store.provider.estimateGas(estimateTx);
        row.result = `✅ 估算交易: ${_estimateTx}`;
        break;

      case "getBalance":
        const balance = await Store.provider.getBalance(Store.currentAccount);
        row.result = `✅ 获取余额: ${balance}`;
        break;
      case "getBlock":
        const block = await Store.provider.getBlock("latest");
        console.log("最新区块", block);

        row.result = `✅ 获取区块: ${block}`;
        break;

      case "getBlockNumber":
        const blockNumber = await Store.provider.getBlockNumber();
        row.result = `✅ 获取区块号: ${blockNumber}`;
        break;

      case "getCode":
        const code = await Store.provider.getCode(Store.currentAccount);
        row.result = `✅ 获取代码: ${code}`;
        break;

      case "getFeeData":
        const feeData = await Store.provider.getFeeData();
        console.log("推荐费用", feeData);

        row.result = `✅ 获取费用数据: ${feeData}`;
        break;

      case "getLogs":
        const logs = await Store.provider.getLogs({
          address: Store.currentAccount,
        });
        console.log("日志", logs);

        row.result = `✅ 获取日志: ${logs}`;
        break;
      case "getNetwork":
        const network = await Store.provider.getNetwork();
        console.log("网络", network);

        row.result = `✅ 获取网络: ${network}`;
        break;

      case "getStorage":
        const storage = await Store.provider.getStorage(
          Store.currentAccount,
          0
        );
        console.log("存储", storage);
        row.result = `✅ 获取存储: ${storage}`;
        break;

      case "getTransaction":
        const transaction = await Store.provider.getTransaction(txHash);
        console.log("交易", transaction);
        row.result = `✅ 获取交易: ${transaction}`;
        break;

      case "getTransactionCount":
        const transactionCount = await Store.provider.getTransactionCount(
          Store.currentAccount
        );
        console.log("交易数量", transactionCount);
        row.result = `✅ 获取交易数量: ${transactionCount}`;
        break;
      case "getTransactionReceipt":
        const transactionReceipt = await Store.provider.getTransactionReceipt(
          txHash
        );
        console.log("交易收据", transactionReceipt);
        row.result = `✅ 获取交易收据: ${transactionReceipt}`;
        break;
      case "getTransactionResult":
        const transactionResult = await Store.provider.getTransactionResult(
          txHash
        );
        console.log("交易结果", transactionResult);
        row.result = `✅ 获取交易结果: ${transactionResult}`;
        break;
      case "lookupAddress":
        const lookupAddress = await Store.provider.lookupAddress(
          Store.currentAccount
        );
        console.log("lookupAddress", lookupAddress);
        row.result = `✅ 获取lookupAddress: ${lookupAddress}`;
        break;
      case "resolveName":
        const ensName = "0x3333333333333333333333333333333333333333";
        const resolveName = await Store.provider.resolveName(ensName);
        console.log("resolveName", resolveName);
        row.result = `✅ 获取resolveName: ${resolveName}`;
        break;
      case "waitForBlock":
        const blockTag = "latest";
        const waitForBlock = await Store.provider.waitForBlock(blockTag);
        console.log("waitForBlock", waitForBlock);
        row.result = `✅ 获取waitForBlock: ${waitForBlock}`;
        break;
      case "waitForTransaction":
        const waitForTransaction = await Store.provider.waitForTransaction(
          txHash
        );
        console.log("waitForTransaction", waitForTransaction);
        row.result = `✅ 获取waitForTransaction: ${waitForTransaction}`;
        break;
    }
  } catch (error) {
    console.error(`❌ 获取 ${row.name} 时出错:`, error);
    row.result = "错误: " + error.message;
  }
};
</script>

<style scoped></style>
