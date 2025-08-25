<template>
  <el-table :data="blockProperties" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="dataHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-divider />
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new Block(block: BlockParams, provider: Provider)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newBlockFun">newBlock</el-button>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="methodTable" style="width: 100%">
    <el-table-column prop="name" label="名称" width="250" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="scope">
        <el-button type="primary" size="small" @click="methodHelpeFun(scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools.ts';
  const Store = useStore();

  const blockProperties = [
    { name: "baseFeePerGas", type: "null | bigint", desc: "基础Gas费用，动态调整" },
    { name: "blobGasUsed", type: "null | bigint", desc: "EIP-4844 blob gas总量" },
    { name: "date", type: "Date", desc: "区块纳入时间" },
    { name: "difficulty", type: "bigint", desc: "PoW目标或randao随机数" },
    { name: "excessBlobGas", type: "null | bigint", desc: "EIP-4844超额blob gas" },
    { name: "extraData", type: "string", desc: "验证者附加数据" },
    { name: "gasLimit", type: "bigint", desc: "区块Gas总限制" },
    { name: "gasUsed", type: "bigint", desc: "区块实际Gas用量" },
    { name: "hash", type: "null | string", desc: "唯一区块哈希" },
    { name: "length", type: "number", desc: "交易数量" },
    { name: "miner", type: "string", desc: "矿工奖励地址" },
    { name: "nonce", type: "string", desc: "PoW随机数" },
    { name: "number", type: "number", desc: "区块高度" },
    { name: "parentBeaconBlockRoot", type: "null | string", desc: "父信标区块根哈希" },
    { name: "parentHash", type: "string", desc: "父区块哈希" },
    { name: "prefetchedTransactions", type: "Array", desc: "完整交易列表（需预取）" },
    { name: "prevRandao", type: "null | string", desc: "前序RANDAO值" },
    { name: "provider", type: "Provider", desc: "区块数据提供者" },
    { name: "receiptsRoot", type: "null | string", desc: "交易收据树根哈希" },
    { name: "stateRoot", type: "null | string", desc: "全局状态根哈希" },
    { name: "timestamp", type: "number", desc: "区块时间戳（秒）" },
    { name: "transactions", type: "ReadonlyArray", desc: "交易哈希列表" }
  ];

  const dataHelpeFun = async (row) => {
    try {
      // 只获取一次区块数据，避免重复调用
      const block = await Store.provider.getBlock("latest");

      switch (row.name) {
        case "baseFeePerGas":
          row.result = block.baseFeePerGas ?
            ethers.formatUnits(block.baseFeePerGas, "gwei") + " Gwei" : "N/A";
          break;

        case "blobGasUsed":
          row.result = block.blobGasUsed ? block.blobGasUsed.toString() : "N/A";
          break;

        case "date":
          const blockDate = new Date(Number(block.timestamp) * 1000);
          row.result = blockDate.toLocaleString();
          break;

        case "difficulty":
          row.result = block.difficulty.toString();
          break;

        case "excessBlobGas":
          row.result = block.excessBlobGas ? block.excessBlobGas.toString() : "N/A";
          break;

        case "extraData":
          row.result = block.extraData || "0x";
          break;

        case "gasLimit":
          row.result = block.gasLimit.toString();
          break;

        case "gasUsed":
          row.result = block.gasUsed.toString();
          break;

        case "hash":
          row.result = block.hash || "N/A";
          break;

        case "length":
          row.result = block.length.toString();
          break;

        case "miner":
          row.result = block.miner;
          break;

        case "nonce":
          row.result = block.nonce;
          break;

        case "number":
          row.result = block.number.toString();
          break;

        case "parentBeaconBlockRoot":
          row.result = block.parentBeaconBlockRoot || "N/A";
          break;

        case "parentHash":
          row.result = block.parentHash;
          break;

        case "prefetchedTransactions":
          row.result = `Array(${block.prefetchedTransactions?.length || 0})`;
          break;

        case "prevRandao":
          row.result = block.prevRandao || "N/A";
          break;

        case "provider":
          row.result = "Provider 实例";
          break;

        case "receiptsRoot":
          row.result = block.receiptsRoot || "N/A";
          break;

        case "stateRoot":
          row.result = block.stateRoot || "N/A";
          break;

        case "timestamp":
          const timestamp = new Date(Number(block.timestamp) * 1000);
          row.result = timestamp.toLocaleString();
          break;

        case "transactions":
          row.result = `交易数量: ${block.transactions.length}`;
          break;

        default:
          row.result = "未实现";
      }

      // 添加调试信息
      console.log(`✅ 成功获取 ${row.name}:`, row.result);

    } catch (error) {
      console.error(`❌ 获取 ${row.name} 时出错:`, error);
      row.result = "错误: " + error.message;
    }
  }

  const newBlockFun = async () => {
    try {
      console.log("🚀 开始创建 Block 实例...");

      // 获取最新区块数据
      const blockData = await Store.provider.getBlock("latest", true);
      console.log("📦 原始区块数据:", blockData);

      // 创建 Block 实例
      const block = new ethers.Block(blockData, Store.provider);
      console.log("✅ Block 实例创建成功:", block);

      // 演示 Block 实例的方法
      console.log("🔍 区块信息:");
      console.log("- 区块高度:", block.number);
      console.log("- 区块哈希:", block.hash);
      console.log("- 时间戳:", new Date(Number(block.timestamp) * 1000).toLocaleString());
      console.log("- Gas 限制:", block.gasLimit.toString());
      console.log("- Gas 用量:", block.gasUsed.toString());
      console.log("- 交易数量:", block.transactions.length);

      // 检查区块类型
      console.log("📋 区块类型检查:");
      console.log("- 是否支持 EIP-2930:", block.isLondon());
      console.log("- 是否已挖出:", block.isMined());

      // 获取 JSON 格式
      const jsonData = block.toJSON();
      console.log("📄 JSON 格式数据:", jsonData);

      // 显示成功消息
      alert("Block 实例创建成功！请查看控制台了解详细信息。");

    } catch (error) {
      console.error("❌ 创建 Block 实例失败:", error);
      alert("创建 Block 实例失败: " + error.message);
    }
  }

  const methodTable = [
    {
      name: "getPrefetchedTransaction",
      type: "getPrefetchedTransaction(indexOrHash: number | string)⇒ TransactionResponse",
      desc: "同步获取预取交易，若未预取则抛出异常"
    },
    {
      name: "getTransaction",
      type: "getTransaction(indexOrHash: number | string)⇒ Promise< TransactionResponse ",
      desc: "获取此区块中的索引e处的交易。"
    },
    {
      name: "isLondon",
      type: "isLondon()⇒ boolean",
      desc: "如果这个区块是EIP-2930区块，则返回true。"
    },
    {
      name: "isMined",
      type: "isMined()⇒ boolean",
      desc: "如果这个区块已被挖掘，则返回true。这为MinedBlock上的所有属性提供了一个类型守卫。"
    },
    {
      name: "toJSON",
      type: "toJSON()⇒ any",
      desc: "返回一个JSON友好的值。"
    },
  ]
  const methodHelpeFun = async (row) => {
    try {
      switch (row.name) {
        case "getPrefetchedTransaction":
          try {
            // 方法 1：预取交易后同步获取
            console.log("🔍 使用 getPrefetchedTransaction (预取方式)...");
            const blockWithTx = await Store.provider.getBlock("latest", true); // 预取交易

            if (blockWithTx.transactions && blockWithTx.transactions.length > 0) {
              const tx = blockWithTx.getPrefetchedTransaction(0);
              row.result = `✅ 同步获取成功: ${tx.hash.slice(0, 10)}...`;
              console.log("预取交易详情:", tx);
            } else {
              row.result = "⚠️ 区块没有交易";
            }
          } catch (error) {
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "getTransaction":
          try {
            // 方法 2：异步获取交易
            console.log("🔍 使用 getTransaction (异步方式)...");
            const block = await Store.provider.getBlock("latest"); // 不预取交易

            if (block.transactions && block.transactions.length > 0) {
              const tx = await block.getTransaction(0);
              if (tx) {
                row.result = `✅ 异步获取成功: ${tx.hash.slice(0, 10)}...`;
                console.log("异步交易详情:", tx);
              } else {
                row.result = "⚠️ 交易不存在";
              }
            } else {
              row.result = "⚠️ 区块没有交易";
            }
          } catch (error) {
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "isLondon":
          const block1 = await Store.provider.getBlock("latest");
          const isLondon = block1.isLondon();
          row.result = isLondon ? "✅ 是 EIP-2930 区块" : "❌ 不是 EIP-2930 区块";
          break;

        case "isMined":
          const block2 = await Store.provider.getBlock("latest");
          const isMined = block2.isMined();
          row.result = isMined ? "✅ 区块已挖出" : "❌ 区块未挖出";
          break;

        case "toJSON":
          try {
            const block3 = await Store.provider.getBlock("latest");
            const jsonData = block3.toJSON();
            // 格式化 JSON 输出，只显示关键信息
            const formattedData = {
              number: jsonData.number,
              hash: jsonData.hash,
              timestamp: jsonData.timestamp,
              gasLimit: jsonData.gasLimit,
              gasUsed: jsonData.gasUsed,
              transactions: jsonData.transactions?.length || 0,
              miner: jsonData.miner
            };
            row.result = JSON.stringify(formattedData, null, 2);
          } catch (error) {
            row.result = "❌ 错误: " + error.message;
          }
          break;

        default:
          row.result = "未实现";
      }

      console.log(`✅ 成功执行 ${row.name}:`, row.result);

    } catch (error) {
      console.error(`❌ 执行 ${row.name} 时出错:`, error);
      row.result = "❌ 错误: " + error.message;
    }
  }
</script>

<style scoped></style>