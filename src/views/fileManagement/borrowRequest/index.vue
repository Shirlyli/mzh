<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>借用申请</span>
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
    <el-dialog title="操作记录"
               width="80%"
               top="30px"
               class="commonDialog"
               :visible="processRecordDialogVisible"
               @close="processRecordDialogVisible = false">
      <div class="contentBox">
        <el-table :data="processRecordListData"
                  style="width: 100%"
                  border>
          <el-table-column prop="nodeName"
                           label="节点名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="operator"
                           label="操作人"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditStatus"
                           label="审核状态"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditmind"
                           label="操作说明">
          </el-table-column>
          <el-table-column prop="operatorTime"
                           label="操作时间">
          </el-table-column>
        </el-table>

      </div>
    </el-dialog>
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
