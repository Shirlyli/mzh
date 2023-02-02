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
import { ALL_OPTIONS } from '@/shared/options'
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
  private isDYS = this.routePath.indexOf('DYS') > -1;// 待验收
  private isYYS = this.routePath.indexOf('YYS') > -1;// 已验收

  public editColumns =
    this.isDYS
      ? ['search']
      : this.isYYS

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
        field: 'approveStatus',
        title: '审批状态',
        itemRender: { name: '$select', props: { placeholder: '请输入审批状态' }, options: ALL_OPTIONS.APPROVAL_STATUS },
        span: 5
      },
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
    { field: 'billCode', title: '转科单号', width: 150 },
    { field: 'rollOutDepartmentName', title: '申请科室' },
    { field: 'userName', title: '申请人' },
    { field: 'createTime', title: '申请日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    { field: 'rollInDepartmentName', title: ' 转入科室 ' },
    { field: 'rollOutTime', title: ' 转科日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    { field: 'cause', title: ' 转科原因 ' },
    { field: 'approveStatus', title: ' 审批状态 ' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

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
        status: '2',
        projectName: '',
        applyPerson: ''
      }
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
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))

    this.$router
      .push({
        path: `/processApproval/index/${'SBYS'}`,
        query: { nextNodeCode, id, type: '设备验收' }
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

  /*******************************
   * 新增流程配置
   ******************************/
  public handleInsert(row: any) {
    console.log('🚀 ~ row', row)
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({ path: `/processRequest/index/${'SBYS'}`, query: { type: '设备验收', applyUrl: 'SBYS' } })
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
