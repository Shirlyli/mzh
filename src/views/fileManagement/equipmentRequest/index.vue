<template>
  <div>
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>科室申请</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['search','del','record']"
                  hasNotSlotButton="add"
                  @emit-handle-insert="handleInsert"
                  @emit-handle-search="handleSearch"
                  @emit-handle-remove="handleRemove"
                  @emit-handle-record="handleRecord"
                  :paramsConfig="paramsConfig" />
      </keep-alive>
    </el-card>

    <!-- 新增流程申请 -->
    <el-drawer title="发起申请"
               :visible.sync="dialogVisible"
               size="60%"
               @close="dialogVisible = false">
      <el-form ref="dataForm"
               :rules="rules"
               :model="equipmentProcessData"
               label-position="left"
               label-width="120px"
               style="margin-left:20px;">

        <!-- 基本信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'项目名称'"
                          prop="projectName">
              <el-input v-model="equipmentProcessData.projectName"
                        placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'购置类别'"
                          prop="purchaseType">
              <el-select v-model="equipmentProcessData.purchaseType"
                         placeholder="请选择">
                <el-option key="新增"
                           label="新增"
                           value="新增">
                </el-option>
                <el-option key="复购"
                           label="复购"
                           value="复购">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请科室'"
                          prop="applyDept">
              <el-select v-model="equipmentProcessData.applyDept"
                         placeholder="请选择"
                         @change="changeApplyDept">
                <el-option v-for="item in applyDeptData"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'申请方式'"
                          prop="applyModle">
              <el-select v-model="equipmentProcessData.applyModle"
                         placeholder="请选择">
                <el-option key="zcsq"
                           label="正常申请"
                           value="zcsq">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请理由'"
                          prop="applyReson">
              <el-input v-model="equipmentProcessData.applyReson"
                        placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'流程民称'"
                          prop="processCode">
              <el-input v-model="equipmentProcessData.processName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'当前节点名称'"
                          prop="currentNodeName">
              <el-input v-model="equipmentProcessData.currentNodeName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>

        <!-- 设备明细 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>设备明细</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请设备明细'"
                          prop="applyDetailId">
              <el-select v-model="equipmentProcessData.applyDetailId"
                         placeholder="请选择">
                <el-option v-for="item in applyDetailData"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'附件'"
                          prop="enclosureId">
              <el-upload class="upload-demo"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemoveField"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="3"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button size="small"
                           type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'下一节点名称'"
                          prop="nextNodeName">
              <el-input v-model="equipmentProcessData.nextNodeName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'下一节点执行人 '"
                          prop="nextNodeExecutor">
              <el-select v-model="equipmentProcessData.nextNodeExecutor"
                         placeholder="请选择">
                <el-option :label="item.user_name"
                           :value="item.user_id"
                           v-for="(item) in nextNodeExecutorData"
                           :key="item.user_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="dialogVisible = false"
                   size="large">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   size="large"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>

    </el-drawer>

    <!-- <RequestDrawer :dialogVisible="requestDialogVisible"
                   :requestForm="requestForm"
                   :requestParams="requestParams"
                   :processModal="processModal"
                   @emit-close="handleClose"
                   @emit-submit-create-request="handleCreateRequest" /> -->

    <!-- 流程审批 -->
    <ProcessApproval :dialogVisible="approvalDialogVisible"
                     :processData="clickProcessData"
                     @emit-handle-submit="emitHandleSubmit"
                     v-show="approvalDialogVisible"
                     :basicFormList="basicFormList" />

    <!-- 操作记录 -->
    <el-dialog title="操作记录"
               width="80%"
               top="30px"
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
