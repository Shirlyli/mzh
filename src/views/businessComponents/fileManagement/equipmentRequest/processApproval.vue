<template>
  <div class="approvalBox">
    <el-drawer title="流程审批"
               :visible.sync="dialogVisible"
               size="50%"
               @close="handleCancelApproval">

      <template slot="title">
        <span>流程审批</span>
        <!-- 操作按钮 -->
        <div class="btnBox">
          <el-button @click="handleSubmit"
                     type="primary">
            {{'审核通过' }}
          </el-button>
          <el-button type="error"
                     @click="handleCancel">
            {{ '审核不通过' }}
          </el-button>
          <el-button type="error"
                     @click="handleEnd">
            {{ '终止' }}
          </el-button>
        </div>
      </template>

      <!-- 基本信息 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>基本信息</span>
      </div>
      <div class="contentBox">
        <el-row :gutter="20">
          <el-col :span="12"
                  v-for="(item,index) in basicInfo"
                  :key="index">
            <div class="basicBox">
              <span class="title">{{item.title}}:</span>
              <span class="value">{{processData[item.field]?processData[item.field]:'-'}}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 设备明细 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>设备明细</span>
      </div>
      <div class="contentBox">
        <el-table :data="processRecordListData"
                  style="width: 100%"
                  border>
          <el-table-column prop="nodeName"
                           label="设备名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditStatus"
                           label="单位"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditmind"
                           label="数量">
          </el-table-column>
          <el-table-column prop="nextOperator"
                           label="单价">
          </el-table-column>
          <el-table-column prop="operator"
                           label="是否进口">
          </el-table-column>
          <el-table-column prop="operatorTime"
                           label="操作时间">
          </el-table-column>
        </el-table>

      </div>

      <!-- 附件信息 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>附件信息</span>
      </div>
      <div class="contentBox">
        <el-table :data="processRecordListData"
                  style="width: 100%"
                  border>
          <el-table-column prop="nodeName"
                           label="文件名"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditStatus"
                           label="提交人"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditmind"
                           label="上传时间">
          </el-table-column>
          <el-table-column prop="nextOperator"
                           label="操作">
          </el-table-column>
        </el-table>
      </div>

      <!-- 操作记录 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>操作记录</span>
      </div>
      <div class="contentBox">
        <el-table :data="processRecordListData"
                  style="width: 100%"
                  border>
          <el-table-column prop="nodeName"
                           label="节点名"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditStatus"
                           label="审核状态"
                           width="180">
          </el-table-column>
          <el-table-column prop="auditmind"
                           label="审核原因">
          </el-table-column>
          <el-table-column prop="nextOperator"
                           label="下一节点执行人">
          </el-table-column>
          <el-table-column prop="operator"
                           label="操作人">
          </el-table-column>
          <el-table-column prop="operatorTime"
                           label="操作时间">
          </el-table-column>
        </el-table>

      </div>

      <!-- 审批节点 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>科室审批</span>
      </div>
      <div>
        <el-form ref="dataForm"
                 :rules="rules"
                 :model="equipmentProcessData"
                 label-position="left"
                 label-width="60px"
                 style="margin-left:20px;">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'询价'"
                            prop="nextNodeName">
                <el-input :value="equipmentProcessData.nodeName"></el-input>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'询价人'"
                            prop="nextNodeExecutor">
                <el-input :value="equipmentProcessData.nodeName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>

    <!-- 提交审批流程确认模态框  -->
    <el-dialog :title="title"
               :visible.sync="nextDialogVisible"
               width="30%">
      <div v-if="type=='submit'">
        <el-form ref="dataForm"
                 :rules="rules"
                 :model="equipmentProcessData"
                 label-position="left"
                 label-width="120px"
                 style="margin-left:20px;">
          <!-- <el-row :gutter="20"> -->
          <!-- <el-col :span="12"> -->
          <el-form-item :label="'下一节点名称'"
                        prop="nextNodeName">
            <span>{{nextNodeNameData.nodeName}}</span>
          </el-form-item>
          <el-form-item :label="'下一节点执行人 '"
                        prop="nextNodeExecutor">
            <span>{{nextNodeExecutorData.user_name}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="type=='end'">
        是否终止该流程？
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleCancelProcess">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubmitProcess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./processApproval.ts">
</script>

<style lang="scss" scoped>
.dividerBox {
  margin: 12px 0;
  .el-divider--vertical {
    background-color: blue;
    width: 6px;
  }
}
.basicBox {
  display: flex;
  margin-bottom: 12px;
  color: #333;
  .title {
    width: 100px;
  }
  .value {
    color: #999;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.contentBox {
  padding-left: 18px;
}
.btnBox {
  // margin-top: 12px;
  float: right;
}
</style>