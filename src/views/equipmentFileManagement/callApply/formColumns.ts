import { ALL_OPTIONS } from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
import { UserModule } from '@/store/modules/user'
import { handleDepartData } from '../../../shared/utils'
export const BasicFormList = [
  {
    field: 'applyPersonName',
    title: '申请人',
    span: 12,
    disabled: true,
    type: 'select',
    data: BusinessViewModule.employeeData.map((item:any) => {
      return { ...item, label: item.eName, value: item.userId }
    }),
    required: true

  },
  {
    field: 'createTime',
    title: '申请日期',
    span: 12,
    type: 'date',
    required: true,
    disabled: true
  },
  {
    field: 'applyDeptName',
    title: '申请科室',
    span: 12,
    disabled: true,
    type: 'treeSelect',
    slot: 'department',
    required: true,
    data: handleDepartData(BusinessViewModule.departmentData)
  },
  {
    field: 'transferDepartmentId',
    title: '外调科室',
    span: 12,
    type: 'treeSelect',
    slot: 'department',
    required: true,
    data: handleDepartData(BusinessViewModule.departmentData)
  },
  {
    field: 'departmentPrincipal',
    title: '科室负责人',
    span: 12,
    type: 'select',
    required: true,
    data: BusinessViewModule.employeeData.map((item:any) => {
      return { ...item, label: item.eName, value: item.userId }
    })
  },
  {
    field: 'transferType',
    title: '外调类型',
    span: 12,
    type: 'select',
    data: []
  },
  {
    field: 'transferTime',
    title: '外调时间',
    span: 12,
    type: 'date'
  },
  {
    field: 'contacts',
    title: '乙方联系人',
    span: 12,
    type: 'input'
  },
  {
    field: 'contactWay',
    title: '联系方式',
    span: 12,
    type: 'input'
  },
  {
    field: 'destination',
    title: '外调目的地',
    span: 12,
    type: 'input'
  },
  {
    field: 'cause',
    title: '外调原因',
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
      type: 'select',
      required: true,
      data: []
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
