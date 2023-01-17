import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import { Form } from 'element-ui'
import VexTable from '@/components/VexTable/index.vue'
import {
  dealEquipmentCategoryInfoData,
  updateEquipmentCategoryInfoData,
  updateEquipmentInfoData
} from '@/api/equipment'
import _ from 'lodash'
import { FormatIsExordium, FormatIsisMetering } from '@/utils/functions'
import moment from 'moment'
import { BusinessViewModule } from '@/store/modules/business'
import { RESULT_DATA_TYPE } from '@/utils/index.type'

@Component({
  name: 'EquipmentCategory',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  public formConfig = {
    data: {
      name: '',
      createtime: ''
    },
    items: [] // 表单项
  }; // 查询配置

  public columns = [
    { type: 'seq', width: 60, fixed: 'left' },
    { type: 'checkbox', width: 60, fixed: 'left' },
    { field: 'name', title: '设备名称', treeNode: true, width: 140 },
    { field: 'price', title: '设备价格', width: 100 },
    { field: 'marking', title: '设备型号', width: 100 },
    { field: 'brand', title: '设备品牌', width: 100 },
    { field: 'num', title: '设备数量', width: 100 },
    { field: 'equipmentCategoryName', title: '设备类别', width: 100 }, // formatter: this.getformatMIsAvailable
    {
      field: 'departmentName',
      title: '科室名称',
      width: 100
      // slots: { default: 'department' }
    },
    { field: 'isExordium', title: '状态', width: 100, formatter: FormatIsExordium },
    { field: 'isMetering', title: '是否计量检查', width: 100, formatter: FormatIsisMetering },
    { field: 'userName', title: '申请人', width: 100 },
    { field: 'hospitalName', title: '所属医院', width: 100 },
    { field: 'createtime', title: '创建时间', width: 100, formatter: (data:any) => moment(data.cellvalue).format('YYYY-MM-DD') },
    { field: 'note', title: '备注', width: 100 },
    {
      width: 160,
      title: '操作',
      slots: { default: 'operateHasSearch' },
      showOverflow: true,
      fixed: 'right'
    }
  ]; // 列表配置项

  public treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  public rules = {
    cName: [
      { required: true, message: '请输入设备类别名称', trigger: 'change' }
    ]
  }; // 表单校验

  public dialogVisible = false; // 新增模态框
  public dialogStatus = 'create';
  public paramsConfig = {
    url: '/equipment/getEquipmentInfo',
    params: {
      page: 1,
      limit: 10,
      entity: {
        equipmentCategoryId: ''
      }
    }
  };

  public nodeClickData: any = {}; // 点击左侧树
  public url = 'tHospitalEquipmentCategoryInfo/queryTree'; // 左侧设备类别

  public equipmentCategoryData: any = {
    id: '',
    state: 1,
    equipmentVO: {
      name: '',
      createtime: '',
      departmentId: '',
      marking: '',
      brand: '',
      origin: '',
      equipmentCategoryId: '',
      activationTime: '',
      guarantee: '',
      hospitalId: '',
      manufactorId: '',
      equipmentStates: '',
      idCode: '',
      price: '',
      batchNumber: '',
      registrationCertificat: '',
      productionName: '',
      productionTime: '',
      validity: '',
      region: '',
      purchaseTime: '',
      isExordium: '',
      meterings: '',
      source: '',
      isMetering: '',
      meteringTime: '',
      meteringType: '',
      isEmergency: '',
      isFixedassets: '',
      isSpecial: '',
      fixedassetsType: '',
      intakeDate: '',
      financialNo: '',
      equipmentLocation: '',
      fixedAssetsNo: '',
      recordNo: '',
      unit: '',
      equipmentPrincipal: '',
      barCodeNo: '',
      img: '',
      scoringGuideUrl: '',
      qrcode: '',
      barCode: ''
    },
    equipmentMaintain: {
      lastMaintainTime: '',
      nextMaintainTime: null,
      cost: '',
      createtime: null,
      companyInfoId: '',
      userId: '',
      warrantyPeriod: null,
      facilitator: null,
      facilitatorPhone: '',
      parts: '',
      img: null,
      description: ''
    },
    equipmentPurchases: {
      installTime: '',
      aogDeadlineTime: '',
      aogTime: '',
      argumentationTime: '',
      biddingTime: '',
      budget: '',
      checkNote: '',
      contractAmount: '',
      contractDeadlineTime: '',
      contractName: '',
      contractNum: '',
      invitationType: '',
      partyBPhone: '',
      partyBUnit: '',
      partyBUser: '',
      projectNote: '',
      purchaseNote: '',
      acceptanceTime: '',
      oneCheckTime: '',
      twoCheckTime: '',
      firstAmountTime: '',
      endAmountTime: '',
      purchaseTime: '',
      purchaseType: '',
      purchaseWay: '',
      recordNum: '',
      recordUser: '',
      resource: '',
      signingTime: '',
      tHospitalEquipmentPayments: [
        {
          id: '',
          amount: '',
          paymentTime: '',
          periods: '',
          prepaymentTime: '',
          purchaseId: '',
          status: ''
        }
      ]
    },
    equipmentStores: {
      departmentId: '',
      boundTime: '',
      boundType: '',
      bounder: '',
      receivePerson: '',
      boundNums: '',
      beforeBoundNum: '',
      afterBoundNum: '',
      note: ''
    },
    // {
    //   id: "",
    //   equipmentId: "",
    //   departmentId: "3F503E8DA335FA-C0C9-4FCE-A8C9-F9C0D2C56169",
    //   boundTime: "2022-12-31T16:00:00",
    //   boundType: "出库",
    //   bounder: "C076245F7D308A-CAD4-49E8-BAB6-987544490306",
    //   receivePerson: "E1D6AB19EF6720-B4EA-46DF-BE10-96F03712FB65",
    //   boundNums: "2",
    //   beforeBoundNum: "10",
    //   afterBoundNum: "8",
    //   note: "出库"
    // }
    equipmentResources: {
      maintainUrl: '',
      meteringUrl: '',
      technologyUrl: '',
      paymentUrl: '',
      instructionsUrl: '',
      maintainName: '',
      meteringName: '',
      technologyName: '',
      paymentName: '',
      instructionsName: ''
    },
    equipmentStocks: {
      departmentId: '',
      boundNums: ''
    },
    equipmentDepreciations: {
      depreciationTime: '',
      depreciationLimit: '',
      depreciationAmount: '',
      depreciationPeriods: '',
      depreciationUser: ''
    },
    equipmentInspection: {
      isPeriod: '',
      isAppearance: '',
      isParts: '',
      isFunction: '',
      inspectionTime: '',
      createtime: null,
      userId: '22',
      appearance: '',
      parts: '',
      function: '',
      img: '',
      description: '',
      note: null
    }
  }; // 设备新增或编辑表单

  // 新增设备
  public handleInsert() {
    if (!this.nodeClickData.id) {
      this.$message.error('请选中设备类别新增')
      return
    }
    this.dialogStatus = 'create'
    const { id } = this.nodeClickData
    this.equipmentCategoryData = {
      ...this.equipmentCategoryData,
      equipmentVO: {
        ...this.equipmentCategoryData.equipmentVO,
        equipmentCategoryId: id
      }
    }
    sessionStorage.setItem('EquipmentCategoryData', JSON.stringify(this.equipmentCategoryData))
    this.$router.push({ path: '/equipmentAddOrUpdate', query: { dialogStatus: this.dialogStatus, type: '新增' } })
  }

  // 接收树形组件点击节点数据
  public handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: '/equipment/getEquipmentInfo',
      params: {
        page: 1,
        limit: 10,
        entity: {
          equipmentCategoryId: data.id
        }
      }
    }
  }

  // 编辑设备信息
  public async handleUpdate(row: any) {
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
    } = row
    this.equipmentCategoryData = {
      id,
      state,
      equipmentDepreciations: { ...equipmentDepreciations[0] },
      equipmentInspection: { ...equipmentInspection[0] },
      equipmentMaintain: { ...equipmentMaintain[0] },
      equipmentPurchases: { ...equipmentPurchases[0] },
      equipmentResources: { ...equipmentResources[0] },
      equipmentStocks: { ...equipmentStocks[0] },
      equipmentStores: { ...equipmentStores[0] },
      equipmentVO
    }
    this.dialogStatus = 'update'
    sessionStorage.setItem('EquipmentCategoryData', JSON.stringify(this.equipmentCategoryData))
    this.$router.push({ path: '/equipmentAddOrUpdate', query: { dialogStatus: this.dialogStatus, type: '修改' } })
    await BusinessViewModule.GET_EQUIPMENT_DATA(row.equipmentVO?.departmentId, 1, 10)
  }

  // 删除设备信息
  public async handleRemove(row: any) {
    let params = {}
    if (Array.isArray(row)) {
      const res = _.map(row, 'id')
      params = {
        ids: res.join(',')
      }
    } else {
      params = {
        ids: row.id
      }
    }
    const res: RESULT_DATA_TYPE | any = await updateEquipmentInfoData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }
}
