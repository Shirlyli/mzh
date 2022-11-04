<template>
  <div>
    <!-- <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>医院管理</span>
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
            <span>科室查询</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig" />
        </el-card>
      </template>
    </main-sub-layout> -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>科室查询</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                @emit-handle-insert="handleInsert"
                @emit-handle-update="handleUpdate"
                @emit-handle-remove="handleRemove"
                :paramsConfig="paramsConfig" />
    </el-card>
    <!-- 模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="handleDialogClose">
      <el-form ref="dataForm"
               :rules="rules"
               :model="hospitalData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'医院名称'"
                      prop="hName">
          <el-input v-model="hospitalData.hName"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'医院地址'"
                      prop="hAddress">
          <el-input v-model="hospitalData.hAddress"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'医院等级'"
                      prop="hLevel">
          <el-select v-model="hospitalData.hLevel"
                     transfer
                     placeholder="请选择">
            <el-option v-for="item in hLevelList"
                       :key="item.dicCode"
                       :value="item.dicCode"
                       :label="item.dicName">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'医院类型'"
                      prop="hType">
          <el-input v-model="hospitalData.hType"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'电话'"
                      prop="hPhone">
          <el-input v-model="hospitalData.hPhone"
                    placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item :label="'备注'"
                      prop="note">
          <el-input v-model="hospitalData.note"
                    placeholder="请选择"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部操作 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
        <!-- <el-button @click="handleReset">重置</el-button> -->

      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
