<template>
  <div class="tab-container">
    <h3 class="mrg-bot">1. TYPES</h3>
    <el-card class="mrg-top">
      <div class="code-comment mrg-bot">
        基础操作：BlockTag、TopicFilter<br />
        网络连接：BrowserProviderOptions、WebSocketCreator<br />
        事件监听：ProviderEvent、DebugEventBrowserProvider<br />
        交易优化：GasCostParameters<br />
        状态监控：OrphanFilter<br />
      </div>
      <typeTable></typeTable>
    </el-card>
    <el-divider />
    <el-divider />
    <h3 class="mrg-bot">2.FUNCTIONS</h3>
    <el-card class="mrg-top">
      <div class="code-comment mrg-bot">
        opyRequest(req: TransactionRequest)⇒ PreparedTransactionRequest
      </div>
      <el-button class="mrg-bot" type="primary" @click="copyRequestFun">
        copyRequest</el-button
      >
      <div class="code-comment mrg-bot">
        getDefaultProvider(network?: string | Networkish | WebSocketLike,
        options?: any)⇒ AbstractProvider
      </div>
      <el-button class="mrg-bot" type="primary" @click="getDefaultProviderFun">
        getDefaultProvider</el-button
      >
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">3. class Block</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <blockTable></blockTable>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">4. interface BrowserDiscoverOptions</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">
        anyProvider=>boolean <br />
        filter⇒ (found: Array< Eip6963ProviderInfo >) => null | BrowserProvider
        | Eip6963ProviderInfo<br />
        provider⇒ Eip1193Provider |timeout⇒ number | window⇒ any
      </div>
      <el-button class="mrg-bot" type="primary" @click="setPropertiesFun">
        setProperties</el-button
      >
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">5. class BroeserProvider</h3>
    <el-card class="mrg-top">
      <browserProvider></browserProvider>
    </el-card>
    <el-divider />

    <!-- 6 -->
    <EnsPlugin></EnsPlugin>

    <h3 class="mrg-bot">7. class FeeData</h3>
    <el-card class="mrg-top">
      <FeeData></FeeData>
    </el-card>
    <el-divider />

    <!-- 8/9/10/11 -->
    <Filter></Filter>

    <!-- GasCostPlugin -->
    <h3 class="mrg-bot">12. class CasCostPlugin</h3>
    <el-card class="mrg-top">
      <GasCostPlugin></GasCostPlugin>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">13. class IpcSocketProvider</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">PROPERTIES:</h4>
      <div class="code-comment mrg-bot">socket⇒ Socket</div>
      <h4 class="mrg-bot">CREATING INSTANCES :</h4>
      <div class="code-comment mrg-bot">
        new IpcSocketProvider(socket: Socket)⇒ IpcSocketProvider
      </div>
      <el-button
        class="mrg-bot"
        type="primary"
        @click="newIptSocketProviderFun"
      >
        new IpcSocketProvider</el-button
      >
    </el-card>
    <el-divider />

    <!-- 14 -->
    <logTable></logTable>

    <!-- 15 -->
    <minedBlock></minedBlock>

    <h3 class="mrg-bot">16. class NetworkPlugin</h3>
    <el-card class="mrg-top">
      <networkPlugin></networkPlugin>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">17. class NonceManager</h3>
    <el-card class="mrg-top">
      <nonceManager></nonceManager>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">18. interface Provider</h3>
    <el-card class="mrg-top">
      <Provider></Provider>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">19. interface Signer</h3>
    <el-card class="mrg-top">
      <Signer></Signer>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">20. class TransactionReceipt</h3>
    <el-card class="mrg-top">
      <TransactionReceipt></TransactionReceipt>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">21. class TransactionRequest</h3>
    <el-card class="mrg-top">
      <TransactionRequest></TransactionRequest>
    </el-card>
    <el-divider />

    <h3 class="mrg-bot">22. class TransactionResponse</h3>
    <el-card class="mrg-top">
      <TransactionResponse></TransactionResponse>
    </el-card>
    <el-divider />

    <!-- 18/19 -->
    <webSocket></webSocket>

    <h3 class="mrg-bot">25. Network</h3>
    <el-card class="mrg-top">
      <netWork></netWork>
    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import typeTable from "./typeTable.vue";
