<template>
  <div class="layout-container">
    <div class="nav-menu">
      <h5 class="sideBarHeader">
        <el-icon><i-ep-WalletFilled /></el-icon>
        <span> StakingRewards</span>
      </h5>
      <el-menu default-active="2" class="menu" router>
        <el-menu-item index="/home">
          <el-icon><i-ep-Menu /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="/staking">
          <el-icon><i-ep-Menu /></el-icon>
          <span>Staking</span>
        </el-menu-item>
        <el-menu-item index="/withdraw">
          <el-icon><i-ep-Document /></el-icon>
          <span>Withdraw</span>
        </el-menu-item>
        <el-menu-item index="/profile">
          <el-icon><i-ep-Setting /></el-icon>
          <span>Profile</span>
        </el-menu-item>
      </el-menu>
      <div class="themeBox">
        <div class="left">
          <el-icon> <component :is="isDark ? Moon : Sunny" /></el-icon>
          <span>Theme</span>
        </div>

        <el-switch
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          @change="toggleDark"
        />
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = () => {
  useToggle(isDark);
};
</script>
<style scoped lang="scss">
.layout-container {
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  .nav-menu {
    width: 300px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    .sideBarHeader {
      margin: 28px 0 24px;
      padding: 0 20px;
      position: relative;
      width: 100%;
      font-size: large;
    }
    .menu {
      flex: 1;
    }
    .themeBox {
      width: 100%;
      height: 50px;
      padding: 0 28px 16px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
      }
    }
  }
  .content {
    flex: 1;
    height: 100%;
    padding-left: 54px;
    padding-right: 54px;
  }
}
</style>
