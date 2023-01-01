import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import { Message } from 'element-ui'
import VexTable from '@/components/VexTable/index.vue'
import {
  searchEquipmentCategoryInfoDetailsData,
  updateEquipmentInfoData
} from '@/api/equipment'
import EquipmentFormDialog from './components/index.vue'
import _ from 'lodash'
import { RESULT_DATA_TYPE } from '@/utils/index.type'
// import { EquipmentInfoTypes } from './formlist/interface.type'
import { BusinessViewModule } from '@/store/modules/business'
import moment from 'moment'
@Component({
  name: 'EquipmentCategory',
  components: {
    MainSubLayout,
    Tree,
    VexTable,
    EquipmentFormDialog
  }
})
export default class extends Vue {
  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  private nodeClickData: any = {}; // 点击左侧科室数据
  private url = 'THospitalDepartmentInfo/queryTree'; // 左侧字典

  private formConfig = {
    data: {
      name: '',
      createtime: ''
    },
    items: [
      {
        field: 'name',
        title: '设备名称',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } }
      },
      {
        field: 'createtime',
        title: '创建时间',
        slots: { default: 'create_time' }
      },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  }; // 查询配置

  private columns = [
    { type: 'seq', width: 60, fixed: 'left' },
    { type: 'checkbox', width: 60, fixed: 'left' },
    { field: 'name', title: '设备名称', treeNode: true, width: 140 },
    // { field: "id", title: "设备ID", width: 100 },
    { field: 'marking', title: '设备型号', width: 100 },
    { field: 'brand', title: '设备品牌', width: 100 },
    { field: 'num', title: '设备数量', width: 100 },
    { field: 'equipmentCategoryId', title: '设备类别', width: 100 }, // formatter: this.getformatMIsAvailable
    {
      field: 'department',
      title: '科室名称',
      width: 100,
      slots: { default: 'department' }
    },
    // { field: "departmentId", title: "科室", width: 100 },
    { field: 'reason', title: '用途说明', width: 100 },
    { field: 'userId', title: '申请人', width: 100 },
    { field: 'hospitalId', title: '所属医院', width: 100 },
    // { field: "purchaseId", title: "采购ID", width: 100 },
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

  private equipmentCategoryData: any = {
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
      departmentId: '3F503E8DA335FA-C0C9-4FCE-A8C9-F9C0D2C56169',
      boundTime: '2021-12-31T16:00:00',
      boundType: '入库',
      bounder: '50B978FC6A069E-A0F3-4481-96C7-BD45AEC295EC',
      receivePerson: '',
      boundNums: '10',
      beforeBoundNum: '0',
      afterBoundNum: '10',
      note: '入库'
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

  private dialogVisible = false; // 新增模态框
  private dialogStatus = 'create'; // 模态框新增或修改
  private paramsConfig: any = {
    url: 'equipment/getEquipmentInfo',
    searchByDepartmentIdUrl: 'equipment/getEquipmentInfoByDepartMentId', // 通过科室id查询数据
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  }; // 根据表单查询项查询数据

  // private formatterValue(data: any) {}
  // 新增设备
  private handleInsert() {
    if (!this.nodeClickData.id) {
      Message.error('请选中科室后新增')
      return
    }
    this.dialogVisible = true
    this.dialogStatus = 'create'
    const { id } = this.nodeClickData
    this.equipmentCategoryData = {
      ...this.equipmentCategoryData,
      equipmentVO: {
        ...this.equipmentCategoryData.equipmentVO,
        departmentId: id
      }
    }
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: 'equipment/getEquipmentInfo',
      params: {
        page: 1,
        limit: 10,
        entity: {
          departmentId: data.id
        }
      }
    }
  }

  // 触发编辑事件
  private async handleUpdate(row: any) {
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
    this.dialogVisible = true
    await BusinessViewModule.GET_EQUIPMENT_DATA(row.equipmentVO?.departmentId, 1, 10)
  }

  // 删除设备
  private async handleRemove(row: any) {
    let params = []
    if (Array.isArray(row)) {
      const res = _.map(row, function(o) {
        return { id: o.id, state: 0 }
      })
      params = res
    } else {
      params.push({
        id: row.id,
        state: 0
      })
    }
    const res: RESULT_DATA_TYPE | any = await updateEquipmentInfoData(params)
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    Message.success('删除成功')
  }

  // 点击查看按钮接收数据事件
  private async handleSearchForDetail(row: any) {
    this.dialogVisible = true
    this.dialogStatus = 'update'
    const res:
      | RESULT_DATA_TYPE
      | any = await searchEquipmentCategoryInfoDetailsData({
        page: '1',
        limit: '10',
        entity: {
          id: row.id
        }
      })
    if (res.result) {
      console.log('🚀 ~ handleSearchForDetail ~ res', res.data)
    }
  }

  private clearForm() {
    this.equipmentCategoryData = {
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
      equipmentStores: [
        // {
        //   departmentId: "3F503E8DA335FA-C0C9-4FCE-A8C9-F9C0D2C56169",
        //   boundTime: "2021-12-31T16:00:00",
        //   boundType: "入库",
        //   bounder: "50B978FC6A069E-A0F3-4481-96C7-BD45AEC295EC",
        //   receivePerson: "",
        //   boundNums: "10",
        //   beforeBoundNum: "0",
        //   afterBoundNum: "10",
        //   note: "入库"
        // },
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
      ],
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
    }
  }

  // 新增或编辑确认事件
  private handleSubmit(value: boolean) {
    console.log('🚀 ~ value', value);
    (this.$refs.vexTable as any).findList(this.paramsConfig);
    (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    this.dialogVisible = false
    this.clearForm()
  }

  private handleClose() {
    this.dialogVisible = false
    this.clearForm()
  }
}
