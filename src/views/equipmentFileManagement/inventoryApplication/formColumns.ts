import { ALL_OPTIONS } from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
import { UserModule } from '@/store/modules/user'
import { handleDepartData } from '../../../shared/utils'
// eslint-disable-next-line camelcase
export const BasicFormList = [
  {
    field: 'userId',
    title: '申请人',
    span: 12,
    disabled: true,
    type: 'select',
    required: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return { ...item, label: item.eName, value: item.userId }
    })
  },
  {
    field: 'createTime',
    title: '申请日期',
    span: 12,
    type: 'date'
  },
  {
    field: 'departmentId',
    title: '申请科室',
    span: 12,
    disabled: true,
    type: 'treeSelect',
    required: true,
    data: handleDepartData(BusinessViewModule.departmentData),
    slot: 'department'
  },
  {
    field: 'checkDepartment',
    title: '盘点科室',
    span: 12,
    type: 'treeSelect',
    required: true,
    data: handleDepartData(BusinessViewModule.departmentData)
  },
  {
    field: 'equipmentCategory',
    title: '设备类别',
    span: 12,
    type: 'treeSelect',
    data: handleDepartData(BusinessViewModule.equipmentCategoryData)
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
      data: []
    },
    {
      field: 'currentStatus',
      title: '当前状态',
      span: 12,
      type: 'select',
      required: true,
      data: ALL_OPTIONS.equipmentStates
    },
    {
      field: 'checkStatus',
      title: '盘点状态',
      span: 12,
      type: 'select',
      required: true,
      data: ALL_OPTIONS.equipmentStates
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
