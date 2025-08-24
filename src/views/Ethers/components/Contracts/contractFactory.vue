<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    bytecode=>string | interface=>Imterface | runner=>null | ContractRunner
  </div>
  <el-divider />
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new ContractFactory(abi: Interface | InterfaceAbi, bytecode: BytesLike | {
    object: string }, runner?: null | ContractRunner)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newContractFactoryFun"
    >newContractFactory</el-button
  >
  <el-divider />
  <h4>METHODS:</h4>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />
    <el-table-column prop="data" label="实例输入" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)"
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
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
import helloworldAbi from "@/contract/artifacts/HelloWorld.json";
const Store = useStore();
const privateKey = import.meta.env.VITE_PRIVATEKEY;
const signingKey = new ethers.SigningKey("0x" + privateKey);
// 简化 wallet 创建，避免 provider 类型问题
const baseWallet = new ethers.BaseWallet(signingKey);
const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS;
const rdsAddress = import.meta.env.VITE_TOKEN2_ADDRESS;
let baseContract;
const newContractFactoryFun = () => {
  const contractFactory = new ethers.ContractFactory(
    stakingRewardsAbi.output.abi,
    stakingRewardsAddress
  );
  console.log("contractFactory", contractFactory);
};

const tableData = [
  {
    name: "attach",
    info: "将工厂连接到已有合约地址",
    data: "attach(target: string | Addressable)⇒ BaseContract & Omit< I, keyof<BaseContract> >",
    result: "",
  },
  {
    name: "connect",
    info: "创建带新签名者的工厂实例",
    data: "connect(runner: null | ContractRunner)⇒ ContractFactory < A, I >",
    result: "",
  },
  {
    name: "deploy",
    info: "部署合约并返回未确认的合约实例",
    data: "deploy(args: ContractMethodArgs< A >)⇒ Promise< BaseContract & { deploymentTransaction: ContractTransactionResponse } & Omit< I, keyof<BaseContract> > >",
    result: "",
  },
  {
    name: "getDeployTransaction",
    info: "生成合约部署交易对象（需要构造函数参数）",
    data: "getDeployTransaction(args: ContractMethodArgs< A >)⇒ Promise< ContractDeployTransaction >",
    result: "",
  },
  {
    name: "fromSolidity",
    info: "从标准的Solidity JSON输出中创建一个新的ContractFactory。",
    data: "fromSolidity(output: any, runner?: ContractRunner)⇒ ContractFactory < A, I >",
    result: "",
  },
];

const dataHelpeFun = async (row) => {
  try {
    switch (row.name) {
      case "attach":
        console.log("Executing attach method...");

        // 使用 HelloWorld 合约作为示例，因为它有 bytecode
        const contractFactory = new ethers.ContractFactory(
          helloworldAbi.abi,
          helloworldAbi.bytecode,
          baseWallet
        );

        // 使用 attach 方法连接到已部署的合约
        const attachContract = contractFactory.attach(stakingRewardsAddress);
        console.log("attachContract", attachContract);

        // 更新表格数据
        row.result = "Success: Contract attached to " + stakingRewardsAddress;
        break;

      case "connect":
        console.log("Executing connect method...");
        const factory = new ethers.ContractFactory(
          helloworldAbi.abi,
          helloworldAbi.bytecode
        );
        const connectedFactory = factory.connect(baseWallet);
        console.log("connectedFactory", connectedFactory);
        row.result = "Success: Factory connected with wallet";
        break;

      case "deploy":
        console.log("Executing deploy method...");
        // 这里只是演示，实际部署需要 gas 费用
        // HelloWorld = await ethers.getContractFactory("HelloWorld");
        // const hw = await HelloWorld.deploy();
        // await hw.waitForDeployment();
        row.result = "Deploy method requires gas fees - not executed";
        break;

      case "getDeployTransaction":
        console.log("Executing getDeployTransaction method...");
        const deployFactory = new ethers.ContractFactory(
          helloworldAbi.abi,
          helloworldAbi.bytecode
        );
        // getDeployTransaction 可以接受构造函数参数
        // 对于 HelloWorld 合约，构造函数不需要参数，所以传空数组
        const deployTx = await deployFactory.getDeployTransaction([]);
        console.log("deployTx", deployTx);
        row.result = "Success: Deploy transaction created with args: []";
        break;

      case "fromSolidity":
        console.log("Executing fromSolidity method...");
        const solidityFactory = ethers.ContractFactory.fromSolidity(
          helloworldAbi,
          baseWallet
        );
        console.log("solidityFactory", solidityFactory);
        row.result = "Success: Factory created from Solidity output";
        break;
    }
  } catch (error) {
    console.error("Error in dataHelpeFun:", error);
    row.result = "Error: " + error.message;
  }
};
</script>

<style scoped>
/* 页面样式 */
</style>
