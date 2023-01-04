import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import {
  equipmentPurchases,
  equipmentDepreciations,
  equipmentMaintain,
  equipmentResources,
  equipmentStocks,
  equipmentStores,
  equipmentInspection,
  equipmentVO
} from '../formlist/index'
// import { EquipmentInfoTypes } from '../formlist/interface.type'
import { Form, Message } from 'element-ui'
import { updateEquipmentInfoData } from '@/api/equipment'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
// import { BusinessViewModule } from '@/store/modules/business'
@Component({
  name: 'EquipmentFormDialog'
})
export default class extends Vue {
  public dialogStatus = this.$route.query.dialogStatus;

  public tabMapOptions = [
    { label: '设备基础信息', key: 'equipmentVO' },
    { label: '设备采购信息', key: 'equipmentPurchases' },
    { label: '设备资料', key: 'equipmentResources' },
    { label: '设备保养', key: 'equipmentMaintain' },
    { label: '设备巡检', key: 'equipmentInspection' },
    { label: '仓库记录', key: 'equipmentStocks' },
    { label: '出入库记录', key: 'equipmentStores' },
    { label: '设备折旧', key: 'equipmentDepreciations' }
  ]; // tab栏

  public allFormList: any = {}; // 表单项
  public rules = {}; // 表单校验

  public equipmentCategoryData = JSON.parse(
    sessionStorage.getItem('EquipmentCategoryData') ?? '0'
  );

  public activeName = 'equipmentVO'; // 当前tab页
  @Watch('activeName') // 监听tab页
  public onActiveNameChange(value: string) {
    console.log('🚀 ~ value', value)
  }

  async created() {
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

  // 新增设备
  public createData() {
    // console.log(this.allFormList);
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
        const res: any = await updateEquipmentInfoData(params)
        if (res.code === 200) {
          this.closeSelectedTag({ path: '/equipmentAddOrUpdate/index' })
        }
        Message.success('创建成功')
      }
    })
  }

  // 修改科室
  public updateData() {
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
        const res: any = await updateEquipmentInfoData(params)
        if (res.code === 200) {
          this.closeSelectedTag({ path: '/equipmentAddOrUpdate/index' })
        }
        Message.success('修改成功')
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
    console.log('🚀 ~ view', view)
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
}
