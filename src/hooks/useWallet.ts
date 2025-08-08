import { markRaw } from "vue"; // 新增导入
import { ethers } from "ethers";
import { Contract } from "ethers";
import token1Abi from "@/contract/artifacts/Token1_metadata.json";
import token2Abi from "@/contract/artifacts/Token2_metadata.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
import { useStore } from "@/store/index";

let signer = null;
let provider: any;
let stakingContract: Contract | null;
let rewardsContract: Contract | null;
let stakingRewardsContract: Contract | null;
let stakingAddr = import.meta.env.VITE_TOKEN1_ADDRESS || "";
let rewardsAddr = import.meta.env.VITE_TOKEN2_ADDRESS || "";
let stakingRewardsAddr = import.meta.env.VITE_STAKINGREWARDS_ADDRESS || "";

// 提取公共逻辑：更新账号、合约实例和Store状态
const updateAccountAndContracts = async (newAccount: string) => {
  const Store = useStore();
  try {
    // 更新签名者
    signer = await provider.getSigner();
    // 创建provider与区块链通讯的桥梁
    rewardsContract = new ethers.Contract(
      rewardsAddr,
      token2Abi.output.abi,
      signer
    );
    stakingContract = new ethers.Contract(
      stakingAddr,
      token1Abi.output.abi,
      signer
    );
    stakingRewardsContract = new ethers.Contract(
      stakingRewardsAddr,
      stakingRewardsAbi.output.abi,
      signer
    );

    Store.$patch({
      currentAccount: newAccount,
      isConnected: true,
      contracts: {
        staking: stakingContract,
        rewards: rewardsContract,
        stakingRewards: stakingRewardsContract,
      },
      contractData: {
        duration: (await stakingRewardsContract.duration()) || null,
        finishAt: (await stakingRewardsContract.finishAt()) || null,
        updatedAt: (await stakingRewardsContract.updatedAt()) || null,
      },
    });
  } catch (err) {
    Store.$patch({
      errorMessage: `更新失败: ${
        err instanceof Error ? err.message : "未知错误"
      }`,
    });
    console.error("账号与合约更新失败:", err);
    return false; // 失败标识
  }
};

// 账号切换事件处理
const handleAccountsChanged = async (accounts: string[]) => {
  const Store = useStore();
  if (accounts.length === 0) {
    // 断开连接时重置状态
    Store.resetState();
    Store.$patch({
      errorMessage: "钱包已断开连接",
      isConnected: false,
      currentAccount: null,
    });
    console.log("用户已断开钱包连接");
    return;
  }
  console.log("wolaile,", accounts[0]);

  // 调用公共更新函数
  await updateAccountAndContracts(accounts[0]);
};
export async function useWallet() {
  const Store = useStore();
  // todo:监听用户没有做选择钱包的操作，自动断开连接

  try {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum); // 修复此行
      signer = await provider.getSigner();

      // 请求账户授权
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts.length) {
        throw new Error("用户拒绝了钱包授权");
      }
      await updateAccountAndContracts(accounts[0]); // 监听账号切换（先清旧监听，避免重复）
      window.ethereum.removeAllListeners("accountsChanged");
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      console.log("初始连接成功");
    }
  } catch (err) {
    Store.$patch({
      errorMessage: err instanceof Error ? err.message : "连接钱包失败",
    });
    Store.resetState();
    throw err;
  }
}
