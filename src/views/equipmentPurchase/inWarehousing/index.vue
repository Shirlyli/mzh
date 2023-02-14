<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>入库</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['inwarehousing']"
                  hasNotSlotButton="add"
                  :toolbarBtns="[]"
                  type="equipmentSearch"
                  @emit-handle-warehousing="handleWarehousing"
                  :paramsConfig="paramsConfig" />
      </keep-alive>
    </el-card>

    <el-dialog title="入库"
               :visible.sync="dialogStatus"
               width="80%"
               center>
      <el-row :gutter="22"
              type="flex"
              justify="start"
              style="flex-wrap:wrap; flex-direction: row">
        <el-form ref="requestParams"
                 :rules="{}"
                 :model="requestParams"
                 label-position="left"
                 style="margin-left:0;">
          <el-col :span="12"
                  v-for="(item,index) in equipmentStores"
                  :key="index">
            <el-form-item :label="item.title"
                          label-width="120px"
                          :prop="'equipmentStores['+item.key+']'"
                          :rules="item.required ? [{required: true, message: '不能为空', trigger: 'change'}]:[{required: false}]">
              <!-- 普通输入框 -->
              <el-input v-model="requestParams.equipmentStores[item.key]"
                        :placeholder="`请输入${item.title}`"
                        v-if="item.type === 'input'" />
              <!-- 下拉框 -->
              <el-select v-model="requestParams.equipmentStores[item.key]"
                         placeholder="请选择"
                         v-if="item.type === 'select'">
                <el-option :label="options.label"
                           :value="options.value"
                           v-for="options in item.options"
                           :key="options.value"></el-option>
              </el-select>
              <!-- 时间 -->
              <el-date-picker v-model="requestParams.equipmentStores[item.key]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
              <!-- 多行文本框 -->
              <el-input type="textarea"
                        :rows="2"
                        v-if="item.type === 'textarea'"
                        placeholder="请输入内容"
                        v-model="requestParams.equipmentStores[item.key]">
              </el-input>
            </el-form-item>
          </el-col>

        </el-form>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStatus = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitInWarehousing()">确 定</el-button>
      </span>
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
}
</style>
