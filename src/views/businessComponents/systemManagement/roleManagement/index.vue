<template>
  <div>
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典管理</span>
          </div>
          <Tree />
        </el-card>
      </template>
      <template #right>
        <VexTable />
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
