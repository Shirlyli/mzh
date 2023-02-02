import { Component, Vue, Watch } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import _ from 'lodash'
import { dealPersonalData, updatePersonalData } from '@/api/basic'
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
  private formConfig = {
    data: {
      eName: '',
      createtime: '',
      sex: ''
    },
    items: [
      {
        field: 'userName',
        title: '用户姓名',
        itemRender: { name: '$input', props: { placeholder: '请输入用户姓名' } }
      },
      {
        field: 'userCtime',
        title: '创建时间',
        slots: { default: 'create_time' },
        resetValue: []
      },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'userName', title: '用户名称', width: 120 },
    { field: 'citizenNo', title: '电子邮箱', width: 120 },
    { field: 'userStatus', title: '激活状态', width: 120 },
    { field: 'nation', title: '所属科室', width: 120 },
    { field: 'phoneNo', title: '所属角色', width: 120 },
    { field: 'userCtime', title: '用户创建时间', width: 120, formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    { field: 'userCtime', title: '修改时间', width: 120 },
    { field: 'userCtime', title: '密码修改时间', width: 120 },
    { field: 'userCtime', title: '解锁时间', width: 120 },
    { field: 'userCtime', title: '上次登录时间', width: 120 },
    { field: 'note', title: '备注', width: 120 },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true,
      fixed: 'right'
    }
  ];

  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  private personalData = {
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

  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  }; // 表单校验

  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create';
  private paramsConfig = {
    // url: "/auth/employee/queryByDeptId",
    url: '/auth/user/getUserByEmployeeId',
    params: {
      // page: 1,
      // limit: 10,
      // entity: {
      //   deptId: "001"
      // }
      empId: 'E1D6AB19EF6720-B4EA-46DF-BE10-96F03712FB65'
    }
  };

  private nodeClickData: any = {}; // 点击科室数据
  private url = 'THospitalDepartmentInfo/queryTree'; // 左侧字典

  // 新增员工
  private handleInsert() {
    this.dialogVisible = true
    const { title, id } = this.nodeClickData
    this.personalData = { ...this.personalData, deptId: id ?? '001' }
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      // url: "/auth/employee/queryByDeptId",
      url: '/auth/user/getUserByEmployeeId',
      params: {
        // page: 1,
        // limit: 10,
        // entity: {
        //   deptId: data.id
        // }
        empId: 'E1D6AB19EF6720-B4EA-46DF-BE10-96F03712FB65'
      }
    }
  }

  // 新增员工
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const params = this.personalData
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
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const params = this.personalData
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
      }
    })
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { cName, id, pid, note } = row
    this.personalData = row
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  // 删除员工信息
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
    const res: any = await dealPersonalData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }

  // 模态框关闭事件
  private handleDialogClose() {
    this.dialogVisible = false
  }
}
