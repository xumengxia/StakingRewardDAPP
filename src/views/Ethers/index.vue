<template>
  <div class="Staking">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label=" Addresses" name="first">
        <Address></Address>
      </el-tab-pane>
      <el-tab-pane label="Contracts" name="second">
        <Contracts></Contracts>
      </el-tab-pane>
      <el-tab-pane label="Providers" name="third">
        <Providers></Providers>
      </el-tab-pane>
      <el-tab-pane label="Transactiongs" name="fourth">
        <Transactiongs></Transactiongs>
      </el-tab-pane>
      <el-tab-pane label="Wallets" name="fifth">
        <Wallets></Wallets>
      </el-tab-pane>
      <el-tab-pane label="Utilities" name="sixth">
        <Utilities></Utilities>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import Address from "@/views/Ethers/components/Address.vue";
  import Contracts from "@/views/Ethers/components/Contracts.vue";
  import Providers from "@/views/Ethers/components/Providers.vue";
  import Transactiongs from "@/views/Ethers/components/Transactiongs.vue";
  import Wallets from "@/views/Ethers/components/Wallets.vue";
  import Utilities from "@/views/Ethers/components/Utilities/index.vue";
  const activeName = ref("first");
  const handleClick = (tab) => {
    console.log(tab);
  };

</script>

<style scoped>
  /* 页面样式 */
</style>