<template>
  <h3 class="mrg-bot">1. TYPES</h3>
  <div class="code-comment mrg-bot">
    Networkish⇒ Network | number | bigint | string | { chainId?: number , ensAddress?: string , ensNetwork?: number ,
    name?: string }
  </div>
  <el-button class="mrg-bot" type="primary" @click="demonstrateNetworkish">演示 Networkish 类型</el-button>
  <el-divider />
  <h4 class="mrg-bot">Class Network:</h4>
  <h4 class="mrg-top mrg-bot">PROPERTIES:</h4>

  <div class="code-comment mrg-bot">
    chainId⇒ bigint | name⇒ string |plugins=>Array< NetworkPlugin >
  </div>
  <el-button class="mrg-bot" type="primary" @click="showProperties">show properties</el-button>

  <el-divider />

  <h4 class="mrg-bot">CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot">
    new Network(name: string, chainId: BigNumberish)
  </div>
  <el-button class="mrg-bot" type="primary" @click="newNetworkFun">new Network</el-button>
  <div class="code-comment mrg-bot">
    Network.from(network?: Networkish)⇒ Network
  </div>
  <el-button class="mrg-bot" type="primary" @click="newNetworkFromFun">Network.from</el-button>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="networkMethods" style="width: 100%">
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
  import { processAuthResult } from '@/utils/commonTools';
  import { Network, NetworkPlugin } from 'ethers';

  const Store = useStore();
  const showProperties = async () => {
    try {
      const network = await Store.provider.getNetwork();
      const { chainId, name, plugins } = network;
      console.log("chainId:", chainId);
      console.log("name:", name);
      console.log("plugins:", plugins);

    } catch (error) {
      console.error("❌ 演示 Network 属性失败:", error);
      alert("❌ 演示 Network 属性失败: " + error.message);
    }
  }
  const newNetworkFun = async () => {
    try {
      console.log("🚀 开始创建 Network 实例...");

      // 方法 1：使用构造函数 new Network(name, chainId)
      const ethereumMainnet = new ethers.Network("Ethereum Mainnet", 1);
      console.log("✅ 以太坊主网:", ethereumMainnet);
      console.log("- 名称:", ethereumMainnet.name);
      console.log("- 链 ID:", ethereumMainnet.chainId.toString());

      // 创建本地测试网
      const localNetwork = new ethers.Network("Local Hardhat", 31337);
      console.log("✅ 本地测试网:", localNetwork);
      console.log("- 名称:", localNetwork.name);
      console.log("- 链 ID:", localNetwork.chainId.toString());

    } catch (error) {
      console.error("❌ 创建 Network 实例失败:", error);
      alert("❌ 创建 Network 实例失败: " + error.message);
    }
  };

  // 使用 Network.from 静态方法创建实例
  const newNetworkFromFun = async () => {
    try {
      console.log("🚀 开始使用 Network.from 创建实例...");

      // 方法 2：使用 Network.from() 静态方法

      // 通过名称创建
      const mainnetByName = ethers.Network.from("mainnet");
      console.log("✅ 通过名称创建主网:", mainnetByName);
      console.log("- 名称:", mainnetByName.name);
      console.log("- 链 ID:", mainnetByName.chainId.toString());

      // 通过链 ID 创建
      const mainnetById = ethers.Network.from(1);
      console.log("✅ 通过链 ID 创建主网:", mainnetById);
      console.log("- 名称:", mainnetById.name);
      console.log("- 链 ID:", mainnetById.chainId.toString());

      // 创建测试网
      const sepolia = ethers.Network.from("sepolia");
      console.log("✅ Sepolia 测试网:", sepolia);
      console.log("- 名称:", sepolia.name);
      console.log("- 链 ID:", sepolia.chainId.toString());

      // 创建 Goerli 测试网
      const goerli = ethers.Network.from("goerli");
      console.log("✅ Goerli 测试网:", goerli);
      console.log("- 名称:", goerli.name);
      console.log("- 链 ID:", goerli.chainId.toString());

      // 创建 Polygon 网络
      const polygon = ethers.Network.from("matic");
      console.log("✅ Polygon 网络:", polygon);
      console.log("- 名称:", polygon.name);
      console.log("- 链 ID:", polygon.chainId.toString());

      // 显示成功消息
      alert("Network.from 实例创建成功！\n" +
        "主网 (名称): " + mainnetByName.name + " (ID: " + mainnetByName.chainId.toString() + ")\n" +
        "主网 (ID): " + mainnetById.name + " (ID: " + mainnetById.chainId.toString() + ")\n" +
        "Sepolia: " + sepolia.name + " (ID: " + sepolia.chainId.toString() + ")\n" +
        "Goerli: " + goerli.name + " (ID: " + goerli.chainId.toString() + ")\n" +
        "Polygon: " + polygon.name + " (ID: " + polygon.chainId.toString() + ")");

    } catch (error) {
      console.error("❌ 使用 Network.from 创建实例失败:", error);
      alert("❌ 使用 Network.from 创建实例失败: " + error.message);
    }
  };
  const networkMethods = [
    {
      name: "attachPlugin",
      type: "attachPlugin(plugin: NetworkPlugin) ⇒ this",
      desc: "向Network附加新插件，网络名称必须唯一（不包括任何片段）"
    },
    {
      name: "clone",
      type: "clone() ⇒ Network",
      desc: "创建Network的副本"
    },
    {
      name: "computeIntrinsicGas",
      type: "computeIntrinsicGas(tx: TransactionLike) ⇒ number",
      desc: "计算交易所需固有gas，可通过附加GasCostPlugin覆盖默认值"
    },
    {
      name: "getPlugin",
      type: "getPlugin(name: string) ⇒ null | T",
      desc: "返回精确匹配的插件（除非名称包含片段，否则不会返回带片段的插件）"
    },
    {
      name: "getPlugins",
      type: "getPlugins(basename: string) ⇒ Array< T >",
      desc: "获取所有匹配名称的插件列表（无论是否包含片段）"
    },
    {
      name: "matches",
      type: "matches(other: Networkish) ⇒ boolean",
      desc: "检查other是否匹配当前网络（链ID必须匹配，无链ID时名称必须匹配）"
    },
    {
      name: "toJSON",
      type: "toJSON() ⇒ any",
      desc: "返回JSON兼容的Network表示形式"
    },
    {
      name: "register",
      type: "register(nameOrChainId: string | number | bigint, networkFunc: () => Network) ⇒ void",
      desc: "静态方法：注册名称或链ID及其对应的Network构造函数"
    }
  ];


  const methodHelpeFun = async (row) => {
    try {
      const network1 = await Store.provider.getNetwork();
      const sepolia = ethers.Network.from("sepolia");

      switch (row.name) {
        case "attachPlugin":
          try {
            console.log("🚀 开始演示 attachPlugin...");

            // 创建自定义 NetworkPlugin
            const customPlugin = {
              name: "customNetworkPlugin",
              connect: (provider) => {
                console.log("🔌 插件连接方法被调用，provider:", provider);
                return provider;
              },
              getName: () => "customNetworkPlugin"
            };

            console.log("📦 自定义插件:", customPlugin);

            // 附加插件到网络
            const networkWithPlugin = await network1.attachPlugin(customPlugin);
            console.log("✅ 插件附加成功，网络:", networkWithPlugin);

            row.result = "✅ 插件附加成功";

          } catch (error) {
            console.error("❌ attachPlugin 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "clone":
          try {
            console.log("🚀 开始演示 clone...");
            const copy = sepolia.clone();
            console.log("✅ 网络克隆成功:", copy);
            console.log("📝 克隆网络名称:", copy.name);
            row.result = `✅ 克隆成功: ${copy.name}`;
          } catch (error) {
            console.error("❌ clone 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "computeIntrinsicGas":
          try {
            console.log("🚀 开始演示 computeIntrinsicGas...");
            const tx = {
              to: "0x0000000000000000000000000000000000000000",
              value: ethers.parseEther("0.001"),
              gasLimit: 21000,
              gasPrice: ethers.parseUnits("10", "gwei")
            };

            const gas = await network1.computeIntrinsicGas(tx);
            console.log("⛽ 计算的内在 Gas:", gas.toString());
            row.result = `✅ 内在 Gas: ${gas.toString()}`;
          } catch (error) {
            console.error("❌ computeIntrinsicGas 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "getPlugin":
          try {
            console.log("🚀 开始演示 getPlugin...");
            const plugin2 = await network1.getPlugin("gasCost");
            console.log("🔌 获取的插件:", plugin2);
            row.result = plugin2 ? "✅ 插件获取成功" : "⚠️ 插件不存在";
          } catch (error) {
            console.error("❌ getPlugin 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "getPlugins":
          try {
            console.log("🚀 开始演示 getPlugins...");
            const plugins = await network1.getPlugins("gasCost");
            console.log("🔌 所有插件:", plugins);
            row.result = `✅ 插件数量: ${plugins.length}`;
          } catch (error) {
            console.error("❌ getPlugins 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "matches":
          try {
            console.log("🚀 开始演示 matches...");
            const matches = await network1.matches(sepolia);
            console.log("🔍 网络匹配结果:", matches);
            row.result = matches ? "✅ 网络匹配" : "❌ 网络不匹配";
          } catch (error) {
            console.error("❌ matches 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "toJSON":
          try {
            console.log("🚀 开始演示 toJSON...");
            const json = await network1.toJSON();
            console.log("📄 JSON 格式:", json);
            row.result = "✅ JSON 转换成功";
          } catch (error) {
            console.error("❌ toJSON 失败:", error);
            row.result = "❌ 错误: " + error.message;
          }
          break;

        case "register":
          try {
            console.log("🚀 开始演示 register...");
            // 使用 ethers.Network.register 静态方法
            const register = await ethers.Network.register('12345', () => {
              return new ethers.Network('mychain', 12345);
            });
            console.log("✅ 网络注册成功:", register);
            row.result = "✅ 网络注册成功";
          } catch (error) {
            console.error("❌ register 失败:", error);
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

  // 演示 Networkish 类型的各种形式
  const demonstrateNetworkish = async () => {
    try {
      console.log("🚀 开始演示 Networkish 类型...");

      // 1. Network 对象
      const networkObj = new ethers.Network("Ethereum Mainnet", 1);
      console.log("📦 Network 对象:", networkObj);

      // 2. number 类型
      const chainIdNumber = 1;
      console.log("🔢 数字类型 (chainId):", chainIdNumber);

      // 3. bigint 类型
      const chainIdBigint = BigInt(1);
      console.log("🔢 BigInt 类型 (chainId):", chainIdBigint);

      // 4. string 类型
      const networkName = "mainnet";
      console.log("📝 字符串类型 (网络名称):", networkName);

      // 5. 对象类型
      const networkObject = {
        chainId: 1,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        ensNetwork: 1,
        name: "Ethereum Mainnet"
      };
      console.log("🏗️ 对象类型:", networkObject);

      // 6. 使用 Network.from() 处理各种 Networkish 类型
      console.log("🔄 使用 Network.from() 处理各种类型:");

      const fromNetworkObj = ethers.Network.from(networkObj);
      console.log("- 从 Network 对象:", fromNetworkObj.name, "(ID:", fromNetworkObj.chainId.toString() + ")");

      const fromNumber = ethers.Network.from(chainIdNumber);
      console.log("- 从数字:", fromNumber.name, "(ID:", fromNumber.chainId.toString() + ")");

      const fromBigint = ethers.Network.from(chainIdBigint);
      console.log("- 从 BigInt:", fromBigint.name, "(ID:", fromBigint.chainId.toString() + ")");

      const fromString = ethers.Network.from(networkName);
      console.log("- 从字符串:", fromString.name, "(ID:", fromString.chainId.toString() + ")");

      const fromObject = ethers.Network.from(networkObject);
      console.log("- 从对象:", fromObject.name, "(ID:", fromObject.chainId.toString() + ")");

      // 7. 验证类型转换的一致性
      console.log("🔍 验证类型转换一致性:");
      console.log("- 所有转换后的网络名称是否相同:",
        fromNetworkObj.name === fromNumber.name &&
        fromNumber.name === fromBigint.name &&
        fromBigint.name === fromString.name &&
        fromString.name === fromObject.name
      );

      console.log("- 所有转换后的链 ID 是否相同:",
        fromNetworkObj.chainId === fromNumber.chainId &&
        fromNumber.chainId === fromBigint.chainId &&
        fromBigint.chainId === fromString.chainId &&
        fromString.chainId === fromObject.chainId
      );

      // 显示成功消息
      alert("Networkish 类型演示完成！\n\n" +
        "✅ Network 对象\n" +
        "✅ 数字类型 (chainId)\n" +
        "✅ BigInt 类型 (chainId)\n" +
        "✅ 字符串类型 (网络名称)\n" +
        "✅ 对象类型 (包含 chainId, ensAddress, ensNetwork, name)\n\n" +
        "所有类型都可以通过 Network.from() 转换为 Network 对象。\n" +
        "请查看控制台了解详细信息。");

    } catch (error) {
      console.error("❌ Networkish 类型演示失败:", error);
      alert("❌ Networkish 类型演示失败: " + error.message);
    }
  };

</script>

<style scoped></style>