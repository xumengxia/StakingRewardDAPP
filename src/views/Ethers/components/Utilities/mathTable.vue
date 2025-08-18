<template>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="函数名" width="180" />
        <el-table-column prop="info" label="功能描述" />
        <el-table-column prop="data" label="实例输入" />
        <el-table-column prop="result" label="结果" />
        <el-table-column label="操作">
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

    const tableData = [
        {
            name: 'fromTwos',
            info: '将补码表示的数值转换为原始值（最高位为1时结果为负）',
            data: 'fromTwos("0xff", 8) → -1n',
            result: ''
        }, {
            name: 'getBigInt',
            info: '	将输入值转换为bigint，无效时抛出错误',
            data: 'getBigInt("100") → 100n',
            result: ''
        }, {
            name: 'getNumber',
            info: '将 BigNumberish 转换为 number，若无效则抛出 ArgumentError',
            data: 'getNumber("123") → 123',
            result: ''
        }, {
            name: 'getUint',
            info: '十六进制字符串转换为十进制无符号大整数，',
            data: 'getUint("0x1234") → 0x1234n',
            result: ''
        }, {
            name: 'mask',
            info: '用指定位数的掩码截断数值',
            data: 'mask(0x1234, 8)→ 0x34n',
            result: ''
        }, {
            name: 'toBeArray',
            info: '将 BigNumberish 转换为大端序的 Uint8Array‌',
            data: '0x1234',
            result: ''
        }
        , {
            name: 'toBeHex',
            info: '将数值转换为大端序十六进制字符串，可选填充字节宽度',
            data: 'toBeHex(255) → "0xff"',
            result: ''
        }, {
            name: 'toBigInt',
            info: '将 BigNumberish 或 Uint8Array 转换为 bigint‌‌',
            data: "9007199254740993",
            result: ''
        }, , {
            name: 'toNumber',
            info: '将 BigNumberish 或 Uint8Array 转换为安全范围内的 number‌',
            data: "42",
            result: ''
        }, {
            name: 'toQuantity',
            info: '生成符合 JSON-RPC 标准的无前导零的十六进制字符串（Quantity 格式）‌',
            data: '0x0123',
            result: ''
        }, {
            name: 'toTwos',
            info: '将数值转换为指定位宽的补码表示（结果恒为正）',
            data: 'toTwos(-1, 8) → 0xffn',
            result: ''
        }
    ]
    const dataHelpeFun = (row) => {
        switch (row.name) {
            case 'fromTwos':
                row.result = ethers.fromTwos("0xff", 8) + "n"
                console.log(row.result);
                break;
            case 'getBigInt':
                row.result = ethers.getBigInt("100") + "n"
                console.log(row.result);
                break;
            case 'getNumber':
                row.result = ethers.getNumber("123")
                break;
            case 'getUint':
                row.result = ethers.getUint("0x1234")
                break;
            case 'mask':
                row.result = ethers.mask("0x1234", 8)

                break;
            case 'toBeArray':
                row.result = ethers.toBeArray('0x1234')
                break;
            case 'toBeHex':
                row.result = ethers.toBeHex(255)
                break;
            case 'toBigInt':
                row.result = ethers.toBigInt("9007199254740993", 2)
                break;
            case 'toNumber':
                row.result = ethers.toNumber("42")
                break;
            case 'toQuantity':
                row.result = ethers.toQuantity("0x0123")
                break;
            case 'toTwos':
                row.result = ethers.toTwos(-1, 8)
                break;
        }

    };
</script>

<style scoped>

</style>