import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { BusinessViewModule } from '@/store/modules/business'
import { Message } from 'element-ui'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { UserModule } from '@/store/modules/user'
import moment from 'moment'
import { FormatApproveStatus } from '@/utils/functions'

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
  }

  public basicFormList = BasicFormList;
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      status: '',
      departmentId: '',
      cteaterTime: '',
      instructions: '',
      useDepartmentId: ''
    },
    items: [
      {
        field: 'status',
        title: '单据状态',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入单据状态' } }
      },
      {
        field: 'departmentId',
        title: '申请科室',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入申请科室' } }
      },
      {
        field: 'useDepartmentId',
        title: '使用科室',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入使用科室' } }
      },
      {
        field: 'instructions',
        title: '使用情况',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入使用情况' } }
      },
      {
        field: 'cteaterTime',
        title: '创建时间',
        span: 6,
        folding: true,
        slots: { default: 'create_time' }
      },
      { slots: { default: 'operate_item' }, span: 24, collapseNode: true, align: 'center' }
    ] // 表单项
  };

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'billCode', title: '报废单号', width: 150 },
    { field: 'departmentName', title: '申请人科室' },
    { field: 'useDepartmentId', title: '使用科室' },
    { field: 'instructions', title: '使用情况' },
    {
      field: 'status',
      title: '单据状态',
      formatter: FormatApproveStatus
    },
    { field: 'cause', title: ' 报废原因 ' },
    { field: 'approveStatus', title: '审批状态', formatter: FormatApproveStatus },
    {
      field: 'createTime',
      title: '申请日期',
      formatter: (data: any) => moment(data.cellvalue).format('YYYY-MM-DD')
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
    url: '/scrapApply/getScrapApplyInfo', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
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
    this.clickProcessData = {
      ...this.clickProcessData,
      createTime: moment(this.clickProcessData.createTime).format('YYYY-MM-DD'),
      returnTime: moment(this.clickProcessData.returnTime).format('YYYY-MM-DD'),
      borrowTime: moment(this.clickProcessData.borrowTime).format('YYYY-MM-DD')
    }
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))

    this.$router
      .push({
        path: '/processApproval',
        query: { nextNodeCode, id, type: '报废' }
      })
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
      userId: (UserModule.userData as any)?.userId,
      userName: (UserModule.userData as any)?.userName,
      createTime: '',
      departmentId: '',
      borrowDepartmentId: '',
      borrowTime: '',
      cause: '',
      returnTime: '',
      returnStatus: '',
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
      approveUser: (UserModule.userData as any)?.userId,
      approveUserName: (UserModule.userData as any)?.userName,
      approveTime: '',
      approveOpinion: '',
      approveStatus: '',
      billId: '' // 主表id
    },
    borrowReturnList: {
      id: '',
      userId: (UserModule.userData as any)?.userId,
      userName: (UserModule.userData as any)?.userName,
      borrowUnivalence: '',
      borrowDuration: '',
      totalPrice: '',
      returnTime: '',
      returnStatus: '',
      returnExplain: '',
      billId: '' // 主表id
    }
  };

  public rules = {
    nextNodeExecutor: [{ require: true, trigger: 'change', message: '请选择' }],
    approveStatus: [{ require: true, trigger: 'change', message: '请选择' }]
  };

  /*******************************
   * 新增流程配置
   ******************************/
  public handleInsert(row: any) {
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({ path: '/processRequest', query: { type: '报废', applyUrl: 'BFSQ' } })
      .catch(err => {
        console.warn(err)
      })
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
  public clickProcessData: any = {}; // 当前操作流程节点信息
}