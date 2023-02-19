<template>
  <div class="commonContainerBox">
    <!-- 列表区域 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>计量管理</span>
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
               label-width="100px">
        <el-row type="flex"
                justify="start"
                :gutter="20"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col v-for="item in FormListData"
                  :key="item.field"
                  :span="12">
            <el-form-item :label="item.title"
                          label-width="120px"
                          :prop="item.field"
                          :rules="item.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]">
              <div v-if="item.type === 'input'" style="display: flex;">
                <el-input v-model="formObj[item.field]"
                          :placeholder="`请输入${item.title}`"  :disabled="item.disabled"/>
                <el-button type="primary"
                           v-if="item.field==='equName'"
                           @click="handleChooseEquipment">选择设备</el-button>
              </div>
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

     <!-- 选择设备模态框 -->
     <el-dialog title="选择设备"
               :visible.sync="chooseEquipmentDialogVisible">
      <vxe-table border
                 ref="xTable1"
                 :data="chooseEquipmentData"
                 :radio-config="{highlight: true}"
                 @radio-change="radioChangeEvent">
        <vxe-column type="radio"
                    width="60">
          <template #header>
            <vxe-button type="text"
                        :disabled="!selectRow"></vxe-button>
          </template>
        </vxe-column>
        <vxe-column field="barCode"
                    title="设备编号"></vxe-column>
        <vxe-column field="name"
                    title="设备名称"></vxe-column>
        <vxe-column field="brand"
                    title="规则型号"
                    show-overflow></vxe-column>
        <vxe-column field="barCode"
                    title="序列号"
                    show-overflow></vxe-column>
        <vxe-column field="address"
                    title="原设备编号"
                    show-overflow></vxe-column>
      </vxe-table>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="chooseEquipmentDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="submitChooseEquipment">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script  lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { FormListData } from './formList'
import moment from 'moment'
import { updateEquipmentCategoryInfoData } from '@/api/equipment'
import { saveHospitalMetering, delHospitalMetering, getEquipmentData } from '@/api/basic'
import { formatIsOrNotType } from '@/shared/utils'
import _ from 'lodash'
import { BusinessViewModule } from '@/store/modules/business'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable
  }
})
export default class extends Vue {
  public FormListData = FormListData
  public dialogStatus = 'create'
  public dialogVisible = false
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
        field: 'equName',
        title: '设备名称',
        itemRender: {
          name: '$select',
          props: { placeholder: '请输入设备名称' }
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

  public formatIsOrNotType = formatIsOrNotType
  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'equName', title: '设备名称', width: 150 },
    {
      field: 'checkTime',
      title: '检查日期',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'),
      width: 150
    },
    {
      field: 'isQualified',
      title: '是否合格',
      formatter: this.formatIsOrNotType,
      width: 150
    },
    { field: 'qualifiedReason', title: '是否合格原因', width: 150 },
    { field: 'checkPerson', title: '检测人', width: 150 },
    { field: 'checkUnit', title: '检查单位', width: 150 },
    {
      field: 'planTime',
      title: '计划检查时间',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'),
      width: 150
    },
    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ]

  public paramsConfig: any = {
    url: '/hospitalMetering/queryList', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        equName: ''
      }
    }
  }

  public formObj = {
    id: '',
    equId: '',
    equName: '',
    isQualified: '',
    qualifiedReason: '',
    checkPerson: '',
    checkPersonName: '',
    checkTime: null,
    checkUnit: '',
    planTime: null
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
    const res: any = await delHospitalMetering(params)
    if (res.code || res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    this.$message.success('删除成功')
  }

  public clearForm() {
    this.formObj = {
      id: '',
      equId: '',
      equName: '',
      isQualified: '',
      qualifiedReason: '',
      checkPerson: '',
      checkPersonName: '',
      checkTime: null,
      checkUnit: '',
      planTime: null
    }
  }

  public async createData() {
    console.log('保存')
    ;(this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const res: any = await saveHospitalMetering(this.formObj)
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
        const res: any = await saveHospitalMetering(this.formObj)
        if (res.code || res.result) {
          this.dialogVisible = false
          ;(this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.$message.success('修改成功')
        this.clearForm()
      }
    })
  }

  // 新增设备
  public chooseEquipmentDialogVisible = false
  public selectRow :any= null
  public chooseEquipmentData = []
  public handleChooseEquipment() {
    this.chooseEquipmentDialogVisible = true
    this.getEquipmentInfoByDepartmentId()
  }

  public async getEquipmentInfoByDepartmentId() {
    const res:any = await getEquipmentData({
      page: '1',
      limit: '10',
      entity: {
        isMetering: '1'
      }
    })
    if (res.code === 200) {
      this.chooseEquipmentData = res.data.map((item: any) => {
        return { ...item, ...item.equipmentVO }
      })
      console.log('🚀 ~ this.chooseEquipmentData', this.chooseEquipmentData)
    }
  }

  public radioChangeEvent({ row }) {
    this.selectRow = row
    console.log('🚀 ~  this.selectRow ', this.selectRow)
    console.log('单选事件')
  }

  // 提交设备选择
  public submitChooseEquipment() {
    console.log('🚀 ~  this.selectRow ', this.selectRow)
    const { name } = this.selectRow.equipmentVO
    this.formObj = {
      ...this.formObj,
      equName: name,
      checkPersonName: ''
    }
    console.log(BusinessViewModule.employeeData)
    this.chooseEquipmentDialogVisible = false
  }
}
</script>

<style scoped lang="scss">
  .el-select{
    width: 100%;
  }
</style>
