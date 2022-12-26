export const Basic_Form_List = [
  {
    field: "userId",
    title: "申请人",
    span: 12,
    type: "input"
  },
  {
    field: "createTime",
    title: "申请日期",
    span: 12,
    type: "input"
  },
  {
    field: "rollOutDepartment",
    title: "转出科室",
    span: 12,
    type: "select"
  },
  {
    field: "rollInDepartment",
    title: "转入科室",
    span: 12,
    type: "select"
  },
  {
    field: "equipmentLocation",
    title: "新存放地点",
    span: 12,
    type: "date"
  },
  {
    field: "rollOutTime",
    title: "计划转科日期",
    span: 12,
    type: "date"
  },
  {
    field: "cause",
    title: "转科原因",
    span: 12,
    type: "input"
  }
];

export const Equipment_Detail_Form_List = [
  {
    field: "name",
    title: "设备名称",
    span: 12,
    slots: { default: "applyDetailId" }
  },
  {
    field: "processCode",
    title: "规则型号",
    span: 12
  },
  {
    field: "brand",
    title: "设备品牌",
    span: 12
  }
];

export const Approval_Form_list = [
  {
    field: "approveUser",
    title: "审批人",
    span: 12
  },
  {
    field: "approveTime",
    title: "审批时间",
    span: 12
  },
  {
    field: "approveOpinion",
    title: "审批意见",
    span: 12
  },
  {
    field: "approveStatus",
    title: "审批状态",
    span: 12
  },
  {
    field: "approveTier",
    title: "审批层级",
    span: 12
  }
];

export interface TransferModal {
  /**
   * 审批流程，list
   */
  billApproveList?: approvalList[];
  /**
   * 单据编号
   */
  billCode: string;
  /**
   * 转科设备，list
   */
  billEquipmentList?: transferEquipment[];
  billMain: BillMain;
  /**
   * id
   */
  id: string;
  /**
   * 单据状态，1：未提交；2：审批中；3：审批结束
   */
  status?: string;
}

export interface approvalList {
  /**
   * 审批意见
   */
  approveOpinion: string;
  /**
   * 审批状态
   */
  approveStatus: string;
  /**
   * 审批层级
   */
  approveTier: string;
  /**
   * 审批时间
   */
  approveTime: string;
  /**
   * 审批人
   */
  approveUser: string;
  /**
   * 主表id
   */
  chrckId: string;
  id: string;
}

export interface transferEquipment {
  /**
   * 单据主表id
   */
  billId: string;
  /**
   * 设备id
   */
  equipmentId: string;
  id: string;
}

export interface BillMain {
  /**
   * 单据编号
   */
  billCode: string;
  /**
   * 转科原因
   */
  cause: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 设备所在地
   */
  equipmentLocation: string;
  /**
   * id
   */
  id: string;
  /**
   * 转入科室，科室id
   */
  rollInDepartment: string;
  /**
   * 转出科室，科室id
   */
  rollOutDepartment: string;
  /**
   * 计划转出时间
   */
  rollOutTime: string;
  /**
   * 单据状态，1：未提交；2：审批中；3：审批结束；4：删除
   */
  status: string;
  /**
   * 申请人，人员id
   */
  userId: string;
}
