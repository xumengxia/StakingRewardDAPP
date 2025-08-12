<template>
  <div class="rewards">
    <statistic :statisticArr="statisticArr"></statistic>

    <div class="mrg-top">
      <div class="flex-Box">
        <el-button type="primary" @click="mintFun">mint</el-button>
        <el-input
          class="mrg-lef"
          v-model="rewardsinitialSupply"
          placeholder="Eth"
        />
      </div>
      <div class="flex-Box mrg-top">
        <el-button type="primary" @click="balanceOfFun">balanceOf</el-button>
        <el-input class="mrg-lef" v-model="address" placeholder="address" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import statistic from "@/components/statistic.vue";
const Store = useStore();

const statisticArr = computed(() => {
  return Object.keys(Store.rewardsData).map((key) => ({
    key,
    value: Store.rewardsData[key],
  }));
});
const rewardsinitialSupply = ref("");
const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS || "";
const mintFun = async () => {
  try {
    const tx = await Store.contracts.rewards.mint(
      stakingRewardsAddress,
      rewardsinitialSupply.value
    );
    await tx.wait(); // 等待区块确认
    rewardsinitialSupply.value = "";
    ElMessage({ message: "success", type: "success" });
  } catch (err) {
    ElMessage({ message: err, type: "error" });
  }
};
const address = ref("");
const balanceOfFun = async () => {
  try {
    const tx = await Store.contracts.rewards.balanceOf(address.value);
    address.value = "";
    ElMessage({ message: "success", type: "success" });
  } catch (err) {
    ElMessage({ message: err, type: "error" });
  }
};

onMounted(async () => {});
</script>

<style scoped>
/* 页面样式 */
</style>
