<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>已审批</span>
      </div>
      <keep-alive>
        <VexTable ref="vexDoneTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['search','record']"
                  :toolbarBtns="['add', 'import', 'delete', 'export']"
                  hasNotSlotButton="true"
                  @emit-handle-search="handleSearch"
                  @emit-handle-record="handleRecord"
                  :paramsConfig="doneFormConfig" />
      </keep-alive>

    </el-card>

    <!-- 流程审批 -->
    <ProcessApproval :dialogVisible="approvalDialogVisible"
                     :processData="clickProcessData"
                     @emit-handle-submit="emitHandleSubmit"
                     v-show="approvalDialogVisible"
                     editType="historyTask" />

    <!-- 操作记录 -->
    <ProcessOperationRecord :processRecordDialogVisible="processRecordDialogVisible"
                            :processRecordListData="processRecordListData" />
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

.editBox {
  .el-form-item__content {
    text-align: right;
  }
}
</style>
