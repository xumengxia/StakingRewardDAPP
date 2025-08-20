<template>
  <h4 class="mrg-bot">PROPERTIES:</h4>
  <div class="code-comment mrg-bot">
    entropy=>string | password=>string | phrase=>string | wordlist=>Wordlist
  </div>
  <el-divider />
  <h4>CREATING INSTANCES:</h4>
  <div class="code-comment mrg-bot mrg-top">
    fromEntropy(entropy: BytesLike, password?: null | string, wordlist?: null |
    Wordlist)⇒ Mnemonic
  </div>
  <el-button class="mrg-bot" type="primary" @click="fromEntropy">fromEntropy</el-button>
  <div class="code-result mrg-bot">助记词：{{phrase}}</div>
  <div class="code-comment mrg-bot">
    .fromPhrase(phrase: string, password?: null | string, wordlist?: null |
    Wordlist)⇒ Mnemonic
  </div>
  <el-button class="mrg-bot" type="primary" @click="fromPhrase">fromPhrase</el-button>
  <div class="code-result mrg-bot">通过已有助记词输出Mnemonic.entropy(熵)：{{entropy}}</div>
  <el-divider />
  <h4>METHODS:</h4>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="函数名" width="180" />
    <el-table-column prop="info" label="功能描述" />
    <el-table-column prop="data" label="实例输入" />
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
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const phrase = ref("")
  const entropy = ref("")
  const Mnemonic = ref()
  const fromEntropy = () => {
    Mnemonic.value = ethers.Mnemonic.fromEntropy("0x" + privateKey)
    phrase.value = Mnemonic.value.phrase;
    console.log(fromEntropy, phrase);

  };
  const fromPhrase = async () => {
    Mnemonic.value = ethers.Mnemonic.fromPhrase(phrase.value);
    console.log('Mnemonic:', Mnemonic.value);
    entropy.value = Mnemonic.value.entropy

  };
  const tableData = [
    {
      name: "computeSeed",
      info: "生成助记词对应的种子	",
      data: 'Mnemonic.valuecomputeSeed()⇒ string',
      result: "",
    },
    {
      name: "entropyToPhrase",
      info: "将熵转换为助记词短语	",
      data: 'ethers.Mnemonic.entropyToPhrase(entropy, wordlist?)',
      result: "",
    },
    {
      name: "isValidMnemonic",
      info: "验证助记词有效性		‌",
      data: 'ethers.Mnemonic.isValidMnemonic(phrase, wordlist?)	',
      result: "",
    },
    {
      name: "phraseToEntropy",
      info: "将助记词转换回熵	",
      data: "ethers.Mnemonic.phraseToEntropy(phrase, wordlist?)	",
      result: "",
    },
  ];

  const dataHelpeFun = async (row) => {
    switch (row.name) {
      case "computeSeed":
        row.result = Mnemonic.value.computeSeed(entropy.value)
        break;
      case "entropyToPhrase":
        row.result = ethers.Mnemonic.entropyToPhrase(entropy.value)
        break;
      case "isValidMnemonic":
        row.result = ethers.Mnemonic.isValidMnemonic(phrase.value)
        break;
      case "phraseToEntropy":
        row.result = ethers.Mnemonic.phraseToEntropy(phrase.value)
        break;

    }
  };
</script>

<style scoped>
  /* 页面样式 */
</style>