<template>
  <div class="home">
    <!-- <el-button type="primary">
      <el-icon><i-ep-Link /></el-icon>链接
    </el-button> -->
    <header class="header">
      整个流程简单说就是：先备好质押和奖励用的代币，建个质押奖励合约并设好 1000
      秒的奖励周期，往合约里放 1000ETH 当奖励；然后给用户 3 发 1000ETH
      质押代币并让他授权合约使用，用户 3 把这 1000ETH
      质押进去，之后就能看到自己能拿多少奖励，领完奖励后查余额，就能看到到手的奖励了。
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import token1Abi from "@/contract/artifacts/Token1.json";
import token2Abi from "@/contract/artifacts/Token2.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards.json";

const getEth = () => {
  // @ts-ignore
  const eth = window.ethereum;
  if (!eth) {
    throw new Error("No ethereum provider found.");
  }
  return eth;
};

// 请求用户授权
const requestAccounts = async () => {
  const eth = getEth();
  const result = await eth.request({
    method: "eth_requestAccounts",
  });
  return result && result.length > 0;
};

// 获取已授权账户的地址
const getAccounts = async () => {
  const eth = getEth();
  const accounts = await eth.request({
    method: "eth_accounts",
  });
  return accounts;
};

const signer1 = ref<ethers.Signer | null>(null);
const provider1 = ref<ethers.Provider | null>(null);
const address1 = ref(import.meta.env.VITE_TOKEN1_ADDRESS || "");
const contract1 = ref<ethers.Contract | null>(null);
async function getToken1Contract() {
  if (!(await getAccounts()) && !(await requestAccounts())) {
    throw new Error("No ethereum provider found.");
  }
  // 创建provider与区块链通信的桥梁
  provider1.value = await new ethers.BrowserProvider(getEth());
  contract1.value = new ethers.Contract(
    address1.value,
    token1Abi.abi,
    await provider1.value.getSigner()
  );
  console.log(provider1.value, "---", address1);
}
const main = async () => {
  await getToken1Contract();
};
onMounted(async () => {
  main();
});
</script>

<style scoped>
.home {
  .header {
    min-height: 80px;
    margin: 0, 10px;
    display: flex; /* 新增，开启Flex布局 */
    align-items: center;
  }
}
</style>
