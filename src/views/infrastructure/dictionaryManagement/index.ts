import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import { dealCommonData, updateCommonData } from '@/api/basic'
import _ from 'lodash'
@Component({
  name: 'Tab',
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
    { field: 'dicName', title: '字典值', treeNode: true },
    { field: 'dicCode', title: '字典排序' },
    { field: 'dicType', title: '字典备注' },
    { field: 'flag', title: '状态' },
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

  private commonData = {
    parentId: '',
    parentName: '',
    departmentName: '',
    departmentId: ''
  }; // 新增或编辑表单

  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  }; // 表单校验

  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create';
  private paramsConfig = {
    url: 'common/dicInfo/querySelfAndPar',
    params: {
      page: 1,
      limit: 10,
      entity: {
        id: '001'
      }
    }
  };

  private nodeClickData: any = {}; // 点击科室数据
  private url = '/common/dicInfo/queryTree'; // 左侧字典

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true
    const { title, id } = this.nodeClickData
    // (this.$refs.dataForm as Form).setFiledsValue
    this.commonData = {
      parentId: id ?? '001',
      parentName: title ?? '字典管理',
      departmentName: '',
      departmentId: ''
    }
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: 'common/dicInfo/querySelfAndPar',
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
        const { parentId, departmentName } = this.commonData
        const params = {
          id: '',
          dicType: '',
          dicCode: '',
          dicName: departmentName,
          pid: parentId,
          flag: '',
          ctime: '',
          note: '',
          isLeaf: 1
        }
        const res: any = await updateCommonData(params)
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
        const { parentId, departmentName, departmentId } = this.commonData
        const params = {
          id: departmentId,
          dicType: '',
          dicCode: '',
          dicName: departmentName,
          pid: parentId,
          flag: '',
          ctime: '',
          note: '',
          isLeaf: 1
        }
        const res: any = await updateCommonData(params)
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
    const { name, id, pid } = row
    this.commonData = {
      parentId: pid,
      parentName: pid,
      departmentName: name,
      departmentId: id
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
    const res: any = await dealCommonData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success("删除成功");
  }
}
