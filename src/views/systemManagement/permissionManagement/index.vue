<template>
  <div class="commonContainerBox hasLeftMainContent">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>角色列表</span>
          </div>
          <Tree ref="vxeTree"
                :url="url"
                :params="treeParams"
                @emit-handle-click="handleNodeClick" />
        </el-card>
      </template>
      <template #right>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>菜单权限</span>
            <div style="float: right"
                 v-show="hasChecked">
              <el-button style="padding: 3px 0"
                         type="text"
                         @click="handleDel">取消</el-button>
              <el-button style=" padding: 3px 0"
                         type="text"
                         @click="handleSave">保存</el-button>
            </div>
          </div>
          <el-tree ref="menuTree"
                   :data="menuData"
                   show-checkbox
                   node-key="id"
                   :props="defaultProps"
                   :highlight-current="true"
                   :expand-on-click-node="false"
                   :filter-node-method="filterNode"
                   :default-expand-all="true"
                   @check="handleChecked"
                 >
          </el-tree>
        </el-card>
      </template>
    </main-sub-layout>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
</style>
