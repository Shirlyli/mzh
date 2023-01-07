import { Component, Vue, Watch } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  delHospitalProcessBusiness,
  queryProcessRecordList
} from '@/api/basic'
import { BusinessViewModule } from '@/store/modules/business'
import { Message } from 'element-ui'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { UserModule } from '@/store/modules/user'
import ALL_OPTIONS from '@/shared/options'
import { FormatApproveStatusColumns } from '@/utils/functions'
import moment from 'moment'

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
      approveStatus: '',
      rollOutDepartment: '',
      cteaterTime: '',
      status: ''
    },
    items: [
      {
        field: 'approveStatus',
        title: '任务名称',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入任务名称' } }
      },
      {
        field: 'rollOutDepartment',
        title: '制单科室',
        span: 8,
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: BusinessViewModule.departmentData
        }
      },
      {
        field: 'status',
        title: '盘点状态',
        span: 8,
        itemRender: {
          name: '$select',
          props: { placeholder: '请选择' },
          options: ALL_OPTIONS.APPROVE_STATUS
        }
      },
      {
        field: 'cteaterTime',
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
    { field: 'checkDepartment', title: '任务名称' },
    { field: 'userName', title: '申请人' },
    { field: 'createTime', title: '申请日期', formatter: (data:any) => moment(data.cellvalue).format('YYYY-MM-DD') },
    { field: 'departmentName', title: '制单科室 ' },
    { field: 'equipmentCategory', title: '盘点范围' },
    {
      field: 'approveStatus',
      title: '盘点状态 ',
      formatter: (data: any) => FormatApproveStatusColumns(data)
    },
    {
      width: 250,
      title: '操作',
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
      entity: {}
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
    sessionStorage.setItem(
      'ClickProcessData',
      JSON.stringify(this.clickProcessData)
    )
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))

    this.$router
      .push({
        path: '/processApproval',
        query: { nextNodeCode, id, type: '盘点' }
      })
      .catch(err => {
        console.warn(err)
      })
  }

  /*************************************
   * 删除事件
   * @param data
   ************************************/
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

  /*******************************
   * 新增流程配置
   ******************************/
  public handleInsert() {
    sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    sessionStorage.setItem('RequestParams', JSON.stringify(this.requestParams))
    this.$router
      .push({ path: '/processRequest', query: { type: '盘点' } })
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
}
