<template>
  <div class="noSearch hasLeftMainContent">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>字典管理</span>
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
            <span>字典列表</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    editColumns="['edit','del']"
                     :toolbarBtns="['add', 'import', 'delete', 'export']"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig" />
        </el-card>
      </template>
    </main-sub-layout>

    <!--  -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               top="30px"
               class="commonDialog"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="commonData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'上级字典ID'"
                      prop="pid">
          <el-input v-model="commonData.pid"
                    placeholder="自动生成"
                    disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item :label="'上级字典名称'"
                      prop="pName">
          <el-input v-model="commonData.pName"
                    placeholder="自动生成"
                    disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item :label="'字典类型'"
                      prop="dicType">
          <el-input v-model="commonData.dicType"
                    placeholder="自动生成"
                    disabled="disabled" />
        </el-form-item>
        <el-form-item :label="'字典名称'"
                      prop="dicName">
          <el-input v-model="commonData.dicName"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'字典编码'"
                      prop="dicCode">
          <el-input v-model="commonData.dicCode"
                    placeholder="可输入拼音简称" />
        </el-form-item>
        <el-form-item :label="'是否启用'"
                      prop="flag">
          <el-radio-group v-model="commonData.flag">
            <el-radio label="0">不启用
            </el-radio>
            <el-radio label="1">启用
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="'层级关系'"
                      prop="xpath">
          <el-input v-model="commonData.xpath"
                    placeholder="自动生成"
                    disabled="disabled" />
        </el-form-item>
        <el-form-item :label="'备注'">
          <el-input v-model="commonData.note"
                    :autosize="{minRows: 5, maxRows: 8}"
                    type="textarea"
                    placeholder="请输入" />
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
