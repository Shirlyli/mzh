// 基本信息
export const equipmentBasicInfo = [
  { label: "设备编号", key: "activationTime" },
  { label: "原设备编号", key: "title" },
  { label: "注册证号", key: "title" },
  { label: "设备名称", key: "name" },
  { label: "设备来源", key: "title" },
  { label: "设备原值", key: "region" },
  { label: "设备数量", key: "num" },
  { label: "规格型号", key: "marking" },
  { label: "所属科室", key: "departmentId" },
  { label: "单位", key: "title" },
  { label: "设备类型", key: "title" },
  { label: "器械分类", key: "title" },
  { label: "供应商", key: "title" },
  { label: "品牌", key: "brand" },
  { label: "生产商", key: "manufactorId" },
  { label: "购入日期", key: "intakeDate" },
  { label: "出厂编号", key: "title" },
  { label: "出厂日期", key: "title" },
  { label: "设备分类", key: "title" },
  { label: "管理部门", key: "title" },
  { label: "设备负责人", key: "title" },
  { label: "设备序列号", key: "title" },
  { label: "维保服务商", key: "title" },
  { label: "维保截止日期", key: "guarantee" },
  { label: "发票号", key: "title" },
  { label: "财务编号", key: "financialNo" },
  { label: "启用日期", key: "activationTime" },
  { label: "启用状态", key: "title" },
  { label: "存放地点", key: "title" },
  { label: "折旧总额", key: "title" },
  { label: "国别", key: "title" },
  { label: "固定资产编号", key: "fixedAssetsNo" },
  { label: "折旧月数", key: "title" },
  { label: "产地", key: "origin" },
  { label: "档案编号", key: "title" },
  { label: "条形码", key: "barCode" },
  { label: "条形码编码", key: "barCodeNo" },
  { label: "设备类别id", key: "equipmentCategoryId" },
  { label: "设备所在地", key: "equipmentLocation" },
  { label: "设备负责人", key: "equipmentPrincipal" },
  { label: "医院id", key: "hospitalId" },
  { label: "设备唯一识别码", key: "idCode" },

  { label: "设备图片", key: "img" },

  { label: "是否急救设备", key: "isEmergency" },
  { label: "是否固定资产", key: "isFixedassets" },
  { label: "是否特种设备", key: "isSpecial" },
  { label: "是否计量检查", key: "isMetering" },


];

// 设备属性
export const equipmentProperty = [
  { label: "计量设备", key: "title" },
  { label: "账外设备", key: "title" },
  { label: "大型设备", key: "title" },
  { label: "公用设备", key: "title" },
  { label: "效益分析", key: "title" },
  { label: "附资产", key: "title" }
];

// 资金结构
export const capitalStructure = [
  { label: "自筹资金", key: "title" },
  { label: "政府拨款", key: "title" },
  { label: "科研经费", key: "title" },
  { label: "教学经费", key: "title" },
  { label: "接受捐赠", key: "title" },
  { label: "其他", key: "title" },
  { label: "备注", key: "title" }
];

/**
 * 采购信息
 */

// 申购信息
export const purchaseInfo = [
  { label: "购置类别", key: "title" },
  { label: "论证日期", key: "title" },
  { label: "申购日期", key: "title" },
  { label: "申购理由", key: "title" }
];

// 招标信息
export const biddingInfo = [
  { label: "采购方式", key: "title" },
  { label: "招标形式", key: "title" },
  { label: "单项预算", key: "title" },
  { label: "中标时间", key: "title" },
  { label: "立项依据", key: "title" }
];

// 合同信息
export const contractInfo = [
  { label: "合同编号", key: "title" },
  { label: "合同名称", key: "title" },
  { label: "乙方单位", key: "title" },
  { label: "签订日期", key: "title" },
  { label: "合同金额", key: "title" },
  { label: "合同截止日期", key: "title" },
  { label: "乙方联系人", key: "title" },
  { label: "联系电话", key: "title" },
  { label: "档案编号", key: "title" },
  { label: "档案管理层", key: "title" },
  { label: "合同内容", key: "title" }
];

// 合同付款信息

// 验收信息
export const acceptanceInfo = [
  { label: "到货截止日期", key: "title" },
  { label: "到货日期", key: "title" },
  { label: "安装日期", key: "title" },
  { label: "验收合格日期", key: "title" },
  { label: "初次验收日期", key: "title" },
  { label: "二次验收日期", key: "title" },
  { label: "首款日期", key: "title" },
  { label: "尾款日期", key: "title" },
  { label: "附属资料", key: "title" },
  { label: "验收情况", key: "title" }
];

/**
 * 设备资料
 */
