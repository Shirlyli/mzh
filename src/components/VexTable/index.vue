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

<script lang="ts">
import { getTableDataList } from '@/api/equipment'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import VXETable from 'vxe-table'
import { Message } from 'element-ui'
import { BusinessViewModule } from '@/store/modules/business'
import Treeselect from '@riophae/vue-treeselect'

// import type { TreeSelectProps } from 'ant-design-vue'
@Component({
  name: 'VexTable',
  components: { Treeselect }
})
export default class extends Vue {
  @Prop({ default: ['add', 'import', 'delete', 'export'] }) toolbarBtns!: any
  @Prop({ default: {} }) formConfig!: any
  @Prop({ default: [] }) columns!: []
  @Prop() paramsConfig!: any
  @Watch('paramsConfig', { immediate: true })
  public onParamsConfigChange(newdata: any) {
    this.findList(newdata)
  }

  @Prop({ default: false }) hasAssociate!: boolean // 是否含有关联角色
  @Prop({ default: '' }) hasNotSlotButton!: any // 是否含有操作按钮
  @Prop({ default: ['search', 'edit', 'del', 'record'] }) editColumns!: any
  @Prop() type!: string // 表格类型
  public tablePage = { total: 0, currentPage: 1, pageSize: 10 }
  public loading = false
  public tableData = []
  public gridOptions: any = {
    border: true,
    showOverflow: true,
    height: 'auto',
    exportConfig: {},
    rowConfig: {
      keyField: 'id'
    },
    treeConfig: {
      transform: true,
      rowField: 'id'
      // parentField: 'pid',
      // iconOpen: 'vxe-icon-square-minus-fill',
      // iconClose: 'vxe-icon-square-plus-fill',
      // hasChild: 'hasChild', // 设置是否有子节点标识
    },
    checkboxConfig: {
      // labelField: 'id',
      // 设置复选框支持分页勾选，需要设置 rowId 行数据主键
      reserve: true
    },
    formConfig:
      {
        ...this.formConfig,
        titleWidth: 100,
        titleAlign: 'right'
      } ?? {},
    columns: this.columns // 列表项数据
  }

