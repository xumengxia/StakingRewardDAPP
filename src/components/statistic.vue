<template>
  <div class="statistic">
    <div class="statistic-item" v-for="item in statisticArr" :key="item.key">
      <div class="statistic-item-con">
        <el-icon :size="32"><i-ep-Histogram /></el-icon>
        <span class="title">{{ item.key }} </span>
        <span class="ipt">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from "@element-plus/icons-vue";
const props = defineProps({
  statisticArr: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped>
.statistic {
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 每行内部均匀分布 */
  border-radius: 16px;
  border: 1px solid #e0e3eb;

  .statistic-item {
    height: 100%;
    padding-left: 20px;
    border-left: 1px solid #e0e3eb;
    flex: 1;
    .statistic-item-con {
      display: flex;
      flex-direction: column;

      .title {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 14px;
        text-transform: uppercase;
      }
      .ipt {
        font-size: 28px;
      }
    }
  }
  .statistic-item:first-child {
    border-left: none;
  }
}
</style>
