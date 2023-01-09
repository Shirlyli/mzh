import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form, Message } from 'element-ui'
import _ from 'lodash'
import {
  bindPersonalInfo,
  dealPersonalData,
  delPersonalInfo,
  getPersonalInfo,
  getRoleTreeData,
  personalBindRole,
  personalUnbindRole,
  queryRolesByUserId,
  updatePersonalData
} from '@/api/basic'
import Content from './content.vue'
import { VXETable } from 'vxe-table'
import { ALL_OPTIONS } from '@/shared/options'
import moment from 'moment'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable,
    Content
  }
})
export default class extends Vue {
  public formConfig = {
    data: {
      eName: '',
      createtime: '',
      sex: ''
    },
    items: [
      {
        field: 'eName',
        title: '用户姓名',
        itemRender: { name: '$input', props: { placeholder: '请输入名称' } }
      },
      {
        field: 'createtime',
        title: '创建时间',
        slots: { default: 'create_time' },
        resetValue: []
      },
      {
        field: 'sex',
        title: '性别',
        itemRender: {
          name: '$select',
          options: ALL_OPTIONS.sex
        }
      },

      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'eName', title: '员工名称', width: 120 },
    { field: 'citizenNo', title: '身份证', width: 120 },
    { field: 'birth', title: '出生日期', width: 120 },
    { field: 'nation', title: '国籍', width: 120 },
    { field: 'phoneNo', title: '手机号码', width: 120 },
    { field: 'officeNo', title: '办公号码', width: 120 },
    { field: 'email', title: '邮箱', width: 120 },
    { field: 'education', title: '学历', width: 120 },
    { field: 'degree', title: '学位', width: 120 },
    { field: 'deptId', title: '科室', width: 120 },
    { field: 'photoUri', title: '图片来源', width: 120 },
    { field: 'collage', title: '大学', width: 120 },
    { field: 'eNo', title: '', width: 120 },
    { field: 'eType', title: '职业类型', width: 120 },
    { field: 'eProf', title: '专业', width: 120 },
    { field: 'ePost', title: '职位', width: 120 },
    { field: 'ePostState', title: '在职状态', width: 120 },
    { field: 'note', title: '备注', width: 120 },
    { field: 'dispindex', title: '排序', width: 120 },
    { field: 'createtime', title: '创建时间', width: 120, formatter: (data:any) => moment(data.cellvalue).format('YYYY-MM-DD') },
    { field: 'sex', title: '性别', width: 120 },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true,
      fixed: 'right'
    }
  ];

  public treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  public employeeData = {
    id: '',
    eName: '',
    citizenNo: '',
    birth: '',
    nation: '',
    phoneNo: '',
    officeNo: '',
    email: '',
    education: '',
    degree: '',
    deptId: '',
    deptName: '',
    photoUri: '',
    collage: '',
    eNo: '',
    eType: '',
    eProf: '',
    ePost: '',
    ePostState: '',
    note: '',
    dispindex: '',
    createtime: '',
    sex: ''
  }; // 新增或编辑表单

  public defaultProps = {
    children: 'children',
    label: 'title'
  }; // 角色树配置

  public roleData = []; // 角色数据
  public roleDialogVisible = false; // 角色关联模态框显隐
  public dialogVisible = false; // 新增模态框
  public personalDialogVisible = false; // 用户设置模态框
  public personalDialogType = 'add'; //
  public dialogStatus = 'create';
  public paramsConfig = {
    // url: "/auth/employee/queryByDeptId",
    url: '/auth/employee/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {
        deptId: '001'
      }
    }
  };

  public nodeClickData: any = {}; // 点击科室数据
  public url = 'THospitalDepartmentInfo/queryTree'; // 左侧字典

  public personalData = {
    userCtime: '',
    userName: '',
    employeeName: '',
    userPwd: '',
    userEmpId: '',
    userStatus: '',
    userType: '0',
    userUnlocktime: '',
    userMtime: '',
    userPmtime: '',
    userLtime: '',
    note: '',
    token: '',
    dispindex: ''
  }; // 用户设置数据

  public personalEditTitle = '新增用户设置';
  public personalRules = {
    userName: [{ required: true, message: '不能为空', trigger: 'change' }],
    employeeName: [{ required: true, message: '不能为空', trigger: 'change' }],
    userPwd: [{ required: true, message: '不能为空', trigger: 'change' }]

  }; // 用户设置表单校验

  public loading = false; // 角色绑定列表loading
  public bindRoleData = []; // 用户已绑定角色
  public clickEmployeeInfo: any = {}; // 当前点击员工数据
  public empolyeeRules = {
    userName: [{ required: true, message: '请输入登录名', trigger: 'change' }],
    userPwd: [{ required: true, message: '请输入密码', trigger: 'change' }],
    employeeName: [
      { required: true, message: '请输入用户名', trigger: 'change' }
    ]
  };

  created() {
    this.getRoleTreeData()
  }

  // 获取角色树数据
  public async getRoleTreeData() {
    const res: any = await getRoleTreeData()
    if (res.code === 200) {
      const newRoleData = res.data[0].children.map((item: any) => {
        return {
          ...item,
          disabled: true
        }
      })
      this.roleData = newRoleData
    }
  }

  public clearEmployeeForm() {
    this.employeeData = {
      id: '',
      eName: '',
      citizenNo: '',
      birth: '',
      nation: '',
      phoneNo: '',
      officeNo: '',
      email: '',
      education: '',
      degree: '',
      deptId: '',
      deptName: '',
      photoUri: '',
      collage: '',
      eNo: '',
      eType: '',
      eProf: '',
      ePost: '',
      ePostState: '',
      note: '',
      dispindex: '',
      createtime: '',
      sex: ''
    }
  }

  public clearPersonalData() {
    this.personalData = {
      userCtime: '',
      userName: '',
      employeeName: '',
      userPwd: '',
      userEmpId: '',
      userStatus: '',
      userType: '0',
      userUnlocktime: '',
      userMtime: '',
      userPmtime: '',
      userLtime: '',
      note: '',
      token: '',
      dispindex: ''
    }
  }

  // 新增员工
  public handleInsert() {
    this.clearEmployeeForm()
    const { title, id } = this.nodeClickData
    if (!id) {
      this.$message.error('请选择科室后新增员工')
      return
    }
    this.dialogVisible = true
    this.employeeData = {
      ...this.employeeData,
      deptName: title,
      deptId: id ?? '001'
    }
  }

  // 接收树形组件点击节点数据
  public handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      // url: "/auth/employee/queryByDeptId",
      url: '/auth/employee/queryByCondition',
      params: {
        page: 1,
        limit: 10,
        entity: {
          deptId: data.id
        }
      }
    }
  }

  // 触发修改员工信息
  public handleUpdate(row: any) {
    this.employeeData = { ...row, deptName: this.nodeClickData.title }
    this.dialogStatus = 'update'
    this.dialogVisible = true
  }

  // 新增员工
  public createData() {
    (this.$refs.empolyeeForm as Form).validate(async valid => {
      if (valid) {
        const params = this.employeeData
        const res: any = await updatePersonalData(params)
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

  // 修改员工信息
  public updateData() {
    (this.$refs.empolyeeForm as Form).validate(async valid => {
      if (valid) {
        const params = this.employeeData
        const res: any = await updatePersonalData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$message.success('更新成功')
        this.clearEmployeeForm()
      }
    })
  }

  // 删除员工信息
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
    const res: any = await dealPersonalData(params)
    if (res.result) {
      this.$message.success('删除成功');
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    } else {
      this.$message.error('删除失败')
    }
  }

  // 查看用户设置
  public async handleSearchForDetail(data: any) {
    this.clearPersonalData()
    const { rowData, type } = data
    const res: any = await getPersonalInfo({ empId: rowData.id })
    console.log('🚀 ~ res', res)
    if (res.result && res.count === 1) {
      this.personalData = {
        ...res.data,
        userEmpId: rowData.id,
        employeeName: rowData.eName,
        userLtime: moment().format('YYYY-MM-DD')
      }
    } else {
      this.personalData = {
        ...this.personalData,
        userEmpId: rowData.id,
        employeeName: rowData.eName,
        userCtime: moment().format('YYYY-MM-DD'),
        userLtime: moment().format('YYYY-MM-DD')
      }
    }
    if (type === 'bind') {
      this.personalDialogVisible = true
      if (rowData) {
        this.personalDialogType = 'edit'
        this.personalEditTitle = '员工绑定账户'
      } else {
        this.personalDialogType = 'add'
        this.personalEditTitle = '新增用户设置'
      }
    } else {
      this.delPersonal(res)
    }
  }

  // 删除账户信息
  public async delPersonal(res: any) {
    if (res.result && res.count === 0) {
      this.$message.success('该用户尚未绑定账号')
      return
    }
    const type = await VXETable.modal.confirm('您确定要解绑该用户?')
    if (type === 'confirm' && res.result && res.count === 1) {
      const isDelete:any = await delPersonalInfo({ ids: res.data.userId })
      if (isDelete.code === 200) {
        this.$message.success('解绑成功');
        (this.$refs.vexTable as any).findList(this.paramsConfig);
        (this.$refs.vxeTree as any).getTreeListData(
          this.url,
          this.treeParams
        )
      } else {
        this.$message.error('解绑失败')
      }
    }
  }

  // 点击员工详情展示用户操作页面
  public async handleLoginDialog(row: any) {
    // this.personalDialogVisible = true;
    // const res = await getPersonalInfo({ empId: row.id });
  }

  // 保存用户设置
  public async savePersonalData() {
    const res: any = await bindPersonalInfo({
      ...this.personalData
    })
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
      this.$message.success('绑定用户成功')
    } else {
      this.$message.success('绑定用户失败')
    }
    this.personalDialogVisible = false
  }

  public async queryRolesByUserIdData(row: any) {
    this.loading = true
    const res: any = await queryRolesByUserId({ user_id: row.userId })
    if (res.result) {
      this.$message.success(res.msg)
      this.bindRoleData = res.data
      this.loading = false
    }
  }

  // 绑定角色信息
  public async handleAssociateRole(row: any) {
    this.clickEmployeeInfo = row
    if (this.nodeClickData) {
      if (row.userId) {
        this.roleDialogVisible = true
        this.queryRolesByUserIdData(row)
      } else {
        this.$message.success('该员工未注册用户，不能绑定角色')
      }
    }
  }

  // 角色树点击事件
  public async handleRoleNodeClick(data: any) {
    const res: any = await personalBindRole({
      userId: this.clickEmployeeInfo.userId,
      roleId: data.id
    })
    if (res.result) {
      Message.success('关联成功')
      this.queryRolesByUserIdData(this.clickEmployeeInfo)
    }
  }

  // 关联角色确认保存事件
  public saveRelationRoleData() {
    // console.log((this.$refs.roleTree as any).getCheckedNodes());
    // console.log((this.$refs.roleTree as any).getCheckedKeys());
  }

  // 角色删除事件
  public async handleDelete(row: any) {
    // console.log("🚀 ~ row ~角色删除事件", row);
    const type = await VXETable.modal.confirm('您确定要删除该数据?')
    if (type === 'confirm') {
      const res: any = await personalUnbindRole({
        userId: this.clickEmployeeInfo.userId,
        roleId: row.id
      })
      if (res.result) {
        this.$message.success('解绑成功')
        this.queryRolesByUserIdData(this.clickEmployeeInfo)
      }
    }
  }

  public cellDBLClickEvent() {
    console.log('cellDBLClickEvent')
  }
}
