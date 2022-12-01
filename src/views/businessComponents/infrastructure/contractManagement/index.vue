<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>合同管理</span>
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
               @close="handleDialogClose">
      <el-form ref="dataForm"
               :rules="rules"
               :model="contractFormData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'合同名称'"
                      prop="cName">
          <el-input v-model="contractFormData.cName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'合同编码'"
                      prop="cCode">
          <el-input v-model="contractFormData.cCode"
                    placeholder="请输入合同编码"></el-input>
        </el-form-item>
        <el-form-item :label="'厂商ID'"
                      prop="supplierId">
          <el-input v-model="contractFormData.supplierId"
                    placeholder="请输入厂商ID"></el-input>
        </el-form-item>
        <el-form-item :label="'合同总金额'"
                      prop="cTotal">
          <el-input v-model="contractFormData.cTotal"
                    placeholder="请输入合同总金额"></el-input>
        </el-form-item>
        <el-form-item :label="'经办人'"
                      prop="cDefend">
          <el-input v-model="contractFormData.cDefend"
                    placeholder="请输入厂商简称"></el-input>
        </el-form-item>
        <el-form-item :label="'有效期限'"
                      prop="cEffective">
          <el-date-picker v-model="contractFormData.cEffective"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="'签订日期'"
                      prop="cSignDate">
          <el-date-picker v-model="contractFormData.cSignDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="'附件'"
                      prop="cAttahUrl">
          <el-upload class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :on-remove="handleRemoveField"
                     :before-remove="beforeRemove"
                     multiple
                     :limit="3"
                     :on-exceed="handleExceed"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
          </el-upload>
          <!-- <el-input v-model="contractFormData.cAttahUrl"
                    placeholder="请输入厂商简称"></el-input> -->
        </el-form-item>
        <el-form-item :label="'备注'"
                      prop="note">
          <el-input v-model="contractFormData.note"
                    placeholder="请输入"></el-input>
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
