<template>
  <div class="p-md">
    <!-- 列表 -->
    <el-card>
      <VexTable :formConfig="formConfig"
                :columns="columns"
                :tableData="tableData"
                @emit-handle-insert="insertMenuData" />
    </el-card>

    <!-- 新增模态框 -->
    <AddDialog :dialogFormVisible="dialogFormVisible" :dialogStatus="dialogStatus"/>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
</style>
