<template>
  <div class="app-container">
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             type="card">
      <el-tab-pane label="申请历史"
                   name="applyHistory">申请历史</el-tab-pane>
      <el-tab-pane label="待处理任务"
                   name="toDoTask">待处理任务</el-tab-pane>
      <el-tab-pane label="已处理任务"
                   name="dealTask">已处理任务</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'WorkBench',
})
export default class extends Vue {
  private listLoading = true
  private activeName = 'applyHistory'

  created() {}

  private handleClick() {}
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
