import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { queryProcessRecordList } from '@/api/basic'
import { BusinessViewModule } from '../../../store/modules/business'
import ProcessApproval from '@/components/processApproval/index.vue'
import processRequest from '@/components/processRequest/index.vue'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { UserModule } from '../../../store/modules/user'
import moment from 'moment'
import { equipmentCategoryData } from '../../../shared/options'
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

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'applyDeptName', title: '申请科室', width: 150 },
    {
      field: 'applyTime',
      title: '申请日期',
      formatter: (data: any) => moment(data.cellvalue).format('YYYY-MM-DD'),
      width: 150
    },
    { field: 'projectName', title: '项目名称', width: 150 },
    { field: 'purchaseType', title: '购置类别', width: 150 },
    { field: 'applyModle', title: ' 采购类型 ', width: 150 },
    // { title: '供应商名称', field: 'bounder', width: 150 },
    { title: '设备名称', field: 'equipmentId', width: 150 },
    // { title: '品牌', field: 'boundType', width: 100 },
    // { title: '生产厂家', field: 'departmentId', width: 150 },
    { title: '数量', field: 'equipmentNum', width: 150 },
    { title: '设备单位', field: 'unit', width: 100 },
    { title: '金额', field: 'price', width: 100 },
    // { title: '保修', field: 'receivePerson', width: 150 },
    // { field: 'nextNodeName', title: ' 当前节点' },
    {
      width: 100,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public commonEquipmentCategoryData = equipmentCategoryData;

  /*****************************
   * 列表传参
   * 已验收查看--查询已验收数据
   ****************************/
  public paramsConfig: any = {
    url: '/kssq/getKssqInfoList', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        status: '2',
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

  /*****************************
   * 操作记录
   ***************************/
  public processRecordListData = []; // 操作记录
  public processRecordDialogVisible = false; // 操作记录显隐

  /*****************************
   *验收点击跳转
   ****************************/
  public async handleAcceptance(row: any) {
    const { equipmentId, unit, price } = row.billEquipmentList[0]
    this.commonEquipmentCategoryData = {
      ...this.commonEquipmentCategoryData,
      equipmentVO: {
        ...this.commonEquipmentCategoryData.equipmentVO,
        name: equipmentId,
        equipmentId,
        unit,
        price,
        departmentId: row.billMain.applyDept,
        id: '',
        billId: row.billCode,
        state: 1
      }
    }
    // TODO: 换成store存储
    console.log('🚀 ~ row.billMain', row.billMain)
    BusinessViewModule.GET_PROCESS_CLICKDATA({ type: 'acceptence', data: row.billMain })
    // sessionStorage.setItem('RequestForm', JSON.stringify(this.requestForm))
    BusinessViewModule.GET_PROCESS_REQUESTFORM({ type: 'acceptence', data: this.requestForm })
    // sessionStorage.setItem('RequestParams', JSON.stringify(row))
    BusinessViewModule.GET_PROCESS_REQUESTPARAMS({ type: 'acceptence', data: row })
    // sessionStorage.setItem(
    //   'EquipmentCategoryData',
    //   JSON.stringify(this.commonEquipmentCategoryData)
    // )
    BusinessViewModule.GET_PROCESS_EQUIPMENT_CATEGORY_DATA({ type: 'acceptence', data: this.commonEquipmentCategoryData })
    this.$router.push({
      path: '/equipmentAcceptOrWarehousing/index',
      query: { type: '验收' }
    })
  }
}
