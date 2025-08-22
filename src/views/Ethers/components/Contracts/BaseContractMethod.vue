<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    fragment⇒ FunctionFragment | name⇒ string
  </div>
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
  import { processAuthResult } from '@/utils/commonTools.ts';
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const signingKey = new ethers.SigningKey("0x" + privateKey);

  const createInstances = async () => {
    console.log("baseWallet", baseWallet);
  };
  const tableData = [
    {
      name: "estimateGas",
      info: "估算发送带有参数的合约方法的gas",
      data: 'baseContractMethod.estimateGas(args: ContractMethodArgs< A >)⇒ Promise< bigint >)',
      result: ""
    },
    {
      name: "getFragment",
      info: "返回受参数约束的片段",
      data: 'baseContractMethod.getFragment(args: ContractMethodArgs< A >)⇒ FunctionFragment',
      result: ""
    },
    {
      name: "populateTransaction",
      info: "返回一个已填充的交易",
      data: 'baseContractMethod.populateTransaction(args: ContractMethodArgs< A >)⇒ Promise< ContractTransaction >)',
      result: ""
    },
    {
      name: "send",
      info: "发送合约方法的交易",
      data: 'baseContractMethod.send(args: ContractMethodArgs< A >)⇒ Promise< ContractTransactionResponse >)',
      result: ""
    },
    {
      name: "staticCall",
      info: "调用合约方法并返回值，在不实际发送交易、不改变链上状态的前提下，测试该方法能否成功执行",
      data: 'baseContractMethod.staticCall(args: ContractMethodArgs< A >)⇒ Promise< R >)',
      result: ""
    },
    {
      name: "staticCallResult",
      info: "调用合约方法并返回结果",
      data: 'baseContractMethod.staticCallResult(args: ContractMethodArgs< A >)⇒ Promise< Result >)',
      result: ""
    }
  ];


  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "estimateGas":
        const getEstimateGas = await Store.contracts.stakingRewards.setRewardsDuration.estimateGas(1000)
        console.log("getEstimateGas", getEstimateGas);
        row.result = processAuthResult(getEstimateGas);
        break;
      case "getFragment":
        const _getFragment = await Store.contracts.stakingRewards.setRewardsDuration.getFragment(1000)
        console.log("getFragment", _getFragment);
        row.result = processAuthResult(_getFragment);
        break;
      case "populateTransaction":
        //  生成 setRewardsDuration(1000) 的交易对象
        const tx = await Store.contracts.stakingRewards.setRewardsDuration.populateTransaction(1000)
        // 手动签名（示例：用私钥签名）
        // const signedTx = await signer.signTransaction(tx);
        // 发送已签名交易
        // const txReceipt = await provider.sendTransaction(signedTx);
        console.log("populateTransaction", tx);
        row.result = processAuthResult(tx);
        break;
      case "send":
        const sendTx1 = await Store.contracts.stakingRewards.setRewardsDuration.send(1000)
        console.log("sendTx1", sendTx1);
        row.result = processAuthResult(sendTx1);
        break;
      case "staticCall":
        const _staticCall = await Store.contracts.stakingRewards.duration.staticCall();
        console.log("_staticCall", _staticCall);
        row.result = processAuthResult(_staticCall);
        break;
      case "staticCallResult":
        const _staticCallResult = await Store.contracts.stakingRewards.duration.staticCallResult();
        console.log("_staticCallResult", _staticCallResult);
        row.result = processAuthResult(_staticCallResult);
        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>