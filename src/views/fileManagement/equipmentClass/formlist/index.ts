import {
  THospitalEquipment,
  THospitalEquipmentPurchase,
  THospitalEquipmentPayment,
  ThospitalEquipmentDepreciation,
  ThospitalEquipmentMaintainWithBLOB,
  ThospitalEquipmentResource,
  ThospitalEquipmentStock,
  ThospitalEquipmentStore,
  TmzhEquipmentInspectionWithBLOB
} from "./interface.type";
/**
 * 设备基础信息
 */
export const tHospitalEquipment = [
  { label: "设备名称", key: "name" },
  { label: "设备来源", key: "source" },
  { label: "设备原值", key: "region" },
  { label: "设备数量", key: "num" },
  { label: "设备型号", key: "marking" },
  { label: "注册证号", key: "registrationCertificat" },
  { label: "科室id", key: "departmentId" },
  { label: "启用时间", key: "activationTime" },
  { label: "产品批号", key: "batchNumber" },
  { label: "状态", key: "equipmentStates" },
  { label: "品牌", key: "brand" },
  { label: "生产商", key: "manufactorId" },
  { label: "购入日期", key: "intakeDate" },
  { label: "设备状态", key: "isExordium" },
  { label: "生产厂家", key: "manufactorId" },
  { label: "采购日期", key: "purchaseTime" },
  { label: "二维码base64", key: "qrcode" },
  { label: "设备档案编号", key: "recordNo" },
  { label: "维保服务商", key: "facilitator" },
  { label: "维保截止日期", key: "guarantee" },
  { label: "国别", key: "region" },
  { label: "财务编号", key: "financialNo" },
  { label: "启用日期", key: "activationTime" },
  { label: "注册证号", key: "registrationCertificat" },
  { label: "评分指南", key: "scoringGuideUrl" },
  { label: "设备来源", key: "source" },
  { label: "设备单位", key: "unit" },
  { label: "固定资产编号", key: "fixedAssetsNo" },
  { label: "固定资产分类", key: "fixedassetsType" },
  { label: "折旧月数", key: "depreciationPeriods" },
  { label: "产地", key: "origin" },
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
  { label: "是否计量设备", key: "meterings" },
  { label: "计量检查日期", key: "meteringTime" },
  { label: "计量器具类别", key: "meteringType" },
  { label: "上市许可持有人名称", key: "productionName" },
  { label: "生产日期", key: "productionTime" },
  { label: "保质期", key: "validity" }
];

/**
 * 设备采购信息
 */
export const tHospitalEquipmentPurchase = [
  { label: "到货截止日期", key: "aogDeadlineTime" },
  { label: "到货日期", key: "aogTime" },
  { label: "论证日期", key: "argumentationTime" },
  { label: "中标时间", key: "biddingTime" },
  { label: "单项预算", key: "budget" },
  { label: "验收情况", key: "checkNote" },
  { label: "合同金额", key: "contractAmount" },
  { label: "合同截至日期", key: "contractDeadlineTime" },
  { label: "合同名称", key: "contractName" },
  { label: "合同编码", key: "contractNum" },
  { label: "设备id", key: "equipmentId" },
  { label: "招标形式", key: "invitationType" },
  { label: "乙方联系方式", key: "partyBPhone" },
  { label: "乙方单位", key: "partyBUnit" },
  { label: "乙方联系人", key: "partyBUser" },
  { label: "立项依据", key: "projectNote" },
  { label: "申购理由", key: "purchaseNote" },
  { label: "验收合格日期", key: "acceptanceTime" },
  { label: "初次验收日期", key: "oneCheckTime" },
  { label: "二次验收日期", key: "twoCheckTime" },
  { label: "首款日期", key: "firstAmountTime" },
  { label: "尾款日期", key: "endAmountTime" },
  { label: "购置日期", key: "purchaseTime" },
  { label: "购置类别", key: "purchaseType" },
  { label: "采购方式", key: "purchaseWay" },
  { label: "档案编码", key: "recordNum" },
  { label: "档案管理员", key: "recordUser" },
  { label: "附属资料", key: "resource" },
  { label: "签订日期", key: "signingTime" },

  { label: "付款金额", key: "amount" },
  { label: "付款日期", key: "paymentTime" },
  { label: "期数", key: "periods" },
  { label: "预付日期", key: "prepaymentTime" },
  { label: "采购id", key: "purchaseId" },
  { label: "付款状态", key: "status" }
];

