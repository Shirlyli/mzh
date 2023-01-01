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
// import { BusinessViewModule } from '@/store/modules/business'
@Component({
  name: 'EquipmentFormDialog'
})
export default class extends Vue {
  private showDialogVisible = false;
  @Prop({ default: 'create' }) dialogStatus!: string;
  @Prop({ default: false }) dialogVisible!: boolean;
  @Watch('dialogVisible')
  private OnchangeDialogVisible(value: any) {
    this.showDialogVisible = value
  }

  private tabMapOptions = [
    { label: '设备基础信息', key: 'equipmentVO' },
    { label: '设备采购信息', key: 'equipmentPurchases' },
    { label: '设备资料', key: 'equipmentResources' },
    { label: '设备保养', key: 'equipmentMaintain' },
    { label: '设备巡检', key: 'equipmentInspection' },
    { label: '仓库记录', key: 'equipmentStocks' },
    { label: '出入库记录', key: 'equipmentStores' },
    { label: '设备折旧', key: 'equipmentDepreciations' }
  ]; // tab栏

  private allFormList: any = {}; // 表单项
  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  }; // 表单校验

  private defaultEquipmentInfoData: any = {}; // 默认新增模态框数据
  @Prop() equipmentCategoryData!: any;
  @Watch('equipmentCategoryData')
  private onChangeEquipmentCategoryData(data: any) {
    this.defaultEquipmentInfoData = data
  }

  private activeName = 'equipmentVO'; // 当前tab页
  @Watch('activeName') // 监听tab页
  private onActiveNameChange(value: string) {
    console.log('🚀 ~ value', value)
    console.log(this.defaultEquipmentInfoData)
    // switch (this.activeName) {
    //   case "equipmentVO":
    //     this.allFormList[this.activeName] = equipmentVO;
    //     break;
    //   case "equipmentPurchases":
    //     this.allFormList[this.activeName] = equipmentPurchases;
    //     break;
    //   case "equipmentResources":
    //     this.allFormList[this.activeName] = equipmentResources;
    //     break;
    //   case "equipmentMaintain":
    //     this.allFormList[this.activeName] = equipmentMaintain;
    //     break;
    //   case "equipmentInspection":
    //     this.allFormList[this.activeName] = equipmentInspection;
    //     break;
    //   case "equipmentStocks":
    //     this.allFormList[this.activeName] = equipmentStocks;
    //     break;
    //   case "equipmentStores":
    //     this.allFormList[this.activeName] = equipmentStores;
    //     break;
    //   case "equipmentDepreciations":
    //     this.allFormList[this.activeName] = equipmentDepreciations;
    //     break;
    //   default:
    //     console.log("error");
    // }
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
  @Emit()
  emitSubmit(value: boolean) {
    return value
  }

  private createData() {
    // console.log(this.allFormList);
    (this.$refs.dataForm as Form).validate(async valid => {
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
          this.emitSubmit(true)
        }
        Message.success('创建成功')
      }
    })
  }

  // 修改科室
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
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
          this.emitSubmit(true)
        }
        Message.success('修改成功')
      }
    })
  }

  // 关闭模态框
  @Emit()
  emitCloseDialog() {
    return false
  }

  private handleCloseDialog() {
    this.emitCloseDialog()
  }
}
