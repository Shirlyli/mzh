import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { BusinessViewModule } from '@/store/modules/business'
import { Message } from 'element-ui'
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
        span: 6
      },
      // {
      //   field: 'boundNums',
      //   title: '设备名称',
      //   itemRender: {
      //     name: '$input',
      //     props: { placeholder: '请输入供应商' }
      //   },
      //   span: 5
      // },
      {
        field: 'createTime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 12
      },
      { slots: { default: 'operate_item' }, span: 6 }
    ] // 表单项
  };

  // 流程配置列表项
  public columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { title: '供应商名称', field: 'bounder', width: 150 },
    { title: '设备名称', field: 'boundNums', width: 150 },
    { title: '型号', field: 'boundTime', type: 'date', width: 150 },
    { title: '品牌', field: 'boundType', width: 150 },
    { title: '生产厂家', field: 'departmentId', width: 150 },
    { title: '数量', field: 'equipmentId', width: 150 },
    { title: '金额', field: 'note', width: 150 },
    { title: '保修', field: 'receivePerson', width: 150 },
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
}
