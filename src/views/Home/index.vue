<template>
  <div class="home">
    <!-- 测试数据：1000000000000000000000 -->
    <!-- 
      1. 创建了两个1000eth的 token1 token1；
      2. 分别用 stakingToken = IERC20(token1 )，rewardsToken = IERC20(token1);创建了stakingRwards合约；
      ----------------------以上两个步骤都是在remix里面完成部署合约，获取合约号------------------------；

      3. 在stakingRwards合约设置了奖励时长 setRewardsDuration 1000，
      4. 在rewardsToken  中向stakingRwards中mint1000eth; 
      5.设置notifyRewardAmount 1000eth; 
      6. 切换用户3，在stakingToken  中向用户三mint 1000eth,并approve1000eth 给stakingRwards合约； 
      7. 在stakingrewards合约中 stake 1000eth  
      8.在stakingrewards合约中查看用户3的奖励earned 
      9.在 stakingrewards合约中执行getrewards，获得奖励 
      10.查看用户3在rewardsToken中的余额，就是质押后的奖励 -->
    <!-- <header class="header">
      整个流程简单说就是：先备好质押和奖励用的代币，建个质押奖励合约并设好 1000
      秒的奖励周期，往合约里放 1000ETH 当奖励；然后给用户 3 发 1000ETH
      质押代币并让他授权合约使用，用户 3 把这 1000ETH
      质押进去，之后就能看到自己能拿多少奖励，领完奖励后查余额，就能看到到手的奖励了。
    </header> -->
    <div class="content">
      <!-- 核心数据卡片 -->
      <div style="display: flex; justify-content: space-between">
        <!-- 总质押量 -->
        <div>
          <h2>总质押量</h2>
          <p>{{ Store.stakData.totalSupply }}ETH</p>
        </div>
        <!-- 奖励池 -->
        <div>
          <h2>奖励池</h2>
          <p>{{ Store.rewardsData.totalSupply }}ETH</p>
        </div>
        <!-- 剩余时长 -->
        <div>
          <h2>奖励时长</h2>
          <p>{{ Store.stakingRewardsData.duration }}秒</p>
        </div>
      </div>
    </div>
    <el-divider />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Staking" name="first">
        <staking></staking>
      </el-tab-pane>
      <el-tab-pane label="Rewards" name="second">
        <rewards></rewards>
      </el-tab-pane>
      <el-tab-pane label="StakingRewards" name="third">
        <stakingRewards></stakingRewards>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import stakingRewards from "./components/stakingRewards.vue";
import rewards from "./components/rewards.vue";
import staking from "./components/staking.vue";
import { useStore } from "@/store/index";
const Store = useStore();
const activeName = ref("first");
const handleClick = (tab) => {
  console.log(tab);
};

// 假设 Store.contracts.staking 是响应式状态
watch(
  () => Store.contracts.staking,
  async (newContract, oldContract) => {
    if (newContract && !oldContract) {
      // 合约从“未初始化”变为“已初始化”
      console.log("合约已初始化，开始加载数据...");
      // 执行初始化后的操作（如获取合约数据）
      await loadContractData(newContract);
    }
  },
  { immediate: true } // 立即执行一次（处理初始状态）
);
watch(
  () => Store.contracts.rewards,
  async (newContract, oldContract) => {
    if (newContract && !oldContract) {
      // 合约从“未初始化”变为“已初始化”
      console.log("合约已初始化，开始加载数据...");
      // 执行初始化后的操作（如获取合约数据）
      await loadContractData(newContract);
    }
  },
  { immediate: true } // 立即执行一次（处理初始状态）
);
watch(
  () => Store.contracts.stakingRewards,
  async (newContract, oldContract) => {
    if (newContract && !oldContract) {
      // 合约从“未初始化”变为“已初始化”
      console.log("合约已初始化，开始加载数据...");
      // 执行初始化后的操作（如获取合约数据）
      await loadContractData(newContract);
    }
  },
  { immediate: true } // 立即执行一次（处理初始状态）
);

// 初始化后的数据加载函数
async function loadContractData(contract) {
  Store.$patch({
    rewardsData: {
      decimals: await contract.decimals(),
      name: await contract.name(),
      symbol: await contract.symbol(),
      totalSupply: ethers.formatEther(await contract.totalSupply()),
      balance: ethers.formatEther(
        await contract.balanceOf(Store.currentAccount)
      ),
    },
  });
  // Store.rewardsData = {
  //   decimals: await contract.decimals(),
  //   name: await contract.name(),
  //   symbol: await contract.symbol(),
  //   totalSupply: ethers.formatEther(await contract.totalSupply()),
  //   balance: ethers.formatEther(await contract.balanceOf(Store.currentAccount)),
  // };
}

onMounted(async () => {});
</script>

<style scoped>
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  width: 30% !important;
}

.home {
  .header {
    min-height: 80px;
    margin: 0, 10px;
    display: flex; /* 新增，开启Flex布局 */
    align-items: center;
  }
}
</style>
