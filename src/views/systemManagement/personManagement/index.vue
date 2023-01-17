<template>
  <div class="commonContainerBox hasLeftMainContent">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>组织机构</span>
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
            <span>用户查询</span>
          </div>
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    editColumns="['edit','del']"
                     :toolbarBtns="['add', 'import', 'delete', 'export']"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    @emit-handle-search="handleSearchForDetail"
                    :paramsConfig="paramsConfig" />
        </el-card>
      </template>
    </main-sub-layout>
    <!-- 模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="handleDialogClose"
               top="30px"
               class="commonDialog"
               width="80%">
      <el-form ref="dataForm"
               :rules="rules"
               :model="personalData"
               label-position="left"
               label-width="80px"
               style="width: 100%">
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8">
            <el-form-item :label="'登录账号'"
                          prop="eName">
              <el-input v-model="personalData.eName"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户姓名'"
                          prop="citizenNo">
              <el-input v-model="personalData.citizenNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户密码'"
                          prop="birth">
              <el-input v-model="personalData.birth"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'确认密码'"
                          prop="nation">
              <el-input v-model="personalData.nation"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'所属角色'"
                          prop="phoneNo">
              <el-input v-model="personalData.phoneNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'所属科室'"
                          prop="officeNo">
              <el-input v-model="personalData.officeNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