export const tHospitalEquipmentResourceWithBLOBs = [
  { label: "设备ID", key: "equipmentId" },
  { label: "上次保养时间", key: "lastMaintainTime" },
  { label: "下次保养时间", key: "nextMaintainTime" },
  { label: "费用", key: "cost" },
  { label: "创建时间", key: "createtime" },
  { label: "医院ID", key: "companyInfoId" },
  { label: "保养人", key: "userId" },
  { label: "保修截至日期", key: "warrantyPeriod" },
  { label: "维保服务商", key: "facilitator" },
  { label: "维保服务商联系方式", key: "facilitatorPhone" },
  { label: "耗材", key: "parts" },
  { label: "附件图片", key: "img" },
  { label: "描述", key: "description" }
];

export interface EquipmentInfoTypes {
  /**
   * 启用时间
   */
  activationTime?: string;
  /**
   * 条形码
   */
  barCode?: string;
  /**
   * 条形码编码
   */
  barCodeNo?: string;
  /**
   * 产品批号  自己生成
   */
  batchNumber?: string;
  /**
   * 品牌
   */
  brand?: string;
  /**
   * 添加时间
   */
  createtime?: string;
  /**
   * 科室id
   */
  departmentId?: string;
  /**
   * 设备类别id
   */
  equipmentCategoryId?: string;
  /**
   * 设备所在地
   */
  equipmentLocation?: string;
  /**
   * 设备负责人
   */
  equipmentPrincipal?: string;
  /**
   * 1：正常；2：报修；3：报废；4：丢失；5:停用
   */
  equipmentStates?: number;
  /**
   * 财务编号
   */
  financialNo?: string;
  /**
   * 固定资产编号
   */
  fixedAssetsNo?: string;
  /**
   * 固定资产分类
   */
  fixedassetsType?: string;
  /**
   * 保修期 单位 月
   */
  guarantee?: number;
  /**
   * 医院id
   */
  hospitalId?: string;
  id?: string;
  /**
   * 设备唯一识别码
   */
  idCode?: string;
  /**
   * 设备图片
   */
  img?: string;
  /**
   * 购入日期
   */
  intakeDate?: string;
  /**
   * 是否急救设备
   */
  isEmergency?: string;
  /**
   * 1：正常；2：外调中
   */
  isExordium?: number;
  /**
   * 是否固定资产
   */
  isFixedassets?: string;
  /**
   * 计量检查0：未检查；1：已检查
   */
  isMetering?: number;
  /**
   * 是否特种设备
   */
  isSpecial?: string;
  /**
   * 生产厂家
   */
  manufactorId?: string;
  /**
   * 设备型号
   */
  marking?: string;
  /**
   * 0：不是计量设备；2：是计量设备
   */
  meterings?: number;
  /**
   * 计量检查日期  一个日期时间段
   */
  meteringTime?: string;
  /**
   * 计量器具类别
   */
  meteringType?: string;
  /**
   * 设备名称
   */
  name?: string;
  /**
   * 产地
   */
  origin?: string;
  /**
   * 设备价格
   */
  price?: number;
  /**
   * 上市许可持有人名称
   */
  productionName?: string;
  /**
   * 生产日期
   */
  productionTime?: string;
  /**
   * 采购日期
   */
  purchaseTime?: string;
  /**
   * 二维码base64
   */
  qrcode?: string;
  /**
   * 设备档案编号
   */
  recordNo?: string;
  /**
   * 1:国内；2：国外
   */
  region?: string;
  /**
   * 注册证号
   */
  registrationCertificat?: string;
  /**
   * 评分指南
   */
  scoringGuideUrl?: string;
  /**
   * 设备来源。1:采购；2：捐赠；3：政府配发
   */
  source?: string;
  /**
   * 删除  1：完善；0：删除；2：资料未完善
   */
  state?: number;
  /**
   * 设备折旧表
   */
  thospitalEquipmentDepreciations?: ThospitalEquipmentDepreciation[];
  /**
   * 设备保养
   */
  thospitalEquipmentMaintainWithBLOBs?: ThospitalEquipmentMaintainWithBLOB[];
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
  /**
   * 设备单位
   */
  unit?: string;
  /**
   * 保质期 单位 年
   */
  validity?: string;
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
  createtime?: string;
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
  facilitator?: string;
  /**
   * 维保服务商联系方式
   */
  facilitatorPhone?: string;
  id?: string;
  /**
   * 附件图片
   */
  img?: string;
  /**
   * 上次保养时间
   */
  lastMaintainTime?: string;
  /**
   * 下次保养时间
   */
  nextMaintainTime?: string;
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
  warrantyPeriod?: string;
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
  createtime?: string;
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
  note?: string;
  /**
   * 配件描述
   */
  parts?: string;
  /**
   * 巡检人
   */
  userId?: string;
}
