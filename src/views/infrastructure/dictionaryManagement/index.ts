import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import { dealCommonData, updateCommonData } from '@/api/basic'
import _ from 'lodash'
import { debug } from 'webpack'
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
    { field: 'dicCode', title: '字典编码' },
    { field: 'dispindex', title: '字典排序' },
    { field: 'dicType', title: '字典类型' },
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
    id: '',
    pid: '',
    pName: '',
    dicName: '',
    xpath: '',
    dicType: '',
    dicCode: '',
    flag: '',
    note: ''
  }; // 新增或编辑表单

  private rules = {
    dicName: [
      { required: true, message: '请输入字典名称', trigger: 'change' }
    ],
    dicCode: [
      { required: true, message: '请输入字典编码，且唯一', trigger: 'change' }
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

  // 新增字典
  private handleInsert() {
    this.dialogVisible = true
    const { title, id } = this.nodeClickData
    // (this.$refs.dataForm as Form).setFiledsValue
    this.commonData = {
      id: '',
      pid: id ?? '001',
      pName: title ?? '字典管理',
      dicName: '',
      xpath: '',
      dicType: '',
      dicCode: '',
      flag: '1',
      note: ''
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

  // 新增字典
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { pid, dicName, pName, xpath } = this.commonData
        const params = {
          id: '',
          dicType: '',
          dicCode: '',
          dicName: dicName,
          pid: pid,
          pName: pName,
          flag: 1,
          ctime: '',
          note: '',
          isLeaf: 1,
          xpath: xpath
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
        this.$message.success('创建成功')
      }
    })
  }

  // 修改字典
  private updateData() {
    debugger;
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { id, pid, dicName, pName, xpath, dicType, dicCode, flag } = this.commonData
        const params = {
          id: id,
          dicType: dicType,
          dicCode: dicCode,
          dicName: dicName,
          pName: pName,
          pid: pid,
          flag: flag,
          ctime: '',
          note: '',
          isLeaf: '',
          xpath: xpath
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
        this.$message.success('更新成功')
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { dicName, pName, id, pid, xpath, dicType, dicCode, flag, note } = row
    this.commonData = {
      id,
      pid,
      pName,
      dicName: dicName,
      xpath,
      dicType,
      dicCode,
      flag,
      note
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
    this.$message.success('删除成功')
  }
}