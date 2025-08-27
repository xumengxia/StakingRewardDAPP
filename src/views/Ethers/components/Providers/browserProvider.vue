<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    providerInfo⇒ null | Eip6963ProviderInfo
  </div>
  <el-button class="mrg-bot" type="primary" @click="getProviderInfoFun">
    getProviderInfo</el-button
  >
  <el-divider />

  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new BrowserProvider(ethereum: Eip1193Provider, network?: Networkish,
    options?: BrowserProviderOptions)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newBrowserProviderFun"
    >new BrowserProvider</el-button
  >
  <el-divider />

  <h4 class="mrg-bot">METHODS:</h4>
  <el-table :data="browserProviderMethods" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="methodHelpeFun(row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-divider />
  <h4 class="mrg-bot">interface ContractRunner: 合约运行器</h4>
  <el-table :data="contractRunnerInterface" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
  </el-table>
  <el-button
    class="mrg-bot"
    type="success"
    @click="demonstrateContractRunnerMethods"
    >演示 ContractRunner 方法</el-button
  >
  <el-divider />

  <h4 class="mrg-bot">interface Eip1193Provider 接口</h4>
  <h4 class="mrg-bot">METHODS:</h4>
  <div class="code-comment mrg-bot">
    request(request: { method: string , params?: Array< any > | Record< string,
    any > })⇒ Promise< any >
  </div>
  <el-button class="mrg-bot" type="primary" @click="requestFun"
    >request</el-button
  >
  <el-divider />

  <h4 class="mrg-bot">interface Eip6963ProviderInfo</h4>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div>icon⇒ string | name⇒ string | rdns⇒ string | rdns⇒ string</div>
  <el-button class="mrg-top" type="primary" @click="getEip6963ProviderInfoFun"
    >getEip6963ProviderInfo</el-button
  >
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult } from "@/utils/commonTools";
const Store = useStore();
const getProviderInfoFun = async () => {
  const providerInfo = await Store.provider.providerInfo;
  console.log(providerInfo, "getProviderInfoFun");
};
const newBrowserProviderFun = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  console.log(provider, "newBrowserProviderFun");
};

const browserProviderMethods = [
  {
    name: "_send",
    type: "_send(payload: JsonRpcPayload[])⇒ Promise<Array<JsonRpcResult | JsonRpcError>>",
    desc: "发送 JSON-RPC 请求（在浏览器环境中不可用，自动使用 send 方法替代）",
  },
  {
    name: "getRpcError",
    type: "getRpcError(payload: JsonRpcPayload, error: JsonRpcError)⇒ Error",
    desc: "从 RPC 错误中提取原始错误对象（在浏览器环境中可能不可用，有模拟处理）",
  },
  {
    name: "getSigner",
    type: "getSigner(address?: number | string)⇒ Promise<JsonRpcSigner>",
    desc: "获取指定地址的签名器（在浏览器环境中完全可用）",
  },
  {
    name: "hasSigner",
    type: "hasSigner(address: number | string)⇒ Promise<boolean>",
    desc: "检查是否管理指定地址（在浏览器环境中完全可用）",
  },
  {
    name: "send",
    type: "send(method: string, params: Array<any> | Record<string, any>)⇒ Promise<any>",
    desc: "通用 JSON-RPC 方法调用（在浏览器环境中完全可用，推荐使用）",
  },
  {
    name: "discover",
    type: "BrowserProvider.discover(options?: BrowserDiscoverOptions)⇒ Promise<null | BrowserProvider>",
    desc: "通过 EIP-6963 机制发现并连接浏览器中的 Provider（在浏览器环境中完全可用）",
  },
];

