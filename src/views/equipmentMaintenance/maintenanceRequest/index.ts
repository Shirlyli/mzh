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
import { FormatChildStatus, FormatMainStatus, FormatUrgency } from '../../../utils/functions'
import { ALL_OPTIONS } from '../../../shared/options'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import { TagsViewModule } from '@/store/modules/tags-view'
import { checkInfoFormList, requestInfoFormList } from './formColumns'
import { UserModule } from '../../../store/modules/user'
import { handleRepairApply } from '../../../api/equipment'
// 流程状态
enum MaintenanceStatusList {
  'SQ'='1', // 申请
  'SH'='2,3', // 审核
  'PG'='4,5', // 派工
  'JX'='6,7', // 检修
  'YS'='8,9', // 验收
  'GD'='10', // 归档
  // 'LJ'='20', // 作废
  'HY'='21', // 还原
  'SC'='22'// 删除
}

// 节点名称
enum MaintenanceStatusNameList {
  'SQ'='申请', // 申请
  'SH'='审核', // 审核
  'PG'='派工', // 派工
  'JX'='检修', // 检修
  'YS'='验收', // 验收
  'GD'='归档', // 归档
  'LJ'='作废', // 作废
  'HY'='还原', // 还原
  'SC'='删除', // 删除
  'CX'='综合', // 综合
}

// 票据类型
enum MaintenanceTypeList{
  'ZC'='1', // 正常
  'LJ'='2' // 作废
}

// 流程对应跳转表单type值 == 自定义
enum MaintenanceProcessType {
  'SQ'='maintenanceRequest', // 申请
  'SH'='maintenanceCheck', // 审核
  'PG'='maintenanceDispatch', // 派工
  'JX'='maintenanceIng', // 检修
  'YS'='maintenanceAcceptance', // 验收
  'GD'='maintenanceFile', // 归档
  'LJ'='maintenanceDustbin', // 作废
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
  LJ: ['search'], // 作废
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
  // 获取维修对应流程状态缩写
  get MaintenancePath() {
    return this.routePath.substr(-2, 2)
  }

  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      status: MaintenanceStatusList[this.MaintenancePath],
      billType: MaintenanceTypeList[this.MaintenancePath]
    },
    items: [
      {
        field: 'mainStatus',
        title: '主流程状态',
        span: 8,
        itemRender: { name: '$select', props: { placeholder: '请输入单据状态' }, options: ALL_OPTIONS.MAIN_STATUS }
      },
      // {
      //   field: 'status',
      //   title: '子流程状态',
      //   span: 8,
      //   itemRender: { name: '$select', props: { placeholder: '请输入单据状态' }, options: ALL_OPTIONS.CHILD_STATUS }
      // },
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
    { field: 'equipmentName', title: '设备名称', width: 150 },
    { field: 'applyDepartment', title: '申请科室', width: 150 },
    { field: 'applyTelphone', title: '申请号码', width: 150 },
    { field: 'applyTime', title: '申请时间', formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'), width: 150 },
    { field: 'billCode', title: '流程编码', width: 150 },
    { field: 'faultProblem', title: '维修原因', width: 150 },
    { field: 'transferTime', title: '外调时间', formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'), width: 150 },
    { field: 'status', title: '主流程状态', formatter: FormatMainStatus, width: 150 },
    { field: 'problemDesc', title: '问题描述', width: 150 },
    // { field: 'status', title: '子流程状态', formatter: FormatChildStatus, width: 150 },
    { field: 'urgency', title: ' 紧急程度 ', width: 150, formatter: FormatUrgency },
    { field: 'applyUserName', title: '申请人', width: 150 },
    {
      width: 150,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  // 列表传参

  public paramsConfig: any = {
    url: '/repairApply/query/queryByCondition', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: MaintenanceStatusList[this.MaintenancePath],
        billType: MaintenanceTypeList[this.MaintenancePath]
      }
    }
  };

  // 删除事件
  public async handleRemove(row: any) {
    console.log('🚀 ~ row', row)
    const res: any = await handleRepairApply('delete', {
      id: row.id
    })
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
      Message.success('删除成功')
    }
  }

  /****************
   * 流程申请相关
   *****************/
  // 申请form表单配置文件
  public requestInfoFormList = MaintenanceProcessType[this.MaintenancePath] === 'maintenanceRequest' ? requestInfoFormList : checkInfoFormList

  // 申请接口传惨params
  public requestParams = {
    maintenanceRequest: {
      applyUserId: UserModule.userData?.employee.userId,
      applyTime: new Date(),
      applyDepartmentId: UserModule.userData?.department.id,
      applyDepartment: UserModule.userData?.department.name,
      applyTelphone: UserModule.userData?.employee.phoneNo,
      urgency: '',
      faultProblem: '',
      problemDesc: '',
      applyUserName: UserModule.userData?.employee.eName,
      equipmentId: '',
      equipmentName: '',
      note: null
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
        query: { type: '维修申请', applyUrl: 'WXSQ', processType: MaintenanceProcessType[this.MaintenancePath] }
      })
      .catch((err: any) => {
        console.warn(err)
      })
  }

  //  点击查看按钮事件
  public handleSearch(row: any) {
    console.log('🚀 ~ row====', row)
    const clickdata = {
      ...row,
      urgency: ALL_OPTIONS.urgency.find((item:any) => String(item.value) === String(row.urgency))?.label,
      applyTime: moment(row.applyTime).format('YYYY-MM-DD')
    }
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: MaintenanceProcessType[this.MaintenancePath], data: this.requestParams })
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: MaintenanceProcessType[this.MaintenancePath], data: this.requestInfoFormList })
    BusinessViewModule.GET_PROCESS_CLICKDATA({ type: MaintenanceProcessType[this.MaintenancePath], data: clickdata })
    this.$router
      .push({
        path: `/maintenanceRequest/index/WX${this.MaintenancePath}`,
        query: { type: `维修${MaintenanceStatusNameList[this.MaintenancePath]}查看`, applyUrl: 'CK', processType: MaintenanceProcessType[this.MaintenancePath], url: `WX${this.MaintenancePath}` }
      })
      .catch((err: any) => {
        console.warn(err)
      })
  }
}
