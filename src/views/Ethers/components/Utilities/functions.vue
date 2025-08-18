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
            name: 'concat',
            info: '拼接多个BytesLike为单个DataHexString',
            data: '["0x12", "0x34"]',
            result: ''
        }, {
            name: 'dataLength',
            info: '	返回数据的字节长度',
            data: "0x1234",
            result: ''
        }, {
            name: 'dataSlice',
            info: '切片数据',
            data: '"0x123456", 1, 3',
            result: ''
        }, {
            name: 'getBytes',
            info: '获取Uint8Array（可能为引用）',
            data: '0x1a3f',
            result: ''
        }, {
            name: 'getBytesCopy',
            info: '创建输入值的Uint8Array副本，防止原始数据被修改‌',
            data: 'getBytesCopy("0x12ab") → Uint8Array([0x12, 0xab])',
            result: ''
        }, {
            name: 'hexlify',
            info: '将任意BytesLike转为DataHexString',
            data: '"0x123456", 1, 3',
            result: ''
        }
        , {
            name: 'isBytesLike',
            info: '检查是否为有效二进制数据',
            data: "0x1a3f",
            result: ''
        }, {
            name: 'isHexString',
            info: '验证输入是否为有效的十六进制字符串，可选校验字节长度‌',
            data: "isHexString('0x1a3f',2) → true",
            result: ''
        }, , {
            name: 'stripZerosLeft',
            info: '去除十六进制数据左侧的零字节，返回规范化的十六进制字符串‌',
            data: 'stripZerosLeft("0x000123")',
            result: ''
        }, {
            name: 'zeroPadBytes',
            info: '右侧填充字节至指定长度',
            data: '"0x1234", 4',
            result: ''
        }, {
            name: 'zeroPadValue',
            info: '左侧填充字节至指定长度',
            data: '"0x1234", 4',
            result: ''
        }
    ]
    const dataHelpeFun = (row) => {
        switch (row.name) {
            case 'concat':
                row.result = ethers.concat(["0x12", "0x34"])
                break;
            case 'dataLength':
                row.result = ethers.dataLength("0x1234")
                break;
            case 'dataSlice':
                row.result = ethers.dataSlice("0x123456", 1, 3)
                break;
            case 'getBytes':
                row.result = ethers.getBytes("0x1a3f")
                break;
            case 'getBytesCopy':
                row.result = ethers.getBytesCopy("0x1a3f")
                break;
            case 'hexlify':
                row.result = ethers.hexlify(new Uint8Array([0x1A]))
                break;
            case 'isBytesLike':
                row.result = ethers.isBytesLike("0x1a3f")
                break;
            case 'isHexString':
                row.result = ethers.isHexString("0x1a3f", 2)
                break;
            case 'stripZerosLeft':
                row.result = ethers.stripZerosLeft("0x000123")
                break;
            case 'zeroPadBytes':
                row.result = ethers.zeroPadBytes("0x1234", 4)
                break;
            case 'zeroPadValue':
                row.result = ethers.zeroPadValue("0x1234", 4)
                break;
        }

    };
</script>

<style scoped>

</style>