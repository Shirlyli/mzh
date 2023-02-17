import { Component, Vue } from 'vue-property-decorator'
import { BusinessViewModule } from '@/store/modules/business'
import Treeselect from '@riophae/vue-treeselect'
import { UserModule } from '@/store/modules/user'
import { getEquipmentData } from '../../../../api/basic'
import { handleRepairApply } from '../../../../api/equipment'
import VXETable from 'vxe-table'
import moment from 'moment'
import { TagsViewModule } from '../../../../store/modules/tags-view'

enum MethodsAndTitle {
  'save' = '保存', // 保存
  'checkSend' = '送审', // 送审
  'checking' = '审核', // 审核
  'jobSend' = '转派工', // 转派工
  'repairSend' = '转检修', // 转检修
  'recieveSending' = '接收', // 接收
  'repairFinish' = '转验收', // 转验收
  'cancel' = '作废', // 作废
  'revent' = '还原', // 还原
  'delete' = '删除', // 删除
  'back' = '回退', // 回退
  'queryByCondition' = '操作日志' // 操作日志
}
@Component({
  name: 'MaintenanceProcess',
  components: {
    Treeselect,
    VXETable
  }
})
export default class extends Vue {
  mounted() {
    console.log(
      'UserModule.userData====>',
      UserModule.userData,
      'BusinessViewModule.departmentData====>',
      BusinessViewModule.departmentData,
      'BusinessViewModule.employeeData====>',
      BusinessViewModule.employeeData,
      'BusinessViewModule.equipmentCategoryData====>',
      BusinessViewModule.equipmentCategoryData,
      'UserModule.userData====>',
      UserModule.userData,
      'BusinessViewModule.processClickProcessData====>',
      BusinessViewModule.processClickProcessData,
      'BusinessViewModule',
      BusinessViewModule,
      'this.processClickProcessData',
      this.processClickProcessData
    )

    console.log(this.processType, this.processFormItemData, 'this.applyUrl', this.applyUrl)
  }

  public pathQuery = this.$route.query; // 路由信息
  public processType: string = this.$route.query.processType; // 获取路由信息中的流程type值
  public applyUrl: any = this.$route.query.applyUrl

  /******************
   * 维修流程按钮
   ****************/
  public ProcessBtnLists = {
    // 申请
    maintenanceRequest: [
      {
        title: '保存',
        key: 'save',
        type: 'primary',
        method: 'save',
        disabled: false
      },
      {
        title: '送审',
        key: 'checkSend',
        type: 'primary',
        method: 'checkSend',
        disabled: true
      },
      { title: '导出', key: 'export', type: 'primary', method: 'save' }, // ??
      { title: '删除', key: 'delete', type: 'danger', method: 'delete', disabled: true },
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ],
    // 审核
    maintenanceCheck: [
      { title: '审核', key: 'checking', type: 'primary', method: 'checking' },
      { title: '转派工', key: 'jobSend', type: 'primary', method: 'jobSend', disabled: true },
      { title: '导出', key: 'save', type: 'primary', method: 'save' }, // ??
      { title: '作废', key: 'cancel', type: 'danger', method: 'cancel' },
      { title: '退回', key: 'back', type: 'primary', method: 'back' },
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ],
    // 派工
    maintenanceDispatch: [
      { title: '指派', key: 'save', type: 'primary', method: 'save' }, // ??
      {
        title: '转检修',
        key: 'repairSend',
        type: 'primary',
        method: 'repairSend'
      },
      { title: '作废', key: 'cancel', type: 'danger', method: 'cancel' },
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ],
    // 维修中
    maintenanceIng: [
      {
        title: '接收',
        key: 'recieveSending',
        type: 'primary',
        method: 'recieveSending'
      },
      { title: '转发', key: 'save', type: 'primary', method: 'save' }, // ??
      {
        title: '转验收',
        key: 'repairFinish',
        type: 'primary',
        method: 'repairFinish'
      },
      { title: '作废', key: 'cancel', type: 'danger', method: 'cancel' },
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ],
    // 验收
    maintenanceAcceptance: [
      { title: '验收', key: 'save', type: 'primary', method: 'save' }, // ??
      { title: '归档', key: 'save', type: 'primary', method: 'save' }, // ??
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ],
    // 归档
    maintenanceFile: [],
    // 垃圾箱
    maintenanceDustbin: [
      { title: '还原', key: 'revent', type: 'primary', method: 'revent' }
    ]
  };

