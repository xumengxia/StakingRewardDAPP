<template>
  <h3 class="mrg-bot">23. interface WebSocketLike</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <el-table :data="WebSocketProperties" style="width: 100%">
      <el-table-column prop="name" label="名称" width="250" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="example" label="示例" />
    </el-table>
    <el-divider />

    <h4 class="mrg-bot">METHODS:</h4>
    <el-table :data="WebSocketMethods" style="width: 100%">
      <el-table-column prop="name" label="名称" width="250" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="result" label="结果" />
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="dataHelpeFun(row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-divider />
  <h3 class="mrg-bot">24. class WebSocketProvider</h3>
  <el-card class="mrg-top">
    <h4 class="mrg-bot">PROPERTIES:</h4>
    <div class="code-comment mrg-bot">websocket⇒ WebSocketLike</div>
    <el-divider />

    <h4 class="mrg-bot">CREATING INSTANCES:</h4>
    <div class="code-comment mrg-bot">
      new WebSocketProvider(url: string | WebSocketLike | WebSocketCreator,
      network?: Networkish, options?: JsonRpcApiProviderOptions)
    </div>
    <el-button class="mrg-bot" type="primary" @click="newWebSocketProviderFun"
      >new WebSocketProvider</el-button
    >

    <el-divider />
  </el-card>
  <el-divider />
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useStore } from "@/store/index";
import { processAuthResult } from "@/utils/commonTools";
import { ref } from "vue";

const Store = useStore();

// 连接状态
const connectionStatus = ref(null);

// 表格数据
const WebSocketProperties = [
  {
    name: "onerror",
    type: "null | ((args: Array<any>) => any)",
    desc: "WebSocket错误事件回调",
    example: `ws.onerror = (err) => console.error("连接错误:", err)`,
  },
  {
    name: "onmessage",
    type: "null | ((args: Array<any>) => any)",
    desc: "WebSocket消息接收回调",
    example: `ws.onmessage = (msg) => console.log("收到消息:", msg.data)`,
  },
  {
    name: "onopen",
    type: "null | ((args: Array<any>) => any)",
    desc: "WebSocket连接建立回调",
    example: `ws.onopen = () => console.log("连接已建立")`,
  },
  {
    name: "readyState",
    type: "number",
    desc: "返回当前连接状态（0-3对应CONNECTING/OPEN/CLOSING/CLOSED）",
    example: `if(ws.readyState === WebSocket.OPEN) { /* 发送消息 */ }`,
  },
];

const WebSocketMethods = [
  {
    name: "close",
    type: "close(code?: number, reason?: string)⇒ void",
    desc: "关闭WebSocket连接",
    result: "",
  },
  {
    name: "send",
    type: ".send(payload: any)⇒ void",
    desc: "通过WebSocket发送数据",
    result: "",
  },
];

// 表格方法处理函数
const dataHelpeFun = async (row) => {
  try {
    console.log(`🚀 开始执行 ${row.name} 方法...`);

    switch (row.name) {
      case "close":
        try {
          // 创建一个测试 WebSocket 连接来演示 close 方法
          const testWs = new WebSocket("wss://echo.websocket.org");

          // 设置事件监听器
          testWs.onerror = (event) => {
            console.log("❌ WebSocket 错误:", event);
          };

          testWs.onmessage = (event) => {
            console.log("📨 收到消息:", event.data);
          };

          testWs.onopen = (event) => {
            console.log("🔗 WebSocket 连接已建立");
          };

          testWs.onclose = (event) => {
            console.log("🔒 WebSocket 连接已关闭:", event.code, event.reason);
          };

          // 等待连接建立
          await new Promise((resolve, reject) => {
            testWs.onopen = () => {
              console.log("🔗 连接已建立，准备关闭...");
              resolve();
            };
            testWs.onerror = (error) => {
              console.error("❌ 连接失败:", error);
              reject(error);
            };
            setTimeout(() => reject(new Error("连接超时")), 5000);
          });

          // 关闭连接
          testWs.close(1000, "测试关闭");
          row.result = "✅ 连接已关闭";

          console.log("🔒 WebSocket 连接已关闭");
        } catch (error) {
          console.error("❌ close 方法执行失败:", error);
          row.result = "❌ 执行失败: " + error.message;
        }
        break;

      case "send":
        try {
          // 创建一个测试 WebSocket 连接来演示 send 方法
          const testWs = new WebSocket("wss://echo.websocket.org");

          // 设置事件监听器
          testWs.onerror = (event) => {
            console.log("❌ WebSocket 错误:", event);
          };

          testWs.onmessage = (event) => {
            console.log("📨 收到回显消息:", event.data);
          };

          testWs.onopen = (event) => {
            console.log("🔗 WebSocket 连接已建立");
          };

          testWs.onclose = (event) => {
            console.log("🔒 WebSocket 连接已关闭:", event.code, event.reason);
          };

          // 等待连接建立
          await new Promise((resolve, reject) => {
            testWs.onopen = () => {
              console.log("🔗 连接已建立，准备发送消息...");
              resolve();
            };
            testWs.onerror = (error) => {
              console.error("❌ 连接失败:", error);
              reject(error);
            };
            setTimeout(() => reject(new Error("连接超时")), 5000);
          });

          // 发送测试消息
          const testMessage = `测试消息 ${Date.now()}`;
          testWs.send(testMessage);
          row.result = `✅ 消息已发送: ${testMessage}`;

          console.log("📤 消息已发送:", testMessage);

          // 等待回显消息
          await new Promise((resolve) => {
            testWs.onmessage = (event) => {
              console.log("📨 收到回显:", event.data);
              resolve();
            };
            setTimeout(resolve, 2000); // 最多等待2秒
          });

          // 关闭连接
          testWs.close(1000, "测试完成");
        } catch (error) {
          console.error("❌ send 方法执行失败:", error);
          row.result = "❌ 执行失败: " + error.message;
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
};

// 创建 WebSocketProvider 实例
const newWebSocketProviderFun = async () => {
  try {
    console.log("🚀 开始创建 WebSocketProvider 实例...");

    // 方法 1：使用本地 Hardhat 网络
    console.log("📝 方法 1: 使用本地 Hardhat 网络");
    const localProvider = new ethers.WebSocketProvider("ws://127.0.0.1:8545");
    console.log("✅ 本地 WebSocketProvider 创建成功:", localProvider);

    // 测试本地连接
    try {
      const blockNumber = await localProvider.getBlockNumber();
      console.log("📦 本地网络最新区块:", blockNumber.toString());
      console.log("🌐 本地网络连接成功");
    } catch (error) {
      console.log("⚠️ 本地网络连接失败，请确保 Hardhat 节点正在运行");
    }
  } catch (error) {
    console.error("❌ 创建 WebSocketProvider 失败:", error);
    alert("❌ 创建 WebSocketProvider 失败: " + error.message);
  }
};
</script>

<style scoped></style>
