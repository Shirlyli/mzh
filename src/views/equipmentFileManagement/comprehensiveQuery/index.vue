<template>
  <div class="triggerContainerBox hasLeftMainContent">
    <el-card class="card-wrapper card-wrapper-left">
      <div slot="header"
           class="clearfix">
        <span>综合查询</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                editColumns="[]"
                :toolbarBtns="[]"
                @emit-handle-insert="handleInsert"
                @emit-handle-update="handleUpdate"
                @emit-handle-remove="handleRemove"
                @emit-handle-search="handleSearchForDetail"
                :paramsConfig="paramsConfig"
                type="equipmentSearch" />
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
