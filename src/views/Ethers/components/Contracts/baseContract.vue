<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>

  <el-table :data="contractPropertiesData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />
  </el-table>

  <el-divider />
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new BaseContract(target: string | Addressable, abi: Interface |
    InterfaceAbi, runner?: null | ContractRunner, deployTx?: null |
    TransactionResponse)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newBaseContractFun">newBaseContract</el-button>
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
  import { processAuthResult } from "@/utils/commonTools";
  import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
  import helloworldAbi from "@/contract/artifacts/HelloWorld.json";
  const Store = useStore();
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const signingKey = new ethers.SigningKey("0x" + privateKey);
  const baseWallet = new ethers.BaseWallet(signingKey, Store.provider);
  const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS;
  const rdsAddress = import.meta.env.VITE_TOKEN2_ADDRESS;
  let baseContract;
  const newBaseContractFun = () => {
    baseContract = new ethers.BaseContract(
      stakingRewardsAddress,
      stakingRewardsAbi.output.abi,
      Store.singer
    );
    console.log("newBaseContract", baseContract);
  };
  const contractPropertiesData = [
    { name: "fallback", info: "fallback⇒ null | WrappedFallback" },
    { name: "filters", info: "filters⇒ Record< string, ContractEvent >" },
    { name: "interface", info: "interface⇒ Interface" },
    { name: "runner", info: "runner⇒ null | ContractRunner" },
    { name: "target", info: "target⇒ string | Addressable" },
  ];
  const tableData = [
    {
      name: "addListener",
      info: "事件监听别名（同on）",
      data: 'await contract.addListener("Transfer", listener)',
      result: "",
    },
    {
      name: "attach",
      info: "创建相同ABI但不同目标地址的合约实例",
      data: 'contract.attach("0xNewAddress")',
      result: "",
    },
    {
      name: "connect",
      info: "创建相同合约但不同签名者的实例",
      data: "contract.connect(newSigner)",
      result: "",
    },
    {
      name: "deploymentTransaction",
      info: "获取部署交易（仅限ContractFactory创建的实例）",
      data: "contract.deploymentTransaction()",
      result: "",
    },
    {
      name: "emit",
      info: "触发事件并调用所有监听器",
      data: 'await contract.emit("Transfer", [from, to, value])',
      result: "",
    },
    {
      name: "getAddress",
      info: "获取合约解析后的地址",
      data: "await contract.getAddress()",
      result: "",
    },
    {
      name: "getDeployedCode",
      info: "获取已部署字节码",
      data: "await contract.getDeployedCode()",
      result: "",
    },
    {
      name: "getEvent",
      info: "通过名称获取事件对象",
      data: 'contract.getEvent("Transfer")',
      result: "",
    },
    {
      name: "getFunction",
      info: "通过名称获取函数对象",
      data: 'contract.getFunction("transfer")',
      result: "",
    },
    {
      name: "listenerCount",
      info: "获取事件监听器数量",
      data: 'await contract.listenerCount("Transfer")',
      result: "",
    },
    {
      name: "listeners",
      info: "获取事件监听器数组",
      data: 'await contract.listeners("Transfer")',
      result: "",
    },
    {
      name: "off",
      info: "移除事件监听器（同removeListener）",
      data: 'await contract.off("Transfer", listener)',
      result: "",
    },
    {
      name: "on",
      info: "添加事件监听器",
      data: 'await contract.on("Transfer", listener)',
      result: "",
    },
    {
      name: "once",
      info: "添加一次性事件监听器",
      data: 'await contract.once("Transfer", listener)',
      result: "",
    },
    {
      name: "queryFilter",
      info: "查询历史事件数据",
      data: 'await contract.queryFilter("Transfer", 10000, "latest")',
      result: "",
    },
    {
      name: "removeAllListeners",
      info: "移除所有事件监听器",
      data: "removeAllListeners(event?: ContractEventName)⇒ Promise< this >",
      result: "",
    },
    {
      name: "removeListener",
      info: "移除指定监听器（同off）",
      data: 'await contract.removeListener("Transfer", listener)',
      result: "",
    },
    {
      name: "waitForDeployment",
      info: "等待合约部署完成",
      data: "await contract.waitForDeployment()",
      result: "",
    },
    {
      name: "buildClass",
      info: "静态方法：根据ABI创建合约类",
      data: "BaseContract.buildClass(abi)",
      result: "",
    },
    {
      name: "from",
      info: "静态方法：通过接口创建合约实例",
      data: "BaseContract.from(address, abi, signer?)",
      result: "",
    },
  ];

  const listener = (event) => {
    // console.log('监听事件:', event); getEvent
  };
  // Store.contracts.stakingRewards.on("SetDuration", listener);
  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "addListener":
        await Store.contracts.stakingRewards.addListener("Staked", listener);
        console.log("监听");

        break;
      case "attach":
        const _attach = await Store.contracts.stakingRewards.attach(rdsAddress);
        console.log("attach:", _attach);
        row.result = "见控制面板控制台输出";
        break;
      case "connect":
        // console.log('singer:', Store.signer,);
        const _connect = await Store.contracts.stakingRewards.connect(baseWallet);
        console.log("connect:", _connect);
        row.result = "见控制面板控制台输出";
        break;
      case "deploymentTransaction":
        // 此处是使用ContractFactory部署的合约
        const _addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        // helloworldAbi
        const _contracts = new ethers.Contract(
          _addr,
          helloworldAbi.abi,
          Store.singer
        );
        const _deploymentTransaction = await _contracts.deploymentTransaction();
        console.log("deploymentTransaction:", _deploymentTransaction);
        row.result =
          "见控制面板控制台输出,此方法适用于ethers部署的文件，不适用remix";
        break;
      case "emit":
        // 触发质押事件
        // event Staked(address indexed user, uint256 amount, uint256 timestamp);
        // emit Staked(msg.sender, _amount, block.timestamp);
        break;
      case "getAddress":
        const _getAddress = await Store.contracts.stakingRewards.getAddress();
        row.result = _getAddress;
        break;
      case "getDeployedCode":
        const _getDeployedCode =
          await Store.contracts.stakingRewards.getDeployedCode();
        console.log("getDeployedCode", _getDeployedCode);
        row.result = "见控制面板控制台输出,";
        break;
      case "getEvent":
        const _getEvent = await Store.contracts.stakingRewards.getEvent("Staked");
        console.log("getEvent", _getEvent);
        break;
      case "getFunction":
        const _getFunction = await Store.contracts.stakingRewards.getFunction(
          "setRewardsDuration"
        );
        console.log("getFunction", _getFunction);
        break;
      case "listenerCount":
        const _listenerCount = await Store.contracts.stakingRewards.listenerCount(
          "SetDuration"
        );
        console.log("listenerCount", _listenerCount);
        row.result = _listenerCount;
        break;
      case "listeners":
        const _listeners = await Store.contracts.stakingRewards.listeners(
          "Staked"
        );
        console.log("listeners", _listeners);
        break;

      case "off":
        await Store.contracts.stakingRewards.off("SetDuration", listener);
        row.result = "已关闭监听";
        break;
      case "on":
        await Store.contracts.stakingRewards.setRewardsDuration(1000);
        row.result = "全局监听，点击上面按钮off,则关闭监听";
        break;
      case "once":
        await Store.contracts.stakingRewards.once("SetDuration", listener);
        break;
      case "queryFilter":
        // stakingRewardsAddress
        const events = await Store.contracts.stakingRewards.queryFilter(
          "SetDuration", // 修正事件名
          0, // 部署区块开始
          "latest"
        );

        console.log("查询到的事件：", events);
        row.result = "控制面板控制台输出";
        break;
      case "removeAllListeners":
        await Store.contracts.stakingRewards.removeAllListeners(
          "SetDuration",
          listener
        );
        row.result = "可不传参数移除所有";
        break;
      case "removeListener":
        await Store.contracts.stakingRewards.removeListener(
          "SetDuration",
          listener
        );
        break;
      case "waitForDeployment":
        // 用于脚本部署
        // const HelloWorld = await ethers.getContractFactory("HelloWorld");
        // const hw = await HelloWorld.deploy();
        // await hw.waitForDeployment();
        // console.log("hw address:", hw.target);
        row.result = "用于脚本部署";
        break;
      case "buildClass":
        const _buildClass = await ethers.BaseContract.buildClass(
          stakingRewardsAbi.output.abi
        );
        console.log("buildClass:", _buildClass);
        row.result = "控制面板控制台输出";
        break;
      case "from":
        const _from = await ethers.BaseContract.from(
          stakingRewardsAddress,
          stakingRewardsAbi.output.abi,
          Store.singer
        );
        console.log("from", _from);
        row.result = "控制面板控制台输出";
        break;
    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>