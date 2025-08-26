<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div>signer.provider⇒ null | Provider</div>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="signerMethods" style="width: 100%">
    <el-table-column prop="name" label="名称" width="200" />
    <el-table-column prop="params" label="params" />
    <el-table-column prop="returnType" label="returnType" />
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="result" label="结果" />
    <el-table-column label="操作" width="80">
      <template #default="{row}">
        <el-button type="primary" size="small" @click="methodHelpeFun(row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  import { processAuthResult } from '@/utils/commonTools';
  const Store = useStore();

  const signerMethods = [
    {
      name: "authorize",
      params: "authorization: AuthorizationRequest",
      returnType: "Promise<Authorization>",
      desc: "签署 EIP-7702 交易授权"
    },
    {
      name: "call",
      params: "tx: TransactionRequest",
      returnType: "Promise<string>",
      desc: "模拟交易执行（不改变链状态）"
    },
    {
      name: "connect",
      params: "provider: null | Provider",
      returnType: "Signer",
      desc: "连接或断开提供者"
    },
    {
      name: "estimateGas",
      params: "tx: TransactionRequest",
      returnType: "Promise<bigint>",
      desc: "估算交易所需 gas 量"
    },
    {
      name: "getAddress",
      returnType: "Promise<string>",
      desc: "获取签名者地址"
    },
    {
      name: "getNonce",
      params: "blockTag?: BlockTag",
      returnType: "Promise<number>",
      desc: "获取下一个交易 nonce"
    },
    {
      name: "populateAuthorization",
      params: "auth: AuthorizationRequest",
      returnType: "Promise<AuthorizationRequest>",
      desc: "填充授权请求缺失属性"
    },
    {
      name: "populateCall",
      params: "tx: TransactionRequest",
      returnType: "Promise<TransactionLike<string>>",
      desc: "准备调用交易请求"
    },
    {
      name: "populateTransaction",
      params: "tx: TransactionRequest",
      returnType: "Promise<TransactionLike<string>>",
      desc: "准备发送网络交易"
    },
    {
      name: "resolveName",
      params: "name: string",
      returnType: "Promise<null | string>",
      desc: "解析 ENS 名称到地址"
    },
    {
      name: "sendTransaction",
      params: "tx: TransactionRequest",
      returnType: "Promise<TransactionResponse>",
      desc: "发送交易到网络"
    },
    {
      name: "signMessage",
      params: "message: string | Uint8Array",
      returnType: "Promise<string>",
      desc: "签署 EIP-191 前缀消息"
    },
    {
      name: "signTransaction",
      params: "tx: TransactionRequest",
      returnType: "Promise<string>",
      desc: "签署交易"
    },
    {
      name: "signTypedData",
      params: "domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, any>",
      returnType: "Promise<string>",
      desc: "签署 EIP-712 类型数据"
    }
  ];

  const methodHelpeFun = async (row) => {
    try {
      // 只获取一次区块数据，避免重复调用
      // const block = await Store.provider.getBlock("latest");

      switch (row.name) {
        case "authorize":
          try {
            // 检查是否有连接的钱包
            if (!Store.signer || !Store.currentAccount) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 获取当前网络信息
            const network = await Store.provider.getNetwork();
            const nonce = await Store.provider.getTransactionCount(Store.currentAccount);

            // 创建授权请求对象
            const authorizationRequest = {
              address: Store.currentAccount,
              chainId: network.chainId,
              nonce: nonce,
              scope: ["read", "write"], // 授权范围
              validUntilBlock: (await Store.provider.getBlockNumber()) + 1000, // 有效期到1000个区块后
              executor: Store.currentAccount // 执行者地址
            };

            console.log("授权请求:", authorizationRequest);

            // 调用 authorize 方法
            const authorization = await Store.signer.authorize(authorizationRequest);

            console.log("授权结果:", authorization);
            row.result = processAuthResult({
              success: true,
              authorization: authorization,
              request: authorizationRequest
            });

          } catch (error) {
            console.error("❌ authorize 失败:", error);
            row.result = `❌ 授权失败: ${error.message}`;
          }
          break;

        case "call":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 模拟调用交易
            const callTx = {
              to: Store.currentAccount,
              data: "0x",
              value: 0n
            };

            const result = await Store.signer.call(callTx);
            row.result = `✅ 调用成功: ${result}`;
          } catch (error) {
            row.result = `❌ 调用失败: ${error.message}`;
          }
          break;

        case "connect":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 连接或断开提供者
            const connectedSigner = Store.signer.connect(Store.provider);
            row.result = `✅ 连接成功: ${connectedSigner.address}`;
          } catch (error) {
            row.result = `❌ 连接失败: ${error.message}`;
          }
          break;

        case "estimateGas":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 估算 gas
            const estimateTx = {
              to: Store.currentAccount,
              value: 0n
            };

            const gasEstimate = await Store.signer.estimateGas(estimateTx);
            row.result = `✅ Gas 估算: ${gasEstimate.toString()}`;
          } catch (error) {
            row.result = `❌ Gas 估算失败: ${error.message}`;
          }
          break;

        case "getAddress":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const address = await Store.signer.getAddress();
            row.result = `✅ 地址: ${address}`;
          } catch (error) {
            row.result = `❌ 获取地址失败: ${error.message}`;
          }
          break;

        case "getNonce":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const nonce = await Store.signer.getNonce();
            row.result = `✅ Nonce: ${nonce}`;
          } catch (error) {
            row.result = `❌ 获取 Nonce 失败: ${error.message}`;
          }
          break;

        case "populateAuthorization":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const network = await Store.provider.getNetwork();
            const nonce = await Store.provider.getTransactionCount(Store.currentAccount);

            const authRequest = {
              address: Store.currentAccount,
              chainId: network.chainId,
              nonce: nonce
            };

            const populatedAuth = await Store.signer.populateAuthorization(authRequest);
            row.result = processAuthResult(populatedAuth);
          } catch (error) {
            row.result = `❌ 填充授权失败: ${error.message}`;
          }
          break;

        case "populateCall":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const callTx = {
              to: Store.currentAccount,
              data: "0x"
            };

            const populatedCall = await Store.signer.populateCall(callTx);
            row.result = processAuthResult(populatedCall);
          } catch (error) {
            row.result = `❌ 填充调用失败: ${error.message}`;
          }
          break;

        case "populateTransaction":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const tx = {
              to: Store.currentAccount,
              value: ethers.parseEther("0.001")
            };

            const populatedTx = await Store.signer.populateTransaction(tx);
            row.result = processAuthResult(populatedTx);
          } catch (error) {
            row.result = `❌ 填充交易失败: ${error.message}`;
          }
          break;

        case "resolveName":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 尝试解析 ENS 名称
            const ensName = "vitalik.eth";
            const resolvedAddress = await Store.signer.resolveName(ensName);
            row.result = resolvedAddress ? `✅ ${ensName} -> ${resolvedAddress}` : `❌ 无法解析 ${ensName}`;
          } catch (error) {
            row.result = `❌ 解析名称失败: ${error.message}`;
          }
          break;

        case "sendTransaction":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            // 发送小额测试交易
            const tx = {
              to: Store.currentAccount,
              value: ethers.parseEther("0.001"),
              gasLimit: 21000
            };

            const txResponse = await Store.signer.sendTransaction(tx);
            row.result = `✅ 交易已发送: ${txResponse.hash}`;
          } catch (error) {
            row.result = `❌ 发送交易失败: ${error.message}`;
          }
          break;

        case "signMessage":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const message = "Hello World!";
            const signature = await Store.signer.signMessage(message);
            row.result = `✅ 消息签名: ${signature}`;
          } catch (error) {
            row.result = `❌ 签名失败: ${error.message}`;
          }
          break;

        case "signTransaction":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const tx = {
              to: Store.currentAccount,
              value: ethers.parseEther("0.001"),
              gasLimit: 21000,
              nonce: await Store.signer.getNonce()
            };

            const signedTx = await Store.signer.signTransaction(tx);
            row.result = `✅ 交易已签名: ${signedTx.slice(0, 66)}...`;
          } catch (error) {
            row.result = `❌ 交易签名失败: ${error.message}`;
          }
          break;

        case "signTypedData":
          try {
            if (!Store.signer) {
              row.result = "❌ 请先连接钱包";
              return;
            }

            const domain = {
              name: 'Test App',
              version: '1',
              chainId: await Store.provider.getNetwork().then(n => n.chainId)
            };

            const types = {
              Person: [
                { name: 'name', type: 'string' },
                { name: 'age', type: 'uint256' }
              ]
            };

            const value = {
              name: 'Alice',
              age: 25
            };

            const signature = await Store.signer.signTypedData(domain, types, value);
            row.result = `✅ 类型数据签名: ${signature}`;
          } catch (error) {
            row.result = `❌ 类型数据签名失败: ${error.message}`;
          }
          break;

      }


    } catch (error) {
      console.error(`❌ 获取 ${row.name} 时出错:`, error);
      row.result = "错误: " + error.message;
    }
  }

</script>

<style scoped></style>