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
      <div class="grid grid-cols-3 gap-6">
        <!-- 总质押量 -->
        <div class="p-6 bg-gray-800 rounded-lg">
          <h2 class="text-lg font-semibold">总质押量</h2>
          <p id="total-staked" class="text-2xl mt-2">
            {{ Store.totalSupply }} ETH
          </p>
        </div>
        <!-- 奖励池 -->
        <div class="p-6 bg-gray-800 rounded-lg">
          <h2 class="text-lg font-semibold">奖励池</h2>
          <p id="reward-pool" class="text-2xl mt-2">
            {{ Store.contractData.totalSupply }} ETH
          </p>
        </div>
        <!-- 剩余时长 -->
        <div class="p-6 bg-gray-800 rounded-lg">
          <h2 class="text-lg font-semibold">奖励时长</h2>
          <p id="reward-duration" class="text-2xl mt-2">
            {{ Store.contractData.duration }} 秒
          </p>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="mt-8 flex justify-center space-x-4">
        <a href="/staking" class="px-8 py-3 bg-green-600 rounded">质押</a>
        <a href="/withdraw" class="px-8 py-3 bg-purple-600 rounded">提取</a>
      </div>
    </div>
    <el-divider />
    <div class="step">
      <!-- 质押合约 -->
      <h2 class="mrg-bot">staking合约</h2>
      <div class="token2">
        <el-input
          v-model="stakinitialSupply"
          style="width: 240px"
          placeholder="Eth"
        />
        <el-button class="mrg-lef" type="primary" @click="mintFun('stak')"
          >mint</el-button
        >
        <el-button class="mrg-lef" type="primary" @click="mintFun('approve')"
        >approve</el-button
      >
      </div>
      <el-divider />
      <!-- 奖励合约 -->
      <h2 class="mrg-bot">rewards合约</h2>
      <div class="token2">
        <el-input
          v-model="rewardsinitialSupply"
          style="width: 240px"
          placeholder="Eth"
        />
        <el-button class="mrg-lef" type="primary" @click="mintFun('rewards')"
          >mint</el-button
        >
        <el-button class="mrg-lef" type="primary" @click="balanceOfFun">balanceOf</el-button>
        <el-descriptions class="mrg-top" :column="1" border>
          <el-descriptions-item>
            <template #label  >
              <div class="cell-item">balanceOf:</div>
            </template>
            {{ Store.contractData.balanceOf }}
          </el-descriptions-item>
         
        </el-descriptions>
      </div>
      <el-divider />

      <!-- 质押奖励合约 -->
      <h2 class="mrg-bot">stakingRewards合约</h2>
      <div class="token2">
        <div>
          <div class="mrg-bot">设置奖励时长</div>
          <el-input
            v-model="duration"
            style="width: 240px"
            placeholder="Please input"
          />
          <el-button
            class="mrg-lef"
            type="primary"
            @click="setRewardsDurationFun"
            >setRewardsDuration</el-button
          >
          <el-button class="mrg-lef" type="primary" @click="checkDurationFun"
            >checkDuration</el-button
          >
          <!-- <span class="mrg-lef">{{ Store.contractData.duration }} 秒</span> -->
        </div>
        <div class="mrg-bot mrg-top">向质押奖励池注入ETH 作为用户质押收益</div>
        <el-input v-model="amount" style="width: 240px" placeholder="ETH" />
        <el-button class="mrg-lef" type="primary" @click="notifyRewardAmountFun"
          >notifyRewardAmount</el-button
        >
        <el-button class="mrg-lef" type="primary" @click="checkFun"
          >check</el-button
        >
        <!-- 计算并更新奖励发放速率与时间 -->
        <el-descriptions class="mrg-top" :column="1" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">finishAt:</div>
            </template>
            {{ Store.contractData.finishAt }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">updatedAt:</div>
            </template>
            {{ Store.contractData.updatedAt }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">duration:</div>
            </template>
            {{ Store.contractData.duration }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">earn:</div>
            </template>
            {{ Store.contractData.earned }}
          </el-descriptions-item>
        </el-descriptions>

        <!-- 用户调用该函数向质押合约质押指定数量的代币，
         合约校验数量有效后，从用户账户划转代币并更新质押余额与总质押量。 -->
        <div class="mrg-bot mrg-top">用户质押代币</div>
        <el-input v-model="userStakeAmount" style="width: 240px" placeholder="ETH" />
        <el-button class="mrg-lef" type="primary" @click="stakeFun">stake</el-button>
        <el-button class="mrg-lef" type="primary" @click="earnedFun">earned</el-button>
        <el-button class="mrg-lef" type="primary" @click="getRewardFun">getReward</el-button>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import token1Abi from "@/contract/artifacts/Token1_metadata.json";
import token2Abi from "@/contract/artifacts/Token2_metadata.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
import { useStore } from "@/store/index";
import { validateNumberInput } from "@/utils/validation.ts";
const Store = useStore();

// 1. 在rewardsToken  中向stakingRwards中mint1000eth
const rewardsinitialSupply = ref("");
const stakinitialSupply = ref("");
const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS || "";
const mintFun = async (type) => {
  try {
    if (type === "rewards") {
      const tx = await Store.contracts.rewards.mint(
        stakingRewardsAddress,
        rewardsinitialSupply.value
      );
      await tx.wait(); // 等待区块确认
    } else if (type === "stak") {
      console.log(Store.currentAccount, "currentAccount");

       const Tx = await Store.contracts.staking.mint(
       Store.currentAccount,
        stakinitialSupply.value
      );
      await Tx.wait(); // 等待区块确认
    } else {
       const Tx = await Store.contracts.staking.approve(
        stakingRewardsAddress,
        stakinitialSupply.value
      );
      await Tx.wait(); // 等待区块确认
     
    }
  } catch (err) {
    console.error("stak设置失败:", err);
  }
};
const balanceOfFun = async () => {
  try {
    const tx = await Store.contracts.rewards.balanceOf(Store.currentAccount);
    Store.$patch({balanceOf:tx.toString()})
    console.log("balanceOf成功！",tx);
  } catch (err) {
    console.error("balanceOf失败:", err);
  }
}
// 2. 设置奖励时长1000
const duration = ref("");
const setRewardsDurationFun = async () => {
  const durationNum = await validateNumberInput(duration.value, "无效时长");
  try {
    // 发送交易 + 等待上链
    const tx = await Store.contracts.stakingRewards.setRewardsDuration(
      durationNum
    );
    await tx.wait(); // 等待区块确认
    console.log("时长设置成功！", Store.contracts.stakingRewards);
    // 确认后立即查询（保证时序）
    await checkDurationFun();
  } catch (err) {
    console.error("设置失败:", err);
  }
};

const checkDurationFun = async () => {
  if (!Store.contracts.stakingRewards) return console.error("合约未初始化");
  // 调用合约的只读方法（返回 BigNumber，需转字符串）
  const _duration = await Store.contracts.stakingRewards.duration();
  Store.$patch({
    contractData: { duration: _duration },
  });
};

// 3.设置notifyRewardAmount 1000eth;
const amount = ref(null);
const notifyRewardAmountFun = async () => {
  try {
    // 发送交易 + 等待上链
    const tx = await Store.contracts.stakingRewards.notifyRewardAmount(
      amount.value
    );
    await tx.wait(); // 等待区块确认
    console.log("注入成功！", Store.contracts.stakingRewards);
    await checkFun();
  } catch (err) {
    console.error("设置失败:", err);
  }
};
const checkFun = async () => {
  if (!Store.contracts.stakingRewards) return console.error("合约未初始化");
  Store.$patch({
    contractData: {
      finishAt: await Store.contracts.stakingRewards.finishAt(),
      updatedAt: await Store.contracts.stakingRewards.updatedAt(),
    },
  });
};

// 4.用户质押代币
const userStakeAmount = ref("");
const stakeFun = async () => {
  try {
    const tx = await Store.contracts.stakingRewards.stake(userStakeAmount.value);
    await tx.wait(); // 等待区块确认
    console.log("质押成功！", Store.contracts.stakingRewards);
  } catch (err) {
    console.error("质押失败:", err);
  }
}
const earnedFun= async () => {
  try {
    const tx = await Store.contracts.stakingRewards.earned(Store.currentAccount);
    Store.$patch({earned:tx.toString()});
     // 等待区块确认
    console.log("earned成功！",tx);
  } catch (err) {
    console.error("earned失败:", err);
  }
}
const getRewardFun = async () => {
  try {
    const tx = await Store.contracts.stakingRewards.getReward();
    await tx.wait(); // 等待区块确认
    console.log("getReward成功！",tx);
  } catch (err) {
    console.error("getReward失败:", err);
  }
}
onMounted(async () => {});
</script>

<style scoped>
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label){
  width: 30%!important;
}
.mrg-top {
  margin-top: 20px;
}
.mrg-bot {
  margin-bottom: 10px;
}
.mrg-lef {
  margin-left: 10px;
}

.home {
  .header {
    min-height: 80px;
    margin: 0, 10px;
    display: flex; /* 新增，开启Flex布局 */
    align-items: center;
  }
  .content {
  }
}
</style>
