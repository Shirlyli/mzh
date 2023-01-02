<template>
  <div class="equipmentManagement">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>厂商联系人</span>
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
               :model="venderContactorFormData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'姓名'"
                      prop="lName">
          <el-input v-model="venderContactorFormData.lName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'职务'"
                      prop="lPosition">
          <el-input v-model="venderContactorFormData.lPosition"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'qq'"
                      prop="lQq">
          <el-input v-model="venderContactorFormData.lQq"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'电话'"
                      prop="lTelphone">
          <el-input v-model="venderContactorFormData.lTelphone"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'微信'"
                      prop="lChart">
          <el-input v-model="venderContactorFormData.lChart"
                    placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item :label="'邮箱'"
                      prop="lEmail">
          <el-input v-model="venderContactorFormData.lEmail"
                    placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item :label="'重要性'"
                      prop="lImportant">
          <el-select v-model="venderContactorFormData.lImportant"
                     transfer
                     placeholder="请选择">
            <el-option v-for="item in IMPORTANT"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'厂商'"
                      prop="linkId">
          <el-input v-model="venderContactorFormData.linkId"
                    placeholder="请输入厂商"></el-input>
        </el-form-item>
        <el-form-item :label="'备注'"
                      prop="note">
          <el-input v-model="venderContactorFormData.note"
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
