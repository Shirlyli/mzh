export interface EquipmentInfoTypes {
  id: string;
  /**
   * 删除  1：正常；0：删除
   */
  state?: number;
  /**
   * 设备基础信息
   */
  tHospitalEquipment: THospitalEquipment;
  /**
   * 设备折旧表
   */
  thospitalEquipmentDepreciations?: ThospitalEquipmentDepreciation[];
  /**
   * 设备保养
   */
  thospitalEquipmentMaintainWithBLOBs?: ThospitalEquipmentMaintainWithBLOB[];
  tHospitalEquipmentPurchases: THospitalEquipmentPurchase[];
  /**
   * 设备资料
   */
  thospitalEquipmentResources?: ThospitalEquipmentResource[];
  /**
   * 设备仓库记录
   */
  thospitalEquipmentStocks?: ThospitalEquipmentStock[];
  /**
   * 出入库
   */
  thospitalEquipmentStores?: ThospitalEquipmentStore[];
  /**
   * 设备巡检
   */
  tmzhEquipmentInspectionWithBLOBs?: TmzhEquipmentInspectionWithBLOB[];
}

/**
 * 设备基础信息
 */
export interface THospitalEquipment {
  /**
   * 启用时间
   */
  activationTime: string;
  /**
   * 条形码
   */
  barCode: string;
  /**
   * 条形码编码
   */
  barCodeNo: string;
  /**
   * 产品批号  自己生成
   */
  batchNumber: string;
  /**
   * 品牌
   */
  brand: string;
  /**
   * 添加时间
   */
  createtime: string;
  /**
   * 科室id
   */
  departmentId: string;
  /**
   * 设备类别id
   */
  equipmentCategoryId: string;
  /**
   * 设备所在地
   */
  equipmentLocation: string;
  /**
   * 设备负责人
   */
  equipmentPrincipal: string;
  /**
   * 1：正常；2：报修；3：报废；4：丢失；5:停用
   */
  equipmentStates: string;
  /**
   * 财务编号
   */
  financialNo: string;
  /**
   * 固定资产编号
   */
  fixedAssetsNo: string;
  /**
   * 固定资产分类
   */
  fixedassetsType: string;
  /**
   * 保修期 单位 月
   */
  guarantee: string;
  /**
   * 医院id
   */
  hospitalId: string;
  id: string;
  /**
   * 设备唯一识别码
   */
  idCode: string;
  /**
   * 设备图片
   */
  img: string;
  /**
   * 购入日期
   */
  intakeDate: string;
  /**
   * 是否急救设备
   */
  isEmergency: string;
  /**
   * 1：正常；2：外调中
   */
  isExordium: string;
  /**
   * 是否固定资产
   */
  isFixedassets: string;
  /**
   * 计量检查0：未检查；1：已检查
   */
  isMetering: string;
  /**
   * 是否特种设备
   */
  isSpecial: string;
  /**
   * 生产厂家
   */
  manufactorId: string;
  /**
   * 设备型号
   */
  marking: string;
  /**
   * 0：不是计量设备；2：是计量设备
   */
  meterings: string;
  /**
   * 计量检查日期  一个日期时间段
   */
  meteringTime: string;
  /**
   * 计量器具类别
   */
  meteringType: string;
  /**
   * 设备名称
   */
  name: string;
  /**
   * 产地
   */
  origin: string;
  /**
   * 设备价格
   */
  price: string;
  /**
   * 上市许可持有人名称
   */
  productionName: string;
  /**
   * 生产日期
   */
  productionTime: string;
  /**
   * 采购日期
   */
  purchaseTime: string;
  /**
   * 二维码base64
   */
  qrcode: string;
  /**
   * 设备档案编号
   */
  recordNo: string;
  /**
   * 1:国内；2：国外
   */
  region: string;
  /**
   * 注册证号
   */
  registrationCertificat: string;
  /**
   * 评分指南
   */
  scoringGuideUrl: string;
  /**
   * 设备来源。1:采购；2：捐赠；3：政府配发
   */
  source: string;
  /**
   * 删除  1：正常；0：删除
   */
  state: number;
  /**
   * 设备单位
   */
  unit: string;
  /**
   * 保质期 单位 年
   */
  validity: string;
}

export interface THospitalEquipmentPurchase {
  /**
   * 验收合格日期
   */  acceptanceTime: string;
  /**
   * 到货截止日期
   */
  aogDeadlineTime: string;
  /**
   * 到货日期
   */
  aogTime: string;
  /**
   * 论证日期
   */
  argumentationTime: string;
  /**
   * 中标时间
   */
  biddingTime: string;
  /**
   * 单项预算
   */
  budget: string;
  /**
   * 验收情况
   */
  checkNote: string;
  /**
   * 合同金额
   */
  contractAmount: string;
  /**
   * 合同截至日期
   */
  contractDeadlineTime: string;
  /**
   * 合同名称
   */
  contractName: string;
  /**
   * 合同编码
   */
  contractNum: string;
  /**
   * 尾款日期
   */
  endAmountTime: string;
  /**
   * 设备id
   */
  equipmentId: string;
  /**
   * 首款日期
   */
  firstAmountTime: string;
  id: string;
  /**
   * 安装日期
   */
  installTime: string;
  /**
   * 招标形式
   */
  invitationType: string;
  /**
   * 第一次验收时间
   */
  oneCheckTime: string;
  /**
   * 乙方联系方式
   */
  partyBPhone: string;
  /**
   * 乙方单位
   */
  partyBUnit: string;
  /**
   * 乙方联系人
   */
  partyBUser: string;
  /**
   * 立项依据
   */
  projectNote: string;
  /**
   * 申购理由
   */
  purchaseNote: string;
  /**
   * 购置日期
   */
  purchaseTime: string;
  /**
   * 购置类别
   */
  purchaseType: string;
  /**
   * 采购方式
   */
  purchaseWay: string;
  /**
   * 档案编码
   */
  recordNum: string;
  /**
   * 档案管理员
   */
  recordUser: string;
  /**
   * 附属资料
   */
  resource: string;
  /**
   * 签订日期
   */
  signingTime: string;
  tHospitalEquipmentPayments: THospitalEquipmentPayment[];
  /**
   * 第二次验收时间
   */
  twoCheckTime: string;
}

