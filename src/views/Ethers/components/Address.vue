<template>
  <div class="tab-container">
    <h3>1. getAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">转换为标准的校验和地址</h4>
      <h4 class=" mrg-bot">getAddress("{{ Store.currentAccount }}")</h4>
      <div>
        <el-button type="primary" @click="getAddressFun">getAddress</el-button>
      </div>
      <span v-if="result.getAddressVal" class="code-result">// {{ result.getAddressVal }}</span>
    </el-card>
    <el-divider />

    <h3>2. getCreate2Address()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">预计算地址 predictedAddress,需要‌地址预计算‌或‌高唯一性‌时使用
      </h4>
      <div class="code-pink">是以太坊计算确定性合约地址的工具，通过部署者地址、盐值(salt)和合约字节码哈希，预生成唯一的合约地址</div>
      <div class="code-comment">// 参数：部署者地址 | salt（16进制字符串） |
        合约字节码的keccak256哈希</div>
      <div class=" mrg-bot">getCreate2Address(from: string, salt: BytesLike, initCodeHash:
        BytesLike)</div>
      <el-button type="primary" @click="getCreate2AddressFun">getCreate2Address</el-button>
      <br />
      <span v-if="result.create2Address" class="mrg-top code-result">
        // {{ result.create2Address }}</span>
    </el-card>
    <el-divider />

    <h3>3. getCreateAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">预计算地址 predictedAddress,简单部署且不关心地址时使用</h4>
      <div class="code-comment">// 部署者地址（from）‌ 和 ‌交易计数器（nonce）</div>
      <div class=" mrg-bot">getCreateAddress(from: string , nonce: BigNumberish)</div>
      <el-button type="primary" @click="getCreateAddressFun">getCreateAddress</el-button>
      <br />
      <span v-if="result.createAddress" class="mrg-top code-result">
        // {{ result.createAddress }}</span>
    </el-card>
    <el-divider />

    <h3>4. getIcapAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">‌将普通以太坊地址（如 0x...）转换为符合IBAN规范的ICAP格式（如 XE...），包含校验位以提高安全性‌。</h4>
      <div class="code-comment">// 转换成ICAP格式（以太坊专用编码XE开头）</div>
      <div class=" mrg-bot">getIcapAddress(address: string) => address</div>
      <el-button type="primary" @click="getIcapAddressFun">getIcapAddress</el-button>
      <br />
      <span v-if="result.icapAddress" class="mrg-top code-result">
        // {{ result.icapAddress }}</span>
    </el-card>
    <el-divider />

    <h3>5. isAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">验证字符串是否为有效的以太坊地址格式‌（0x开头，40位十六进制字符，不校验校验和）</h4>
      <div class=" mrg-bot">isAddress(value: any)⇒ boolean</div>
      <el-button type="primary" @click="isAddressFun">isAddress</el-button>
      <br />
      <span v-if="result.isAddress" class="mrg-top code-result">
        // {{ result.isAddress }}</span>
    </el-card>
    <el-divider />

    <h3>6. isAddressable()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">检测一个值是否为有效的以太坊地址 或 合约实例</h4>
      <div class=" mrg-bot">isAddressable(value: any)⇒ boolean</div>
      <el-button type="primary" @click="isAddressableFun">isAddressable</el-button>
      <br />
      <span v-if="result.isAddressable" class="mrg-top code-result">
        // {{ result.isAddressable }}</span>
    </el-card>
    <el-divider />

    <h3>7. resolveAddress()</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">用于‌解析以太坊地址或名称（如 ENS 域名）为标准化地址字符串</h4>
      <div class=" mrg-bot">resolveAddress(target: AddressLike, resolver?: null | NameResolver)⇒ string | Promise
        < string >
      </div>
      <el-button type="primary" @click="resolveAddressFun(Store.currentAccount)">resolveAddress</el-button>
      <br />

      <span v-if="result.resolveAddress" class="mrg-top code-result">
        // Addresses are return synchronously : {{ result.resolveAddress }}</span>
      <br />
      <span v-if="result.resolveAddressPromise" class="mrg-top code-result">
        // Address promises are resolved asynchronously : {{ result.resolveAddressPromise }}</span>
      <br />
      <span class="mrg-top code-result">
        // ENS names are resolved asynchronously</span>
      <br />
      <span class="mrg-top code-result">
        // Addressable objects are resolved asynchronously : {{ result.resolveAddressObj }}</span>
      <br />

    </el-card>
    <el-divider />

    <h3>8. Addressable</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">异步获取以太坊地址的能力，使合约、钱包等对象可直接替代地址参与链上交互（如查询余额、发送交易）
      </h4>
      <div class=" mrg-bot">核心方法 ： getAddress()</div>
      <el-button type="primary" @click="aaddressableFun">getAddress</el-button>
      <br />
      <span v-if="result.address" class="mrg-top code-result">
        // {{ result.address }}</span>
    </el-card>
    <el-divider />

    <h3>8. NameResolver</h3>
    <el-card class="mrg-top">
      <h4 class="mrg-bot">解析 ENS（以太坊域名服务）名称的接口Resolve to the address for the ENS name
      </h4>
      <div class=" mrg-bot">核心方法 ： resolveName()</div>
      <el-button type="primary" @click="resolveName">resolveName</el-button>
      <br />
      <span v-if="result.address" class="mrg-top code-result">
        // {{ result.resolveName }}</span>

    </el-card>
    <el-divider />
  </div>
