require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      port: 8546, // 使用不同的端口避免冲突
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8546", // 对应上面的端口
      chainId: 1337,
    },
  },
  paths: {
    sources: "./src/contract",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/contract/artifacts",
  },
};
