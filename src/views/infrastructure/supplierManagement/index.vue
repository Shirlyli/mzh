<template>
  <div class="equipmentManagement">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>设备厂商管理</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                editColumns="['edit','del']"
                :toolbarBtns="['add', 'import', 'delete', 'export','downLoad']"
                @emit-handle-insert="handleInsert"
                @emit-handle-update="handleUpdate"
                @emit-handle-remove="handleRemove"
                @emit-handle-import="handleImport"
                @emit-handle-export="handleExport"
                :paramsConfig="paramsConfig" />
    </el-card>
    <!-- 模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               top="30px"
               width="60%"
               class="commonDialog"
               @close="handleDialogClose">
      <el-form ref="dataForm"
               :rules="rules"
               :model="supplierData"
               label-position="left"
               label-width="100px"
               >
        <el-row :gutter="24">
          <el-col :span="12"
                  v-for="(item,index) in basicFormList"
                  :key="index">
            <el-form-item :label="item.title"
                          label-width="120px"
                          :prop="item.field"
                          :rules="item.required ? [{required: true, message: '不能为空', trigger: 'change'}]:[{required: false}]">
              <!-- 普通输入框 -->
              <el-input v-model="supplierData[item.field]"
                        :placeholder="`请输入${item.title}`"
                        v-if="item.type === 'input'" />
              <!-- 下拉框 -->
              <el-select v-model="supplierData[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <!-- 时间 -->
              <el-date-picker v-model="supplierData[item.field]"
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
                        v-model="supplierData[item.field]">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 底部操作 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
        <!-- <el-button @click="handleReset">重置</el-button> -->

      </div>
    </el-dialog>

    <el-dialog title="导入"
               :visible="importDialogVisible"
               top="10%"
               class="commonDialog"
               @close="importDialogVisible = false">
               <!--                  :on-preview="handlePreview"
                 :on-remove="handleRemoveFile"
                 :before-remove="beforeRemove"
                 :headers="{'contentType': 'multipart/form-data;chartset:UTF-8'}"
                -->
      <el-upload class="upload-demo"
                 drag
                 action="#"
                :on-change="onFileChange"
                 :limit="3"
                 accept="'.xlsx','.xls'"
                 :on-exceed="handleExceed"
                 :file-list="fileList"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}

.upload-demo{
  text-align: center;
    padding: 30px;
}
</style>
