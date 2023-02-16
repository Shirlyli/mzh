<template>
  <div>
    <vxe-grid ref="xGrid"
              size="mni"
              v-bind="gridOptions"
              :loading="loading"
              :data="tableData"
              :tablePage="tablePage"
              :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
              :toolbar-config="tableToolbar"
              @checkbox-change="handleChange">

      <!-- 自定义工具栏 -->
      <template #toolbar_buttons>
        <vxe-button @click="insertEvent"
                    v-if="toolbarBtns.includes('addProcess')"
                    status="primary">生成申请单</vxe-button>

        <vxe-button @click="insertEvent"
                    size="mini"
                    v-if="toolbarBtns.includes('add')"
                    status="primary">新增</vxe-button>
        <vxe-button @click="groupRemove"
                    size="mini"
                    v-if="toolbarBtns.includes('delete')"
                    status="warning">批量删除</vxe-button>
        <vxe-button @click="associateRole"
                    size="mini"
                    v-if="hasAssociate">关联角色</vxe-button>
        <vxe-button v-if="toolbarBtns.includes('import')"
                    @click="handleImport">导入</vxe-button>

        <vxe-button v-if="toolbarBtns.includes('downLoad')"
                    @click="downLoadXlsx">下载模板</vxe-button>

        <!-- <vxe-button @click="$refs.xGrid.exportData()"
                    v-if="toolbarBtns.includes('export')">导出</vxe-button> -->
      </template>
      <template #add_button>

      </template>
      <template #department="{row}">
        <span>{{row.department?row.department.name :'-'}}</span>
      </template>

      <!-- 表单查询项 -->
      <template #create_time="{data}">
        <el-date-picker v-model="data.createTime"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </template>
      <template #departmentSelect="{data}">
        <div>
          <treeselect :options="BussniessDepartmentData"
                      v-model="data.deparmentId"
                      clearable
                      search-nested
                      :disable-branch-nodes="true"
                      placeholder="请选择" />
          <!-- <el-select v-model="deparmentId"
                     placeholder="请选择"
                     multiple
                     @remove-tag="removeTag"
                     collapse-tags>
            <el-tree node-key="id"
                     ref="departmentTree"
                     :data="BussniessDepartmentData"
                     show-checkbox
                     @check-change="checkChange"
                     accordion
                     :props="{
                                  children: 'children',
                                  label: 'title'
                                 }"
                     class="add_tree"
                     :expand-on-click-node="false"
                     :check-on-click-node="true">
              <span class="custom-tree-node"
                    slot-scope="{data}">
                <el-option style="padding: 0"
                           :label="data.title"
                           :value="data.id"></el-option>
              </span>
            </el-tree>
          </el-select> -->

        </div>
      </template>
      <template #operate_item>
        <vxe-button type="submit"
                    status="success"
                    content="查询"
                    @click="searchFor"></vxe-button>
        <vxe-button type="reset"
                    content="重置"
                    @click="resetFor"></vxe-button>
      </template>

      <!-- 表格操作 -->
      <template #operateHasSearch="{row}">
        <vxe-button content="查看"
                    v-if="editColumns.includes('search')"
                    @click="searchForDetails(row)"></vxe-button>
        <vxe-button content="编辑"
                    v-if="editColumns.includes('edit')"
                    @click="editRowEvent(row)"
                    status="success"></vxe-button>
        <vxe-button content="审批"
                    v-if="editColumns.includes('approval')"
                    @click="editRowEvent(row)"
                    status="success"></vxe-button>
        <vxe-button content="操作记录"
                    v-if="editColumns.includes('record')"
                    @click="handleRecord(row)"></vxe-button>
        <vxe-button content="删除"
                    status='warning'
                    v-if="editColumns.includes('del')"
                    @click="removeRowEvent(row)"></vxe-button>
        <vxe-button content="验收"
                    status='success'
                    v-if="editColumns.includes('acceptance')"
                    @click="acceptanceRowEvent(row)"></vxe-button>
        <vxe-button content="入库"
                    status='success'
                    v-if="editColumns.includes('inwarehousing')"
                    @click="warehousingRowEvent(row)"></vxe-button>
        <vxe-button content="出库"
                    status='success'
                    v-if="editColumns.includes('outwarehousing')"
                    @click="warehousingRowEvent(row)"></vxe-button>
      </template>

      <!--分页 -->
      <template #pager>
        <vxe-pager :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
                   :current-page.sync="tablePage.currentPage"
                   :page-size.sync="tablePage.pageSize"
                   :total="tablePage.total"
                   @page-change="handlePageChange">
        </vxe-pager>
      </template>

    </vxe-grid>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style scoped lang="scss">
.el-select,
.el-select--medium {
  width: 100%;
}
</style>
