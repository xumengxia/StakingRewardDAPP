<template>
  <div class="home">
    <!-- 测试数据：1000000000000000000000 -->
    <!-- 
      1. 创建了两个1000eth的 token1 token1；
      2. 分别用 stakingToken = IERC20(token1 )，rewardsToken = IERC20(token1);创建了stakingRwards合约；
      ----------------------以上两个步骤都是在remix里面完成部署合约，获取合约号------------------------；

      3. 在stakingRwards合约设置了奖励时长 setRewardsDuration 1000，
      4. 在rewardsToken  中向stakingRwards中mint1000eth; 
      5.设置notifyRewardAmount 1000eth; 
      6. 切换用户3，在stakingToken  中向用户三mint 1000eth,并approve1000eth 给stakingRwards合约； 
      7. 在stakingrewards合约中 stake 1000eth  
      8.在stakingrewards合约中查看用户3的奖励earned 
      9.在 stakingrewards合约中执行getrewards，获得奖励 
      10.查看用户3在rewardsToken中的余额，就是质押后的奖励 -->
    <!-- <header class="header">
      整个流程简单说就是：先备好质押和奖励用的代币，建个质押奖励合约并设好 1000
      秒的奖励周期，往合约里放 1000ETH 当奖励；然后给用户 3 发 1000ETH
      质押代币并让他授权合约使用，用户 3 把这 1000ETH
      质押进去，之后就能看到自己能拿多少奖励，领完奖励后查余额，就能看到到手的奖励了。
    </header> -->
    <div class="content">
      <!--  -->
      <div class="token2">
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="Please input"
        />
        <el-button type="primary" @click="handelMint">mint</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { HDNodeWallet } from "ethers/wallet";
import token1Abi from "@/contract/artifacts/Token1_metadata.json";
import token2Abi from "@/contract/artifacts/Token2_metadata.json";
import stakingRewardsAbi from "@/contract/artifacts/StakingRewards_metadata.json";
let signer = null;
let provider;
let stakingContract;
let rewardsContract;
let stakingRewardsContract;
let stakingAddr = import.meta.env.VITE_TOKEN1_ADDRESS || "";
let rewardsAddr = import.meta.env.VITE_TOKEN2_ADDRESS || "";
let stakingRewardsAddr = import.meta.env.VITE_STAKINGREWARDS_ADDRESS || "";
const input = ref("");

const getContract = async () => {
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
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
    console.log("rewardsContract", rewardsContract.target);
    console.log("stakingContract", stakingContract.target);
    console.log("stakingRewardsContract", stakingRewardsContract.target);
  }
};
const handelMint = () => {
  contract.mint(stakingRewardsAddr, input.value);
};
const main = async () => {
  await getContract();
};
onMounted(async () => {
  main();
});
</script>

<style scoped>
.home {
  .header {
    min-height: 80px;
    margin: 0, 10px;
    display: flex; /* 新增，开启Flex布局 */
    align-items: center;
  }
  .content {
  }
}
</style>
