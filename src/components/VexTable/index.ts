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
            return { ...item.equipmentVO, ...item.equipmentStores[0], ...item }
          })
          this.tablePage.total = res.count
        } else if (this.type === 'transferApply') {
          this.tableData = res.data.map((item: any) => {
            return {
              ...item.billEquipmentList[0],
              ...item.billApproveList[0],
              ...item.billMain,
              ...item
            }
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
    try {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm') {
        this.emitHandleRemove(row)
      }
    } catch (err) {
      console.log('🚀 ~ err', err)
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
    try {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type === 'confirm') {
        this.emitHandleRemove(this.checkedList)
      }
    } catch (err) {
      console.log('🚀 ~ err', err)
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

  mounted() {
    // this.rowDrop()
  }

  public sortable ;
}
