<template>
  <el-table :data="providerTypes" style="width: 100%">
    <el-table-column prop="type" label="类型" width="250" />
    <el-table-column prop="info" label="用途说明" />
    <el-table-column prop="example" label="应用场景" />
  </el-table>


</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();

  const providerTypes = [
    {
      type: "BlockTag",
      info: "指定区块链上的特定区块（通过区块高度或哈希）",
      example: "查询历史交易状态、回滚交易、验证区块数据"
    },
    {
      type: "BrowserProviderOptions",
      info: "配置浏览器环境下的 Provider 行为（如缓存、轮询、网络类型）",
      example: "网页端 DApp 连接 MetaMask 或本地节点，优化用户体验"
    },
    {
      type: "DebugEventBrowserProvider",
      info: "捕获 Provider 的调试事件（如 EIP-1193 通信结果）",
      example: "调试网络请求错误、追踪 MetaMask 与 DApp 的交互过程"
    },
    {
      type: "GasCostParameters",
      info: "定义 Gas 消耗计算参数（如访问列表、数据零值/非零值成本）",
      example: "动态估算交易 Gas 费用，优化 Gas 策略"
    },
    {
      type: "OrphanFilter",
      info: "检测孤儿区块或交易（如被丢弃或重排序的交易）",
      example: "监控区块链分叉或重组事件，确保交易最终性"
    },
    {
      type: "ProviderEvent",
      info: "订阅 Provider 的事件（如新区块、错误、交易确认）",
      example: "实时监听区块链状态变化（如区块确认、交易上链、网络异常）"
    },
    {
      type: "TopicFilter",
      info: "定义日志事件的布隆过滤器查询（支持精确匹配或通配符）",
      example: "高效检索合约事件（如 ERC-20 转账、NFT 铸造）"
    },
    {
      type: "WebSocketCreator",
      info: "提供 WebSocket 连接的创建函数（用于断线重连）",
      example: "实现 WebSocket 长连接，实时同步区块链数据（如行情、游戏状态）"
    }
  ];
  const copyRequestFun = () => {
    const request = {
      to: "0x0000000000000000000000000000000000000000",
      value: ethers.parseEther("0.001"),
      gasLimit: 21000,
      gasPrice: ethers.parseUnits("100", "gwei")
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
      exclusive: ["etherscan", "infura"]
    });
    console.log(_provider3, "copyRequestFun");
  };

</script>

<style scoped></style>