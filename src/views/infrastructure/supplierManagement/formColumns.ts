import { ALL_OPTIONS } from '@/shared/options'

export const BasicFormList = [
  {
    field: 'name',
    title: '厂商名称',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'suppliesType',
    title: '厂商类型',
    span: 12,
    type: 'select',
    required: true,
    data: ALL_OPTIONS.suppliesType
  },
  {
    field: 'assetsPro',
    title: '资产性质',
    span: 12,
    type: 'input',
    slot: 'department'
  },

  {
    field: 'bussinessScope',
    title: '营业范围',
    span: 12,
    type: 'input'
  },
  {
    field: 'bussinessType',
    title: '营业类型',
    span: 12,
    type: 'input'
  },
  {
    field: 'domicile',
    title: '所在区域',
    span: 12,
    type: 'input'
  },
  {
    field: 'regeditAddress',
    title: '注册地',
    span: 12,
    type: 'input'
  },
  {
    field: 'registeredCapital',
    title: '注册资金',
    span: 12,
    type: 'input'
  },
  {
    field: 'registrationNumber',
    title: '注册账户',
    span: 12,
    type: 'input'
  },
  {
    field: 'trade',
    title: '厂商类型',
    span: 12,
    type: 'input'
  },
  {
    field: 'taxId',
    title: '纳税识别号',
    span: 12,
    type: 'input'
  },
  {
    field: 'yearReportAddress',
    title: '地址',
    span: 12,
    type: 'input'
  },
  {
    field: 'legalPerson',
    title: '法人',
    span: 12,
    type: 'input'
  },
  {
    field: 'phoneNo',
    title: '电话',
    span: 12,
    type: 'input'
  },
  {
    field: 'email',
    title: '邮箱',
    span: 12,
    type: 'input'
  },
  {
    field: 'otherEmail',
    title: '备用邮箱',
    span: 12,
    type: 'input'
  },
  {
    field: 'otherPhoneNo',
    title: '备用电话',
    span: 12,
    type: 'input'
  },

  {
    field: 'establishmentDate',
    title: '成立日期',
    span: 12,
    type: 'date'
  },
  {
    field: 'approvalDate',
    title: '审核日期',
    span: 12,
    type: 'date',
    required: true
  },
  {
    field: 'note',
    title: '备注',
    span: 12,
    type: 'input'
  }
]
