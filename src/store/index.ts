import { defineStore } from "pinia";
import { BrowserProvider, parseUnits, Signer, Contract } from "ethers";
export const useStore = defineStore("walletContracts", {
  state: () => ({
    // 钱包核心对象
    provider: null as BrowserProvider | null,
    signer: null as Signer | null,
    currentAccount: "",
    isConnected: false,
    totalSupply: null as Number | null,
    // 合约实例
    stakingContract: null as Contract | null,
    rewardsContract: null as Contract | null,
    stakingRewardsContract: null as Contract | null,
    duration: null as Number | null,
    finishAt: null as Number | null,
    updatedAt: null as Number | null,
    // 错误信息
    errorMessage: "",
  }),
  // persist: true,
  getters: {
    // 检查是否所有合约都已初始化
    allContractsReady: (state) =>
      !!state.stakingContract &&
      !!state.rewardsContract &&
      !!state.stakingRewardsContract,

    // 格式化显示当前账户（隐藏中间部分）
    formattedAccount: (state) => {
      if (!state.currentAccount) return "";
      return `${state.currentAccount.slice(
        0,
        6
      )}...${state.currentAccount.slice(-4)}`;
    },
  },
  actions: {
    // 断开连接时重置状态
    resetState() {
      console.log("重置");

      this.provider = null;
      this.signer = null;
      this.currentAccount = "";
      this.isConnected = false;

      this.totalSupply = null;
      this.stakingContract = null;
      this.rewardsContract = null;
      this.stakingRewardsContract = null;
      this.duration = null;
      this.finishAt = null;
      this.updatedAt = null;
      this.errorMessage = "";
    },

    // 手动刷新合约（如网络切换后）
    async refreshContracts() {
      if (!this.isConnected) return;
      await this.connectWallet(); // 复用连接逻辑刷新状态
    },
  },
});
