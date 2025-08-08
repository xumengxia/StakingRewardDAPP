// 从 ethers 的类型模块导入
import { ExternalProvider } from "ethers/types";

declare global {
  interface Window {
    ethereum?: ExternalProvider; // 正确声明 MetaMask 类型
  }
}
