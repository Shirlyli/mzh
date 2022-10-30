import { Component, Vue } from 'vue-property-decorator'
import TabPane from './components/TabPane.vue'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Form } from 'element-ui'
import { addEquipmentData } from '@/api/equipment'
// import { TreeData } from "@/mock/tree";
@Component({
  name: 'Tab',
  components: {
    TabPane,
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  created() {
    // Init the default selected tab
  }

  mounted() {
    // this.$on("emit-handle-click", (data: any) => {
    //   console.log("🚀 ~ data", data);
    //   console.log("🚀 ~ emit-handle-node-click");
    // });
  }

  private formConfig = {
    data: {
      name: '',
      sex: '',
      time: ''
    },
    items: [
      { field: 'name', title: '科室名称', slots: { default: 'name_item' } },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 80 },
    { field: 'name', title: ' 科室名称', treeNode: true },
    { field: 'basicData', title: '创建时间' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
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
    departmentName: ''
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
      page: '1',
      limit: '10',
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
      departmentName: ''
    }
    console.log('🚀 ~ this.nodeClickData', this.nodeClickData)
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    console.log('🚀 ~handleNodeClick~ data', data)
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

  // 模态框确认
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        console.log('🚀 ~ this.departmentData', this.departmentData)
        const { parentId, departmentName } = this.departmentData
        const params = {
          id: '',
          pid: parentId,
          name: departmentName,
          dispindex: '',
          dCode: null,
          mobile: null,
          phone: null,
          status: 0,
          companyInfoId: '',
          flag: null,
          ctime: null,
          path: '',
          dicId: '',
          note: null,
          isLeaf: ''
        }
        const res: any = await addEquipmentData(params)
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig)
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

  // 模态框修改
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        // const tempData = Object.assign({}, this.tempArticleData)
        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        // const { data } = await updateArticle(tempData.id, {
        //   article: tempData
        // })
        // const index = this.list.findIndex((v: any) => v.id === data.article.id)
        // this.list.splice(index, 1, data.article)
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
    console.log('🚀 ~ row', row)
    // this.tempArticleData = Object.assign({}, row);
    // this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp);
    this.dialogStatus = 'update'
    this.dialogVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }
}
