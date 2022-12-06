import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import { Form } from 'element-ui'
import VexTable from '@/components/VexTable/index.vue'
import {
  dealEquipmentCategoryInfoData,
  updateEquipmentCategoryInfoData
} from '@/api/equipment'
import _ from 'lodash'

@Component({
  name: 'EquipmentCategory',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'cName', title: '设备类别名称', treeNode: true },
    { field: 'cHospCode', title: '医疗器械编码'},
    { field: 'cFinancialCode', title: '财务编码'},
    { field: 'flag', title: '是否启用'},
    { field: 'cUnit', title: '单位'},
    { field: 'note', title: '备注' },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ]; // 列表配置项

  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  private equipmentCategoryData = {
    id: '',
    pid: '',
    pName: '',
    cName: '',
    note: '',
    cHospCode: '',
    cFinancialCode: '',
    xpath:''
  }; // 新增或编辑表单

  private rules = {
    cName: [
      { required: true, message: '请输入设备类别名称', trigger: 'change' }
    ]
  }; // 表单校验

  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create';
  private paramsConfig = {
    url: 'tHospitalEquipmentCategoryInfo/querySelfAndPar',
    params: {
      page: 1,
      limit: 10,
      entity: {
        id: '1001'
      }
    }
  };

  private nodeClickData: any = {}; // 点击左侧树
  private url = 'tHospitalEquipmentCategoryInfo/queryTree'; // 左侧设备类别

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true
    const { title, id } = this.nodeClickData
    // (this.$refs.dataForm as Form).setFiledsValue
    this.equipmentCategoryData = {
      id: '',
      pid: id ?? '1001',
      pName: title ?? "设备类别",
      cName: '',
      note: '',
      cHospCode: '',
      cFinancialCode: '',
      xpath:'',
    }
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: 'tHospitalEquipmentCategoryInfo/querySelfAndPar',
      params: {
        page: 1,
        limit: 10,
        entity: {
          id: data.id
        }
      }
    }
  }

  // 新增科室
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { id, pid, pName, cName, note,cHospCode,cFinancialCode,xpath } = this.equipmentCategoryData
        const params = {
          id:"",
          pid:pid,
          cName:cName,
          cCode: null,
          cHospCode: cHospCode,
          cFinancialCode: cFinancialCode,
          dispindex: null,
          flag: null,
          ctime: null,
          note,
          isLeaf: null,
          cLevel: null,
          xpath:xpath
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
        this.$message.success("创建成功");
      }
    })
  }

  // 修改科室
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { id, pid, pName, cName, note,cHospCode,cFinancialCode,xpath } = this.equipmentCategoryData
        const params = {
          id:id,
          pid:pid,
          pName:pName,
          cName:cName,
          cCode: null,
          cHospCode: cHospCode,
          cFinancialCode: cFinancialCode,
          dispindex: null,
          flag: null,
          ctime: null,
          note,
          isLeaf: null,
          cLevel: null,
          xpath:xpath
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
        this.$message.success("更新成功");
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { cName, id, pid,pName, note,cHospCode,cFinancialCode,xpath } = row
    this.equipmentCategoryData = {
      pid,
      pName,
      cName,
      id,
      note,
      cHospCode: cHospCode,
      cFinancialCode: cFinancialCode,
      xpath:xpath
    }
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  // 删除科室
  private async handleRemove(row: any) {
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
    const res: any = await dealEquipmentCategoryInfoData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success("删除成功");
  }
}