  // 自定义工具栏
  public tableToolbar = {
    perfect: true,
    // refresh: true,
    zoom: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons'
    }
  }

  public checkedList = [] // 已选列
  public fileList = []
  // 获取列表数据
  public async findList(config: any) {
    this.loading = true
    this.checkedList = []
    try {
      const res: any = await getTableDataList(config.url, config.params)
      if ((res.result || res.code === 200) && res.data) {
        if (this.type === 'equipmentSearch') {
          this.tableData = res.data.map((item: any) => {
            return { ...item, ...item.equipmentVO }
          })
          this.tablePage.total = res.count
        } else if (this.type === 'transferApply') {
          this.tableData = res.data.map((item: any) => {
            return { ...item, ...item.billApproveList[0], ...item.billMain }
          })
          this.tablePage.total = res.count
        } else {
          this.tableData = res.data
          this.tablePage.total = res.count
        }
      } else {
        this.tableData = []
        this.tablePage.total = 0
      }
    } catch (error) {
      console.log('🚀 ~ error', error)
      this.tableData = []
    }

    this.loading = false
  }

  // 查询
  public searchFor() {
    this.paramsConfig.params.entity = {
      ...this.paramsConfig.params.entity,
      ...this.formConfig.data
    }
    this.findList(this.paramsConfig)
  }

  // 重置并查询
  public query = this.$route.path
  public resetFor() {
    this.formConfig.data = {}
    const status =
      this.query.indexOf('CGX') > -1
        ? '0'
        : this.query.indexOf('YSQ') > -1
          ? ''
          : this.query.indexOf('DSP') > -1
            ? '1'
            : ''
    if (Object.keys(this.paramsConfig.params.entity).includes('status')) {
      this.paramsConfig.params.entity = { status }
    }
    this.findList(this.paramsConfig)
  }

  // 编辑
  @Emit()
  emitHandleUpdate(rowData: any) {
    return rowData
  }

  public editRowEvent = (row: any) => {
    this.emitHandleUpdate(row)
  }

  // 保存
  public saveRowEvent = () => {
    const $grid: any = (this.$refs as any).xGrid
    ;($grid as any).clearActived().then(() => {
      this.gridOptions.loading = true
      setTimeout(() => {
        this.gridOptions.loading = false
        // VXETable.modal.message({ content: '保存成功！', status: 'success' })
      }, 300)
    })
  }

  // 删除
  @Emit()
  emitHandleRemove(rowData: any) {
    return rowData
  }

  public removeRowEvent = async(row: any) => {
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
      this.emitHandleRemove(row)
    }
  }

  // 新增
  @Emit()
  emitHandleInsert(rowData: any) {
    return rowData
  }

  public insertEvent() {
    if (this.type === 'process') {
      this.emitHandleInsert(this.checkedList)
    } else if (this.type !== 'process') {
      this.emitHandleInsert([])
    } else {
      Message.error('请选择流程后新增！')
    }
  }

  // 分页切换事件
  public handlePageChange(pageConfig: any) {
    console.log('🚀 ~ pageConfig', pageConfig)
    this.tablePage.currentPage = pageConfig.currentPage
    this.tablePage.pageSize = pageConfig.pageSize
    this.paramsConfig.params.page = pageConfig.currentPage
    this.paramsConfig.params.limit = pageConfig.pageSize
    this.findList(this.paramsConfig)
  }

  // 批量删除
  public async groupRemove() {
    if (!this.checkedList.length) {
      Message.error('请选择后进行操作！')
      return
    }
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
      this.emitHandleRemove(this.checkedList)
    }
  }

  // 手动勾选并且值发生改变时触发的事件
  public handleChange(checked: any) {
    this.checkedList = checked.records
  }

  // 查看
  @Emit()
  emitHandleSearch(rowData: any) {
    return rowData
  }

  public searchForDetails(row: any) {
    this.emitHandleSearch(row)
  }

  // 关联角色
  @Emit()
  emitAssociateRole(value: any) {
    return value
  }

  public associateRole() {
    if (!this.checkedList.length) {
      Message.error('请选择菜单后进行操作！')
      return
    } else if (this.checkedList.length > 1) {
      Message.error('请单次操作一条数据')
      return
    }
    this.emitAssociateRole(this.checkedList)
  }

  // 操作记录
  @Emit()
  emitHandleRecord(value: any) {
    return value
  }

  public handleRecord(row: any) {
    this.emitHandleRecord(row)
  }

  // 操作科室数据
  private handleDepartData(datas: any) {
    return datas.map((item: any) => {
      if (item.children.length) {
        return {
          id: item.id,
          label: item.title,
          children: this.handleDepartData(item.children)
        }
      }
      return { id: item.id, label: item.title }
    })
  }

  get BussniessDepartmentData() {
    const resData = this.handleDepartData(BusinessViewModule.departmentData)
    return resData
  }

  @Emit()
  emitHandleImport(value: any) {
    return value
  }

  public handleImport(row: any) {
    this.emitHandleImport(row)
  }

  // 下载模板
  @Emit()
  emitHandleExport() {
    console.log('sss')
  }

  public downLoadXlsx() {
    this.emitHandleExport()
  }

  // 验收
  @Emit()
  emitHandleAcceptanceRow(value: any) {
    return value
  }

  public acceptanceRowEvent(row: any) {
    this.emitHandleAcceptanceRow(row)
  }

  // 出入库
  @Emit()
  emitHandleWarehousing(value: any) {
    return value
  }

  public warehousingRowEvent(row: any) {
    this.emitHandleWarehousing(row)
  }

  // 科室选中事件
  public deparmentId = null
  // public checkChange(
  //   checkArr: any,
  //   isChecked: boolean,
  //   isChildChecked: boolean
  // ) {
  //   console.log(
  //     '🚀 ~ checkArr',
  //     checkArr,
  //     'isChecked',
  //     isChecked,
  //     'isChildChecked',
  //     isChildChecked
  //   )

  //   const checkedNodes = (this.$refs.departmentTree as any).getCheckedNodes()
  //   this.paramsConfig.params.entity = {
  //     department: checkedNodes.map((item: any) => item.id)
  //   }
  //   this.deparmentId = checkedNodes
  //     .filter((some: any) => !some.disabled)
  //     .map((item: any) => item.label)
  // }

  // 多选模式下移除tag时触发
  // public removeTag(values: any) {
  //   console.log('🚀 ~ values', values)
  //   const checkedNodes = (this.$refs.departmentTree as any).getCheckedNodes()
  //   const filterNodes = checkedNodes
  //     .filter((some: any) => !some.disabled && some.title !== values)
  //     .map((item: any) => item.id)
  //   console.log('🚀 ~ filterNodes', filterNodes)
  //   ;(this.$refs.departmentTree as any).setCheckedKeys(filterNodes)

  //   console.log('🚀 ~ checkedNodes', checkedNodes)
  // }
}
</script>

<style scoped lang="scss">
.el-select,
.el-select--medium {
  width: 100%;
}
</style>
