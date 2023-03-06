import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form, Message } from 'element-ui'
import {
  dealHospitalData,
  getTableDataList,
  updateHospitalData
} from '@/api/equipment'
import { FormItemTypes, ContractTypes, ContractFormTypes } from './type'
import _ from 'lodash'
import {
  handleSupplierContractAdd,
  handleSupplierContractDel,
  handleSupplierContractUpdate
} from '@/api/basic'
import moment from 'moment'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private formConfig: { data: ContractTypes, items: FormItemTypes[] } = {
    data: {
      cName: '',
      cCode: '',
      supplierId: ''
    },
    items: [
      {
        field: 'cName',
        title: '合同名称',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入合同名称' }
        },
        resetValue: ''
      },
      {
        field: 'cCode',
        title: '合同编码',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入合同编码' }
        },
        resetValue: ''
      },
      {
        field: 'supplierId',
        title: '厂商ID',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入厂商ID' }
        },
        resetValue: ''
      },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'cName', title: '合同名称', width: 120 },
    { field: 'cCode', title: '合同编码', width: 120 },
    { field: 'cSignDate', title: '签订日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss'), width: 120 },
    { field: 'cEffective', title: '有效期限', width: 120 },
    {
      field: 'cDefend',
      title: '经办人',
      width: 120
    },
    { field: 'cTotal', title: ' 合同总金额', width: 120 },
    { field: 'ctime', title: ' 创建时间', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss'), width: 120 },
    { field: 'supplierId', title: '厂商ID', width: 120 },
    { field: 'cAttahUrl', title: '附件', width: 120 },
    { field: 'note', title: ' 排序', width: 120 },
    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  private contractFormData: ContractFormTypes = {
    cAttahUrl: '',
    cCode: '',
    cDefend: '',
    cEffective: '',
    cName: '',
    cSignDate: '',
    ctime: '',
    cTotal: '',
    dispindex: '',
    note: '',
    supplierId: '',
    id: ''
  }; // 新增或编辑表单

  private rules = {
    name: [{ required: true, message: '请输入厂站名称', trigger: 'change' }]
  }; // 表单校验

  private fileList = []; // 附件
  private dialogVisible = false; // 新增过模态框
  private dialogStatus = 'create';
  private paramsConfig = {
    url: '/supplierContract/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  };

  private nodeClickData: any = {}; // 点击合同数据

  // 新增合同
  private handleInsert() {
    this.dialogStatus = 'create'
    this.dialogVisible = true
    this.handleReset()
  }

  private handleReset() {
    this.contractFormData = {
      cAttahUrl: '',
      cCode: '',
      cDefend: '',
      cEffective: '',
      cName: '',
      cSignDate: '',
      ctime: '',
      cTotal: '',
      dispindex: '',
      note: '',
      supplierId: '',
      id: ''
    }
  }

  // 模态框关闭事件
  private handleDialogClose() {
    this.dialogVisible = false
    this.handleReset()
  }

  // 新增合同
  private createData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const params = {
          ...this.contractFormData
        }
        const res: any = await handleSupplierContractAdd(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        Message.success('创建成功')
      }
    })
  }

  // 修改合同
  private updateData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const { id } = this.contractFormData
        const params = {
          id,
          ...this.contractFormData
        }
        const res: any = await handleSupplierContractUpdate(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        Message.success('更新成功')
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { id, _X_ROW_CHILD, _X_ROW_KEY, children, ...filterRow } = row
    this.contractFormData = {
      id,
      ...filterRow
    }
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as any).clearValidate()
    })
  }

  // 删除合同
  private async handleRemove(row: any) {
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
    const res: any = await handleSupplierContractDel(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    Message.success('删除成功')
  }

  /**
   * 附件上传
   */
  private handleRemoveField(file: any, fileList: any) {
    console.log(file, fileList)
  }

  private handlePreview(file: any) {
    console.log(file)
  }

  private handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }

  private beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
