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
        currentAccount: accounts[0],
        isConnected: true,
        rewardsContract,
        stakingContract,
        stakingRewardsContract,
        duration: (await stakingRewardsContract.duration()) || null,
        finishAt: (await stakingRewardsContract.finishAt()) || null,
        updatedAt: (await stakingRewardsContract.updatedAt()) || null,
      });
      console.log("accounts", accounts);
      console.log("rewardsContract", rewardsContract.target);
      console.log("stakingContract", stakingContract.target);
      console.log("stakingRewardsContract", stakingRewardsContract.target);
      //   const balance = await rewardsContract.balanceOf(
      //     "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      //   );
      //   console.log("balance", balance.toString());
    }
  } catch (err) {
    Store.$patch({
      errorMessage: err instanceof Error ? err.message : "连接钱包失败",
    });
    Store.resetState();
    throw err; // 抛出错误便于组件层捕获处理
  }
}
