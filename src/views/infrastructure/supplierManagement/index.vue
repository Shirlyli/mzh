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
                :toolbarBtns="[]"
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
               :model="supplierData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'厂商名称'"
                      prop="name">
          <el-input v-model="supplierData.name"
                    placeholder="请输入厂商名称"></el-input>
        </el-form-item>
        <el-form-item :label="'厂商简称'"
                      prop="nameAbbreviation">
          <el-input v-model="supplierData.nameAbbreviation"
                    placeholder="请输入厂商简称"></el-input>
        </el-form-item>
        <el-form-item :label="'厂商类型'"
                      prop="suppliesType">
          <el-select v-model="supplierData.suppliesType"
                     transfer
                     placeholder="请选择">
            <el-option v-for="item in suppliesTypeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'资产性质'"
                      prop="assetsPro">
          <el-input v-model="supplierData.assetsPro"
                    placeholder="请输入资产性质"></el-input>
        </el-form-item>
        <el-form-item :label="'座机电话'"
                      prop="hPhone">
          <el-input v-model="supplierData.phoneNo"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'备注'"
                      prop="note">
          <el-input v-model="supplierData.note"
                    placeholder="请选择"></el-input>
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
