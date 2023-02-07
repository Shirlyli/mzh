import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { BusinessViewModule } from '@/store/modules/business'
import {
  BasicFormList,
  EquipmentDetailFormList,
  ApprovalFormlist
} from './formColumns'
import { UserModule } from '@/store/modules/user'
import moment from 'moment'
import { ALL_OPTIONS } from '@/shared/options'

@Component({
  name: 'InlineEditTable',
  components: {
    VexTable

  }
})
export default class extends Vue {
  public routePath = this.$route.path;
  private isDYS = this.routePath.indexOf('DYS') > -1; // 待验收
  private isYYS = this.routePath.indexOf('YYS') > -1; // 已验收

  public editColumns = this.isDYS ? ['search'] : this.isYYS;

  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()
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
      createTime: ''
    },
    items: [
      {
        field: 'approveStatus',
        title: '审批状态',
        itemRender: {
          name: '$select',
          props: { placeholder: '请输入审批状态' },
          options: ALL_OPTIONS.APPROVAL_STATUS
        },
        span: 5
      },
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
    { field: 'id', title: '验收单号', width: 150 },
    { field: 'equName', title: '设备名称' },
    { field: 'checkPerson', title: '验收申请人' },
    {
      field: 'checkDate',
      title: '验收日期',
      formatter: (data: any) =>
        moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    { field: 'checkState', title: ' 验收状态 ' }
    // {
    //   width: 100,
    //   title: '操作',
    //   slots: { default: 'operateHasSearch' },
    //   showOverflow: true
    // }
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

  //  点击查看按钮事件
  public handleSearch(row: any) {
    console.log('🚀 ~ row', row)
  }
}
