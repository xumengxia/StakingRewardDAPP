<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="120" />
    <el-table-column prop="typeGuard" label="类型守卫" width="200" />
    <el-table-column prop="info" label="作用" />
    <el-table-column prop="example" label="示例输出" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();

  const tableData = [
    {
      name: "clone",
      typeGuard: "",
      info: "创建完全独立的交易副本",
      example: "const clonedTx = originalTx.clone();"
    },
    {
      name: "inferType",
      typeGuard: "",
      info: "推断最高兼容的交易类型",
      example: "legacyTx.inferType() // 返回 0"
    },
    {
      name: "inferTypes",
      typeGuard: "",
      info: "返回所有兼容交易类型的数组",
      example: "eip1559Tx.inferTypes() // 返回 [1, 2]"
    },
    {
      name: "isBerlin",
      typeGuard: "accessList",
      info: "检测柏林硬分叉类型(type=1)",
      example: "txWithAccessList.isBerlin() // 返回 true"
    },
    {
      name: "isCancun",
      typeGuard: "blobVersionedHashes",
      info: "检测EIP-4844 BLOB交易",
      example: "blobTx.isCancun() // 返回 true"
    },
    {
      name: "isLegacy",
      typeGuard: "gasPrice",
      info: "检测传统交易类型(type=0)",
      example: "txWithGasPrice.isLegacy() // 返回 true"
    },
    {
      name: "isLondon",
      typeGuard: "maxFeePerGas",
      info: "检测伦敦硬分叉类型(type=2)",
      example: "eip1559Tx.isLondon() // 返回 true"
    },
    {
      name: "isSigned",
      typeGuard: "signature",
      info: "检测交易是否已签名",
      example: "signedTx.isSigned() // 返回 true"
    },
    {
      name: "toJSON",
      typeGuard: "",
      info: "转换为JSON可序列化对象",
      example: "tx.toJSON() // 返回 {type:2, chainId:1,...}"
    }
  ];

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "clone":
        const originalTx = await ethers.Transaction.from({
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: 100,
          gasLimit: 21000,  // 必须字段
          chainId: 1        // 必须字段
        });
        row.result = JSON.stringify(originalTx.clone());
        break;
      case "inferType":
        const tx1 = await ethers.Transaction.from({
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: 100,
          gasLimit: 21000,  // 必须字段
          chainId: 1        // 必须字段
        });
        row.result = tx1.inferType() == 2 ? tx1.inferType() + ' EIP-1559' : tx1.inferType();
        break;
      case "inferTypes":

        break;
      case "isBerlin":

        break;
      case "isCancun":

        break;
      case "isLegacy":
        const legacyTx = new ethers.Transaction({
          from: "0x...",
          to: "0x...",
          value: ethers.parseEther("1.0"),
          gasPrice: ethers.parseUnits("30", "gwei"), // 固定 gas 价格（Legacy 交易特征）
          gasLimit: 21000
        });
        console.log();

        row.result = legacyTx.isLegacy(); // 返回false,理想返回true
        break;
      case "isLondon":

        break;
      case "isSigned":

        break;
      case "toJSON":
        const tx = await Store.signer.sendTransaction({
          to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          value: ethers.parseEther("1.0")
        });
        row.result = JSON.stringify(tx.toJSON());
        console.log(tx.toJSON());


    }
  };
</script>

<style scoped></style>