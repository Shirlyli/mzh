<template>
  <div class="personalCard">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>设备类别</span>
            <!-- <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="addNewEquipmentClass()">新增类别</el-button> -->
          </div>
          <Tree ref="vxeTree"
                :url="url"
                :params="treeParams"
                @emit-handle-click="handleNodeClick" />
        </el-card>
      </template>
      <template #right>
        <el-card class="card-wrapper card-wrapper-left">
          <div slot="header"
               class="clearfix">
            <span>设备查询</span>
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

    <!-- 新增模态框 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible.sync="dialogVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="equipmentCategoryData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'设备名称'"
                      prop="type">
          <el-input v-model="equipmentCategoryData.cName"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'备注'">
          <el-input v-model="equipmentCategoryData.note"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="请输入" />
        </el-form-item>
      </el-form>
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
