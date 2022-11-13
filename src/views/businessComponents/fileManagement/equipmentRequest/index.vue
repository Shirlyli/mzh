<template>
  <div>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>科室申请</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text"
                   @click="addEquipmentRequest">新增</el-button>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               type="card">
        <el-tab-pane label="待处理任务"
                     name="toDoTask">
          <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    type="process"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    :paramsConfig="paramsConfig" />
        </el-tab-pane>
        <el-tab-pane label="已处理任务"
                     name="dealTask">已处理任务</el-tab-pane>
      </el-tabs>

    </el-card>
    <!-- 新增模态框 -->
    <el-drawer title="我是标题"
               :visible.sync="dialogVisible"
               :direction="rtl"
               size="50%"
               @close="dialogVisible = false">
      <vxe-form :data="equipmentProcessData"
                :items="formItems"
                titleColon>
        <template #applyDept="{ data }">
          <!-- <vxe-select v-model="data.applyDept"
                      placeholder="请选择"
                      option-props="{title,id}"
                      :options="applyDeptData">

          </vxe-select> -->
          <tree-select  
                       :options="applyDeptData"
                       :default-expand-level="1"
                       placeholder="请选择"
                       v-model="data.applyDept">
            <label slot="option-label"
                   slot-scope="{ node }">
              {{ node.title }}
            </label>
          </tree-select>
        </template>
        <template #applyPerson="{ data }">
          <vxe-select v-model="data.applyPerson"
                      placeholder="请选择"
                      :options="applyDeptData">
          </vxe-select>

        </template>
        <template #applyDetailId="{ data }">
          <vxe-select v-model="data.applyDept"
                      placeholder="请选择"
                      :options="applyDeptData">
          </vxe-select>

        </template>
        <template #enclosureId="{ data }">
          <vxe-select v-model="data.enclosureId"
                      placeholder="请选择"
                      :options="applyDeptData">
          </vxe-select>

        </template>
        <template #nextNodeExecutor="{ data }">
          <vxe-select v-model="data.nextNodeExecutor"
                      placeholder="请选择"
                      :options="applyDeptData">
          </vxe-select>

        </template>
        <template #operator="{ data }">
          <vxe-select v-model="data.operator"
                      placeholder="请选择"
                      :options="applyDeptData">
          </vxe-select>

        </template>
      </vxe-form>
    </el-drawer>
  </div>

</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.vxe-form {
  padding: 12px 40px;
}
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
