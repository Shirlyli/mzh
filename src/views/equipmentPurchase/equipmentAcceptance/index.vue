<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>设备验收</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['acceptance']"
                  hasNotSlotButton="add"
                  :toolbarBtns="[]"
                  type="transferApply"
                  @emit-handle-acceptance-row="handleAcceptance"
                  :paramsConfig="paramsConfig" />
      </keep-alive>
    </el-card>
  </div>

</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.dividerBox {
  margin: 12px 0 24px 0;
  font-size: 18px;
  .el-divider--vertical {
    background-color: blue;
    width: 6px;
  }
}
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.demo-drawer__footer {
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
