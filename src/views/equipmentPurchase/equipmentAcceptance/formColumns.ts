
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
    type: 'input'
  },
  {
    field: 'applyDept',
    title: '申请科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    data: BusinessViewModule.departmentData,
    required: true
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
    data: [
      { label: '同意', value: '1' },
      { label: '驳回', value: '0' }
    ]
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

export interface approvalList {
  /**
   * 审批意见
   */
  approveOpinion: string
  /**
   * 审批状态
   */
  approveStatus: string
  /**
   * 审批层级
   */
  approveTier: string
  /**
   * 审批时间
   */
  approveTime: string
  /**
   * 审批人
   */
  approveUser: string
  /**
   * 主表id
   */
  chrckId: string
  id: string
}

export interface transferEquipment {
  /**
   * 单据主表id
   */
  billId: string
  /**
   * 设备id
   */
  equipmentId: string
  id: string
}

export interface BillMain {
  /**
   * 单据编号
   */
  billCode: string
  /**
   * 转科原因
   */
  cause: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 设备所在地
   */
  equipmentLocation: string
  /**
   * id
   */
  id: string
  /**
   * 转入科室，科室id
   */
  rollInDepartment: string
  /**
   * 转出科室，科室id
   */
  rollOutDepartment: string
  /**
   * 计划转出时间
   */
  rollOutTime: string
  /**
   * 单据状态，1：未提交；2：审批中；3：审批结束；4：删除
   */
  status: string
  /**
   * 申请人，人员id
   */
  userId: string
}

export interface TransferModal {
  /**
   * 审批流程，list
   */
  billApproveList?: approvalList[]
  /**
   * 单据编号
   */
  billCode: string
  /**
   * 转科设备，list
   */
  billEquipmentList?: transferEquipment[]
  billMain: BillMain
  /**
   * id
   */
  id: string
  /**
   * 单据状态，1：未提交；2：审批中；3：审批结束
   */
  status?: string
}
