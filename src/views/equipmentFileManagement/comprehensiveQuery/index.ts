import { Component, Vue } from 'vue-property-decorator'
import VexTable from '@/components/VexTable/index.vue'
import { FormatIsExordium, FormatIsisMetering } from '@/utils/functions'
import moment from 'moment'
import { BusinessViewModule } from '@/store/modules/business'
import { equipmentCategoryData } from '@/shared/options'
import { searchEquipmentCategoryInfoDetailsData, updateEquipmentInfoData } from '@/api/equipment'
import { RESULT_DATA_TYPE } from '@/utils/index.type'
import _ from 'lodash'

@Component({
  name: 'EquipmentCategory',
  components: {

    VexTable
  }
})
export default class extends Vue {
  public equipmentCategoryData = equipmentCategoryData
  public formConfig = {
    data: {
      name: '',
      createtime: ''
    },
    items: [
      {
        field: 'name',
        title: '设备名称',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6
      },
      {
        field: 'price',
        title: '设备价格',
        itemRender: { name: '$input', props: { placeholder: '请输入设备价格' } },
        span: 6
      },
      {
        field: 'marking',
        title: '设备型号',
        itemRender: { name: '$input', props: { placeholder: '请输入设备型号' } },
        span: 6
      },
      {
        field: 'brand',
        title: '设备品牌',
        itemRender: { name: '$input', props: { placeholder: '请输入设备品牌' } },
        span: 6
      },
      {
        field: 'num',
        title: '设备数量',
        itemRender: { name: '$input', props: { placeholder: '请输入设备数量' } },
        span: 6,
        folding: true
      },
      {
        field: 'name',
        title: '设备类别',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6,
        folding: true
      },
      {
        field: 'departmentId',
        title: '科室名称',
        itemRender: {
          name: '$input',
          props: { placeholder: '请输入科室名称' }
        },
        slots: { default: 'departmentSelect' },
        folding: true,
        span: 6
      },
      {
        field: 'name',
        title: '状态',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6,
        folding: true
      },
      {
        field: 'name',
        title: '是否计量检查',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6,
        folding: true
      },
      {
        field: 'name',
        title: '申请人',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6,
        folding: true
      },
      {
        field: 'name',
        title: '所属医院',
        itemRender: { name: '$input', props: { placeholder: '请输入设备名称' } },
        span: 6,
        folding: true
      },
      {
        field: 'createtime',
        title: '创建时间',
        slots: { default: 'create_time' },
        span: 10,
        folding: true
      },
      { slots: { default: 'operate_item' }, span: 24, collapseNode: true, align: 'center' }
    ] // 表单项
  }; // 查询配置

  public dialogStatus = 'create'; // 模态框新增或修改
  public paramsConfig: any = {
    url: 'equipment/getEquipmentInfo',
    searchByDepartmentIdUrl: 'equipment/getEquipmentInfoByDepartMentId', // 通过科室id查询数据
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  }; // 根据表单查询项查询数据

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
    { field: 'createtime', title: '创建时间', width: 100, formatter: (data:any) => moment(data.cellValue).format('YYYY-MM-DD HH:mm:ss') },
    { field: 'note', title: '备注', width: 100 }
    // {
    //   width: 160,
    //   title: '操作', fixed: 'right',
    //   slots: { default: 'operateHasSearch' },
    //   showOverflow: true,
    //   fixed: 'right'
    // }
  ]; // 列表配置项

  /**
   * 新增设备
   * @returns
   */
  public handleInsert() {
    // if (!this.nodeClickData.id) {
    //   Message.error('请选中科室后新增')
    //   return
    // }
    // this.dialogStatus = 'create'
    // const { id } = this.nodeClickData
    // this.equipmentCategoryData = {
    //   ...this.equipmentCategoryData,
    //   equipmentVO: {
    //     ...this.equipmentCategoryData.equipmentVO,
    //     departmentId: id
    //   }
    // }
    // sessionStorage.setItem('EquipmentCategoryData', JSON.stringify(this.equipmentCategoryData))
    // this.$router.push({ path: '/equipmentAddOrUpdate', query: { dialogStatus: this.dialogStatus, type: '新增' } })
  }

  /**
   * 触发编辑事件
   * @param row
   */
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
    // TODO: 换成store存储
    sessionStorage.setItem('EquipmentCategoryData', JSON.stringify(this.equipmentCategoryData))
    this.$router.push({ path: '/equipmentAddOrUpdate', query: { dialogStatus: this.dialogStatus, type: '修改' } })
    await BusinessViewModule.GET_EQUIPMENT_DATA(row.equipmentVO?.departmentId, 1, 10)
  }

  /**
   * 删除设备
   * @param row
   */
  public async handleRemove(row: any) {
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
      (this.$refs.vexTable as any).findList(this.paramsConfig)
      // (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams)
    }
    this.$message.success('删除成功')
  }

  /**
   * 点击查看按钮接收数据事件
   * @param row
   */
  public async handleSearchForDetail(row: any) {
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
      console.log('🚀 ~ 点击查看按钮接收数据事件 handleSearchForDetail ~ res', res.data)
    }
  }
}
