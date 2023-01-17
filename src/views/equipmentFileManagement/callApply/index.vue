<template>
  <div class="equipmentManagement">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>调用申请</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['search','del','record']"
                  hasNotSlotButton="add"
                   :toolbarBtns="['add', 'import', 'delete', 'export']"
                  type="transferApply"
                  @emit-handle-insert="handleInsert"
                  @emit-handle-search="handleSearch"
                  @emit-handle-remove="handleRemove"
                  @emit-handle-record="handleRecord"
                  :paramsConfig="paramsConfig" />
      </keep-alive>
    </el-card>

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

.demo-drawer__footer {
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
  .el-button {
  }
}
</style>
