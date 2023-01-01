import { Component, Vue, Watch } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { BusinessViewModule } from '@/store/modules/business'
import { Message } from 'element-ui'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { UserModule } from '@/store/modules/user'
import ALL_OPTIONS from '@/shared/options'
import { FormatApproveStatusColumns } from '@/utils/functions'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    processRequest,
    ProcessApproval
  }
})
export default class extends Vue {
  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()
    BasicFormList.forEach((item: any) => {
      if (item.slot === 'department') {
        item.data = BusinessViewModule.departmentData.map((dept: any) => {
          return { label: dept.title, value: dept.id }
        })
      }
    })
    console.log('🚀 ~ 基本信息模块', BasicFormList)
  }

  public basicFormList = BasicFormList;
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      approveStatus: '',
      rollOutDepartment: '',
      cteaterTime: ''
    },
    items: [
      {
        field: 'approveStatus',
        title: '任务名称',
        itemRender: { name: '$input', props: { placeholder: '请输入任务名称' } }
      },
      {
        field: 'rollOutDepartment',
        title: '制单科室',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: BusinessViewModule.departmentData
        }
      },
      {
        field: 'rollOutDepartment',
        title: '盘点状态',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.APPROVE_STATUS
        }
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
    { field: 'billCode', title: '盘点单号', width: 150 },
    { field: 'checkDepartment', title: '任务名称' },
    { field: 'userId', title: '申请人' },
    { field: 'createTime', title: '申请日期' },
    { field: 'departmentId', title: '制单科室 ' },
    { field: 'equipmentCategory', title: '盘点范围' },
    {
      field: 'approveStatus',
      title: '盘点状态 ',
      formatter: (data: any) => FormatApproveStatusColumns(data)
    },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  // 列表传参
  public paramsConfig: any = {
    url: '/checkApply/getCheckApplyInfo', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '20',
      entity: {}
    }
  };

  //  点击查看按钮事件
  public handleSearch(row: any) {
    const { id, nextNodeCode } = row
    this.clickProcessData = row
    this.clickProcessData.billEquipmentList = this.clickProcessData.billEquipmentList.map(
      (item: any) => {
        return { ...item, ...item.equipment }
      }
    )
    console.log('🚀 ~ this.clickProcessData', this.clickProcessData)
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('BasicFormList', JSON.stringify(this.basicFormList))
    this.$router
      .push({ path: '/processApproval', query: { nextNodeCode, id } })
      .catch(err => {
        console.warn(err)
      })
  }

  // 删除事件
  public async handleRemove(data: any) {
    const res: any = await delHospitalProcessBusiness({
      ids: data.id
    })
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
      Message.info('删除流程成功')
    }
  }

  /****************
   * 流程申请相关
   *****************/
  public requestDialogVisible = false; // 模态框
  // 申请form表单配置文件
  public requestForm = {
    billMain: BasicFormList,
    billEquipmentList: EquipmentDetailFormList,
    billApproveList: ApprovalFormlist
  };

  // 申请接口传惨params
  public requestParams = {
    id: '',
    status: '0',
    billCode: '',
    billMain: {
      id: '',
      userId: UserModule.userData?.userId,
      userName: UserModule.userData?.userName,
      createTime: '',
      rollOutDepartment: '',
      rollInDepartment: '',
      equipmentLocation: '',
      rollOutTime: '',
      cause: '',
      status: '',
      billCode: ''
    },
    billEquipmentList: [{
      id: '',
      billId: '',
      equipmentId: ''
    }],
    billApproveList: {
      id: '',
      approveUser: UserModule.userData?.userId,
      approveUserName: UserModule.userData?.userName,
      approveTime: '',
      approveOpinion: '',
      approveStatus: '',
      billId: ''
    }
  };

  public rules = {
    nextNodeExecutor: [{ require: true, trigger: 'change', message: '请选择' }],
    approveStatus: [{ require: true, trigger: 'change', message: '请选择' }]
  };

  /*******************************
   * 新增流程配置
   ******************************/
  public handleInsert() {
    // this.requestDialogVisible = true
    sessionStorage.setItem(
      'RequestForm',
      JSON.stringify(this.requestForm)
    )
    console.log('🚀 ~ this.requestForm', this.requestForm, this.requestParams)

    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({ path: '/processRequest', query: { } })
      .catch(err => {
        console.warn(err)
      })
  }

  public handleClose() {
    this.requestDialogVisible = false
  }

  /*****************************
   * 发起流程申请单
   * @param params
   ****************************/
  public async handleCreateRequest(params: any) {
    const billEquipmentList: any = []
    billEquipmentList.push(params.billEquipmentList)
    const billApproveList: any = []
    billApproveList.push(params.billApproveList)
    const sendParams = []
    sendParams.push({
      ...params,
      billMain: {
        ...params.billMain,
        departmentId: params.billMain.departmentName
      },
      billEquipmentList,
      billApproveList
    })
    console.log('🚀 ~ sendParams', sendParams)
    // const res: any = await handleSaveCheckApply(sendParams)
    // if (res.code === 200) {
    //   this.$message.success('发起申请成功')
    //   this.requestDialogVisible = false;
    //   (this.$refs.vexTable as any).findList(this.paramsConfig)
    // }
  }

  /*****************************
   * 操作记录
   ***************************/
  public processRecordListData = []; // 操作记录
  public processRecordDialogVisible = false; // 操作记录显隐

  public handleRecord(data: any) {
    this.processRecordDialogVisible = true
    this.queryProcessRecordListData(data)
  }

  // 获取流程操作记录 queryProcessRecordList
  public async queryProcessRecordListData(data: any) {
    const res: any = await queryProcessRecordList({
      businessId: data.id
    })
    if (res.result) {
      this.processRecordListData = res.data
    }
  }

  /************************************
   * 流程审批相关
   *************************************/
  public applyDeptData = []; // 科室
  public nextNodeExecutorData = []; // 下一节点执行人
  public applyDetailData = []; // 设备列表
  public approvalDialogVisible = false; // 审批节点抽屉显隐
  public clickProcessData: any = {}; // 当前操作流程节点信息
  public emitHandleSubmit(value: boolean) {
    this.approvalDialogVisible = false
    if (value) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
    }
  }

  /**************************************************
   * 获取科室数据 queryDepartmentInfoTree
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取设备明细数据 queryEquipmentData
   *************************************************/
  public async queryProcessCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextCodeData.code === 200) {
      // const { nodeName, nodeNameCode, roleTypeId } = nextCodeData.data
      // this.equipmentProcessData = {
      //   ...this.equipmentProcessData,
      //   nextNodeName: nodeName,
      //   nextNodeCode: nodeNameCode
      // };
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
      entity: {}
    })
    if (res.code === 200) {
      this.applyDetailData = res.data
    }
  }
}
