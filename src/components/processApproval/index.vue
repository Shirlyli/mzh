
<template>
  <div class="approvalBox">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>流程审批</span>
        <!-- 操作按钮 -->
        <div class="btnBox"
             v-if=" $route.query.code === 'edit'">
          <el-form ref="equipmentProcessData"
                   :rules="rules"
                   :model="equipmentProcessData"
                   label-position="left"
                   style="margin-left:20px;">
            <!-- 同意 -->
            <el-popover placement="top"
                        width="500"
                        class="popover"
                        v-model="submitVisible">
              <el-form-item :label="'下一节点名称'"
                            label-width="120px"
                            prop="nextNodeName"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-input v-model="equipmentProcessData.nextNodeName"
                          disabled></el-input>
              </el-form-item>
              <el-form-item :label="'处理人'"
                            label-width="120px"
                            prop="nextNodeExecutor"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-select v-model="equipmentProcessData.nextNodeExecutor"
                           placeholder="请选择">
                  <el-option :label="item.user_name"
                             :value="item.user_id"
                             v-for="(item) in nextNodeExecutorData"
                             :key="item.user_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="'意见 '"
                            label-width="120px"
                            prop="auditReason"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-input v-model="equipmentProcessData.auditReason"
                          type="textarea"></el-input>
              </el-form-item>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                           @click="submitVisible = false">取消</el-button>
                <el-button @click="handleSubmitProcess"
                           type="primary">
                  {{'确定' }}
                </el-button>
              </div>
              <el-button slot="reference"
                         type="primary">同意</el-button>

            </el-popover>

            <!-- 回退 -->
            <el-popover placement="top"
                        width="500"
                        class="popover"
                        v-model="backVisible">
              <el-form-item :label="'节点名称'"
                            label-width="80px"
                            prop="nextNodeCode"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-select v-model="equipmentProcessData.nextNodeCode"
                           placeholder="请选择"
                           @change="handleNodeChange">
                  <el-option :label="item.nodeName"
                             :value="item.nodeNameCode"
                             v-for="(item) in nextNodeExecutorData"
                             :key="item.nodeName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="'处理人'"
                            label-width="80px"
                            prop="nextNodeExecutor"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-select v-model="equipmentProcessData.nextNodeExecutor"
                           placeholder="请选择">
                  <el-option :label="item.user_name"
                             :value="item.user_id"
                             v-for="(item) in nodeExecutorData"
                             :key="item.user_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="'意见 '"
                            label-width="70px"
                            prop="auditReason"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-input v-model="equipmentProcessData.auditReason"
                          type="textarea"></el-input>
              </el-form-item>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                           @click="backVisible = false">取消</el-button>
                <el-button @click="handleSubmitProcess"
                           type="primary">
                  {{'确定' }}
                </el-button>
              </div>
              <el-button slot="reference">回退</el-button>
            </el-popover>

            <!-- 终止 -->
            <el-popover placement="top"
                        width="500"
                        class="popover"
                        v-model="endVisible">
              <el-form-item :label="'意见 '"
                            label-width="70px"
                            prop="auditReason"
                            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
                <el-input v-model="equipmentProcessData.auditReason"
                          type="textarea"></el-input>
              </el-form-item>
              <div style="text-align: right; margin: 0">
                <el-button size="mini"
                           @click="endVisible = false">取消</el-button>
                <el-button @click="handleSubmitProcess"
                           type="primary">
                  {{'确定' }}
                </el-button>
              </div>
              <el-button slot="reference"
                         type="danger">终止</el-button>
            </el-popover>

          </el-form>
        </div>
      </div>
      <!-- 流程当前节点 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="basicBox">
            <span class="title">单号</span>
            <span class="value">{{processData.billCode}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="basicBox">
            <span class="title">当前节点</span>
            <span class="value">{{processData.nextNodeName}}</span>
          </div>
        </el-col>
      </el-row>

      <el-form ref="requestParams"
               :rules="rules"
               :model="requestParams"
               label-position="left"
               label-width="120px"
               style="margin-left:0;">
        <!-- 基本信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </div>
        <div class="contentBox">
          <el-row type="flex"
                  justify="start"
                  style="flex-wrap:wrap; flex-direction: row">
            <el-col :span="8"
                    v-for="(item,index) in watchRequestForm.billMain"
                    :key="index">
              <div class="basicBox">
                <span class="title">{{item.title}}</span>
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
          <el-table :data="processData.billEquipmentList"
                    style="width: 100%"
                    border>
            <el-table-column prop="equipmentId"
                             label="设备名称"
                             width="180">
            </el-table-column>
            <el-table-column prop="unit"
                             label="设备单位"
                             width="180">
            </el-table-column>
            <el-table-column prop="price"
                             label="价格">
            </el-table-column>
            <el-table-column prop="equipmentNum"
                             label="设备数量">
              <slot></slot>
            </el-table-column>
            <el-table-column prop="isImport"
                             label="是否进口">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.isImport === '1' ?'是':'否'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 归还信息 -->
        <div v-show="watchRequestForm.borrowReturnList">
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>归还信息</span>
          </div>
          <div class="contentBox">
            <el-row type="flex"
                    justify="start"
                    style="flex-wrap:wrap; flex-direction: row">
              <el-col :span="8"
                      v-for="(item,index) in watchRequestForm.borrowReturnList"
                      :key="index">
                <div class="basicBox">
                  <span class="title">{{item.title}}:</span>
                  <span class="value"
                        v-if="item.type === 'date'">{{processData['borrowReturnList'][0]? moment(processData['borrowReturnList'][0][item.field]).format('YYYY-MM-DD'):'-'}}</span>
                  <span class="value"
                        v-else-if="item.type === 'input'">{{processData['borrowReturnList'][0][item.field]?processData['borrowReturnList'][0][item.field]:'-'}}</span>
                  <span class="value"
                        v-else>{{ processData['borrowReturnList'][0][item.field]?lodash.filter(item.data,['value',Number(processData['borrowReturnList'][0][item.field])])[0].label :'-'}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 附件信息 -->
        <!-- <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>附件信息</span>
      </div>
      <div class="contentBox">
        <el-table :data="[]"
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
      </div> -->

        <!-- 审批清单 -->
        <!-- <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>审批清单</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8"
                  v-for="(item,index) in watchRequestForm.billApproveList"
                  :key="index">
            <el-form-item :label="item.title"
                          :prop="'billApproveList['+item.field+']'"
                          :rules="item.required ? [{required: true, message: '不能为空', trigger: 'change'}]:[{required: false}]">
              <el-input v-model="requestParams.billApproveList[item.field]"
                        :placeholder="`请输入${item.title}`"
                        v-if="item.type === 'input'" />
              <el-select v-model="requestParams.billApproveList[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <el-date-picker v-model="requestParams.billApproveList[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row> -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>操作记录</span>
        </div>
        <div class="contentBox">
          <el-table :data="processData.processRecord"
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
                             label="处理意见">
            </el-table-column>
            <el-table-column prop="operatorTime"
                             label="操作时间">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ moment(scope.row.operatorTime).format('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.dividerBox {
  margin: 12px 0 24px 0;
  font-size: 18px;
  .el-divider--vertical {
    background-color: blue;
    width: 6px;
  }
}
.el-drawer__body {
  position: relative;
}
.basicBox {
  display: flex;
  margin-bottom: 12px;
  color: #333;
  line-height: 32px;
  color: rgba(37, 45, 62, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', SimSun, sans-serif;
  .title {
    width: 120px;
    padding: 0 8px;
    background-color: rgba(159, 174, 248, 0.08);
  }
  .value {
    color: rgba(37, 45, 62, 0.85);
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 20px;
  }
}

.contentBox {
  padding-left: 18px;
}
.btnBox {
  float: right;
  // position: absolute;
  // right: 20px;
  // bottom: 10px;
}
.popover {
  margin-left: 12px;
}

.el-card__body {
  overflow-y: scroll;
  height: 100%;
}
</style>
