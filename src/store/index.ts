import { defineStore } from "pinia";
import { markRaw } from "vue";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits, Signer, Contract, Network } from "ethers";
import token1Abi from "@/contract/artifacts/Token1_metadata.json";
import token2Abi from "@/contract/artifacts/Token2_metadata.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
interface RewardsData {
  decimals: number | null;
  name: string | null;
  symbol: string | null;
  totalSupply: string | null;
  balance: string | null;
}
export const useStore = defineStore("walletContracts", {
  state: () => ({
    // 钱包核心对象
    provider: null as BrowserProvider | null,
    signer: null as Signer | null,
    currentAccount: "",
    isConnected: false,
    network: null as Network | null,

    // 合约实例
    contracts: {
      staking: null as Contract | null,
      rewards: null as Contract | null,
      stakingRewards: null as Contract | null,
    },

    // 合约数据
    stakData: {
      decimals: null,
      name: null,
      symbol: null,
      totalSupply: null,
      balance: null,
    } as RewardsData,
    rewardsData: {
      decimals: null,
      name: null,
      symbol: null,
      totalSupply: null,
      balance: null,
    } as RewardsData,
    stakingRewardsData: {
      // stakingToken: null,
      // rewardsToken: null,
      // owner: null,
      duration: 0,
      finishAt: 0,
      updatedAt: 0,
      rewardRate: 0,
      rewardPerTokenStored: null,
      totalSupply: null,
      balanceOf: null,
      earned: null,
      rewards: null,
      userRewardPerTokenPaid: null,
    },

    // 错误信息
    errorMessage: "",
  }),
  // persist: true,
  getters: {
    // 检查是否所有合约都已初始化
    allContractsReady: (state) => Object.values(state.contracts).every(Boolean),
    // 格式化显示当前账户（隐藏中间部分）
    formattedAccount: (state) => (address?: string) => {
      if (!state.currentAccount) return "";
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    },
  },
  actions: {
    async initContracts() {
      try {
        if (!window.ethereum) throw new Error("MetaMask not installed");

        this.provider = markRaw(new ethers.BrowserProvider(window.ethereum));
        this.signer = markRaw(await this.provider.getSigner());
        this.network = await this.provider.getNetwork();
        const token1Address = import.meta.env.VITE_TOKEN1_ADDRESS;
        const token2Address = import.meta.env.VITE_TOKEN2_ADDRESS;
        const stakingRewardsAddress = import.meta.env
          .VITE_STAKINGREWARDS_ADDRESS;
        // 使用markRaw包装合约实例
        this.contracts.staking = markRaw(
          new ethers.Contract(token1Address, token1Abi.output.abi, this.signer)
        );

        this.contracts.rewards = markRaw(
          new ethers.Contract(token2Address, token2Abi.output.abi, this.signer)
        );

        this.contracts.stakingRewards = markRaw(
          new ethers.Contract(
            stakingRewardsAddress,
            stakingRewardsAbi.output.abi,
            this.signer
          )
        );
        console.log(this.contracts.rewards);

        await this.fetchContractData();
        // await this.fetchrewardsData();
        // await this.fetchStakData();
        this.setupAccountChangeListener(); // 添加账户变化监听
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchContractData() {
      if (!this.contracts.stakingRewards) return;

      try {
        const [
          // stakingToken,
          // rewardsToken,
          // owner,
          duration,
          finishAt,
          updatedAt,
          rewardRate,
          rewardPerTokenStored,
          totalSupply,
          balanceOf,
          earned,
          rewards,
          userRewardPerTokenPaid,
        ] = await Promise.all([
          // this.contracts.stakingRewards.stakingToken(),
          // this.contracts.stakingRewards.rewardsToken(),
          // this.contracts.stakingRewards.owner(),
          this.contracts.stakingRewards.duration().catch(() => 0),
          this.contracts.stakingRewards.finishAt().catch(() => 0),
          this.contracts.stakingRewards.updatedAt().catch(() => 0),
          this.contracts.stakingRewards.rewardRate().catch(() => 0),
          this.contracts.stakingRewards.rewardPerTokenStored().catch(() => 0),
          this.contracts.stakingRewards.totalSupply().catch(() => 0),
          this.contracts.stakingRewards
            .balanceOf(this.currentAccount)
            .catch(() => 0),
          this.contracts.stakingRewards
            .earned(this.currentAccount)
            .catch(() => 0),
          this.contracts.stakingRewards
            .rewards(this.currentAccount)
            .catch(() => 0),
          this.contracts.stakingRewards
            .userRewardPerTokenPaid(this.currentAccount)
            .catch(() => 0),
        ]);
        this.stakingRewardsData = {
          // stakingToken: this.formattedAccount(stakingToken),
          // rewardsToken: this.formattedAccount(rewardsToken),
          // owner: this.formattedAccount(owner),
          duration: Number(duration),
          finishAt: new Date(Number(finishAt) * 1000).toLocaleString(),
          updatedAt: new Date(Number(updatedAt) * 1000).toLocaleString(),
          rewardRate: ethers.formatEther(rewardRate),
          rewardPerTokenStored: ethers.formatEther(rewardPerTokenStored),
          totalSupply: ethers.formatEther(totalSupply) + "Eth",
          balanceOf: ethers.formatEther(balanceOf) + "Eth",
          earned: ethers.formatEther(earned) + "Eth",
          rewards: ethers.formatEther(rewards) + "Eth",
          userRewardPerTokenPaid: ethers.formatEther(userRewardPerTokenPaid),
        };
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchrewardsData() {
      if (!this.contracts.rewards) return;

      try {
        const [decimals, name, symbol, totalSupply, balance] =
          await Promise.all([
            this.contracts.rewards.decimals(),
            this.contracts.rewards.name(),
            this.contracts.rewards.symbol(),
            this.contracts.rewards.totalSupply(),
            this.contracts.rewards
              .balanceOf(this.currentAccount)
              .catch(() => 0),
          ]);

        this.rewardsData = {
          decimals: decimals,
          name: name,
          symbol: symbol,
          totalSupply: ethers.formatEther(totalSupply) + "Eth",
          balance: ethers.formatEther(balance) + "Eth",
        };
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchStakData() {
      if (!this.contracts.staking) return;

      try {
        const [decimals, name, symbol, totalSupply, balance] =
          await Promise.all([
            this.contracts.staking.decimals(),
            this.contracts.staking.name(),
            this.contracts.staking.symbol(),
            this.contracts.staking.totalSupply(),
            this.contracts.staking
              .balanceOf(this.currentAccount)
              .catch(() => 0),
          ]);

        this.stakData = {
          decimals: decimals,
          name: name,
          symbol: symbol,
          totalSupply: ethers.formatEther(totalSupply) + "Eth",
          balance: ethers.formatEther(balance) + "Eth",
        };
      } catch (error) {
        this.handleError(error);
      }
    },
    async connectWallet() {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.currentAccount = accounts[0];
        this.isConnected = true;
        await this.initContracts();
      } catch (error) {
        this.handleError(error);
      }
    },
    setupAccountChangeListener() {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          this.resetState(); // 账户断开连接
        } else if (accounts[0] !== this.currentAccount) {
          this.currentAccount = accounts[0];
          this.initContracts(); // 账户切换时重新初始化
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload(); // 网络切换时刷新页面
      });
    },
    cleanupListeners() {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          this.handleAccountChange
        );
        window.ethereum.removeListener("chainChanged", this.handleChainChange);
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
      this.errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(error);
    },
  },
});
