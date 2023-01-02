import ALL_OPTIONS from '@/shared/options'
import { BusinessViewModule } from '@/store/modules/business'
/**
 * 设备基础信息
 */
export const equipmentVO = [
  { label: '设备名称', key: 'name' },
  { label: '设备来源', key: 'source' },
  { label: '设备原值', key: 'region' },
  { label: '设备数量', key: 'num' },
  { label: '设备型号', key: 'marking' },
  { label: '注册证号', key: 'registrationCertificat' },
  {
    label: '科室',
    key: 'departmentId',
    type: 'treeSelect',
    options: BusinessViewModule.departmentData
  },
  { label: '产品批号', key: 'batchNumber' },
  {
    label: '设备状态',
    key: 'equipmentStates',
    type: 'select',
    options: ALL_OPTIONS.equipmentStates
  },
  {
    label: '设备是否删除',
    key: 'state',
    type: 'select',
    options: ALL_OPTIONS.isORnot
  },
  { label: '品牌', key: 'brand' },
  { label: '生产商', key: 'manufactorId' },
  { label: '购入日期', key: 'intakeDate', type: 'date' },
  {
    label: '状态',
    key: 'isExordium',
    type: 'select',
    options: ALL_OPTIONS.isExordium
  },
  { label: '生产厂家', key: 'manufactorId' },
  { label: '采购日期', key: 'purchaseTime', type: 'date' },
  { label: '二维码base64', key: 'qrcode' },
  { label: '设备档案编号', key: 'recordNo' },
  { label: '维保服务商', key: 'facilitator' },
  { label: '维保截止日期', key: 'guarantee', type: 'date' },
  { label: '国别', key: 'region', type: 'select', options: ALL_OPTIONS.region },
  { label: '财务编号', key: 'financialNo' },
  { label: '启用日期', key: 'activationTime', type: 'date' },
  { label: '注册证号', key: 'registrationCertificat' },
  { label: '评分指南', key: 'scoringGuideUrl' },
  {
    label: '设备来源',
    key: 'source',
    type: 'select',
    options: ALL_OPTIONS.source
  },
  { label: '设备单位', key: 'unit' },
  { label: '固定资产编号', key: 'fixedAssetsNo' },
  { label: '固定资产分类', key: 'fixedassetsType' },
  { label: '折旧月数', key: 'depreciationPeriods' },
  { label: '产地', key: 'origin' },
  { label: '条形码', key: 'barCode' },
  { label: '条形码编码', key: 'barCodeNo' },
  { label: '设备类别id', key: 'equipmentCategoryId' },
  { label: '设备所在地', key: 'equipmentLocation' },
  { label: '设备负责人', key: 'equipmentPrincipal' },
  { label: '医院id', key: 'hospitalId' },
  { label: '设备唯一识别码', key: 'idCode' },
  { label: '设备图片', key: 'img' },
  {
    label: '是否急救设备',
    key: 'isEmergency',
    type: 'select',
    options: ALL_OPTIONS.isORnot
  },
  {
    label: '是否固定资产',
    key: 'isFixedassets',
    type: 'select',
    options: ALL_OPTIONS.isORnot
  },
  {
    label: '是否特种设备',
    key: 'isSpecial',
    type: 'select',
    options: ALL_OPTIONS.isORnot
  },
  {
    label: '是否计量检查',
    key: 'isMetering',
    type: 'select',
    options: ALL_OPTIONS.isMetering
  },
  {
    label: '是否计量设备',
    key: 'meterings',
    type: 'select',
    options: ALL_OPTIONS.meterings
  },
  { label: '计量检查日期', key: 'meteringTime', type: 'date' },
  { label: '计量器具类别', key: 'meteringType' },
  { label: '上市许可持有人名称', key: 'productionName' },
  { label: '生产日期', key: 'productionTime', type: 'date' },
  { label: '保质期', key: 'validity' }
]

/**
 * 设备采购信息
 */
