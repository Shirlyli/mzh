import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
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
import { equipmentCategoryData } from '@/shared/options'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    processRequest,
    ProcessApproval,
    ProcessOperationRecord
  }
})
export default class extends Vue {
  public routePath = this.$route.path;
  // private isDYS = this.routePath.indexOf('DYS') > -1;// 待验收
  // private isYYS = this.routePath.indexOf('YYS') > -1;// 已验收

  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()
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
      createTime: ''
    },
    items: [
      {
        field: 'rollOutDepartment',
        title: '申请科室',
        itemRender: { name: '$input', props: { placeholder: '请输入申请科室' } },
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

  // 流程配置列表项
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
    {
      width: 100,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public commonEquipmentCategoryData = equipmentCategoryData

  /**
   * 列表传参
   * 已验收查看--查询已验收数据
   */
  public paramsConfig: any = {
    url: '/kssq/getKssqInfoList', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '20',
      entity: {
        status: '',
        projectName: '',
        applyPerson: ''
      }
    }
  };

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
      approveUser: (UserModule.userData as any)?.userId,
      approveUserName: (UserModule.userData as any)?.userName,
      approveTime: '',
      approveOpinion: '',
      approveStatus: '',
      billId: ''
    }
  };

  public processModal = {
    id: '',
    status: '0',
    billCode: '',
    billMain: {
      id: '',
      userId: '',
      createTime: '',
      rollOutDepartment: '',
      rollInDepartment: '',
      equipmentLocation: '',
      rollOutTime: '',
      cause: '',
      status: '0',
      billCode: ''
    },
    billEquipmentList: [
      {
        id: '',
        billId: '',
        equipmentId: ''
      }
    ],
    billApproveList: [
      {
        id: '',
        approveUser: '',
        approveTime: '',
        approveOpinion: '',
        approveStatus: '',
        chrckId: ''
      }
    ]
  };

  public rules = {
    nextNodeExecutor: [{ require: true, trigger: 'change', message: '请选择' }],
    approveStatus: [{ require: true, trigger: 'change', message: '请选择' }]
  };

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

  /**
   *验收点击跳转
   */
  public handleAcceptance(row:any) {
    console.log('🚀 ~ row', row)
    sessionStorage.setItem('ClickProcessData', JSON.stringify(row.billMain))
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    sessionStorage.setItem('EquipmentCategoryData', JSON.stringify(this.commonEquipmentCategoryData))
    this.$router.push({ path: '/equipmentAcceptOrWarehousing/index', query: { type: '验收' } })
  }
}
