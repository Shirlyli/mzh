<template>
  <div class="hasLeftMainContent noSearch">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>设备类别树</span>
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
            <span>设备类别管理</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
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
               :visible.sync="dialogVisible"
               top="30px"
               class="commonDialog">
      <el-form ref="dataForm"
               :rules="rules"
               :model="equipmentCategoryData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'父级类别Id'"
                      prop="pid">
          <el-input v-model="equipmentCategoryData.pid"
                    placeholder="" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item :label="'父级类别名称'"
                      prop="pName">
          <el-input v-model="equipmentCategoryData.pName"
                    placeholder="请选择" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item :label="'类别名称'"
                      prop="cName">
          <el-input v-model="equipmentCategoryData.cName"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'医疗器械编码'"
                      prop="cHospCode">
          <el-input v-model="equipmentCategoryData.cHospCode"
                    placeholder="请选择" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item :label="'财务编码'"
                      prop="cFinancialCode">
          <el-input v-model="equipmentCategoryData.cFinancialCode"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'层级代码'"
                      prop="xpath">
          <el-input v-model="equipmentCategoryData.xpath"
                    placeholder="层级代码" readonly="readonly" />
        </el-form-item>
        <el-form-item :label="'备注'">
          <el-input v-model="equipmentCategoryData.note"
                    :autosize="{minRows: 5, maxRows: 8}"
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

<style lang="scss" scoped>
.el-card__body {
  overflow-y: scroll;
  height: 100%;
}
</style>
