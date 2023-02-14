import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import { Form } from 'element-ui'
import VexTable from '@/components/VexTable/index.vue'
import {
  dealEquipmentCategoryInfoData,
  updateEquipmentCategoryInfoData,
  updateEquipmentInfoData
} from '@/api/equipment'
import _ from 'lodash'
import { FormatIsExordium, FormatIsisMetering } from '@/utils/functions'
import moment from 'moment'
import { BusinessViewModule } from '@/store/modules/business'
import { RESULT_DATA_TYPE } from '@/utils/index.type'

@Component({
  name: 'EquipmentCategory',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  public formConfig = {
    data: {
      cName: ''
    },
    items: [
      {
        field: 'cName',
        title: '设备类别名称',
        itemRender: { name: '$input', props: { placeholder: '请输入设备类别名称' } },
        span: 8
      },
      {
        field: 'cUnit',
        title: '单位',
        itemRender: { name: '$input', props: { placeholder: '请输入设备类别名称' } },
        span: 8
      },
      // collapseNode: true, align: 'center'
      { slots: { default: 'operate_item' }, span: 8 }
    ] // 表单项
  }; // 查询配置

  public columns = [
    { type: 'seq', width: 60, fixed: 'left' },
    { type: 'checkbox', width: 60, fixed: 'left' },
    { field: 'cName', title: '设备类别类别名称', treeNode: true, width: 140 },
    { field: 'cUnit', title: '类别单位', width: 100 },
    { field: 'cLevel', title: '层级', width: 100 },
    { field: 'cCode', title: '类别编码', width: 100 },
    { field: 'pName', title: '上级版本号', width: 100 },
    { field: 'note', title: '备注', width: 100 },
    { field: 'cFinancialCode', title: '状态', width: 100, formatter: FormatIsExordium },
    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ]; // 列表配置项

  public treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  public rules = {
    cName: [
      { required: true, message: '请输入设备类别类别名称', trigger: 'change' }
    ]
  }; // 表单校验

  public dialogVisible = false; // 新增模态框
  public dialogStatus = 'create';
  public paramsConfig = {
    url: '/tHospitalEquipmentCategoryInfo/querySelfAndPar',
    params: {
      page: 1,
      limit: 10,
      entity: {
        id: ''
      }
    }
  };

  public nodeClickData: any = {}; // 点击左侧树
  public url = 'tHospitalEquipmentCategoryInfo/queryTree'; // 左侧设备类别类别

  public categoryData: any = {
    id: '',
    pid: '',
    cName: '',
    cCode: '',
    cHospCode: '',
    cFinancialCode: '',
    dispindex: '',
    flag: '',
    ctime: '',
    note: '',
    isLeaf: '',
    cLevel: ''
  }; // 设备类别新增或编辑表单

  // 新增设备类别
  public handleInsert() {
    if (!this.nodeClickData.id) {
      this.$message.error('请选中设备类别类别新增')
      return
    }
    this.dialogStatus = 'create'
    this.dialogVisible = true
    const { id, title } = this.nodeClickData
    this.categoryData = { ...this.categoryData, pName: title, pid: id }
  }

  // 接收树形组件点击节点数据
  public handleNodeClick(data: any) {
    console.log('🚀 ~ data', data)
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: '/tHospitalEquipmentCategoryInfo/querySelfAndPar',
      params: {
        page: 1,
        limit: 10,
        entity: {
          id: data.id
        }
      }
    }
  }

  // 编辑设备类别信息
  public async handleUpdate(row: any) {
    console.log('🚀 ~ row', row)
    const { id, title } = this.nodeClickData
    this.categoryData = { ...row, pName: title, pid: id }
    this.dialogVisible = true
  }

  // 删除设备类别信息
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
    const res: RESULT_DATA_TYPE | any = await dealEquipmentCategoryInfoData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }

  // 新增字典
  public createData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const res: any = await updateEquipmentCategoryInfoData(this.categoryData)
        console.log('🚀 ~ this.categoryData', this.categoryData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('创建成功')
      }
    })
  }

  // 修改字典
  public updateData() {
    debugger;
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const { id, pid, cName, cCode, cHospCode, note, cLevel, cFinancialCode } = this.categoryData
        const params = {
          id,
          pid,
          cName,
          cCode,
          cHospCode,
          cFinancialCode,
          dispindex: '',
          flag: '',
          ctime: '',
          note,
          isLeaf: '',
          cLevel
        }
        const res: any = await updateEquipmentCategoryInfoData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('更新成功')
      }
    })
  }
}
