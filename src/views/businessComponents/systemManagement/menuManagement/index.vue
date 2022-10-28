<template>
  <div class="p-md">
    <el-card>
      <VexTable :formConfig="formConfig" :columns="columns"/>
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
