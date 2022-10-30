<template>
  <div>
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典管理</span>
          </div>
          <Tree :url="url" :params="treeParams"/>
        </el-card>
      </template>
      <template #right>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典</span>
          </div>
          <VexTable :columns="columns" :loading="loading" :tableData="tableData" :formConfig="{}"/>
        </el-card>
      </template>
    </main-sub-layout>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
