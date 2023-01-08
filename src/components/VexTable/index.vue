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
        <!-- <vxe-button @click="$refs.xGrid.exportData()"
                    v-if="toolbarBtns.includes('import')">导入</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()"
                    v-if="toolbarBtns.includes('export')">导出</vxe-button> -->
      </template>

      <template #add_button>
        <vxe-button @click="insertEvent"
                    status="primary">生成申请单</vxe-button>
      </template>
      <template #department="{row}">
        <span>{{row.department?row.department.name :'-'}}</span>
      </template>
      <!-- 表单查询项 -->
      <template #create_time="{data}">
        <el-date-picker v-model="data.createtime"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
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
                    @click="editRowEvent(row)"></vxe-button>
        <vxe-button content="操作记录"
                    v-if="editColumns.includes('record')"
                    @click="handleRecord(row)"></vxe-button>
        <vxe-button content="删除"
                    status='warning'
                    v-if="editColumns.includes('del')"
                    @click="removeRowEvent(row)"></vxe-button>

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
@Component({
  name: 'VexTable',
  components: {}
})
export default class extends Vue {
  @Prop({ default: ['add', 'import', 'delete', 'export'] }) toolbarBtns!: any
  @Prop({ default: {} }) formConfig!: any
  @Prop({ default: [] }) columns!: []
  @Prop() paramsConfig!: any
  @Watch('paramsConfig', { immediate: true, deep: true })
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
    formConfig: {
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
      buttons:
        this.hasNotSlotButton === 'add'
          ? 'add_button'
          : this.hasNotSlotButton
            ? ''
            : 'toolbar_buttons'
    }
  }

  public checkedList = [] // 已选列

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
            return { ...item, ...item.billMain, ...item.billApproveList[0] }
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
  public resetFor() {
    this.formConfig.data = {}
    this.paramsConfig.params.entity = {}
    console.log('🚀 ~  this.paramsConfig', this.paramsConfig)
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
}
</script>
