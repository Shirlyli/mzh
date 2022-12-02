<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>流程配置</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                type="process"
                editColumns="['edit','del']"
                @emit-handle-insert="handleInsert"
                @emit-handle-update="handleUpdate"
                @emit-handle-remove="handleRemove"
                :paramsConfig="paramsConfig" />
    </el-card>
    <!-- 新增模态框 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="processData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'流程名称'"
                      prop="processName">
          <el-input v-model="processData.processName"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'流程代码'"
                      prop="processCode">
          <el-input v-model="processData.processCode"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'节点名称'"
                      prop="nodeName">
          <el-input v-model="processData.nodeName"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'节点名称编码'"
                      prop="nodeNameCode">
          <el-input v-model="processData.nodeNameCode"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'节点顺序'"
                      prop="nodeSort">
          <el-input v-model="processData.nodeSort"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'是否禁用'"
                      prop="isDisable">
          <el-radio v-model="processData.isDisable"
                    :label="0">是</el-radio>
          <el-radio v-model="processData.isDisable"
                    :label="1">否</el-radio>
        </el-form-item>
        <el-form-item :label="'角色类型'"
                      prop="roleType">
          <el-radio v-model="processData.roleType"
                    label="role">role</el-radio>
          <el-radio v-model="processData.roleType"
                    label="user">user</el-radio>
        </el-form-item>
        <el-form-item :label="'角色类型Id'"
                      prop="roleTypeId">
          <el-input v-model="processData.roleTypeId"
                    placeholder="请输入" />
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
      </div>
    </el-dialog>
  </div>

</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
