import { useStore } from "../store/index.js";

// 处理JSON.stringify()中的bigInt
export const processAuthResult = (result) => {
  return JSON.stringify(result, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
};

// 生成 授权
export const getAuthParams = async () => {
  const Store = useStore();
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const nonce = await Store.provider.getTransactionCount(Store.currentAccount);
  return { address: Store.currentAccount, chainId, nonce };
};
