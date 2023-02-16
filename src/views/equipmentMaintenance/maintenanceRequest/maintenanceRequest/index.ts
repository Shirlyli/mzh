import { Component, Vue } from 'vue-property-decorator'
import { BusinessViewModule } from '@/store/modules/business'
import Treeselect from '@riophae/vue-treeselect'
import { UserModule } from '@/store/modules/user'
import { getEquipmentData } from '../../../../api/basic'
import VXETable from 'vxe-table'
@Component({
  name: 'MaintenanceProcess',
  components: {
    Treeselect,
    VXETable
  }
})
export default class extends Vue {
  mounted() {
    console.log(UserModule.userData, BusinessViewModule.departmentData, 'BusinessViewModule.employeeData', BusinessViewModule.employeeData, 'BusinessViewModule.equipmentCategoryData', BusinessViewModule.equipmentCategoryData)
  }

  public pathQuery = this.$route.query;// 路由信息
  public processType :string = this.$route.query.processType;// 获取路由信息中的流程type值

  /******************
   * 维修流程按钮
   ****************/
  public ProcessBtnLists = {
    // 申请
    maintenanceRequest: [
      { title: '保存', key: 'save', type: 'primary', method: 'save' },
      { title: '送审', key: 'send', type: 'primary', method: 'save' },
      { title: '导出', key: 'export', type: 'primary', method: 'save' },
      { title: '删除', key: 'del', type: 'danger', method: 'save' },
      { title: '操作日志', key: 'record', type: 'primary', method: 'save' }
    ],
    // 审核
    maintenanceCheck: [
      { title: '审核', key: 'save', type: 'primary', method: 'save' },
      { title: '转派工', key: 'save', type: 'primary', method: 'save' },
      { title: '导出', key: 'save', type: 'primary', method: 'save' },
      { title: '作废', key: 'save', type: 'danger', method: 'save' },
      { title: '退回', key: 'save', type: 'primary', method: 'save' },
      { title: '操作日志', key: 'save', type: 'primary', method: 'save' }
    ],
    // 派工
    maintenanceDispatch: [
      { title: '指派', key: 'save', type: 'primary', method: 'save' },
      { title: '转检修', key: 'save', type: 'primary', method: 'save' },
      { title: '作废', key: 'save', type: 'danger', method: 'save' },
      { title: '操作日志', key: 'save', type: 'primary', method: 'save' }
    ],
    // 维修中
    maintenanceIng: [
      { title: '接收', key: 'save', type: 'primary', method: 'save' },
      { title: '转发', key: 'save', type: 'primary', method: 'save' },
      { title: '转验收', key: 'save', type: 'primary', method: 'save' },
      { title: '作废', key: 'save', type: 'danger', method: 'save' },
      { title: '操作日志', key: 'save', type: 'primary', method: 'save' }
    ],
    // 验收
    maintenanceAcceptance: [
      { title: '验收', key: 'save', type: 'primary', method: 'save' },
      { title: '归档', key: 'save', type: 'primary', method: 'save' },
      { title: '操作日志', key: 'save', type: 'primary', method: 'save' }
    ],
    // 归档
    maintenanceFile: [

    ],
    // 垃圾箱
    maintenanceDustbin: [
      { title: '还原', key: 'save', type: 'primary', method: 'save' }
    ]
  };

  /********************
   * 维修流程表单渲染
   *******************/
  public processFormItemData = {
    requestInfo:
      BusinessViewModule.processRequestForm[this.$route.query.processType]
  };

  /*********************
   * 维修流程params数据
   *******************/
  public processParamsData = BusinessViewModule.processRequestParams[this.$route.query.processType]

  /***********************
   * 按钮点击事件
   *********************/
  public save() {
    console.log(this.processParamsData)
  }

  /**********************
   * 选择设备按钮点击
   * return  展示模态框
   *
   *********************/
  public chooseEquipmentDialogVisible = false
  public chooseEquipmentData = []
  public selectRow:any = {}
  public handleChooseEquipment() {
    this.chooseEquipmentDialogVisible = true
    this.getEquipmentInfoByDepartmentId()
  }

  public async getEquipmentInfoByDepartmentId() {
    const nowDepartmentId = this.processParamsData.requestInfo.departmentId
    const res = await getEquipmentData({
      page: '1',
      limit: '10',
      entity: {
        departmentId: nowDepartmentId
      }
    })
    if (res.code === 200) {
      this.chooseEquipmentData = res.data.map((item:any) => {
        return { ...item, ...item.equipmentVO }
      })
      console.log('🚀 ~ this.chooseEquipmentData', this.chooseEquipmentData)
    }
  }

  public radioChangeEvent({ row }) {
    this.selectRow = row
    console.log('🚀 ~  this.selectRow ', this.selectRow)
    console.log('单选事件')
  }

  public submitChooseEquipment() {
    console.log('🚀 ~  this.selectRow ', this.selectRow)
    const { id, barCode, name, brand } = this.selectRow.equipmentVO
    this.processParamsData.requestInfo = {
      ...this.processParamsData.requestInfo,
      equipmentName: name,
      equipmentId: id,
      equipmentCode: barCode,
      faultProblem: brand
    }
    this.chooseEquipmentDialogVisible = false
  }
}
