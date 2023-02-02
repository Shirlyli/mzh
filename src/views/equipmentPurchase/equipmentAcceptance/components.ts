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
import { Form, Message } from 'element-ui'
import {
  queryEquipmentCategoryInfo,
  updateEquipmentInfoData
} from '@/api/equipment'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { queryByConditionSupplier, uploadFile } from '@/api/basic'
// import { BusinessViewModule } from '@/store/modules/business'
@Component({
  name: 'equipmentAddOrUpdate'
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
  public requestParams: any = JSON.parse(
    sessionStorage.getItem('RequestParams') ?? '0'
  );

  public watchRequestForm = JSON.parse(
    sessionStorage.getItem('RequestForm') ?? '0'
  ); // 流程表单配置数据columns

  public equipmentCategoryData = JSON.parse(
    sessionStorage.getItem('EquipmentCategoryData') ?? '0'
  );

  public processData = JSON.parse(
    sessionStorage.getItem('ClickProcessData') ?? '0'
  ); // 流程数据

  public activeName = 'equipmentVO'; // 当前tab页
  @Watch('activeName') // 监听tab页
  public onActiveNameChange(value: string) {
    console.log('🚀 ~ onActiveNameChange value', value)
  }

  async created() {
    console.log(this.processData, this.equipmentCategoryData, this.watchRequestForm, this.requestParams)
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
    const resData:any = await queryEquipmentCategoryInfo({ page: '1', limit: '10', entity: { id: '' } })
    if (resData.code === 200) {
      this.allFormList.equipmentVO.forEach((item: any) => {
        if (item.slot === 'equipmentCategory') {
          item.options = resData.data?.[0]?.children.map((equip: any) => {
            return {
              ...equip,
              label: equip.id,
              value: equip.title
            }
          })
        }
      })
    }
  }

  // 获取厂商
  private async queryByConditionSupplier() {
    const resData:any = await queryByConditionSupplier({ page: '1', limit: '10', entity: { id: '' } })
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

  // 验收设备
  public createData() {
    (this.$refs.equipmentCategoryData as Form).validate(async valid => {
      if (valid) {
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
        } = this.equipmentCategoryData
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
            ? [equipmentStores]
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
          this.closeSelectedTag({ path: '/equipmentAddOrUpdate' })
        }
        Message.success('创建成功')
      }
    })
  }

  public handleCloseDialog() {
    this.closeSelectedTag({ path: '/equipmentAddOrUpdate/index' })
  }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  private closeSelectedTag(view: ITagView) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch(err => {
        console.warn(err)
      })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch(err => {
            console.warn(err)
          })
      } else {
        this.$router.push((UserModule.menu as any)[0]?.path).catch(err => {
          console.warn(err)
        })
      }
    }
  }

  /*******************************
   * 附件上传
   ******************************/
  public fileList :any= []
  public onFileChange(file:any) {
    console.log('🚀 ~ file onFileChange', file)
  }

  public async onFileProgress(file:any) {
    console.log('🚀 ~ file onFileChange', file)
    const formData = new FormData()
    formData.append('formFile', file.raw)
    formData.append('type', 'supplier')
    const res = await uploadFile(formData)
    console.log('🚀 ~ res', res)
  }

  public onFileSuccess(file:any) {
    console.log('🚀 ~ file onFileSuccess', file)
    this.fileList = [...this.fileList, file]
  }

  public onFileRemove(file:any) {
    console.log('🚀 ~ file', file)
  }

  public handleExceed(file:any) {
    console.log('🚀 ~ file', file)
  }
}