/**
 * 设备折旧表
 */
export const thospitalEquipmentDepreciation = [
  { label: "折旧金额", key: "depreciationAmount" },
  { label: "折旧年限", key: "depreciationLimit" },
  { label: "折旧月数", key: "depreciationPeriods" },
  { label: "折旧日期", key: "depreciationTime" },
  { label: "折旧负责人", key: "depreciationUser" },
  { label: "设备ID", key: "equipmentId" }
];

/**
 * 设备保养
 */
export const thospitalEquipmentMaintainWithBLOBs = [
  { label: "费用", key: "cost" },
  { label: "医院ID", key: "companyInfoId" },
  { label: "创建时间", key: "createtime" },
  { label: "维保服务商", key: "facilitator" },
  { label: "维保服务商联系方式", key: "facilitatorPhone" },
  { label: "附件图片", key: "img" },
  { label: "设备ID", key: "equipmentId" },
  { label: "上次保养时间", key: "lastMaintainTime" },
  { label: "下次保养时间", key: "nextMaintainTime" },
  { label: "耗材", key: "parts" },
  { label: "保养人", key: "userId" },
  { label: "保修截至日期", key: "warrantyPeriod" }
];

/**
 * 设备资料
 */
export const thospitalEquipmentResource = [
  { label: "使用说明书名称", key: "instructionsName" },
  { label: "使用说明书url", key: "instructionsUrl" },
  { label: "保养说明书名称", key: "maintainName" },
  { label: "保养说明书url", key: "maintainUrl" },
  { label: "计量操作文档名称", key: "meteringName" },
  { label: "计量操作文档url", key: "meteringUrl" },
  { label: "设备ID", key: "equipmentId" },
  { label: "付款计划名称", key: "paymentName" },
  { label: "付款计划url", key: "paymentUrl" },
  { label: "技术参数名称", key: "technologyName" },
  { label: "技术参数url", key: "technologyUrl" }
];

/**
 * 设备仓库记录
 */
export const thospitalEquipmentStock = [
  { label: "库存量", key: "boundNums" },
  { label: "仓库id（组织机构id）", key: "departmentId" },
  { label: "设备ID", key: "equipmentId" }
];

/**
 * 出入库
 */
export const thospitalEquipmentStore = [
  { label: "变更后库存量", key: "afterBoundNum" },
  { label: "变更前库存量", key: "beforeBoundNum" },
  { label: "出入库操作人", key: "bounder" },
  { label: "出入库数量", key: "boundNums" },
  { label: "出入库时间", key: "boundTime" },
  { label: "出入库类型", key: "boundType" },
  { label: "仓库id（组织机构id）", key: "departmentId" },
  { label: "设备ID", key: "equipmentId" },
  { label: "备注", key: "note" },
  { label: "领用人", key: "receivePerson" }
];

/**
 * 设备巡检
 */
export const tmzhEquipmentInspectionWithBLOB = [
  { label: "外观描述", key: "appearance" },
  { label: "仓库id（组织机构id）", key: "departmentId" },
  { label: "设备ID", key: "equipmentId" },
  { label: "添加日期", key: "createtime" },
  { label: "巡检描述", key: "description" },
  { label: "异常描述", key: "function" },
  { label: "图片", key: "img" },
  { label: "巡检日期", key: "inspectionTime" },
  { label: "外观是否损坏，", key: "isAppearance" },
  { label: "功能是否正常，", key: "isFunction" },
  { label: "配件是否正常", key: "isParts" },
  { label: "保修期是否已过，", key: "isPeriod" },
  { label: "备注", key: "note" },
  { label: "配件描述", key: "parts" },
  { label: "巡检人", key: "userId" }
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
  { label: "档案编号", key: "recordNo" },
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
