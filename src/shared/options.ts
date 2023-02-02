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

  ]
}

export const APPLY_URL:any = {
  BFSQ: 'scrapApply/saveScrapApply',
  JYSQ: 'borrowApply/saveBorrowApply',
  PDSQ: 'checkApply/saveCheckApply',
  ZKSQ: 'rollDepartment/saveRollDepartment',
  KSSQ: 'kssq/saveOrUpdate',
  WDSQ: 'transferApply/saveTransferApply'
}

export const equipmentCategoryData: any = {
  id: '',
  state: 1,
  equipmentVO: {
    name: '',
    createtime: '',
    departmentId: '',
    marking: '',
    brand: '',
    origin: '',
    equipmentCategoryId: '',
    activationTime: '',
    guarantee: '',
    hospitalId: '',
    manufactorId: '',
    equipmentStates: '',
    idCode: '',
    price: '',
    batchNumber: '',
    registrationCertificat: '',
    productionName: '',
    productionTime: '',
    validity: '',
    region: '',
    purchaseTime: '',
    isExordium: '',
    meterings: '',
    source: '',
    isMetering: '',
    meteringTime: '',
    meteringType: '',
    isEmergency: '',
    isFixedassets: '',
    isSpecial: '',
    fixedassetsType: '',
    intakeDate: '',
    financialNo: '',
    equipmentLocation: '',
    fixedAssetsNo: '',
    recordNo: '',
    unit: '',
    equipmentPrincipal: '',
    barCodeNo: '',
    img: '',
    scoringGuideUrl: '',
    qrcode: '',
    barCode: ''
  },
  equipmentMaintain: {
    lastMaintainTime: '',
    nextMaintainTime: null,
    cost: '',
    createtime: null,
    companyInfoId: '',
    userId: '',
    warrantyPeriod: null,
    facilitator: null,
    facilitatorPhone: '',
    parts: '',
    img: null,
    description: ''
  },
  equipmentPurchases: {
    installTime: '',
    aogDeadlineTime: '',
    aogTime: '',
    argumentationTime: '',
    biddingTime: '',
    budget: '',
    checkNote: '',
    contractAmount: '',
    contractDeadlineTime: '',
    contractName: '',
    contractNum: '',
    invitationType: '',
    partyBPhone: '',
    partyBUnit: '',
    partyBUser: '',
    projectNote: '',
    purchaseNote: '',
    acceptanceTime: '',
    oneCheckTime: '',
    twoCheckTime: '',
    firstAmountTime: '',
    endAmountTime: '',
    purchaseTime: '',
    purchaseType: '',
    purchaseWay: '',
    recordNum: '',
    recordUser: '',
    resource: '',
    signingTime: '',
    tHospitalEquipmentPayments: [
      {
        id: '',
        amount: '',
        paymentTime: '',
        periods: '',
        prepaymentTime: '',
        purchaseId: '',
        status: ''
      }
    ]
  },
  equipmentStores: {
    departmentId: '',
    boundTime: '',
    boundType: '',
    bounder: '',
    receivePerson: '',
    boundNums: '',
    beforeBoundNum: '',
    afterBoundNum: '',
    note: ''
  },
  // {
  //   id: "",
  //   equipmentId: "",
  //   departmentId: "3F503E8DA335FA-C0C9-4FCE-A8C9-F9C0D2C56169",
  //   boundTime: "2022-12-31T16:00:00",
  //   boundType: "出库",
  //   bounder: "C076245F7D308A-CAD4-49E8-BAB6-987544490306",
  //   receivePerson: "E1D6AB19EF6720-B4EA-46DF-BE10-96F03712FB65",
  //   boundNums: "2",
  //   beforeBoundNum: "10",
  //   afterBoundNum: "8",
  //   note: "出库"
  // }
  equipmentResources: {
    maintainUrl: '',
    meteringUrl: '',
    technologyUrl: '',
    paymentUrl: '',
    instructionsUrl: '',
    maintainName: '',
    meteringName: '',
    technologyName: '',
    paymentName: '',
    instructionsName: ''
  },
  equipmentStocks: {
    departmentId: '',
    boundNums: ''
  },
  equipmentDepreciations: {
    depreciationTime: '',
    depreciationLimit: '',
    depreciationAmount: '',
    depreciationPeriods: '',
    depreciationUser: ''
  },
  equipmentInspection: {
    isPeriod: '',
    isAppearance: '',
    isParts: '',
    isFunction: '',
    inspectionTime: '',
    createtime: null,
    userId: '22',
    appearance: '',
    parts: '',
    function: '',
    img: '',
    description: '',
    note: null
  }
} // 设备新增或编辑表单
