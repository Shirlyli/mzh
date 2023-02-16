import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  delHospitalProcessBusiness
} from '@/api/basic'
import { BusinessViewModule } from '@/store/modules/business'
import { Message } from 'element-ui'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import moment from 'moment'
import { FormatChildStatus, FormatMainStatus } from '@/utils/functions'
import { ALL_OPTIONS } from '@/shared/options'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import { TagsViewModule } from '@/store/modules/tags-view'
import { requestInfoFormList } from './formColumns'
import { UserModule } from '../../../store/modules/user'
// 流程状态
enum MaintenanceStatusList {
  'SQ'='1', // 申请
  'SH'='2,3', // 审核
  'PG'='4,5', // 派工
  'JX'='6,7', // 检修
  'YS'='8,9', // 验收
  'GD'='10', // 归档
  'ZF'='20', // 作废
  'HY'='21', // 还原
  'SC'='22'// 删除
}

// 票据类型
enum MaintenanceTypeList{
  'ZC'='1', // 正常
  'ZF'='2' // 作废
}

// 流程对应跳转表单type值 == 自定义
enum MaintenanceProcessType {
  'SQ'='maintenanceRequest', // 申请
  'SH'='maintenanceCheck', // 审核
  'PG'='maintenanceDispatch', // 派工
  'JX'='maintenanceIng', // 检修
  'YS'='maintenanceAcceptance', // 验收
  'GD'='maintenanceFile', // 归档
  'ZF'='maintenanceDustbin', // 作废
  'HY'='maintenanceReturn', // 还原
  'SC'='maintenanceDel'// 删除
}

const MaintenanceToolbarButtons = {
  SQ: ['search', 'del'], // 申请
  SH: ['search'], // 审核
  PG: ['search'], // 派工
  JX: ['search'], // 检修
  YS: ['search'], // 验收
  GD: ['search'], // 归档
  ZF: ['search'], // 作废
  HY: ['search'], // 还原
  SC: ['search'], // 删除
  CX: ['search']// 综合查询
}

@Component({
  name: 'MaintenanceRequest',
  components: {
    VexTable,
    processRequest,
    ProcessApproval,
    ProcessOperationRecord
  }
})

export default class extends Vue {
  public routePath = this.$route.path
  public visitedViews :any= TagsViewModule.visitedViews.find((item:any) => item.path === this.$route.path)
  public editColumns = MaintenanceToolbarButtons[this.MaintenancePath]
  public toolbarBtns = this.MaintenancePath === 'SQ' ? ['addProcess', 'import'] : []
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      mainStatus: '',
      status: ''
    },
    items: [
      {
        field: 'mainStatus',
        title: '主流程状态',
        span: 8,
        itemRender: { name: '$select', props: { placeholder: '请输入单据状态' }, options: ALL_OPTIONS.MAIN_STATUS }
      },
      {
        field: 'status',
        title: '子流程状态',
        span: 8,
        itemRender: { name: '$select', props: { placeholder: '请输入单据状态' }, options: ALL_OPTIONS.CHILD_STATUS }
      },
      {
        slots: { default: 'operate_item' },
        span: 8
      }
    ] // 表单项
  };

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDepartment', title: '申请科室', width: 150 },
    { field: 'applyTelphone', title: '申请号码', width: 150 },
    { field: 'applyTime', title: '申请时间', width: 150 },
    { field: 'billCode', title: '流程编码', width: 150 },
    { field: 'faultProblem', title: '维修原因', width: 150 },
    { field: 'transferTime', title: '外调时间', formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'), width: 150 },
    { field: 'mainStatus', title: '主流程状态', formatter: FormatMainStatus, width: 150 },
    { field: 'problemDesc', title: '问题描述', width: 150 },
    { field: 'status', title: '子流程状态', formatter: FormatChildStatus, width: 150 },
    { field: 'urgency', title: ' 紧急程度 ', width: 150 },
    { field: 'userName', title: '申请人', width: 150 },
    {
      width: 150,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  // 获取维修对应流程状态缩写
  get MaintenancePath() {
    console.log(this.routePath.substr(-2, 2))
    return this.routePath.substr(-2, 2)
  }

  // 列表传参

  public paramsConfig: any = {
    url: '/repairApply/query/queryByCondition', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: MaintenanceStatusList[this.MaintenancePath]
      }
    }
  };

  //  点击查看按钮事件
  public handleSearch(row: any) {
    const { id, nextNodeCode } = row
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
  public requestInfoFormList = requestInfoFormList
  // 申请接口传惨params
  public requestParams = {
    requestInfo: {
      departmentId: UserModule.userData?.department.id,
      equipmentId: null,
      equipmentCode: null,
      faultProblem: null,
      problemDesc: null,
      a: null,
      b: UserModule.userData?.employee.userId,
      c: UserModule.userData?.employee.phoneNo,
      d: new Date(),
      e: null,
      f: null,
      g: null,
      h: null,
      i: null
    }
  };

  /*******************************
   * 生成申请单
   ******************************/
  public handleInsert(row: any) {
    console.log('🚀 ~ 生成申请单', row)
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: MaintenanceProcessType[this.MaintenancePath], data: this.requestInfoFormList })
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: MaintenanceProcessType[this.MaintenancePath], data: this.requestParams })
    this.$router
      .push({
        path: `/maintenanceRequest/index/${'WXSQ'}`,
        query: { type: '维修', applyUrl: 'WXSQ', processType: MaintenanceProcessType[this.MaintenancePath] }
      })
      .catch((err: any) => {
        console.warn(err)
      })
  }
}
