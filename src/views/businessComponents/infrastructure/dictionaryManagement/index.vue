<template>
  <div>
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典管理</span>
          </div>
          <Tree ref="vxeTree"
                :url="url"
                :params="treeParams"
                @emit-handle-click="handleNodeClick" />
        </el-card>
      </template>
      <template #right>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig" />
        </el-card>
      </template>
    </main-sub-layout>

    <!--  -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="commonData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'上级字典'"
                      prop="parentId">
          <el-input v-model="commonData.parentName"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'字典名称'"
                      prop="departmentName">
          <el-input v-model="commonData.departmentName"
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
.tab-container {
  margin: 30px;
}
</style>
