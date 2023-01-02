<template>
  <div class="personalCard">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>医院管理</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                editColumns="['edit','del']"
                @emit-handle-insert="handleInsert"
                @emit-handle-update="handleUpdate"
                @emit-handle-remove="handleRemove"
                :paramsConfig="paramsConfig" />
    </el-card>
    <!-- 模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               top="30px"
               class="commonDialog"
               @close="handleDialogClose">
      <el-form ref="dataForm"
               :rules="rules"
               :model="hospitalData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'医院名称'"
                      prop="hName">
          <el-input v-model="hospitalData.hName"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'医院地址'"
                      prop="hAddress">
          <el-input v-model="hospitalData.hAddress"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'医院等级'"
                      prop="hLevel">
          <el-select v-model="hospitalData.hLevel"
                     transfer
                     placeholder="请选择">
            <el-option v-for="item in hLevelList"
                       :key="item.title"
                       :value="item.code"
                       :label="item.title">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'医院类型'"
                      prop="hType">
          <el-input v-model="hospitalData.hType"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'电话'"
                      prop="hPhone">
          <el-input v-model="hospitalData.hPhone"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'描述'"
                      prop="note">
          <el-input v-model="hospitalData.note"
                    :autosize="{minRows: 5, maxRows: 8}"
                    type="textarea"
                    placeholder="请输入描述" />
        </el-form-item>

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
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
