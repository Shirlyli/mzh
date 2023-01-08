import { Component, Vue, Watch } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import { delMenuInfo, saveMenuInfo } from '@/api/basic'
import _ from 'lodash'
import AssociateRole from '@/components/associateRole/index.vue'
import { ALL_OPTIONS } from '@/shared/options'
import { FormatMIsavailable, FormatMType } from '@/utils/functions'
import moment from 'moment'

@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable,
    AssociateRole
  }
})
export default class extends Vue {
  // 菜单列表查询项-表单
  private formConfig = {
    data: {
      mName: '',
      mType: ''
    },
    items: [
      {
        field: 'mName',
        title: '菜单名称',
        itemRender: { name: '$input', props: { placeholder: '请输入名称' } }
      },
      /* {
        field: "mUrl",
        title: "菜单路由",
        itemRender: {name: "$input", props: {placeholder: "请输入菜单路由"}}
      }, */
      {
        field: 'mType',
        title: '菜单类型',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.MENU_TYPES
        }
      },
      /* {
        field: "size",
        title: "权限标识",
        itemRender: {name: "$input", props: {placeholder: "请输入权限标识"}}
      },
      {field: "mMtime", title: "创建时间", slots: {default: "create_time"}}, */
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  // 菜单列表项
  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'mName', title: '名称', treeNode: true },
    { field: 'mCode', title: '编码' },
    { field: 'mType', title: '菜单类型', formatter: FormatMType },
    { field: 'mUrl', title: '菜单路由' },
    {
      field: 'mIsavailable',
      title: '是否启用',
      formatter: FormatMIsavailable
    },
    { field: 'note', title: '备注' },
    { field: 'mMtime', title: '创建时间', formatter: (data:any) => moment(data.cellvalue).format('YYYY-MM-DD') },
    {
      width: 150,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  private nodeClickData: any = {};
  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create'; // 模态框新增或修改

  // 根据表单查询项查询数据
  private paramsConfig: any = {
    url: '/auth/menu/queryByCondition',
    params: {
      page: '1',
      limit: '10',
      entity: {
        pid: '001'
      }
    }
  };

  // 左侧字典url
  private url = '/auth/menu/queryTree';

  // 树形图传参
  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  };

  // 表单校验
  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  };

  // 新增菜单form表单数据
  private menuData = {
    mName: '',
    mCode: '',
    mUrl: '',
    mIcon: '',
    pid: '',
    pName: '',
    mType: '',
    mOpentype: '',
    mDesc: '',
    note: '',
    mIsavailable: ''
  };

  // 菜单类型
  private options = ALL_OPTIONS.MENU_TYPES;

  // 菜单数据
  private tableData = [];

  // 新增表单显隐
  private dialogFormVisible = false;
  private checkedMenuList: any = [];

  // 关联角色模态框显隐
  private isAssociateDialogVisible = false;

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询菜单及下级菜单 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: '/auth/menu/queryByCondition',
      params: {
        page: 1,
        limit: 10,
        entity: {
          pid: data.id
        }
      }
    }
  }

  private resetForm() {
    this.menuData = {
      mName: '',
      mCode: '',
      mUrl: '',
      mIcon: '',
      pid: '',
      pName: '',
      mType: '',
      mOpentype: '',
      mDesc: '',
      note: '',
      mIsavailable: ''
    }
  }

  // 新增菜单
  // 新增
  private handleInsert() {
    this.resetForm()
    this.dialogVisible = true
    this.dialogStatus = 'create'
    const id = this.nodeClickData.id ? this.nodeClickData.id : '001'
    const title = this.nodeClickData.title
      ? this.nodeClickData.title
      : '菜单管理'
    /* const { id, title } = this.nodeClickData; */
    this.dialogStatus = 'create'
    // (this.$refs.dataForm as Form).setFiledsValue
    this.menuData = {
      ...this.menuData,
      pid: id,
      pName: title,
      mIsavailable: '1'
    }
  }

  // 新增菜单
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveMenuInfo(this.menuData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('创建成功')
        this.resetForm()
      }
    })
  }

  // 修改菜单
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveMenuInfo(this.menuData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('更新成功')
        this.resetForm()
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    this.menuData = { ...this.menuData, ...row }
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
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
    const res: any = await delMenuInfo(params)
    if (res.result || res.code === 200) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }

  // 接收关联角色事件
  private handleAssociateRole(data: any) {
    this.isAssociateDialogVisible = true
    this.checkedMenuList = data
  }

  // 接收关联角色事件
  private handleAssociateRoleRow(data: any) {
    this.checkedMenuList = []
    this.isAssociateDialogVisible = true
    this.checkedMenuList.push(data)
  }

  private handleCloseAssociateDialog(data: any) {
    this.isAssociateDialogVisible = false
  }
}
