import { ALL_OPTIONS } from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
import { handleDepartData } from '../../../shared/utils'

export const requestInfoFormList = [
  {
    field: 'applyDepartmentId',
    title: '报修科室',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.departmentData),
    required: true
  },
  {
    field: 'equipmentName',
    title: '设备名称',
    span: 12,
    type: 'input',
    required: true,
    disabled: true
  },
  {
    field: 'equipmentCode',
    title: '设备编号',
    span: 12,
    type: 'input',
    disabled: true
  },
  {
    field: 'marking',
    title: '设备型号',
    span: 12,
    type: 'input'
  },
  // {
  //   field: 'problemDesc',
  //   title: '资产序列号',
  //   span: 12,
  //   type: 'input',
  //   disabled: true
  // },
  // {
  //   field: 'a',
  //   title: '保修截止期',
  //   span: 12,
  //   type: 'date',
  //   disabled: true
  // },
  {
    field: 'applyUserId',
    title: '报修人',
    span: 12,
    type: 'select',
    disabled: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return {
        label: item.eName,
        value: item.userId
      }
    })
  },
  {
    field: 'applyTelphone',
    title: '报修人电话',
    span: 12,
    type: 'input'
  },
  {
    field: 'applyTime',
    title: '报修时间',
    span: 12,
    type: 'date',
    disabled: true
  },
  {
    field: 'faultProblem',
    title: '故障原因',
    span: 12,
    type: 'select',
    data: [
      { label: '人为', value: 1 }
    ]
  },
  {
    field: 'equipmentCategoryId',
    title: '设备类型',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.equipmentCategoryData)
  },
  {
    field: 'urgency',
    title: '紧急程度',
    span: 12,
    type: 'select',
    data: [
      { label: '一般', value: 1 },
      { label: '加急', value: 2 },
      { label: '特急', value: 2 }
    ]
  },
  // {
  //   field: 'h',
  //   title: '抄送人',
  //   span: 12,
  //   type: 'select',
  //   data: BusinessViewModule.employeeData.map((item:any) => {
  //     return {
  //       label: item.eName,
  //       value: item.userId
  //     }
  //   })
  // },
  {
    field: 'problemDesc',
    title: '故障描述',
    span: 12,
    type: 'textarea',
    required: true
  },
  {
    field: 'note',
    title: '备注',
    span: 12,
    type: 'textarea',
    required: true
  }
]

export const checkInfoFormList = [
  {
    field: 'applyDepartment',
    title: '报修科室',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.departmentData),
    required: true
  },
  {
    field: 'equipmentName',
    title: '设备名称',
    span: 12,
    type: 'input',
    required: true,
    disabled: true
  },
  {
    field: 'equipmentCode',
    title: '设备编号',
    span: 12,
    type: 'input',
    disabled: true
  },
  {
    field: 'marking',
    title: '设备型号',
    span: 12,
    type: 'input'
  },
  // {
  //   field: 'problemDesc',
  //   title: '资产序列号',
  //   span: 12,
  //   type: 'input',
  //   disabled: true
  // },
  // {
  //   field: 'a',
  //   title: '保修截止期',
  //   span: 12,
  //   type: 'date',
  //   disabled: true
  // },
  {
    field: 'applyUserName',
    title: '报修人',
    span: 12,
    type: 'select',
    disabled: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return {
        label: item.eName,
        value: item.userId
      }
    })
  },
  {
    field: 'applyTelphone',
    title: '报修人电话',
    span: 12,
    type: 'input'
  },
  {
    field: 'applyTime',
    title: '报修时间',
    span: 12,
    type: 'date',
    disabled: true
  },
  {
    field: 'faultProblem',
    title: '故障原因',
    span: 12,
    type: 'select',
    data: [
      { label: '人为', value: 1 }
    ]
  },
  {
    field: 'equipmentCategoryId',
    title: '设备类型',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.equipmentCategoryData)
  },
  {
    field: 'urgency',
    title: '紧急程度',
    span: 12,
    type: 'select',
    data: [
      { label: '一般', value: 1 },
      { label: '加急', value: 2 },
      { label: '特急', value: 2 }
    ]
  },
  // {
  //   field: 'h',
  //   title: '抄送人',
  //   span: 12,
  //   type: 'select',
  //   data: BusinessViewModule.employeeData.map((item:any) => {
  //     return {
  //       label: item.eName,
  //       value: item.userId
  //     }
  //   })
  // },
  {
    field: 'problemDesc',
    title: '故障描述',
    span: 12,
    type: 'textarea',
    required: true
  },
  {
    field: 'note',
    title: '备注',
    span: 12,
    type: 'textarea',
    required: true
  }
]

export const checkPersonalInfoFormList = [
  {
    field: 'checkUserName',
    title: '姓名',
    span: 12
  },
  {
    field: 'checkTime',
    title: '审核时间',
    span: 12
  },
  {
    field: 'billCode',
    title: '单号',
    span: 12
  }
]

export const maintenancePersonalInfoFormList = [
  {
    field: 'repairUserName',
    title: '姓名',
    span: 12
  },
  {
    field: 'repairProcess',
    title: '接收流程',
    span: 12
  },
  {
    field: 'repairAcceptTime',
    title: '接收时间',
    span: 12
  }
]

export const maintenanceAcceptPersonalInfoFormList = [
  {
    field: 'acceptUserId',
    title: '姓名',
    span: 12
  },
  {
    field: 'acceptTime',
    title: '验收时间',
    span: 12
  }
]

export const maintenanceRecordsFormList = [
  [
    {
      field: 'name',
      title: '设备名称',
      span: 12,
      type: 'treeSelect',
      data: BusinessViewModule.equipmentData,
      required: true
    },
    {
      field: 'marking',
      title: '设备型号',
      span: 12,
      type: 'input',
      required: true
    },
    {
      field: 'numbers',
      title: '数量',
      span: 12,
      type: 'input',
      required: true

    },
    {
      field: 'hours',
      title: '时常',
      span: 12,
      type: 'input'

    },
    {
      field: 'price',
      title: '金额',
      span: 12,
      type: 'input',
      required: true
    }
  ]
]

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
  ]
]

export const ApprovalFormlist = [
  {
    field: 'approveUserName',
    title: '审批人',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'approveTime',
    title: '审批时间',
    span: 12,
    type: 'date',
    required: true
  },
  {
    field: 'approveOpinion',
    title: '审批意见',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'approveStatus',
    title: '审批状态',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.APPROVAL_STATUS
  },
  {
    field: 'approveTier',
    title: '审批层级',
    span: 12,
    type: 'select',
    required: true,
    data: [
      { label: '同意', value: '1' },
      { label: '驳回', value: '0' }
    ]
  }
]
