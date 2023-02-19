<template>
  <div class="processRequest">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>流程申请</span>
        <div class="demo-drawer__footer" v-show="pathQuery.type !== '维修申请查看'" >
          <el-row>
            <el-button size="mini"
                       :disabled="item.disabled"
                       :type="item.type"
                       v-for="(item) in ProcessBtnLists[processType]"
                       :key="item.key"
                       @click="handleSubmit(item.method)">
              {{ item.title }}
            </el-button>
          </el-row>
        </div>
      </div>
      <el-form ref="requestParams"
               :model="processParamsData"
               label-position="left"
               style="margin-left:0;">

        <!-- 申请信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>申请信息</span>
        </div>
        <el-row :gutter="22"
                type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8"
                  v-for="(item,index) in processFormItemData.maintenanceRequest"
                  :key="index">
            <!-- 申请 表单填写 -->
            <div v-if="processType === 'maintenanceRequest' && applyUrl !== 'CK'">
              <el-form-item :label="item.title"
                            label-width="120px"
                            :prop="'maintenanceRequest['+item.field+']'"
                            :rules="processType !== 'maintenanceRequest' ?{}: item.required ? [{required: true, message: '不能为空', trigger: 'change'}]:[{required: false}]">

                <!-- 普通输入框 -->
                <div v-if="item.type === 'input'"
                     style="display: flex;">
                  <el-input v-model="processParamsData[[processType]][item.field]"
                            :placeholder="`请输入${item.title}`"
                            :disabled="item.disabled" />
                  <el-button type="primary"
                             v-if="item.field==='equipmentName'"
                             @click="handleChooseEquipment">选择设备</el-button>
                </div>

                <!-- 树形下拉框 -->
                <treeselect :options="item.data"
                            v-model="processParamsData[processType][item.field]"
                            clearable
                            :disable-branch-nodes="true"
                            search-nested
                            placeholder="请选择"
                            v-if="item.type === 'treeSelect'" />
                <!-- 下拉框 -->
                <el-select v-model="processParamsData[processType][item.field]"
                           v-if="item.type === 'select'"
                           :disabled="item.disabled"
                           placeholder="请选择">
                  <el-option :label="optionValue.label"
                             :value="optionValue.value"
                             v-for="optionValue in item.data"
                             :key="optionValue.label"></el-option>
                </el-select>
                <!-- 时间 -->
                <el-date-picker v-model="processParamsData[[processType]][item.field]"
                                v-if="item.type === 'date'"
                                :disabled="item.disabled"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd hh:mm:ss"
                                value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
                <!-- 多行文本框 -->
                <el-input type="textarea"
                          :rows="2"
                          :disabled="item.disabled"
                          v-if="item.type === 'textarea'"
                          placeholder="请输入内容"
                          v-model="processParamsData[[processType]][item.field]">
                </el-input>
              </el-form-item>
            </div>
            <!-- 非申请 展示 -->
            <div v-else
                 class="basicBox">
              <span class="label">
                {{ item.title }}
              </span>
              <span class="value">
                {{ processClickProcessData[item.field] ? processClickProcessData[item.field] :'-'}}
              </span>
            </div>
          </el-col>
        </el-row>

        <div v-if=" processType !== 'maintenanceRequest'">
          <!-- 审核人信息 -->
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>审核人信息</span>
          </div>
          <el-row :gutter="22"
                  type="flex"
                  justify="start"
                  style="flex-wrap:wrap; flex-direction: row">
            <el-col :span="8"
                    v-for="(item,index) in processFormItemData.checkPersonalInfoFormList"
                    :key="index">
              <div class="basicBox">
                <span class="label">
                  {{ item.title }}
                </span>
                <span class="value">
                  {{ maintenanceRecordData && maintenanceRecordData[item.field] ? maintenanceRecordData[item.field] :'-'}}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div v-if="processType !== 'maintenanceRequest'">
          <!-- 维修人信息 -->
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>维修人信息</span>
          </div>
          <el-row :gutter="22"
                  type="flex"
                  justify="start"
                  style="flex-wrap:wrap; flex-direction: row">
            <el-col :span="8"
                    v-for="(item,index) in processFormItemData.maintenancePersonalInfoFormList"
                    :key="index">
              <div class="basicBox">
                <span class="label">
                  {{ item.title }}
                </span>
                <span class="value">
                  {{ maintenanceRecordData && maintenanceRecordData[item.field] ? maintenanceRecordData[item.field] :'-'}}
                </span>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-form>

      <div v-if="processType === 'maintenanceIng'">
        <el-form ref="recordRef"
                 :model="maintenanceParamsData"
                 label-position="left"
                 style="margin-left:0;">
          <!-- 维修清单 -->
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>维修清单
              <el-button @click="addNewRecord"
                         size="mini"
                         class="addBtn">+ 新增明细</el-button>
            </span>
          </div>
          <el-row :gutter="24"
                  v-for="(item,index) in maintenanceRecordsFormList"
                  :key="index">
            <el-col :span="24">
              <el-row :gutter="24"
                      class="singleRow"
                      style="flex-wrap:wrap; flex-direction: row">
                <el-col :span="7"
                        v-for="(equi) in item"
                        :key="equi.field">
                  <el-form-item :label="equi.title"
                                label-width="120px"
                                :prop="'['+index+']['+equi.field+']'"
                                :rules="equi.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]">

                    <el-input v-model="maintenanceParamsData[index][equi.field]"
                              :placeholder="`请输入${equi.title}`"
                              v-if="equi.type === 'input'" />
                    <treeselect :options="equi.data"
                                v-model="maintenanceParamsData[index][equi.field]"
                                clearable
                                :disable-branch-nodes="true"
                                search-nested
                                placeholder="请选择"
                                v-if="equi.type === 'treeSelect'" />
                    <!-- <el-select v-model="maintenanceParamsData[index][equi.field]"
                             v-if="equi.type === 'select'"
                             placeholder="请选择">
                    <el-option :label="optionValue.label"
                               :value="optionValue.value"
                               v-for="optionValue in equi.data"
                               :key="optionValue.value"></el-option>
                  </el-select> -->
                    <el-date-picker v-model="maintenanceParamsData[index][equi.field]"
                                    v-if="equi.type === 'date'"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button class="delete-btn"
                             size="large"
                             icon="el-icon-delete"
                             type="danger"
                             plain
                             @click="removeKey(item,index)">删除</el-button>
                </el-col>

              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 维修清单 -->
      <div v-if="processType !== 'maintenanceIng' && processType !== 'maintenanceRequest'">
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>维修清单
          </span>
        </div>
        <vxe-table border
                   ref="xTable1"
                   :data="maintenanceRecordData.records">
          <vxe-column field="name"
                      width="400"
                      title="设备名称"></vxe-column>
          <vxe-column field="unit"
                      width="150"
                      title="设备型号"></vxe-column>
          <vxe-column field="numbers"
                      width="150"
                      title="数量"
                      show-overflow></vxe-column>
          <vxe-column field="hours"
                      width="150"
                      title="时常"
                      show-overflow></vxe-column>
          <vxe-column field="price"
                      title="金额"
                      show-overflow></vxe-column>
        </vxe-table>
      </div>

      <div v-if="processType !== 'maintenanceIng' && processType !== 'maintenanceRequest'">
        <!-- 验收人信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>验收人信息</span>
        </div>
        <el-row :gutter="22"
                type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8"
                  v-for="(item,index) in processFormItemData.maintenanceAcceptPersonalInfoFormList"
                  :key="index">
            <div class="basicBox">
              <span class="label">
                {{ item.title }}
              </span>
              <span class="value">
                {{ maintenanceRecordData && maintenanceRecordData[item.field] ? maintenanceRecordData[item.field] :'-'}}
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 选择设备模态框 -->
    <el-dialog title="选择设备"
               :visible.sync="chooseEquipmentDialogVisible">
      <vxe-table border
                 ref="xTable1"
                 height="300"
                 :data="chooseEquipmentData"
                 :radio-config="{highlight: true}"
                 @radio-change="radioChangeEvent">
        <vxe-column type="radio"
                    width="60">
          <template #header>
            <vxe-button type="text"
                        :disabled="!selectRow"></vxe-button>
          </template>
        </vxe-column>
        <vxe-column field="barCode"
                    title="设备编号"></vxe-column>
        <vxe-column field="name"
                    title="设备名称"></vxe-column>
        <vxe-column field="brand"
                    title="规则型号"
                    show-overflow></vxe-column>
        <vxe-column field="barCode"
                    title="序列号"
                    show-overflow></vxe-column>
        <vxe-column field="address"
                    title="原设备编号"
                    show-overflow></vxe-column>
      </vxe-table>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="chooseEquipmentDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submitChooseEquipment">
          确定
        </el-button>
      </div>
    </el-dialog>

    <!-- 维修工程师指派模态框 -->
    <el-dialog title="选择维修工程师"
               :visible.sync="chooseMaintenanceDialogVisible">
      <vxe-table border
                 ref="xTable1"
                 height="300"
                 :data="chooseMaintenanceData">
        <vxe-column field="eName"
                    title="名称"></vxe-column>
        <vxe-column field="phoneNo"
                    title="电话"></vxe-column>
        <vxe-column field="sex"
                    title="性别"
                    show-overflow></vxe-column>
        <vxe-column field="citizenNo"
                    title="身份证号"
                    show-overflow></vxe-column>
        <vxe-column field="nation"
                    title="国别"
                    show-overflow></vxe-column>
        <vxe-column width="80"
                    title="操作">
          <template #default="{row}">
            <vxe-button status="primary"
                        @click="submitJobSending(row)">指派</vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- <div slot="footer"
           class="dialog-footer">
        <el-button @click="chooseEquipmentDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submitChooseEquipment">
          确定
        </el-button>
      </div> -->
    </el-dialog>

    <!--  操作日志-->
    <el-dialog title="操作日志"
               :visible.sync="showRecordVisible">
      <vxe-table border
                 ref="xTable1"
                 :data="logData">
        <vxe-column field="optUserName"
                    width="150"
                    title="操作人"></vxe-column>
        <vxe-column field="optName"
                    width="150"
                    title="节点名称"></vxe-column>
        <vxe-column field="optTime"
                    title="操作时间"
                    show-overflow>
          <template #default="{row}">
            <span>{{ moment(row.optTime).format('YYYY-MM-DD') }}</span>
          </template>
        </vxe-column>
      </vxe-table>
    </el-dialog>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.el-card {
  .el-card__body {
    overflow-y: scroll;
    height: 100%;
  }
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
  // display: flex;
  // position: absolute;
  // bottom: 10px;
  // right: 10px;
  float: right;
}

.singleRow {
  margin-bottom: 12px;
  padding: 10px;
  border: 1px dashed #000;
  .el-form-item {
    margin-bottom: 0pt;
  }

  .el-col {
    margin-bottom: 12px;
  }
}

.addBtn {
  float: right;
}

.basicBox {
  display: flex;
  margin-bottom: 12px;
  color: #333;
  line-height: 32px;
  font-size: 14px;
  color: rgba(37, 45, 62, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', SimSun, sans-serif;
  .label {
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
</style>
