<template>
  <div>
    <el-card class="card-wrapper card-wrapper-left">
      <div slot="header"
           class="clearfix">
        <span>设备查询</span>
      </div>
      <ProTable :columns="columns"
                :formList="formList"
                @emit-handle-create="emitHandleCreate"></ProTable>
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
