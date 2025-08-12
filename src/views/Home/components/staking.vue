<template>
  <div class="rewards">
    <statistic :statisticArr="statisticArr"></statistic>
    <div class="mrg-top">
      <el-input
        v-model="stakinitialSupply"
        style="width: 240px"
        placeholder="Eth"
      />
      <el-button class="mrg-lef" type="primary" @click="mintFun"
        >mint</el-button
      >
      <el-button class="mrg-lef" type="primary" @click="approveFun"
        >approve</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/store/index";
import { ethers } from "ethers";
import statistic from "@/components/statistic.vue";
const Store = useStore();

const statisticArr = computed(() => {
  return Object.keys(Store.stakData).map((key) => ({
    key,
    value: Store.stakData[key],
  }));
});
const stakinitialSupply = ref("");
const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS || "";
const mintFun = async () => {
  try {
    console.log(Store.currentAccount, "currentAccount");

    const Tx = await Store.contracts.staking.mint(
      Store.currentAccount,
      stakinitialSupply.value
    );
    await Tx.wait(); // 等待区块确认
    ElMessage({ message: "success", type: "success" });
  } catch (err) {
    ElMessage({ message: err, type: "error" });
  }
};
const approveFun = async () => {
  try {
    const Tx = await Store.contracts.staking.approve(
      stakingRewardsAddress,
      stakinitialSupply.value
    );
    await Tx.wait(); // 等待区块确认
    clearFun();
    ElMessage({ message: "success", type: "success" });
  } catch (err) {
    ElMessage({ message: err, type: "error" });
  }
};
const clearFun = () => {
  stakinitialSupply.value = "";
};
onMounted(() => {
  // console.log("2");
});
</script>

<style scoped>
/* 页面样式 */
</style>
