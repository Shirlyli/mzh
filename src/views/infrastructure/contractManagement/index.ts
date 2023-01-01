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
    { field: 'cName', title: '合同名称' },
    { field: 'cCode', title: '合同编码' },
    { field: 'cSignDate', title: '签订日期' },
    { field: 'cEffective', title: '有效期限' },
    {
      field: 'cDefend',
      title: '经办人'
    },
    { field: 'cTotal', title: ' 合同总金额' },
    { field: 'ctime', title: ' 创建时间' },
    { field: 'supplierId', title: '厂商ID' },
    { field: 'cAttahUrl', title: '附件' },
    { field: 'note', title: ' 排序' },
    {
      width: 160,
      title: '操作',
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
    console.log(this.fileList);
    (this.$refs.dataForm as Form).validate(async valid => {
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
    console.log(this.fileList);
    (this.$refs.dataForm as Form).validate(async valid => {
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
      (this.$refs.dataForm as Form).clearValidate()
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
