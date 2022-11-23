<template>
  <div class="p-md">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>菜单管理</span>
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
            <span>菜单</span>
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
    </main-sub-layout>

    <!-- 新增模态框 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="dialogVisible = false">
      <!-- 主体区域 -->
      <el-form ref="dataForm"
               :rules="rules"
               :model="menuData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'菜单名称'"
                      prop="mName">
          <el-input v-model="menuData.mName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="'菜单编号'"
                      prop="mCode">
          <el-input v-model="menuData.mCode"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'菜单路由'"
                      prop="mUrl">
          <el-input v-model="menuData.mUrl"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'菜单类型'"
                      prop="mType">
          <el-select v-model="menuData.mType"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item :label="'菜单图标'"
                      prop="mIcon">
          <el-input v-model="menuData.mIcon"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'父菜单名称'"
                      prop="pName">
          <el-input v-model="menuData.pName"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'是否启用'"
                      prop="mIsavailable">
          <el-radio v-model="menuData.mIsavailable"
                    label="0">不启用</el-radio>
          <el-radio v-model="menuData.mIsavailable"
                    label="1">启用</el-radio>
        </el-form-item>
        <el-form-item :label="'描述'"
                      prop="mDesc">
          <el-input v-model="menuData.mDesc"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'备注'"
                      prop="note">
          <el-input v-model="menuData.note"
                    placeholder="请输入" />
        </el-form-item>
        <el-form-item :label="'菜单类型'"
                      prop="mType">
          <el-select v-model="menuData.mType"
                     placeholder="菜单类型">
            <el-option label="目录"
                       value="1"></el-option>
            <el-option label="菜单"
                       value="2"></el-option>
            <el-option label="按钮"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'父级菜单'"
                      prop="pName">
          <el-input v-model="menuData.pName"
                    disabled="disabled" />
        </el-form-item>
        <el-form-item :label="'父级菜单ID'"
                      prop="pid">
          <el-input v-model="menuData.pid"
                    disabled="disabled" />
        </el-form-item>
        <el-form-item :label="'是否启用'"
                      prop="mIsavailable">
          <el-select v-model="menuData.mIsavailable"
                     placeholder="是否启用">
            <el-option label="启用"
                       value="1"></el-option>
            <el-option label="禁用"
                       value="0"></el-option>
          </el-select>
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
</style>
