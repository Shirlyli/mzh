import { Component, Vue, Watch } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import _ from 'lodash'
import {
  delProcessData,
  getRoleTreeData,
  getUserDataByDeptId,
  updateProcessData
} from '@/api/basic'
import { Form } from 'element-ui'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import moment from 'moment'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    MainSubLayout,
    Tree
  }
})
export default class extends Vue {
  // 左侧字典url
  public url = '/hospitalProcess/queryAllProcessList';
  // 列表查询项-表单
  public formConfig = {
    data: {},
    items: [] // 表单项
  };

  public rules = {};
  // 树形图传参
  public treeParams = {
    page: '1',
    limit: '10',
    entity: {}
  };

  public getformatMIsAvailable = (data: any) => {
    return String(data.cellValue) === '1'
      ? '禁用'
      : String(data.cellValue) === '0'
        ? '不禁用'
        : '-'
  };

  public formatMIsRoleType(data: any) {
    return data.cellValue === 'role'
      ? '角色'
      : data.cellValue === 'user'
        ? '用户'
        : '-'
  }

  public nodeClickData: any = {};
  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'processName', title: '流程名称', width: 150 },
    { field: 'processCode', title: '流程代码' },
    { field: 'nodeName', title: '节点名称' },
    { field: 'nodeNameCode', title: '节点名称编码' },
    { field: 'nodeSort', title: ' 节点顺序 ' },
    {
      field: 'isDisable',
      title: ' 是否禁用 ',
      formatter: this.getformatMIsAvailable
    },
    {
      field: 'roleType',
      title: ' 角色类型 ',
      formatter: this.formatMIsRoleType
    },
    // { field: "roleTypeId", title: " 角色类型id " },
    { field: 'cteator', title: '创建人' },
    {
      field: 'createTime',
      title: '创建时间',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD')
    },
    {
      width: 160,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public paramsConfig: any = {
    url: '/hospitalProcess/queryProcessNodeListByProcessNode', // 根据表单查询项查询数据
    params: {
      processCode: 'pro_kssq'
    }
  };

  public processData: any = {
    processName: '',
    processCode: '',
    nodeName: '',
    nodeNameCode: '',
    nodeSort: '',
    isDisable: '',
    roleType: '',
    roleTypeId: ''
  };

  /**
   *获取角色名称数据
   */
  public roleData: any = [];
  public async getRoleTreeData(type: any) {
    let res: any = []
    if (type === 'role') {
      const resData: any = await getRoleTreeData()
      if (resData.code === 200) {
        res = resData.data?.[0]?.children.map((item: any) => {
          return { ...item, userId: item.id }
        })
      }
    } else {
      const deptId = (UserModule.userData as any)?.employee?.deptId
      const resUserData: any = await getUserDataByDeptId({
        page: 1,
        limit: 10,
        entity: {
          deptId
        }
      })
      if (resUserData.code === 200) {
        res = resUserData.data.map((item: any) => {
          return { ...item, title: item.eName }
        })
      }
    }
    this.roleData = res
    this.$forceUpdate()
  }

  public onRoleTypeChange(value: any) {
    console.log('🚀 ~ value', value)
    this.processData.roleTypeId = ''
  }

  @Watch('processData.roleType')
  public onChangeRoleType(value: any) {
    this.getRoleTreeData(value)
  }

  // 接收树形组件点击节点数据
  public handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询菜单及下级菜单 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: '/hospitalProcess/queryProcessNodeListByProcessNode', // 根据表单查询项查询数据
      params: {
        processCode: data.processCode
      }
    }
  }

  public dialogVisible = false; // 模态框
  public dialogStatus = 'create';

  public clearForm() {
    this.processData = {
      processName: '',
      processCode: '',
      nodeName: '',
      nodeNameCode: '',
      nodeSort: '',
      isDisable: '',
      roleType: '',
      roleTypeId: ''
    }
  }

  // 新增流程配置
  public handleInsert(row: any) {
    this.dialogStatus = 'create'
    this.clearForm()
    if (!this.nodeClickData.id) {
      this.$message.error('请选择流程名称后新增')
      return
    }
    const { processName, processCode } = this.nodeClickData
    this.dialogVisible = true
    this.processData = {
      ...this.processData,
      processName,
      processCode
    }
  }

  // 触发编辑事件
  public handleUpdate(row: any) {
    console.log('🚀 ~ row', row)
    const { roleType } = row
    console.log(row.roleTypeId.split(','))
    this.processData =
      roleType === 'user'
        ? {
            ...this.processData,
            ...row,
            roleTypeId: row.roleTypeId.indexOf(',') > 0 ? JSON.parse(row.roleTypeId) : row.roleTypeId.split(',')
          }
        : { ...this.processData, ...row }
    console.log('🚀 ~ this.processData', this.processData)
    this.dialogStatus = 'update'
    this.dialogVisible = true
  }

  // 新增流程配置
  public createData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const { roleTypeId, roleType } = this.processData
        this.processData =
          roleType === 'user'
            ? { ...this.processData, roleTypeId: roleTypeId.join(',') }
            : { ...this.processData }
        const res: any = await updateProcessData(this.processData)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false;
        (this.$refs.dataForm as any).resetFields()
        this.$message.success('新增流程配置成功')
        this.clearForm()
      } else {
        console.log('🚀 ~ this.processData', this.processData)
      }
    })
  }

  // 修改流程配置
  public updateData() {
    (this.$refs.dataForm as any).validate(async(valid: any) => {
      if (valid) {
        const { roleTypeId, roleType } = this.processData
        console.log('🚀 ~ this.processData', this.processData)
        this.processData =
          roleType === 'user'
            ? { ...this.processData, roleTypeId: roleTypeId.join(',') }
            : { ...this.processData }
        const res: any = await updateProcessData({ ...this.processData })
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
        }
        this.dialogVisible = false;
        (this.$refs.dataForm as any).resetFields()
        this.$message.success('修改流程配置成功')
        this.clearForm()
      }
    })
  }

  // 删除流程配置
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
    const res: any = await delProcessData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
    // (this.$refs.dataForm as any).resetFields()
    this.$message.success('删除流程配置成功')
  }

  public addProcess() {
    console.log('addProcess')
  }
}
