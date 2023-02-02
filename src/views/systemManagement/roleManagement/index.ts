import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
// import AddDialog from './addDialog.vue'
import { Form } from 'element-ui'
import { delRoleInfo, saveRoleInfo } from '@/api/basic'
import _ from 'lodash'
import moment from 'moment'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  // 菜单列表查询项-表单
  private formConfig = {
    data: {
      name: '',
      sex: '',
      time: ''
    },
    items: [
      {
        field: 'name',
        title: '名称',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入名称' } }
      },
      {
        field: 'sex',
        title: '菜单路由',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入菜单路由' } }
      },
      {
        field: 'time',
        title: '权限标识',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入权限标识' } }
      },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' }, span: 8, folding: true },
      { slots: { default: 'operate_item' }, span: 24, align: 'center', collapseNode: true }
    ] // 表单项
  };

  // 菜单列表项
  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'rName', title: '名称', treeNode: true },
    { field: 'rDesc', title: '角色路径' },
    { field: 'note', title: '备注' },
    { field: 'rCtime', title: '创建时间', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  private nodeClickData: any = {};
  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create'; // 模态框新增或修改
  private paramsConfig: any = {
    // /api/auth/role/queryByContitions
    url: '/auth/role/queryByContitions', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        pid: '001'
      }
    }
  };

  private url = '/auth/role/queryTree'; // 左侧字典
  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  private rules = {
    rName: [
      { required: true, message: '请输入角色名称', trigger: 'change' }
    ]
  }; // 表单校验

  private roleData = {
    id: '',
    rName: '',
    note: '',
    pid: '',
    rDesc: '',
    isLeaf: ''
  };

  // 菜单数据
  private tableData = [];

  // 新增表单显隐
  private dialogFormVisible = false;

  private clearForm() {
    this.roleData = {
      id: '',
      rName: '',
      note: '',
      pid: '',
      rDesc: '',
      isLeaf: ''
    }
  }

  // 新增角色
  private handleInsert() {
    const { id } = this.nodeClickData
    if (!id) {
      this.$message.success('请选中角色后新增')
      return
    }
    this.clearForm()
    this.dialogVisible = true
    this.roleData.pid = id
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询菜单及下级菜单 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: '/auth/role/queryByContitions',
      params: {
        page: 1,
        limit: 10,
        entity: {
          pid: data.id
        }
      }
    }
  }

  // 新增菜单
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveRoleInfo(this.roleData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('新增角色成功')
      }
    })
  }

  // 修改菜单
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveRoleInfo(this.roleData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('修改菜单成功')
        this.clearForm()
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    this.roleData = { ...this.roleData, ...row }
    this.dialogStatus = 'update'
    this.dialogVisible = true
  }

  // 删除菜单
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
    const res: any = await delRoleInfo(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除菜单成功')
  }

}
