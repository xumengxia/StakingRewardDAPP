<template>
  <el-dialog
    title="Connected"
    width="420"
    center
    v-model="props.showDisconnect"
  >
    <div class="contet">
      <div class="circle mrg-bot"></div>
      <div class="mrg-bot" @click="copyFun">
        <span class="mrg-rig">{{ fmtAccount }}</span>
        <el-icon><i-ep-CopyDocument /></el-icon>
      </div>
      <div class="mrg-bot">{{}} 0 RON</div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button
          style="width: 100%"
          type="primary"
          size="large"
          round
          @click="handleClose"
        >
          Disconnect
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { ref } from "vue";

const props = defineProps({
  showDisconnect: {
    type: Boolean,
    default: false,
  },
  fmtAccount: {
    type: String,
    default: "",
  },
});
const copyFun = () => {
  alert("未做该功能");
};
const emits = defineEmits(["handleClose"]);
const handleClose = () => {
  emits("handleClose");
};
</script>
<style scoped lang="scss">
.contet {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .circle {
    width: 100px;
    height: 100px;
    background-color: #003ef5;
    border-radius: 50%;
    display: inline-block;
  }
  .mrg-bot {
    margin-bottom: 20px;
  }
  .mrg-rig {
    margin-right: 10px;
  }
}
</style>
