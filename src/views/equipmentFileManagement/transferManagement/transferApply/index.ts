import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
  private isYSQ = this.routePath.indexOf('YSQ') > -1;// 已申请
  private isCGX = this.routePath.indexOf('CGX') > -1;// 草稿箱
  private isDSP = this.routePath.indexOf('DSP') > -1;// 待审批

  public toobarBtns =
    this.isYSQ || this.isDSP
      ? []
      : ['addProcess', 'import', 'delete', 'export'];

  public editColumns =
    this.isCGX
      ? ['search', 'del']
      : this.isYSQ
        ? ['search']
        : ['approval', 'record'];

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
        span: 4
      },
      {
        field: 'rollOutDepartment',
        title: '申请科室',
        itemRender: { name: '$input', props: { placeholder: '请输入申请科室' } },
        slots: { default: 'departmentSelect' },
        span: 8
      },
      {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 10
      },
      { slots: { default: 'operate_item' }, span: 8 }
    ] // 表单项
  };

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'billCode', title: '转科单号', width: 150 },
    { field: 'rollOutDepartmentName', title: '申请科室', width: 150 },
    { field: 'userName', title: '申请人', width: 150 },
    { field: 'createTime', title: '申请日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss'), width: 150 },
    { field: 'rollInDepartmentName', title: ' 转入科室 ', width: 150 },
    { field: 'rollOutTime', title: ' 转科日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss'), width: 150 },
    { field: 'cause', title: ' 转科原因 ', width: 150 },
    { field: 'approveStatus', title: ' 审批状态 ', width: 150 },
    {
      width: 250,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public query = this.$route.path
  // 列表传参
  public paramsConfig: any = {
    url: '/rollDepartment/getRollDepartmentInfo', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: this.query.indexOf('CGX') > -1 ? '0' : this.query.indexOf('YSQ') > -1 ? '' : this.query.indexOf('DSP') > -1 ? '1' : ''
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
    BusinessViewModule.GET_PROCESS_CLICKDATA({ type: 'transferDepartment', data: this.clickProcessData })
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: 'transferDepartment', data: this.requestForm })
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: 'transferDepartment', data: this.requestParams })
    this.$router
      .push({
        path: `/processApproval/index/${'ZKSQ'}`,
        query: { nextNodeCode, id, type: '转科', moduleType: 'transferDepartment' }
      })
      .catch((err: any) => {
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

  // 申请接口传参params
  public requestParams = {
    id: '',
    status: '0',
    billCode: '',
    billMain: {
      id: '',
      userId: (UserModule.userData as any)?.userId,
      userName: (UserModule.userData as any)?.employee?.eName,
      createTime: new Date(),
      rollOutDepartment: (UserModule.userData as any)?.department.id,
      rollInDepartment: null,
      equipmentLocation: null,
      rollOutTime: '',
      cause: '',
      status: '',
      billCode: ''
    },
    billEquipmentList: [
      {
        id: '',
        billId: '',
        equipmentId: null
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

  /*******************************
   * 新增流程配置
   ******************************/
  public handleInsert(row: any) {
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: 'transferDepartment', data: this.requestForm })
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: 'transferDepartment', data: this.requestParams })
    this.$router
      .push({ path: `/processRequest/index/${'ZKSQ'}`, query: { type: '转科', applyUrl: 'ZKSQ', moduleType: 'transferDepartment' } })
      .catch((err: any) => {
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
