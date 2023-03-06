<template>
  <div class="hasLeftMainContent commonContainerBox">
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
            <span>设备类别查询</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    editColumns="['edit','del']"
                    :toolbarBtns="['add', 'import', 'delete', 'export']"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig"
                    />
        </el-card>
      </template>
    </main-sub-layout>

    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               top="30px"
               class="commonDialog"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="categoryData"
               label-position="left"
               label-width="120px"
               style="width: 400px; margin-left:50px;">
               <el-form-item :label="'上级设备类别'"
                      prop="pName">
          <el-input v-model="categoryData.pName"
                    placeholder="请输入" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item :label="'设备类别名称'"
                      prop="cName">
          <el-input v-model="categoryData.cName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'类别单位'"
                      prop="cUnit">
          <el-input v-model="categoryData.cUnit"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'层级'"
                      prop="cLevel">
          <el-input v-model="categoryData.cLevel"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'类别编码'"
                      prop="cCode">
          <el-input v-model="categoryData.cCode"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'备注'">
          <el-input v-model="categoryData.note"
                    :autosize="{minRows: 5, maxRows: 8}"
                    type="textarea"
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
.el-card__body {
  overflow-y: scroll;
  height: 100%;
}
</style>