export const equipmentPurchases = [
  { label: '到货截止日期', key: 'aogDeadlineTime', type: 'date' },
  { label: '到货日期', key: 'aogTime', type: 'date' },
  { label: '论证日期', key: 'argumentationTime', type: 'date' },
  { label: '中标时间', key: 'biddingTime', type: 'date' },
  { label: '单项预算', key: 'budget' },
  { label: '验收情况', key: 'checkNote' },
  { label: '合同金额', key: 'contractAmount' },
  { label: '合同截至日期', key: 'contractDeadlineTime', type: 'date' },
  { label: '合同名称', key: 'contractName' },
  { label: '合同编码', key: 'contractNum' },
  { label: '设备id', key: 'equipmentId' },
  { label: '招标形式', key: 'invitationType' },
  { label: '乙方联系方式', key: 'partyBPhone' },
  { label: '乙方单位', key: 'partyBUnit' },
  { label: '乙方联系人', key: 'partyBUser' },
  { label: '立项依据', key: 'projectNote' },
  { label: '申购理由', key: 'purchaseNote' },
  { label: '验收合格日期', key: 'acceptanceTime', type: 'date' },
  { label: '初次验收日期', key: 'oneCheckTime', type: 'date' },
  { label: '二次验收日期', key: 'twoCheckTime', type: 'date' },
  { label: '首款日期', key: 'firstAmountTime', type: 'date' },
  { label: '尾款日期', key: 'endAmountTime', type: 'date' },
  { label: '购置日期', key: 'purchaseTime', type: 'date' },
  { label: '购置类别', key: 'purchaseType' },
  { label: '采购方式', key: 'purchaseWay' },
  { label: '档案编码', key: 'recordNum' },
  { label: '档案管理员', key: 'recordUser' },
  { label: '附属资料', key: 'resource' },
  { label: '签订日期', key: 'signingTime', type: 'date' },

  { label: '付款金额', key: 'amount' },
  { label: '付款日期', key: 'paymentTime', type: 'date' },
  { label: '期数', key: 'periods' },
  { label: '预付日期', key: 'prepaymentTime', type: 'date' },
  { label: '采购id', key: 'purchaseId' },
  { label: '付款状态', key: 'status' }
]

/**
 * 设备折旧表
 */
export const equipmentDepreciations = [
  { label: '折旧金额', key: 'depreciationAmount' },
  { label: '折旧年限', key: 'depreciationLimit' },
  { label: '折旧月数', key: 'depreciationPeriods' },
  { label: '折旧日期', key: 'depreciationTime', type: 'date' },
  { label: '折旧负责人', key: 'depreciationUser' },
  { label: '设备ID', key: 'equipmentId' }
]

/**
 * 设备保养
 */
export const equipmentMaintain = [
  { label: '费用', key: 'cost' },
  { label: '医院ID', key: 'companyInfoId' },
  { label: '创建时间', key: 'createtime', type: 'date' },
  { label: '维保服务商', key: 'facilitator' },
  { label: '维保服务商联系方式', key: 'facilitatorPhone' },
  { label: '附件图片', key: 'img' },
  {
    label: '设备',
    key: 'equipmentId',
    type: 'select',
    options: BusinessViewModule.equipmentData
  },
  { label: '上次保养时间', key: 'lastMaintainTime', type: 'date' },
  { label: '下次保养时间', key: 'nextMaintainTime', type: 'date' },
  { label: '耗材', key: 'parts' },
  { label: '保养人', key: 'userId' },
  { label: '保修截至日期', key: 'warrantyPeriod' }
]

/**
 * 设备资料
 */
export const equipmentResources = [
  { label: '使用说明书名称', key: 'instructionsName' },
  { label: '使用说明书url', key: 'instructionsUrl' },
  { label: '保养说明书名称', key: 'maintainName' },
  { label: '保养说明书url', key: 'maintainUrl' }, // maintainUrl
  { label: '计量操作文档名称', key: 'meteringName' },
  { label: '计量操作文档url', key: 'meteringUrl' },
  { label: '设备ID', key: 'equipmentId' },
  { label: '付款计划名称', key: 'paymentName' },
  { label: '付款计划url', key: 'paymentUrl' },
  { label: '技术参数名称', key: 'technologyName' },
  { label: '技术参数url', key: 'technologyUrl' }
]

/**
 * 设备仓库记录
 */
export const equipmentStocks = [
  { label: '库存量', key: 'boundNums' },
  { label: '仓库id', key: 'departmentId' },
  { label: '设备ID', key: 'equipmentId' }
]

/**
 * 出入库
 */
export const equipmentStores = [
  { label: '变更后库存量', key: 'afterBoundNum' },
  { label: '变更前库存量', key: 'beforeBoundNum' },
  { label: '出入库操作人', key: 'bounder' },
  { label: '出入库数量', key: 'boundNums' },
  { label: '出入库时间', key: 'boundTime' },
  { label: '出入库类型', key: 'boundType' },
  { label: '仓库id', key: 'departmentId' },
  { label: '设备ID', key: 'equipmentId' },
  { label: '备注', key: 'note' },
  { label: '领用人', key: 'receivePerson' }
]

/**
 * 设备巡检
 */
export const equipmentInspection = [
  { label: '外观描述', key: 'appearance' },
  { label: '仓库id', key: 'departmentId' },
  { label: '设备ID', key: 'equipmentId' },
  { label: '添加日期', key: 'createtime', type: 'date' },
  { label: '巡检描述', key: 'description' },
  { label: '异常描述', key: 'function' },
  { label: '图片', key: 'img' },
  { label: '巡检日期', key: 'inspectionTime' },
  { label: '外观是否损坏，', key: 'isAppearance' },
  { label: '功能是否正常，', key: 'isFunction' },
  { label: '配件是否正常', key: 'isParts' },
  { label: '保修期是否已过，', key: 'isPeriod' },
  { label: '备注', key: 'note' },
  { label: '配件描述', key: 'parts' },
  { label: '巡检人', key: 'userId' }
]