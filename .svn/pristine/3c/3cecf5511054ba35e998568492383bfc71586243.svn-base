<template>
  <div >
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>科室分类</span>
          </div>
          <Tree />
        </el-card>
      </template>
      <template #right>
        <RightContent :title="'科室查询'"/>
        <!-- <el-tabs v-model="activeName"
                 style="margin-top:15px"
                 type="border-card">
          <el-tab-pane v-for="item in tabMapOptions"
                       :key="item.key"
                       :label="item.label"
                       :name="item.key">
            <keep-alive>
              <tab-pane v-if="activeName === item.key"
                        :type="item.key"
                        @create="showCreatedTimes" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs> -->
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
