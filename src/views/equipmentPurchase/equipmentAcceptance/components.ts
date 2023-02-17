import { Component, Vue, Watch } from 'vue-property-decorator'
import {
  equipmentPurchases,
  equipmentDepreciations,
  equipmentMaintain,
  equipmentResources,
  equipmentStocks,
  equipmentStores,
  equipmentInspection,
  equipmentVO
} from './formlist'
import { Message } from 'element-ui'
import { queryEquipmentCategoryInfo } from '@/api/equipment'
import { TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import {
  queryByConditionSupplier,
  savePurchaseCheck,
  uploadFile,
  saveProcessApply
  , getProcessNodeInfoByProcessCodeAndBh
  , getUserListProcessCode
} from '../../../api/basic'
import Treeselect from '@riophae/vue-treeselect'
import { handleDepartData } from '../../../shared/utils'
import { BusinessViewModule } from '../../../store/modules/business'

import { APPLY_URL } from '../../../shared/options'

// import { BusinessViewModule } from '@/store/modules/business'
@Component({
  name: 'equipmentAcceptOrWarehousing',
  components: {
    Treeselect
  }
})
export default class extends Vue {
  public dialogStatus = this.$route.query.dialogStatus;

  public tabMapOptions = [
    { label: '设备基础信息', key: 'equipmentVO' },
    { label: '设备采购信息', key: 'equipmentPurchases' }
    // { label: '设备资料', key: 'equipmentResources' },
    // { label: '设备保养', key: 'equipmentMaintain' },
    // { label: '设备巡检', key: 'equipmentInspection' },
    // { label: '仓库记录', key: 'equipmentStocks' },
    // { label: '出入库记录', key: 'equipmentStores' },
    // { label: '设备折旧', key: 'equipmentDepreciations' }
  ]; // tab栏

  public allFormList: any = {}; // 表单项
  public rules = {}; // 表单校验
  /**********************
   * 保存接口params
   *********************/
  // TODO:换成从store获取
  public requestParams: any =
    BusinessViewModule.processRequestParams.acceptence;

  public watchRequestForm = BusinessViewModule.processRequestForm.acceptence; // 流程表单配置数据columns
  public equipmentCategoryData =
    BusinessViewModule.processEquipmentCategoryData.acceptence;

  public processData = BusinessViewModule.processClickProcessData.acceptence; // 流程数据

  public activeName = 'equipmentVO'; // 当前tab页
  @Watch('activeName') // 监听tab页
  public onActiveNameChange(value: string) {
    console.log('🚀 ~ onActiveNameChange value', value)
  }

  async created() {
    console.log(
      'this.processData====》',
      this.processData,
      'this.equipmentCategoryData====》',
      this.equipmentCategoryData,
      'watchRequestForm====》',
      this.watchRequestForm,
      'requestParams====》',
      this.requestParams
    )
    this.queryEquipmentCategoryInfo()
    this.queryByConditionSupplier()
    this.allFormList = {
      equipmentVO: equipmentVO,
      equipmentPurchases: equipmentPurchases,
      equipmentResources: equipmentResources,
      equipmentMaintain: equipmentMaintain,
      equipmentInspection: equipmentInspection,
      equipmentStocks: equipmentStocks,
      equipmentStores: equipmentStores,
      equipmentDepreciations: equipmentDepreciations
    }
  }

  public normalizer(node) {
    return {
      id: node.id,
      label: node.label,
      children: node.children
    }
  }
  /**************
   * 监听科室变化
   *************/
  // @Watch('equipmentCategoryData.equipmentVO.departmentId', { immediate: true })
  // @Watch('equipmentCategoryData.equipmentVO.applyDept', { immediate: true })
  // public async onChangeRequestParams(formValue: any) {
  //   console.log('🚀 ~ 监听科室变化', formValue)
  //   if (formValue) {
  //     const res: any = await getEquipmentInfoByDepartmentId({
  //       page: '1',
  //       limit: '10',
  //       entity: {
  //         departmentId: formValue
  //       }
  //     })
  //     if (res.code === 200) {
  //       this.allFormList.equipmentVO.forEach((item: any) => {
  //         if (item.slot === 'equipment') {
  //           item.options = res.data.map((equip: any) => {
  //             return {
  //               equipmentVO: equip.equipmentVO,
  //               label: equip.equipmentVO.name,
  //               value: equip.equipmentVO.id
  //             }
  //           })
  //         }
  //       })
  //       this.$forceUpdate()
  //     }
  //   }
  // }

  // 获取设备类别

  private async queryEquipmentCategoryInfo() {
    const resData: any = await queryEquipmentCategoryInfo({
      page: '1',
      limit: '10',
      entity: { id: '' }
    })
    if (resData.code === 200) {
      this.allFormList.equipmentVO.forEach((item: any) => {
        if (item.slot === 'equipmentCategory') {
          item.options = handleDepartData(
            resData.data?.[0]?.children.map((equip: any) => {
              return {
                ...equip,
                label: equip.id,
                value: equip.title
              }
            })
          )
          console.log('🚀 ~ item.options', item.options)
        }
      })
    }
  }

  /****************
   *  获取厂商
   **************/
  private async queryByConditionSupplier() {
    const resData: any = await queryByConditionSupplier({
      page: '1',
      limit: '10',
      entity: { id: '' }
    })
    if (resData.code === 200) {
      this.allFormList.equipmentVO.forEach((item: any) => {
        if (item.slot === 'manufactorId') {
          item.options = resData.data.map((equip: any) => {
            return {
              ...equip,
              label: equip.name,
              value: equip.id
            }
          })
        }
      })
    }
  }

  /***************
   * 验收设备
   **************/
  public createData() {
    // this.saveEquipment()
    this.handleProcessData()
  }

  /****************
   * 提交流程信息
   ***************/
  private async handleProcessData() {
    console.log(this.processData)
    const {
      billMain,
      billEquipmentList,
      id,
      status,
      billApproveList
    } = this.processData
    const currentCoData = await getProcessNodeInfoByProcessCodeAndBh({ processCode: 'pro_kssq', nodeNameCode: billApproveList[0]?.nextNodeCode })
    const nextCodeData = await getProcessNodeInfoByProcessCodeAndBh({ processCode: 'pro_kssq', nodeSort: currentCoData.data.nodeSort + 1 })
    console.log('🚀 ~ nextCodeData', nextCodeData)
    const executorData: any = await getUserListProcessCode({
      processCode: 'pro_kssq',
      nodeSort: currentCoData.data.nodeSort + 1
    })
    console.log('🚀 ~ executorData', executorData)
    const sendParams = {
      id,
      status: '2',
      billMain,
      billEquipmentList,
      billApproveList: [
        {
          ...billApproveList[0],
          currentNodeCode: currentCoData.data?.nodeNameCode,
          currentNodeName: currentCoData.data?.nodeName,
          nextNodeCode: nextCodeData.data?.nodeNameCode,
          nextNodeExecutor: executorData.data?.[0]?.user_id,
          nextNodeExecutorName: executorData.data?.[0]?.user_name,
          nextNodeName: nextCodeData.data?.nodeName,
          nextNodeState: '已验收'
        }
      ]
    }
    const res: any = await saveProcessApply(
      (APPLY_URL as any).KSSQ,
      sendParams
    )
  }

  /****************************
   * 保存设备信息  并 保存验收信息
   ***************************/
  private saveEquipment() {
    (this.$refs.equipmentCategoryData as any).validate(async(valid: any) => {
      if (valid) {
        const {
          equipmentPurchases,
          equipmentVO,
          id,
          state
        } = this.equipmentCategoryData
        const paramsConfig: any = {
          // equipmentDepreciations: Object.values(equipmentDepreciations).length
          //   ? [equipmentDepreciations]
          //   : [],
          // equipmentInspection: Object.values(equipmentInspection).length
          //   ? [equipmentInspection]
          //   : [],
          // equipmentMaintain: Object.values(equipmentMaintain).length
          //   ? [equipmentMaintain]
          //   : [],
          equipmentPurchases: Object.values(equipmentPurchases).length
            ? [equipmentPurchases]
            : [],
          // equipmentResources: Object.values(equipmentResources).length
          //   ? [equipmentResources]
          //   : [],
          // equipmentStocks: Object.values(equipmentStocks).length
          //   ? [equipmentStocks]
          //   : [],
          // equipmentStores: Object.values(equipmentStores).length
          //   ? [equipmentStores]
          //   : [],
          equipmentVO: {
            ...equipmentVO,
            operationStatus: 'CHECK',
            num: equipmentVO.num
          },
          id,
          state
        }
        const params: any = []
        params.push(paramsConfig)
        const purchaseParams = {
          checkState: '已验收',
          bussinessId: this.requestParams.id,
          equId: this.equipmentCategoryData.equipmentVO.name,
          equName: this.equipmentCategoryData.equipmentVO.name
        }
        // const res: any = await updateEquipmentInfoData(params)
        const purchaseRes = await savePurchaseCheck(params)
        if (purchaseRes.code === 200) {
          this.closeSelectedTag({
            path: '/equipmentAcceptOrWarehousing/index'
          })
        }
        Message.success('验收成功')
      }
    })
  }

  public handleCloseDialog() {
    this.closeSelectedTag({ path: '/equipmentAcceptOrWarehousing/index' })
  }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  private closeSelectedTag(view: any) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  private toLastView(visitedViews: any[], view: any) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch((err: any) => {
        console.warn(err)
      })
    } else {
      if (view.name === 'Dashboard') {
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch((err: any) => {
            console.warn(err)
          })
      } else {
        this.$router
          .push((UserModule.menu as any)[0]?.path)
          .catch((err: any) => {
            console.warn(err)
          })
      }
    }
  }

  /*******************************
   * 附件上传
   ******************************/
  public fileList: any = [];
  public onFileChange(file: any) {
    console.log('🚀 ~ file onFileChange', file)
  }

  public async onFileProgress(file: any) {
    console.log('🚀 ~ file onFileChange', file)
    const formData = new FormData()
    formData.append('formFile', file.raw)
    formData.append('type', 'supplier')
    const res = await uploadFile(formData)
    console.log('🚀 ~ res', res)
  }

  public onFileSuccess(file: any) {
    console.log('🚀 ~ file onFileSuccess', file)
    this.fileList = [...this.fileList, file]
  }

  public onFileRemove(file: any) {
    console.log('🚀 ~ file', file)
  }

  public handleExceed(file: any) {
    console.log('🚀 ~ file', file)
  }
}
