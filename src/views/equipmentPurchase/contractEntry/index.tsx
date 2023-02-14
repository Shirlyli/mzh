import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { BusinessViewModule } from '@/store/modules/business'
import { Form, Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import moment from 'moment'
import { ALL_OPTIONS, equipmentCategoryData } from '@/shared/options'
import { getBillInfoByApprove } from '@/api/basic'
import { updateEquipmentInfoData } from '@/api/equipment'
@Component({
  name: 'InlineEditTable',
  components: {
    VexTable
  }
})
export default class extends Vue {
  public routePath = this.$route.path;

  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()
  }

  public equipmentStores = [
    { title: '供应商名称', key: 'bounder', required: true, type: 'input' },
    { title: '设备名称', key: 'boundNums', type: 'input' },
    { title: '型号', key: 'boundTime', type: 'date' },
    { title: '品牌', key: 'boundType', type: 'input' },
    { title: '生产厂家', key: 'departmentId', type: 'input' },
    { title: '数量', key: 'equipmentId', type: 'input' },
    { title: '金额', key: 'note', type: 'textarea' },
    { title: '保修', key: 'receivePerson', type: 'input' }
  ];

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
        field: 'bounder',
        title: '供应商',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入供应商' }
        },
        span: 5
      },
      {
        field: 'boundNums',
        title: '设备名称',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入供应商' }
        },
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
    { title: '供应商名称', field: 'bounder' },
    { title: '设备名称', field: 'boundNums' },
    { title: '型号', field: 'boundTime', type: 'date' },
    { title: '品牌', field: 'boundType' },
    { title: '生产厂家', field: 'departmentId' },
    { title: '数量', field: 'equipmentId' },
    { title: '金额', field: 'note' },
    { title: '保修', field: 'receivePerson' },
    {
      width: 100,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  /**
   * 列表传参
   * 已验收查看--查询已验收数据
   */
  public paramsConfig: any = {
    url: '/purchaseCheck/queryPurchaseCheckList', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        checkState: '已验收'
      }
    }
  };

  // 申请接口传惨params
  public requestParams = equipmentCategoryData;

  /**
   * 点击入库
   * @param row
   */
  public dialogStatus = false; // 入库弹框显隐
  public async handleWarehousing(row: any) {
    console.log('🚀 ~ row', row)
    // 根据bussinessId获取单据数据
    const params = {
      page: '1',
      limit: '10',
      entity: {
        businessId: row.bussinessId,
        processCode: 'pro_kssq'
      }
    }
    // const equipmentRes = await getBillInfoByApprove(params)
    this.dialogStatus = true
  }

  // 提交入库
  public submitInWarehousing() {
    (this.$refs.requestParams as any).validate(async(valid: any) => {
      if (valid) {
        console.log('this.requestParams', this.requestParams)
        const {
          equipmentDepreciations,
          equipmentInspection,
          equipmentMaintain,
          equipmentPurchases,
          equipmentResources,
          equipmentStocks,
          equipmentStores,
          equipmentVO,
          id,
          state
        } = this.requestParams
        const paramsConfig = {
          equipmentDepreciations: Object.values(equipmentDepreciations).length
            ? [equipmentDepreciations]
            : [],
          equipmentInspection: Object.values(equipmentInspection).length
            ? [equipmentInspection]
            : [],
          equipmentMaintain: Object.values(equipmentMaintain).length
            ? [equipmentMaintain]
            : [],
          equipmentPurchases: Object.values(equipmentPurchases).length
            ? [equipmentPurchases]
            : [],
          equipmentResources: Object.values(equipmentResources).length
            ? [equipmentResources]
            : [],
          equipmentStocks: Object.values(equipmentStocks).length
            ? [equipmentStocks]
            : [],
          equipmentStores: Object.values(equipmentStores).length
            ? [{ ...equipmentStores, boundType: '入库' }]
            : [],
          equipmentVO,
          id,
          state
        }
        const params = []
        params.push(paramsConfig)
        console.log('🚀 ~ params', params)
        const res: any = await updateEquipmentInfoData(params)
        if (res.code === 200) {
          Message.success('入库成功')
          this.dialogStatus = false
        }
      }
    })
  }
}