import blockTable from "./blockTable.vue";
import browserProvider from "./browserProvider.vue";
import webSocket from "./webSocket.vue";
import TransactionResponse from "./TransactionResponse.vue";
import TransactionRequest from "./TransactionRequest.vue";
import TransactionReceipt from "./TransactionReceipt.vue";
import Provider from "./Provider.vue";
import Signer from "./Signer.vue";
import netWork from "./netWork.vue";
import nonceManager from "./nonceManager.vue";
import networkPlugin from "./networkPlugin.vue";
import minedBlock from "./mined.vue";
import logTable from "./logTable.vue";
import GasCostPlugin from "./GasCostPlugin.vue";
import Filter from "./Filter.vue";
import FeeData from "./FeeData.vue";
import EnsPlugin from "./EnsPlugin.vue";
const Store = useStore();
const copyRequestFun = () => {
  const request = {
    to: "0x0000000000000000000000000000000000000000",
    value: ethers.parseEther("0.001"),
    gasLimit: 21000,
    gasPrice: ethers.parseUnits("100", "gwei"),
  };
  const _request = ethers.copyRequest(request);
  console.log(_request, "copyRequestFun");
};
const getDefaultProviderFun = () => {
  // Connect to a local Geth node
  const _provider1 = ethers.getDefaultProvider("http://localhost:8545/");
  console.log(_provider1, "copyRequestFun");
  // Connect to Ethereum mainnet with any current and future third-party services available
  const _provider2 = ethers.getDefaultProvider("mainnet");
  console.log(_provider2, "copyRequestFun");
  // Connect to Polygon, but only allow Etherscan and
  // INFURA and use "MY_API_KEY" in calls to Etherscan.
  const _provider3 = ethers.getDefaultProvider("matic", {
    etherscan: "KQJW5N5JVQVZZ1RJ2C4ZC1IQW3E1ZNNSAV",
    exclusive: ["etherscan", "infura"],
  });
  console.log(_provider3, "copyRequestFun");
};
const setPropertiesFun = async () => {
  // const provider = new ethers.BrowserProvider(window.ethereum, {
  //   filter: (providers) => {
  //     // 优先选择 Coinbase Wallet
  //     const coinbase = providers.find(p => p.name === 'Coinbase Wallet');
  //     if (coinbase) return coinbase;

  //     // 回退到 MetaMask
  //     const metaMask = providers.find(p => p.name === 'MetaMask');
  //     return metaMask || null;
  //   }
  // });
  console.log("setPropertiesFun");
};
const newIptSocketProviderFun = async () => {
  // 检查 ethers 版本和可用性
  if (!ethers.IpcSocketProvider) {
    console.error("❌ IpcSocketProvider 不可用");
    console.log("�� 请检查 ethers 版本或使用其他 Provider 类型");
    return;
  }
  // 尝试常见的 IPC 路径
  const ipcPaths = [
    "/tmp/geth.ipc", // 临时目录
    "/home/user/.ethereum/geth.ipc", // Linux 用户目录
    "/Users/user/Library/Ethereum/geth.ipc", // macOS
    "\\\\.\\pipe\\geth.ipc", // Windows
  ];

  for (const ipcPath of ipcPaths) {
    try {
      console.log(`🔌 尝试 IPC 路径: ${ipcPath}`);

      const _provider = new ethers.IpcSocketProvider(ipcPath);

      // 测试连接
      const network = await _provider.getNetwork();
      const blockNumber = await _provider.getBlockNumber();

      console.log("✅ IPC 连接成功！");
      console.log("路径:", ipcPath);
      console.log("网络:", network.name);
      console.log("链ID:", network.chainId);
      console.log("区块号:", blockNumber);

      // 存储到 Store
      // Store.provider = _provider;

      // connected = true;
      break;
    } catch (pathError) {
      console.log(`路径 ${ipcPath} 失败:`, pathError.message);
      continue;
    }
  }
};
</script>

<style scoped>
/* 页面样式 */
</style>
