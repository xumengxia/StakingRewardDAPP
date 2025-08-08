import { defineStore } from "pinia";
import { markRaw } from "vue";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits, Signer, Contract } from "ethers";
import token1Abi from "@/contract/artifacts/Token1_metadata.json";
import token2Abi from "@/contract/artifacts/Token2_metadata.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
export const useStore = defineStore("walletContracts", {
  state: () => ({
    // 钱包核心对象
    provider: null as BrowserProvider | null,
    signer: null as Signer | null,
    currentAccount: "",
    isConnected: false,

    // 合约实例
    contracts: {
      staking: null as Contract | null,
      rewards: null as Contract | null,
      stakingRewards: null as Contract | null,
    },

    // 合约数据
    contractData: {
      totalSupply: null,
      duration: null,
      finishAt: null,
      updatedAt: null,
      balanceOf: null,
      earned: null,
    },

    // 错误信息
    errorMessage: "",
  }),
  // persist: true,
  getters: {
    // 检查是否所有合约都已初始化
    allContractsReady: (state) => Object.values(state.contracts).every(Boolean),
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
    async initContracts() {
      try {
        if (!window.ethereum) throw new Error("MetaMask not installed");
        
        this.provider = markRaw(new ethers.BrowserProvider(window.ethereum));
        this.signer = markRaw(await this.provider.getSigner());
        const token1Address = import.meta.env.VITE_TOKEN1_ADDRESS;
        const token2Address = import.meta.env.VITE_TOKEN2_ADDRESS;
        const stakingRewardsAddress = import.meta.env.VITE_STAKINGREWARDS_ADDRESS;
        // 使用markRaw包装合约实例
        this.contracts.staking = markRaw(new ethers.Contract(
          token1Address,
          token1Abi.output.abi,
          this.signer
        ));
        
        this.contracts.rewards = markRaw(new ethers.Contract(
          token2Address,
          token2Abi.output.abi,
          this.signer
        ));
        
        this.contracts.stakingRewards = markRaw(new ethers.Contract(
          stakingRewardsAddress,
          stakingRewardsAbi.output.abi,
          this.signer
        ));

        await this.fetchContractData();
        this.setupAccountChangeListener(); // 添加账户变化监听
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchContractData() {
      if (!this.contracts.stakingRewards) return;
      
      try {
        const [duration, finishAt, updatedAt, totalSupply,balanceOf,earned,] = await Promise.all([
          this.contracts.stakingRewards.duration(),
          this.contracts.stakingRewards.finishAt(),
          this.contracts.stakingRewards.updatedAt(),
          this.contracts.staking?.totalSupply(),
          this.contracts.rewards.balanceOf(this.currentAccount),
          this.contracts.stakingRewards.earned(this.currentAccount)
        ]);
        
        this.contractData = { 
          duration: Number(duration),
          finishAt: new Date(Number(finishAt) * 1000).toLocaleString(),
          updatedAt: new Date(Number(updatedAt) * 1000).toLocaleString(),
          totalSupply: totalSupply ? BigInt(totalSupply.toString()) : null,
          balanceOf:  ethers.formatEther(balanceOf),
          earned: ethers.formatEther(earned),
        };
      } catch (error) {
        this.handleError(error);
      }
    },

    async connectWallet() {
      try {
        const accounts = await window.ethereum.request({ 
          method: "eth_requestAccounts" 
        });
        this.currentAccount = accounts[0];
        this.isConnected = true;
        await this.initContracts();
      } catch (error) {
        this.handleError(error);
      }
    },
    setupAccountChangeListener() {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.resetState(); // 账户断开连接
        } else if (accounts[0] !== this.currentAccount) {
          this.currentAccount = accounts[0];
          this.initContracts(); // 账户切换时重新初始化
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload(); // 网络切换时刷新页面
      });
    },
    cleanupListeners() {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', this.handleAccountChange);
        window.ethereum.removeListener('chainChanged', this.handleChainChange);
      }
    },
    resetState() {
      this.$reset();
    },

    async refreshContracts() {
      if (!this.isConnected) return;
      await this.initContracts();
    },

    handleError(error: unknown) {
      this.errorMessage = error instanceof Error 
        ? error.message 
        : "Unknown error occurred";
      console.error(error);
    }
  },
});
