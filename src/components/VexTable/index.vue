<template>
  <div>
    <vxe-grid ref="xGrid"
              v-bind="gridOptions"
              :loading="loading"
              :data="tableData"
              :tablePage="tablePage"
              :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
              :toolbar-config="tableToolbar"
              @checkbox-change="handleChange">

      <!-- 自定义工具栏 -->
      <template #toolbar_buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="groupRemove"
                    status="warning">批量删除</vxe-button>
        <vxe-button @click="associateRole"
                    v-if="hasAssociate">关联角色</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导入</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导出</vxe-button>
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
import _ from 'lodash'
import { Message } from 'element-ui'
@Component({
  name: 'VexTable',
  components: {},
})
export default class extends Vue {
  @Prop({ default: {} }) formConfig!: any
  @Prop({ default: [] }) columns!: []
  @Prop() paramsConfig!: any
  @Watch('paramsConfig', { immediate: true, deep: true })
  private onParamsConfigChange(newdata: any) {
    this.findList(newdata)
  }
  @Prop({ default: false }) hasAssociate!: boolean //是否含有关联角色
  @Prop({ default: false }) hasNotSlotButton!: boolean //是否含有操作按钮
  @Prop({ default: ['search', 'edit', 'del','record'] }) editColumns!: any
  @Prop() type!: string //表格类型
  private tablePage = { total: 0, currentPage: 1, pageSize: 10 }
  private loading = false
  private tableData = []
  private gridOptions: any = {
    border: true,
    showOverflow: true,
    height: 'auto',
    exportConfig: {},
    treeConfig: {
      transform: true,
      rowField: this.type === 'process' ? 'processCode' : 'id',
      // parentField: 'pid',
      // iconOpen: 'vxe-icon-square-minus-fill',
      // iconClose: 'vxe-icon-square-plus-fill',
      // hasChild: 'hasChild', // 设置是否有子节点标识
    },
    checkboxConfig: {
      // labelField: 'id',
      // 设置复选框支持分页勾选，需要设置 rowId 行数据主键
      reserve: true,
    },
    formConfig: this.formConfig,
    columns: this.columns, // 列表项数据
  }

  // 自定义工具栏
  private tableToolbar = {
    perfect: true,
    refresh: true,
    zoom: true,
    custom: true,
    slots: {
      buttons: this.hasNotSlotButton ? '' : 'toolbar_buttons',
    },
  }

  private checkedList = [] // 已选列
  created() {}

  // 获取列表数据
  private async findList(config: any) {
    console.log('🚀 ~ config', config)
    this.loading = true
    this.checkedList = []
    try {
      const res: any = await getTableDataList(config.url, config.params)
      if (this.type === 'process') {
        this.tableData = res.data[0].processInfo
      } else {
        if ((res.result || res.code === 200) && res.data) {
          this.tableData = res.data
          this.tablePage.total = res.count
        } else {
          this.tableData = []
        }
      }
    } catch (error) {
      console.log('🚀 ~ error', error)
      this.tableData = []
    }

    this.loading = false
  }

  // 查询
  private searchFor() {
    console.log('🚀 ~ formConfig', this.formConfig.data)
    this.paramsConfig.params.entity = {
      ...this.paramsConfig.params.entity,
      ...this.formConfig.data,
    }
    this.findList(this.paramsConfig)
  }

  // 重置并查询
  private resetFor() {
    this.formConfig.data = {}
    this.paramsConfig.params.entity = {}
  }

  // 编辑
  @Emit()
  emitHandleUpdate(rowData: any) {
    return rowData
  }

  private editRowEvent = (row: any) => {
    this.emitHandleUpdate(row)
  }

  // 保存
  private saveRowEvent = () => {
    const $grid: any = (this.$refs as any).xGrid
    ;($grid as any).clearActived().then(() => {
      this.gridOptions.loading = true
      setTimeout(() => {
        this.gridOptions.loading = false
        //VXETable.modal.message({ content: '保存成功！', status: 'success' })
      }, 300)
    })
  }

  // 删除
  @Emit()
  emitHandleRemove(rowData: any) {
    return rowData
  }

  private removeRowEvent = async (row: any) => {
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
      this.emitHandleRemove(row)
    }
  }

  // 新增
  @Emit()
  emitHandleInsert(rowData: any) {
    console.log('🚀 ~ emitHandleInsert', rowData)
    return rowData
  }

  private insertEvent() {
    if (this.type === 'process' && this.checkedList.length) {
      this.emitHandleInsert(this.checkedList)
    } else if (this.type !== 'process') {
      this.emitHandleInsert([])
    } else {
      Message.error('请选择流程后新增！')
    }
  }

  // 分页切换事件
  private handlePageChange(pageconfig: any) {
    this.tablePage.currentPage = pageconfig.currentPage
    this.tablePage.pageSize = pageconfig.pageSize
    this.paramsConfig.params.page = pageconfig.currentPage
    this.findList(this.paramsConfig)
  }

  // 批量删除
  private async groupRemove() {
    console.log("🚀 ~ this.checkedList", this.checkedList)
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
  private handleChange(checked: any) {
    this.checkedList = checked.records
  }

  // 查看
  @Emit()
  emitHandleSearch(rowData: any) {
    console.log('emitHandleSearch')
    return rowData
  }

  private searchForDetails(row: any) {
    this.emitHandleSearch(row)
  }

  // 关联角色
  @Emit()
  emitAssociateRole(value: any) {
    return value
  }
  private associateRole() {
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
  private handleRecord(row: any){
    this.emitHandleRecord(row)
  }
}
</script>
  