import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
// import { Route } from 'vue-router'
import store from '@/store'
import { getEquipmentData, queryDepartmentInfoTree } from '@/api/basic'
export interface BusinessState {
  departmentData: any
  equipmentData:any
}

@Module({ dynamic: true, store, name: 'businessView' })
class BusinessView extends VuexModule implements BusinessState {
  public departmentData: any = []; // 科室数据
  public equipmentData: any = []; // 设备数据

  @Mutation
  private SET_DEPARTMENT_DATA(view: any) {
    this.departmentData = view
  }

  @Mutation
  private SET_EQUIPMENT_DATA(view: any) {
    this.equipmentData = view
  }

  @Action
  public async GET_DEPARTMENT_DATA() {
    const res: any = await queryDepartmentInfoTree({})
    const newRes = res.data?.[0]?.children?.map((dept: any) => {
      return { ...dept, label: dept.title, value: dept.id }
    })
    res.code === 200 && this.SET_DEPARTMENT_DATA(newRes)
  }

  @Action
  public async GET_EQUIPMENT_DATA(
    departmentId: any,
    page: number,
    limit: number
  ) {
    const res: any = await getEquipmentData({
      page,
      limit,
      entity: { departmentId }
    })
    const newRes = res.data.map((dept: any) => {
      return { ...dept, label: dept.name, value: dept.id, ...dept.equipmentVO }
    })
    res.code === 200 && this.SET_EQUIPMENT_DATA(newRes)
  }
}

export const BusinessViewModule = getModule(BusinessView)
