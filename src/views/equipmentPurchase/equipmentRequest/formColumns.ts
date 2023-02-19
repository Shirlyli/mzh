import { ALL_OPTIONS } from '@/shared/options'
import { handleDepartData } from '@/shared/utils'
import { BusinessViewModule } from '@/store/modules/business'
import { UserModule } from '@/store/modules/user'

export const BasicFormList = [
  {
    field: 'projectName',
    title: '项目名称',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'purchaseType',
    title: '购置类别',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.purchaseType
  },
  {
    field: 'applyDeptName',
    title: '申请科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    data: handleDepartData(BusinessViewModule.departmentData),
    required: true,
    disabled: true
  },
  {
    field: 'applyPerson',
    title: '申请人',
    span: 12,
    type: 'select',
    disabled: true,
    required: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return { ...item, label: item.eName, value: item.userId }
    })
  },
  {
    field: 'applyTime',
    title: '申请时间',
    span: 12,
    type: 'date',
    disabled: true,
    required: true
  },
  {
    field: 'applyModle',
    title: '申请方式',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.applyModle
  },
  {
    field: 'applyReson',
    title: '申请理由',
    span: 12,
    type: 'textarea',
    required: true
  }
]

export const approvalFormList = [
  {
    field: 'projectName',
    title: '项目名称',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'purchaseType',
    title: '购置类别',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.purchaseType
  },
  {
    field: 'applyDeptName',
    title: '申请科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    data: handleDepartData(BusinessViewModule.departmentData),
    required: true
  },
  {
    field: 'applyPersonName',
    title: '申请人',
    span: 12,
    type: 'select',
    disabled: true,
    required: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return { ...item, label: item.eName, value: item.userId }
    })
  },
  {
    field: 'applyTime',
    title: '申请时间',
    span: 12,
    type: 'date',
    disabled: true,
    required: true
  },
  {
    field: 'applyModle',
    title: '申请方式',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.applyModle
  },
  {
    field: 'applyReson',
    title: '申请理由',
    span: 12,
    type: 'textarea',
    required: true
  }
]

// eslint-disable-next-line camelcase
export const EquipmentDetailFormList = [
  [
    {
      field: 'equipmentId',
      title: '设备名称',
      span: 12,
      type: 'input',
      required: true,
      slot: 'equipment'
    },
    {
      field: 'unit',
      title: '设备单位',
      span: 12,
      type: 'input'
    },
    {
      field: 'equipmentNum',
      title: '设备数量',
      span: 12,
      type: 'input'
    },
    {
      field: 'price',
      title: '设备价格',
      span: 12,
      type: 'input'
    },
    {
      field: 'isImport',
      title: '是否进口',
      span: 12,
      type: 'select',
      data: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
    // {
    //   field: 'barCode',
    //   title: '规则型号',
    //   span: 12,
    //   type: 'input'
    // },
    // {
    //   field: 'brand',
    //   title: '设备品牌',
    //   span: 12,
    //   type: 'input'
    // }
  ]
]

// eslint-disable-next-line camelcase
export const ApprovalFormlist = [
  // {
  //   field: 'nextNodeExecutorName',
  //   title: '审批人',
  //   span: 12,
  //   type: 'input',
  //   required: true
  // },
  // {
  //   field: 'approveTime',
  //   title: '审批时间',
  //   span: 12,
  //   type: 'date',
  //   required: true
  // },
  {
    field: 'auditReason',
    title: '审批意见',
    span: 12,
    type: 'input',
    required: true
  }
  // {
  //   field: 'auditStatus',
  //   title: '审批状态',
  //   span: 12,
  //   type: 'select',
  //   data: ALL_OPTIONS.APPROVE_STATUS
  // }
  // {
  //   field: 'approveTier',
  //   title: '审批层级',
  //   span: 12,
  //   type: 'select',
  //   required: true,
  //   data: [
  //     { label: '同意', value: '1' },
  //     { label: '驳回', value: '0' }
  //   ]
  // }
]

// 附件信息
export const FileFormList = [
  [
    {
      field: 'fileName',
      title: '文件名',
      span: 8,
      type: 'input',
      required: true
    },
    {
      field: 'applyPerson',
      title: '提交人',
      span: 8,
      type: 'select',
      data: BusinessViewModule.employeeData
    }
  ]
]
