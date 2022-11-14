<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>科室申请</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="addEquipmentRequest">新增</el-button>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               type="card">
        <el-tab-pane label="待处理任务"
                     name="toDoTask">
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    hasNotSlotButton="true"
                    @emit-handle-search="handleSearch"
                    :paramsConfig="paramsConfig" />
        </el-tab-pane>
        <el-tab-pane label="已处理任务"
                     name="dealTask">已处理任务</el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增流程申请 -->
    <el-drawer title="发起申请"
               :visible.sync="dialogVisible"
               size="50%"
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
                <el-option key="购置类别"
                           label="新增"
                           value="购置类别">
                </el-option>
                <el-option key="购置类别"
                           label="复购"
                           value="购置类别">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
          <el-col :span="12">
            <el-form-item :label="'当前节点名称'"
                          prop="currentNodeName">
              <el-input v-model="equipmentProcessData.currentNodeName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
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
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'附件'"
                          prop="enclosureId">
              <!-- <el-input v-model="equipmentProcessData.enclosureId"
                        placeholder="请输入" /> -->
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
                <!-- <div slot="tip"
                     class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- 审批信息  -->
          <!-- <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>审批信息</span></span>
        </div> -->
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
              <!-- <el-select v-model="equipmentProcessData.nextNodeExecutor"
                         placeholder="请选择">
                <el-option v-for="item in nextNodeExecutorData"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id">
                </el-option>
              </el-select> -->
              <el-input v-model="equipmentProcessData.nextNodeExecutor"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12"
                  :offset="12">
            <el-form-item>
              <el-button @click="dialogVisible = false">
                {{ $t('table.cancel') }}
              </el-button>
              <el-button type="primary"
                         @click="dialogStatus==='create'?createData():updateData()">
                {{ $t('table.confirm') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-drawer>

    <!-- 流程审批 -->
    <ProcessApproval :dialogVisible="approvalDialogVisible"
                     :processData="clickProcessData"
                     @emit-handle-submit="emitHandleSubmit"
                     v-show="approvalDialogVisible" />
  </div>

</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.dividerBox {
  margin-bottom: 12px;
  .el-divider--vertical {
    color: blue;
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
</style>
