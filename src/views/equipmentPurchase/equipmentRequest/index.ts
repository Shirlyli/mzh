import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { Message } from 'element-ui'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import { UserModule } from '@/store/modules/user'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    ProcessApproval,
    processRequest,
    ProcessOperationRecord
  }
})
export default class extends Vue {
  public routePath = this.$route.path;

  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()
    // BasicFormList.forEach((item: any) => {
    //   if (item.slot === 'department') {
    //     item.data = BusinessViewModule.departmentData.map((dept: any) => {
    //       return { label: dept.title, value: dept.id }
    //     })
    //   }
    // })
  }

  /**************************
   * 列表查询项-表单
   *************************/
  public formConfig = {
    data: {
      processName: '',
      nodeName: '',
      createTime: ''
    },
    items: [
      {
        field: 'projectName',
        title: '项目名称',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入项目名称' }
        },
        span: 5
      },
      {
        field: 'applyDept',
        title: '申请科室',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入申请科室' }
        },
        slots: { default: 'departmentSelect' },
        span: 5
      },
      {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 10
      },
      { slots: { default: 'operate_item' }, span: 4 }
    ] // 表单项
  };

  /************************
   * 流程配置列表项
   *************************/
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDept', title: '申请科室', width: 150 },
    {
      field: 'applyTime',
      title: '申请日期',
      formatter: (data: any) => moment(data.cellvalue).format('YYYY-MM-DD')
    },
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

  /**************************
   * 待处理列表传参
   **************************/
  public paramsConfig: any = {
    url: '/kssq/getKssqInfoList', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '20',
      entity: {
        projectName: '',
        applyPerson: ''
      }
    }
  };

  /*************************
   * 申请接口传惨params
   ************************/
  public requestParams = {
    id: '',
    status: '0',
    billCode: '',
    billMain: {
      id: '',
      billCode: '',
      userId: (UserModule.userData as any)?.userId,
      userName: (UserModule.userData as any)?.userName,
      applyDept: '',
      applyModle: '',
      applyReson: '',
      projectName: '', //* 项目名称 /
      purchaseType: '' // 购置类别 /
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
      nextNodeExecutor: '',
      nextNodeExecutorName: '',
      auditReason: '',
      auditStatus: '',
      processCode: 'pro_kssq',
      currentNodeName: '',
      currentNodeCode: '',
      nextNodeName: '',
      nextNodeCode: '',
      optType: '', // 保存 -不传，提交 ---add，审批---update
      billId: ''
    },
    dicAttachmentsList: []
  };

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

  public handleInsert() {
    this.addEquipmentRequest()
  }

  /**************************
   * 新增科室申请
   *************************/
  public addEquipmentRequest() {
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({
        path: `/processRequest/index/${'KSSQ'}`,
        query: { type: '科室申请', applyUrl: 'KSSQ' }
      })
      .catch(err => {
        console.warn(err)
      })
  }

  /**************************
   * 点击查看按钮事件-跳转审批页面
   * @param row
   *************************/
  public handleSearch(row: any) {
    const { id, nextNodeCode } = row
    this.clickProcessData = row
    this.clickProcessData.billEquipmentList = this.clickProcessData.billEquipmentList.map(
      (item: any) => {
        return { ...item, ...item.equipment }
      }
    )
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('BasicFormList', JSON.stringify(this.basicFormList))
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({
        path: `/processApproval/index/${'KSSQ'}`,
        query: { nextNodeCode, id, type: '科室申请' }
      })
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
