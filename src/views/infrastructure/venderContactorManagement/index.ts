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
import { FormItemTypes, VenderContactor, venderContactorTypes } from './type'
import _ from 'lodash'
import {
  handleLinkmanAdd,
  handleLinkmanDel,
  handleLinkmanUpdate
} from '@/api/basic'
import { ALL_OPTIONS } from '@/shared/options'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private formConfig: { data: VenderContactor, items: FormItemTypes[] } = {
    data: {
      linkId: '',
      lImportant: '',
      lName: '',
      lPosition: '',
      lTelphone: ''
    },
    items: [
      {
        field: 'linkId',
        title: '关联厂商id',
        span: 6,
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: [
            { label: '厂商a', value: '厂商a' },
            { label: '厂商b', value: '厂商b' },
            { label: '厂商c', value: '厂商c' }
          ]
        },
        resetValue: ''
      },
      {
        field: 'lImportant',
        title: '重要程度',
        span: 6,
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.IMPORTANT
        },
        resetValue: ''
      },
      {
        field: 'lName',
        title: '联系人名字',
        span: 6,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入联系人名字' }
        },
        resetValue: ''
      },
      {
        field: 'lPosition',
        title: '公司职务',
        span: 6,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入公司职务' }
        },
        resetValue: ''
      },
      {
        field: 'lTelphone',
        title: '电话',
        span: 6,
        folding: true,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入电话' }
        },
        resetValue: ''
      },
      { slots: { default: 'operate_item' }, span: 24, collapseNode: true, align: 'center' }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'linkId', title: '关联厂商' },
    { field: 'lImportant', title: '重要程度' },
    { field: 'lChart', title: '微信' },
    { field: 'lEmail', title: '邮箱' },
    {
      field: 'lName',
      title: '姓名'
    },
    { field: 'lPosition', title: ' 职务' },
    { field: 'lQq', title: 'qq' },
    { field: 'lTelphone', title: '电话' },
    { field: 'note', title: '备注' },
    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  private venderContactorFormData: venderContactorTypes = {
    id: '',
    busType: '',
    ctime: '',
    dispindex: 0,
    lChart: '',
    lDefend: null,
    lEmail: '',
    lImportant: '',
    linkId: null,
    lName: '',
    lPosition: '',
    lQq: '',
    lTelphone: '',
    note: ''
  }; // 新增或编辑表单

  private rules = {
    name: [{ required: true, message: '请输入厂站名称', trigger: 'change' }]
  }; // 表单校验

  private dialogVisible = false; // 新增过模态框
  private dialogStatus = 'create';
  private paramsConfig = {
    url: '/supplierLinkman/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  };

  private nodeClickData: any = {}; // 点击供应商数据

  private hLevelList = []; // 字典表

  private IMPORTANT = ALL_OPTIONS.IMPORTANT
  // 获取医院等级
  private async getCommonTreeData() {
    const params = {
      page: 1,
      limit: 10,
      entity: { id: '58CC52594FA7C8-1A54-4DC6-9854-FD8BB128B194' }
    }
    const res: any = await getTableDataList(
      'common/dicInfo/querySelfAndPar',
      params
    )
    if (res.result) {
      this.hLevelList = res.data
    }
  }

  // 新增供应商
  private handleInsert() {
    this.dialogStatus = 'create'
    this.dialogVisible = true
    this.handleReset()
  }

  private handleReset() {
    this.venderContactorFormData = {
      busType: '',
      ctime: '',
      dispindex: 0,
      lChart: '',
      lDefend: null,
      lEmail: '',
      lImportant: '',
      linkId: null,
      lName: '',
      lPosition: '',
      lQq: '',
      lTelphone: '',
      note: ''
    }
  }

  // 模态框关闭事件
  private handleDialogClose() {
    this.dialogVisible = false
    this.handleReset()
  }

  // 新增供应商
  private createData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const params = {
          ...this.venderContactorFormData
        }
        const res: any = await handleLinkmanAdd(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        this.$message.success('创建成功')
      }
    })
  }

  // 修改供应商
  private updateData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const params = {
          id: '',
          ...this.venderContactorFormData
        }
        const res: any = await handleLinkmanUpdate(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        Message.success('修改成功')
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { id } = row
    this.venderContactorFormData = {
      id,
      ...row
    }
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as any).clearValidate()
    })
  }

  // 删除供应商
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
    const res: any = await handleLinkmanDel(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    this.$message.success('删除成功')
  }
}
