export const ALL_OPTIONS = {
  // 医院配置
  hospital: {
    id: '3A8F0344E6AC24-2F51-4154-B02B-B1CBA28B4F85',
    name: '武汉市人民医院'
  },
  // 重要程度
  IMPORTANT: [
    { label: '重要', value: '重要' },
    { label: '次要', value: '次要' },
    { label: '一般', value: '一般' }
  ],
  // 厂商类型
  suppliesType: [
    { label: '生产商', value: '1' },
    { label: '供应商', value: '2' },
    { label: '维修商', value: '3' }
  ],
  // 运营状态
  runningState: [
    { label: '正常', value: 1 },
    { label: '注销', value: 2 }
  ],
  // 菜单类型
  MENU_TYPES: [
    {
      value: '1',
      label: '目录'
    },
    {
      value: '2',
      label: '菜单'
    },
    {
      value: '3',
      label: '按钮'
    }
  ],
  // 性别
  sex: [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ],
  //  设备状态
  equipmentStates: [
    { label: '正常', value: 1 },
    { label: '报修', value: 2 },
    { label: '报废', value: 3 },
    { label: '丢失', value: 4 },
    { label: '停用', value: 5 }
  ],
  // 状态
  isExordium: [
    { label: '正常', value: 1 },
    { label: '外调中', value: 2 }
  ],
  // 是否
  isORnot: [
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ],
  // 计量检查
  isMetering: [
    { label: '未检查', value: 0 },
    { label: '已检查', value: 1 }
  ],
  // 是否计量单位
  meterings: [
    { label: '不是计量设备', value: 0 },
    { label: '是计量设备', value: 1 }
  ],
  // 国别
  region: [
    { label: '国内', value: 1 },
    { label: '国外', value: 2 }
  ],
  // 设备来源
  source: [
    { label: '采购', value: 1 },
    { label: '捐赠', value: 2 },
    { label: '政府配发', value: 3 }
  ],
  // 是否删除
  state: [
    { label: '正常', value: 1 },
    { label: '删除', value: 2 }
  ],
  // 流程状态
  APPROVE_STATUS: [
    { label: '终止', value: 1 },
    { label: '待审批', value: 2 },
    { label: '退回', value: 3 },
    { label: '通过', value: 4 }
  ],
  // 归还状态 0：未归还；1：已归还
  RETURN_STATUS: [
    { label: '未归还', value: 0 },
    { label: '已归还', value: 1 }
  ],
  // 设备归还状态
  EQUIP_STATUS: [
    { label: '完好', value: 1 },
    { label: '异常', value: 2 }
  ],
  // 审批状态
  APPROVAL_STATUS: [
    { label: '同意', value: 1 },
    { label: '驳回', value: 0 }
  ],
  // 主流程状态
  MAIN_STATUS: [
    { label: '申请', value: 1 },
    { label: '派工', value: 2 },
    { label: '维修中', value: 3 },
    { label: '待验收', value: 4 },
    { label: '已验收', value: 5 }
  ],
  // 子流程状态
  CHILD_STATUS: [
    { label: '流转中', value: 20 },
    { label: '退回', value: 21 },
    { label: '作废', value: 22 },
    { label: '已归档', value: 23 }
  ],
  // 购置类别
  purchaseType: [
    { label: '新增', value: '新增' },
    { label: '添置', value: '添置' }
  ],
  // 采购类型
  applyModle: [
    { label: '自行招标额度', value: '自行招标额度' },
    { label: '内部招标额度', value: '内部招标额度' }
  ]
}

export const APPLY_URL: any = {
  BFSQ: 'scrapApply/saveScrapApply',
  JYSQ: 'borrowApply/saveBorrowApply',
  PDSQ: 'checkApply/saveCheckApply',
  ZKSQ: 'rollDepartment/saveRollDepartment',
  KSSQ: 'kssq/saveOrUpdate',
  WDSQ: 'transferApply/saveTransferApply'
}

export const equipmentCategoryData: any = {
  id: null,
  state: 1,
  equipmentVO: {
    name: null,
    createtime: null,
    departmentId: null,
    marking: null,
    brand: null,
    origin: null,
    equipmentCategoryId: null,
    activationTime: null,
    guarantee: null,
    hospitalId: null,
    manufactorId: null,
    equipmentStates: null,
    idCode: null,
    price: null,
    batchNumber: null,
    registrationCertificat: null,
    productionName: null,
    productionTime: null,
    validity: null,
    region: null,
    purchaseTime: null,
    isExordium: null,
    meterings: null,
    source: null,
    isMetering: null,
    meteringTime: null,
    meteringType: null,
    isEmergency: null,
    isFixedassets: null,
    isSpecial: null,
    fixedassetsType: null,
    intakeDate: null,
    financialNo: null,
    equipmentLocation: null,
    fixedAssetsNo: null,
    recordNo: null,
    unit: null,
    equipmentPrincipal: null,
    barCodeNo: null,
    img: null,
    scoringGuideUrl: null,
    qrcode: null,
    barCode: ''
  },
  equipmentMaintain: {
    lastMaintainTime: null,
    nextMaintainTime: null,
    cost: null,
    createtime: null,
    companyInfoId: null,
    userId: null,
    warrantyPeriod: null,
    facilitator: null,
    facilitatorPhone: null,
    parts: null,
    img: null,
    description: ''
  },
  equipmentPurchases: {
    installTime: null,
    aogDeadlineTime: null,
    aogTime: null,
    argumentationTime: null,
    biddingTime: null,
    budget: null,
    checkNote: null,
    contractAmount: null,
    contractDeadlineTime: null,
    contractName: null,
    contractNum: null,
    invitationType: null,
    partyBPhone: null,
    partyBUnit: null,
    partyBUser: null,
    projectNote: null,
    purchaseNote: null,
    acceptanceTime: null,
    oneCheckTime: null,
    twoCheckTime: null,
    firstAmountTime: null,
    endAmountTime: null,
    purchaseTime: null,
    purchaseType: null,
    purchaseWay: null,
    recordNum: null,
    recordUser: null,
    resource: null,
    signingTime: null,
    tHospitalEquipmentPayments: [
      {
        id: null,
        amount: null,
        paymentTime: null,
        periods: null,
        prepaymentTime: null,
        purchaseId: null,
        status: ''
      }
    ]
  },
  equipmentStores: {
    departmentId: null,
    boundTime: null,
    boundType: null,
    bounder: null,
    receivePerson: null,
    boundNums: null,
    // beforeBoundNum: null,
    // afterBoundNum: null,
    note: null,
    destinationId: null,
    idCode: null
  },
  equipmentResources: {
    maintainUrl: null,
    meteringUrl: null,
    technologyUrl: null,
    paymentUrl: null,
    instructionsUrl: null,
    maintainName: null,
    meteringName: null,
    technologyName: null,
    paymentName: null,
    instructionsName: ''
  },
  equipmentStocks: {
    departmentId: null,
    boundNums: ''
  },
  equipmentDepreciations: {
    depreciationTime: null,
    depreciationLimit: null,
    depreciationAmount: null,
    depreciationPeriods: null,
    depreciationUser: ''
  },
  equipmentInspection: {
    isPeriod: null,
    isAppearance: null,
    isParts: null,
    isFunction: null,
    inspectionTime: null,
    createtime: null,
    userId: '22',
    appearance: null,
    parts: null,
    function: null,
    img: null,
    description: null,
    note: null
  }
} // 设备新增或编辑表单
