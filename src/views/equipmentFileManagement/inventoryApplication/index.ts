import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  delHospitalProcessBusiness,
  delCheckApply,
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
import { ALL_OPTIONS } from '@/shared/options'
import { FormatApproveStatusColumns } from '@/utils/functions'
import moment from 'moment'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import _ from 'lodash'

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
  async created() {
    console.log(this.path)
    await BusinessViewModule.GET_DEPARTMENT_DATA()
  }

  public path = this.$route.path
  public editColumns = this.path.indexOf('SQ') > -1 ? ['search', 'del', 'record'] : ['search']
  public toolbarBtns = this.path.indexOf('SQ') > -1 ? ['addProcess', 'import', 'delete', 'export'] : []
  public basicFormList = BasicFormList;
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      // approveStatus: '',
      // rollOutDepartment: '',
      // createTime: '',
      // status: ''
    },
    items: [
      // {
      //   field: 'rollOutDepartment',
      //   title: '制单科室',
      //   span: 8,
      //   itemRender: {
      //     name: '$select',
      //     props: { placeholder: '请选择' },
      //     options: BusinessViewModule.departmentData
      //   }
      // },
      // {
      //   field: 'status',
      //   title: '盘点状态',
      //   span: 8,
      //   itemRender: {
      //     name: '$select',
      //     props: { placeholder: '请选择' },
      //     options: ALL_OPTIONS.APPROVE_STATUS
      //   }
      // },
      {
        field: 'createTime',
        title: '创建时间',
        span: 10,
        slots: { default: 'create_time' }
      },
      { slots: { default: 'operate_item' }, span: 8 }
    ] // 表单项
  };

  /*************************************
   * 列表项
   ************************************/
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'billCode', title: '盘点单号', width: 150 },
    { field: 'userName', title: '申请人' },
    { field: 'createTime', title: '申请日期', formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    { field: 'checkDepartmentName', title: '盘点科室 ' },
    { field: 'equipmentCategoryName', title: '设备类别' },
    {
      width: this.$route.path.indexOf('PDSQ') > -1 ? 250 : 100,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  /*************************************
   * 列表传参
   ************************************/
  public paramsConfig: any = {
    url: '/checkApply/getCheckApplyInfo', // 根据表单查询项查询数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: ''
      }
    }
  };

  public clickProcessData: any = {}; // 当前操作流程节点信息

  /*************************************
   * 点击查看按钮事件-跳转审批页面
   * @param row
   ************************************/
  public handleSearch(row: any) {
    const { id, nextNodeCode } = row
    row.createTime = moment(row.createTime).format('YYYY-MM-DD')
    this.clickProcessData = row
    this.clickProcessData.billEquipmentList = this.clickProcessData.billEquipmentList.map(
      (item: any) => {
        return { ...item, ...item.equipment }
      }
    )
    this.clickProcessData.billMain.createTime = moment(this.clickProcessData.billMain.createTime).format('YYYY-MM-DD')
    // TODO: 换成store存储
    BusinessViewModule.GET_PROCESS_CLICKDATA({ type: 'inventory', data: this.clickProcessData })
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: 'inventory', data: this.requestForm })
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: 'inventory', data: this.requestParams })
    this.$router
      .push({
        path: `/processApproval/index/${'PDSQ'}`,
        query: { nextNodeCode, id, type: '盘点', moduleType: 'inventory' }
      })
      .catch((err: any) => {
        console.warn(err)
      })
  }

  /*************************************
   * 删除事件
   * @param data
   ************************************/
  public async handleRemove(row: any) {
    let params = {}
    if (Array.isArray(row)) {
      params = row.map((item) => {
        return { id: item.id }
      })
    } else {
      params = [{
        id: row.id
      }]
    }
    console.log('🚀 ~ params', params)
    const res: any = await delCheckApply(params)
    if (res) {
      (this.$refs.vexTable as any).findList(this.paramsConfig)
      Message.info('删除成功')
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
    status: '1',
    billCode: '',
    billMain: {
      id: '',
      userId: (UserModule.userData as any)?.employee.userId,
      createTime: new Date(),
      checkDepartment: (UserModule.userData as any)?.department.id,
      departmentId: (UserModule.userData as any)?.department.id,
      equipmentCategory: null,
      status: '',
      billCode: ''
    },
    billEquipmentList: [
      {
        id: '',
        billId: '',
        name: '',
        equipmentId: null,
        currentStatus: '',
        checkStatus: ''
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
  public handleInsert() {
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: 'inventory', data: this.requestForm })
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: 'inventory', data: this.requestParams })
    this.$router
      .push({ path: `/processRequest/index/${'PDSQ'}`, query: { type: '盘点', applyUrl: 'PDSQ', moduleType: 'inventory' } })
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
}
