<template>
  <div class="personalCard">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>科室分类</span>
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
                    editColumns="['edit','del']"
                    :toolbarBtns="[]"
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
               :model="departmentData"
               label-position="left"
               label-width="100px"
               style="">
        <el-row :gutter="20">
          <!-- <el-col :span="12">
            <el-form-item :label="'上级科室Id'"
                          prop="parentId">
              <el-input v-model="departmentData.parentId"
                        placeholder=""
                        readonly="readonly"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item :label="'上级科室'"
                          prop="parentId">
              <el-input v-model="departmentData.parentName"
                        placeholder="请选择"
                        readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'科室名称'"
                          prop="departmentName">
              <el-input v-model="departmentData.departmentName"
                        placeholder="请输入科室名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'科室编码'"
                          prop="departmentCode">
              <el-input v-model="departmentData.departmentCode"
                        placeholder="自动生成"
                        readonly="readonly" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'科室座机'"
                          prop="departmentMobile">
              <el-input v-model="departmentData.departmentMobile"
                        placeholder="请输入科室座机" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'是否启用'"
                          prop="departmentStatus">
              <el-radio-group v-model="departmentData.departmentStatus">
                <el-radio label="0">不启用
                </el-radio>
                <el-radio label="1">启用
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所在医院'"
                          prop="companyInfoId"
                          style="display: none;">
              <el-input v-model="departmentData.companyInfoId"
                        placeholder="请输入所在医院" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所在医院'"
                          prop="companyInfoName">
              <el-input v-model="departmentData.companyInfoName"
                        placeholder="请输入所在医院" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所在楼栋楼层'"
                          prop="departmentDicid">
              <el-input v-model="departmentData.departmentDicid"
                        placeholder="请输入所在楼栋楼层" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'层级代码'"
                          prop="xpath">
              <el-input v-model="departmentData.xpath"
                        placeholder="自动生成"
                        readonly="readonly" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'备注'">
              <el-input v-model="departmentData.note"
                        :autosize="{minRows: 5, maxRows: 8}"
                        type="textarea"
                        placeholder="请输入备注" />
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
