import { Component, Vue, Watch } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { equipmentInfoData } from '@/api/equipment'
import {
  equipmentBasicInfo,
  equipmentProperty,
  capitalStructure,
  purchaseInfo,
  biddingInfo,
  contractInfo,
  acceptanceInfo
} from '@/store/formlist/index'

@Component({
  name: 'EquipmentFormDialog'
})
export default class extends Vue {
  private tabMapOptions = [
    { label: '设备信息', key: 'equipmentInfo' },
    { label: '设备资料', key: 'equipmentData' },
    { label: '采购信息', key: 'purchaseInfo' },
    { label: '折旧信息', key: 'depreciateInfo' }
  ]; // tab栏

  private formList: any = [];// 表单项
  private defaultEquipmentInfoData = equipmentInfoData; // 默认新增模态框数据
  private rules = {
    departmentName: [
      { required: true, message: '请输入部门名称', trigger: 'change' }
    ]
  }; // 表单校验

  private activeName = 'equipmentInfo'; // 当前tab页
  @Watch('activeName')
  private onActiveNameChange(value: string) {
    console.log('🚀 ~ value', value)
    switch (this.activeName) {
      case 'equipmentInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      case 'equipmentData':
        this.formList = [
          {
            申购信息: purchaseInfo
          },
          {
            招标信息: biddingInfo
          },
          {
            合同信息: contractInfo
          },
          {
            验收信息: acceptanceInfo
          }
        ]
        break
      case 'purchaseInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      case 'depreciateInfo':
        this.formList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ]
        break
      default:
        console.log('error')
    }
  }

  created() {
    this.formList = [
      {
        基本信息: equipmentBasicInfo
      },
      {
        设备属性: equipmentProperty
      },
      {
        资金结构: capitalStructure
      }
    ]
  }
}
