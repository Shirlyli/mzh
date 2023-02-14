<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>不良事件上报</span>
      </div>
      <keep-alive>
        <VexTable ref="vexTable"
                  :formConfig="formConfig"
                  :columns="columns"
                  editColumns="['del','edit']"
                  :toolbarBtns="['add', 'delete']"
                  hasNotSlotButton="true"
                  @emit-handle-insert="handleInsert"
                  @emit-handle-update="handleUpdate"
                  @emit-handle-remove="handleRemove"
                  :paramsConfig="paramsConfig" />
      </keep-alive>

    </el-card>

    <!-- 新增编辑 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible.sync="dialogVisible"
               width="80%">
      <el-form ref="dataForm"
               :rules="{}"
               :model="formObj"
               label-position="left"
               label-width="120px">
        <el-row type="flex"
                :gutter="20"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col v-for="item in FormListData"
                  :key="item.field"
                  :span="12">
            <el-form-item :label="item.title"
                          label-width="120px"
                          :prop="item.field"
                          :rules="item.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]">
              <el-input v-model="formObj[item.field]"
                        :placeholder="`请输入${item.title}`"
                        v-if="item.type === 'input'" />
              <el-date-picker v-model="formObj[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-select v-model="formObj[item.field]"
                         placeholder="请选择"
                         v-if="item.type === 'select'">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <!-- 多行文本框 -->
              <el-input type="textarea"
                        :rows="2"
                        v-if="item.type === 'textarea'"
                        placeholder="请输入内容"
                        v-model="formObj[item.field]">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ '保存'}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script  lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import moment from 'moment'
import { FormListData } from './formList'
import { saveadverseEventReport, deladverseEventReport } from '@/api/basic'
import { formatIsOrNotType, formatSexType } from '@/shared/utils'
import _ from 'lodash'
@Component({
  name: 'InlineEditTable',
  components: {
    VexTable
  }
})
export default class extends Vue {
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      equName: '',
      createTime: ''
    },
    items: [
      {
        field: 'patientName',
        title: '患者姓名',
        itemRender: {
          name: '$select',
          props: { placeholder: '请输入患者姓名' }
        },
        span: 5
      },
      {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 10
      },
      { slots: { default: 'operate_item' }, span: 4 }
    ] // 表单项
  }

  public formatSexType = formatSexType
  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'uploader', title: '上传人', width: 100 },
    {
      field: 'eventTime',
      title: '事件发生日期',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'),
      width: 150
    },
    { field: 'adverseDesc', title: '不良情况描述', width: 150 },
    { field: 'patientName', title: '患者姓名', width: 150 },
    { field: 'patientSex', title: '患者性别', width: 150, formatter: this.formatSexType },
    { field: 'patientAge', title: '患者年龄', width: 150 },
    {
      field: 'anticipatedTherapeuticEffect',
      title: '预期治疗疾病或作用',
      width: 150
    },
    {
      field: 'useScenario',
      title: '使用场景',
      width: 150
    },
    {
      field: 'useProcess',
      title: '使用过程',
      width: 150
    },
    { field: 'combinedMedication', title: '合并用药/械情况', width: 150 },
    { field: 'causeAnalysis', title: '事件原因分析', width: 150 },

    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ]

  public paramsConfig: any = {
    url: '/adverseEventReport/queryList', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        patientName: ''
      }
    }
  }

  public handleInsert() {
    this.clearForm()
    console.log('新增')
    this.dialogVisible = true
  }

  public handleUpdate(rowData: any) {
    this.formObj = { ...this.formObj, ...rowData }
    this.dialogVisible = true
    this.dialogStatus = 'update'
  }

  public async handleRemove(row: any) {
    console.log('🚀 ~ rowData', row, '批量删除')
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
    const res: any = await deladverseEventReport(params)
    if (res.code || res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    this.$message.success('删除菜单成功')
  }

  public FormListData = FormListData
  public dialogStatus = 'create'
  public dialogVisible = false
  public formObj = {
    id: '',
    uploader: '',
    equId: '',
    eventTime: null,
    adverseDesc: '',
    patientName: '',
    patientSex: '',
    patientAge: null,
    anticipatedTherapeuticEffect: '',
    useScenario: '',
    useProcess: '',
    combinedMedication: '',
    causeAnalysis: ''
  }

  public clearForm() {
    this.formObj = {
      id: '',
      uploader: '',
      equId: '',
      eventTime: null,
      adverseDesc: '',
      patientName: '',
      patientSex: '',
      patientAge: null,
      anticipatedTherapeuticEffect: '',
      useScenario: '',
      useProcess: '',
      combinedMedication: '',
      causeAnalysis: ''
    }
  }

  public async createData() {
    console.log('保存')
    ;(this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const res: any = await saveadverseEventReport(this.formObj)
        if (res.code || res.result) {
          this.dialogVisible = false
          ;(this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.$message.success('创建成功')
      }
    })
  }

  public updateData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const res: any = await saveadverseEventReport(this.formObj)
        if (res.code || res.result) {
          this.dialogVisible = false
          ;(this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.$message.success('修改成功')
        this.clearForm()
      }
    })
  }
}
</script>
