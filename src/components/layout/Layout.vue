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
        <el-menu-item index="/ethers">
          <el-icon><i-ep-Setting /></el-icon>
          <span>ethers</span>
        </el-menu-item>
      </el-menu>
      <div class="themeBox">
        <div class="left">
          <el-icon>
            <component :is="isDark ? Moon : Sunny" />
          </el-icon>
          <span>Theme</span>
        </div>

        <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" @change="toggleDark" />
      </div>
    </div>
    <div class="content">
      <div class="header">
        <el-button type="primary" @click="goHome">
          <el-icon><i-ep-UserFilled /></el-icon>
        </el-button>
        <el-button type="primary" @click="connectFun">
          <el-icon><i-ep-WalletFilled /></el-icon>
          <span style="margin-right: 5px">
            {{
            Store.isConnected
            ? Store.formattedAccount(Store.currentAccount)
            : "Connect Wallet"
            }}
          </span>
        </el-button>
      </div>
      <div class="con">
        <router-view />
      </div>
    </div>
  </div>

  <Disconnect v-model="showDisconnect" v-if="showDisconnect" :fmtAccount="Store.formattedAccount(Store.currentAccount)"
    @handleClose="handleClose"></Disconnect>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { Sunny, Moon } from "@element-plus/icons-vue";
  import { useDark, useToggle } from "@vueuse/core";
  import { useStore } from "@/store";
  import { useRouter } from "vue-router";
  import Disconnect from "@/components/layout/Disconnect.vue";
  const Store = useStore();
  const showDisconnect = ref(false);
  const connectFun = async () => {
    if (Store.isConnected) {
      // 已连接
      showDisconnect.value = true;
    } else {
      // 连接钱包并初始化合约
      await Store.connectWallet();
    }
    console.log(Store.isConnected, showDisconnect.value);
  };

  const isDark = useDark();
  const toggleDark = () => {
    useToggle(isDark);
  };

  const router = useRouter();
  const goHome = () => {
    router.replace({
      path: `/profile`,
    });
  };

  const handleClose = () => {
    showDisconnect.value = false;
    Store.resetState();
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
      height: 100vh;

      .header {
        width: 100%;
        height: 80px;
        padding-left: 54px;
        padding-right: 54px;
        display: flex;
        justify-content: end;
        align-items: center;

        .info {
          margin-right: 10px;
        }
      }

      .con {
        width: 100%;
        padding-top: 24px;
        padding-bottom: 48px;
        padding-left: 54px;
        padding-right: 54px;
        overflow-y: auto;
        height: calc(100vh - 80px);

      }
    }
  }
</style>