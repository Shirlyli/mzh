<template>
  <div>
    <!-- @form-submit="findList" -->

    <vxe-grid ref="xGrid"
              v-bind="gridOptions"
              :toolbar-config="tableToolbar">

      <!-- 自定义工具栏 -->
      <template #toolbar_buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="saveEvent"
                    status="warning">批量删除</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导入</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导出</vxe-button>
      </template>

      <!-- 表单查询项 -->
      <template #name_item="{data}">
        <vxe-input v-model="data.name"
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
        <el-date-picker v-model="data.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </template>
      <template #operate_item>
        <vxe-button type="submit"
                    status="success"
                    content="查询"></vxe-button>
        <vxe-button type="reset"
                    content="重置"></vxe-button>
      </template>

      <!-- 表格操作 -->
      <template #operate="{row}">
        <vxe-button content="查看"></vxe-button>
        <template v-if="$refs.xGrid.isActiveByRow(row)">
          <vxe-button status="primary"
                      content="保存"
                      @click="saveRowEvent(row)"></vxe-button>
        </template>
        <template v-else>
          <vxe-button content="编辑"
                      @click="editRowEvent(row)"></vxe-button>
        </template>
        <vxe-button content="删除"
                    status='warning'
                    @click="removeRowEvent(row)"></vxe-button>
      </template>

    </vxe-grid>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VXETable from 'vxe-table'

@Component({
  name: 'VexTable',
  components: {}
})
export default class extends Vue {
  @Prop({
    default: {
      data: {
        name: '',
        sex: '',
        time: ''
      },
      items: [
        { field: 'name', title: '名称', slots: { default: 'name_item' } },
        {
          field: 'sex',
          title: '菜单路由',
          slots: { default: 'sex_item' }
        },
        { field: 'time', title: '权限标识', slots: { default: 'create_time' } },
        { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
        { slots: { default: 'operate_item' } }
      ] // 表单项
    }
  })
  formConfig!: any

  @Prop({ default: [] }) columns!: []
  private gridOptions: any = {
    resizable: true,
    border: true,
    showOverflow: true,
    loading: false,
    height: 'auto',
    exportConfig: {},
    checkboxConfig: {
      // 设置复选框支持分页勾选，需要设置 rowId 行数据主键
      reserve: true
    },
    pagerConfig: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100, 200, 500]
    },
    editConfig: {
      // 设置触发编辑为手动模式
      trigger: 'manual',
      // 设置为整行编辑模式
      mode: 'row',
      // 显示修改状态和新增状态
      showStatus: true,
      // 自定义可编辑列头的图标
      icon: 'vxe-icon-question-circle-fill'
    },
    formConfig: this.formConfig,
    columns: this.columns, // 列表项数据
    data: []
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
    { value: '1', label: '男' },
    { value: '0', label: '女' }
  ]

  created() {
    this.findList()
  }

  // 获取列表数据
  private findList = () => {
    const { gridOptions } = this
    gridOptions.loading = true
    setTimeout(() => {
      gridOptions.data = [
        {
          id: 10001,
          name: 'Test1',
          nickname: 'T1',
          role: 'Develop',
          sex: '1',
          age: 28,
          address: 'Shenzhen'
        },
        {
          id: 10002,
          name: 'Test2',
          nickname: 'T2',
          role: 'Test',
          sex: '0',
          age: 22,
          address: 'Guangzhou'
        },
        {
          id: 10003,
          name: 'Test3',
          nickname: 'T3',
          role: 'PM',
          sex: '1',
          age: 32,
          address: 'Shanghai'
        },
        {
          id: 10004,
          name: 'Test4',
          nickname: 'T4',
          role: 'Designer',
          sex: '0',
          age: 23,
          address: 'Shenzhen'
        },
        {
          id: 10005,
          name: 'Test5',
          nickname: 'T5',
          role: 'Develop',
          sex: '0',
          age: 30,
          address: 'Shanghai'
        }
      ]
      gridOptions.loading = false
    }, 500)
  }

  // 编辑
  private editRowEvent = (row) => {
    const $grid: any = (this.$refs as any).xGrid
    ;($grid as any).setActiveRow(row)
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
  private removeRowEvent = async(row) => {
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    const $grid: any = (this.$refs as any).xGrid
    if (type === 'confirm') {
      ($grid as any).remove(row)
    }
  }
}
</script>