export interface THospitalEquipmentPayment {
  /**
   * 付款金额
   */
  amount: string;
  id: string;
  /**
   * 付款日期
   */
  paymentTime: string;
  /**
   * 期数
   */
  periods: string;
  /**
   * 预付日期
   */
  prepaymentTime: string;
  /**
   * 采购id
   */
  purchaseId: string;
  /**
   * 付款状态
   */
  status: string;
}

export interface ThospitalEquipmentDepreciation {
  /**
   * 折旧金额
   */
  depreciationAmount?: string;
  /**
   * 折旧年限
   */
  depreciationLimit?: string;
  /**
   * 折旧月数
   */
  depreciationPeriods?: string;
  /**
   * 折旧日期
   */
  depreciationTime?: string;
  /**
   * 折旧负责人
   */
  depreciationUser?: string;
  /**
   * 设备ID
   */
  equipmentId?: string;
  id?: string;
}

export interface ThospitalEquipmentMaintainWithBLOB {
  /**
   * 医院ID
   */
  companyInfoId?: string;
  /**
   * 费用
   */
  cost?: number;
  /**
   * 创建时间
   */
  createtime?: null;
  /**
   * 描述
   */
  description?: string;
  /**
   * 设备ID
   */
  equipmentId?: string;
  /**
   * 维保服务商
   */
  facilitator?: null;
  /**
   * 维保服务商联系方式
   */
  facilitatorPhone?: string;
  id?: string;
  /**
   * 附件图片
   */
  img?: null;
  /**
   * 上次保养时间
   */
  lastMaintainTime?: string;
  /**
   * 下次保养时间
   */
  nextMaintainTime?: null;
  /**
   * 耗材
   */
  parts?: string;
  /**
   * 保养人
   */
  userId?: string;
  /**
   * 保修截至日期
   */
  warrantyPeriod?: null;
}

export interface ThospitalEquipmentResource {
  /**
   * 设备id
   */
  equipmentId?: string;
  id?: string;
  /**
   * 使用说明书名称
   */
  instructionsName?: string;
  /**
   * 使用说明书url
   */
  instructionsUrl?: string;
  /**
   * 保养说明书名称
   */
  maintainName?: string;
  /**
   * 保养说明书url
   */
  maintainUrl?: string;
  /**
   * 计量操作文档名称
   */
  meteringName?: string;
  /**
   * 计量操作文档url
   */
  meteringUrl?: string;
  /**
   * 付款计划名称
   */
  paymentName?: string;
  /**
   * 付款计划url
   */
  paymentUrl?: string;
  /**
   * 技术参数名称
   */
  technologyName?: string;
  /**
   * 技术参数url
   */
  technologyUrl?: string;
}

export interface ThospitalEquipmentStock {
  /**
   * 库存量
   */
  boundNums?: string;
  /**
   * 仓库id（组织机构id）
   */
  departmentId?: string;
  /**
   * 设备ID
   */
  equipmentId?: string;
  id?: string;
}

export interface ThospitalEquipmentStore {
  /**
   * 变更后库存量
   */
  afterBoundNum: string;
  /**
   * 变更前库存量
   */
  beforeBoundNum: string;
  /**
   * 出入库操作人
   */
  bounder: string;
  /**
   * 出入库数量
   */
  boundNums: string;
  /**
   * 出入库时间
   */
  boundTime: string;
  /**
   * 出入库类型
   */
  boundType: string;
  /**
   * 仓库id（组织机构id）
   */
  departmentId: string;
  /**
   * 设备ID
   */
  equipmentId: string;
  id: string;
  /**
   * 备注
   */
  note: string;
  /**
   * 领用人
   */
  receivePerson: string;
}

export interface TmzhEquipmentInspectionWithBLOB {
  /**
   * 外观描述
   */
  appearance?: string;
  /**
   * 添加日期
   */
  createtime?: null;
  /**
   * 巡检描述
   */
  description?: string;
  /**
   * 设备ID
   */
  equipmentId?: string;
  /**
   * 异常描述
   */
  function?: string;
  id?: string;
  /**
   * 图片
   */
  img?: string;
  /**
   * 巡检日期
   */
  inspectionTime?: string;
  /**
   * 外观是否损坏， 0：损坏；1：完好
   */
  isAppearance?: number;
  /**
   * 功能是否正常， 0：不正常；1：正常
   */
  isFunction?: number;
  /**
   * 配件是否正常 ，0：不正常；1：正常
   */
  isParts?: number;
  /**
   * 保修期是否已过， 0：保修期以过；1：保修期未过
   */
  isPeriod?: number;
  /**
   * 备注
   */
  note?: null;
  /**
   * 配件描述
   */
  parts?: string;
  /**
   * 巡检人
   */
  userId?: string;
}
