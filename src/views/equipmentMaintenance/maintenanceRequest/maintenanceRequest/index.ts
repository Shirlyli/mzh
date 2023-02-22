import { Component, Vue } from 'vue-property-decorator'
import { BusinessViewModule } from '@/store/modules/business'
import Treeselect from '@riophae/vue-treeselect'
import { UserModule } from '@/store/modules/user'
import { getEquipmentData } from '../../../../api/basic'
import {
  handlejobSending,
  handleRepairApply,
  queryJxgcsList,
  queryByCondition,
  queryLogByCondition
} from '../../../../api/equipment'
import VXETable from 'vxe-table'
import moment from 'moment'
import { TagsViewModule } from '../../../../store/modules/tags-view'
import {
  checkPersonalInfoFormList,
  maintenanceAcceptPersonalInfoFormList,
  maintenancePersonalInfoFormList,
  maintenanceRecordsFormList
} from '../formColumns'
import { handleDepartData } from '../../../../shared/utils'

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
  'accepted' = '验收', // 验收
  'finished' = '归档', // 归档
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
  async mounted() {
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
      'BusinessViewModule.equipmentData',
      BusinessViewModule.equipmentData,
      'this.processClickProcessData',
      this.processClickProcessData
    )

    console.log(
      this.processType,
      this.processFormItemData,
      'this.applyUrl',
      this.applyUrl,
      'this.pathQuery',
      this.pathUrl,
      'this.$route',
      this.$route
    )

    if (this.processType === 'maintenanceDispatch' || this.processType === 'maintenanceIng' || this.processType === 'maintenanceAcceptance' || this.processType === 'maintenanceFile') {
      const conditionres = await this.queryDataByCondition({
        page: '1',
        limit: '10',
        entity: {
          id: this.processClickProcessData.id
        }
      })
      console.log('🚀 ~ conditionres', conditionres)
      this.maintenanceRecordData = {
        ...conditionres[0],
        acceptTime: conditionres[0].acceptTime ? moment(conditionres[0].acceptTime).format('YYYY-MM-DD') : '-',
        checkTime: conditionres[0].checkTime ? moment(conditionres[0].checkTime).format('YYYY-MM-DD') : '-',
        repairAcceptTime: conditionres[0].repairAcceptTime ? moment(conditionres[0].repairAcceptTime).format('YYYY-MM-DD') : '-'
      }
    }
  }

  public moment = moment
  public pathQuery = this.$route.query; // 路由信息
  public processType: string = this.$route.query.processType; // 获取路由信息中的流程type值
  public applyUrl: any = this.$route.query.applyUrl;
  private pathUrl = this.$route.path.substr(-4, 4)

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
      {
        title: '删除',
        key: 'delete',
        type: 'danger',
        method: 'delete',
        disabled: true
      },
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
      {
        title: '转派工',
        key: 'jobSend',
        type: 'primary',
        method: 'jobSend',
        disabled: true
      },
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
      { title: '派工', key: 'send', type: 'primary', method: 'send' }, // ??
      {
        title: '转检修',
        key: 'repairSend',
        type: 'primary',
        method: 'repairSend',
        disabled: true
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
        method: 'repairFinish',
        disabled: true
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
      { title: '验收', key: 'accepted', type: 'primary', method: 'accepted' },
      { title: '归档', key: 'finished', type: 'primary', method: 'finished', disabled: true },
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
    ],
    // 综合查询
    maintenanceSearch: [
      {
        title: '操作日志',
        key: 'queryByCondition',
        type: 'primary',
        method: 'queryByCondition'
      }
    ]
  };

  /********************
   * 维修流程表单渲染
   *******************/
  public processFormItemData = {
    maintenanceRequest:
      BusinessViewModule.processRequestForm[this.$route.query.processType],
    checkPersonalInfoFormList: checkPersonalInfoFormList,
    maintenancePersonalInfoFormList: maintenancePersonalInfoFormList,
    maintenanceAcceptPersonalInfoFormList: maintenanceAcceptPersonalInfoFormList
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

  /************************
   *维修清单
   **********************/
  public maintenanceRecordsFormList:any = maintenanceRecordsFormList;
  public maintenanceParamsData = [
    {
      name: null,
      unit: '',
      numbers: '',
      hours: '',
      price: ''
    }
  ]

  public maintenanceRecordData :any= {
    id: '',
    records: []
  }

  /*************************
   * 获取节点信息
   ************************/
  private async queryDataByCondition(params) {
    const maintenanceData = await queryByCondition(params)
    console.log('🚀 ~ maintenanceData', maintenanceData)
    return maintenanceData.data
  }

  /**********************
   * 选择设备按钮点击
   * return  展示模态框
   *
   *********************/
  public chooseEquipmentDialogVisible = false; // 选择设备弹框
  public chooseEquipmentData = [];
  public selectRow: any = {};
  public handleChooseEquipment() {
    this.chooseEquipmentDialogVisible = true
    this.getEquipmentInfoByDepartmentId()
  }

  public async getEquipmentInfoByDepartmentId() {
    const nowDepartmentId = this.processParamsData[this.processType]
      .departmentId
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
  public saveProcessData = { id: '' }; // 维修流程保存数据

  public handleSubmit(type: string) {
    switch (type) {
      case 'save':
        this.handleSave(type)
        break
      case 'checkSend':
        this.handleCheckSend(type)
        break
      case 'delete' :
        this.handleDelete(type)
        break
      case 'checking':
        this.handleChecking(type)
        break
      case 'jobSend':
        this.handleJobSend(type)
        break
      case 'send':
        this.handleSend(type)
        break
      case 'repairSend':
        this.handleRepairSend(type)
        break
      case 'recieveSending':
        this.handlerRecieveSending(type)
        break
      case 'repairFinish':
        this.handlerRepairFinish(type)
        break
      case 'accepted':
        this.handlerAccepted(type)
        break
      case 'finished':
        this.handlerFinished(type)
        break
      case 'revent':
        this.handleRevent(type)
        break
      case 'cancel':
        this.handlerCancel(type)
        break
      case 'back':
        this.handleBack(type)
        break
      case 'queryByCondition':
        this.handleQueryByCondition(type)
        break
      default:
        console.log('请传入正确的type值')
    }
  }

  // 保存
  public async handleSave(type: string) {
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
        this.ProcessBtnLists[this.processType].forEach(item => {
          if (item.key === 'checkSend' || item.key === 'delete') {
            item.disabled = false
          } else if (item.key === 'save') {
            item.disabled = true
          }
        })
      })
    }
  }

  // 送审
  public async handleCheckSend(type: string) {
    const params = {
      id: this.saveProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({ path: `/maintenanceRequest/index/${this.pathUrl}` })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 删除
  public async handleDelete(type:string) {
    const params = {
      id: this.saveProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({ path: `/maintenanceRequest/index/${this.pathUrl}` })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 审核
  public checkUserData = null;
  public async handleChecking(type: string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      const conditionres = await this.queryDataByCondition({
        page: '1',
        limit: '10',
        entity: {
          id: res.data.id
        }
      })
      this.maintenanceRecordData = {
        ...conditionres[0],
        acceptTime: conditionres[0].acceptTime ? moment(conditionres[0].acceptTime).format('YYYY-MM-DD') : '-',
        checkTime: conditionres[0].checkTime ? moment(conditionres[0].checkTime).format('YYYY-MM-DD') : '-',
        repairAcceptTime: conditionres[0].repairAcceptTime ? moment(conditionres[0].repairAcceptTime).format('YYYY-MM-DD') : '-'
      }
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach(item => {
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
  public async handleJobSend(type: string) {
    const params = {
      id: this.maintenanceRecordData?.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({
        path: `/maintenanceRequest/index/${this.pathUrl}`
      })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 派工
  public maintenanceCheckData = { userId: '', eName: '' };
  public chooseMaintenanceDialogVisible = false;
  public chooseMaintenanceData = [];
  public async handleSend(type: string) {
    this.chooseMaintenanceDialogVisible = true
    const res = await queryJxgcsList({
      page: '1',
      limit: '10',
      entity: {}
    })
    if (res.code === 200) {
      this.chooseMaintenanceData = res.data
    }
  }

  // 指派
  public async submitJobSending(record) {
    console.log('🚀 ~ record', record)
    const res = await handlejobSending({
      id: record.id
    })
    if (res.code === 200) {
      this.$message.success('指派成功')
      this.maintenanceCheckData = record
      this.chooseMaintenanceDialogVisible = false
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach(item => {
          if (item.key === 'repairSend') {
            item.disabled = false
          } else if (item.key === 'send') {
            item.disabled = true
          }
        })
      })
    }
  }

  // 转检修
  public async handleRepairSend(type: string) {
    console.log(' this.maintenanceCheckData ', this.maintenanceCheckData)
    const params = {
      id: this.processClickProcessData.id,
      repairUserName: this.maintenanceCheckData.eName,
      repairUserId: this.maintenanceCheckData.userId
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({
        path: `/maintenanceRequest/index/${this.pathUrl}`
      })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 接收
  private async handlerRecieveSending(type: string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      const conditionres = await this.queryDataByCondition({
        page: '1',
        limit: '10',
        entity: {
          id: res.data.id
        }
      })
      this.maintenanceRecordData = {
        ...conditionres[0],
        acceptTime: conditionres[0].acceptTime ? moment(conditionres[0].acceptTime).format('YYYY-MM-DD') : '-',
        checkTime: conditionres[0].checkTime ? moment(conditionres[0].checkTime).format('YYYY-MM-DD') : '-',
        repairAcceptTime: conditionres[0].repairAcceptTime ? moment(conditionres[0].repairAcceptTime).format('YYYY-MM-DD') : '-'
      }
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach(item => {
          if (item.key === 'repairFinish') {
            item.disabled = false
          } else if (item.key === 'recieveSending') {
            item.disabled = true
          }
        })
      })
    }
  }

  // 转验收
  private async handlerRepairFinish(type: string) {
    console.log(this.maintenanceParamsData);
    (this.$refs as any).recordRef.validate(async(valid: any) => {
      if (valid) {
        console.log(this.maintenanceParamsData)
        const params = {
          id: this.processClickProcessData.id,
          records: this.maintenanceParamsData
        }
        const res = await handleRepairApply(type, params)
        if (res.code === 200) {
          this.closeSelectedTag({
            path: `/maintenanceRequest/index/${this.pathUrl}`
          })
          this.$message.success(`${MethodsAndTitle[type]}成功`)
        }
      }
    })
  }

  // 验收
  private async handlerAccepted(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
      const conditionres = await this.queryDataByCondition({
        page: '1',
        limit: '10',
        entity: {
          id: res.data.id
        }
      })
      this.maintenanceRecordData = {
        ...conditionres[0],
        acceptTime: conditionres[0].acceptTime ? moment(conditionres[0].acceptTime).format('YYYY-MM-DD') : '-',
        checkTime: conditionres[0].checkTime ? moment(conditionres[0].checkTime).format('YYYY-MM-DD') : '-',
        repairAcceptTime: conditionres[0].repairAcceptTime ? moment(conditionres[0].repairAcceptTime).format('YYYY-MM-DD') : '-'
      }
      this.$nextTick(() => {
        this.ProcessBtnLists[this.processType].forEach(item => {
          if (item.key === 'finished') {
            item.disabled = false
          } else if (item.key === 'accepted') {
            item.disabled = true
          }
        })
      })
    }
  }

  // 归档
  private async handlerFinished(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({
        path: `/maintenanceRequest/index/${this.pathUrl}`
      })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 还原
  private async handleRevent(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({
        path: `/maintenanceRequest/index/${this.pathUrl}`
      })
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 回退
  private async handleBack(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 作废
  private async handlerCancel(type:string) {
    const params = {
      id: this.processClickProcessData.id
    }
    const res = await handleRepairApply(type, params)
    if (res.code === 200) {
      this.closeSelectedTag({
        path: `/maintenanceRequest/index/${this.pathUrl}`
      })
      console.log('🚀 ~ this.pathQuery', this.pathQuery)
      this.$message.success(`${MethodsAndTitle[type]}成功`)
    }
  }

  // 操作日志
  public showRecordVisible = false
  public logData = []
  private async handleQueryByCondition(type:string) {
    this.showRecordVisible = true
    const params = {
      page: '1',
      limit: '10',
      entity: {
        repairId: this.processClickProcessData.id
      }
    }
    const res = await queryLogByCondition(params)
    console.log('🚀 ~ 操作日志', res)
    this.logData = res.data
  }

  /*******************************
   * 新增明细
   *****************************/
  private addFormList = [
    {
      field: 'name',
      title: '设备名称',
      span: 12,
      type: 'treeSelect',
      data: handleDepartData(BusinessViewModule.departmentData),
      required: true
    },
    {
      field: 'unit',
      title: '设备型号',
      span: 12,
      type: 'input',
      required: true
    },
    {
      field: 'numbers',
      title: '数量',
      span: 12,
      type: 'input',
      required: true

    },
    {
      field: 'hours',
      title: '时常',
      span: 12,
      type: 'input'

    },
    {
      field: 'price',
      title: '金额',
      span: 12,
      type: 'input',
      required: true
    }
  ]

  public addNewRecord() {
    const attrLength = this.maintenanceRecordsFormList.length
    if (attrLength !== 0) {
      if (
        this.maintenanceRecordsFormList[attrLength - 1].attrKey ===
          '' ||
        this.maintenanceRecordsFormList[attrLength - 1].attrValue === ''
      ) {
        this.$message.warning('请填写上一属性完整后再新增')
      } else {
        this.pushData()
      }
    } else {
      this.pushData()
    }
  }

  public pushData() {
    this.$nextTick(() => {
      this.maintenanceRecordsFormList.push(this.addFormList)
      this.maintenanceParamsData.push({
        name: null,
        unit: '',
        numbers: '',
        hours: '',
        price: ''
      })
    })
    this.$forceUpdate() // 强制刷新，解决页面不会重新渲染的问题
  }

  /***************************************
   * 移除当前设备行
   * @param label
   * @param index
   **************************************/
  public removeKey(label: any, index: number) {
    this.$confirm('此操作将永该, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.maintenanceRecordsFormList.splice(index, 1)
        const loading = this.$loading({
          lock: true,
          text: '正在删除,请稍等',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)'
        })
        // 下面写向后台发送删除属性请求，请求后重新向后台查询form数据
        // 此处不写请求，用setTimeout模拟效果
        setTimeout(() => {
          loading.close()
          this.$message.success('删除成功')
        }, 2000)
      })
      .catch(() => {
        // this.$message({
        //   type: "info",
        //   message: "已取消删除"
        // });
      })
  }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  private closeSelectedTag(view: any) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  public toLastView(visitedViews: any[], view: any) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch((err:any) => {
        console.warn(err)
      })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch((err:any) => {
            console.warn(err)
          })
      } else {
        this.$router.push((UserModule.menu as any)[0]?.path).catch((err:any) => {
          console.warn(err)
        })
      }
    }
  }
}
