export const FormListData = [
  // {
  //   field: 'id',
  //   title: '计量id',
  //   span: 12,
  //   type: 'input',
  //   required: true
  // },
  {
    field: 'equName',
    title: '设备名称',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'isQualified',
    title: '是否合格',
    span: 12,
    type: 'select',
    data: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }

    ],
    required: true
  },
  {
    field: 'qualifiedReason',
    title: '是否合格原因',
    span: 12,
    type: 'textarea',
    required: true
  },
  {
    field: 'checkPerson',
    title: '检查人',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'checkTime',
    title: '检查时间',
    span: 12,
    type: 'date'
  },
  {
    field: 'checkUnit',
    title: '检查单位',
    span: 12,
    type: 'input'
  },
  {
    field: 'planTime',
    title: '计划检查时间',
    span: 12,
    type: 'date'
  }
]
