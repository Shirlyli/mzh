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
  ApprovalFormlist,
  FileFormList
} from './formColumns'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import { UserModule } from '@/store/modules/user'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import { ALL_OPTIONS } from '../../../shared/options'
import { TagsViewModule } from '../../../store/modules/tags-view'

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
  public visitedViews = TagsViewModule.visitedViews.find((item:any) => item.path === this.$route.path)
  private activeTagViews = {}
  public routePath = this.$route.path;
  private isYSQ = this.routePath.indexOf('YSQ') > -1;// 已申请
  private isCGX = this.routePath.indexOf('CGX') > -1;// 草稿箱
  private isDSP = this.routePath.indexOf('DSP') > -1;// 待审批
  private isPSJD = this.routePath.indexOf('PSJD') > -1;// 评审进度
  private isPSJG = this.routePath.indexOf('PSJG') > -1;// 评审进度
  private isZBJL = this.routePath.indexOf('ZBJL') > -1;// 招标记录

  async created() {
    console.log('🚀 ~ routePath', this.routePath, '===', this.visitedViews, TagsViewModule.cachedViews)
    // this.activeTagViews = this.visitedViews?.matched?.find((item:any)=>item.)
    if (this.isCGX) {
      this.columns = [
        ...this.columns,
        {
          width: 160,
          title: '操作',
          fixed: 'right',
          slots: { default: 'operateHasSearch' },
          showOverflow: true
        }
      ]
      this.formConfig.items = [...this.formConfig.items, {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 10,
        resetValue: ''
      },
      { slots: { default: 'operate_item' }, span: 4 }]
    } else if (this.isPSJD || this.isPSJG) {
      this.columns = [
        ...this.columns,
        { field: 'status', title: '已评人数' },
        { field: 'status', title: '未评人数' },
        { field: 'nextNodeName', title: ' 当前节点' },
        { field: 'nextNodeState', title: ' 状态 ' },
        {
          width: 200,
          title: '操作',
          fixed: 'right',
          slots: { default: 'operateHasSearch' },
          showOverflow: true
        }
      ]
    } else {
      this.columns = [
        ...this.columns,
        { field: 'nextNodeName', title: ' 当前节点' },
        { field: 'nextNodeState', title: ' 状态 ' },
        {
          width: 200,
          title: '操作',
          fixed: 'right',
          slots: { default: 'operateHasSearch' },
          showOverflow: true
        }
      ]
      this.formConfig.items = [...this.formConfig.items, {
        field: 'nextNodeName',
        title: '流程节点',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入流程节点' }
        },
        resetValue: '',
        span: 8
      }, {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 9,
        // folding: true,
        resetValue: []
      },
      { slots: { default: 'operate_item' }, span: 24, collapseNode: true, align: 'center' }]
    }
    await BusinessViewModule.GET_DEPARTMENT_DATA()
  }

  public toobarBtns =
  this.isCGX ? ['addProcess', 'import', 'delete', 'export'] : this.isYSQ || this.isDSP ? [] : []

  public editColumns =
    this.isCGX
      ? ['search', 'del']
      : this.isYSQ || this.isPSJD || this.isZBJL
        ? ['search']
        : this.isDSP ? ['approval', 'record'] : [];

  /**************************
   * 列表查询项-表单
   *************************/
  public formConfig :any= {
    data: {
      processName: '',
      nodeName: '',
      createTime: '',
      purchaseType: ''
    },
    items: [
      {
        field: 'projectName',
        title: '项目名称',
        resetValue: '',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入项目名称' }
        },
        span: 8
      },
      {
        field: 'purchaseType',
        title: '购置类别',
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.purchaseType
        },
        span: 8
      },
      {
        field: 'applyDept',
        title: '申请科室',
        resetValue: '',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入申请科室' }
        },
        slots: { default: 'departmentSelect' },
        span: this.isCGX ? 8 : 8
      }

    ] // 表单项
  };

  /************************
   * 流程配置列表项
   *************************/
  public columns: any = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDeptName', title: '申请科室', width: 150 },
    {
      field: 'applyTime',
      title: '申请日期',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD')
    },
    { field: 'projectName', title: '项目名称' },
    { field: 'purchaseType', title: '购置类别' },
    { field: 'applyModle', title: '采购类型 ' },
    { field: 'status', title: '数量 ' },
    { field: 'price', title: '总金额 ' }

  ];

  public basicFormList = BasicFormList;

  /**************************
   * 待处理列表传参
   **************************/
  public paramsConfig: any = {
    url: '/kssq/getKssqInfoList', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: this.isYSQ ? '' : this.isCGX ? '0' : '1',
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
    dicAttachmentsList: [{
      id: '',
      fileName: '',
      applyPerson: ''
    }]
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
    billApproveList: ApprovalFormlist,
    dicAttachmentsList: FileFormList
  };

  public handleInsert() {
    this.addEquipmentRequest()
  }

  /**************************
   * 新增科室申请
   *************************/
  public addEquipmentRequest() {
    // TODO: 换成store存储
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({
        path: `/processRequest/index/${'KSSQ'}`,
        query: { type: '采购申请', applyUrl: 'KSSQ' }
      })
      .catch((err:any) => {
        console.warn(err)
      })
  }

  public routerToApproval(row: any, type: string) {
    const {
      id,
      nextNodeCode,
      status,
      processCode,
      billCode,
      billMain,
      billApproveList,
      billEquipmentList,
      dicAttachmentsList
    } = row
    this.clickProcessData = row
    this.clickProcessData.billEquipmentList = this.clickProcessData.billEquipmentList.map(
      (item: any) => {
        return { ...item }
      }
    )
    console.log('🚀 ~ this.clickProcessData', this.clickProcessData)
    const sendRequestParams = {
      id,
      status,
      billCode,
      billMain,
      billApproveList,
      billEquipmentList,
      dicAttachmentsList
    }
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('BasicFormList', JSON.stringify(this.basicFormList))
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(sendRequestParams))
    this.$router
      .push({
        path: `/processApproval/index/${'KSSQ'}`,
        query: {
          nextNodeCode,
          processCode,
          type: '采购申请',
          applyUrl: 'KSSQ',
          code: type
        }
      })
      .catch((err:any) => {
        console.warn(err)
      })
  }

  /**************************
   * 点击查看按钮事件-跳转审批页面
   * @param row
   *************************/
  public handleSearch(row: any) {
    console.log('🚀 ~ row', row)
    this.routerToApproval(row, 'search')
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

  /****************************
   * 编辑
   **************************/
  public handleUpdate(data: any) {
    this.routerToApproval(data, 'edit')
  }
}
