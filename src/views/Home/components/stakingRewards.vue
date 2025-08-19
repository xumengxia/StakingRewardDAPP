<template>
  <div class="stakingRewards">
    <statistic :statisticArr="statisticArr"></statistic>

    <div class="mrg-bot mrg-top">设置奖励时长</div>
    <el-input v-model="duration" style="width: 360px" placeholder="1000" />
    <el-button class="mrg-lef" type="primary" @click="setRewardsDurationFun">setRewardsDuration</el-button>

    <div class="mrg-bot mrg-top">向质押奖励池注入ETH 作为用户质押收益</div>
    <el-input v-model="amount" style="width: 360px" placeholder="ETH" />
    <el-button class="mrg-lef" type="primary" @click="notifyRewardAmountFun">notifyRewardAmount</el-button>
    <!-- 用户调用该函数向质押合约质押指定数量的代币，合约校验数量有效后，从用户账户划转代币并更新质押余额与总质押量。 -->
    <div class="mrg-bot mrg-top">用户质押代币</div>
    <el-input v-model="userStakeAmount" style="width: 360px" placeholder="ETH" />
    <el-button class="mrg-lef" type="primary" @click="stakeFun">stake</el-button>
    <el-button class="mrg-lef" type="primary" @click="getRewardFun">getReward</el-button>

    <div class="mrg-bot mrg-top">查询此地址相关数据,默认为当前账号地址</div>
    <el-input v-model="address" style="width: 360px" placeholder="Address" />
    <el-button class="mrg-lef" type="primary" @click="checkAllFun">checkAllDate</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useStore } from "@/store/index";
  import { ethers } from "ethers";
  import statistic from "@/components/statistic.vue";
  const Store = useStore();

  const statisticArr = computed(() => {
    return Object.keys(Store.stakingRewardsData).map((key) => ({
      key,
      value: Store.stakingRewardsData[key],
    }));
  });

  // 2. 设置奖励时长1000

  const userStakeAmount = ref("");
  const amount = ref(null);
  const duration = ref("");
  const setRewardsDurationFun = async () => {
    try {
      // 发送交易 + 等待上链
      const tx = await Store.contracts.stakingRewards.setRewardsDuration(
        duration.value
      );
      await tx.wait();
      await checkDurationFun();
      duration.value = "";
      ElMessage({ message: "success", type: "success" });
    } catch (err) {
      ElMessage({ message: err, type: "error" });
      console.error("设置失败:", err);
    }
  };
  const checkDurationFun = async () => {
    const _duration = await Store.contracts.stakingRewards.duration();
    Store.$patch({
      stakingRewardsData: {
        duration: _duration.toString(),
      },
    });
  };
  // 3.设置notifyRewardAmount 1000eth;

  const notifyRewardAmountFun = async () => {
    try {
      // 发送交易 + 等待上链
      const tx = await Store.contracts.stakingRewards.notifyRewardAmount(
        amount.value
      );
      await tx.wait(); // 等待区块确认
      await checkAllFun();
      amount.value = "";
      ElMessage({ message: "success", type: "success" });
    } catch (err) {
      ElMessage({ message: err, type: "error" });
    }
  };

  // 4.用户质押代币
  const stakeFun = async () => {
    try {
      const tx = await Store.contracts.stakingRewards.stake(
        userStakeAmount.value
      );
      await tx.wait(); // 等待区块确认
      await checkAllFun();
      console.log("质押成功！", Store.contracts.stakingRewards);
    } catch (err) {
      console.error("质押失败:", err);
    }
  };

  const getRewardFun = async () => {
    try {
      const tx = await Store.contracts.stakingRewards.getReward();
      await tx.wait(); // 等待区块确认
      console.log("getReward成功！", tx);
    } catch (err) {
      console.error("getReward失败:", err);
    }
  };

  const address = ref("");
  const checkAllFun = async () => {
    if (!Store.contracts.stakingRewards) return console.error("合约未初始化");
    try {
      const _address = address.value || Store.currentAccount;
      const _balanceOf = await Store.contracts.stakingRewards.balanceOf(_address);
      const _earned = await Store.contracts.stakingRewards.earned(_address);
      const _rewards = await Store.contracts.stakingRewards.rewards(_address);
      const _userRewardPerTokenPaid =
        await Store.contracts.stakingRewards.userRewardPerTokenPaid(_address);
      Store.$patch({
        stakingRewardsData: {
          balanceOf: ethers.formatEther(_balanceOf) + "Eth",
          earned: ethers.formatEther(_earned) + "Eth",
          rewards: ethers.formatEther(_rewards) + "Eth",
          userRewardPerTokenPaid: ethers.formatEther(_userRewardPerTokenPaid),
          finishAt: await Store.contracts.stakingRewards.finishAt(),
          updatedAt: await Store.contracts.stakingRewards.updatedAt(),
          rewardRate: await Store.contracts.stakingRewards.rewardRate(),
          totalSupply:
            ethers.formatEther(
              await Store.contracts.stakingRewards.totalSupply()
            ) + "Eth",
        },
      });
    } catch (err) {
      console.error("earned失败:", err);
    }
  };
</script>

<style scoped></style>