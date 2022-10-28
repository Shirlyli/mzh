<template>
  <div>
    <!-- @form-submit="findList" -->

    <vxe-grid v-bind="gridOptions"
              :toolbar-config="tableToolbar">
      <template #toolbar_buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="saveEvent" status="warning">批量删除</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导出</vxe-button>
      </template>

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
      <template #operate_item>
        <vxe-button type="submit"
                    status="success"
                    content="查询"></vxe-button>
        <vxe-button type="reset"
                    content="重置"></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'VexTable',
  components: {}
})
export default class extends Vue {
  private gridOptions: any = {
    resizable: true,
    border: true,
    showOverflow: true,
    loading: false,
    height: 680,
    exportConfig: {},
    pagerConfig: {
      // 默认每页大小
      pageSize: 10
    },
    checkboxConfig: {
      // 设置复选框支持分页勾选，需要设置 rowId 行数据主键
      reserve: true
    },
    formConfig: {
      data: {
        name: '',
        sex: ''
      },
      items: [
        { field: 'name', title: 'Name', slots: { default: 'name_item' } },
        {
          field: 'sex',
          title: '性别',
          titlePrefix: {
            message: '帮助信息！！！',
            icon: 'vxe-icon-question-circle-fill'
          },
          slots: { default: 'sex_item' }
        },
        { slots: { default: 'operate_item' } }
      ] // 表单项
    },
    columns: [
      { type: 'seq', width: 60 },
      { type: 'checkbox', width: 60 },
      { field: 'name', title: '字典值' },
      { field: 'name', title: '字典排序' },
      { field: 'nickname', title: '字典备注' },
      { field: 'age', title: '状态' },
      { field: 'sex', title: '操作' }
    ], // 列表项数据
    // data: [],
    proxyConfig: {
      seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
      props: {
        // 自定义响应结果读取的字段，例如返回结果为：{result: [], page: {total: 10}}
        result: 'result',
        total: 'page.total'
      },
      ajax: {
        // 接收 Promise
        query: ({ page }) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const list = [
                {
                  id: 10001,
                  name: 'Test1',
                  nickname: 'T1',
                  role: 'Develop',
                  sex: 'Man',
                  age: 28,
                  address: 'Shenzhen'
                },
                {
                  id: 10002,
                  name: 'Test2',
                  nickname: 'T2',
                  role: 'Test',
                  sex: 'Women',
                  age: 22,
                  address: 'Guangzhou'
                },
                {
                  id: 10003,
                  name: 'Test3',
                  nickname: 'T3',
                  role: 'PM',
                  sex: 'Man',
                  age: 32,
                  address: 'Shanghai'
                },
                {
                  id: 10004,
                  name: 'Test4',
                  nickname: 'T4',
                  role: 'Designer',
                  sex: 'Women',
                  age: 23,
                  address: 'Shenzhen'
                },
                {
                  id: 10005,
                  name: 'Test5',
                  nickname: 'T5',
                  role: 'Develop',
                  sex: 'Women',
                  age: 30,
                  address: 'Shanghai'
                },
                {
                  id: 10006,
                  name: 'Test6',
                  nickname: 'T6',
                  role: 'Designer',
                  sex: 'Women',
                  age: 21,
                  address: 'Shenzhen'
                },
                {
                  id: 10007,
                  name: 'Test7',
                  nickname: 'T7',
                  role: 'Test',
                  sex: 'Man',
                  age: 29,
                  address: 'test abc'
                },
                {
                  id: 10008,
                  name: 'Test8',
                  nickname: 'T8',
                  role: 'Develop',
                  sex: 'Man',
                  age: 35,
                  address: 'Shenzhen'
                },
                {
                  id: 10009,
                  name: 'Test9',
                  nickname: 'T9',
                  role: 'Develop',
                  sex: 'Man',
                  age: 35,
                  address: 'Shenzhen'
                },
                {
                  id: 100010,
                  name: 'Test10',
                  nickname: 'T10',
                  role: 'Develop',
                  sex: 'Man',
                  age: 35,
                  address: 'Guangzhou'
                },
                {
                  id: 100011,
                  name: 'Test11',
                  nickname: 'T11',
                  role: 'Test',
                  sex: 'Women',
                  age: 26,
                  address: 'test abc'
                },
                {
                  id: 100012,
                  name: 'Test12',
                  nickname: 'T12',
                  role: 'Develop',
                  sex: 'Man',
                  age: 34,
                  address: 'Guangzhou'
                },
                {
                  id: 100013,
                  name: 'Test13',
                  nickname: 'T13',
                  role: 'Test',
                  sex: 'Women',
                  age: 22,
                  address: 'Shenzhen'
                }
              ]
              resolve({
                page: {
                  total: list.length
                },
                result: list.slice(
                  (page.currentPage - 1) * page.pageSize,
                  page.currentPage * page.pageSize
                )
              })
            }, 100)
          })
        }
      }
    }
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
}
</script>
