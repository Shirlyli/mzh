import { ALL_OPTIONS } from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
import { UserModule } from '@/store/modules/user'
export const BasicFormList = [
  {
    field: 'userName',
    title: '申请人',
    span: 12,
    type: 'input',
    data: UserModule.userData,
    required: true
  },
  {
    field: 'createTime',
    title: '申请日期',
    span: 12,
    type: 'date',
    required: true
  },
  {
    field: 'departmentId',
    title: '申请人科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    required: true,
    data: BusinessViewModule.departmentData
  },
  {
    field: 'borrowDepartmentId',
    title: '借用申请科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    data: BusinessViewModule.departmentData,
    required: true
  },
  {
    field: 'borrowTime',
    title: '预计借用时间',
    span: 12,
    type: 'date',
    required: true
  },
  {
    field: 'returnTime',
    title: '预计归还时间',
    span: 12,
    type: 'date',
    required: true
  },

  {
    field: 'returnStatus',
    title: '归还状态  ',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.RETURN_STATUS
  },
  {
    field: 'cause',
    title: '借用原因',
    span: 12,
    type: 'textarea'
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

export const ReturnInfo = [
  {
    field: 'userName',
    title: '经手人',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'borrowUnivalence',
    title: '借用单价',
    span: 12,
    type: 'input'
  },
  {
    field: 'borrowDuration',
    title: '借用时长',
    span: 12,
    type: 'input'
  },
  {
    field: 'totalPrice',
    title: '合计费用',
    span: 12,
    type: 'input'
  },
  {
    field: 'returnTime',
    title: '实际归还时间',
    span: 12,
    type: 'date'
  },
  {
    field: 'returnStatus',
    title: '设备归还状态',
    span: 12,
    type: 'select',
    data: ALL_OPTIONS.EQUIP_STATUS
  },
  {
    field: 'returnExplain',
    title: '归还说明',
    span: 12,
    type: 'input'
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

export interface ReturnInfo {
  /**
   * 借用主表id
   */
  billId: string
  /**
   * 借用时长
   */
  borrowDuration: string
  /**
   * 借用单价
   */
  borrowUnivalence: string
  id: string
  /**
   * 归还说明
   */
  returnExplain: string
  /**
   * 设备归还状态，1：完好，2：异常
   */
  returnStatus: string
  /**
   * 实际归还时间
   */
  returnTime: string
  /**
   * 合计费用
   */
  totalPrice: string
  /**
   * 经手人
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
  /**
     * 归还信息
     */
  borrowReturnList: ReturnInfo[]
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
