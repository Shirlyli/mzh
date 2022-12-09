export const Basic_Form_List = [
  {
    field: "userId",
    title: "申请人",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请人" } }
  },
  {
    field: "createTime",
    title: "申请日期",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入购置类别" } }
  },
  {
    field: "rollOutDepartment",
    title: "转出科室",
    span: 12,
  },
  {
    field: "rollInDepartment",
    title: "转入科室",
    span: 12,
  },
  {
    field: "equipmentLocation",
    title: "新存放地点",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请方式" } }
  },
  {
    field: "rollOutTime",
    title: "计划转科日期",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请理由" } }
  },
  {
    field: "cause",
    title: "转科原因",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请理由" } }
  },
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
    span: 12,
  },
  {
    field: "brand",
    title: "设备品牌",
    span: 12,
  },
];

export const Approval_Form_list = [
  {
    field: "approveUser",
    title: "审批人",
    span: 12,
  },
  {
    field: "approveTime",
    title: "审批时间",
    span: 12,
  },
  {
    field: "approveOpinion",
    title: "审批意见",
    span: 12,
  },
  {
    field: "approveStatus",
    title: "审批状态",
    span: 12,
  },
  {
    field: "approveTier",
    title: "审批层级",
    span: 12,
  },
]
