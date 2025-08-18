<template>
    <div class="tab-container">
        <h3>1. Base58 Encoding()</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot">
                Base58是一种去除了易混淆字符的编码格式，主要用于加密货币地址和放混淆场景
            </h4>
            <el-button class="mrg-bot" type="primary" @click="encodeBase58Fun">encodeBase58</el-button>
            <br />
            <el-button type="primary" @click="decodeBase58Fun">decodeBase58(暂时解码err)</el-button>
            <br />
        </el-card>
        <el-divider />

        <h3>2. Base64 Encoding()</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot">
                Base64是一种将二进制数据编码为ASCII字符串的方法，常用于文本协议传输二进制数据‌(binary)
            </h4>
            <el-button class="mrg-bot" type="primary" @click="base64EncodingFun">base64Encoding</el-button>
            <br />

            <br />
        </el-card>
        <el-divider />

        <h3>3. Data Helpers</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> 3.1 type </h4>
            <div class="code-comment">
                BytesLike => DataHexString(偶数长度十六进制字符串) | Uint8Array(字节数组) :二进制数据的通用表示形式 <br />
                HexString => HexString(十六进制字符串) 0x开头
            </div>
            <el-divider />
            <h4 class="mrg-bot"> 3.2 FUNCTIONS </h4>
            <functionTable></functionTable>
        </el-card>
        <el-divider />


        <h3>4. Math Helpers</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> 4.1 type </h4>
            <div class="code-comment">
                BigNumberish =>string|Numeric 表示大数字的联合类型string,number,bigint ("123"、456、789n) <br />
                Numeric⇒ number | bigint
            </div>
            <el-divider />
            <h4 class="mrg-bot"> 4.2 FUNCTIONS </h4>
            <mathTable></mathTable>
        </el-card>
        <el-divider />

        <h3>5. Properties</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> FUNCTIONS </h4>
            <div class="mrg-bot">
                <el-button type="primary" @click="definePropertiesFun">defineProperties</el-button>
                <span class="mrg-lef">defineProperties 只读属性</span>
            </div>
            <div>
                <el-button type="primary" @click="resolvePropertiesFun">resolveProperties</el-button>
                <span class="mrg-lef">resolveProperties 异步处理</span>
            </div>
        </el-card>
        <el-divider />


        <h3>6. Recursive-Length Perfix 递归前置长度</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> 6.1 TYPES </h4>
            <div class="code-comment mrg-bot">
                RlpStructuredData | RLP 编码结构，可以是字符串或 RlpStructuredData 数组 | "cat" 或 ["cat", ["dog"]] <br />
                RlpStructuredDataish | 扩展类型，支持 Uint8Array | new Uint8Array([0x01])
            </div>
            <h4 class="mrg-bot"> 6.2 函数 </h4>
            <div class="code-comment mrg-bot">
                <el-button type="primary" @click="decodeRlpFun">decodeRlp =>("0x8568656c6c6f")</el-button>
                <el-button type="primary" @click="encodeRlpFun">encodeRlp=>("hello")</el-button>
            </div>
            <utf8Table></utf8Table>
        </el-card>
        <el-divider />

        <h3>7. Strings and UTF-8</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> 7.1 CONSTANTS </h4>
            <div class="code-comment mrg-bot">
                Utf8ErrorFuncs⇒ Record< "error" | "ignore" | "replace" , Utf8ErrorFunc > <br />
                    ‌数据完整性‌：replace 会保留所有字节（替换非法部分），ignore 直接丢弃，error 中断处理‌<br />
                    ‌典型应用‌：文件解析优先用 replace，调试时用 error，日志处理可选 ignore‌
            </div>
            <h4 class="mrg-bot"> 6.2 函数 </h4>

        </el-card>
        <el-divider />
        <h3>8. Unit Conversion</h3>
        <el-card class="mrg-top">
            <h4 class="mrg-bot"> FUNCTIONS </h4>
            <unitConversion></unitConversion>

        </el-card>
        <el-divider />
    </div>
</template>

<script setup lang="ts">
    import { ethers } from "ethers";
    import { useStore } from "@/store/index";
    import functionTable from "./functions.vue";
    import mathTable from "./mathTable.vue";
    import utf8Table from "./utf8Table.vue";
    import unitConversion from "./unitConversion.vue"
    const Store = useStore();
    const encodeResult = ref();
    const encodeBase58Fun = () => {
        const val = ethers.toUtf8Bytes("Hello World!!"); // toUtft8Bytes
        console.log("toUtf8Bytes('Hello World!!'):", val);
        const result = ethers.encodeBase58(val);
        console.log(`encodeBase58Fun(${val}):`, result);
    };
    const decodeBase58Fun = () => {
        const val = ethers.decodeBase58('72k1xXWE6pgmLCU5Uk');
        console.log("decodeBase58('72k1xXWE6pgmLCU5Uk'):", val);
    };
    const base64EncodingFun = () => {
        console.log(`encodeBase64("0x1234"): `, ethers.encodeBase64("0x1234"));
        console.log(`ethers.encodeBase64(new Uint8Array([0x12, 0x34])): `, ethers.encodeBase64(new Uint8Array([0x12, 0x34])));
        console.log('ethers.decodeBase64("EjQ="): ', ethers.decodeBase64("EjQ="));
        console.log('---------------------------------------------');

        console.log(`encodeBase64(toUtf8Bytes("Hello World!!")): `, ethers.encodeBase64(ethers.toUtf8Bytes("Hello World!!")));
        const result = ethers.decodeBase64("SGVsbG8gV29ybGQhIQ==")
        console.log('ethers.decodeBase64("SGVsbG8gV29ybGQhIQ=="): ', ethers.toUtf8String(result));

    };

    const definePropertiesFun = () => {
        const config = {};
        ethers.defineProperties(config, {
            apiUrl: "https://api.example.com",
            maxRetries: 3
        });
        // 修改报错
        config.apiUrl = "newUrl"
    };
    const fetchUser = () => {
        console.log('fetchUser');
    };

    const resolvePropertiesFun = async () => {
        const asyncData = {
            user: fetchUser(),
        }
        const resolveData = await ethers.resolveProperties(asyncData)
    };
    const decodeRlpFun = () => {
        const res = ethers.decodeRlp("0x8568656c6c6f")
        // console.log(res, JSON.stringify(ethers.toBeArray(res)));
        console.log(ethers.toUtf8String(res));

    }
    const encodeRlpFun = () => {
        const str = "hello";
        const bytes = ethers.toUtf8Bytes(str); // 转换为 Uint8Array
        const encoded = ethers.encodeRlp(bytes); // 0x8568656c6c6f
        console.log(encoded);

    }
</script>

<style scoped>
    /* 页面样式 */
</style>