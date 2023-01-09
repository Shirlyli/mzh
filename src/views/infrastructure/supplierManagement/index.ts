import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import {
  delSupplierData,
  updateSupplierData
} from '@/api/equipment'
import { FormItemTypes, SupplierFormTypes } from './type'
import _ from 'lodash'
import { ALL_OPTIONS } from '@/shared/options'
import { FormatRunningState } from '@/utils/functions'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  public formConfig: { data: SupplierFormTypes, items: FormItemTypes[] } = {
    data: {
      domicile: '',
      id: '',
      name: '',
      nameAbbreviation: '',
      runningState: '',
      taxId: '',
      suppliesType: ''
    },
    items: [
      {
        field: 'name',
        title: '厂商名称',
        span: 6,
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入厂商名称' }
        },
        resetValue: ''
      },
      {
        field: 'nameAbbreviation',
        span: 6,
        title: '简称',
        itemRender: { name: '$input', props: { placeholder: '请输入简称' } },
        resetValue: ''
      },
      {
        field: 'taxId',
        span: 6,
        title: '纳税识别号',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入纳税识别号' }
        },
        resetValue: ''
      },
      {
        field: 'suppliesType',
        span: 6,
        title: '厂商类型',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.suppliesType
        },
        resetValue: ''
      },
      {
        field: 'runningState',
        span: 6,
        folding: true,
        title: '运营状态',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.runningState
        },
        resetValue: ''
      },
      {
        field: 'domicile',
        span: 6,
        folding: true,
        title: '注册地',
        itemRender: { name: '$input', props: { placeholder: '请输入注册地' } },
        resetValue: ''
      },
      { slots: { default: 'operate_item' }, span: 24, collapseNode: true, align: 'center' }
    ] // 表单项
  };

  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'name', title: '厂商名称' },
    { field: 'nameAbbreviation', title: '简称' },
    { field: 'taxId', title: '纳税识别号' },
    { field: 'suppliesType', title: '厂商类型' },
    {
      field: 'runningState',
      title: '运营状态',
      formatter: FormatRunningState
    },
    { field: 'assetsPro', title: ' 资产性质' },
    { field: 'domicile', title: ' 注册地' },
    { field: 'legalPerson', title: '法人' },
    { field: 'phoneNo', title: '座机' },
    { field: 'dispindex', title: ' 排序' },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  // 菜单类型
  public suppliesTypeOptions = ALL_OPTIONS.suppliesType;

  public importDialogVisible = false
  public supplierData = {
    name: '',
    nameAbbreviation: '',
    suppliesType: '',
    assetsPro: '',
    phoneNo: '',
    note: '',
    id: ''
  }; // 新增或编辑表单

  public rules = {
    name: [{ required: true, message: '请输入厂商名称', trigger: 'change' }]
  }; // 表单校验

  public dialogVisible = false; // 新增过模态框
  public dialogStatus = 'create';
  public paramsConfig = {
    url: '/supplier/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  };

  public nodeClickData: any = {}; // 点击供应商数据

  public hLevelList = []; // 字典表
  public fileList = []
  // 新增供应商
  public handleInsert() {
    this.dialogStatus = 'create'
    this.dialogVisible = true;
    (this.$refs.dataForm as Form).resetFields()
  }

  public handleReset() {
    (this.$refs.dataForm as Form).resetFields()
  }

  // 模态框关闭事件
  public handleDialogClose() {
    this.dialogVisible = false
    this.supplierData = {
      name: '',
      nameAbbreviation: '',
      suppliesType: '',
      assetsPro: '',
      phoneNo: '',
      note: '',
      id: ''
    }
  }

  // 新增供应商
  public createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const {
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note
        } = this.supplierData
        const params = {
          id: '',
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note
        }
        const res: any = await updateSupplierData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        this.$message.success('创建成功')
      }
    })
  }

  // 修改供应商
  public updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const {
          id,
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note
        } = this.supplierData
        const params = {
          id,
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note
        }
        const res: any = await updateSupplierData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false
        this.$message.success('更新成功')
      }
    })
  }

  // 触发编辑事件
  public handleUpdate(row: any) {
    const {
      id,
      name,
      nameAbbreviation,
      suppliesType,
      assetsPro,
      phoneNo,
      note
    } = row
    this.supplierData = {
      id,
      name,
      nameAbbreviation,
      suppliesType,
      assetsPro,
      phoneNo,
      note
    }
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  // 删除供应商
  public async handleRemove(row: any) {
    let params = {}
    if (Array.isArray(row)) {
      const res = _.map(row, 'id')
      params = {
        ids: res.join(',')
      }
    } else {
      params = {
        ids: row.id
      }
    }
    const res: any = await delSupplierData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    this.$message.success('删除成功')
  }

  public handleImport(row:any) {
    console.log('🚀 ~ row', row)
    this.importDialogVisible = true
  }

  public handleRemoveFile(file:any, fileList:any) {
    console.log(file, fileList)
  }

  public handlePreview(file:any) {
    console.log(file)
  }

  public handleExceed(files:any, fileList:any) {
    this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
  }

  public beforeRemove(file:any, fileList:any) {
    console.log('🚀 ~ fileList', fileList)
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
