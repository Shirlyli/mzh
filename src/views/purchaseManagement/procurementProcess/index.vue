<template>
  <div class="noSearch hasLeftMainContent">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>流程名称</span>
            <i class="el-icon-plus addBtn"
               style="float: right"
               @click="addProcess"></i>
          </div>
          <Tree ref="vxeTree"
                :url="url"
                type="process"
                :params="treeParams"
                @emit-handle-click="handleNodeClick" />
        </el-card>
      </template>
      <template #right>
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
                    :toolbarBtns="['add', 'import', 'delete', 'export']"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig" />
        </el-card>
      </template>
    </main-sub-layout>

    <!-- 新增模态框 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               top="30px"
               class="commonDialog"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="processData"
               label-position="left"
               label-width="120px"
               style="margin:20px 20px;">
        <el-form-item :label="'流程名称'"
                      prop="processName">
          <el-input v-model="processData.processName"
                    placeholder="请选择"
                    :disabled="dialogStatus==='create'?false:true"></el-input>
        </el-form-item>
        <el-form-item :label="'流程代码'"
                      prop="processCode">
          <el-input v-model="processData.processCode"
                    placeholder="请输入"
                    :disabled="dialogStatus==='create'?false:true" />
        </el-form-item>
        <el-form-item :label="'节点名称'"
                      prop="nodeName"
                      :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
          <el-input v-model="processData.nodeName"
                    placeholder="请输入"
                    :disabled="dialogStatus==='create'?false:true" />
        </el-form-item>
        <el-form-item :label="'节点名称编码'"
                      prop="nodeNameCode"
                      :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
          <el-input v-model="processData.nodeNameCode"
                    placeholder="请输入"
                    :disabled="dialogStatus==='create'?false:true" />
        </el-form-item>
        <el-form-item :label="'节点顺序'"
                      prop="nodeSort">
          <el-input v-model="processData.nodeSort"
                    placeholder="请输入"
                    :disabled="dialogStatus==='create'?false:true" />
        </el-form-item>
        <el-form-item :label="'是否禁用'"
                      prop="isDisable">
          <el-radio v-model="processData.isDisable"
                    :label="0">是</el-radio>
          <el-radio v-model="processData.isDisable"
                    :label="1">否</el-radio>
        </el-form-item>
        <el-form-item :label="'角色类型'"
                      prop="roleType"
                      :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
          <el-radio v-model="processData.roleType"
                    label="role"
                    @change="onRoleTypeChange">角色</el-radio>
          <el-radio v-model="processData.roleType"
                    label="user"
                    @change="onRoleTypeChange">用户</el-radio>
        </el-form-item>
        <el-form-item :label="'角色名称'"
                      prop="roleTypeId"
                      v-if="processData.roleType==='role'"
                      :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
          <el-select v-model="processData.roleTypeId"
                     placeholder="请选择"
                     filterable>
            <!-- item.userId -->
            <el-option :label="item.title"
                       :value="item.id"
                       v-for="(item) in roleData"
                       :key="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'用户名称'"
                      prop="roleTypeId"
                      v-else-if="processData.roleType==='user'"
                      :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
          <el-select v-model="processData.roleTypeId"
                     placeholder="请选择"
                     multiple
                     filterable>
            <!-- item.userId -->
            <el-option :label="item.title"
                       :value="item.userId"
                       v-for="(item) in roleData"
                       :key="item.userId"></el-option>
          </el-select>
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
.addBtn {
  border: 1px solid #ccc;
  padding: 3px;
  &:hover {
    cursor: pointer;
  }
}
.edit-input {
  padding-right: 100px;
}

.el-select,.el-select--medium{
  width:100%
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
