import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { BusinessViewModule } from '../../../store/modules/business'
import { Message } from 'element-ui'
import { equipmentCategoryData } from '../../../shared/options'
import { savePurchaseCheck } from '@/api/basic'
import { handleDepartData } from '../../../shared/utils'
import Treeselect from '@riophae/vue-treeselect'
@Component({
  name: 'InlineEditTable',
  components: {
    VexTable,
    Treeselect
  }
})
export default class extends Vue {
  public routePath = this.$route.path;

  /**********************************
   * 入库弹框form表单渲染
   *********************************/
  public equipmentStores = [
    { title: '设备唯一编码', key: 'idCode', type: 'input', required: true },
    {
      title: '领用人',
      key: 'receivePerson',
      type: 'select',
      options: BusinessViewModule.employeeData,
      required: true
    },
    {
      title: '入库操作人',
      key: 'bounder',
      type: 'select',
      options: BusinessViewModule.employeeData,
      required: true
    },
    { title: '入库数量', key: 'boundNums', type: 'input', required: true, disabled: true },
    { title: '入库时间', key: 'boundTime', type: 'date', required: true },
    {
      title: '仓库',
      key: 'departmentId',
      type: 'treeSelect',
      options: handleDepartData(BusinessViewModule.departmentData),
      required: true
    },
    { title: '备注', key: 'note', type: 'textarea', required: true }
  ];

  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  public formConfig = {
    data: {},
    items: [
      {
        field: 'rollOutDepartment',
        title: '入库单号',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入' }
        },
        span: 5
      },
      {
        field: 'rollOutDepartment',
        title: '供应商',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入' }
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
    { field: 'billId', title: '流程单号', width: 150 },
    { field: 'name', title: '设备名称', width: 150 },
    { field: 'price', title: '设备价格', width: 150 },
    { field: 'unit', title: '设备单位', width: 100 },
    { field: 'departmentName', title: '申请科室', width: 150 },
    { field: 'id', title: '入库单号', width: 150 },
    { field: 'marking', title: '供应商', width: 150 },
    {
      width: 100,
      title: '操作',
      fixed: 'right',
      slots: { default: 'operateHasSearch' },
      showOverflow: true
    }
  ];

  /**********************************
   * 列表传参
   * 已验收查看--查询已验收数据
   *********************************/
  public paramsConfig: any = {
    url: '/equipmentTemp/getEquipmentInfo', // 待验收--查询已归档数据
    params: {
      page: '1',
      limit: '10',
      entity: {
        operationStatus: 'CHECK'
      }
    }
  };

  // 申请接口传惨params
  public requestParams = equipmentCategoryData;

  /**********************************
   * 点击入库
   * @param row
   *********************************/
  public dialogStatus = false; // 入库弹框显隐
  public async handleWarehousing(row: any) {
    this.rowData = row
    this.requestParams.equipmentStores = {
      departmentId: null,
      boundTime: null,
      boundType: null,
      bounder: null,
      receivePerson: null,
      boundNums: 1,
      note: null,
      destinationId: null,
      idCode: null
    }
    this.dialogStatus = true
  }

  /*********************************
   * 提交入库
   ********************************/
  public rowData: any = {};
  public submitInWarehousing() {
    console.log(this.requestParams.equipmentStores);
    (this.$refs.requestParams as any).validate(async(valid: any) => {
      if (valid) {
        const { equipmentStores, equipmentVO, state } = this.requestParams
        const paramsConfig = {
          equipmentStores: Object.values(equipmentStores).length
            ? [
                {
                  ...equipmentStores,
                  boundType: 'IN_STORE',
                  destinationId: equipmentStores.departmentId,
                  equipmentId: this.rowData.name,
                  equipmentName: this.rowData.name
                }
              ]
            : [],
          equipmentVO: {
            ...equipmentVO,
            ...this.rowData.equipmentVO,
            operationStatus: 'IN_STORE',
            idCode: equipmentStores.idCode,
            billId: this.rowData.billCode
          },
          id: this.rowData.id,
          state
        }
        const params: any = []
        params.push(paramsConfig)
        const res: any = await savePurchaseCheck(params)
        if (res.code === 200) {
          Message.success('入库成功')
          this.dialogStatus = false
        }
      }
    })
  }
}
