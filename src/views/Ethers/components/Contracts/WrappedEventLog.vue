<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="120" />
    <el-table-column prop="info" label="作用" />
    <el-table-column prop="data" label="示例输出" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-divider />


</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools';
  const Store = useStore();
  const props = defineProps({
    eventLog: {
      type: Object,
      required: true
    }
  });
  const tableData = [
    {
      name: "estimateGas",
      info: "估算向合约回退函数发送交易所需的gas。",
      data: "wrappedFallback.estimateGas(overrides?: Omit< TransactionRequest, \"to\" >)⇒ P                                                                                                                                                                                                                                   romise< bigint >",
      result: "",
    },
    {
      name: "populateTransaction",
      info: "返回一个已填充的交易，该交易可用于执行回退方法。",
      data: "wrappedFallback.populateTransaction(overrides?: Omit< TransactionRequest, \"to\" >)⇒ Promise< ContractTransaction >",
      result: "",
    },
    {
      name: "send",
      info: "向合约的回退函数发送一笔交易。",
      data: "wrappedFallback.send(overrides?: Omit< TransactionRequest, \"to\" >)⇒ Promise< ContractTransactionResponse >",
      result: "",
    },
    {
      name: "staticCall",
      info: "调用合约的回退函数并返回结果。",
      data: "wrappedFallback.staticCall(overrides?: Omit< TransactionRequest, \"to\" >)⇒ Promise< string >",
      result: "",
    },
  ];


  const dataHelpeFun = async (row) => {
    try {
      switch (row.name) {
        case "estimateGas":
          console.log("props.eventLog:", props.eventLog);

          // 方法 1：使用合约的 fallback 函数（如果存在）
          if (Store.contracts.stakingRewards.fallback) {
            console.log("使用合约 fallback 函数的 estimateGas...");
            const _estimateGas = await Store.contracts.stakingRewards.fallback.estimateGas();
            console.log("_estimateGas", _estimateGas);
            row.result = _estimateGas.toString();
          } else {
            // 方法 2：创建模拟的 WrappedEventLog 对象
            console.log("合约没有 fallback 函数，创建模拟的 WrappedEventLog...");

            // 创建一个包含 estimateGas 方法的对象
            const wrappedEventLog = {
              estimateGas: async () => {
                // 模拟估算 gas
                return 21000n; // 基础 gas 费用
              },
              populateTransaction: async () => {
                // 模拟填充交易
                return {
                  to: Store.contracts.stakingRewards.target,
                  data: "0x",
                  value: 0n
                };
              },
              send: async () => {
                // 模拟发送交易
                throw new Error("模拟对象，无法实际发送交易");
              },
              staticCall: async () => {
                // 模拟静态调用
                return "模拟的静态调用结果";
              }
            };

            const _estimateGas = await wrappedEventLog.estimateGas();
            console.log("模拟 estimateGas:", _estimateGas);
            row.result = _estimateGas.toString() + " (模拟)";
          }
          break;

        case "populateTransaction":
          console.log("props.eventLog:", props.eventLog);

          if (Store.contracts.stakingRewards.fallback) {
            console.log("使用合约 fallback 函数的 populateTransaction...");
            const _populateTransaction = await Store.contracts.stakingRewards.fallback.populateTransaction();
            console.log("_populateTransaction", _populateTransaction);
            row.result = processAuthResult(_populateTransaction);
          } else {
            console.log("创建模拟的 populateTransaction...");
            const wrappedEventLog = {
              populateTransaction: async () => ({
                to: Store.contracts.stakingRewards.target,
                data: "0x",
                value: 0n
              })
            };

            const _populateTransaction = await wrappedEventLog.populateTransaction();
            row.result = processAuthResult(_populateTransaction) + " (模拟)";
          }
          break;

        case "send":
          console.log("props.eventLog:", props.eventLog);

          if (Store.contracts.stakingRewards.fallback) {
            console.log("使用合约 fallback 函数的 send...");
            const _send = await Store.contracts.stakingRewards.fallback.send();
            console.log("_send", _send);
            row.result = processAuthResult(_send);
          } else {
            console.log("创建模拟的 send...");
            row.result = "模拟对象 - 无法实际发送交易";
          }
          break;

        case "staticCall":
          console.log("props.eventLog:", props.eventLog);

          if (Store.contracts.stakingRewards.fallback) {
            console.log("使用合约 fallback 函数的 staticCall...");
            const _staticCall = await Store.contracts.stakingRewards.fallback.staticCall();
            console.log("_staticCall", _staticCall);
            row.result = processAuthResult(_staticCall);
          } else {
            console.log("创建模拟的 staticCall...");
            const wrappedEventLog = {
              staticCall: async () => "模拟的静态调用结果"
            };

            const _staticCall = await wrappedEventLog.staticCall();
            row.result = processAuthResult(_staticCall) + " (模拟)";
          }
          break;
      }
    } catch (error) {
      console.error(`执行 ${row.name} 时出错:`, error);
      row.result = "错误: " + error.message;
    }
  };

</script>

<style scoped></style>