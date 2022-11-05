<template>
  <div>
    <!-- @form-submit="findList" -->
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
        <vxe-button @click="$refs.xGrid.exportData()">导入</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导出</vxe-button>
      </template>

      <!-- 表单查询项 -->
      <template #name_item="{data}">
        <vxe-input v-model="data.eName"
                   type="text"
                   placeholder="请输入名称"></vxe-input>
      </template>
      <template #sex_item="{data}">
        <vxe-select v-model="data.sex"
                    transfer>
          <vxe-option v-for="item in sexList1"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"></vxe-option>
        </vxe-select>
      </template>
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
      <template #operate="{row}">
        <template>
          <vxe-button content="编辑"
                      @click="editRowEvent(row)"></vxe-button>
        </template>
        <vxe-button content="删除"
                    status='warning'
                    @click="removeRowEvent(row)"></vxe-button>
      </template>
      <template #operateHasSearch="{row}">
        <vxe-button content="查看"
                    @click="searchForDetails(row)"></vxe-button>
        <template>
          <vxe-button content="编辑"
                      @click="editRowEvent(row)"></vxe-button>
        </template>
        <vxe-button content="删除"
                    status='warning'
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

@Component({
  name: 'VexTable',
  components: {}
})
export default class extends Vue {
  @Prop({ default: {} }) formConfig!: any
  @Prop({ default: [] }) columns!: []
  @Prop() paramsConfig!: any
  @Watch('paramsConfig', { immediate: true, deep: true })
  private onParamsConfigChange(newdata: any) {
    this.findList(newdata)
  }

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
    formConfig: this.formConfig,
    columns: this.columns // 列表项数据
  }

  // 自定义工具栏
  private tableToolbar = {
    perfect: true,
    refresh: true,
    zoom: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons'
    }
  }

  // 表单项下啦数据
  private sexList1 = [
    { value: '男', label: '男' },
    { value: '女', label: '女' }
  ]

  private checkedList = [] // 已选列
  created() {
    this.findList(this.paramsConfig)
  }

  // 获取列表数据
  private async findList(config: any) {
    this.loading = true
    try {
      const res: any = await getTableDataList(config.url, config.params)
      if (res.result && res.data) {
        this.tableData = res.data
        this.tablePage.total = res.count
      } else {
        this.tableData = []
      }
    } catch (error) {
      console.log('🚀 ~ error', error)
      this.tableData = []
    }

    this.loading = false
  }

  private flatten(arr: any) {
    // 多维menu数组 变成一维数组
    return [].concat(
      ...arr.map((item: any) => {
        return item.children // 判断是否有子项，否则递归flatten报错
          ? [].concat(item, ...this.flatten(item.children))
          : [].concat(item)
      })
    )
  }

  // 查询
  private searchFor() {
    console.log('🚀 ~ formConfig', this.formConfig.data)
    this.paramsConfig.params.entity = {
      ...this.paramsConfig.params.entity,
      ...this.formConfig.data
    }
    this.findList(this.paramsConfig)
  }

  // 重置并查询
  private resetFor() {
    this.formConfig.data = {}
    this.paramsConfig.params.entity = {}
    this.findList(this.paramsConfig)
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
        VXETable.modal.message({ content: '保存成功！', status: 'success' })
      }, 300)
    })
  }

  // 删除
  @Emit()
  emitHandleRemove(rowData: any) {
    return rowData
  }

  private removeRowEvent = async(row: any) => {
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
      this.emitHandleRemove(row)
    }
  }

  // 新增
  @Emit()
  emitHandleInsert() {
    console.log('aaa')
  }

  private insertEvent = () => {
    this.emitHandleInsert()
  }

  // 分页切换事件
  private handlePageChange({ currentPage, pageSize }) {
    this.tablePage.currentPage = currentPage
    this.tablePage.pageSize = pageSize
    this.paramsConfig.params.page = currentPage
    this.findList(this.paramsConfig)
  }

  // 批量删除
  private async groupRemove() {
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
}
</script>
