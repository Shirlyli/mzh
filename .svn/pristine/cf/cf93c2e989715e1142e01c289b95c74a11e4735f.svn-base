import { Component, Vue, Watch } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import _ from 'lodash'
import { dealPersonalData, updatePersonalData } from '@/api/basic'
import Content from './content.vue'
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
  private formConfig = {
    data: {
      eName: '',
      createtime: '',
      sex: ''
    },
    items: [
      { field: 'eName', title: '用户姓名', slots: { default: 'name_item' } },
      {
        field: 'createtime',
        title: '创建时间',
        slots: { default: 'create_time' },
        resetValue: []
      },
      { field: 'sex', title: '性别', slots: { default: 'sex_item' } },

      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
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
    { field: 'dispindex', title: '注销时间', width: 120 },
    { field: 'createtime', title: '创建时间', width: 120 },
    { field: 'sex', title: '性别', width: 120 },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
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
    url: '/auth/employee/queryByCondition',
    params: {
      page: 1,
      limit: 10,
      entity: {
        deptId: '001'
      }
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

  // 新增员工
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const params = this.personalData
        console.log('🚀 ~ this.personalData', this.personalData)
        const res: any = await updatePersonalData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          )
        }
        this.dialogVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
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
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
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
    this.$notify({
      title: '成功',
      message: '删除成功',
      type: 'success',
      duration: 2000
    })
  }

  // 模态框关闭事件
  private handleDialogClose() {
    this.dialogVisible = false
  }
}
