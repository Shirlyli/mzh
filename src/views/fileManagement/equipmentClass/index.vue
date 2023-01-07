<template>
  <div class="personalCard">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>科室类别</span>
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
                    editColumns="['edit','del']"
                    :toolbarBtns="[]"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    @emit-handle-search="handleSearchForDetail"
                    :paramsConfig="paramsConfig"
                    type="equipmentSearch" />
        </el-card>
      </template>
    </main-sub-layout>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>
