export const BasicFormList = [
  {
    field: 'projectName',
    title: '项目名称',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入名称' } }
  },
  {
    field: 'purchaseType',
    title: '购置类别',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入购置类别' } }
  },
  {
    field: 'applyDept',
    title: '申请科室',
    span: 12,
    slots: { default: 'applyDept' }
  },
  {
    field: 'applyPerson',
    title: '申请人',
    span: 12,
    slots: { default: 'applyPerson' }
  },
  {
    field: 'applyModle',
    title: '申请方式',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入申请方式' } }
  },
  {
    field: 'applyReson',
    title: '申请理由',
    span: 12,
    itemRender: { name: '$input', props: { placeholder: '请输入申请理由' } }
  }
]