</template>

<script setup lang="ts">
  import { ethers } from "ethers";
  import { useStore } from "@/store/index";
  const Store = useStore();
  const result = ref({
    getAddressVal: null,
    create2Address: null,
    createAddress: null,
    icapAddress: null,
    isAddress: false, // 校验以太坊地址
    isAddressable: false, // 额外支持合约对象检测
    resolveAddress: null,
    resolveAddressPromise: null,
    resolveAddressObj: null, // 合约对象
    address: null,
    resolveName: null,

  });
  const getAddressFun = () => {
    const address = ethers.getAddress(Store.currentAccount);
    result.value.getAddressVal = address;
    console.log("address", address);
  };

  const getCreate2AddressFun = () => {
    // The address of the contract
    const from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

    // The salt
    const salt = ethers.id("HelloWorld");

    // The hash of the initCode
    const initCode = "0x6394198df16000526103ff60206004601c335afa6040516060f3";
    const initCodeHash = ethers.keccak256(initCode);
    const create2Address = ethers.getCreate2Address(from, salt, initCodeHash);
    result.value.create2Address = create2Address;
  };

  const getCreateAddressFun = () => {
    const from = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
    const nonce = 5;

    const createAddress = ethers.getCreateAddress({ from, nonce });
    result.value.createAddress = createAddress;
  }

  const getIcapAddressFun = () => {
    // 转换为ICAP格式（以太坊专用编码XE开头）
    const icapAddress = ethers.getIcapAddress(Store.currentAccount);
    result.value.icapAddress = icapAddress;
  }

  const isAddressFun = () => {
    const isAddress = ethers.isAddress(Store.currentAccount);
    result.value.isAddress = isAddress;
  }
  const token1Address = import.meta.env.VITE_TOKEN1_ADDRESS;
  const isAddressableFun = () => {
    const isAddressable = ethers.isAddressable(Store.contracts.staking);
    console.log('isAddressable', isAddressable);
    result.value.isAddressable = isAddressable;
  }
  const resolveAddressFun = async (addr) => {
    const resolveAddress = ethers.resolveAddress(addr);
    const resolveAddressPromise = await ethers.resolveAddress(Promise.resolve(addr));
    const resolveAddressObj = await ethers.resolveAddress(Store.contracts.staking, Store.provider);

    // console.log('resolveAddress', resolveAddress);
    result.value.resolveAddress = resolveAddress;
    result.value.resolveAddressPromise = resolveAddressPromise;
    result.value.resolveAddressObj = resolveAddressObj;

    //  await ethers.resolveAddress("nothing-here.ricmoo.eth", Store.provider);
    // await ethers.resolveAddress("nothing-here.ricmoo.eth");

  }
  const aaddressableFun = async () => {
    const address = await Store.contracts.staking.getAddress();
    result.value.address = address;

  }
  async function resolveName() {
    const resolveName = await Store.provider.resolveName();
    result.value.resolveName = resolveName;
  }



</script>

<style scoped>
  /* 页面样式 */
</style>