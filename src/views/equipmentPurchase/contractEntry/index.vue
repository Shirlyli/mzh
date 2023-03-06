<template>
  <div>
    <el-card class="commonContainerBox hasLeftMainContent">
      <div slot="header"
           class="clearfix">
        <span>合同录入</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="[]"
                  hasNotSlotButton="add"
                  :toolbarBtns="[]"
                  :paramsConfig="paramsConfig" />
      </keep-alive>
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.tsx"></script>
