<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div>provider.provider⇒ this</div>
  <el-divider />

  <h4>METHODS:</h4>
  <el-table :data="providerMethods" style="width: 100%">
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

  const providerMethods = [
    {
      name: "broadcastTransaction",
      params: ["signedTx: string"],
      returnType: "Promise<TransactionResponse>",
      description: "Broadcasts the signedTx to the network, adding it to the memory pool of any node for which the transaction meets the rebroadcast requirements."
    },
    {
      name: "call",
      params: ["tx: TransactionRequest"],
      returnType: "Promise<string>",
      description: "Simulate the execution of tx. If the call reverts, it will throw a CallExceptionError which includes the revert data."
    },
    {
      name: "destroy",
      params: [],
      returnType: "void",
      description: "Shutdown any resources this provider is using. No additional calls should be made to this provider after calling this."
    },
    {
      name: "estimateGas",
      params: ["tx: TransactionRequest"],
      returnType: "Promise<bigint>",
      description: "Estimates the amount of gas required to execute tx."
    },
    {
      name: "getBalance",
      params: ["address: AddressLike", "blockTag?: BlockTag"],
      returnType: "Promise<bigint>",
      description: "Get the account balance (in wei) of address. If blockTag is specified and the node supports archive access for that blockTag, the balance is as of that BlockTag."
    },
    {
      name: "getBlock",
      params: ["blockHashOrBlockTag: BlockTag | string", "prefetchTxs?: boolean"],
      returnType: "Promise<null | Block>",
      description: "Resolves to the block for blockHashOrBlockTag. If prefetchTxs, and the backend supports including transactions with block requests, all transactions will be included and the Block object will not need to make remote calls for getting transactions."
    },
    {
      name: "getBlockNumber",
      params: [],
      returnType: "Promise<number>",
      description: "Get the current block number."
    },
    {
      name: "getCode",
      params: ["address: AddressLike", "blockTag?: BlockTag"],
      returnType: "Promise<string>",
      description: "Get the bytecode for address."
    },
    {
      name: "getFeeData",
      params: [],
      returnType: "Promise<FeeData>",
      description: "Get the best guess at the recommended FeeData."
    },
    {
      name: "getLogs",
      params: ["filter: Filter | FilterByBlockHash"],
      returnType: "Promise<Array<Log>>",
      description: "Resolves to the list of Logs that match filter"
    },
    {
      name: "getNetwork",
      params: [],
      returnType: "Promise<Network>",
      description: "Get the connected Network."
    },
    {
      name: "getStorage",
      params: ["address: AddressLike", "position: BigNumberish", "blockTag?: BlockTag"],
      returnType: "Promise<string>",
      description: "Get the storage slot value for address at slot position."
    },
    {
      name: "getTransaction",
      params: ["hash: string"],
      returnType: "Promise<null | TransactionResponse>",
      description: "Resolves to the transaction for hash. If the transaction is unknown or on pruning nodes which discard old transactions this resolves to null."
    },
    {
      name: "getTransactionCount",
      params: ["address: AddressLike", "blockTag?: BlockTag"],
      returnType: "Promise<number>",
      description: "Get the number of transactions ever sent for address, which is used as the nonce when sending a transaction. If blockTag is specified and the node supports archive access for that blockTag, the transaction count is as of that BlockTag."
    },
    {
      name: "getTransactionReceipt",
      params: ["hash: string"],
      returnType: "Promise<null | TransactionReceipt>",
      description: "Resolves to the transaction receipt for hash, if mined. If the transaction has not been mined, is unknown or on pruning nodes which discard old transactions this resolves to null."
    },
    {
      name: "getTransactionResult",
      params: ["hash: string"],
      returnType: "Promise<null | string>",
      description: "Resolves to the result returned by the executions of hash. This is only supported on nodes with archive access and with the necessary debug APIs enabled."
    },
    {
      name: "lookupAddress",
      params: ["address: string"],
      returnType: "Promise<null | string>",
      description: "Resolves to the ENS name associated for the address or null if the primary name is not configured. Users must perform additional steps to configure a primary name, which is not currently common."
    },
    {
      name: "resolveName",
      params: ["ensName: string"],
      returnType: "Promise<null | string>",
      description: "Resolves to the address configured for the ensName or null if unconfigured."
    },
    {
      name: "waitForBlock",
      params: ["blockTag?: BlockTag"],
      returnType: "Promise<Block>",
      description: "Resolves to the block at blockTag once it has been mined. This can be useful for waiting some number of blocks by using the currentBlockNumber + N."
    },
    {
      name: "waitForTransaction",
      params: ["hash: string", "confirms?: number", "timeout?: number"],
      returnType: "Promise<null | TransactionReceipt>",
      description: "Waits until the transaction hash is mined and has confirms confirmations."
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