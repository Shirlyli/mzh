<template>
  <div class="commonContainerBox">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>操作日志管理</span>
      </div>
      <VexTable ref="vexTable"
                :formConfig="formConfig"
                :columns="columns"
                editColumns="['del']"
                :toolbarBtns="['delete']"
                @emit-handle-remove="handleRemove"
                :paramsConfig="paramsConfig" />
    </el-card>
  </div>
</template>

<script lang="ts" >
import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import _ from 'lodash'
import moment from 'moment'
import { delOperationLogs } from '@/api/basic'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  public formConfig = {
    data: {
      lOptModual: '',
      lMethod: '',
      lOptAct: ''
    },
    items: [
      {
        field: 'lOptModual',
        title: '模块名',
        span: 5,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入医院名称' }
        }
      },
      {
        field: 'lMethod',
        title: '请求方法',
        span: 5,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入医院名称' }
        }
      },
      {
        field: 'lOptAct',
        title: '操作动作',
        span: 10,
        slots: { default: 'create_time' }
      },
      { slots: { default: 'operate_item' }, span: 4 }
    ] // 表单项  }
  }

  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'lOperatorName', title: '用户名', width: 80 },
    { field: 'lMethod', title: '标题' },
    { field: 'lUri', title: ' Url' },
    { field: 'lIp', title: ' IP', width: 100 },
    { field: 'lMethod', title: '请求方法' },
    {
      field: 'createTime',
      title: '创建时间',
      formatter: (data: any) => moment(data.cellvalue).format('YYYY-MM-DD')
    },
    {
      width: 100,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ]

  public paramsConfig = {
    url: 'log/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  }

  // 删除操作记录
  public async handleRemove(row: any) {
    let params = {}
    if (Array.isArray(row)) {
      const res = _.map(row, 'id')
      params = {
        ids: res.join(',')
      }
    } else {
      params = {
        ids: row.id
      }
    }
    const res: any = await delOperationLogs(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    this.$message.success('删除成功')
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
</style>