const methodHelpeFun = async (row) => {
  try {
    switch (row.name) {
      case "_send":
        console.log("🚀 开始演示 JSON-RPC 请求...");

        try {
          // 由于 EIP-1193 不支持 _send，使用 send 方法替代
          if (Store.provider.send) {
            const result = await Store.provider.send("eth_blockNumber", []);
            console.log("📥 send 方法结果:", result);
            const blockNumber = parseInt(result, 16);
            row.result = `✅ send 方法成功: 区块号 ${blockNumber}`;
          } else {
            // 如果 send 方法不可用，使用内置方法
            const blockNumber = await Store.provider.getBlockNumber();
            row.result = `✅ 使用内置方法: 区块号 ${blockNumber}`;
          }
        } catch (error) {
          console.log("⚠️ _send 方法在浏览器环境中不可用，使用内置方法替代");
          const blockNumber = await Store.provider.getBlockNumber();
          row.result = `✅ 内置方法替代: 区块号 ${blockNumber}`;
        }
        break;

      case "getRpcError":
        try {
          // 模拟 RPC 错误处理
          const mockError = {
            code: -32603,
            message: "Internal error",
            data: "模拟的 RPC 错误",
          };

          // 创建模拟的 payload
          const mockPayload = {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_blockNumber",
            params: [],
          };

          // 尝试使用 getRpcError 方法（如果可用）
          if (Store.provider.getRpcError) {
            const rpcError = Store.provider.getRpcError(mockPayload, mockError);
            console.log("📊 getRpcError 结果:", rpcError);
            row.result = `✅ RPC 错误: ${rpcError.message}`;
          } else {
            // 如果方法不可用，直接显示错误信息
            row.result = `⚠️ getRpcError 方法不可用，直接显示: ${mockError.message}`;
          }
        } catch (error) {
          row.result = "❌ 错误: " + error.message;
        }
        break;

      case "getSigner":
        try {
          const signer = await Store.provider.getSigner();
          console.log("📊 getSigner:", signer);
          row.result = `✅ 签名器地址: ${signer.address}`;
        } catch (error) {
          row.result = "❌ 错误: " + error.message;
        }
        break;

      case "hasSigner":
        try {
          if (Store.currentAccount) {
            const hasSigner = await Store.provider.hasSigner(
              Store.currentAccount
            );
            console.log("📊 hasSigner:", hasSigner);
            row.result = `✅ 管理地址 ${Store.currentAccount}: ${hasSigner}`;
          } else {
            row.result = "⚠️ 未连接钱包";
          }
        } catch (error) {
          row.result = "❌ 错误: " + error.message;
        }
        break;

      case "send":
        try {
          const sendResult = await Store.provider.send("eth_blockNumber", []);
          console.log("📊 send:", sendResult);
          const blockNumber = parseInt(sendResult, 16);
          row.result = `✅ send 方法成功: 区块号 ${blockNumber}`;
        } catch (error) {
          row.result = "❌ 错误: " + error.message;
        }
        break;

      case "discover":
        try {
          const discoverResult = await ethers.BrowserProvider.discover();
          console.log("📊 discover:", discoverResult);
          if (discoverResult) {
            row.result = `✅ 发现 Provider: ${discoverResult.constructor.name}`;
          } else {
            row.result = "⚠️ 未发现 Provider";
          }
        } catch (error) {
          row.result = "❌ 错误: " + error.message;
        }
        break;

      default:
        row.result = "未实现";
    }

    console.log(`✅ 成功执行 ${row.name}:`, row.result);
  } catch (error) {
    console.error(`❌ 执行 ${row.name} 时出错:`, error);
    row.result = "❌ 错误: " + error.message;
  }
};
const contractRunnerInterface = [
  {
    name: "call",
    type: "call: (tx: TransactionRequest) => Promise< string >",
    desc: "用于执行纯函数、视图函数或静态合约调用",
  },
  {
    name: "estimateGas",
    type: "estimateGas: (tx: TransactionRequest) => Promise< bigint >",
    desc: "用于估算交易所需gas",
  },
  {
    name: "provider",
    type: "provider: null | Provider",
    desc: "用于状态查询操作的提供者，在抽象提供者情况下可指向自身",
  },
  {
    name: "resolveName",
    type: "resolveName: (name: string) => Promise< null | string >",
    desc: "支持解析ENS名称",
  },
  {
    name: "sendTransaction",
    type: "sendTransaction: (tx: TransactionRequest) => Promise< TransactionResponse >",
    desc: "用于执行状态变更的合约调用",
  },
];

// ContractRunner 方法演示函数
const demonstrateContractRunnerMethods = async () => {
  try {
    if (!Store.contracts.stakingRewards) {
      alert("❌ 合约未初始化");
      return;
    }

    console.log("🚀 开始演示 ContractRunner 方法...");

    // 1. 演示 call 方法
    console.log("📞 演示 call 方法...");
    const duration = await Store.contracts.stakingRewards.duration();
    console.log("质押期限:", duration.toString());

    // 2. 演示 estimateGas 方法
    console.log("⛽ 演示 estimateGas 方法...");
    const stakeGas =
      await Store.contracts.stakingRewards.setRewardsDuration.estimateGas(1000);
    console.log("质押 gas 估算:", stakeGas.toString());

    // 3. 演示 provider 属性
    console.log("🔗 演示 provider 属性...");
    const contractProvider = Store.contracts.stakingRewards.provider;
    if (contractProvider) {
      const network = await contractProvider.getNetwork();
      console.log("网络信息:", network);
    }

    // 4. 演示 resolveName 方法
    console.log("🔍 演示 resolveName 方法...");
    try {
      const address = await Store.provider.resolveName("vitalik.eth");
      console.log("vitalik.eth =>", address);
    } catch (error) {
      console.log("ENS 解析失败:", error.message);
    }

    // 5. 演示 sendTransaction 方法（只准备，不实际发送）
    console.log("📤 演示 sendTransaction 方法准备...");
    const signer = await Store.provider.getSigner();
    const nonce = await signer.getNonce();
    console.log("当前 nonce:", nonce);

    alert("✅ ContractRunner 方法演示完成！请查看控制台了解详细信息。");
  } catch (error) {
    console.error("❌ ContractRunner 方法演示失败:", error);
    alert("❌ 演示失败: " + error.message);
  }
};

