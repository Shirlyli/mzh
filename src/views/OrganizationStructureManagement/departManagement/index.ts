import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import { dealEquipmentData, updateEquipmentData } from '@/api/equipment'
import _ from 'lodash'
import { ALL_OPTIONS } from '@/shared/options'
import moment from 'moment'
// import { TreeData } from "@/mock/tree";
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
      name: '',
      time: ''
    },
    items: [
      {
        field: 'name',
        title: '科室名称',
        itemRender: { name: '$input', props: { placeholder: '请输入科室名称' } }
      },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 80 },
    { field: 'name', title: ' 科室名称', treeNode: true },
    { field: 'mobile', title: '座机', treeNode: true },
    { field: 'note', title: '描述', treeNode: true },
    { field: 'ctime', title: '创建时间', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  };

  private departmentData = {
    parentId: '',
    parentName: '',
    departmentName: '',
    departmentId: '',
    departmentCode: '',
    departmentMobile: '',
    departmentStatus: '',
    companyInfoId: '',
    departmentDicid: '',
    note: '',
    xpath: '',
    companyInfoName: ''
  }; // 新增或编辑表单

  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  }; // 表单校验

  private dialogVisible = false; // 新增过模态框
  private dialogStatus = 'create';
  private url = 'THospitalDepartmentInfo/queryTree'; // 左侧科室分类树形数据
  private paramsConfig = {
    url: 'THospitalDepartmentInfo/querySelfAndPar',
    params: {
      page: 1,
      limit: 10,
      entity: {
        id: '001'
      }
    }
  };

  private nodeClickData: any = {}; // 点击科室数据

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true
    const { title, id } = this.nodeClickData
    // (this.$refs.dataForm as Form).setFiledsValue
    this.departmentData = {
      parentId: id ?? '001',
      parentName: title ?? '医疗科室',
      departmentName: '',
      departmentId: '',
      departmentCode: '',
      departmentMobile: '',
      departmentStatus: '1',
      companyInfoId: ALL_OPTIONS.hospital.id,
      departmentDicid: '',
      note: '',
      xpath: '',
      companyInfoName: ALL_OPTIONS.hospital.name
    }
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室
    this.paramsConfig = {
      url: 'THospitalDepartmentInfo/querySelfAndPar',
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
        const { parentId, departmentName, departmentCode, departmentMobile, departmentStatus, companyInfoId, departmentDicid, note, xpath } = this.departmentData
        const params = {
          id: '',
          pid: parentId,
          name: departmentName,
          dispindex: '',
          dCode: departmentCode,
          mobile: departmentMobile,
          phone: null,
          status: departmentStatus,
          companyInfoId: companyInfoId,
          flag: null,
          ctime: null,
          path: '',
          dicId: departmentDicid,
          note: note,
          isLeaf: '',
          xpath: xpath,
          companyInfoName: ALL_OPTIONS.hospital.name
        }
        const res: any = await updateEquipmentData(params)
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

  // 修改科室
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { parentId, parentName, departmentName, departmentId, departmentCode, departmentMobile, departmentStatus, companyInfoId, departmentDicid, note, xpath } = this.departmentData
        const params = {
          id: departmentId,
          pid: parentId,
          pname: parentName,
          name: departmentName,
          dispindex: '',
          dCode: departmentCode,
          mobile: departmentMobile,
          phone: null,
          status: 1,
          companyInfoId: companyInfoId,
          flag: null,
          ctime: null,
          path: '',
          dicId: departmentDicid,
          note: null,
          isLeaf: '',
          xpath: xpath,
          companyInfoName: ALL_OPTIONS.hospital.name
        }
        const res: any = await updateEquipmentData(params)
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
    const { name, id, pid, pname, dCode, mobile, status, companyInfoId, dicId, note, xpath } = row
    this.departmentData = {
      parentId: pid,
      parentName: pname,
      departmentName: name,
      departmentId: id,
      departmentCode: dCode,
      departmentMobile: mobile,
      departmentStatus: status,
      companyInfoId: companyInfoId,
      departmentDicid: dicId,
      note: note,
      xpath: xpath,
      companyInfoName: ALL_OPTIONS.hospital.name
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
    const res: any = await dealEquipmentData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }
}
