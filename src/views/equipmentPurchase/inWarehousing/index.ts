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
    // { title: '出入库操作人', key: 'bounder', required: true, type: 'input' },
    { title: '出入库数量', key: 'boundNums', type: 'input' },
    { title: '出入库时间', key: 'boundTime', type: 'date' },
    // { title: '出入库类型', key: 'boundType', type: 'input' },
    { title: '仓库', key: 'departmentId', type: 'input' },
    { title: '设备', key: 'equipmentId', type: 'input' }
    // { title: '备注', key: 'note', type: 'textarea' },
    // { title: '领用人', key: 'receivePerson', type: 'input' }
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
    { field: 'equName', title: '设备名称', width: 150 },
    { field: 'projectName', title: '厂家名称' },
    { field: 'purchaseType', title: '型号' },
    {
      field: 'checkDate',
      title: ' 验收时间 ',
      formatter: (data: any) =>
        moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      width: 100,
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
    (this.$refs.requestParams as Form).validate(async valid => {
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
