import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import {
  queryProcessRecordList,
  savePurchaseCheck
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
import moment from 'moment'
import { ALL_OPTIONS, equipmentCategoryData } from '../../../shared/options'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import { handleDepartData } from '../../../shared/utils'

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

  public basicFormList = BasicFormList;
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {
      // approveStatus: '',
      // rollOutDepartment: '',
      // createTime: ''
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
    { field: 'name', title: '设备名称', width: 150 },
    {
      field: 'applyTime',
      title: '申请日期',
      formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD'),
      width: 150
    },
    { field: 'departmentName', title: '领用科室', width: 150 },
    { field: 'boundTime', title: '出库日期', width: 150, formatter: (data: any) => moment(data.cellValue).format('YYYY-MM-DD') },
    { field: 'billId', title: '出库单号', width: 150 },
    { field: 'price', title: '出库金额', width: 150 },
    { field: 'num', title: '出库数量', width: 150 },
    { field: 'purchaseType', title: '备注', width: 150 },
    // { field: 'purchaseType', title: '状态', width: 150 },
    {
      width: 120,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  public equipmentStores = [
    // { title: '设备唯一编码', key: 'idCode', type: 'input' },
    { title: '领用人', key: 'receivePerson', type: 'select', options: BusinessViewModule.employeeData, required: true },
    { title: '出库操作人', key: 'bounder', type: 'select', options: BusinessViewModule.employeeData, required: true },
    { title: '出库数量', key: 'boundNums', type: 'input' },
    { title: '出库时间', key: 'boundTime', type: 'date' },
    { title: '目的地', key: 'destinationId', type: 'treeSelect', options: handleDepartData(BusinessViewModule.departmentData), required: true },
    { title: '仓库', key: 'departmentId', type: 'treeSelect', options: handleDepartData(BusinessViewModule.departmentData), required: true },
    { title: '备注', key: 'note', type: 'textarea' }
  ];

  public dialogStatus = false

  /***********************************
   * 列表传参
   * 已验收查看--查询已验收数据
   **********************************/
  public paramsConfig: any = {
    url: '/equipmentTemp/getEquipmentInfo', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        operationStatus: 'IN_STORE'
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
  public requestParams = equipmentCategoryData

  public handleWarehousing(row:any) {
    console.log('🚀 ~ row', row)
    this.rowData = row
    this.dialogStatus = true
  }

  /**********************************
  * 提交出库
  * **********************************/
  public rowData :any= {}
  public submitInWarehousing() {
    (this.$refs.requestParams as any).validate(async(valid: any) => {
      if (valid) {
        console.log('this.requestParams', this.requestParams, 'this.rowData', this.rowData)
        const {
          equipmentStores,
          equipmentVO,
          state
        } = this.requestParams
        const paramsConfig = {
          equipmentStores: Object.values(equipmentStores).length
            ? [
                {
                  ...equipmentStores,
                  id: this.rowData.equipmentStores[0].id,
                  boundType: 'OUT_STORE',
                  equipmentId: this.rowData.name,
                  equipmentName: this.rowData.name
                }
              ]
            : [],
          equipmentVO: {
            ...equipmentVO,
            ...this.rowData.equipmentVO,
            operationStatus: 'OUT_STORE',
            billId: equipmentVO.billCode
          },
          id: this.rowData.id,
          state
        }
        const params: any = []
        params.push(paramsConfig)
        console.log('🚀 ~ params', params)
        const res: any = await savePurchaseCheck(params)
        if (res.code === 200) {
          Message.success('入库成功')
          this.dialogStatus = false
        }
      }
    })
  }
}
