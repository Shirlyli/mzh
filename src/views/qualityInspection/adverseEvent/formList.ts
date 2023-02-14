export const FormListData = [
  {
    field: 'uploader',
    title: '上传人',
    span: 12,
    type: 'input',
    required: true
  },
  {
    field: 'eventTime',
    title: '事件发生日期',
    span: 12,
    type: 'date',
    required: true

  },
  {
    field: 'adverseDesc',
    title: '不良情况描述',
    span: 12,
    type: 'textarea'
  },
  {
    field: 'patientName',
    title: '患者姓名',
    span: 12,
    type: 'input'
  },
  {
    field: 'patientSex',
    title: '患者性别',
    span: 12,
    type: 'select',
    data: [
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ]
  },
  {
    field: 'patientAge',
    title: '患者年龄',
    span: 12,
    type: 'input'
  },
  {
    field: 'anticipatedTherapeuticEffect',
    title: '预期治疗疾病或作用',
    span: 12,
    type: 'input'
  },
  {
    field: 'useScenario',
    title: '使用场景',
    span: 12,
    type: 'input'
  },
  {
    field: 'useProcess',
    title: '使用过程',
    span: 12,
    type: 'input'
  },
  {
    field: 'combinedMedication',
    title: '合并用药/械情况',
    span: 12,
    type: 'input'
  },
  {
    field: 'causeAnalysis',
    title: '事件原因分析',
    span: 12,
    type: 'input'
  }

]
