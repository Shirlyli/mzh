<template>
  <div>
    <el-card class="card-wrapper card-wrapper-left">
      <div slot="header"
           class="clearfix">
        <span>{{title}}</span>
      </div>
      <!-- <ProTable :columns="columns"
                :formList="formList"
                @emit-handle-create="emitHandleCreate"></ProTable> -->
      <VexTable />
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