  /********************
   * 维修流程表单渲染
   *******************/
  public processFormItemData = {
    maintenanceRequest:
      BusinessViewModule.processRequestForm[this.$route.query.processType]

  };

  /*********************
   * 维修流程params数据
   *******************/
  public processParamsData =
    BusinessViewModule.processRequestParams[this.$route.query.processType];

  /***********************
   * 单个流程信息数据
   *********************/
  public processClickProcessData =
  BusinessViewModule.processClickProcessData[this.$route.query.processType];

  /**********************
   * 选择设备按钮点击
   * return  展示模态框
   *
   *********************/
  public chooseEquipmentDialogVisible = false;
  public chooseEquipmentData = [];
  public selectRow: any = {};
  public handleChooseEquipment() {
    this.chooseEquipmentDialogVisible = true
    this.getEquipmentInfoByDepartmentId()
  }

  public async getEquipmentInfoByDepartmentId() {
    const nowDepartmentId = this.processParamsData[this.processType].departmentId
    const res = await getEquipmentData({
      page: '1',
      limit: '10',
      entity: {
        departmentId: nowDepartmentId
      }
    })
    if (res.code === 200) {
      this.chooseEquipmentData = res.data.map((item: any) => {
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

  // 提交设备选择
  public submitChooseEquipment() {
    console.log('🚀 ~  this.selectRow ', this.selectRow)
    const { id, barCode, name, brand } = this.selectRow.equipmentVO
    this.processParamsData[this.processType] = {
      ...this.processParamsData[this.processType],
      equipmentName: name,
      equipmentId: id,
      equipmentCode: barCode,
      faultProblem: brand
    }
    this.chooseEquipmentDialogVisible = false
  }

  /************************
   *
   * 按钮提交事件
   ***********************/
  public saveProcessData ={ id: '' } // 维修流程保存数据

  public handleSubmit(type: string) {
    switch (type) {
      case 'save':
        this.handleSave(type)
        break
      case 'checkSend':
        this.handleCheckSend(type)
        break
      case 'checking':
        this.handleChecking(type)
        break
      case 'jobSend':
        this.handleJobSend(type)
        break
      default:
        console.log('请传入正确的type值')
    }
  }

  // 保存
  public async handleSave(type:string) {
    console.log('🚀 ~ type', type)
    const { applyTime } = this.processParamsData[this.processType]
    const params = {
      ...this.processParamsData[this.processType],
      applyTime: moment(applyTime).format('YYYY-MM-DD')
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      this.saveProcessData = res.data
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach((item) => {
          if (item.key === 'checkSend' || item.key === 'delete') {
            item.disabled = false
          } else if (item.key === 'save') {
            item.disabled = true
          }
        })

        // this.processFormItemData.maintenanceRequest.forEach((item:any)=>{
        //   item.disabled = true
        // })
      })
    }
  }

  // 送审
  public async handleCheckSend(type:string) {
    const params = {
      id: this.saveProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      this.closeSelectedTag({ path: '/maintenanceRequest/index/WXSQ' })
    }
  }

  // 审核
  public async handleChecking(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      this.saveProcessData = res.data
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach((item) => {
          if (item.key === 'jobSend') {
            item.disabled = false
          } else if (item.key === 'checking') {
            item.disabled = true
          }
        })
      })
    }
  }

  // 转派工
  public async handleJobSend(type:string) {
    const params = {
      id: this.saveProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      this.closeSelectedTag({ path: `/maintenanceRequest/index/${this.applyUrl}` })
    }
  }

  // public async handleSubmitType(type: string, params: any) {
  //   const res = await handleRepairApply(type, params)
  //   if (res.code === 200) {
  //     this.$message.success(`${MethodsAndTitle[type]}成功`)
  //     return res.data
  //   } else {
  //     console.log('操作失败')
  //   }
  // }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  private closeSelectedTag(view: any) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }
}
