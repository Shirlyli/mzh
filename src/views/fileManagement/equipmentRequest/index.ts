import { Component, Vue, Watch } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  queryHospitalProcessBusinessSave,
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { Form, Message } from 'element-ui'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import { UserModule } from '@/store/modules/user'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    ProcessApproval,
    processRequest
  }
})
export default class extends Vue {
  async created() {
    console.log(this.$route)
    await BusinessViewModule.GET_DEPARTMENT_DATA()
    BasicFormList.forEach((item: any) => {
      if (item.slot === 'department') {
        item.data = BusinessViewModule.departmentData.map((dept: any) => {
          return { label: dept.title, value: dept.id }
        })
      }
    })
    console.log('🚀 ~科室申请～基本信息模块 ', BasicFormList)
  }

  public routePath = this.$route.path
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

  /************************
   * 流程配置列表项
   *************************/
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDept', title: '申请科室', width: 150 },
    { field: 'applyTime', title: '申请日期', formatter: (data:any) => moment(data.cellvalue).format('YYYY-MM-DD') },
    { field: 'projectName', title: '项目名称' },
    { field: 'purchaseType', title: '购置类别' },
    { field: 'purchaseType', title: ' 采购类型 ' },
    { field: 'nextNodeName', title: ' 当前节点' },
    { field: 'nextNodeState', title: ' 状态 ' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public basicFormList = BasicFormList;

  // 待处理列表传参
  public paramsConfig: any = {
    url: '/kssq/queryProcessList', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '20',
      nextNodeExecutor: '3C5775C862C396-346D-46F9-89EC-164A3BF087F2', // TODO: 后续删除
      processCode: 'pro_kssq',
      nextNodeState: '待审核' // 状态
    }
  };

  /**************************
   * 新增流程表单form
   *************************/
  public equipmentProcessData = {
    processName: '',
    projectName: '', //* 项目名称 /
    purchaseType: '', // 购置类别 /
    applyDept: '', // 申请科室 /
    applyPerson: '', // 申请人 /
    applyModle: '', // 申请方式 /
    applyReson: '', // 申请理由 /
    applyDetailId: '', // 申请设备明细id /
    enclosureId: '', // 附件id /
    applyTime: '', // 申请时间 /
    processCode: 'pro_kssp', // 流程code /
    currentNodeName: '', // 当前节点名称 /
    currentNodeCode: '', // 当前节点code /
    nextNodeName: '', // 下一节点名称 /
    nextNodeCode: '', // 下一节点code /
    nextNodeExecutor: '', // 下一节点执行人 */
    auditStatus: '', // 审核状态(审核通过,审核不通过，回退,作废)
    auditReason: '', // 审核结论
    delState: '', // 是否删除(是|否)
    ksspPerson: '', // 科室审批人
    ksspTime: '', // 科室审批时间
    ksspReason: '', // 科室审批结论
    yzspPerson: '', // 院长审批人
    yzspTime: '', // 院长审批时间
    yzspReason: '' // 院长审批结论
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
    billEquipmentList: [
      {
        id: '',
        billId: '',
        equipmentId: ''
      }
    ],
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

  public applyDeptData: any = []; // 科室数据
  public nextNodeExecutorData: any = []; // 下一节点执行人
  public applyDetailData: any = []; // 设备列表
  public createFormList = BasicFormList;
  public clickProcessData: any = {}; // 当前操作流程节点信息
  public processRecordListData = []; // 操作记录
  public processRecordDialogVisible = false; // 操作记录显隐

  /**************************
   * 新增流程配置
   * @param row
   *************************/
  // 申请form表单配置文件
  public requestForm = {
    billMain: BasicFormList,
    billEquipmentList: EquipmentDetailFormList,
    billApproveList: ApprovalFormlist
  };

  public handleInsert(row: any) {
    console.log('🚀 ~ row', row)
    this.addEquipmentRequest()
  }

  /**************************
   * 新增科室申请
   *************************/
  public addEquipmentRequest() {
    // this.queryCodeDataFirst()
    //       meta: {
    //   title: '流程申请'
    // }
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    console.log('🚀 ~ this.requestForm', this.requestForm, this.requestParams)
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({
        path: '/processRequest',
        query: { type: '科室申请' }
      })
      .catch(err => {
        console.warn(err)
      })
  }

  /**********************************************
   * 获取科室数据 queryDepartmentInfoTree
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取设备明细数据 queryEquipmentData
   * 获取节点人员权限列表 queryUserListProcessCode
   ***********************************************/
  /**************************
   * 获取节点信息
   *************************/
  public async queryCodeDataFirst() {
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
      this.equipmentProcessData = {
        ...this.equipmentProcessData,
        processCode,
        processName,
        currentNodeName: nodeName,
        currentNodeCode: nodeNameCode
      }
      this.queryProcessCodeAndBhResData(nodeSort)
      this.queryUserListProcessCode(nodeSort)
    }
  }

  public async queryProcessCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextCodeData.code === 200) {
      const { nodeName, nodeNameCode } = nextCodeData.data
      this.equipmentProcessData = {
        ...this.equipmentProcessData,
        nextNodeName: nodeName,
        nextNodeCode: nodeNameCode
      }
    }
  }

  public async queryEquipmentData() {
    const res: any = await getEquipmentInfoByDepartmentId({
      page: '1',
      limit: '10',
      entity: {
        departmentId: this.equipmentProcessData.applyDept
      }
    })
    if (res.code === 200) {
      console.log('🚀 ~ 设备数据', res)
      this.applyDetailData = res.data.map((item: any) => {
        return { label: item.equipmentVO.name, value: item.equipmentVO.id }
      })
    }
  }

  public async queryUserListProcessCode(nodeSort: number) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextNodeExecutorData.code === 200) {
      this.nextNodeExecutorData = nextNodeExecutorData.data
    }
  }

  public async queryDeptData() {
    const res: any = await queryDepartmentInfoTree({})
    if (res.code === 200 && res.data) {
      this.applyDeptData = res.data[0].children
    }
  }

  /**************************
   * 点击查看按钮事件-跳转审批页面
   * @param row
   *************************/
  public handleSearch(row: any) {
    const { id, nextNodeCode } = row
    this.clickProcessData = row
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('BasicFormList', JSON.stringify(this.basicFormList))
    this.$router
      .push({ path: '/processApproval', query: { nextNodeCode, id, type: '科室申请' } })
      .catch(err => {
        console.warn(err)
      })
  }

  /**************************
   * 删除事件
   *************************/
  public async handleRemove(data: any) {
    const res: any = await delHospitalProcessBusiness({
      ids: data.id
    })
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
      Message.info('删除流程成功')
    }
  }

  /**************************
   * 获取流程操作记录
   * @param data
   *************************/
  public async queryProcessRecordListData(data: any) {
    const res: any = await queryProcessRecordList({
      businessId: data.id
    })
    if (res.result) {
      this.processRecordListData = res.data
    }
  }

  /**************************
   * 操作记录
   * @param data
   *************************/
  public handleRecord(data: any) {
    this.processRecordDialogVisible = true
    this.queryProcessRecordListData(data)
  }
}
