import { Component, Vue, Watch } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import _ from 'lodash'
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  updateProcessData,
  queryHospitalProcessBusinessSave,
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { BasicFormList } from '../equipmentRequest/formColumns'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import moment from 'moment'
import ProcessApproval from '@/components/processApproval/index.vue'
@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    ProcessApproval
  }
})
export default class extends Vue {
  // 列表查询项-表单
  public formConfig = {
    data: {
      processName: '',
      nodeName: '',
      cteaterTime: ''
    },
    items: [
      {
        field: 'processName',
        title: '流程名称',
        itemRender: { name: '$input', props: { placeholder: '请输入流程名称' } }
      },
      {
        field: 'nodeName',
        title: '节点名称',
        itemRender: { name: '$input', props: { placeholder: '请输入节点名称' } }
      },
      {
        field: 'cteaterTime',
        title: '创建时间',
        slots: { default: 'create_time' }
      },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDept', title: '申请科室', width: 150 },
    { field: 'applyTime', title: '申请日期' },
    { field: 'projectName', title: '项目名称' },
    { field: 'purchaseType', title: '购置类别' },
    { field: 'purchaseType', title: ' 采购类型 ' },
    { field: 'nextNodeName', title: ' 当前节点' },
    // { field: "count", title: " 数量 " },
    // { field: "money", title: " 总金额 " },
    { field: 'nextNodeState', title: ' 状态 ' },
    {
      width: 200,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  // 已处理列表传参
  public doneFormConfig = {
    url: '/kssq/queryProcessList', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '20',
      nextNodeExecutor: '3C5775C862C396-346D-46F9-89EC-164A3BF087F2',
      processCode: 'pro_kssq',
      nextNodeState: '已归档'
    }
  };

  public formItems = [
    {
      title: '左侧',
      span: 24,
      children: BasicFormList
    },
    {
      align: 'center',
      span: 24,
      itemRender: {
        name: '$buttons',
        children: [
          {
            props: { type: 'submit', content: '确认', status: 'primary' }
          },
          { props: { type: 'reset', content: '重置' } },
          { props: { type: 'reset', content: '取消' } }
        ]
      }
    }
  ];

  public applyDeptData = []; // 科室
  public nextNodeExecutorData = []; // 下一节点执行人
  public applyDetailData = []; // 设备列表
  public activeName = 'toDoTask'; // 当前tab页
  public createFormList = BasicFormList;
  public fileList = []; // 附件信息
  public approvalDialogVisible = false; // 审批节点抽屉显隐
  public clickProcessData: any = {}; // 当前操作流程节点信息
  public processRecordListData = []; // 操作记录
  public processRecordDialogVisible = false; // 操作记录显隐
  public rules = {};
  /**
   * 获取科室数据 queryDepartmentInfoTree
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取设备明细数据 queryEquipmentData
   */
  private async queryProcessCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextCodeData.code === 200) {
      const { nodeName, nodeNameCode, roleTypeId } = nextCodeData.data
    }
  }

  // 获取科室数据
  private async queryDeptData() {
    const res: any = await queryDepartmentInfoTree({})
    if (res.code === 200 && res.data) {
      this.applyDeptData = res.data[0].children
    }
  }

  // 获取节点人员权限列表
  private async queryUserListProcessCode(nodeSort: number) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextNodeExecutorData.code === 200) {
      this.nextNodeExecutorData = nextNodeExecutorData.data
    }
  }

  // 根据科室类别获取设备
  @Watch('equipmentProcessData.applyDept', { immediate: true })
  private async queryEquipmentData() {
    const res: any = await getEquipmentInfoByDepartmentId({
      page: '1',
      limit: '10',
      entity: {
        departmentId: ''
      }
    })
    if (res.code === 200) {
      this.applyDetailData = res.data
    }
  }

  // 获取节点信息
  private async queryCodeDataFirst() {
    this.queryDeptData()
    const currentCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: 1
    })
    if (currentCodeData.code === 200) {
      const {
        processName,
        processCode,
        nodeName,
        nodeNameCode,
        nodeSort
      } = currentCodeData.data
      this.queryProcessCodeAndBhResData(nodeSort)
      this.queryUserListProcessCode(nodeSort)
    }
  }

  private dialogVisible = false; // 模态框
  private dialogStatus = 'create';

  private handleClick(value:any) {
    console.log('🚀 ~ value', value.name)
    this.activeName = value.name
    // (this.$refs.vexDoneTable as any).findList(this.paramsConfig);
  }

  /**
   * 附件上传
   */
  private handleRemoveField(file: any, fileList: any) {
    console.log(file, fileList)
  }

  private handlePreview(file: any) {
    console.log(file)
  }

  private handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }

  private beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }

  //  点击查看按钮事件
  public handleSearch(row: any) {
    this.approvalDialogVisible = true
    this.clickProcessData = row
  }

  public emitHandleSubmit(value: boolean) {
    this.approvalDialogVisible = false
    if (value) {
      (this.$refs.vexTable as any).findList(this.doneFormConfig)
    }
  }

  // 获取流程操作记录 queryProcessRecordList
  private async queryProcessRecordListData(data: any) {
    const res: any = await queryProcessRecordList({
      businessId: data.id
    })
    if (res.result) {
      this.processRecordListData = res.data
    }
  }

  // 操作记录
  public handleRecord(data: any) {
    this.processRecordDialogVisible = true
    this.queryProcessRecordListData(data)
  }
}
