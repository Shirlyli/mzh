import { ALL_OPTIONS } from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
import { handleDepartData } from '../../../shared/utils'
export const requestInfoFormList = [
  {
    field: 'departmentId',
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
    field: 'faultProblem',
    title: '设备型号',
    span: 12,
    type: 'input'
  },
  {
    field: 'problemDesc',
    title: '资产序列号',
    span: 12,
    type: 'input',
    disabled: true
  },
  {
    field: 'a',
    title: '保修截止期',
    span: 12,
    type: 'date',
    disabled: true
  },
  {
    field: 'b',
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
    field: 'c',
    title: '报修人电话',
    span: 12,
    type: 'input'
  },
  {
    field: 'd',
    title: '报修时间',
    span: 12,
    type: 'date',
    disabled: true
  },
  {
    field: 'e',
    title: '故障原因',
    span: 12,
    type: 'select',
    data: [
      { label: '人为', value: 1 }
    ]
  },
  {
    field: 'f',
    title: '设备类型',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.equipmentCategoryData)
  },
  {
    field: 'g',
    title: '紧急程度',
    span: 12,
    type: 'select',
    data: [
      { label: '一般', value: 1 },
      { label: '加急', value: 2 },
      { label: '特急', value: 2 }
    ]
  },
  {
    field: 'h',
    title: '抄送人',
    span: 12,
    type: 'select',
    data: BusinessViewModule.employeeData.map((item:any) => {
      return {
        label: item.eName,
        value: item.userId
      }
    })
  },
  {
    field: 'i',
    title: '故障描述',
    span: 12,
    type: 'textarea',
    required: true
  }
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
