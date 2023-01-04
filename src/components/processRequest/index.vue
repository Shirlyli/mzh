<template>
  <div class="processRequest">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>流程申请</span>
        <div class="demo-drawer__footer">
          <el-button size="mini"
                     @click="cancelProcess()">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="createProcess()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </div>
      <el-form ref="requestParams"
               :rules="rules"
               :model="requestParams"
               label-position="left"
               label-width="80px"
               style="margin-left:0;">

        <!-- 基本信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"
                  v-for="(item,index) in watchRequestForm.billMain"
                  :key="index">
            <el-form-item :label="item.title"
                          :prop="'billMain['+item.field+']'"
                          :rules="item.required ? [{required: true, message: '不能为空', trigger: 'change'}]:[{required: false}]">
              <el-input v-model="requestParams.billMain[item.field]"
                        :placeholder="`请输入${item.title}`"
                        v-if="item.type === 'input'" />
              <el-select v-model="requestParams.billMain[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <el-date-picker v-model="requestParams.billMain[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-DD">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 设备明细 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>设备明细 <el-button @click="addNewEquipment"
                       size="mini"
                       class="addBtn">+ 新增设备</el-button></span>

        </div>
        <el-row :gutter="24"
                v-for="(item,index) in watchRequestForm.billEquipmentList"
                :key="index">
          <el-col :span="24">
            <el-row :gutter="20"
                    class="singleRow">
              <el-col :span="7"
                      v-for="(equi) in item"
                      :key="equi.field">
                <el-form-item :label="equi.title"
                              :prop="'billEquipmentList['+index+']['+equi.field+']'"
                              :rules="equi.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]">
                  <el-input v-model="requestParams.billEquipmentList[index][equi.field]"
                            :placeholder="`请输入${equi.title}`"
                            v-if="equi.type === 'input'" />
                  <el-select v-model="requestParams.billEquipmentList[index][equi.field]"
                             v-if="equi.type === 'select'"
                             placeholder="请选择">
                    <el-option :label="optionValue.label"
                               :value="optionValue.value"
                               v-for="optionValue in equi.data"
                               :key="optionValue.value"></el-option>
                  </el-select>
                  <el-date-picker v-model="requestParams.billEquipmentList[index][equi.field]"
                                  v-if="equi.type === 'date'"
                                  type="date"
                                  placeholder="选择日期"
                                  value-format="yyyy-MM-DD">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button class="delete-btn"
                           size="large"
                           icon="el-icon-delete"
                           type="danger"
                           plain
                           @click="removeKey(item,index)"></el-button>
              </el-col>

            </el-row>

          </el-col>
        </el-row>

        <!-- 审批清单 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>审批清单</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"
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
                              value-format="yyyy-MM-DD">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

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
}

.addBtn {
  float: right;
}
</style>