// Eip1193Provider request 方法演示
const requestFun = async () => {
  try {
    console.log("🚀 开始演示 Eip1193Provider request 方法...");

    if (!window.ethereum) {
      alert("❌ MetaMask 未安装");
      return;
    }

    // 示例 1：获取账户列表
    console.log("📤 请求账户列表...");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("📥 账户列表:", accounts);

    // 示例 2：获取当前网络
    console.log("📤 请求网络信息...");
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log("📥 链 ID:", chainId);

    // 示例 3：获取最新区块号
    console.log("📤 请求最新区块号...");
    const blockNumber = await window.ethereum.request({
      method: "eth_blockNumber",
    });
    console.log("📥 区块号:", parseInt(blockNumber, 16));

    // 示例 4：获取账户余额
    if (accounts && accounts.length > 0) {
      console.log("📤 请求账户余额...");
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      console.log("📥 账户余额:", ethers.formatEther(balance), "ETH");
    }

    // 示例 5：获取 Gas 价格
    console.log("📤 请求 Gas 价格...");
    const gasPrice = await window.ethereum.request({
      method: "eth_gasPrice",
    });
    console.log("📥 Gas 价格:", ethers.formatUnits(gasPrice, "gwei"), "Gwei");

    // 示例 6：获取网络版本
    console.log("📤 请求网络版本...");
    const networkVersion = await window.ethereum.request({
      method: "net_version",
    });
    console.log("📥 网络版本:", networkVersion);

    // 示例 7：签名消息
    if (accounts && accounts.length > 0) {
      console.log("📤 请求签名消息...");
      const message = "Hello from Eip1193Provider!";
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      });
      console.log("📥 消息签名:", signature);
    }

    // 示例 8：获取交易收据
    console.log("📤 请求交易收据示例...");
    try {
      const receipt = await window.ethereum.request({
        method: "eth_getTransactionReceipt",
        params: ["0x1234567890abcdef"], // 示例交易哈希
      });
      console.log("📥 交易收据:", receipt);
    } catch (error) {
      console.log(
        "⚠️ 交易收据获取失败（正常，因为哈希不存在）:",
        error.message
      );
    }

    // 示例 9：获取存储数据
    console.log("📤 请求存储数据示例...");
    try {
      const storage = await window.ethereum.request({
        method: "eth_getStorageAt",
        params: [
          Store.contracts.stakingRewards?.target ||
            "0x0000000000000000000000000000000000000000",
          "0x0",
          "latest",
        ],
      });
      console.log("📥 存储数据:", storage);
    } catch (error) {
      console.log("⚠️ 存储数据获取失败:", error.message);
    }

    // 示例 10：获取日志
    console.log("📤 请求日志示例...");
    try {
      const logs = await window.ethereum.request({
        method: "eth_getLogs",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            address:
              Store.contracts.stakingRewards?.target ||
              "0x0000000000000000000000000000000000000000",
            topics: [],
          },
        ],
      });
      console.log("📥 日志数量:", logs.length);
    } catch (error) {
      console.log("⚠️ 日志获取失败:", error.message);
    }

    alert(
      "✅ Eip1193Provider request 方法演示完成！请查看控制台了解详细信息。"
    );
  } catch (error) {
    console.error("❌ Eip1193Provider request 方法演示失败:", error);
    alert("❌ 演示失败: " + error.message);
  }
};

const getEip6963ProviderInfoFun = async () => {
  // 监听钱包发现事件
  window.addEventListener("eip6963:announceProvider", (event: any) => {
    const providerInfo = event.detail;
    console.log("发现新钱包:", providerInfo);
  });

  // 请求钱包信息
  window.dispatchEvent(new Event("eip6963:requestProvider"));
};
</script>

<style scoped></style>
