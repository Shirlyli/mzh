import { ALL_OPTIONS } from '@/shared/options'
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
    type: 'input'
  },
  {
    field: 'applyDept',
    title: '申请科室',
    span: 12,
    type: 'select',
    slot: 'department',
    required: true
  },
  {
    field: 'applyPerson',
    title: '申请人',
    span: 12,
    type: 'input',
    required: true,
    data: UserModule.userData
  },
  {
    field: 'applyModle',
    title: '申请方式',
    span: 12,
    type: 'input'
  },
  {
    field: 'applyReson',
    title: '申请理由',
    span: 12,
    type: 'input',
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
      type: 'select',
      required: true,
      slot: 'equipment'
    },
    {
      field: 'barCode',
      title: '规则型号',
      span: 12,
      type: 'input'
    },
    {
      field: 'brand',
      title: '设备品牌',
      span: 12,
      type: 'input'
    }
  ]
]

// eslint-disable-next-line camelcase
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
    data: ALL_OPTIONS.APPROVE_STATUS
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

const aaa = [
  {
    field: 'applyDetailId',
    title: '申请设备明细id',
    span: 12,
    slots: { default: 'applyDetailId' }
  },
  {
    field: 'enclosureId',
    title: '附件id',
    span: 12,
    slots: { default: 'enclosureId' }
  },
  // { field: "applyTime", title: "申请时间", span: 12 },
  {
    field: 'processCode',
    title: '流程code',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入流程code' } }
  },
  {
    field: 'currentNodeName',
    title: '当前节点名称',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入当前节点名称' } }
  },
  {
    field: 'currentNodeCode',
    title: '当前节点code',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入当前节点code' } }
  },
  {
    field: 'nextNodeName',
    title: '下一节点名称',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入下一节点名称' } }
  },
  {
    field: 'nextNodeCode',
    title: '下一节点code',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入下一节点code' } }
  },
  {
    field: 'nextNodeExecutor',
    title: '下一节点执行人',
    span: 12,
    slots: { default: 'nextNodeExecutor' }
  },
  {
    field: 'operator',
    title: '操作人',
    span: 12,
    slots: { default: 'operator' }
  }
]
