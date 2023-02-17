<template>
  <div class="processRequest">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>流程申请</span>
        <div class="demo-drawer__footer">
          <el-row>
            <el-button size="mini"
                       :disabled="item.disabled"
                       type="primary"
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
          <el-col :span="processType === 'maintenanceRequest'?8:6"
                  v-for="(item,index) in processFormItemData.maintenanceRequest"
                  :key="index">
            <!-- 申请 表单填写 -->
            <div v-if="processType === 'maintenanceRequest'">
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

        <div v-if="processType !== 'maintenanceRequest'">
          <!-- 审核人信息 aaa-->
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>审核人信息</span>
          </div>

          <!-- 维修人信息 -->
          <div class="dividerBox">
            <el-divider direction="vertical"></el-divider>
            <span>维修人信息</span>
          </div>
        </div>
      </el-form>

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
