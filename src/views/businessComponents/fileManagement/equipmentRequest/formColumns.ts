export const CREATE_FORM_LIST = [
  {
    field: "projectName",
    title: "项目名称",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入名称" } }
  },
  {
    field: "purchaseType",
    title: "购置类别",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入购置类别" } }
  },
  {
    field: "applyDept",
    title: "申请科室",
    span: 12,
    slots: { default: "applyDept" }
  },
  {
    field: "applyPerson",
    title: "申请人",
    span: 12,
    slots: { default: "applyPerson" }
  },
  {
    field: "applyModle",
    title: "申请方式",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请方式" } }
  },
  {
    field: "applyReson",
    title: "申请理由",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入申请理由" } }
  }
];

const aaa = [
  {
    field: "applyDetailId",
    title: "申请设备明细id",
    span: 12,
    slots: { default: "applyDetailId" }
  },
  {
    field: "enclosureId",
    title: "附件id",
    span: 12,
    slots: { default: "enclosureId" }
  },
  // { field: "applyTime", title: "申请时间", span: 12 },
  {
    field: "processCode",
    title: "流程code",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入流程code" } }
  },
  {
    field: "currentNodeName",
    title: "当前节点名称",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入当前节点名称" } }
  },
  {
    field: "currentNodeCode",
    title: "当前节点code",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入当前节点code" } }
  },
  {
    field: "nextNodeName",
    title: "下一节点名称",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入下一节点名称" } }
  },
  {
    field: "nextNodeCode",
    title: "下一节点code",
    span: 12,
    itemRender: { name: "$input", props: { placeholder: "请输入下一节点code" } }
  },
  {
    field: "nextNodeExecutor",
    title: "下一节点执行人",
    span: 12,
    slots: { default: "nextNodeExecutor" }
  },
  {
    field: "operator",
    title: "操作人",
    span: 12,
    slots: { default: "operator" }
  }
];

const bbb = {
  projectName: "项目名称aaa",
  purchaseType: "购置类别",
  applyDept: "申请科室",
  applyPerson: "申请人",
  applyModle: "申请方式",
  applyReson: "申请理由",
  applyDetailId: "申请设备明细id",
  enclosureId: "附件id",
  applyTime: null,
  processCode: "pro_kssp",
  currentNodeName: "科室申请",
  currentNodeCode: "kssq",
  nextNodeName: "科室审批",
  nextNodeCode: "kssp",
  nextNodeExecutor: "0D0228B583E85D-949F-47CF-B9DA-BC532A206EF4",
  auditStatus: "审核通过",
  auditReason: "审核结论",
  delState: "否",
  ksspPerson: "科室审批人",
  ksspTime: null,
  ksspReason: "科室审批结论",
  yzspPerson: "院长审批人",
  yzspTime: null,
  yzspReason: "院长审批结论"
};
